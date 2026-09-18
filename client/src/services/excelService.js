import * as XLSX from 'xlsx';
import seedData from '../data/seedData';

const LOCAL_STORAGE_KEY = 'yashwant_portfolio_data';
const ADMIN_CONFIG_KEY = 'yashwant_portfolio_admin';
const GOOGLE_SHEET_URL_KEY = 'yashwant_portfolio_gsheet_url';

/**
 * Converts nested portfolio object into rows for Excel sheets
 */
export function dataToWorkbook(data) {
  // 1. Profile Sheet
  const profileRows = [
    { Field: 'name', Value: data.profile?.name || '' },
    { Field: 'title', Value: data.profile?.title || '' },
    { Field: 'subtitle', Value: data.profile?.subtitle || '' },
    { Field: 'email', Value: data.profile?.email || '' },
    { Field: 'phone', Value: data.profile?.phone || '' },
    { Field: 'location', Value: data.profile?.location || '' },
    { Field: 'github', Value: data.profile?.github || '' },
    { Field: 'linkedin', Value: data.profile?.linkedin || '' },
    { Field: 'resumeUrl', Value: data.profile?.resumeUrl || '' },
    { Field: 'summary', Value: data.profile?.summary || '' },
    { Field: 'yearsExperience', Value: data.profile?.yearsExperience || '5+' },
    { Field: 'projectsCompleted', Value: data.profile?.projectsCompleted || '6+' },
    { Field: 'performanceMetric', Value: data.profile?.performanceMetric || '60%+' },
  ];

  // 2. Experience Sheet
  const experienceRows = (data.experience || []).map((exp, idx) => ({
    id: exp.id || `exp-${idx + 1}`,
    company: exp.company || '',
    role: exp.role || '',
    duration: exp.duration || '',
    location: exp.location || '',
    description: exp.description || '',
    highlights: exp.highlights || '',
    order: exp.order || idx + 1
  }));

  // 3. Projects Sheet
  const projectRows = (data.projects || []).map((proj, idx) => ({
    id: proj.id || `proj-${idx + 1}`,
    title: proj.title || '',
    company: proj.company || '',
    role: proj.role || '',
    url: proj.url || '',
    tech: proj.tech || '',
    featured: proj.featured ? 'TRUE' : 'FALSE',
    tag: proj.tag || '',
    description: proj.description || '',
    impact: proj.impact || '',
    order: proj.order || idx + 1
  }));

  // 4. Skills Sheet
  const skillRows = [];
  (data.skills || []).forEach(cat => {
    (cat.items || []).forEach(item => {
      skillRows.push({
        category: cat.category || 'General',
        name: item.name || '',
        level: item.level || 'Intermediate',
        years: item.years || '1+'
      });
    });
  });

  // 5. Education Sheet
  const educationRows = (data.education || []).map((edu, idx) => ({
    id: edu.id || `edu-${idx + 1}`,
    degree: edu.degree || '',
    institution: edu.institution || '',
    year: edu.year || '',
    score: edu.score || ''
  }));

  // 6. Achievements Sheet
  const achievementRows = (data.achievements || []).map((ach, idx) => ({
    id: ach.id || `ach-${idx + 1}`,
    title: ach.title || '',
    issuer: ach.issuer || '',
    description: ach.description || ''
  }));

  // 7. Admin Sheet (stores admin login credentials in Excel)
  const adminRows = [
    {
      Username: data.admin?.username || 'admin',
      Password: data.admin?.password || 'admin@portfolio2026',
      UpdatedAt: new Date().toISOString()
    }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(profileRows), 'Profile');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(experienceRows), 'Experience');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(projectRows), 'Projects');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(skillRows), 'Skills');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(educationRows), 'Education');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(achievementRows), 'Achievements');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(adminRows), 'Admin');

  return wb;
}

/**
 * Converts Excel workbook back into structured portfolio object
 */
