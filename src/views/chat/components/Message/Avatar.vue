<!-- @format -->

<script lang="ts" setup>
import { computed } from 'vue'
import { NAvatar } from 'naive-ui'
import { useUserStore } from '@/store'
import { isString } from '@/utils/is'
import defaultAvatar from '@/assets/avatar.jpg'
import lechat from '@/assets/lechat.png'

interface Props {
    image?: boolean
}
defineProps<Props>()

const userStore = useUserStore()

const avatar = computed(() => userStore.userInfo.avatar)
</script>

<template>
    <template v-if="image">
        <NAvatar
            :style="{ background: '#fff' }"
            v-if="isString(avatar) && avatar.length > 0"
            :src="avatar"
            :fallback-src="defaultAvatar"
        />
        <NAvatar :style="{ background: '#fff' }" v-else round :src="defaultAvatar" />
    </template>
    <NAvatar v-else round :src="lechat" width="1em" height="1em" :style="{ background: '#fff' }" />
</template>
