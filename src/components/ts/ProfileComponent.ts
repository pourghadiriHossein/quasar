import { ref } from 'vue';
import { User } from 'src/models/user';
import { General } from 'src/enum/general';

const profileTemp = ref({
  modal: <boolean>false,
  id: <number>0,
  username: <string>'hossein pourghadiri',
  email: <string>'hossein@gmail.com',
  avatar: <string>'images/avatar.png',
  newAvatar: undefined,
  password: <string>'',
  role: <string>'user',
});

const profile = ref({
  modal: false,
  id: 0,
  username: '',
  email: '',
  avatar: 'images/avatar.png',
  newAvatar: undefined,
  password: '',
  role: '',
});

const userData = () => {
  User.profile().then((response) => {
    profile.value.id = response.data.user.id;
    profileTemp.value.id = response.data.user.id;
    profile.value.username = response.data.user.name;
    profileTemp.value.username = response.data.user.name;
    profile.value.email = response.data.user.email;
    profileTemp.value.email = response.data.user.email;
    if (response.data.user.media[0]?.url) {
      profile.value.avatar = General.serverRoute + response.data.user.media[0]?.url;
      profileTemp.value.avatar = General.serverRoute + response.data.user.media[0]?.url;
    }
    profile.value.role = response.data.user.roles[0]?.name;
    profileTemp.value.role = response.data.user.roles[0]?.name;
  });
};

export { profileTemp, profile, userData };