export function workbookToData(wb) {
  const result = {
    profile: {},
    experience: [],
    projects: [],
    skills: [],
    education: [],
    achievements: []
  };

  // 1. Profile
  if (wb.Sheets['Profile']) {
    const pRows = XLSX.utils.sheet_to_json(wb.Sheets['Profile']);
    pRows.forEach(row => {
      if (row.Field) {
        result.profile[row.Field] = row.Value !== undefined ? String(row.Value) : '';
      }
    });
  }

  // 2. Experience
  if (wb.Sheets['Experience']) {
    result.experience = XLSX.utils.sheet_to_json(wb.Sheets['Experience']).map((row, idx) => ({
      id: row.id ? String(row.id) : `exp-${idx + 1}`,
      company: row.company ? String(row.company) : '',
      role: row.role ? String(row.role) : '',
      duration: row.duration ? String(row.duration) : '',
      location: row.location ? String(row.location) : '',
      description: row.description ? String(row.description) : '',
      highlights: row.highlights ? String(row.highlights) : '',
      order: Number(row.order) || idx + 1
    }));
    result.experience.sort((a, b) => a.order - b.order);
  }

  // 3. Projects
  if (wb.Sheets['Projects']) {
    result.projects = XLSX.utils.sheet_to_json(wb.Sheets['Projects']).map((row, idx) => ({
      id: row.id ? String(row.id) : `proj-${idx + 1}`,
      title: row.title ? String(row.title) : '',
      company: row.company ? String(row.company) : '',
      role: row.role ? String(row.role) : '',
      url: row.url ? String(row.url) : '',
      tech: row.tech ? String(row.tech) : '',
      featured: String(row.featured).toUpperCase() === 'TRUE',
      tag: row.tag ? String(row.tag) : 'Project',
      description: row.description ? String(row.description) : '',
      impact: row.impact ? String(row.impact) : '',
      order: Number(row.order) || idx + 1
    }));
    result.projects.sort((a, b) => a.order - b.order);
  }

  // 4. Skills
  if (wb.Sheets['Skills']) {
    const sRows = XLSX.utils.sheet_to_json(wb.Sheets['Skills']);
    const categoryMap = {};
    sRows.forEach(row => {
      const catName = row.category || 'General';
      if (!categoryMap[catName]) {
        categoryMap[catName] = [];
      }
      categoryMap[catName].push({
        name: row.name ? String(row.name) : '',
        level: row.level ? String(row.level) : 'Intermediate',
        years: row.years ? String(row.years) : '1+'
      });
    });
    result.skills = Object.keys(categoryMap).map(category => ({
      category,
      items: categoryMap[category]
    }));
  }

  // 5. Education
  if (wb.Sheets['Education']) {
    result.education = XLSX.utils.sheet_to_json(wb.Sheets['Education']).map((row, idx) => ({
      id: row.id ? String(row.id) : `edu-${idx + 1}`,
      degree: row.degree ? String(row.degree) : '',
      institution: row.institution ? String(row.institution) : '',
      year: row.year ? String(row.year) : '',
      score: row.score ? String(row.score) : ''
    }));
  }

  // 6. Achievements
  if (wb.Sheets['Achievements']) {
    result.achievements = XLSX.utils.sheet_to_json(wb.Sheets['Achievements']).map((row, idx) => ({
      id: row.id ? String(row.id) : `ach-${idx + 1}`,
      title: row.title ? String(row.title) : '',
      issuer: row.issuer ? String(row.issuer) : '',
      description: row.description ? String(row.description) : ''
    }));
  }

  // 7. Admin Credentials (read directly from Admin sheet in Excel)
  if (wb.Sheets['Admin']) {
    const aRows = XLSX.utils.sheet_to_json(wb.Sheets['Admin']);
    if (aRows.length > 0) {
      result.admin = {
        username: aRows[0].Username ? String(aRows[0].Username).trim() : 'admin',
        password: aRows[0].Password ? String(aRows[0].Password).trim() : 'admin@portfolio2026'
      };
    }
  }

  if (!result.admin) {
    result.admin = { ...seedData.admin };
  }

  return result;
}


/**
 * Loads portfolio data directly in the browser:
 * 1. Checks localStorage for customized user edits
 * 2. Fetches static /portfolio_data.xlsx
 * 3. Fallbacks to seedData
 */
