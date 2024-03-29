<!-- @format -->

<template>
    <NLayoutSider
        :collapsed="collapsed"
        :collapsed-width="0"
        :width="260"
        :show-trigger="isMobile ? false : 'arrow-circle'"
        collapse-mode="transform"
        position="absolute"
        bordered
        :style="getMobileClass"
        @update-collapsed="handleUpdateCollapsed"
    >
        <div class="flex flex-col h-full" :style="mobileSafeArea">
            <NImage class="logo" :src="logo" lazy />
            <div class="logo-title">{{ $t('lechat') }}</div>
            <main class="flex flex-col flex-1 min-h-0">
                <div class="p-4">
                    <NButton dashed block @click="handleAdd">
                        {{ $t('chat.newChatButton') }}
                    </NButton>
                </div>
                <div class="flex-1 min-h-0 pb-4 overflow-hidden">
                    <List />
                </div>
            </main>
            <Footer />
        </div>
    </NLayoutSider>
    <template v-if="isMobile">
        <div v-show="!collapsed" class="fixed inset-0 z-40 bg-black/40" @click="handleUpdateCollapsed" />
    </template>
    <PromptStore v-model:visible="show" />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, ref, watch } from 'vue'
import { NButton, NLayoutSider, NImage } from 'naive-ui'
import List from './List.vue'
import Footer from './Footer.vue'
import { useAppStore, useChatStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { PromptStore } from '@/components/common'
import logo from '@/assets/lechat.png'

const appStore = useAppStore()
const chatStore = useChatStore()

const { isMobile } = useBasicLayout()
const show = ref(false)

const collapsed = computed(() => appStore.siderCollapsed)

function handleAdd() {
    chatStore.addHistory({ title: 'New Chat', uuid: Date.now(), isEdit: false })
    if (isMobile.value) appStore.setSiderCollapsed(true)
}

function handleUpdateCollapsed() {
    appStore.setSiderCollapsed(!collapsed.value)
}

const getMobileClass = computed<CSSProperties>(() => {
    if (isMobile.value) {
        return {
            position: 'fixed',
            zIndex: 50
        }
    }
    return {}
})

const mobileSafeArea = computed(() => {
    if (isMobile.value) {
        return {
            paddingBottom: 'env(safe-area-inset-bottom)'
        }
    }
    return {}
})

watch(
    isMobile,
    val => {
        appStore.setSiderCollapsed(val)
    },
    {
        immediate: true,
        flush: 'post'
    }
)
</script>

<style lang="less" scoped>
.logo {
    width: 3rem;
    margin: 0 auto;
    margin-top: 10px;
}
.logo-title {
    font-size: 1.2rem;
    margin-top: 0.5rem;
    font-weight: bold;
    text-align: center;
}
</style>
