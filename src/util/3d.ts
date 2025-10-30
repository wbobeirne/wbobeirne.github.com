import { Texture, NearestFilter } from "three";

export const applyNearestFilterToTextures = (txs: Texture | Texture[]) => {
  if (!Array.isArray(txs)) txs = [txs];
  txs.forEach((tx) => {
    tx.minFilter = NearestFilter;
    tx.magFilter = NearestFilter;
  });
};
