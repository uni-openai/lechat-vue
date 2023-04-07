/** @format */

import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post } from '@/utils/request'
import { useSettingStore } from '@/store'

export function fetchChatAPI<T = any>(
    prompt: string,
    options?: { conversationId?: string; parentMessageId?: string },
    signal?: GenericAbortSignal
) {
    return post<T>({
        url: '/chat',
        data: { prompt, options },
        signal
    })
}

export function fetchChatConfig<T = any>() {
    return post<T>({
        url: '/config'
    })
}

export function fetchChatAPIProcess<T = any>(params: {
    prompt: string
    options?: { conversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
}) {
    const settingStore = useSettingStore()

    return post<T>({
        url: '/lechat/chat-process',
        data: { prompt: params.prompt, options: params.options, systemMessage: settingStore.systemMessage },
        signal: params.signal,
        onDownloadProgress: params.onDownloadProgress
    })
}

export function fetchUserInfo<T>() {
    return post<T>({
        url: '/lechat/userinfo'
    })
}

export function fetchSignIn<T>(username: string, password: string) {
    return post<T>({
        url: '/lechat/sign-in',
        data: { username, password }
    })
}

export function fetchVerify<T>(token: string) {
    return post<T>({
        url: '/verify',
        data: { token }
    })
}
