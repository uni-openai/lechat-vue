/** @format */

import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post } from '@/utils/request'

const MODEL = 'GPT'

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

interface Prompt {
    role: string
    content: string
}

export function fetchChatAPIProcess<T = any>(params: {
    prompts: Prompt[]
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
}) {
    const prompts = MODEL === 'GLM' ? params.prompts.slice(2) : params.prompts
    return post<T>({
        url: '/ai/chat-stream',
        data: {
            model: MODEL,
            prompts
        },
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
