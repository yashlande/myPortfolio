import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CodeIcon from '@mui/icons-material/Code';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onNavigateAdmin }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'rgba(7, 11, 20, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Box
            component="a"
            href="#"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
              }}
            >
              <CodeIcon sx={{ color: '#ffffff', fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(90deg, #ffffff 0%, #cbd5e1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2,
                }}
              >
                Yashwant Lande
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: '#06b6d4', fontWeight: 600, letterSpacing: '0.05em' }}
              >
                SENIOR FRONTEND DEV
              </Typography>
            </Box>
          </Box>

          {/* Desktop Nav Items */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                href={item.href}
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  '&:hover': {
                    color: '#818cf8',
                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            {/* Resume Button */}
            <Button
              variant="outlined"
              size="small"
              startIcon={<DescriptionOutlinedIcon />}
              href="/resume_yashwant_lande.html"
              target="_blank"
              sx={{
                ml: 1,
                borderColor: 'rgba(6, 182, 212, 0.5)',
                color: '#38bdf8',
                '&:hover': {
                  borderColor: '#06b6d4',
                  backgroundColor: 'rgba(6, 182, 212, 0.1)',
                },
              }}
            >
              Resume
            </Button>

            {/* Admin Control Panel Button */}
            <Button
              variant="contained"
              size="small"
              startIcon={<LockOutlinedIcon />}
              onClick={onNavigateAdmin}
              sx={{
                ml: 1,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6366f1 0%, #9333ea 100%)',
                },
              }}
            >
              Control Panel
            </Button>
          </Box>

          {/* Mobile Menu Toggle */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton
              color="inherit"
              aria-label="open navigation drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: '#f8fafc' }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            top: 64,
            backgroundColor: 'rgba(15, 23, 42, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: 2,
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component="a"
                href={item.href}
                onClick={handleDrawerToggle}
                sx={{ borderRadius: 2, py: 1 }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: 600, color: '#f8fafc' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<DescriptionOutlinedIcon />}
              href="/resume_yashwant_lande.html"
              target="_blank"
            >
              View Resume
            </Button>
            <Button
              variant="contained"
              fullWidth
              startIcon={<LockOutlinedIcon />}
              onClick={() => {
                handleDrawerToggle();
                onNavigateAdmin();
              }}
            >
              Admin Control Panel
            </Button>
          </Box>
        </List>
      </Drawer>
    </AppBar>
  );
}
