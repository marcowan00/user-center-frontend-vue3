<template>
  <div id="navBar">
    <a-row :wrap="false">
      <a-col flex="200px">
        <div class="title-bar">
          <img class="logo" src="../assets/vue.svg" alt="logo" />
          <div class="title">用户中心</div>
        </div>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="onMenuClick"
        />
      </a-col>
      <a-col flex="auto">
        <!-- 条件渲染用户登录状态。已登录显示用户名，未登录显示登录按钮 -->
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            {{
              (loginUserStore.loginUser.userAccount ?? "未命名") + ", 你好！"
            }}
            <a-button @click="() => onLogout()">退出</a-button>
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { CrownOutlined, HomeOutlined } from "@ant-design/icons-vue";
import { message, type MenuProps } from "ant-design-vue";
import { h, ref } from "vue";
import { useRouter } from "vue-router";
import useLoginUserStore from "../stores/useLoginUserStore";
import { userLogout } from "../services/user";

const loginUserStore = useLoginUserStore();

const router = useRouter();

const onMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  });
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

const current = ref<string[]>(["mail"]);

router.afterEach((to) => {
  current.value = [to.path];
});

// 如何统一配置路由和菜单项？
const items = ref<MenuProps["items"]>([
  {
    key: "/",
    icon: () => h(HomeOutlined),
    label: "主页",
    title: "主页",
  },
  {
    key: "/user/login",
    label: "用户登录",
    title: "用户登录",
  },
  {
    key: "/user/register",
    label: "用户注册",
    title: "用户注册",
  },
  {
    key: "/admin/userManage",
    icon: () => h(CrownOutlined),
    label: "用户管理",
    title: "用户管理",
  },
  {
    key: "others",
    label: h(
      "a",
      { href: "https://www.google.com", target: "_blank" },
      "Google"
    ),
    title: "Google",
  },
]);
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}

.logo {
  height: 48px;
}

.user-login-status {
  text-align: right;
}
</style>
