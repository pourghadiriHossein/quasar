<template>
  <q-page>
    <q-card-section class="card">
      <q-input
        v-model="registerParameter.username"
        type="text"
        label="Username"
        class="q-my-sm"
      />
      <q-input
        v-model="registerParameter.email"
        type="email"
        label="Email"
        class="q-my-sm"
      />
      <q-input
        v-model="registerParameter.password"
        type="password"
        label="Password"
        class="q-my-sm"
      />
      <q-file
        v-model="registerParameter.avatar"
        label="Avatar"
        filled
        bottom-slots
        counter
        class="q-my-sm"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop.prevent />
        </template>
        <template v-slot:append>
          <q-icon
            name="close"
            @click.stop.prevent="registerParameter.avatar = null"
            class="cursor-pointer"
          />
        </template>

        <template v-slot:hint> File Size </template>
      </q-file>
      <q-btn
        color="primary"
        label="Register"
        @click="register()"
        class="full-width q-py-sm q-my-xs"
      />
      <q-btn
        color="grey-6"
        label="Login"
        @click="login()"
        class="full-width q-py-sm q-my-xs"
      />
    </q-card-section>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const registerParameter = ref({
  username: <string>'',
  email: <string>'',
  password: <string>'',
  avatar: <File>null,
});

const register = () => {
  console.log(registerParameter.value);
};
const login = () => {
  router.replace({ name: 'login' });
};
</script>
