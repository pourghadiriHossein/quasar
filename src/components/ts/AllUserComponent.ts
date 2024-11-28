import { ref } from 'vue';

type table = {
  name: string;
  align: string;
  label: string;
  field: string;
  sortable: boolean;
};

const columns = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
  {
    name: 'name',
    align: 'center',
    label: 'User Name',
    field: 'name',
    sortable: true,
  },
  {
    name: 'email',
    align: 'center',
    label: 'E-Mail',
    field: 'email',
    sortable: true,
  },
] as table[];

const rows = ref([
  {
    id: <number> 1,
    name: <string> 'hossein',
    email: <string> 'hossein@gmail.com',
    role: <object>[{name:'admin'}]
  },
  {
    id: <number> 2,
    name: <string> 'hossein',
    email: <string> 'hossein@gmail.com',
    role: <object>[{name:'user'}]
  },
]);

const pagination = ref({
  sortBy: <string>'desc',
  descending: <boolean>false,
  page: <number>1,
  rowsPerPage: <number>5,
  rowsNumber: <number>100,
});

export { columns, rows, pagination };
