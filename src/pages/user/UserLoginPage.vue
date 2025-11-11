<template>
  <div id="userLoginPage">
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
        label="用户名"
        name="userAccount"
        :rules="[{ required: true, message: '请输入用户名' }]"
      >
        <a-input
          v-model:value="formState.userAccount"
          placeholder="请输入用户名！"
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
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { userLogin } from "../../services/user";
import useLoginUserStore from "../../stores/useLoginUserStore";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

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
  console.log("Success:", values);
  const res = await userLogin(values);

  // 登录成功，保存登录状态到全局状态中，并跳转至主页
  if (res.data.code === 0 && res.data.data) {
    loginUserStore.fetchLoginUser();
    message.success("登录成功！");
    router.push({
      path: "/",
      replace: true,
    });
  }
};

const onSubmitFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<style scoped>
#userLoginPage .title {
  text-align: center;
  margin-bottom: 24px;
}
</style>
