import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Tabs,
  Tab,
  Stack,
  IconButton
} from '@mui/material';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import CodeIcon from '@mui/icons-material/Code';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarsIcon from '@mui/icons-material/Stars';

export default function Projects({ projects }) {
  const [selectedTag, setSelectedTag] = useState('ALL');
  const projs = projects || [];

  // Derive unique tags
  const tags = ['ALL', ...new Set(projs.map((p) => p.tag).filter(Boolean))];

  const filteredProjects =
    selectedTag === 'ALL'
      ? projs
      : projs.filter((p) => p.tag === selectedTag);

  return (
    <Box id="projects" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Chip
            icon={<FolderOpenOutlinedIcon sx={{ fontSize: 16 }} />}
            label="Featured Portfolio"
            size="small"
            sx={{
              backgroundColor: 'rgba(6, 182, 212, 0.12)',
              color: '#38bdf8',
              fontWeight: 600,
              mb: 1.5,
            }}
          />
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 1.5 }}>
            Enterprise Projects & Platforms
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 650, mx: 'auto' }}>
            Production web apps built for major brands like Vodafone Idea, Solar Square, and innovative low-code developer ecosystems.
          </Typography>
        </Box>

        {/* Category Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <Tabs
            value={selectedTag}
            onChange={(e, val) => setSelectedTag(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              p: 0.5,
              borderRadius: 3,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              '& .MuiTabs-indicator': {
                backgroundColor: '#6366f1',
                height: 3,
                borderRadius: 1.5,
              },
            }}
          >
            {tags.map((tag) => (
              <Tab
                key={tag}
                label={tag === 'ALL' ? 'All Projects' : tag}
                value={tag}
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  minHeight: 40,
                  '&.Mui-selected': {
                    color: '#818cf8',
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={3.5}>
          {filteredProjects.map((proj, index) => (
            <Grid item xs={12} md={6} key={proj.id || index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(145deg, rgba(17, 24, 39, 0.9) 0%, rgba(10, 15, 28, 0.95) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'rgba(99, 102, 241, 0.4)',
                    boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5)',
                  },
                }}
              >
                {proj.featured && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      px: 1.2,
                      py: 0.4,
                      borderRadius: 1.5,
                      backgroundColor: 'rgba(99, 102, 241, 0.18)',
                      border: '1px solid rgba(99, 102, 241, 0.35)',
                      color: '#a5b4fc',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    <StarsIcon sx={{ fontSize: 14, color: '#fbbf24' }} /> Featured
                  </Box>
                )}

                <CardContent sx={{ p: 3.5, flexGrow: 1 }}>
                  {/* Category Tag & Company */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Chip
                      label={proj.tag || 'Web App'}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(6, 182, 212, 0.12)',
                        color: '#22d3ee',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                      {proj.company}
                    </Typography>
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: '#f8fafc',
                      mb: 1.5,
                      fontSize: '1.35rem',
                    }}
                  >
                    {proj.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#cbd5e1',
                      lineHeight: 1.7,
                      mb: 2.5,
                    }}
                  >
                    {proj.description}
                  </Typography>

                  {/* Impact Metric Box */}
                  {proj.impact && (
                    <Box
                      sx={{
                        p: 1.5,
                        mb: 2.5,
                        borderRadius: 2,
                        backgroundColor: 'rgba(16, 185, 129, 0.08)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <TrendingUpIcon sx={{ color: '#10b981', fontSize: 18 }} />
                      <Typography variant="caption" sx={{ color: '#34d399', fontWeight: 600 }}>
                        {proj.impact}
                      </Typography>
                    </Box>
                  )}

                  {/* Tech stack chips */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mt: 'auto' }}>
                    {(proj.tech || '').split(',').map((techItem, tIdx) => (
                      <Chip
                        key={tIdx}
                        label={techItem.trim()}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          color: '#e2e8f0',
                          fontSize: '0.75rem',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>

                <CardActions sx={{ px: 3.5, pb: 3, pt: 0, justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                    Role: <span style={{ color: '#94a3b8' }}>{proj.role || 'Front-End Developer'}</span>
                  </Typography>

                  {proj.url ? (
                    <Button
                      size="small"
                      variant="outlined"
                      endIcon={<LaunchIcon sx={{ fontSize: 15 }} />}
                      href={proj.url}
                      target="_blank"
                      sx={{
                        fontSize: '0.8rem',
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                        color: '#818cf8',
                        '&:hover': {
                          borderColor: '#818cf8',
                          backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        },
                      }}
                    >
                      Live App
                    </Button>
                  ) : (
                    <Chip
                      label="Internal Enterprise Platform"
                      size="small"
                      sx={{
                        fontSize: '0.7rem',
                        color: '#64748b',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                      }}
                    />
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
