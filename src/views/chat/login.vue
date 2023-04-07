<!-- @format -->
<template>
    <div class="flex h-full dark:bg-neutral-800">
        <div class="px-4 m-auto space-y-4 text-center max-[400px]">
            <img :src="logo" class="logo" />
            <section class="login-panel space-y-2">
                <p class="title text-center text-slate-500 dark:text-slate-500">{{ $t('Sign In') }}</p>
                <div class="text-center input-box">
                    <div class="input-item">
                        <n-input
                            v-model:value="username"
                            class="input"
                            size="large"
                            round
                            :placeholder="$t('Username')"
                        />
                    </div>
                    <div class="input-item">
                        <n-input
                            v-model:value="password"
                            class="input"
                            size="large"
                            round
                            :placeholder="$t('Password')"
                        />
                    </div>
                </div>
                <NButton block circle class="button" size="large" type="primary" @click="signIn">
                    {{ $t('Sign In') }}
                </NButton>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router'
import { NInput } from 'naive-ui'
import logo from '@/assets/logo.png'
import { useAuthStoreWithout } from '@/store'
import { ref } from 'vue'

const router = useRouter()
const username = ref<string>('')
const password = ref<string>('')

async function signIn() {
    try {
        const store = useAuthStoreWithout()
        await store.signIn(username.value, password.value)
        router.push('/')
    } catch (e) {
        console.error(e)
    }
}
</script>

<style lang="less" scoped>
.px-4 {
    padding: 1rem;
    .logo {
        width: 10rem;
        position: absolute;
        top: 1rem;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
    .login-panel {
        -webkit-box-shadow: 3px 3px 10px #888888;
        box-shadow: 3px 3px 10px #888888;
        padding: 5rem;
        border-radius: 1rem;

        .title {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 1.5rem;
        }
        .input-box {
            .input-item {
                width: 80vw;
                flex-grow: 1;
                max-width: 300px;
                display: block;
                padding: 0.5rem 0;
                .input {
                    width: 100%;
                }
            }
        }
        .button {
            margin-top: 1.5rem;
        }
    }
}
</style>
