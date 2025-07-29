import sharp from 'sharp';

export async function cropImage(inputPath, outputPath, { width, height, left = 0, top = 0 }) {
  return sharp(inputPath)
    .extract({ width, height, left, top })
    .toFile(outputPath);
}