import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Divider,
} from '@mui/material';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';


export default function Experience({ experience }) {
  const exps = experience || [];

  return (
    <Box
      id="experience"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'rgba(10, 15, 28, 0.6)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 7 }}>
          <Chip
            icon={<WorkHistoryOutlinedIcon sx={{ fontSize: 16 }} />}
            label="Career History"
            size="small"

            sx={{
              backgroundColor: 'rgba(99, 102, 241, 0.12)',
              color: '#818cf8',
              fontWeight: 600,
              mb: 1.5,
            }}
          />
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 1.5 }}>
            Professional Experience
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 650, mx: 'auto' }}>
            Track record of shipping enterprise React applications, customer-facing platforms, and leading frontend architectural workflows.
          </Typography>
        </Box>

        {/* Experience Timeline Grid */}
        <Box sx={{ position: 'relative' }}>
          <Grid container spacing={3}>
            {exps.map((exp, index) => (
              <Grid item xs={12} key={exp.id || index}>
                <Card
                  sx={{
                    position: 'relative',
                    borderLeft: '4px solid',
                    borderLeftColor:
                      index === 0 ? '#6366f1' : index === 1 ? '#06b6d4' : index === 2 ? '#10b981' : '#64748b',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(4px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
                      borderColor: 'rgba(99, 102, 241, 0.4)',
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                    <Grid container spacing={2} alignItems="flex-start">
                      <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 0.5 }}>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                            {exp.role}
                          </Typography>
                          <Typography variant="h6" sx={{ color: '#818cf8', fontWeight: 600 }}>
                            @ {exp.company}
                          </Typography>
                        </Box>

                        <Typography variant="body1" sx={{ color: '#cbd5e1', mt: 1.5, mb: 1.5, lineHeight: 1.7 }}>
                          {exp.description}
                        </Typography>

                        {exp.highlights && (
                          <Box
                            sx={{
                              p: 1.5,
                              mt: 1.5,
                              borderRadius: 2,
                              backgroundColor: 'rgba(99, 102, 241, 0.08)',
                              border: '1px dashed rgba(99, 102, 241, 0.25)',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 1,
                            }}
                          >
                            <StarBorderIcon sx={{ color: '#818cf8', fontSize: 20, mt: 0.2 }} />
                            <Typography variant="body2" sx={{ color: '#e2e8f0', fontWeight: 500 }}>
                              <strong>Key Impact:</strong> {exp.highlights}
                            </Typography>
                          </Box>
                        )}
                      </Grid>

                      {/* Right side metadata */}
                      <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.8,
                            px: 1.5,
                            py: 0.6,
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: '#38bdf8',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            mb: 1,
                          }}
                        >
                          <CalendarTodayIcon sx={{ fontSize: 15 }} />
                          {exp.duration}
                        </Box>
                        {exp.location && (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: { xs: 'flex-start', md: 'flex-end' },
                              gap: 0.5,
                              color: '#94a3b8',
                              fontSize: '0.85rem',
                            }}
                          >
                            <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
                            {exp.location}
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