export async function loadPortfolioData() {
  // Check localStorage first
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.profile?.name) {
        return parsed;
      }
    } catch (e) {
      console.warn('Invalid localStorage portfolio data, reading Excel file instead.');
    }
  }

  // Read public Excel file directly
  try {
    const response = await fetch('/portfolio_data.xlsx');
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const wb = XLSX.read(arrayBuffer, { type: 'array' });
      const data = workbookToData(wb);
      if (data.profile?.name) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch /portfolio_data.xlsx, using seed data fallback:', err);
  }

  // Fallback to seedData
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(seedData));
  return seedData;
}

/**
 * Persists updated portfolio data to browser localStorage
 */
export function savePortfolioData(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  return data;
}

/**
 * 1-Click Browser Download of the Excel (.xlsx) file
 * Uses explicit Blob with standard Office OpenXML MIME type
 * to guarantee that Windows and Excel open it as a genuine .xlsx file.
 */
export function exportExcelFile(data, filename = 'portfolio_data.xlsx') {
  try {
    const wb = dataToWorkbook(data);
    // Explicit array output with OpenXML .xlsx MIME type guarantees Windows & Excel recognize it
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 200);
    return true;
  } catch (err) {
    console.error('Error generating dynamic Excel file, falling back to static file:', err);
    // Direct fallback from public directory
    const link = document.createElement('a');
    link.href = '/portfolio_data.xlsx';
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return false;
  }
}


/**
 * Reads an uploaded Excel file (.xlsx) in the browser
 */
export async function importExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, { type: 'array' });
        const parsed = workbookToData(wb);
        savePortfolioData(parsed);
        resolve(parsed);
      } catch (err) {
        reject(new Error('Failed to parse Excel file: ' + err.message));
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Fetches data directly from a public Google Sheet (Zero Backend!)
 */
export async function loadFromGoogleSheet(sheetInput) {
  if (!sheetInput) throw new Error('Please provide a Google Sheet URL or ID');

  // Extract ID if URL is provided
  let sheetId = sheetInput.trim();
  const match = sheetInput.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (match) {
    sheetId = match[1];
  }

  // Save for future auto-load
  localStorage.setItem(GOOGLE_SHEET_URL_KEY, sheetId);

  // Google Sheets public XLSX export endpoint
  const exportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`;
  
  const response = await fetch(exportUrl);
  if (!response.ok) {
    throw new Error(
      'Unable to access Google Sheet. Please ensure the Google Sheet link sharing is set to "Anyone with the link can view".'
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  const wb = XLSX.read(arrayBuffer, { type: 'array' });
  const data = workbookToData(wb);
  savePortfolioData(data);
  return data;
}

export function getSavedGoogleSheetId() {
  return localStorage.getItem(GOOGLE_SHEET_URL_KEY) || '';
}

/**
 * Resets portfolio data to initial resume state
 */
export function resetPortfolioData() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(seedData));
  return JSON.parse(JSON.stringify(seedData));
}

/**
 * In-browser Admin authentication backed by the Excel Sheet
 */
export function getAdminCredentials(data) {
  if (data?.admin?.username && data?.admin?.password) {
    return {
      username: data.admin.username,
      password: data.admin.password,
      token: 'client_yashwant_token_2026'
    };
  }

  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.admin?.username && parsed?.admin?.password) {
        return {
          username: parsed.admin.username,
          password: parsed.admin.password,
          token: 'client_yashwant_token_2026'
        };
      }
    } catch (e) {
      // fallback
    }
  }

  return {
    username: seedData.admin?.username || 'admin',
    password: seedData.admin?.password || 'admin@portfolio2026',
    token: 'client_yashwant_token_2026'
  };
}

export async function updateAdminCredentials(currentPassword, newUsername, newPassword) {
  const data = await loadPortfolioData();
  const creds = getAdminCredentials(data);
  if (currentPassword !== creds.password) {
    throw new Error('Current password does not match.');
  }
  if (!data.admin) data.admin = {};
  if (newUsername) data.admin.username = newUsername.trim();
  if (newPassword) data.admin.password = newPassword.trim();
  savePortfolioData(data);
  return true;
}

export function verifyAdminLogin(username, password) {
  const creds = getAdminCredentials();
  if (username === creds.username && password === creds.password) {
    localStorage.setItem('portfolio_auth_token', creds.token);
    return { success: true, token: creds.token };
  }
  return { success: false, message: 'Invalid username or password.' };
}

