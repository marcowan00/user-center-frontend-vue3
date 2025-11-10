import { defineStore } from "pinia";
import { ref } from "vue";
import { getCurrentUser } from "../services/user";

const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref<any>({
    username: "未登录",
  });

  // 从后端获取当前登录用户信息
  const fetchLoginUser = async () => {
    const res = await getCurrentUser();
    if (res.data.code === 0 && res.data.code) {
      loginUser.value = res.data.data;
    }
    // else {
    //   setTimeout(() => {
    //     loginUser.value = { username: "marcowan00", id: 1 };
    //   }, 2_000);
    // }
  };

  // 直接设置登录用户信息
  const setLoginUser = (newLoginUser: any) => {
    loginUser.value = newLoginUser;
  };

  return { loginUser, fetchLoginUser, setLoginUser };
});

export default useLoginUserStore;
