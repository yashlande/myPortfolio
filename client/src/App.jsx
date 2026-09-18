import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, CircularProgress, Typography } from '@mui/material';
import theme from './theme';
import { portfolioService } from './services/api';

// Public Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Admin Components
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

export default function App() {
  // Page mode: 'portfolio' or 'admin'
  const [currentPage, setCurrentPage] = useState(() => {
    return window.location.hash === '#admin' ? 'admin' : 'portfolio';
  });

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch portfolio data from backend (backed by Excel)
  const fetchPortfolioData = async () => {
    try {
      const data = await portfolioService.getPortfolio();
      setPortfolio(data);
    } catch (err) {
      console.error('Failed to load portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Check auth status
  const checkAuth = async () => {
    const token = localStorage.getItem('portfolio_auth_token');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    try {
      const res = await portfolioService.verifyAuth();
      setIsAuthenticated(res.valid);
    } catch (e) {
      setIsAuthenticated(false);
      localStorage.removeItem('portfolio_auth_token');
    }
  };

  useEffect(() => {
    fetchPortfolioData();
    checkAuth();

    // Listen to hash changes for direct #admin navigation
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentPage('admin');
      } else if (window.location.hash === '' || window.location.hash === '#portfolio') {
        setCurrentPage('portfolio');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateAdmin = () => {
    window.location.hash = '#admin';
    setCurrentPage('admin');
  };

  const handleBackToPortfolio = () => {
    window.location.hash = '#portfolio';
    setCurrentPage('portfolio');
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolio_auth_token');
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#070b14',
            gap: 2,
          }}
        >
          <CircularProgress size={48} sx={{ color: '#6366f1' }} />
          <Typography variant="body1" sx={{ color: '#94a3b8', fontWeight: 500 }}>
            Loading Yashwant Lande's Portfolio...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {currentPage === 'admin' ? (
        isAuthenticated ? (
          <AdminDashboard
            portfolio={portfolio}
            onRefresh={fetchPortfolioData}
            onBackToPortfolio={handleBackToPortfolio}
            onLogout={handleLogout}
          />
        ) : (
          <AdminLogin
            onLoginSuccess={handleLoginSuccess}
            onBackToPortfolio={handleBackToPortfolio}
          />
        )
      ) : (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#070b14', color: '#f8fafc' }}>
          <Navbar onNavigateAdmin={handleNavigateAdmin} />
          <Hero profile={portfolio?.profile} onNavigateAdmin={handleNavigateAdmin} />
          <Experience experience={portfolio?.experience} />
          <Projects projects={portfolio?.projects} />
          <Skills skills={portfolio?.skills} />
          <Education
            education={portfolio?.education}
            achievements={portfolio?.achievements}
          />
          <Contact profile={portfolio?.profile} />
          <Footer onNavigateAdmin={handleNavigateAdmin} />
        </Box>
      )}
    </ThemeProvider>
  );
}
