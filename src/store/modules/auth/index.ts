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
    model: 'ChatGPTAPI' | 'ChatGPTUnofficialProxyAPI'
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

    getters: {
        isChatGPTAPI(state): boolean {
            return state.user?.model === 'ChatGPTAPI'
        }
    },

    actions: {
        async getUserInfo() {
            try {
                const { data } = await fetchUserInfo<UserInfoResponse>()
                this.setToken(data.token) // refresh user token
                this.user = { ...data }
                return Promise.resolve(data)
            } catch (error) {
                return Promise.reject(error)
            }
        },

        async signIn(username: string, password: string) {
            try {
                const { data } = await fetchSignIn<UserInfoResponse>(username, password)
                this.setToken(data.token) // refresh user token
                this.user = { ...data }
                return Promise.resolve(data)
            } catch (error) {
                return Promise.reject(error)
            }
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
