/** @format */

import path from 'path'
import type { PluginOption } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import eslintPlugin from 'vite-plugin-eslint'

function setupPlugins(env: ImportMetaEnv): PluginOption[] {
    return [
        vue(),
        eslintPlugin(),
        env.VITE_APP_PWA === 'true' &&
            VitePWA({
                injectRegister: 'auto',
                manifest: {
                    name: 'LeChat AI',
                    short_name: 'LeChat',
                    icons: [
                        { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
                        { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
                    ]
                }
            })
    ]
}

export default defineConfig(env => {
    const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv

    return {
        resolve: {
            alias: {
                '@': path.resolve(process.cwd(), 'src')
            }
        },
        plugins: setupPlugins(viteEnv),
        server: {
            host: '0.0.0.0',
            port: 8080,
            open: false
        },
        build: {
            reportCompressedSize: false,
            sourcemap: false,
            commonjsOptions: {
                ignoreTryCatch: false
            }
        }
    }
})
