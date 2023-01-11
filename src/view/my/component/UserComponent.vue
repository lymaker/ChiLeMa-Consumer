<template>
  <div>
    <div class="container">
      <!--  已登录  -->
      <div
        v-if="token"
        class="user-box"
        @click="router.push({name: 'user'})"
      >
        <van-image
          :src="user.avatarImageUrl"
          alt="用户头像"
          class="avatar"
          height="50"
          round
          width="50"
        />
        <div class="info">
          <h3>
            {{ user.nickname }}
          </h3>
          <h6>用户: {{ user.username }}</h6>
        </div>
      </div>
      <!--  未登录  -->
      <div
        v-else
        class="user-box"
        @click="login"
      >
        <van-image
          alt="默认头像"
          class="avatar"
          height="50"
          round
          src="https://default-1300725964.cos.ap-guangzhou.myqcloud.com/avatar.png"
          width="50"
        />
        <h3>
          登录/注册
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/store/auth.js';
import {storeToRefs} from 'pinia';
import {useUserStore} from '@/store/user.js';

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
const {token} = storeToRefs(authStore);
const {user} = storeToRefs(userStore);

function login() {
  router.push({
    name: 'login',
    query: {
      redirect: 'my'
    }
  });
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  position: relative;

  .user-box {
    display: flex;
    align-items: center;

    .avatar {
      margin-right: .5em;
    }

    h3, h6 {
      display: inline-block;
      margin: 0;
      font-weight: bold;
    }

    .info {
      display: flex;
      flex-direction: column;

      h6 {
        margin-top: .3em;
        font-weight: 400;
        color: #2f3542;
      }
    }
  }
}
</style>