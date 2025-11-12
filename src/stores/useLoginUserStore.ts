import { defineStore } from "pinia";
import { ref } from "vue";
import { getCurrentUser } from "../services/user";

const useLoginUserStore = defineStore(
  "loginUser",
  () => {
    const loginUser = ref<any>({
      username: "未登录",
    });

    // 从后端获取当前登录用户信息
    const fetchLoginUser = async () => {
      const res = await getCurrentUser();

      if (res.data.code === 0 && res.data.data) {
        loginUser.value = res.data.data;
      } else if (res.data.code) {
        loginUser.value = {
          username: "未登录",
        };
      }
    };

    // 直接设置登录用户信息
    const setLoginUser = (newLoginUser: any) => {
      loginUser.value = newLoginUser;
    };

    return { loginUser, fetchLoginUser, setLoginUser };
  },
  { persist: true }
);

export default useLoginUserStore;
