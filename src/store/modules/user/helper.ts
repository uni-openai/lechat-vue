/** @format */

import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
    avatar: string
    name: string
    description: string
}

export interface UserState {
    userInfo: UserInfo
}

export function defaultSetting(): UserState {
    return {
        userInfo: {
            avatar: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/avatar-user.png',
            name: '人类用户',
            description: '我是人类，我使用AI办公'
        }
    }
}

export function getLocalState(): UserState {
    const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
    return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
    ss.set(LOCAL_NAME, setting)
}
