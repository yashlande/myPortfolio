import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Alert,
  Snackbar,
  Divider,
  Paper,
  Stack,
  FormControlLabel,
  Switch,
  MenuItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TableViewIcon from '@mui/icons-material/TableView';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import BuildIcon from '@mui/icons-material/Build';
import SchoolIcon from '@mui/icons-material/School';
import KeyIcon from '@mui/icons-material/Key';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import { portfolioService } from '../services/api';

export default function AdminDashboard({ portfolio, onRefresh, onBackToPortfolio, onLogout }) {
  const [activeTab, setActiveTab] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [saving, setSaving] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState(portfolio?.profile || {});

  // Experience Dialog State
  const [expDialogOpen, setExpDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [expForm, setExpForm] = useState({
    company: '',
    role: '',
    duration: '',
    location: '',
    description: '',
    highlights: '',
  });

  // Project Dialog State
  const [projDialogOpen, setProjDialogOpen] = useState(false);
  const [editingProj, setEditingProj] = useState(null);
  const [projForm, setProjForm] = useState({
    title: '',
    company: '',
    role: 'Front-End Developer',
    url: '',
    tech: '',
    tag: 'Web App',
    featured: false,
    description: '',
    impact: '',
  });

  // Password change state
  const [credForm, setCredForm] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
  });

  // Excel upload file state
  const [excelFile, setExcelFile] = useState(null);
  const [googleSheetUrl, setGoogleSheetUrl] = useState(() => portfolioService.getSavedGoogleSheetId?.() || '');

  const showToast = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  // --- Profile Actions ---
  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await portfolioService.updateProfile(profileForm);
      showToast('Profile updated and saved to Excel successfully!');
      onRefresh();
    } catch (err) {
      showToast('Failed to update profile.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // --- Experience Actions ---
  const handleOpenAddExp = () => {
    setEditingExp(null);
    setExpForm({
      company: '',
      role: '',
      duration: '',
      location: 'Remote',
      description: '',
      highlights: '',
    });
    setExpDialogOpen(true);
  };

  const handleOpenEditExp = (exp) => {
    setEditingExp(exp);
    setExpForm({
      company: exp.company || '',
      role: exp.role || '',
      duration: exp.duration || '',
      location: exp.location || '',
      description: exp.description || '',
      highlights: exp.highlights || '',
    });
    setExpDialogOpen(true);
  };

  const handleSaveExp = async () => {
    try {
      if (editingExp) {
        await portfolioService.updateExperience(editingExp.id, expForm);
        showToast('Experience updated in Excel!');
      } else {
        await portfolioService.addExperience(expForm);
        showToast('New experience entry created in Excel!');
      }
      setExpDialogOpen(false);
      onRefresh();
    } catch (err) {
      showToast('Failed to save experience entry.', 'error');
    }
  };

  const handleDeleteExp = async (id) => {
    if (!window.confirm('Are you sure you want to delete this work experience entry?')) return;
    try {
      await portfolioService.deleteExperience(id);
      showToast('Experience entry removed from Excel!');
      onRefresh();
    } catch (err) {
      showToast('Failed to delete experience.', 'error');
    }
  };

  // --- Projects Actions ---
  const handleOpenAddProj = () => {
    setEditingProj(null);
    setProjForm({
      title: '',
      company: '',
      role: 'Front-End Developer',
      url: '',
      tech: '',
      tag: 'Web App',
      featured: false,
      description: '',
      impact: '',
    });
    setProjDialogOpen(true);
  };

  const handleOpenEditProj = (proj) => {
    setEditingProj(proj);
    setProjForm({
      title: proj.title || '',
      company: proj.company || '',
      role: proj.role || 'Front-End Developer',
      url: proj.url || '',
      tech: proj.tech || '',
      tag: proj.tag || 'Web App',
      featured: !!proj.featured,
      description: proj.description || '',
      impact: proj.impact || '',
    });
    setProjDialogOpen(true);
  };

  const handleSaveProj = async () => {
    try {
      if (editingProj) {
        await portfolioService.updateProject(editingProj.id, projForm);
        showToast('Project updated in Excel!');
      } else {
        await portfolioService.addProject(projForm);
        showToast('New project created and saved to Excel!');
      }
      setProjDialogOpen(false);
      onRefresh();
    } catch (err) {
      showToast('Failed to save project.', 'error');
    }
  };

  const handleDeleteProj = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await portfolioService.deleteProject(id);
      showToast('Project removed from Excel!');
      onRefresh();
    } catch (err) {
      showToast('Failed to delete project.', 'error');
    }
  };

  // --- Excel Import Actions ---
  const handleUploadExcel = async () => {
    if (!excelFile) {
      showToast('Please select a valid .xlsx file first.', 'warning');
      return;
    }
    setSaving(true);
    try {
      await portfolioService.importExcel(excelFile);
      showToast('Excel file imported! Portfolio data successfully refreshed.');
      setExcelFile(null);
      onRefresh();
    } catch (err) {
      showToast('Failed to import Excel: ' + (err.response?.data?.error || err.message), 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleResetData = async () => {
    if (!window.confirm('Are you sure you want to restore all portfolio data to original resume values?')) return;
    setSaving(true);
    try {
      await portfolioService.resetToDefault();
      showToast('Portfolio restored to original resume defaults!');
      onRefresh();
    } catch (err) {
      showToast('Failed to reset data.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // --- Security Credentials ---
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await portfolioService.changeCredentials(credForm);
      showToast('Credentials updated successfully!');
      setCredForm({ currentPassword: '', newUsername: '', newPassword: '' });
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update credentials.', 'error');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#070b14', pb: 10 }}>
      {/* Top Navbar */}
      <AppBar
        position="sticky"
        sx={{
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  p: 0.8,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <TableViewIcon sx={{ color: '#fff', fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2, color: '#f8fafc' }}>
                  Portfolio Control Panel
                </Typography>
                <Typography variant="caption" sx={{ color: '#06b6d4', fontWeight: 600 }}>
                  Excel Backend Connected: <code>portfolio_data.xlsx</code>
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<FileDownloadIcon />}
                onClick={() => {
                  portfolioService.exportExcel('portfolio_data.xlsx');
                  showToast('Downloaded portfolio_data.xlsx to your Downloads folder!');
                }}
                sx={{
                  borderColor: 'rgba(16, 185, 129, 0.5)',
                  color: '#34d399',
                  '&:hover': {
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  },
                }}
              >
                Export Excel (.xlsx)
              </Button>

              <Button
                variant="outlined"
                size="small"
                startIcon={<ArrowBackIcon />}
                onClick={onBackToPortfolio}
                sx={{ color: '#94a3b8', borderColor: 'rgba(255,255,255,0.15)' }}
              >
                View Website
              </Button>

              <IconButton
                onClick={onLogout}
                title="Logout"
                sx={{ color: '#ef4444', bgcolor: 'rgba(239, 68, 68, 0.1)' }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Container */}
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.1)', mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(e, val) => setActiveTab(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': { backgroundColor: '#6366f1', height: 3 },
            }}
          >
            <Tab icon={<PersonIcon />} iconPosition="start" label="Profile & Bio" />
            <Tab icon={<WorkIcon />} iconPosition="start" label={`Experience (${portfolio?.experience?.length || 0})`} />
            <Tab icon={<FolderSpecialIcon />} iconPosition="start" label={`Projects (${portfolio?.projects?.length || 0})`} />
            <Tab icon={<BuildIcon />} iconPosition="start" label="Skills Matrix" />
            <Tab icon={<SchoolIcon />} iconPosition="start" label="Education & Honors" />
            <Tab icon={<CloudSyncIcon />} iconPosition="start" label="Excel & Google Sheets" />
            <Tab icon={<KeyIcon />} iconPosition="start" label="Admin Password" />
          </Tabs>
        </Box>

        {/* --- TAB 0: PROFILE & BIO --- */}
        {activeTab === 0 && (
          <Card sx={{ background: 'rgba(17, 24, 39, 0.85)', p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                Profile & Header Settings
              </Typography>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={saving}
                onClick={handleSaveProfile}
              >
                {saving ? 'Saving...' : 'Save Profile Changes'}
              </Button>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={profileForm.name || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Professional Title"
                  value={profileForm.title || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  value={profileForm.email || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Phone"
                  value={profileForm.phone || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={profileForm.location || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="GitHub Profile URL"
                  value={profileForm.github || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="LinkedIn Profile URL"
                  value={profileForm.linkedin || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Years of Experience Stat (e.g. 5+)"
                  value={profileForm.yearsExperience || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, yearsExperience: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Professional Summary / Bio"
                  value={profileForm.summary || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, summary: e.target.value })}
                />
              </Grid>
            </Grid>
          </Card>
        )}

        {/* --- TAB 1: WORK EXPERIENCE --- */}
        {activeTab === 1 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                  Manage Work Experience
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Add, edit, or remove companies, positions, duration, and project highlights.
                </Typography>
              </Box>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddExp}>
                Add Work Experience
              </Button>
            </Box>

            <Stack spacing={2.5}>
              {(portfolio?.experience || []).map((exp, idx) => (
                <Card
                  key={exp.id || idx}
                  sx={{
                    background: 'rgba(17, 24, 39, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    p: 2.5,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                          {exp.role}
                        </Typography>
                        <Chip
                          label={exp.company}
                          size="small"
                          sx={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', fontWeight: 600 }}
                        />
                      </Box>
                      <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 600 }}>
                        {exp.duration} • {exp.location || 'India'}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#cbd5e1', mt: 1 }}>
                        {exp.description}
                      </Typography>
                      {exp.highlights && (
                        <Typography variant="caption" sx={{ color: '#34d399', mt: 0.5, display: 'block' }}>
                          <strong>Highlights:</strong> {exp.highlights}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenEditExp(exp)}
                        sx={{ color: '#818cf8', bgcolor: 'rgba(99, 102, 241, 0.1)' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteExp(exp.id)}
                        sx={{ color: '#ef4444', bgcolor: 'rgba(239, 68, 68, 0.1)' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Box>
        )}

        {/* --- TAB 2: PROJECTS --- */}
        {activeTab === 2 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                  Manage Projects
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Showcase your enterprise applications, AI scanners, dashboards, and client platforms.
                </Typography>
              </Box>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddProj}>
                Add New Project
              </Button>
            </Box>

            <Grid container spacing={3}>
              {(portfolio?.projects || []).map((proj, idx) => (
                <Grid item xs={12} md={6} key={proj.id || idx}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(17, 24, 39, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 2.5,
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                            {proj.title}
                          </Typography>
                          {proj.featured && (
                            <Chip label="Featured" size="small" sx={{ bgcolor: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24', height: 20, fontSize: '0.65rem' }} />
                          )}
                        </Box>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                          {proj.company} • {proj.tag}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenEditProj(proj)}
                          sx={{ color: '#818cf8', bgcolor: 'rgba(99, 102, 241, 0.1)' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteProj(proj.id)}
                          sx={{ color: '#ef4444', bgcolor: 'rgba(239, 68, 68, 0.1)' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography variant="body2" sx={{ color: '#cbd5e1', mb: 2, flexGrow: 1 }}>
                      {proj.description}
                    </Typography>

                    {proj.impact && (
                      <Typography variant="caption" sx={{ color: '#34d399', fontWeight: 600, mb: 1, display: 'block' }}>
                        Impact: {proj.impact}
                      </Typography>
                    )}

                    <Typography variant="caption" sx={{ color: '#38bdf8', mb: 1, display: 'block' }}>
                      Tech: {proj.tech}
                    </Typography>

                    {proj.url && (
                      <Typography variant="caption" sx={{ color: '#818cf8' }}>
                        URL: <a href={proj.url} target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>{proj.url}</a>
                      </Typography>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* --- TAB 3: SKILLS MATRIX --- */}
        {activeTab === 3 && (
          <Card sx={{ background: 'rgba(17, 24, 39, 0.85)', p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                Technical Skills Management
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Skills are categorized and synced with the Skills sheet in <code>portfolio_data.xlsx</code>.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {(portfolio?.skills || []).map((cat, cIdx) => (
                <Grid item xs={12} md={4} key={cat.category || cIdx}>
                  <Paper sx={{ p: 2.5, bgcolor: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Typography variant="h6" sx={{ color: '#818cf8', fontWeight: 700, mb: 2 }}>
                      {cat.category}
                    </Typography>
                    <Stack spacing={1.5}>
                      {(cat.items || []).map((item, iIdx) => (
                        <Box key={iIdx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ color: '#e2e8f0', fontWeight: 500 }}>
                            {item.name}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip label={item.years} size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
                            <Chip
                              label={item.level}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: '0.65rem',
                                bgcolor: item.level === 'Expert' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                                color: item.level === 'Expert' ? '#34d399' : '#818cf8',
                              }}
                            />
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Card>
        )}

        {/* --- TAB 4: EDUCATION & HONORS --- */}
        {activeTab === 4 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ background: 'rgba(17, 24, 39, 0.85)', p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc', mb: 2 }}>
                  Education Degrees
                </Typography>
                <Stack spacing={2}>
                  {(portfolio?.education || []).map((edu, idx) => (
                    <Box key={edu.id || idx} sx={{ p: 2, bgcolor: 'rgba(15, 23, 42, 0.6)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                        {edu.degree}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                        {edu.institution}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#38bdf8' }}>
                        Year: {edu.year} | Score: {edu.score}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ background: 'rgba(17, 24, 39, 0.85)', p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc', mb: 2 }}>
                  Certificates & Achievements
                </Typography>
                <Stack spacing={2}>
                  {(portfolio?.achievements || []).map((ach, idx) => (
                    <Box key={ach.id || idx} sx={{ p: 2, bgcolor: 'rgba(15, 23, 42, 0.6)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                        {ach.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#10b981', display: 'block', mb: 0.5 }}>
                        {ach.issuer}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                        {ach.description}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* --- TAB 5: EXCEL & GOOGLE SHEETS SYNC --- */}
        {activeTab === 5 && (
          <Grid container spacing={4}>
            {/* Excel file management */}
            <Grid item xs={12} md={6}>
              <Card sx={{ background: 'rgba(17, 24, 39, 0.85)', p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#f8fafc', mb: 1 }}>
                  Local Excel File Backend
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  Your live portfolio data is stored and read directly from <code>server/portfolio_data.xlsx</code>.
                </Typography>

                <Stack spacing={3}>
                  <Box sx={{ p: 2.5, bgcolor: 'rgba(16, 185, 129, 0.08)', borderRadius: 2, border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                    <Typography variant="subtitle2" sx={{ color: '#34d399', fontWeight: 700, mb: 0.5 }}>
                      1-Click Export Live Excel
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#cbd5e1', display: 'block', mb: 2 }}>
                      Download the latest multi-sheet workbook containing all Profile, Experience, Projects, Skills, and Education data.
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="center">
                      <Button
                        variant="contained"
                        startIcon={<FileDownloadIcon />}
                        onClick={() => {
                          portfolioService.exportExcel('portfolio_data.xlsx');
                          showToast('Downloaded portfolio_data.xlsx to your Downloads folder!');
                        }}
                        sx={{ bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' } }}
                      >
                        Download portfolio_data.xlsx
                      </Button>
                      <Button
                        variant="outlined"
                        size="medium"
                        href="/portfolio_data.xlsx"
                        download="portfolio_data.xlsx"
                        sx={{
                          borderColor: 'rgba(52, 211, 153, 0.4)',
                          color: '#34d399',
                          '&:hover': { borderColor: '#10b981', bgcolor: 'rgba(16, 185, 129, 0.08)' }
                        }}
                      >
                        Direct File Download
                      </Button>
                    </Stack>
                    <Typography variant="caption" sx={{ color: '#94a3b8', mt: 1, display: 'block' }}>
                      💾 Files are saved directly to your computer's <strong>Downloads</strong> folder as a standard Microsoft Excel spreadsheet (<code>.xlsx</code>).
                    </Typography>

                  </Box>

                  <Box sx={{ p: 2.5, bgcolor: 'rgba(99, 102, 241, 0.08)', borderRadius: 2, border: '1px solid rgba(99, 102, 241, 0.25)' }}>
                    <Typography variant="subtitle2" sx={{ color: '#818cf8', fontWeight: 700, mb: 0.5 }}>
                      Import Modified Excel Workbook
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#cbd5e1', display: 'block', mb: 2 }}>
                      Upload an updated <code>.xlsx</code> file to immediately sync and refresh the portfolio website.
                    </Typography>

                    <Stack direction="row" spacing={2} alignItems="center">
                      <input
                        type="file"
                        accept=".xlsx, .xls"
                        id="excel-file-input"
                        style={{ display: 'none' }}
                        onChange={(e) => setExcelFile(e.target.files[0])}
                      />
                      <label htmlFor="excel-file-input">
                        <Button variant="outlined" component="span" startIcon={<FileUploadIcon />}>
                          {excelFile ? excelFile.name : 'Select .xlsx File'}
                        </Button>
                      </label>
                      <Button
                        variant="contained"
                        disabled={!excelFile || saving}
                        onClick={handleUploadExcel}
                      >
                        {saving ? 'Importing...' : 'Upload & Sync'}
                      </Button>
                    </Stack>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  <Box sx={{ p: 2, bgcolor: 'rgba(239, 68, 68, 0.08)', borderRadius: 2, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <Typography variant="subtitle2" sx={{ color: '#f87171', fontWeight: 700 }}>
                      Reset to Original Resume Data
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#cbd5e1', display: 'block', mb: 1.5 }}>
                      Discards modifications and resets the Excel file back to Yashwant's verified resume data.
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<RestartAltIcon />}
                      onClick={handleResetData}
                    >
                      Reset All Data to Default
                    </Button>
                  </Box>
                </Stack>
              </Card>
            </Grid>

            {/* Google Sheets Live Sync Guide */}
            <Grid item xs={12} md={6}>
              <Card sx={{ background: 'rgba(17, 24, 39, 0.85)', p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#f8fafc', mb: 1 }}>
                  Google Sheets Integration
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  How to sync this portfolio directly with a Google Sheet in Google Drive.
                </Typography>

                <Stack spacing={2.5}>
                  <Box sx={{ p: 2, bgcolor: 'rgba(15, 23, 42, 0.6)', borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#38bdf8', fontWeight: 700, mb: 1 }}>
                      Live Google Sheet Connection
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#cbd5e1', mb: 2 }}>
                      Paste your Google Sheet link or ID. Any time you update the sheet, visitors can see the changes live!
                    </Typography>

                    <Stack spacing={1.5}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                        value={googleSheetUrl}
                        onChange={(e) => setGoogleSheetUrl(e.target.value)}
                        helperText="Ensure link sharing is set to 'Anyone with the link can view'"
                      />
                      <Button
                        variant="contained"
                        disabled={!googleSheetUrl || saving}
                        onClick={async () => {
                          try {
                            setSaving(true);
                            await portfolioService.syncGoogleSheet(googleSheetUrl);
                            showToast('Successfully synchronized from Google Sheet!');
                            onRefresh();
                          } catch (err) {
                            showToast(err.message, 'error');
                          } finally {
                            setSaving(false);
                          }
                        }}
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        {saving ? 'Connecting...' : 'Fetch Live Google Sheet Data'}
                      </Button>
                    </Stack>
                  </Box>

                  <Box sx={{ p: 2, bgcolor: 'rgba(15, 23, 42, 0.6)', borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#38bdf8', fontWeight: 700, mb: 1 }}>
                      Alternative: Offline Edit & Upload
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                      Download the Excel file, edit it anytime in Microsoft Excel or Google Sheets, and upload it using the "Upload & Sync" button on the left!
                    </Typography>
                  </Box>

                  <Alert severity="info" sx={{ borderRadius: 2 }}>
                    All changes you make in this Control Panel are stored directly in your browser's local database and can be exported as Excel anytime!
                  </Alert>
                </Stack>

              </Card>
            </Grid>
          </Grid>
        )}

        {/* --- TAB 6: ADMIN PASSWORD --- */}
        {activeTab === 6 && (
          <Container maxWidth="sm">
            <Card sx={{ background: 'rgba(17, 24, 39, 0.85)', p: 3.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#f8fafc', mb: 1 }}>
                Update Admin Credentials
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                Change your control panel login username or password.
              </Typography>

              <Box component="form" onSubmit={handleChangePassword} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  fullWidth
                  type="password"
                  label="Current Password *"
                  value={credForm.currentPassword}
                  onChange={(e) => setCredForm({ ...credForm, currentPassword: e.target.value })}
                  required
                />
                <TextField
                  fullWidth
                  label="New Username (Optional)"
                  placeholder="admin"
                  value={credForm.newUsername}
                  onChange={(e) => setCredForm({ ...credForm, newUsername: e.target.value })}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="New Password *"
                  value={credForm.newPassword}
                  onChange={(e) => setCredForm({ ...credForm, newPassword: e.target.value })}
                  required
                />
                <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }}>
                  Update Credentials
                </Button>
              </Box>
            </Card>
          </Container>
        )}
      </Container>

      {/* --- ADD/EDIT EXPERIENCE DIALOG --- */}
      <Dialog open={expDialogOpen} onClose={() => setExpDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editingExp ? 'Edit Work Experience' : 'Add New Work Experience'}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            fullWidth
            label="Company Name *"
            value={expForm.company}
            onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Job Role / Title *"
            value={expForm.role}
            onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Duration (e.g. Nov 2023 - Jun 2026) *"
            value={expForm.duration}
            onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Location (e.g. Remote or Pune, India)"
            value={expForm.location}
            onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Role Description"
            value={expForm.description}
            onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
          />
          <TextField
            fullWidth
            label="Key Impact / Project Highlights"
            value={expForm.highlights}
            onChange={(e) => setExpForm({ ...expForm, highlights: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setExpDialogOpen(false)} sx={{ color: '#94a3b8' }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveExp}>
            Save to Excel
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- ADD/EDIT PROJECT DIALOG --- */}
      <Dialog open={projDialogOpen} onClose={() => setProjDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editingProj ? 'Edit Project' : 'Add New Project'}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            fullWidth
            label="Project Title *"
            value={projForm.title}
            onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Company / Client *"
            value={projForm.company}
            onChange={(e) => setProjForm({ ...projForm, company: e.target.value })}
            required
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Role"
                value={projForm.role}
                onChange={(e) => setProjForm({ ...projForm, role: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Category / Tag"
                value={projForm.tag}
                onChange={(e) => setProjForm({ ...projForm, tag: e.target.value })}
                placeholder="AI & GenAI / Enterprise"
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Live Project URL (Optional)"
            value={projForm.url}
            onChange={(e) => setProjForm({ ...projForm, url: e.target.value })}
            placeholder="https://..."
          />
          <TextField
            fullWidth
            label="Technologies Used *"
            value={projForm.tech}
            onChange={(e) => setProjForm({ ...projForm, tech: e.target.value })}
            placeholder="React TS, Node.js, MongoDB, Material UI"
            required
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description *"
            value={projForm.description}
            onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
            required
          />
          <TextField
            fullWidth
            label="Measurable Impact / Metric"
            value={projForm.impact}
            onChange={(e) => setProjForm({ ...projForm, impact: e.target.value })}
            placeholder="Reduced lead-to-commissioning time by 60%"
          />
          <FormControlLabel
            control={
              <Switch
                checked={projForm.featured}
                onChange={(e) => setProjForm({ ...projForm, featured: e.target.checked })}
                color="primary"
              />
            }
            label="Highlight as Featured Project"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setProjDialogOpen(false)} sx={{ color: '#94a3b8' }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveProj}>
            Save to Excel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Toast */}
      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
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
