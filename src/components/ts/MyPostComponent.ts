import { ref } from 'vue';

type table = {
  name: string;
  align: string;
  label: string;
  field: string;
  sortable: boolean;
  format?: (val: string) => string;
};

const columns = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
  {
    name: 'title',
    align: 'center',
    label: 'Title',
    field: 'title',
    sortable: true,
  },
  {
    name: 'description',
    align: 'center',
    label: 'Description',
    field: 'description',
    sortable: true,
    format: (val: string) => `${val.slice(0, 40)} ...`,
  },
] as table[];

const rows = ref([
  {
    id: <number>1,
    image: <string>'images/auth.jpg',
    title: <string>'fake',
    description: <string>(
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available'
    ),
  },
  {
    id: <number>2,
    image: <string>'images/auth.jpg',
    title: <string>'fake',
    description: <string>(
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available'
    ),
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
