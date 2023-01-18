<template>
  <transition name="van-slide-up">
    <div class="container">
      <div class="search">
        <van-search
          v-model="queryParam.keyword"
          @update:model-value="inputHandler"
        >
          <template #left>
            <div class="city">
              <van-icon name="location-o" />
              <span class="van-ellipsis">{{ addressStore.city }}</span>
            </div>
          </template>
        </van-search>
      </div>
      <van-action-sheet
        v-model:show="visible"
        :closeable="false"
        :overlay="false"
        class="list-box"
      >
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="queryAddress"
        >
          <van-cell
            v-for="(item, index) in list"
            :key="index"
            class="item"
            @click="selectHandler(item)"
          >
            <h2 class="van-ellipsis">
              {{ item.title }}
            </h2>
            <span>{{ item.address }}</span>
          </van-cell>
        </van-list>
      </van-action-sheet>
    </div>
  </transition>
</template>

<script setup>

import {useAddressStore} from '@/store/address.js';
import {suggestion} from '@/api/map.js';
import {useRouter} from 'vue-router';

const addressStore = useAddressStore();
const router = useRouter();

let visible = $ref(false);
let list = $ref([]);
let loading = $ref(false);
let finished = $ref(false);

const queryParam = $ref({
  keyword: '',
  page_index: 1,
  page_size: 10,
  policy: 1,
  region: addressStore.city
});

function inputHandler(value) {
  visible = Boolean(value);
  list = [];
  queryParam.page_index = 1;
  queryAddress();
}

function selectHandler(item) {
  const {title, address, location} = item;
  addressStore.$patch({title, address, location});
  router.push({name: 'address'});
}

async function queryAddress() {
  queryParam.page_index++;
  const {data: {data}} = await suggestion(queryParam);
  if (!data?.length) {
    finished = true;
    return;
  }
  list.push(...data);
  loading = false;
}

</script>

<style lang="less" scoped>
@import "@/index.less";

.container {
  position: relative;
  height: 100%;

  .search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;

    .city {
      width: 20%;
      display: flex;
      align-items: center;
      line-height: 1em;
      font-size: 14px;
      padding-right: .5em;

      i {
        margin-right: 2px;
      }

      span {
        width: 100%;
      }
    }
  }

  :deep(.list-box) {
    left: @basic-view-padding-x;
    right: @basic-view-padding-x;
    width: unset;
    height: 45vh;
    padding: 10px;
    box-sizing: border-box;

    .item {
      .van-cell__value {
        text-align: left;
      }

      h2 {
        margin: 0;
        font-size: 16px;
        font-weight: 400;
        color: #000;
      }
    }
  }
}
</style>