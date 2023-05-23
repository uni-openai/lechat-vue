<!-- @format -->
<template>
    <div class="flex h-full dark:bg-neutral-800">
        <div class="px-4 m-auto space-y-4 text-center max-[400px]">
            <img :src="logo" class="logo" />
            <section class="login-panel space-y-2">
                <p class="title text-center text-slate-500 dark:text-slate-500">{{ $t('signIn') }}</p>
                <n-form :model="form" :rules="rule">
                    <div class="text-center input-box">
                        <n-form-item path="username" class="input-item">
                            <n-input
                                @keyup.enter="signIn"
                                v-model:value="form.username"
                                class="input"
                                size="large"
                                round
                                :placeholder="$t('username')"
                            />
                        </n-form-item>
                        <n-form-item path="password" class="input-item">
                            <n-input
                                @keyup.enter="signIn"
                                v-model:value="form.password"
                                class="input"
                                size="large"
                                round
                                :placeholder="$t('password')"
                            />
                        </n-form-item>
                    </div>
                    <NButton
                        block
                        circle
                        class="button"
                        :loading="loading"
                        :disabled="loading"
                        size="large"
                        type="primary"
                        @click="signIn"
                    >
                        {{ $t('signIn') }}
                    </NButton>
                </n-form>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { NButton, NInput, NForm, NFormItem } from 'naive-ui'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo.png'
import { useAuthStoreWithout } from '@/store'
import { ref } from 'vue'
import { t } from '@/locales'
import { useNotification } from 'naive-ui'

const router = useRouter()
const form = ref({
    username: '',
    password: ''
})
const loading = ref(false)
const rule = {
    username: {
        required: true,
        trigger: ['blur', 'input'],
        message: t('username is none')
    },
    password: {
        required: true,
        trigger: ['blur', 'input'],
        message: t('password is none')
    }
}
const $ = useNotification()

async function signIn() {
    try {
        loading.value = true
        if (!form.value.username.trim() || !form.value.password.trim()) return
        const store = useAuthStoreWithout()
        await store.signIn({ username: form.value.username, password: form.value.password })
        $.success({
            meta: t('success'),
            content: t('success to sign in')
        })
        router.push('/')
    } catch (e) {
        $.error({
            content: t('error'),
            meta: t((e as Error).message)
        })
        console.error(e)
    } finally {
        loading.value = false
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
