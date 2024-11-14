import { ref } from 'vue';

const profileTemp = ref({
  modal: <boolean>false,
  id: <number>0,
  username: <string>'hossein pourghadiri',
  email: <string>'hossein@gmail.com',
  avatar: <string>'../../../public/images/avatar.png',
  newAvatar: <File>undefined,
  password: <string>'',
  role: <string>'user',
});

export { profileTemp };
