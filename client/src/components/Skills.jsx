import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
} from '@mui/material';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Skills({ skills }) {
  const skillCategories = skills || [];

  return (
    <Box
      id="skills"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'rgba(10, 15, 28, 0.6)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            icon={<BuildCircleOutlinedIcon sx={{ fontSize: 16 }} />}
            label="Technical Expertise"
            size="small"
            sx={{
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              color: '#34d399',
              fontWeight: 600,
              mb: 1.5,
            }}
          />
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 1.5 }}>
            Skills & Technologies
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 650, mx: 'auto' }}>
            Comprehensive modern frontend toolchain, cloud CI/CD pipelines, and full-stack API capabilities.
          </Typography>
        </Box>

        {/* Skills Cards Grid */}
        <Grid container spacing={3.5}>
          {skillCategories.map((cat, cIdx) => (
            <Grid item xs={12} md={4} key={cat.category || cIdx}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(17, 24, 39, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 3,
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
                  <Box
                    sx={{
                      pb: 2,
                      mb: 2.5,
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor:
                          cIdx === 0 ? '#6366f1' : cIdx === 1 ? '#06b6d4' : '#10b981',
                        boxShadow: `0 0 10px ${
                          cIdx === 0 ? '#6366f1' : cIdx === 1 ? '#06b6d4' : '#10b981'
                        }`,
                      }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.1rem' }}>
                      {cat.category}
                    </Typography>
                  </Box>

                  {/* Skill Items */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {(cat.items || []).map((skill, sIdx) => {
                      const levelPercent =
                        skill.level === 'Expert' ? 95 : skill.level === 'Advanced' ? 82 : 68;
                      const levelColor =
                        skill.level === 'Expert'
                          ? '#10b981'
                          : skill.level === 'Advanced'
                          ? '#6366f1'
                          : '#06b6d4';

                      return (
                        <Box key={sIdx}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.7 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                              <CheckCircleIcon sx={{ fontSize: 16, color: levelColor }} />
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#f1f5f9' }}>
                                {skill.name}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                                {skill.years}
                              </Typography>
                              <Chip
                                label={skill.level}
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: '0.65rem',
                                  fontWeight: 600,
                                  backgroundColor: `${levelColor}1a`,
                                  color: levelColor,
                                  border: `1px solid ${levelColor}33`,
                                }}
                              />
                            </Box>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={levelPercent}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                                backgroundColor: levelColor,
                              },
                            }}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
