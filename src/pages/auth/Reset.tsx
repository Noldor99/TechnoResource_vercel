import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ButtonBlueBack from '../../components/styleComponents/buttons/ButtonBlueBack';
import PaperRounding from '../../components/styleComponents/containers/PaperRounding';
import TextFieldForm from '../../components/styleComponents/TextFieldForm';

const ResetPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle reset password logic here
    setMessage(`Instructions for resetting your password have been sent to ${email}`);
    setEmail('');
  };

  return (
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
      <PaperRounding>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            p: 2,
            width: '100%',
            boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.2)'
          }}
        >
          <Typography component="h1" variant="h5" color='orange' align="center">
            Reset Password
          </Typography>
          <TextFieldForm
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ButtonBlueBack
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </ButtonBlueBack>
          {message && (
            <Typography variant="body2" color="textSecondary" align="center">
              {message}
            </Typography>
          )}
        </Box>
      </PaperRounding>
    </Container>
  );
};

export default ResetPassword;
