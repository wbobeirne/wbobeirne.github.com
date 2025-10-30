import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { ImageLoader } from "next/image";

const config = imageConfigDefault;

export const optimizedTexturePath: ImageLoader = ({ src, quality }) => {
  return `${config.path}?url=${encodeURIComponent(src)}&w=1080&q=${
    quality || 75
  }`;
};
