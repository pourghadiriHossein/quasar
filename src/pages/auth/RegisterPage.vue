<template>
  <q-page>
    <q-card-section class="card">
      <q-input
        v-model="registerParameter.username"
        type="text"
        label="Username"
        class="q-my-sm"
        ref="nameState"
        :error="nameError.length > 0"
        :error-message="nameError"
      />
      <q-input
        v-model="registerParameter.email"
        type="email"
        label="Email"
        class="q-my-sm"
        ref="emailState"
        :error="emailError.length > 0"
        :error-message="emailError"
      />
      <q-input
        v-model="registerParameter.password"
        type="password"
        label="Password"
        class="q-my-sm"
        ref="passwordState"
        :error="passwordError.length > 0"
        :error-message="passwordError"
      />
      <q-file
        v-model="registerParameter.avatar"
        label="Avatar"
        filled
        bottom-slots
        counter
        class="q-my-sm"
        ref="avatarState"
        :error="avatarError.length > 0"
        :error-message="avatarError"
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
import { User } from 'src/models/user';

const router = useRouter();

const nameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const avatarError = ref('');

const nameState = ref(null);
const emailState = ref(null);
const passwordState = ref(null);
const avatarState = ref(null);

const registerParameter = ref({
  username: <string>'',
  email: <string>'',
  password: <string>'',
  avatar: undefined,
});

const register = () => {
  User.register(
    registerParameter.value.username,
    registerParameter.value.email,
    registerParameter.value.password,
    registerParameter.value.avatar
  ).then(
    (response) => {
      if (response.status == 200) {
        setTimeout(() => {
          router.replace({ name: 'login' });
        }, 1000);
      }
    },
    (reject) => {
      if (reject.response.status != 200) {
        if (reject.response.data.errors) {
          nameError.value = reject.response.data.errors?.name?.toString() ?? '';
          emailError.value =
            reject.response.data.errors?.email?.toString() ?? '';
          passwordError.value =
            reject.response.data.errors?.password?.toString() ?? '';
          avatarError.value =
            reject.response.data.errors?.avatar?.toString() ?? '';
          setTimeout(() => {
            nameError.value = '';
            emailError.value = '';
            passwordError.value = '';
            avatarError.value = '';
          }, 5000);
        }
      }
    }
  );
};
const login = () => {
  router.replace({ name: 'login' });
};
</script>
