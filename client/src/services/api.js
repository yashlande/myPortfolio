import {
  loadPortfolioData,
  savePortfolioData,
  exportExcelFile,
  importExcelFile,
  loadFromGoogleSheet,
  getSavedGoogleSheetId,
  resetPortfolioData,
  getAdminCredentials,
  updateAdminCredentials,
  verifyAdminLogin,
} from './excelService';

export const portfolioService = {
  // Public
  getPortfolio: async () => {
    return await loadPortfolioData();
  },

  sendContact: async (data) => {
    console.log('[Direct Contact Inquiry Received in Browser]:', data);
    // In pure client-side, we can open mailto or integrate EmailJS / Formspree if desired
    return { success: true, message: 'Thank you! Your message has been noted.' };
  },

  // Auth
  login: async ({ username, password }) => {
    const res = verifyAdminLogin(username, password);
    if (!res.success) {
      const error = new Error(res.message);
      error.response = { data: { message: res.message } };
      throw error;
    }
    return res;
  },

  verifyAuth: async () => {
    const token = localStorage.getItem('portfolio_auth_token');
    const creds = getAdminCredentials();
    return { valid: token === creds.token };
  },

  changeCredentials: async ({ currentPassword, newUsername, newPassword }) => {
    try {
      updateAdminCredentials(currentPassword, newUsername, newPassword);
      return { success: true };
    } catch (err) {
      const error = new Error(err.message);
      error.response = { data: { message: err.message } };
      throw error;
    }
  },

  // Profile CRUD
  updateProfile: async (profile) => {
    const data = await loadPortfolioData();
    data.profile = { ...data.profile, ...profile };
    savePortfolioData(data);
    return { success: true, profile: data.profile };
  },

  // Experience CRUD
  addExperience: async (exp) => {
    const data = await loadPortfolioData();
    const newExp = {
      id: `exp-${Date.now()}`,
      order: (data.experience?.length || 0) + 1,
      ...exp,
    };
    if (!data.experience) data.experience = [];
    data.experience.push(newExp);
    savePortfolioData(data);
    return { success: true, experience: newExp };
  },

  updateExperience: async (id, exp) => {
    const data = await loadPortfolioData();
    const index = data.experience.findIndex((e) => String(e.id) === String(id));
    if (index !== -1) {
      data.experience[index] = { ...data.experience[index], ...exp, id };
      savePortfolioData(data);
      return { success: true, experience: data.experience[index] };
    }
    throw new Error('Experience entry not found');
  },

  deleteExperience: async (id) => {
    const data = await loadPortfolioData();
    data.experience = (data.experience || []).filter((e) => String(e.id) !== String(id));
    savePortfolioData(data);
    return { success: true };
  },

  // Projects CRUD
  addProject: async (proj) => {
    const data = await loadPortfolioData();
    const newProj = {
      id: `proj-${Date.now()}`,
      order: (data.projects?.length || 0) + 1,
      featured: false,
      ...proj,
    };
    if (!data.projects) data.projects = [];
    data.projects.push(newProj);
    savePortfolioData(data);
    return { success: true, project: newProj };
  },

  updateProject: async (id, proj) => {
    const data = await loadPortfolioData();
    const index = data.projects.findIndex((p) => String(p.id) === String(id));
    if (index !== -1) {
      data.projects[index] = { ...data.projects[index], ...proj, id };
      savePortfolioData(data);
      return { success: true, project: data.projects[index] };
    }
    throw new Error('Project not found');
  },

  deleteProject: async (id) => {
    const data = await loadPortfolioData();
    data.projects = (data.projects || []).filter((p) => String(p.id) !== String(id));
    savePortfolioData(data);
    return { success: true };
  },

  // Skills
  updateSkills: async (skills) => {
    const data = await loadPortfolioData();
    data.skills = skills;
    savePortfolioData(data);
    return { success: true, skills: data.skills };
  },

  // Education & Achievements
  updateEducation: async (education) => {
    const data = await loadPortfolioData();
    data.education = education;
    savePortfolioData(data);
    return { success: true, education: data.education };
  },

  updateAchievements: async (achievements) => {
    const data = await loadPortfolioData();
    data.achievements = achievements;
    savePortfolioData(data);
    return { success: true, achievements: data.achievements };
  },

  // Client-Side Excel Export (No server needed!)
  exportExcel: async (filename = 'portfolio_data.xlsx') => {
    const data = await loadPortfolioData();
    exportExcelFile(data, filename);
    return { success: true };
  },


  // Client-Side Excel Import (No server needed!)
  importExcel: async (file) => {
    return await importExcelFile(file);
  },

  // Google Sheets Direct Connect
  syncGoogleSheet: async (sheetInput) => {
    return await loadFromGoogleSheet(sheetInput);
  },

  getSavedGoogleSheetId: () => {
    return getSavedGoogleSheetId();
  },

  // Reset
  resetToDefault: async () => {
    return resetPortfolioData();
  },
};

export default portfolioService;
