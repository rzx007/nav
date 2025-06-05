// 定义分片信息对象
interface ChunkInfo {
  /**
   * 分片起始位置
   *
   * @description 分片起始位置
   */
  start: number;
  /**
   * 分片结束位置
   *
   * @description 分片结束位置
   */
  end: number;
  /**
   * 分片索引
   *
   * @description 分片索引，防止分片顺序错乱
   */
  index: number;
  /**
   * 分片哈希值
   *
   * @description 分片哈希值，用于校验分片是否完整
   */
  hash: string;
  /**
   * 分片数据
   *
   * @description 分片数据
   */
  blob: Blob;
}

/**
* 大文件分片
*
* @description 将文件按照指定大小进行分片，并计算每个分片的哈希值
*
* @author karl
*
* @param file  文件对象
* @param CHUNK_SIZE 分片大小，单位：字节，默认5MB
*
* @returns 分片信息数组
*/
export const cutAndHashFile = async (file: File, CHUNK_SIZE?: number): Promise<ChunkInfo[]> => {
  // 如果未指定分片大小，则默认使用 5MB
  CHUNK_SIZE = CHUNK_SIZE || 5 * 1024 * 1024;
  // 计算总分片数
  const total = Math.ceil(file.size / CHUNK_SIZE);
  // 设置并发 worker 数量，优先用硬件线程数，获取不到则用 8
  const concurrency =
      typeof navigator !== 'undefined' && navigator.hardwareConcurrency
          ? Math.max(2, Math.min(navigator.hardwareConcurrency, 16)) // 限制范围，防止极端情况
          : 8;

  // 构建每个分片的任务信息
  const chunkTasks = Array.from({ length: total }, (_, i) => {
      // 计算分片起始位置
      const start = i * CHUNK_SIZE!;
      // 计算分片结束位置
      const end = Math.min(start + CHUNK_SIZE!, file.size);
      // 获取分片数据
      const blob = file.slice(start, end);
      // 返回分片任务对象
      return { start, end, index: i, blob };
  });

  // 读取 blob 为 ArrayBuffer 的辅助函数
  function readBlobAsArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
      return new Promise((resolve, reject) => {
          // 创建文件读取器
          const reader = new FileReader();
          // 读取成功时返回结果
          reader.onload = () => resolve(reader.result as ArrayBuffer);
          // 读取失败时返回错误
          reader.onerror = () => reject(reader.error);
          // 以 ArrayBuffer 方式读取
          reader.readAsArrayBuffer(blob);
      });
  }

  // 创建 worker 池
  const workers = Array.from({ length: concurrency }, createWorker);

  // 用于存储每个分片的结果
  const results: ChunkInfo[] = new Array(total);
  // 下一个待处理的任务索引
  let nextTask = 0;

  // 使用 worker 处理分片任务
  async function processWithWorker(worker: Worker) {
      // 循环分配任务直到全部完成
      while (nextTask < chunkTasks.length) {
          // 获取当前任务索引
          const taskIdx = nextTask++;
          // 获取当前任务
          const task = chunkTasks[taskIdx];
          // 读取分片数据为 ArrayBuffer
          const buffer = await readBlobAsArrayBuffer(task.blob);

          // 发送数据到 worker 计算 hash
          const hash: string = await new Promise((resolve) => {
              worker.onmessage = (e: MessageEvent) => resolve(e.data.hash);
              worker.postMessage({ index: task.index, buffer }, [buffer]);
          });

          // 保存分片信息及 hash
          results[taskIdx] = { ...task, hash };
      }
  }

  // 并发处理所有分片任务
  await Promise.all(workers.map(processWithWorker));
  // 关闭所有 worker
  workers.forEach((w) => w.terminate());

  // 返回所有分片信息
  return results;
};

// 创建一个 Web Worker 实例
function createWorker() {
  // Worker 代码，使用 SparkMD5 计算 ArrayBuffer 的 MD5 哈希值
  const workerCode = `
  importScripts("https://unpkg.com/spark-md5@3.0.2/spark-md5.min.js");

  self.onmessage = function(e) {
    const { index, buffer } = e.data;
    const spark = new self.SparkMD5.ArrayBuffer();
    spark.append(buffer);
    const hash = spark.end();
    self.postMessage({ index, hash });
  };
`;

  // 创建一个 Blob 对象包含 Worker 代码
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  // 返回一个新的 Worker 实例，使用 Blob URL
  return new Worker(URL.createObjectURL(blob));
}