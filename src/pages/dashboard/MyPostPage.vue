<template>
  <q-page class="q-pa-md q-mb-lg overflow-auto window-height">
    <q-table
      :grid="$q.screen.xs"
      title="My Posts"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :rows-per-page-options="[pagination.rowsPerPage]"
      v-model:pagination="pagination"
    >
      <template v-slot:top-right>
        <q-input
          class="bg-white"
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          label="Create New Post"
          color="light-blue-8"
          class="q-ml-md"
          @click="createPost()"
        />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th auto-width> Tools </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn
              class="q-ma-sm"
              size="md"
              color="warning"
              dense
              icon="update"
              @click="updatePost(props.row)"
            />
            <q-btn
              class="q-ma-sm"
              size="md"
              color="red"
              dense
              icon="delete"
              @click="deletePost(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
  <UserCreatePost
  v-model:modal="createPostParameter.modal"
  ></UserCreatePost>
  <UserUpdatePost
  v-model:modal="updatePostParameter.modal"
  v-model:data="updatePostParameter"
  ></UserUpdatePost>
  <UserDeletePost
  v-model:modal="deletePostParameter.modal"
  v-model:data="deletePostParameter"
  ></UserDeletePost>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { columns, rows, pagination } from 'src/components/ts/MyPostComponent';
import UserCreatePost from 'src/components/vue/UserCreatePost.vue';
import UserUpdatePost from 'src/components/vue/UserUpdatePost.vue';
import UserDeletePost from 'src/components/vue/UserDeletePost.vue';

const filter = ref('');

const createPostParameter = ref({
  modal: <boolean> false,
});
const updatePostParameter = ref({
  modal: <boolean> false,
  id: <number>0,
  title: <string>'',
  description: <string>'',
});
const deletePostParameter = ref({
  modal: <boolean> false,
  id: <number>0,
  image: <string>'',
  title: <string>'',
  username: <string>'',
  description: <string>'',
});

const createPost = () => {
  createPostParameter.value.modal = !createPostParameter.value.modal
};

const updatePost = (row: any) => {
  updatePostParameter.value.id = row.id;
  updatePostParameter.value.title = row.title;
  updatePostParameter.value.description = row.description;
  updatePostParameter.value.modal = !updatePostParameter.value.modal
};

const deletePost = (row: any) => {
  deletePostParameter.value.id = row.id;
  deletePostParameter.value.image = row.image;
  deletePostParameter.value.title = row.title;
  deletePostParameter.value.username = 'hossein';
  deletePostParameter.value.description = row.description;
  deletePostParameter.value.modal = !deletePostParameter.value.modal
};
</script>
