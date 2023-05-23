/** @format */

import type { AxiosProgressEvent, AxiosResponse, GenericAbortSignal } from 'axios'
import request from './axios'
import { useAuthStore } from '@/store'

export interface HttpOption {
    url: string
    data?: any
    method?: string
    headers?: any
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
    signal?: GenericAbortSignal
    beforeRequest?: () => void
    afterRequest?: () => void
}

export interface Response<T = any> {
    data: T
    msg?: string | null
    status: number
}

function http<T = any>({
    url,
    data,
    method,
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest
}: HttpOption) {
    const successHandler = ({ data }: AxiosResponse<Response<T>>) => {
        // stream
        if (typeof data === 'string' && (data as string).includes('data:')) return data

        // status 1: success
        if (parseInt(data.status.toString()) === 1) return data

        // status -1: no login
        if (parseInt(data.status.toString()) === -1) {
            useAuthStore().removeToken()
            return data
        }

        // other status
        throw new Error(data.msg || '')
    }

    const failHandler = (error: Response<Error>) => {
        afterRequest?.()
        throw new Error(error?.msg || 'Error')
    }

    beforeRequest?.()

    method = method || 'GET'

    const params = Object.assign(typeof data === 'function' ? data() : data ?? {}, {})

    return method === 'GET'
        ? request.get(url, { params, signal, onDownloadProgress }).then(successHandler, failHandler)
        : request.post(url, params, { headers, signal, onDownloadProgress }).then(successHandler, failHandler)
}

export function get<T = any>({
    url,
    data,
    method = 'GET',
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest
}: HttpOption): Promise<Response<T>> {
    return http<T>({
        url,
        method,
        data,
        onDownloadProgress,
        signal,
        beforeRequest,
        afterRequest
    })
}

export function post<T = any>({
    url,
    data,
    method = 'POST',
    headers,
    onDownloadProgress,
    signal,
    beforeRequest,
    afterRequest
}: HttpOption): Promise<Response<T>> {
    return http<T>({
        url,
        method,
        data,
        headers,
        onDownloadProgress,
        signal,
        beforeRequest,
        afterRequest
    })
}

export default post
