import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { portfolioService } from '../services/api';

export default function AdminLogin({ onLoginSuccess, onBackToPortfolio }) {
  const [username, setUsername] = useState(''); //admin
  const [password, setPassword] = useState(''); //admin@portfolio2026
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await portfolioService.login({ username, password });
      if (res.token) {
        localStorage.setItem('portfolio_auth_token', res.token);
        onLoginSuccess();
      } else {
        setError('Login failed. Please check credentials.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#070b14',
        backgroundImage: 'radial-gradient(ellipse at 50% 30%, rgba(99, 102, 241, 0.15), transparent 70%)',
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Card
          sx={{
            background: 'rgba(17, 24, 39, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 3.5,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
            p: 1.5,
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            {/* Logo and Header */}
            <Box sx={{ textAlign: 'center', mb: 3.5 }}>
              <Box
                sx={{
                  width: 54,
                  height: 54,
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1.5,
                  boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
                }}
              >
                <LockOutlinedIcon sx={{ color: '#ffffff', fontSize: 28 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                Control Panel Login
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5 }}>
                Manage your portfolio data and Excel sync
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlinedIcon sx={{ color: '#94a3b8' }} />
                    </InputAdornment>

                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: '#94a3b8' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

             {/* <Box sx={{ p: 1.5, bgcolor: 'rgba(99, 102, 241, 0.08)', borderRadius: 2, border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                <Typography variant="caption" sx={{ color: '#cbd5e1', display: 'block' }}>
                  <strong>Default Credentials:</strong>
                </Typography>
                <Typography variant="caption" sx={{ color: '#818cf8', display: 'block' }}>
                  User: <code>admin</code> | Pass: <code>admin@portfolio2026</code>
                </Typography>
              </Box> */}

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.4,
                  fontWeight: 700,
                  fontSize: '1rem',
                  mt: 0.5,
                }}
              >
                {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
              </Button>

              <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                onClick={onBackToPortfolio}
                sx={{ color: '#94a3b8', '&:hover': { color: '#f8fafc' } }}
              >
                Return to Portfolio
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
