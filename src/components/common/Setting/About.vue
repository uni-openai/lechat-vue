<!-- @format -->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { NSpin } from 'naive-ui'
import { fetchChatConfig } from '@/api'
import pkg from '@/../package.json'

interface ConfigState {
    timeoutMs?: number
    reverseProxy?: string
    apiModel?: string
    socksProxy?: string
    httpsProxy?: string
    balance?: string
}

const loading = ref(false)

const config = ref<ConfigState>()

async function fetchConfig() {
    try {
        loading.value = true
        const { data } = await fetchChatConfig<ConfigState>()
        config.value = data
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchConfig()
})
</script>

<template>
    <NSpin :show="loading">
        <div class="p-4 space-y-4">
            <h2 class="text-xl font-bold">Version - {{ pkg.version }}</h2>
            <div class="p-2 space-y-2 rounded-md bg-neutral-100 dark:bg-neutral-700">
                <p>
                    此项目开源于
                    <a
                        class="text-blue-600 dark:text-blue-500"
                        href="https://github.com/Chanzhaoyu/chatgpt-web"
                        target="_blank"
                    >
                        Github
                    </a>
                    ，免费且基于 MIT 协议，没有任何形式的付费行为！
                </p>
                <p>如果你觉得此项目对你有帮助，请在 Github 帮我点个 Star 或者给予一点赞助，谢谢！</p>
            </div>
            <p>{{ $t('setting.api') }}：{{ config?.apiModel ?? '-' }}</p>
            <p>
                {{ $t('setting.balance') }}：{{ config?.balance ?? '-' }}
                <span class="text-xs text-neutral-400">({{ $t('setting.monthlyUsage') }})</span>
            </p>
        </div>
    </NSpin>
</template>
