/**
 * EasyBus — Unified Navigation & Role Switcher
 * Path: frontend/assets/js/easybus-nav.js
 * 
 * Injects a consistent, responsive top navigation header across all EasyBus pages.
 * Features:
 *  - EasyBus Logo linking to index.html
 *  - Persistent Role Toggle Pill ("Passenger View" vs "Admin Portal")
 *  - Dynamic contextual links reflecting the active role
 *  - One-click "Reset Demo" button connected to EasyBusStore.resetDemoData()
 *  - Mobile responsive drawer
 */

(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    root.EasyBusNav = factory();
    if (typeof document !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => root.EasyBusNav.init());
      } else {
        root.EasyBusNav.init();
      }
    }
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const STORAGE_KEY_ROLE = 'easybus_active_role';

  // Role nav link definitions
  const NAV_LINKS = {
    passenger: [
      { label: 'Home', href: 'index.html', icon: 'fa-solid fa-house' },
      { label: 'Schedules', href: 'schedule-list.html', icon: 'fa-solid fa-table-list' },
      { label: 'Seat Selection', href: 'seat-selection.html', icon: 'fa-solid fa-couch' },
      { label: 'Live Tracking', href: 'tracking.html', icon: 'fa-solid fa-location-crosshairs' },
      { label: 'Profile', href: 'account-settings.html', icon: 'fa-solid fa-user-gear' }
    ],
    admin: [
      { label: 'Schedule List', href: 'schedule-list.html', icon: 'fa-solid fa-list-check' },
      { label: 'Add Schedule', href: 'add-schedule.html', icon: 'fa-solid fa-circle-plus' },
      { label: 'Fleet Onboarding', href: 'fleet-registration.html', icon: 'fa-solid fa-van-shuttle' },
      { label: 'Bookings', href: 'booking-management.html', icon: 'fa-solid fa-receipt' },
      { label: 'Financials', href: 'financial-dashboard.html', icon: 'fa-solid fa-chart-pie' }
    ]
  };

  /**
   * Determine the current active role:
   * 1. Read localStorage('easybus_active_role')
   * 2. Default based on current page context (admin vs passenger)
   * 3. Fallback to 'passenger'
   */
  function getActiveRole() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY_ROLE);
        if (stored === 'passenger' || stored === 'admin') {
          return stored;
        }
      }
    } catch (_) {}

    // Default based on current page context
    if (typeof window !== 'undefined' && window.location) {
      const path = (window.location.pathname || '').toLowerCase();
      const adminPages = [
        'add-schedule.html',
        'edit-schedule.html',
        'fleet-registration.html',
        'booking-management.html',
        'financial-dashboard.html'
      ];
      for (const p of adminPages) {
        if (path.endsWith(p)) return 'admin';
      }
    }
    return 'passenger';
  }

  /**
   * Switch the active role and re-render navigation header
   */
  function setActiveRole(role) {
    if (role !== 'passenger' && role !== 'admin') return;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_ROLE, role);
      }
    } catch (_) {}

    render();

    // Show toast feedback if EasyBusStore or global toast available
    if (typeof window !== 'undefined') {
      const msg = role === 'admin' 
        ? 'Switched to <strong>Admin Portal</strong> view' 
        : 'Switched to <strong>Passenger View</strong>';
      if (window.EasyBusStore && typeof window.EasyBusStore.showToast === 'function') {
        window.EasyBusStore.showToast(msg, 'info');
      } else if (typeof window.showToast === 'function') {
        window.showToast(msg, 'info');
      }
    }
  }

  /**
   * Reset demo data using EasyBusStore
   */
  function resetDemo() {
    if (typeof window !== 'undefined' && window.EasyBusStore && typeof window.EasyBusStore.resetDemoData === 'function') {
      window.EasyBusStore.resetDemoData();
    } else {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('easybus_schedules');
          localStorage.removeItem('easybus_fleet');
          localStorage.removeItem('easybus_admin_bookings');
          localStorage.removeItem('easybus_reserved_seats');
          localStorage.removeItem('easybus_current_user');
        }
      } catch (_) {}
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast('Demo data restored to initial default state.', 'info');
      }
    }
  }

  /**
   * Helper to detect current page filename
   */
  function getCurrentPageName() {
    if (typeof window === 'undefined' || !window.location) return '';
    const path = window.location.pathname || '';
    const parts = path.split('/');
    return (parts[parts.length - 1] || 'index.html').toLowerCase();
  }

  /**
   * Render or re-render the unified navigation element
   */
  function render() {
    if (typeof document === 'undefined') return;

    const role = getActiveRole();
    const currentPage = getCurrentPageName();
    const links = NAV_LINKS[role] || NAV_LINKS.passenger;

    let navEl = document.getElementById('easybus-unified-navbar') || document.getElementById('easybus-unified-nav');
    if (!navEl) {
      const mount = document.getElementById('easybus-navbar-mount');
      navEl = document.createElement('header');
      navEl.id = 'easybus-unified-navbar';
      navEl.className = 'w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-700/60 text-white shadow-xl sticky top-0 z-[100] transition-all duration-200 shrink-0';
      
      if (mount) {
        mount.appendChild(navEl);
      } else if (document.body) {
        document.body.insertAdjacentElement('afterbegin', navEl);
      } else {
        return;
      }
    } else {
      navEl.id = 'easybus-unified-navbar';
      navEl.className = 'w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-700/60 text-white shadow-xl sticky top-0 z-[100] transition-all duration-200 shrink-0';
    }

    // Build navigation links HTML
    const linksHtml = links.map(link => {
      const isActive = currentPage === link.href.toLowerCase() || (currentPage === '' && link.href === 'index.html');
      const activeClass = isActive
        ? 'text-amber-400 font-bold bg-white/10 shadow-sm border border-amber-400/30'
        : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium';

      return `
        <a href="${link.href}" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm transition-all duration-150 ${activeClass}">
          <i class="${link.icon} text-xs text-amber-400"></i>
          <span>${link.label}</span>
        </a>
      `;
    }).join('');

    // Check logged in user display
    let userBadgeHtml = '';
    try {
      if (typeof window !== 'undefined' && window.EasyBusStore && typeof window.EasyBusStore.getCurrentUser === 'function') {
        const user = window.EasyBusStore.getCurrentUser();
        if (user && user.fullName) {
          userBadgeHtml = `
            <a href="account-settings.html" class="hidden xl:inline-flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs px-2.5 py-1 rounded-xl border border-slate-700 transition" title="Logged in as ${user.fullName}">
              <i class="fa-solid fa-user-circle text-amber-400"></i>
              <span class="max-w-[90px] truncate">${user.fullName.split(' ')[0]}</span>
            </a>
          `;
        }
      }
    } catch (_) {}

    navEl.innerHTML = `
      <div class="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        <!-- BRAND LOGO -->
        <div class="flex items-center gap-3 shrink-0">
          <a href="index.html" class="flex items-center gap-2 hover:opacity-90 transition group" title="EasyBus Home">
            <div class="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-base shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <i class="fa-solid fa-bus"></i>
            </div>
            <span class="text-lg font-extrabold text-white tracking-tight">Easy<span class="text-amber-400">Bus</span></span>
          </a>

          <!-- ROLE TOGGLE PILL -->
          <div class="inline-flex items-center bg-slate-800/90 p-0.5 rounded-full border border-slate-700 shadow-inner ml-1 sm:ml-2">
            <button type="button" id="roleBtnPassenger" onclick="EasyBusNav.setActiveRole('passenger')" 
              class="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1 ${role === 'passenger' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'}">
              <i class="fa-solid fa-user text-[10px]"></i>
              <span>Passenger View</span>
            </button>
            <button type="button" id="roleBtnAdmin" onclick="EasyBusNav.setActiveRole('admin')" 
              class="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1 ${role === 'admin' ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'}">
              <i class="fa-solid fa-shield-halved text-[10px]"></i>
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

        <!-- CONTEXTUAL NAV LINKS (DESKTOP) -->
        <nav class="hidden lg:flex items-center gap-1">
          ${linksHtml}
        </nav>

        <!-- RIGHT ACTION BUTTONS -->
        <div class="flex items-center gap-2 shrink-0">
          ${userBadgeHtml}

          <!-- RESET DEMO BUTTON -->
          <button type="button" id="easybusNavResetBtn" onclick="EasyBusNav.resetDemo()" 
            class="inline-flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600/80 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer shadow-sm"
            title="Reset all demo data back to default baseline">
            <i class="fa-solid fa-rotate-left text-amber-400"></i>
            <span class="hidden sm:inline">Reset Demo</span>
          </button>

          <!-- MOBILE MENU BUTTON -->
          <button type="button" id="easybusNavMobileBtn" onclick="EasyBusNav.toggleMobileMenu()" 
            class="lg:hidden text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition">
            <i class="fa-solid fa-bars text-lg"></i>
          </button>
        </div>
      </div>

      <!-- MOBILE DRAWER -->
      <div id="easybusNavMobileDrawer" class="hidden lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-md px-4 py-3 space-y-1">
        <div class="text-[10px] uppercase font-bold text-slate-400 px-3 py-1">
          Active: <strong class="text-amber-400">${role === 'admin' ? 'Admin Portal' : 'Passenger View'}</strong>
        </div>
        ${links.map(link => {
          const isActive = currentPage === link.href.toLowerCase();
          return `
            <a href="${link.href}" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition ${isActive ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-300 hover:text-white hover:bg-white/5'}">
              <i class="${link.icon} text-amber-400 text-xs w-4"></i>
              <span>${link.label}</span>
            </a>
          `;
        }).join('')}
      </div>
    `;
  }

  function toggleMobileMenu() {
    const drawer = document.getElementById('easybusNavMobileDrawer');
    if (drawer) {
      drawer.classList.toggle('hidden');
    }
  }

  function init() {
    render();
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      window.addEventListener('storage', (e) => {
        if (e && e.key === STORAGE_KEY_ROLE) {
          render();
        }
      });
      window.addEventListener('easybus:reset', () => {
        render();
      });
    }
  }

  return {
    init,
    render,
    getActiveRole,
    setActiveRole,
    resetDemo,
    toggleMobileMenu,
    NAV_LINKS
  };
});
