<template>
  <q-page>
    <q-card-section class="card">
      <q-input
        v-model="loginParameter.username"
        type="text"
        label="Username"
        class="q-my-sm"
      />
      <q-input
        v-model="loginParameter.password"
        type="password"
        label="Password"
        class="q-my-sm"
      />
      <q-btn
        color="primary"
        label="Login"
        @click="login()"
        class="full-width q-py-sm q-my-xs"
      />
      <q-btn
        color="grey-6"
        label="Register"
        @click="register()"
        class="full-width q-py-sm q-my-xs"
      />
    </q-card-section>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginParameter = ref({
  username: <string>'',
  password: <string>'',
});

const login = () => {
  console.log(loginParameter.value);
};
const register = () => {
  router.replace({ name: 'register' });
};
</script>
