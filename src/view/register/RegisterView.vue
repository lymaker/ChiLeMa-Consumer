<template>
  <div class="container">
    <h1>欢迎注册吃了吗</h1>
    <van-form
      validate-trigger="onSubmit"
      validate-first
      @submit="register"
    >
      <van-cell-group inset>
        <!--    昵称输入框    -->
        <van-field
          v-model="registerParam.nickname"
          :rules="registerParamRules.nickname"
          clearable
          label="昵称"
          label-width="50px"
          name="nickname"
          placeholder="请输入用昵称"
          size="large"
        />
        <!--    用户名输入框    -->
        <van-field
          v-model="registerParam.username"
          :rules="registerParamRules.username"
          clearable
          label="用户名"
          label-width="50px"
          name="username"
          placeholder="请输入用户名"
          size="large"
        />
        <!--    密码输入框    -->
        <van-field
          v-model="registerParam.password"
          :rules="registerParamRules.password"
          clearable
          label="密码"
          label-width="50px"
          name="password"
          placeholder="请输入密码"
          size="large"
        />
        <!--    邮箱输入框    -->
        <van-field
          v-model="registerParam.email"
          :rules="registerParamRules.email"
          clearable
          label="邮箱"
          label-width="50px"
          name="email"
          placeholder="请输入邮箱"
          size="large"
        />
        <!--    手机号输入框    -->
        <van-field
          v-model="registerParam.phone"
          :rules="registerParamRules.phone"
          clearable
          label="手机号"
          label-width="50px"
          name="phone"
          placeholder="请输入手机号"
          size="large"
        />
        <!--    验证码输入框    -->
        <van-field
          v-model="captchaParam.value"
          :rules="registerParamRules.captcha"
          clearable
          label="验证码"
          label-width="50px"
          name="captcha"
          placeholder="请输入验证码"
          size="large"
        >
          <template #extra>
            <captcha-image-component
              type="register"
              class="captcha-box"
            />
          </template>
        </van-field>
      </van-cell-group>
      <!--   注册按钮   -->
      <van-button
        block
        class="register-button"
        native-type="submit"
        round
        size="large"
        type="primary"
      >
        提交
      </van-button>
    </van-form>
  </div>
</template>

<script setup>
import {useUserStore} from '@/store/user.js';
import {useRouter} from 'vue-router';
import {checkUsernameApi} from '@/api/user.js';
import CaptchaImageComponent from '@/component/CaptchaImageComponent.vue';
import {verify} from '@/api/captcha.js';

const userStore = useUserStore();
const router = useRouter();

const registerParam = $ref({
  nickname: null,
  username: null,
  password: null,
  email: null,
  phone: null
});
const captchaParam = $ref({
  type: 'register',
  value: null
});
const registerParamRules = {
  nickname: [
    {required: true, message: '请填写昵称'},
    {pattern: /^([\u4E00-\u9FA5]{2,5})|(\w{3,15})$/, message: '请填写有效昵称'}
  ],
  username: [
    {required: true, message: '请填写用户名'},
    {pattern: /^\w{5,18}$/, message: '请填写有效用户名'},
    {
      async validator(value) {
        try {
          await checkUsernameApi(value);
          return true;
        } catch (e) {
          return false;
        }
      },
      trigger: 'onBlur',
      message: '此用户名已被使用'
    }
  ],
  password: [
    {required: true, message: '请填写密码'},
    {pattern: /^.{8,18}$/, message: '请填写有效密码'}
  ],
  email: [
    {required: true, message: '请填写邮箱'},
    {pattern: /^[\w\-]+@[a-zA-Z\d\-]+(\.[a-zA-Z]{2,8}){1,2}$/, message: '请填写有效邮箱'}
  ],
  phone: [
    {required: true, message: '请填写手机号'},
    {pattern: /^1[3456789]\d{9}$/, message: '请填写有效手机号'}
  ],
  captcha: [
    {required: true, message: '请填写验证码'},
    {pattern: /^\S*$/, message: '请填写有效验证码'}
  ]
};

async function register() {
  try {
    await verify(captchaParam);
    await userStore.create(registerParam);
    await router.push({
      name: 'login'
    });
  } catch (e) {
    console.error(e);
  }

}
</script>

<style lang="less" scoped>
@import "@/index.less";

.container {
  position: relative;
  height: 100vh;
  padding: @basic-view-padding-y @basic-view-padding-x;
  box-sizing: border-box;
  background-color: @basic-background-color;

  h1 {
    position: absolute;
    top: 18%;
    left: 10%;
    font-weight: 400;
  }

  form {
    position: absolute;
    top: 31%;
    left: 50%;
    width: 80%;
    transform: translateX(-50%);

    :deep(.van-cell-group--inset) {
      margin: 0;
    }

    .captcha-box {
      width: 80px;
      height: 28px;
    }
  }

  .register-button {
    margin-top: 25px;
  }
}
</style>