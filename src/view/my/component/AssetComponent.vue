<template>
  <div>
    <div class="container">
      <van-cell-group
        inset
        title="我的资产"
      >
        <van-cell
          title="优惠卷"
          :value="token && `${111}张`"
        />
        <van-cell
          title="余额"
          :value="token && `￥${user.money}`"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import {useAuthStore} from '@/store/auth.js';
import {storeToRefs} from 'pinia';
import {useUserStore} from '@/store/user.js';

const authStore = useAuthStore();
const userStore = useUserStore();
const {token} = storeToRefs(authStore);
const {user} = storeToRefs(userStore);
if (token.value) {
  userStore.select();
}
</script>

<style lang="less" scoped>
.container {

}
</style>