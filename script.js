
/**
 * Main JavaScript File
 * 
 * Features:
 * 1. Holiday Mode Toggle
 * 2. Snow Effect Creation
 * 3. Christmas Countdown
 * 4. Scroll Animations
 * 5. Feather Icons Replacement
 */
// Theme Management
const Theme = {
  init() {
    this.toggleBtn = document.createElement('button');
    this.toggleBtn.className = 'theme-toggle fixed bottom-4 right-4 bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-full shadow-lg z-50';
    this.toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
    document.body.appendChild(this.toggleBtn);
    
    this.setInitialTheme();
    this.toggleBtn.addEventListener('click', () => this.toggle());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  },

  setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemDark ? 'dark' : 'light');
    this.setTheme(theme, false);
  },

  setTheme(theme, save = true) {
    document.documentElement.setAttribute('data-theme', theme);
    this.toggleBtn.innerHTML = `<i data-feather="${theme === 'dark' ? 'sun' : 'moon'}"></i>`;
    if (save) localStorage.setItem('theme', theme);
    feather.replace();
  },

  toggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }
};
// Initialize when DOM is ready
function initApp() {
  // Only initialize theme once if we haven't already
  if (!document.querySelector('.theme-toggle')) {
    Theme.init();
  }
  
  // Apply dark theme if it was previously selected
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  feather.replace();
// Ensure countdown is visible
  const countdownEl = document.getElementById('christmas-countdown');
  if (!countdownEl) {
    console.error('Countdown element not found');
    return;
  }
  
  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.1});
  
  document.querySelectorAll('.slide-up').forEach(el => observer.observe(el));
}
// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Force dark theme styles to apply immediately
const darkThemeObserver = new MutationObserver(() => {
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    document.documentElement.classList.add('dark-theme-active');
  } else {
    document.documentElement.classList.remove('dark-theme-active');
  }
});

darkThemeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme']
});
// Create snowflakes
function createSnow() {
  const snowContainer = document.createElement('div');
  snowContainer.className = 'snow';
  document.body.appendChild(snowContainer);

  for (let i = 0; i < 50; i++) {
    const snowflake = document.createElement('div');
    snowflake.style.position = 'absolute';
    snowflake.style.width = `${Math.random() * 10 + 5}px`;
    snowflake.style.height = snowflake.style.width;
    snowflake.style.backgroundColor = 'white';
    snowflake.style.borderRadius = '50%';
    snowflake.style.opacity = Math.random() * 0.7 + 0.3;
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.top = '-10px';
    snowflake.style.pointerEvents = 'none';
    
    const animationDuration = Math.random() * 10 + 5;
    snowflake.style.animation = `fall ${animationDuration}s linear infinite`;
    
    snowContainer.appendChild(snowflake);
  }

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fall {
      to {
        transform: translateY(100vh);
      }
    }
  `;
  document.head.appendChild(style);
}
// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Add click handler for download button
  document.querySelectorAll('[data-download-notes]').forEach(button => {
    button.addEventListener('click', async function(e) {
      e.preventDefault();
      const bulletinUrl = 'https://foundryleader.com/nphweb/media/content/2439/2439857.htm';
try {
        // Fetch the bulletin page
        const response = await fetch(bulletinUrl);
        const html = await response.text();
        
        // Parse HTML and extract text content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const textContent = doc.body.textContent || '';
        
        // Clean up text (remove extra whitespace, etc)
        const cleanedText = textContent
          .replace(/\s+/g, ' ')
          .trim();
        
        // Create and trigger download
        const blob = new Blob([cleanedText], { type: 'text/plain;charset=utf-8' });
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'Weekly_Bulletin.txt';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);
      } catch (err) {
        console.error('Error downloading bulletin:', err);
        // Fallback to opening the page normally
        window.open(bulletinUrl, '_blank');
      }
    });
  });
updateCountdown();
  setInterval(updateCountdown, 1000);
// Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  document.querySelectorAll('.slide-up').forEach(el => {
    observer.observe(el);
  });
  
  feather.replace();
});
