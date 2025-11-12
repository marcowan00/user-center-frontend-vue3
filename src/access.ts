import { message } from "ant-design-vue";
import type { Router } from "vue-router";
import useLoginUserStore from "./stores/useLoginUserStore";

const setupAccessControl = (router: Router) => {
  router.beforeEach((to, _from, next) => {
    const loginUserStore = useLoginUserStore();
    const loginUser = loginUserStore.loginUser;

    if (to.fullPath.startsWith("/admin")) {
      if (!loginUser.id || loginUser.userRole !== 0) {
        message.error("请登录管理员账号后重试");
        next(`/user/login?redirect=${to.fullPath}`);
        return;
      }
    }
    next();
  });
};

export default setupAccessControl;
