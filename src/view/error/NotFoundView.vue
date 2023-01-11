<template>
  <div class="container">
    <van-empty
      image="error"
      image-size="100%"
    >
      <template #description>
        <div
          style="font-size: 22px;font-weight: 500;"
        >
          页面走丢了😢
        </div>
        <van-button
          type="primary"
          style="margin-top: 3em;width: 100%;font-weight: 500;font-size: 16px;"
          @click="$router.push({name: 'index'})"
        >
          GO HOME
        </van-button>
      </template>
    </van-empty>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  position: relative;
  top: 50%;
}
</style>