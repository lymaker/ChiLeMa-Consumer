<template>
  <div
    v-show="visible"
    class="container"
  >
    <van-action-sheet
      v-model:show="visible"
      :closeable="false"
      :overlay="false"
      class="form"
      title="新增收货地址"
    >
      <div class="content">
        <div class="address-box">
          <van-button
            v-if="!addressStore.address"
            type="warning"
            plain
            size="small"
            class="select-address-button"
            icon="arrow"
            icon-position="right"
            @click="$router.push({name: 'address-select'})"
          >
            选择收货地址
          </van-button>
          <div
            v-else
            class="address"
          >
            <div class="info">
              <h2>{{ addressStore.title }}</h2>
              <span>{{ addressStore.address }}111111111111111111</span>
            </div>
            <div class="change-address-button">
              <van-button
                plain
                type="warning"
                size="small"
                @click="$router.push({name: 'address-select'})"
              >
                修改地址
              </van-button>
            </div>
          </div>
        </div>
        <van-divider>地址信息</van-divider>
        <van-form>
          <van-field
            label="门牌号"
            label-width="50px"
            placeholder="详细地址，例1层101室"
          />
          <van-cell
            center
            class="tags"
            title="标签"
          >
            <template #value>
              <div>
                <van-button size="small">
                  家
                </van-button>
                <van-button size="small">
                  公司
                </van-button>
                <van-button size="small">
                  学校
                </van-button>
              </div>
            </template>
          </van-cell>
          <van-field
            label="联系人"
            label-width="50px"
            placeholder="请填写收货人的姓名"
          >
            <template #extra>
              <van-radio-group direction="horizontal">
                <van-radio name="1">
                  先生
                </van-radio>
                <van-radio name="2">
                  女士
                </van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            label="手机号"
            label-width="50px"
            placeholder="请填写收货手机号码"
          />
          <van-button
            class="submit-button"
            type="primary"
          >
            保存地址
          </van-button>
        </van-form>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import {useAddressStore} from '@/store/address.js';

const addressStore = useAddressStore();

let visible = $ref(false);
let param = $ref({
  
});

onMounted(() => visible = true);
</script>

<style lang="less" scoped>
@import "@/index.less";

.container {
  width: 100%;
  height: 100%;

  .address-box {
    position: relative;
    margin-left: 8px;
    width: calc(100% - 16px);

    .select-address-button {
      width: 100%;
    }

    .address {
      display: flex;
      width: 100%;

      .info {
        width: 70%;

        h2 {
          margin: 0 0 5px;
          font-size: 14px;
          font-weight: 600;
        }
        
        span {
          font-size: 12px;
        }
      }

      .change-address-button {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 30%;
      }
    }
  }

  :deep(.form) {
    left: @basic-view-padding-x;
    right: @basic-view-padding-x;
    width: unset;
    height: 70vh;
    padding: 10px;

    .tags {
      .van-cell__title {
        width: 50px;
        margin-right: 12px;
        flex: none;
      }
      .van-cell__value {
        text-align: left;

        button {
          width: 50px;
          margin-right: 1em;
        }
      }
    }

    .submit-button {
      margin-top: 1.5em;
      width: 100%;
    }
  }
}
</style>