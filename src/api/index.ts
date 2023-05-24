/** @format */

import type { AxiosProgressEvent } from 'axios'
import { post } from '@/utils/request'
import { getToken } from '@/store/modules/auth/helper'

export function fetchChatConfig<T = any>() {
    return post<T>({
        url: '/config'
    })
}

interface Prompt {
    role: string
    content: string
}

export function fetchChat<T = any>(params: {
    prompts: Prompt[]
    model: string
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
}) {
    const model = params.model || 'GLM' // default is GLM
    const prompts = model === 'GLM' && params.prompts.length > 2 ? params.prompts.slice(-2) : params.prompts
    return post<T>({
        url: '/lechat/chat',
        data: { model, prompts },
        headers: { token: getToken() },
        onDownloadProgress: params.onDownloadProgress
    })
}

export function fetchUserInfo<T>() {
    return post<T>({
        url: '/lechat/userinfo',
        headers: { token: getToken() }
    })
}

export function fetchSignIn<T>(username: string, password: string) {
    return post<T>({
        url: '/lechat/sign-in',
        data: { username, password }
    })
}
