/**
 * Theme switching.
 *   Default: follows the device setting (light or dark), and keeps following it.
 *   The header button shows the theme you are seeing (sun = light, moon = dark)
 *   and switches to the other one when clicked.
 *   If you switch to a theme that is different from the device's, it is
 *   remembered in localStorage. Switching back to the device's theme goes back
 *   to following the device.
 * This file is loaded in <head> so the right theme is applied before the page
 * is painted (no flash).
 */
(function () {
  const KEY = 'portfolio-theme';
  const BG = { light: '#eff1f5', dark: '#141414' }; // for the browser's theme-color
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: light)');

  const svg = (inner) =>
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
  const ICONS = {
    light: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    dark: svg('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>')
  };

  const systemTheme = () => (media.matches ? 'light' : 'dark');

  function read() {
    try {
      const value = localStorage.getItem(KEY);
      return value === 'light' || value === 'dark' ? value : 'system';
    } catch (e) {
      return 'system';
    }
  }

  function save(value) {
    try {
      if (value === 'system') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, value);
    } catch (e) { /* private mode: the choice just won't be remembered */ }
  }

  let pref = read(); // 'system' | 'light' | 'dark'
  let button = null;

  const current = () => (pref === 'system' ? systemTheme() : pref);

  function apply() {
    const theme = current();
    root.dataset.theme = theme;
    root.dataset.themePref = pref;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', BG[theme]);

    if (button) {
      const other = theme === 'light' ? 'dark' : 'light';
      button.innerHTML = ICONS[theme] + '<span>' + theme + '</span>';
      button.setAttribute('aria-label', 'Theme: ' + theme + '. Switch to ' + other + '.');
      button.title = 'Switch to ' + other + ' theme';
    }
  }

  // While following the device, follow it live too (e.g. at sunset).
  media.addEventListener('change', () => { if (pref === 'system') apply(); });

  apply();

  document.addEventListener('DOMContentLoaded', () => {
    button = document.getElementById('theme-toggle');
    if (!button) return;
    button.addEventListener('click', () => {
      const next = current() === 'light' ? 'dark' : 'light';
      pref = next === systemTheme() ? 'system' : next;
      save(pref);
      apply();
    });
    apply();
  });
})();
