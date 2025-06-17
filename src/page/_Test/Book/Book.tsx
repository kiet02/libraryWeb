
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import { StickyNote2 } from '@mui/icons-material';
import { AppProvider, Navigation } from '@toolpad/core/AppProvider';
import { PageContainer } from '@toolpad/core/PageContainer';
import { getPageTitle } from './module/TitlePage';




const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
const NAVIGATION: Navigation = [
  {
    segment: 'notes',
    title: 'Notes',
    icon: <StickyNote2 />,
    pattern: 'notes{/:noteId}*',
    children:[
      {segment:'edit',title:'Edit'}
    ]
  },
];
export function Book() {

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 }, // Cột cố định

  {
    field: 'image',
    headerName: 'Image',
    renderCell: (params) => (
      <img
        src={params.value}
        alt="thumb"
        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
      />
    ),
    width: 100, // hoặc giữ cố định nếu ảnh
  },

  { field: 'firstName', headerName: 'First Name', flex: 1 },
  { field: 'lastName', headerName: 'Last Name', flex: 1 },
  { field: 'age', headerName: 'Age', flex: 1 },
  {
    field: 'fullName',
    headerName: 'Full Name',
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    flex: 1,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box display="flex" gap={1}>
        <IconButton onClick={() => handleEdit(params.row)} size="small">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => handleDelete(params.row)} size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    ),
    width: 120, // giữ cố định để không bị bóp nút
  },
];

  const router = useDemoRouter('/notes');
  function handleEdit(row:GridRenderCellParams) {
  console.log('Sửa:', row);
  router.navigate(`/notes/${row.id}/edit`);
  // hoặc navigate đến /edit/:id
}

function handleDelete(row:GridRenderCellParams) {
  console.log('Xoá:', row);
  // xác nhận rồi xoá bằng API
}

function DemoPageContent({
  pathname,
}: {
  pathname: string;
  navigate: (path: string | URL) => void;
}) {
  if (pathname.endsWith('/edit')) {
    const id = pathname.split('/')[2]; // /notes/4/edit => id = 4
    return <Typography variant="h6">Editing user with ID: {id}</Typography>;
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        }}
      }
      pageSizeOptions={[5]}
      disableRowSelectionOnClick
    />
  );
}

  return (
    <DemoProvider>
      <AppProvider
      navigation={NAVIGATION}
      router={router}>
    <Box sx={{ height: 400, width: '100%',padding:5 }}>
       <PageContainer  title={getPageTitle(router.pathname)}
         />
      <DemoPageContent pathname={router.pathname} navigate={router.navigate} />
  
    </Box>

    </AppProvider>
    </DemoProvider>
  );
}
