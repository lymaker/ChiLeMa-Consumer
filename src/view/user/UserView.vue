<!-- todo 完成用户资料修改 -->

<template>
  <div class="container">
    <van-nav-bar
      left-arrow
      left-text="返回"
      title="我的账号"
      @click-left="$router.back()"
    />
    <main>
      <van-cell-group inset>
        <!--    头像    -->
        <van-cell
          class="avatar"
          is-link
          title="头像"
        >
          <van-uploader
            :after-read="uploadUserAvatar"
            accept="image/*"
          >
            <van-image
              :src="user.avatarImageUrl"
              height="50px"
              round
              width="50px"
            />
          </van-uploader>
        </van-cell>

        <!--    昵称    -->
        <van-cell
          :value="user.nickname"
          is-link
          title="昵称"
          @click="dialog = {
            show: true,
            title: '昵称',
            field: 'nickname',
            value: user.nickname,
            pattern: [
              {required: true, message: '请填写昵称'},
              {pattern: /^([\u4E00-\u9FA5]{2,5})|(\w{3,15})$/, message: '请填写有效昵称'}
            ]
          }"
        />

        <!--    用户名    -->
        <van-cell
          :value="user.username"
          title="用户名"
        />

        <!--    密码    -->
        <van-cell
          is-link
          title="密码"
          value="修改"
          @click="dialog = {
            show: true,
            title: '密码',
            field: 'password',
            pattern: [
              {required: true, message: '请填写密码'},
              {pattern: /\S+/, message: '请填写有效密码'}
            ]
          }"
        />

        <!--    手机号    -->
        <van-cell
          :value="user.phone"
          is-link
          title="手机号"
          @click="dialog = {
            show: true,
            title: '手机号',
            field: 'phone',
            value: user.phone,
            pattern: [
              {required: true, message: '请填写手机号'},
              {pattern: /^1[3456789]\d{9}$/, message: '请填写有效手机号'}
            ]
          }"
        />

        <!--    邮箱    -->
        <van-cell
          :value="user.email"
          is-link
          title="邮箱"
          @click="dialog = {
            show: true,
            title: '邮箱',
            field: 'email',
            value: user.email,
            pattern: [
              {required: true, message: '请填写邮箱'},
              {pattern: /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:\w(?:[\w-]*\w)?\.)+\w(?:[\w-]*\w)?$/, message: '请填写有效邮箱'}
            ]
          }"
        />
      </van-cell-group>
      <van-button
        block
        class="logout-button"
        round
        type="danger"
        @click="logout"
      >
        登出账号
      </van-button>
    </main>

    <van-form
      ref="updateForm"
      :validate-trigger="['onSubmit']"
      @submit="updateUserField"
    >
      <van-dialog
        v-model:show="dialog.show"
        :title="dialog.title"
        class="dialog"
      >
        <template #default>
          <div class="input">
            <van-field
              v-model="dialog.value"
              :placeholder="`请输入${dialog.title}`"
              :rules="dialog.pattern"
              clearable
              type="text"
            />
          </div>
        </template>
        <template #footer>
          <div class="van-hairline--top van-dialog__footer">
            <van-button
              class="van-dialog__cancel"
              size="large"
              @click="dialog.show = false"
            >
              取消
            </van-button>
            <van-button
              class="van-dialog__confirm van-hairline--left"
              native-type="submit"
              size="large"
            >
              提交
            </van-button>
          </div>
        </template>
      </van-dialog>
    </van-form>
  </div>
</template>

<script setup>
import {useUserStore} from '@/store/user.js';
import {storeToRefs} from 'pinia';
import {useRouter} from 'vue-router';
import {imageApi} from '@/api/upload.js';
import {useAuthStore} from '@/store/auth.js';

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
const {user} = storeToRefs(userStore);
const updateForm = $ref();
const dialog = $ref({
  show: false,
  title: null,
  field: null,
  value: null,
  pattern: null
});

async function logout() {
  await authStore.logout();
  await router.push({name: 'index'});
}

async function uploadUserAvatar({file}) {
  const {data: {url}} = await imageApi(file);
  await userStore.update({avatarImageUrl: url});
  await userStore.select();
}

async function updateUserField() {
  // 判断值是否未更改
  // 随笔：奇奇怪怪的 .value
  if (user.value[dialog.field] === dialog.value) {
    console.debug('用户字段值没有变化，无需提交更改');
  } else {
    const param = {};
    param[dialog.field] = dialog.value;
    await userStore.update(param);
    await userStore.select();
  }
  dialog.show = false;
}
</script>

<style lang="less" scoped>
@import "@/index.less";

.container {
  height: 100vh;
  background: @basic-background-color;

  main {
    padding: @basic-view-padding-y @basic-view-padding-x;

    .avatar {
      display: flex;
      align-items: center;

      :deep(.van-cell__value) {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      :deep(.van-uploader__input-wrapper) {
        display: flex;
      }

    }

    .logout-button {
      margin-top: 25px;
    }
  }

  :deep(.van-cell-group--inset) {
    margin: 0;
  }

  .dialog {

    .input {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin: 15px 0;
      padding: 5px 8px;
      border: 1px solid #dfe4ea;
      border-radius: 3px;

      :deep(.van-cell) {
        padding: 0;
      }
    }

    .input {
      width: 75%;
    }

  }
}
</style>