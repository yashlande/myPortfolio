import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  Alert,
  Snackbar,
  Stack,
} from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { portfolioService } from '../services/api';

export default function Contact({ profile }) {
  const p = profile || {};
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setNotification({ open: true, message: 'Please complete all required fields.', severity: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      await portfolioService.sendContact(formData);
      setNotification({
        open: true,
        message: 'Message sent successfully! Yashwant will get back to you soon.',
        severity: 'success',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setNotification({
        open: true,
        message: 'Failed to send message. Please reach out directly via email.',
        severity: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'rgba(10, 15, 28, 0.6)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 7 }}>
          <Chip
            icon={<MailOutlinedIcon sx={{ fontSize: 16 }} />}
            label="Get In Touch"
            size="small"
            sx={{
              backgroundColor: 'rgba(99, 102, 241, 0.12)',
              color: '#818cf8',
              fontWeight: 600,
              mb: 1.5,
            }}
          />
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 1.5 }}>
            Let's Build Something Exceptional
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 650, mx: 'auto' }}>
            Open for full-time Senior Frontend roles, high-impact consulting, or contract enterprise UI architecture.
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {/* Left Column: Direct Info Cards */}
          <Grid item xs={12} md={5}>
            <Stack spacing={2.5}>
              <Card sx={{ background: 'rgba(17, 24, 39, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.5 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2.5,
                      backgroundColor: 'rgba(99, 102, 241, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#818cf8',
                    }}
                  >
                    <MailOutlinedIcon />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
                      Email Address
                    </Typography>
                    <Typography
                      component="a"
                      href={`mailto:${p.email || 'yashlande@gmail.com'}`}
                      sx={{
                        display: 'block',
                        color: '#f8fafc',
                        fontWeight: 600,
                        textDecoration: 'none',
                        '&:hover': { color: '#818cf8' },
                      }}
                    >
                      {p.email || 'yashlande@gmail.com'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ background: 'rgba(17, 24, 39, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.5 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2.5,
                      backgroundColor: 'rgba(6, 182, 212, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#22d3ee',
                    }}
                  >
                    <PhoneIcon />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
                      Direct Phone / WhatsApp
                    </Typography>
                    <Typography
                      component="a"
                      href={`tel:${p.phone || '+919511645690'}`}
                      sx={{
                        display: 'block',
                        color: '#f8fafc',
                        fontWeight: 600,
                        textDecoration: 'none',
                        '&:hover': { color: '#22d3ee' },
                      }}
                    >
                      {p.phone || '+91- 9511645690'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ background: 'rgba(17, 24, 39, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.5 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2.5,
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#34d399',
                    }}
                  >
                    <LocationOnIcon />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
                      Location
                    </Typography>
                    <Typography sx={{ color: '#f8fafc', fontWeight: 600 }}>
                      {p.location || 'Pandharpur, Maharashtra, India'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Social Profiles */}
              <Box sx={{ display: 'flex', gap: 2, pt: 1 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  href={p.github || 'https://github.com/yashlande'}
                  target="_blank"
                  sx={{ py: 1.2 }}
                >
                  GitHub
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<LinkedInIcon />}
                  href={p.linkedin || 'https://www.linkedin.com/in/yashwant-lande-638a5510a/'}
                  target="_blank"
                  sx={{ py: 1.2, borderColor: 'rgba(6,182,212,0.4)', color: '#38bdf8' }}
                >
                  LinkedIn
                </Button>
              </Box>
            </Stack>
          </Grid>

          {/* Right Column: Interactive Form */}
          <Grid item xs={12} md={7}>
            <Card sx={{ background: 'rgba(17, 24, 39, 0.85)', border: '1px solid rgba(255, 255, 255, 0.1)', p: { xs: 2.5, md: 4 } }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#f8fafc' }}>
                Send a Direct Message
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                Fill out this quick form and I will respond to your email inquiry promptly.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name *"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Your Email *"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Project Scope or Message *"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={submitting}
                  endIcon={<SendIcon />}
                  sx={{ py: 1.4, mt: 1 }}
                >
                  {submitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
