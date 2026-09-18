import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Chip,
  Paper,
  Stack,
  IconButton
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadIcon from '@mui/icons-material/Download';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import BoltIcon from '@mui/icons-material/Bolt';

export default function Hero({ profile, onNavigateAdmin }) {
  const p = profile || {};

  return (
    <Box
      id="about"
      sx={{
        position: 'relative',
        pt: { xs: 8, md: 14 },
        pb: { xs: 8, md: 12 },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={5} alignItems="center">
          {/* Left Column: Bio & Call to action */}
          <Grid item xs={12} md={7}>
            {/* Status chip */}
            <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              <Chip
                icon={<BoltIcon sx={{ color: '#10b981 !important', fontSize: '18px !important' }} />}
                label="Available for Senior Frontend & React Roles"
                size="small"
                sx={{
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  color: '#34d399',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  fontWeight: 600,
                  py: 1.8,
                  px: 1,
                }}
              />
              <Chip
                label="5+ Years Experience"
                size="small"
                sx={{
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  color: '#818cf8',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  fontWeight: 600,
                }}
              />
            </Box>

            {/* Main Greeting & Name */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              Hi, I'm{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #38bdf8 50%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {p.name || 'Yashwant Lande'}
              </Box>
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="h5"
              sx={{
                color: '#94a3b8',
                fontWeight: 500,
                mb: 3,
                fontSize: { xs: '1.15rem', md: '1.35rem' },
              }}
            >
              {p.title || 'Senior Frontend Developer'} —{' '}
              <Box component="span" sx={{ color: '#38bdf8' }}>
                React.js, TypeScript & Material Design
              </Box>
            </Typography>

            {/* Summary */}
            <Typography
              variant="body1"
              sx={{
                color: '#cbd5e1',
                mb: 4,
                maxWidth: '620px',
                fontSize: '1.05rem',
                lineHeight: 1.7,
              }}
            >
              {p.summary ||
                'Frontend Developer with 5+ years of experience building production-scale React applications in fully remote development environments. Experienced in developing enterprise dashboards, data-driven platforms, and customer-facing web applications using React.js, TypeScript, and REST APIs.'}
            </Typography>

            {/* Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                href="#projects"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 3.5,
                  py: 1.4,
                  fontSize: '1rem',
                }}
              >
                View Enterprise Projects
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="/resume_yashwant_lande.html"
                target="_blank"
                startIcon={<DownloadIcon />}
                sx={{
                  px: 3,
                  py: 1.4,
                  fontSize: '1rem',
                  borderColor: 'rgba(56, 189, 248, 0.4)',
                  color: '#38bdf8',
                  '&:hover': {
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.08)',
                  },
                }}
              >
                Download Resume
              </Button>
            </Stack>

            {/* Quick Contact & Socials */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <IconButton
                component="a"
                href={p.github || 'https://github.com/yashlande'}
                target="_blank"
                sx={{
                  color: '#94a3b8',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  '&:hover': { color: '#ffffff', bgcolor: 'rgba(99,102,241,0.2)' },
                }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                component="a"
                href={p.linkedin || 'https://www.linkedin.com/in/yashwant-lande-638a5510a/'}
                target="_blank"
                sx={{
                  color: '#94a3b8',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  '&:hover': { color: '#38bdf8', bgcolor: 'rgba(6,182,212,0.2)' },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component="a"
                href={`mailto:${p.email || 'yashlande@gmail.com'}`}
                sx={{
                  color: '#94a3b8',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  '&:hover': { color: '#10b981', bgcolor: 'rgba(16,185,129,0.2)' },
                }}
              >
                <EmailIcon />
              </IconButton>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#94a3b8', fontSize: '0.9rem', ml: 1 }}>
                <LocationOnIcon sx={{ fontSize: 18, color: '#ef4444' }} />
                <span>{p.location || 'Pandharpur, India'}</span>
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Interactive Highlights & Stats Card */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
              }}
            >
              {/* Glassmorphic Metric Cards */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper
                    sx={{
                      p: 3,
                      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(99, 102, 241, 0.25)',
                      borderRadius: 3,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h3" sx={{ color: '#818cf8', fontWeight: 800, mb: 0.5 }}>
                      {p.yearsExperience || '5+'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                      Years Production Experience
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <Paper
                    sx={{
                      p: 3,
                      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                      borderRadius: 3,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h3" sx={{ color: '#22d3ee', fontWeight: 800, mb: 0.5 }}>
                      {p.projectsCompleted || '6+'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                      Enterprise Projects
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <Paper
                    sx={{
                      p: 3,
                      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      borderRadius: 3,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h3" sx={{ color: '#34d399', fontWeight: 800, mb: 0.5 }}>
                      60%
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                      Lead Time Reduction
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6}>
                  <Paper
                    sx={{
                      p: 3,
                      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(244, 63, 94, 0.25)',
                      borderRadius: 3,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h3" sx={{ color: '#fb7185', fontWeight: 800, mb: 0.5 }}>
                      65%
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                      Dev Cycle Acceleration
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Core Competencies Box */}
              <Paper
                sx={{
                  p: 3,
                  background: 'rgba(17, 24, 39, 0.8)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 3,
                }}
              >
                <Typography variant="subtitle2" sx={{ color: '#38bdf8', fontWeight: 700, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Key Engineering Highlights
                </Typography>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <CheckCircleOutlinedIcon sx={{ color: '#10b981', fontSize: 20, mt: 0.2 }} />
                    <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                      <strong>Vodafone Idea AI Tool:</strong> Built ChatGPT-like CV screening assistant with custom querying controls.
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <CheckCircleOutlinedIcon sx={{ color: '#6366f1', fontSize: 20, mt: 0.2 }} />
                    <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                      <strong>Solar Square:</strong> Modernized document workflows, cutting commissioning lead time by 60%.
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <CheckCircleOutlinedIcon sx={{ color: '#06b6d4', fontSize: 20, mt: 0.2 }} />
                    <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                      <strong>Gessa Studio:</strong> Engineered low-code React project builder accelerating UI creation by 65%.
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
