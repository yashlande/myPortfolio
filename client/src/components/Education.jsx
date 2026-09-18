import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

export default function Education({ education, achievements }) {
  const edus = education || [];
  const achs = achievements || [];

  return (
    <Box id="education" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Education Column */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <SchoolOutlinedIcon sx={{ color: '#818cf8', fontSize: 28 }} />
              <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
                Education
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {edus.map((edu, idx) => (
                <Card
                  key={edu.id || idx}
                  sx={{
                    background: 'rgba(17, 24, 39, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    p: 1,
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.1rem' }}>
                        {edu.degree}
                      </Typography>
                      <Chip
                        label={edu.year}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(99, 102, 241, 0.15)',
                          color: '#818cf8',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>

                    <Typography variant="body2" sx={{ color: '#cbd5e1', mb: 1 }}>
                      {edu.institution}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                        Graduation Score:
                      </Typography>
                      <Chip
                        label={edu.score}
                        size="small"
                        sx={{
                          height: 22,
                          backgroundColor: 'rgba(16, 185, 129, 0.15)',
                          color: '#34d399',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Achievements & Certifications Column */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmojiEventsOutlinedIcon sx={{ color: '#fbbf24', fontSize: 28 }} />
              <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
                Certifications & Honors
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {achs.map((ach, idx) => (
                <Card
                  key={ach.id || idx}
                  sx={{
                    background: 'rgba(17, 24, 39, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    p: 1,
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
                      <VerifiedOutlinedIcon sx={{ color: '#10b981', fontSize: 20 }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.05rem' }}>
                        {ach.title}
                      </Typography>
                    </Box>

                    {ach.issuer && (
                      <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 600, display: 'block', mb: 0.8 }}>
                        {ach.issuer}
                      </Typography>
                    )}

                    <Typography variant="body2" sx={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                      {ach.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
