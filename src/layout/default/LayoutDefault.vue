<template>
  <div class="layout">
    <main>
      <router-view />
    </main>
    <van-tabbar v-model="active">
      <van-tabbar-item
        v-for="(item, index) in nav"
        :key="index"
        :to="item.path"
        :icon="item.icon"
      >
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router';

const route = useRoute();

const nav = [
  {
    path: '/home',
    title: '首页',
    icon: 'wap-home-o',
  },
  {
    path: '/cart',
    title: '购物车',
    icon: 'shopping-cart-o',
  },
  {
    path: '/order',
    title: '订单',
    icon: 'orders-o',
  },
  {
    path: '/my',
    title: '我的',
    icon: 'user-o',
  }
];
let active = $ref(nav.findIndex(e => e.path === route.path));
</script>

<style lang="less" scoped>
@import "@/index.less";

@main-height: 93vh;
@footer-height: 7vh;

.layout {

  main {
    height: @main-height;
    padding: @basic-view-padding-y @basic-view-padding-x;
    background: @basic-background-color;
    box-sizing: border-box;
  }

}
</style>