import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer({ onNavigateAdmin }) {
  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        backgroundColor: '#050811',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2.5,
          }}
        >
          {/* Left info */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="body1" sx={{ fontWeight: 700, color: '#f8fafc' }}>
              Yashwant Bhagwatrao Lande
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Senior Frontend Developer • Built with React, Material Design & Excel Backend
            </Typography>
          </Box>

          {/* Socials & Admin */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              component="a"
              href="https://github.com/yashlande"
              target="_blank"
              size="small"
              sx={{ color: '#94a3b8', '&:hover': { color: '#fff' } }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/yashwant-lande-638a5510a/"
              target="_blank"
              size="small"
              sx={{ color: '#94a3b8', '&:hover': { color: '#38bdf8' } }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton
              component="a"
              href="mailto:yashlande@gmail.com"
              size="small"
              sx={{ color: '#94a3b8', '&:hover': { color: '#10b981' } }}
            >
              <EmailIcon fontSize="small" />
            </IconButton>

            {/* Discreet Admin Lock */}
            <Link
              component="button"
              onClick={onNavigateAdmin}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: '#6366f1',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none',
                ml: 1,
                cursor: 'pointer',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                px: 1.2,
                py: 0.4,
                borderRadius: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  borderColor: '#818cf8',
                },
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 14 }} /> Control Panel
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
