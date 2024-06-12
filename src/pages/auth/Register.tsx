import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { toast } from "react-toastify";
import { useState } from "react";
import { Button, Container, FormControl, Typography } from "@mui/material";
import ButtonBlueBack from "../../components/styleComponents/buttons/ButtonBlueBack";
import { BASE_URL } from "../../URL";
import PaperRounding from "../../components/styleComponents/containers/PaperRounding";
import TextFieldForm from "../../components/styleComponents/TextFieldForm";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
//@ts-ignore
import ValidationSchema from '../../schema/ValidationSchema'


const Register = () => {


  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  const defaultValues = {
    email: '',
    phone: ''
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(ValidationSchema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState: { errors, isValid } } = methods;
  const navigate = useNavigate();

  const registerUser = (e: any) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Passwords do not match.");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, e.email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Create user document in Firestore
        addDoc(collection(db, "users"), {
          email: user.email,
          phone: e.phone,
          displayName: "User" + Math.floor(Math.random() * 1000),
          photoURL: '',
          role: 'user',
          createdAt: Timestamp.now().toDate(),
        });

        setIsLoading(false);
        toast.success("Registration Successful...");
        navigate(`${BASE_URL}/login`);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };



  return (
    <FormProvider {...methods}>
      <Container
        component="main"
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
            //@ts-ignore
            onSubmit={handleSubmit(registerUser)}
            sx={{
              p: 2,
              width: '100%',
              boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)'
            }}
          >
            <Typography component="h1" variant="h5" color='orange' align="center" >
              Register
            </Typography>
            <TextFieldForm
              {...register('email' as const)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={!!errors.email}
              // @ts-ignore
              helperText={errors.email?.message}

            />
            <TextFieldForm
              {...register('phone' as const)}
              margin="normal"
              required
              fullWidth
              type='phone'
              id="phone"
              label="Phone number"
              name="phone"
              autoComplete="phone"
              helperText={errors?.phone ? errors?.phone?.message : "+38 (XXX) XXX - XX - XX"}
              error={!!errors.phone}
            />
            <TextFieldForm
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextFieldForm
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <ButtonBlueBack
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid}
            >
              Register
            </ButtonBlueBack>
            <Typography variant="body2" color="textSecondary" align="center">
              Already have an account?{' '}
              <Button color="info" onClick={() => navigate(`${BASE_URL}/login`)}>
                Login
              </Button>
            </Typography>
          </FormControl>
        </PaperRounding>
      </Container>
    </FormProvider>
  );
};

export default Register;
