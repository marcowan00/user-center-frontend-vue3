import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "hello",
    component: HelloWorld,
    props: { msg: "123" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
