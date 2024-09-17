import React, { useState, useContext } from 'react';
import { TextField, Button, Paper, Typography, Box, Link, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { TransactionContext  } from '../src/context/Master_TransactionContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '400px',
  margin: '100px auto',
  textAlign: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)',
  borderRadius: '8px',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: '6px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontWeight: 'bold',
  fontSize: '1.1rem',
  textTransform: 'none',
  borderRadius: '6px',
}));

const GreenButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontWeight: 'bold',
  fontSize: '1.1rem',
  textTransform: 'none',
  borderRadius: '6px',
  backgroundColor: '#42b72a',
  '&:hover': {
    backgroundColor: '#36a420',
  },
}));

const ConnectWalletButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(1.5),
  fontWeight: 'bold',
  fontSize: '1.1rem',
  textTransform: 'none',
  borderRadius: '6px',
  backgroundColor: '#2952e3',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#2546bd',
  },
}));


const Login = () => {
  const { connectWallet, currentAccount, soilCarbonContent, setSoilCarbonContent, sendTransaction } = useContext(TransactionContext);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      navigate('/soil-carbon-predictor');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', paddingTop: 8 }}>
      <StyledPaper elevation={0}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1877f2', fontWeight: 'bold', marginBottom: 4 }}>
          Welcome, Login to Continue
        </Typography>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            name="email"
            placeholder="Email address or phone number"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <StyledTextField
            fullWidth
            name="password"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <StyledButton 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
          >
            Log In
          </StyledButton>
        </form>
        <Divider sx={{ my: 3 }} />
        {!currentAccount && (
          <ConnectWalletButton onClick={connectWallet} fullWidth>
            Connect Wallet
          </ConnectWalletButton>
        )}
      </StyledPaper>
    </Box>
  );
};

export default Login;