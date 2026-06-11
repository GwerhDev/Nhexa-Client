import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

function imagesToWebp(): Plugin {
  return {
    name: 'images-to-webp',
    apply: 'build',
    async load(id: string) {
      if (!/\.(png|jpe?g|jpg)$/i.test(id) || id.includes('\x00')) return null;
      const { default: sharp } = await import('sharp');
      const webpBuffer = await sharp(id).webp({ quality: 82 }).toBuffer();
      const ref = this.emitFile({
        type: 'asset',
        name: path.basename(id, path.extname(id)) + '.webp',
        source: webpBuffer,
      });
      return `export default import.meta.ROLLUP_FILE_URL_${ref}`;
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), imagesToWebp()],
  assetsInclude: ['**/*.glb'],
})
