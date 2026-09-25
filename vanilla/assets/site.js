/* Plain JavaScript enhancements. All page content is present in the HTML. */
'use strict';

const menu = document.querySelector('.mobile-menu');
const navigation = document.querySelector('#navigation');
const menuIcon = menu.innerHTML;
function closeMenu() {
  navigation.classList.remove('expanded');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  menu.innerHTML = menuIcon;
}
menu.addEventListener('click', () => {
  if (menu.getAttribute('aria-expanded') === 'true') return closeMenu();
  navigation.classList.add('expanded');
  menu.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-label', 'Close navigation');
  menu.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m18 6-12 12M6 6l12 12"/></svg>';
});
navigation.addEventListener('click', closeMenu);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('expanded')) {
    closeMenu();
    menu.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

const tabs = [...document.querySelectorAll('[data-category]')];
if (tabs.length) {
  const papers = [...document.querySelectorAll('.pub-item')];
  const groups = [...document.querySelectorAll('.year-group')];
  const panel = document.querySelector('#publication-panel');
  function selectCategory(category, updateUrl = false) {
    if (!tabs.some(tab => tab.dataset.category === category)) category = 'all';
    tabs.forEach(tab => {
      const active = tab.dataset.category === category;
      tab.toggleAttribute('data-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    papers.forEach(paper => {
      paper.hidden = category !== 'all' && !paper.dataset.categories.split(' ').includes(category);
    });
    groups.forEach(group => {
      group.hidden = !group.querySelector('.pub-item:not([hidden])');
    });
    document.querySelector('#publication-count').textContent = `${papers.filter(paper => !paper.hidden).length} of ${papers.length} publications`;
    panel.setAttribute('aria-labelledby', `tab-${category}`);
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.hash = '';
      if (category === 'all') url.searchParams.delete('topic');
      else url.searchParams.set('topic', category);
      // Some browsers restrict History on files opened directly from disk.
      try { window.history.replaceState(null, '', url); } catch { /* Filtering still works. */ }
    }
  }
  function syncLocation() {
    selectCategory(window.location.hash ? 'all' : new URLSearchParams(window.location.search).get('topic'));
    if (window.location.hash) {
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    }
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectCategory(tab.dataset.category, true));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[next].focus();
      selectCategory(tabs[next].dataset.category, true);
    });
  });
  window.addEventListener('hashchange', syncLocation);
  window.addEventListener('popstate', syncLocation);
  syncLocation();
}

const copyButton = document.querySelector('.copy-email');
if (copyButton) {
  const original = copyButton.innerHTML;
  const status = document.querySelector('.copy-status');
  let timer;
  copyButton.addEventListener('click', async () => {
    clearTimeout(timer);
    const email = document.querySelector('.email-link').textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      copyButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg><span>Copied</span>';
      status.textContent = 'Email address copied.';
      timer = setTimeout(() => {
        copyButton.innerHTML = original;
        status.textContent = '';
      }, 2500);
    } catch {
      copyButton.innerHTML = original;
      status.textContent = 'Unable to copy automatically. Please select and copy the email address.';
    }
  });
}
const copyright = document.querySelector('.site-footer > span');
copyright.textContent = `© ${new Date().getFullYear()} Aanjaneya Kumar`;
