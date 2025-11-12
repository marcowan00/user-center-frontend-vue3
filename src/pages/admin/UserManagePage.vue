<template>
  <div id="userManagerPage">
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 24px;
      "
    >
      <a-input-search
        v-model:value="searchValue"
        placeholder="搜索用户名"
        enter-button
        @search="onSearch"
        style="max-width: 60%"
      />
    </div>
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'avatarUrl'">
          <a-avatar v-if="record.avatarUrl" :src="record.avatarUrl" />
        </template>
        <template v-else-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 1">
            <a-tag :color="'volcano'">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag :color="'geekblue'">用户</a-tag>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
        <template v-else-if="column.key === 'action'">
          <div v-if="record.id !== loginUserStore.loginUser.id">
            <a-popconfirm
              title="确认删除该用户？"
              ok-text="删除"
              cancel-text="取消"
              @confirm="(e: MouseEvent)=>confirm(e, record.id)"
              @cancel="cancel"
            >
              <a-button type="primary" danger>删除用户</a-button>
            </a-popconfirm>
          </div>
          <div v-else>当前用户</div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { deleteUser, searchUsers } from "../../services/user";
import { ref } from "vue";
import { message } from "ant-design-vue";
import dayjs from "dayjs";
import useLoginUserStore from "../../stores/useLoginUserStore";

const searchValue = ref<string>("");

const loginUserStore = useLoginUserStore();

const onSearch = () => {
  console.log("搜索用户: " + searchValue.value);
  fetchUsers(searchValue.value);
};

const onDelete = async (id: string) => {
  if (!id) return;

  const res = await deleteUser(id);

  if (res.data.code === 0) {
    message.success("删除成功");
  } else {
    message.error("删除失败: " + res.data.message);
  }

  fetchUsers();
};

const confirm = (e: MouseEvent, id: string) => {
  console.log(e);
  onDelete(id);
};

const cancel = (e: MouseEvent) => {
  console.log(e);
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "账号",
    dataIndex: "userAccount",
  },
  // {
  //   title: "头像",
  //   dataIndex: "avatarUrl",
  // },
  // {
  //   title: "性别",
  //   dataIndex: "gender",
  // },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "用户角色",
    dataIndex: "userRole",
  },
  {
    title: "操作",
    key: "action",
  },
];

const data = ref([]);

const fetchUsers = async (username: string = "") => {
  const res = await searchUsers(username);

  if (res.data.data) {
    data.value = res.data.data;
  } else {
    message.error("获取数据失败: " + res.data.message);
  }
};

fetchUsers();
</script>

<style scoped></style>
