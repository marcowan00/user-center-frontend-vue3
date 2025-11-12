<template>
  <div id="userRegisterPage">
    <h2 class="title">用户注册</h2>
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

      <a-form-item
        label="确认密码"
        name="checkPassword"
        :rules="[
          { required: true, message: '' },
          { validator: confirmPassword, trigger: 'blur' },
        ]"
      >
        <a-input-password
          v-model:value="formState.checkPassword"
          placeholder="请再次输入密码"
        />
      </a-form-item>

      <a-form-item
        label="编号"
        name="planetCode"
        :rules="[{ required: true, message: '请输入编号' }]"
      >
        <a-input
          v-model:value="formState.planetCode"
          placeholder="请输入编号"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
        <a-button type="primary" html-type="submit">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { message } from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { userRegister } from "../../services/user";

interface FormState {
  userAccount: string;
  userPassword: string;
  checkPassword: string;
  planetCode: string;
}

const formState = reactive<FormState>({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
  planetCode: "",
});

const router = useRouter();

const confirmPassword = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("请再次输入密码");
  }
  if (value !== formState.userPassword) {
    return Promise.reject("两次输入的密码不相同");
  }
  return Promise.resolve();
};

const handleSubmit = async (values: any) => {
  console.log(values);
  const res = await userRegister(values);

  // 注册成功，跳转到登录页面
  if (res.data.code === 0 && res.data.data) {
    message.success("注册成功！跳转至登录");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败！" + res.data.description);
  }
};

const onSubmitFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<style scoped>
#userRegisterPage .title {
  text-align: center;
  margin-bottom: 24px;
}
</style>
