<template>
  <q-layout view="hHh LpR fFf">
    <div class="dashboard-background"></div>
    <q-header elevated :class="`navbar-bg text-white`">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="images/avatar.png" />
          </q-avatar>
          Open World
        </q-toolbar-title>
        <q-select v-model="navbar" :options="navbarOptions" />
        <q-toggle v-model="siteModeSate" :icon="mdiWeatherNight" />
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
      elevated
    >
      <q-list separator>
        <q-item
          v-for="(item, index) in accessMenu"
          :key="index"
          :to="{ name: item.route }"
          v-ripple
          clickable
        >
          <q-avatar><q-icon :name="item.icon"></q-icon></q-avatar>
          <q-item-section>
            <q-item-label class="q-ml-sm"> {{ item.name }} </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      behavior="mobile"
      elevated
    >
      <div class="avatarBox row items-center justify-center">
        <q-avatar size="150px" class="overlapping">
          <q-img :src="profileTemp.avatar"></q-img>
        </q-avatar>
      </div>
      <div class="q-pa-md row items-start q-gutter-md justify-center">
        <q-card flat bordered class="my-card text-center">
          <q-card-section>
            <div class="text-h3">Profile</div>
          </q-card-section>
          <q-separator inset />

          <q-card-section class="q-pt-none">
            <div class="text-h6">User Name</div>
            {{ profileTemp.username }}
          </q-card-section>

          <q-separator inset />

          <q-card-section class="q-pt-none">
            <div class="text-h6">E-Mail</div>
            {{ profileTemp.email }}
          </q-card-section>
        </q-card>
      </div>
      <div class="q-pa-md q-gutter-sm text-center">
        <q-btn
          class="full-width"
          label="Update"
          color="light-blue-8"
          @click="profile.modal = true"
        />
        <q-btn
          class="full-width"
          label="Logout"
          color="red"
          @click="logout()"
        />

        <q-dialog v-model="profile.modal" persistent>
          <q-card style="width: 350px">
            <q-card-section>
              <div class="text-h6">Update Profile</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input
                dense
                v-model="profile.username"
                label="Your User Name"
                ref="nameState"
                :error="nameError.length > 0"
                :error-message="nameError"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                dense
                v-model="profile.email"
                label="Your E-Mail"
                ref="emailState"
                :error="emailError.length > 0"
                :error-message="emailError"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                v-model="profile.password"
                dense
                label="Your Password"
                ref="passwordState"
                :error="passwordError.length > 0"
                :error-message="passwordError"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-file
                filled
                bottom-slots
                v-model="profile.newAvatar"
                label="Label"
                counter
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
                    @click.stop.prevent="profile.newAvatar = null"
                    class="cursor-pointer"
                  />
                </template>

                <template v-slot:hint> File Size </template>
              </q-file>
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn flat label="Submit" @click="update()" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, watch } from 'vue';
import { accessMenu } from 'src/components/ts/MenuComponent';
import { profileTemp, profile, userData } from 'components/ts/ProfileComponent';
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from 'vue-router';
import { User } from 'src/models/user';
import { useQuasar } from 'quasar';
import { mdiWeatherNight } from '@quasar/extras/mdi-v7';

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    const authStore = useAuthStore();
    const router = useRouter();

    userData();
    const nameError = ref('');
    const emailError = ref('');
    const passwordError = ref('');
    const avatarError = ref('');

    const nameState = ref(null);
    const emailState = ref(null);
    const passwordState = ref(null);
    const avatarState = ref(null);
    const siteMode = useQuasar();
    const siteModeSate = ref(false);
    watch(siteModeSate, () => {
      let mode = siteMode.dark.mode;
      siteMode.dark.set(!mode);
    });
    const navbar = ref('black');
    const navbarOptions = ref(['black', 'white', 'green', 'orange']);
    return {
      leftDrawerOpen,
      accessMenu,
      profileTemp,

      nameError,
      emailError,
      passwordError,
      avatarError,

      nameState,
      emailState,
      passwordState,
      avatarState,

      profile,
      siteModeSate,
      mdiWeatherNight,
      navbar,
      navbarOptions,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      update() {
        User.updateProfile(
          profile.value.id,
          profile.value.username,
          profile.value.email,
          profile.value.password,
          profile.value.newAvatar
        ).then(
          (response) => {
            if (response.status == 200) {
              userData();
              profile.value.modal = !profile.value.modal;
            }
          },
          (reject) => {
            if (reject.response.status != 200) {
              if (reject.response.data.errors) {
                nameError.value =
                  reject.response.data.errors?.name?.toString() ?? '';
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
      },
      logout() {
        authStore.logout();
        router.replace({ name: 'login' });
      },
    };
  },
};
</script>
<style>
@keyframes change-color {
  from {
    background-color: v-bind(navbar);
    opacity: 0.2;
  }
  to {
    background-color: v-bind(navbar);
    opacity: 1;
  }
}
.navbar-bg {
  animation: change-color 1s alternate infinite ease;
}
</style>
