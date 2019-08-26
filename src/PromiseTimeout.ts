export function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_resolve, reject) => {
      let timeout = setTimeout(() => {
        reject(new Error('timeout'));
      }, ms);
      if (timeout && typeof timeout === 'object' && (timeout as any).unref) (timeout as any).unref();
    }),
  ]);
}
