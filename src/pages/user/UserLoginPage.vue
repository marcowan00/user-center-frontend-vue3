<template>
  <div id="userLoginPage">
    <div v-if="!loginUserStore.loginUser.id">
      <h2 class="title">用户登录</h2>
      <a-form
        style="max-width: 480px; margin: 0 auto"
        :model="formState"
        name="basic"
        labelAlign="left"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        autocomplete="off"
        @finish="handleSubmit"
        @finishFailed="onSubmitFailed"
      >
        <a-form-item
          label="账号"
          name="userAccount"
          :rules="[{ required: true, message: '请输入账号' }]"
        >
          <a-input
            v-model:value="formState.userAccount"
            placeholder="请输入账号"
          />
        </a-form-item>

        <a-form-item
          label="密码"
          name="userPassword"
          :rules="[
            { required: true, message: '请输入密码' },
            { min: 8, message: '密码不能少于8位' },
          ]"
        >
          <a-input-password
            v-model:value="formState.userPassword"
            placeholder="请输入密码"
          />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div v-else>
      <h1>当前已登录账号：{{ loginUserStore.loginUser.userAccount }}</h1>
      <a-button @click="() => onLogout()">退出登录</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { message } from "ant-design-vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { userLogin, userLogout } from "../../services/user";
import useLoginUserStore from "../../stores/useLoginUserStore";

interface FormState {
  userAccount: string;
  userPassword: string;
}

const formState = reactive<FormState>({
  userAccount: "",
  userPassword: "",
});

const router = useRouter();
const loginUserStore = useLoginUserStore();

const handleSubmit = async (values: any) => {
  const res = await userLogin(values);

  // 登录成功，保存登录状态到全局状态中，并跳转至主页
  if (res.data.code === 0 && res.data.data) {
    loginUserStore.fetchLoginUser();
    message.success("登录成功！");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败！");
  }
};

const onSubmitFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const onLogout = async () => {
  userLogout(loginUserStore.loginUser);
  await loginUserStore.fetchLoginUser();
  loginUserStore.loginUser.value = {
    username: "未登录",
  };
  message.success("已退出账号，请重新登录");
  router.push({ path: "/user/login" });
};
</script>

<style scoped>
#userLoginPage .title {
  text-align: center;
  margin-bottom: 24px;
}
</style>
