import { useMemo } from 'react';
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../URL';
import { IProduct } from '../../../models/models';


interface Props {
  products: IProduct[];
  confirmDelete: (id: number, imageURL: string) => void;
}

const ProductsTable = ({ products, confirmDelete }: Props) => {

  const navigate = useNavigate()

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'imageURL',
        header: 'Image',
        size: 25,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              alt="avatar"
              height={120}
              src={row.original.imageURL}
              loading="lazy"

            />
          </Box>
        ),
      },
      {
        accessorKey: 'brand',
        enableClickToCopy: true,
        header: 'brand',
        size: 25,

      },
      {
        accessorKey: 'category',
        enableClickToCopy: true,
        header: 'category',
        size: 25,

      },
      {
        accessorKey: 'desc',
        enableClickToCopy: true,
        header: 'desc',
        size: 350,

      },
      {
        accessorKey: 'price',
        enableClickToCopy: true,
        header: 'price',
        Cell: ({ renderedCellValue, row }) => (
          <Typography>
            {renderedCellValue} $
          </Typography>
        ),
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      enableRowActions
      columns={columns}
      data={products}
      renderRowActions={({ row, table }) => {


        return (
          <Box sx={{ display: 'flex', gap: '1rem', ml: 'auto' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => navigate(`${BASE_URL}/admin/add-product/${row.original.id}`)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error"
                onClick={() => confirmDelete(row.original.id, row.original.imageURL)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }}

      positionActionsColumn="last"

    />
  );
};

export default ProductsTable;
