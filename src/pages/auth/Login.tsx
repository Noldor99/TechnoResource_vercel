import {
  Button,
  Container,
  FormControl,
  Typography
} from '@mui/material';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { toast } from 'react-toastify';
// import { selectPreviousURL } from '../../store/slice/cartSlice';
import GoogleIcon from '@mui/icons-material/Google';
import ButtonBlueBack from '../../components/styleComponents/buttons/ButtonBlueBack';
import { BASE_URL } from '../../URL';
import PaperRounding from '../../components/styleComponents/containers/PaperRounding';
import TextFieldForm from '../../components/styleComponents/TextFieldForm';
import { collection, where, getDocs, query } from 'firebase/firestore';



const LoginForm = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const previousURL = useSelector(selectPreviousURL);
  const navigate = useNavigate();

  const redirectUser = () => {
    // if (previousURL.includes('cart')) {
    //   return navigate('/cart');
    // }
    navigate(`${BASE_URL}`);
  };

  const loginUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // const user = userCredential.user;
        setIsLoading(false);
        toast.success('Login Successful...');
        redirectUser();
      })
      .catch(error => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  // Login with Goooglr
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    const usersRef = collection(db, 'users');

    const q = query(usersRef, where('email', '==', email));
    getDocs(q).then((querySnapshot) => {
      if (querySnapshot.empty) {
        toast.error('User not found');
      } else {
        signInWithPopup(auth, provider)
          .then(result => {
            // const user = result.user;
            toast.success('Login Successfully');
            redirectUser();
          })
          .catch(error => {
            toast.error(error.message);
          });
      }
    });
  };


  return (
    <Container
      maxWidth="xs"
      sx={{
        height: '90vh',
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <PaperRounding sx={{ width: '100%' }}>
        <FormControl
          component="form"
          noValidate
          onSubmit={loginUser}
          sx={{
            p: 2,
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" color="orange" align="center">
            Login
          </Typography>
          <TextFieldForm
            margin="normal"
            required
            fullWidth
            autoComplete="on"
            id="email"
            label="Email Address"
            name="email"
            // autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}

          />
          <TextFieldForm
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Typography variant="body2" color="textSecondary">
            <Button color="info" onClick={() => navigate(`${BASE_URL}/reset`)}>
              Reset Password
            </Button>
          </Typography>
          <ButtonBlueBack
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </ButtonBlueBack>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<GoogleIcon />}
            sx={{ mb: 2 }}
            onClick={signInWithGoogle}
          >
            Login with Google
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            Don't have an account?{' '}
            <Button color="info" onClick={() => navigate(`${BASE_URL}/register`)}>
              Register
            </Button>
          </Typography>
        </FormControl>
      </PaperRounding>
    </Container>
  );
};

export default LoginForm;
