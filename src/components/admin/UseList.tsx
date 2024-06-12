import { Container, Typography, CircularProgress, TableContainer, Paper, Table, TableRow, TableCell, TableBody, Box, Stack, CardContent, Menu, MenuItem, IconButton } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { db } from "../../firebase/config";
import { ShowOnMobile } from "../../hook/useMenuDisply";
import { selectOrderHistory } from "../../store/slice/orderSlice";
import PaperRounding from "../styleComponents/containers/PaperRounding";
import TableHeadTheme from "../styleComponents/containers/TableHeadTheme";
import TableRowTheme from "../styleComponents/containers/TableRowTheme";
import FlexBetween from "../styleComponents/FlexBetween";


const headers = ['displayName', 'email', 'phone', 'role'];
const UseList = () => {
  const { data: userList, isLoading } = useFetchCollection("users");
  const orders = useSelector(selectOrderHistory);
  const dispatch = useDispatch();


  const [anchorEls, setAnchorEls] = React.useState({});

  const handleClick = (event: any, id: any) => {
    setAnchorEls((prev) => ({ ...prev, [id]: event.currentTarget }));
  };

  const handleClose = (id: any) => {
    setAnchorEls((prev) => ({ ...prev, [id]: null }));
  };

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event: any, column: any) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUseList = userList.filter((user: any) => {
    const searchString = `${user.displayName} ${user.email} ${user.phone} ${user.role}`;
    return searchString.toLowerCase().includes(searchTerm);
  })

  const handleRoleChange = async (newRole: any, id: any) => {
    console.log(id)
    const userRef = doc(db, 'users', id);
    await updateDoc(userRef, { role: newRole });
  };

  console.log(userList)
  if (userList.length === 0) {
    return (
      <p>No order found</p>
    )
  }

  return (
    <Box sx={{ mr: 2, ml: 2 }} >


      <Typography variant="h2" textAlign='center'>Your user list</Typography>
      <br />
      {isLoading && <CircularProgress />}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeadTheme>
            <TableRow>
              <TableCell >s/n</TableCell>
              {headers.map((header) => (
                <TableCell align="right" key={header} >
                  {header !== 'Calories' ? `${header} (g)` : 'Calories'}
                  <input
                    style={{ margin: '10px' }}
                    type="text"
                    placeholder="Search"
                    onChange={(event) => handleSearch(event, header)}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHeadTheme>

          <TableBody>
            {filteredUseList.map((user, index) => {
              const {
                id,
                displayName,
                email,
                phone,
                photoURL,
                role
              } = user;
              return (
                <TableRowTheme key={id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {displayName}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {email}
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ textAlign: 'center' }}>
                      {phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <Typography sx={{ textAlign: 'center' }}>
                        <Box onClick={(event) => handleClick(event, id)}>{role}</Box>
                        <Menu
                          anchorEl={anchorEls[id]}
                          open={Boolean(anchorEls[id])}
                          onClose={() => handleClose(id)}
                        >
                          <MenuItem onClick={() => handleRoleChange('user', id)}>
                            user
                          </MenuItem>
                          <MenuItem onClick={() => handleRoleChange('admin', id)}>
                            admin
                          </MenuItem>
                          <MenuItem onClick={() => handleRoleChange('caretaker', id)}>
                            caretaker
                          </MenuItem>
                        </Menu>
                      </Typography>
                    </IconButton>
                  </TableCell>
                </TableRowTheme>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ShowOnMobile>
        <Box sx={{ paddingTop: 2 }}>
          <Stack spacing={2}>
            {filteredUseList.map((user, index) => {
              const {
                id,
                displayName,
                email,
                phone,
                photoURL,
                role
              } = user;
              return (
                <PaperRounding key={id}>
                  <CardContent>
                    <Typography>
                      {index + 1} 's/n'
                    </Typography>
                    <FlexBetween>
                      <Typography color='secondary'>
                        displayName:
                      </Typography>
                      <Typography>{displayName}</Typography>
                    </FlexBetween>
                    <FlexBetween>
                      <Typography color='secondary'>
                        email
                      </Typography>
                      <Typography >{email}</Typography>
                    </FlexBetween>
                    <FlexBetween>
                      <Typography color='secondary'>
                        Phone:
                      </Typography>
                      <Typography >{phone}</Typography>
                    </FlexBetween>
                    <FlexBetween>
                      <Typography color='secondary'>
                        Role:
                      </Typography>
                      <Typography >{role}</Typography>
                    </FlexBetween>
                  </CardContent>
                </PaperRounding>
              );
            })
            }
          </Stack>
        </Box>
      </ShowOnMobile>

    </Box>
  )
}

export default UseList