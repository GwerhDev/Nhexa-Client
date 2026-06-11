import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

function imagesToWebp(): Plugin {
  return {
    name: 'images-to-webp',
    apply: 'build',
    async generateBundle(_, bundle) {
      const { default: sharp } = await import('sharp');
      const renames: Record<string, string> = {};

      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'asset' || !/\.(png|jpe?g|jpg)$/i.test(fileName)) continue;

        const source = chunk.source instanceof Uint8Array
          ? Buffer.from(chunk.source)
          : Buffer.from(chunk.source as string, 'binary');

        const webpBuffer = await sharp(source).webp({ quality: 82 }).toBuffer();
        const webpFileName = fileName.replace(/\.(png|jpe?g|jpg)$/i, '.webp');

        this.emitFile({ type: 'asset', fileName: webpFileName, source: new Uint8Array(webpBuffer) });
        renames[fileName.split('/').pop()!] = webpFileName.split('/').pop()!;
        delete bundle[fileName];
      }

      if (!Object.keys(renames).length) return;

      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'chunk') {
          for (const [oldBase, newBase] of Object.entries(renames))
            chunk.code = chunk.code.replaceAll(oldBase, newBase);
        } else if (typeof chunk.source === 'string') {
          for (const [oldBase, newBase] of Object.entries(renames))
            chunk.source = (chunk.source as string).replaceAll(oldBase, newBase);
        }
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), imagesToWebp()],
  assetsInclude: ['**/*.glb'],
})
