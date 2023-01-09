<template>
  <div class="container">
    <user-component class="user-component" />
    <asset-component class="asset-component" />
    <my-component />
    <readme-component />
  </div>
</template>

<script setup>
import UserComponent from '@/view/my/component/UserComponent.vue';
import AssetComponent from '@/view/my/component/AssetComponent.vue';
import MyComponent from '@/view/my/component/MyComponent.vue';
import ReadmeComponent from '@/view/my/component/ReadmeComponent.vue';</script>

<style lang="less" scoped>
@component-bottom: 30px;

.container {
  height: 100%;
  overflow-y: scroll;

  & > div:not(:last-of-type) {
    margin-bottom: @component-bottom;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: calc(-@component-bottom / 2);
      height: 1px;
      border-radius: 50%;
      background-color: #dfe4ea;
    }
  }

  :deep(.van-cell-group--inset) {
    margin: 0;
  }

  :deep(.van-cell-group__title) {
    padding: 0 0 7px;
  }
}
</style>