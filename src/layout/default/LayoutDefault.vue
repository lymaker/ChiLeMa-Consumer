<template>
  <div class="layout">
    <main>
      <router-view />
    </main>
    <footer>
      <nav>
        <div
          v-for="(item, index) in nav"
          :key="index"
          @click="clickNavItem(index)"
        >
          <van-icon
            :name="active === index ? item.activeIcon : item.defaultIcon"
            size="22"
          />
          <h5>{{ item.title }}</h5>
        </div>
      </nav>
    </footer>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router';

const router = useRouter();
const route = useRoute();

const nav = [
  {
    path: '/home',
    title: '首页',
    defaultIcon: 'https://img.icons8.com/material-outlined/48/null/home--v2.png',
    activeIcon: 'https://img.icons8.com/material/48/null/home--v5.png'
  },
  {
    path: '/cart',
    title: '购物车',
    defaultIcon: 'https://img.icons8.com/material-outlined/48/null/shopping-cart--v1.png',
    activeIcon: 'https://img.icons8.com/material/48/null/shopping-cart--v1.png'
  },
  {
    path: '/order',
    title: '订单',
    defaultIcon: 'https://img.icons8.com/material-outlined/48/null/bill--v1.png',
    activeIcon: 'https://img.icons8.com/material/48/null/bill--v1.png'
  },
  {
    path: '/my',
    title: '我的',
    defaultIcon: 'https://img.icons8.com/material-outlined/48/1A1A1A/gender-neutral-user.png',
    activeIcon: 'https://img.icons8.com/material/48/1A1A1A/gender-neutral-user.png'
  }
];
let active = $ref(nav.findIndex(e => e.path === route.path));

function clickNavItem(index) {
  active = index;
  router.push(nav[index].path);
}
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

  footer {
    height: calc(@footer-height - 1px);
    border-top: 1px solid #f1f2f6;

    nav {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 5px 0;
      height: 100%;
      box-sizing: border-box;

      & > div {
        text-align: center;

        h5 {
          margin-top: -.3em;
          margin-bottom: 0;
          font-weight: normal;
          font-size: 12px;
        }
      }
    }
  }
}
</style>