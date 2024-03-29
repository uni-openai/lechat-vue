/** @format */

import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from './helper'
import { store } from '@/store'
import { fetchUserInfo, fetchSignIn } from '@/api'

interface UserInfoResponse {
    id: number
    name: string
    phone: string
    countryCode: number
    avatar: string
    token: string
    tokenTime: Date
    wxOpenId: string
    wxUnionId: string
    model: 'GLM' | 'GPT'
}

export interface UserState {
    token: string | undefined
    user: UserInfoResponse | null
}

export const useAuthStore = defineStore('auth-store', {
    state: (): UserState => ({
        token: getToken(),
        user: null
    }),

    actions: {
        async getUserInfo() {
            const { data } = await fetchUserInfo<UserInfoResponse>()
            this.setToken(data.token) // refresh user token
            this.user = data
            return data
        },

        async signIn(params: { username: string; password: string }) {
            const { data } = await fetchSignIn<UserInfoResponse>(params.username, params.password)
            this.setToken(data.token) // refresh user token
            this.user = data
            return data
        },

        getToken() {
            return this.token
        },

        setToken(token: string) {
            this.token = token
            setToken(token)
        },

        removeToken() {
            this.token = undefined
            removeToken()
        }
    }
})

export function useAuthStoreWithout() {
    return useAuthStore(store)
}
