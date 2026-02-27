// imageLoader.ts

const imageCache = new Map<string, HTMLImageElement | Promise<void> | Error>();

const loadImage = (src: string): void => {
  if (imageCache.has(src)) {
    const cached = imageCache.get(src);
    if (cached instanceof HTMLImageElement) return; // Image already loaded
    if (cached instanceof Promise) throw cached; // Still loading, re-throw promise
    if (cached instanceof Error) throw cached; // Loading failed, re-throw error
  }

  const promise = new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      imageCache.set(src, img);
      resolve();
    };
    img.onerror = (error) => {
      imageCache.set(src, new Error("Failed to load image"));
      reject(error);
    };
  });

  imageCache.set(src, promise);
  throw promise; // Suspend the component
};

export default loadImage;
