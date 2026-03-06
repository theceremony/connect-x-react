const ic = new Map<string, HTMLImageElement | Promise<void> | Error>();
// -----------------------------------------------------------------------------
const loadImage = (src: string): void => {
  // ---------------------------------------------------------------------------
  if (ic.has(src)) {
    const c = ic.get(src);
    if (c instanceof HTMLImageElement) return; // Image already loaded
    if (c instanceof Promise) throw c; // Still loading, re-throw promise
    if (c instanceof Error) throw c; // Loading failed, re-throw error
  }
  // ---------------------------------------------------------------------------
  const p = new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      ic.set(src, img);
      resolve();
    };
    img.onerror = (error) => {
      ic.set(src, new Error("Failed to load image"));
      reject(error);
    };
  });
  // ---------------------------------------------------------------------------
  ic.set(src, p);
  throw p; // Suspend the component
};
// -----------------------------------------------------------------------------
export default loadImage;
