import {
  HomeOutlined,
  AutoGraphOutlined,
  MenuBookOutlined,
  SettingsOutlined,
  AddCircleOutlineOutlined,
  TrendingUpOutlined,
} from '@mui/icons-material';


export const navMenuUser = [
  {
    name: 'Home',
    icon: <HomeOutlined />,
    path: '/TechnoResource',
    id: 1
  },
  {
    name: 'Likes',
    icon: <AutoGraphOutlined />,
    path: 'likes',
    id: 2
  },
  {
    name: 'My Orders',
    icon: <MenuBookOutlined />,
    path: 'order-history',
    id: 3
  },
  {
    name: 'Contact',
    icon: <SettingsOutlined />,
    path: 'contact',
    id: 4
  },
]

export const navMenuAdmin = [
  {
    name: 'Home',
    icon: <HomeOutlined />,
    path: '',
    id: 1
  },
  {
    name: 'Add Product',
    icon: <AddCircleOutlineOutlined />,
    path: 'add-product/ADD',
    id: 2
  },
  {
    name: 'All Products',
    icon: <TrendingUpOutlined />,
    path: 'all-products',
    id: 3
  },
  {
    name: 'View Orders',
    icon: <AutoGraphOutlined />,
    path: 'orders',
    id: 4
  },
  {
    name: 'User List',
    icon: <AutoGraphOutlined />,
    path: 'useList',
    id: 5
  },

];