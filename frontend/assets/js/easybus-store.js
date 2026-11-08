/**
 * EasyBus — Unified State & Persistence Store
 * Path: frontend/assets/js/easybus-store.js
 * 
 * Provides unified, reactive client-side data management across all EasyBus portals
 * via localStorage with cross-tab and cross-page synchronization, seed restoration,
 * and comprehensive CRUD interfaces.
 */

(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    const store = factory();
    root.EasyBusStore = store;
    if (typeof window !== 'undefined') {
      try {
        store.init();
      } catch (err) {
        console.warn('EasyBusStore auto-init deferred:', err);
      }
    }
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // 1. Storage Keys
  const KEYS = Object.freeze({
    SCHEDULES: 'easybus_schedules',
    FLEET: 'easybus_fleet',
    BOOKINGS: 'easybus_admin_bookings',
    SEATS: 'easybus_reserved_seats',
    USER: 'easybus_current_user'
  });

  // 2. Canonical Seed Data
  const SEED_DATA = Object.freeze({
    easybus_current_user: {
      fullName: 'Ali bin Abu',
      email: 'ali@example.com',
      phone: '011-99887766',
      role: 'passenger',
      registeredAt: '2026-10-15T08:00:00.000Z'
    },
    easybus_reserved_seats: ['3A', '2B'],
    easybus_fleet: [
      {
        id: 'FLT-001',
        busPlate: 'ABC1234',
        seatCapacity: 40,
        driverName: 'Ahmad Albab',
        licenseNum: 'LIC-1001',
        contactPhone: '012-3456789',
        status: 'Active'
      },
      {
        id: 'FLT-002',
        busPlate: 'XYZ5678',
        seatCapacity: 36,
        driverName: 'Muthu',
        licenseNum: 'LIC-1002',
        contactPhone: '017-9876543',
        status: 'Active'
      },
      {
        id: 'FLT-003',
        busPlate: 'DEF9012',
        seatCapacity: 40,
        driverName: 'Lim',
        licenseNum: 'LIC-1003',
        contactPhone: '016-2233445',
        status: 'Active'
      }
    ],
    easybus_schedules: [
      {
        id: 'row-1',
        busNumber: 'ABC1234',
        busPlate: 'ABC1234',
        route: 'Kuala Lumpur → Johor Bahru',
        from: 'Terminal Bersepadu Selatan (TBS)',
        to: 'Larkin Sentral, Johor Bahru',
        departureDate: '2026-06-01',
        departureTime: '08:00 AM',
        ticketPrice: 'RM35.00',
        priceNumeric: 35.0,
        driverName: 'Ahmad Albab',
        availableSeats: 40,
        busStatus: 'Available'
      },
      {
        id: 'row-2',
        busNumber: 'XYZ5678',
        busPlate: 'XYZ5678',
        route: 'Melaka → Johor Bahru',
        from: 'Melaka Sentral',
        to: 'Larkin Sentral, Johor Bahru',
        departureDate: '2026-06-02',
        departureTime: '02:30 PM',
        ticketPrice: 'RM18.00',
        priceNumeric: 18.0,
        driverName: 'Muthu',
        availableSeats: 36,
        busStatus: 'Full'
      },
      {
        id: 'row-3',
        busNumber: 'DEF9012',
        busPlate: 'DEF9012',
        route: 'Kuala Lumpur → Penang',
        from: 'Terminal Bersepadu Selatan (TBS)',
        to: 'Penang Sentral',
        departureDate: '2026-06-03',
        departureTime: '09:15 AM',
        ticketPrice: 'RM45.00',
        priceNumeric: 45.0,
        driverName: 'Lim',
        availableSeats: 40,
        busStatus: 'Cancelled'
      }
    ],
    easybus_admin_bookings: [
      {
        id: 'BK-89244',
        passenger: 'Ali bin Abu',
        phone: '011-99887766',
        email: 'ali@example.com',
        route: 'Kuala Lumpur → Johor Bahru',
        bus: 'DEF9012',
        seat: '1C (VIP Single)',
        date: '2026-10-26 10:00 PM',
        amount: 'RM 125.00',
        fare: 'RM 125.00',
        fareNumeric: 125.0,
        gateway: 'FPX Online Banking',
        paymentNote: 'Payment Slip Attached (Ref: FPX-99214)',
        note: 'Payment slip attached (Ref: FPX-99214)',
        status: 'Pending'
      },
      {
        id: 'BK-77102',
        passenger: 'Siti Nurhaliza',
        phone: '012-3456789',
        email: 'siti@example.com',
        route: 'Kuala Lumpur → Penang',
        bus: 'ABC1234',
        seat: '2A (Double Seat)',
        date: '2026-11-01 08:30 AM',
        amount: 'RM 45.00',
        fare: 'RM 45.00',
        fareNumeric: 45.0,
        gateway: 'Cash on Board',
        paymentNote: 'Driver verified via ticket collector',
        note: 'Verified with conductor',
        status: 'Confirmed'
      },
      {
        id: 'BK-65041',
        passenger: 'Tan Ah Seng',
        phone: '019-8765432',
        email: 'tan@example.com',
        route: 'Melaka → Johor Bahru',
        bus: 'XYZ5678',
        seat: '1A (Double Seat)',
        date: '2026-11-05 02:30 PM',
        amount: 'RM 18.00',
        fare: 'RM 18.00',
        fareNumeric: 18.0,
        gateway: 'Credit Card (Visa)',
        paymentNote: 'Awaiting 3D-Secure confirmation',
        note: 'Awaiting 3D Secure verification',
        status: 'Pending'
      },
      {
        id: 'BK-54912',
        passenger: 'Muthu A/L Raman',
        phone: '017-6543210',
        email: 'muthu@example.com',
        route: 'Kuala Lumpur → Penang',
        bus: 'DEF9012',
        seat: '3B (Double Seat)',
        date: '2026-10-20 09:15 AM',
        amount: 'RM 95.00',
        fare: 'RM 95.00',
        fareNumeric: 95.0,
        gateway: "Touch 'n Go eWallet",
        paymentNote: 'Refund issued per passenger request',
        note: 'Refund issued per passenger request',
        status: 'Cancelled'
      }
    ]
  });

  // 3. In-memory fallback and custom storage provider
  const _memoryStore = {};
  let _customStorageProvider = null;
  const _subscribers = new Set();
  let _storageListenerAttached = false;

  function _getStorage() {
    if (_customStorageProvider) return _customStorageProvider;
    try {
      if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
      if (typeof localStorage !== 'undefined') return localStorage;
      if (typeof globalThis !== 'undefined' && globalThis.localStorage) return globalThis.localStorage;
    } catch (_) {}
    return null;
  }

  function _readRaw(key) {
    const s = _getStorage();
    if (s && typeof s.getItem === 'function') {
      try {
        return s.getItem(key);
      } catch (e) {
        console.warn(`EasyBusStore: error reading key "${key}":`, e);
      }
    }
    return Object.prototype.hasOwnProperty.call(_memoryStore, key) ? _memoryStore[key] : null;
  }

  function _writeRaw(key, value) {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    const s = _getStorage();
    if (s && typeof s.setItem === 'function') {
      try {
        s.setItem(key, serialized);
      } catch (e) {
        console.warn(`EasyBusStore: error writing key "${key}":`, e);
      }
    }
    _memoryStore[key] = serialized;
  }

  function _removeRaw(key) {
    const s = _getStorage();
    if (s && typeof s.removeItem === 'function') {
      try {
        s.removeItem(key);
      } catch (_) {}
    }
    delete _memoryStore[key];
  }

  function _readParsed(key) {
    const raw = _readRaw(key);
    if (raw === null || raw === undefined) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.warn(`EasyBusStore: JSON parse error for key "${key}":`, e);
      return null;
    }
  }

  // 4. Normalization Helpers
  function _normalizeSchedule(s) {
    if (!s || typeof s !== 'object') return s;
    const busNumber = (s.busNumber || s.busPlate || '').trim();
    const busPlate = (s.busPlate || s.busNumber || busNumber).trim();
    const from = s.from || s.departureLocation || '';
    const departureLocation = s.departureLocation || from;
    const to = s.to || s.arrivalLocation || '';
    const arrivalLocation = s.arrivalLocation || to;
    const route = s.route || s.routeAssignment || (from && to ? `${from} → ${to}` : '');
    const routeAssignment = s.routeAssignment || route;
    let priceNumeric = s.priceNumeric;
    let ticketPrice = s.ticketPrice;

    if (priceNumeric != null && !isNaN(Number(priceNumeric))) {
      priceNumeric = Number(priceNumeric);
      if (!ticketPrice) ticketPrice = `RM${priceNumeric.toFixed(2)}`;
    } else if (ticketPrice) {
      priceNumeric = parseFloat(String(ticketPrice).replace(/[^\d.]/g, '')) || 0;
    } else {
      priceNumeric = 35.0;
      ticketPrice = 'RM35.00';
    }

    return {
      ...s,
      busNumber,
      busPlate,
      route,
      routeAssignment,
      from,
      departureLocation,
      to,
      arrivalLocation,
      ticketPrice,
      priceNumeric
    };
  }

  function _normalizeBooking(b) {
    if (!b || typeof b !== 'object') return b;
    const fare = b.fare || b.amount || 'RM 0.00';
    const amount = b.amount || b.fare || fare;
    const fareNumeric = (b.fareNumeric != null && !isNaN(Number(b.fareNumeric)))
      ? Number(b.fareNumeric)
      : (parseFloat(String(fare || amount).replace(/[^\d.]/g, '')) || 0);
    const paymentNote = b.paymentNote || b.note || '';
    const note = b.note || b.paymentNote || paymentNote;

    return {
      ...b,
      fare,
      amount,
      fareNumeric,
      paymentNote,
      note
    };
  }

  // 5. Toast Notification System
  function _showToast(message, type = 'info') {
    if (typeof document === 'undefined') return;

    // Use page-specific toast if available and not this method
    if (typeof window !== 'undefined' && typeof window.showToast === 'function' && window.showToast !== _showToast) {
      try {
        window.showToast(message, type);
        return;
      } catch (_) {}
    }

    let container = document.getElementById('toastContainer') || document.getElementById('toast-container');
    if (!container) {
      container = document.getElementById('easybus-global-toast-container');
    }
    if (!container) {
      container = document.createElement('div');
      container.id = 'easybus-global-toast-container';
      container.className = 'fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4';
      if (document.body) {
        document.body.appendChild(container);
      } else {
        return;
      }
    }

    const toast = document.createElement('div');
    const colorClasses = {
      success: 'bg-emerald-600 text-white border-emerald-400',
      error: 'bg-red-600 text-white border-red-400',
      warning: 'bg-amber-600 text-white border-amber-400',
      info: 'bg-slate-900/95 text-white border-blue-500 shadow-blue-500/20'
    };
    const chosenClass = colorClasses[type] || colorClasses.info;

    toast.className = `pointer-events-auto px-4 py-3 rounded-2xl shadow-2xl border text-sm font-medium flex items-center justify-between gap-3 transition-all duration-300 opacity-0 transform translate-y-2 ${chosenClass}`;
    toast.innerHTML = `<span class="flex-1">${message}</span><button type="button" class="text-white/70 hover:text-white font-bold ml-2 text-base leading-none">&times;</button>`;

    const closeBtn = toast.querySelector('button');
    if (closeBtn) {
      closeBtn.onclick = () => toast.remove();
    }

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('opacity-0', 'translate-y-2');
      toast.classList.add('opacity-100', 'translate-y-0');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // 6. Cross-Tab Synchronization
  function _setupStorageListener() {
    if (_storageListenerAttached) return;
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      window.addEventListener('storage', (event) => {
        if (event && event.key && event.key.startsWith('easybus_')) {
          let parsed = null;
          try {
            parsed = event.newValue ? JSON.parse(event.newValue) : null;
          } catch (_) {}
          EasyBusStore.emitChange(event.key, 'storage_sync', parsed);
        }
      });
      _storageListenerAttached = true;
    }
  }

  // 7. Store Implementation
  const EasyBusStore = {
    KEYS,
    SEED_DATA,

    /**
     * Optional custom storage injector (useful for mock testing or polyfills)
     */
    setStorageProvider(provider) {
      _customStorageProvider = provider;
    },

    /**
     * Retrieve deep clone of default seed data
     */
    getSeedData() {
      return JSON.parse(JSON.stringify(SEED_DATA));
    },

    /**
     * Initialize store: check if canonical keys exist, populate seeds if missing
     */
    init() {
      _setupStorageListener();

      for (const [keyName, defaultData] of Object.entries(SEED_DATA)) {
        const existing = _readParsed(keyName);
        if (existing === null || existing === undefined) {
          _writeRaw(keyName, defaultData);
        }
      }
      return this;
    },

    /**
     * Reset all 5 keys to initial factory seed data and notify subscribers
     */
    resetDemoData() {
      for (const [keyName, defaultData] of Object.entries(SEED_DATA)) {
        _writeRaw(keyName, defaultData);
        this.emitChange(keyName, 'reset', JSON.parse(JSON.stringify(defaultData)));
      }

      // Dispatch easybus:reset event
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
        try {
          const resetEvent = (typeof CustomEvent === 'function')
            ? new CustomEvent('easybus:reset', { detail: { timestamp: new Date().toISOString() } })
            : { type: 'easybus:reset' };
          window.dispatchEvent(resetEvent);
        } catch (_) {}
      }

      _showToast('Demo data restored to initial default state.', 'info');
      return true;
    },

    /**
     * UI helper to display consistent toasts across pages
     */
    showToast(message, type = 'info') {
      _showToast(message, type);
    },

    /**
     * Subscribe to state mutations
     * @param {function} callback - Receives { key, action, data, timestamp }
     * @returns {function} Unsubscribe handle
     */
    subscribe(callback) {
      if (typeof callback !== 'function') return () => {};
      _subscribers.add(callback);
      return () => {
        _subscribers.delete(callback);
      };
    },

    /**
     * Emit change event to local subscribers and dispatch DOM event
     */
    emitChange(key, action, data) {
      const detail = {
        key,
        action,
        data,
        timestamp: new Date().toISOString()
      };

      // Direct subscriber callbacks
      _subscribers.forEach((cb) => {
        try {
          cb(detail);
        } catch (err) {
          console.error('EasyBusStore subscriber callback error:', err);
        }
      });

      // Browser CustomEvent
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
        try {
          const customEvt = (typeof CustomEvent === 'function')
            ? new CustomEvent('easybus:change', { detail })
            : { type: 'easybus:change', detail };
          window.dispatchEvent(customEvt);
        } catch (_) {}
      }
    },

    // =========================================================================
    // SCHEDULES CRUD (easybus_schedules)
    // =========================================================================

    getSchedules() {
      const list = _readParsed(KEYS.SCHEDULES);
      if (!Array.isArray(list)) return [];
      return list.map(_normalizeSchedule);
    },

    getScheduleById(id) {
      if (!id) return null;
      const target = String(id).trim().toLowerCase();
      const list = this.getSchedules();
      return list.find(s => String(s.id).trim().toLowerCase() === target) || null;
    },

    getScheduleByBus(busNumber) {
      if (!busNumber) return null;
      const target = String(busNumber).trim().toUpperCase();
      const list = this.getSchedules();
      return list.find(s => {
        const num = (s.busNumber || '').trim().toUpperCase();
        const plate = (s.busPlate || '').trim().toUpperCase();
        return num === target || plate === target;
      }) || null;
    },

    addSchedule(schedule = {}) {
      const list = this.getSchedules();
      const bus = (schedule.busNumber || schedule.busPlate || `BUS-${Math.floor(1000 + Math.random() * 9000)}`).trim().toUpperCase();
      
      let priceNumeric = schedule.priceNumeric;
      let ticketPrice = schedule.ticketPrice;
      if (priceNumeric != null && !isNaN(Number(priceNumeric))) {
        priceNumeric = Number(priceNumeric);
        ticketPrice = ticketPrice || `RM${priceNumeric.toFixed(2)}`;
      } else if (ticketPrice) {
        priceNumeric = parseFloat(String(ticketPrice).replace(/[^\d.]/g, '')) || 0;
      } else {
        priceNumeric = 35.0;
        ticketPrice = 'RM35.00';
      }

      const fromLoc = schedule.from || schedule.departureLocation || 'Terminal Bersepadu Selatan (TBS)';
      const toLoc = schedule.to || schedule.arrivalLocation || 'Larkin Sentral, Johor Bahru';
      const routeStr = schedule.route || schedule.routeAssignment || `${fromLoc} → ${toLoc}`;

      const item = {
        id: schedule.id || `row-${Date.now()}`,
        busNumber: bus,
        busPlate: bus,
        route: routeStr,
        routeAssignment: routeStr,
        from: fromLoc,
        departureLocation: fromLoc,
        to: toLoc,
        arrivalLocation: toLoc,
        departureDate: schedule.departureDate || new Date().toISOString().split('T')[0],
        departureTime: schedule.departureTime || '08:00 AM',
        ticketPrice,
        priceNumeric,
        driverName: schedule.driverName || 'Unassigned',
        availableSeats: Number(schedule.availableSeats) || 40,
        busStatus: schedule.busStatus || 'Available',
        createdAt: new Date().toISOString()
      };

      list.push(item);
      _writeRaw(KEYS.SCHEDULES, list);
      this.emitChange(KEYS.SCHEDULES, 'create', item);
      return item;
    },

    updateSchedule(idOrBus, updates = {}) {
      if (!idOrBus) return null;
      const target = String(idOrBus).trim().toLowerCase();
      const list = this.getSchedules();
      const idx = list.findIndex(s => {
        const idMatch = String(s.id).trim().toLowerCase() === target;
        const busNumMatch = (s.busNumber || '').trim().toLowerCase() === target;
        const busPlateMatch = (s.busPlate || '').trim().toLowerCase() === target;
        return idMatch || busNumMatch || busPlateMatch;
      });

      if (idx === -1) return null;

      const current = list[idx];
      const merged = { ...current, ...updates, updatedAt: new Date().toISOString() };

      if (updates.routeAssignment && !updates.route) merged.route = updates.routeAssignment;
      if (updates.route && !updates.routeAssignment) merged.routeAssignment = updates.route;
      if (updates.departureLocation && !updates.from) merged.from = updates.departureLocation;
      if (updates.from && !updates.departureLocation) merged.departureLocation = updates.from;
      if (updates.arrivalLocation && !updates.to) merged.to = updates.arrivalLocation;
      if (updates.to && !updates.arrivalLocation) merged.arrivalLocation = updates.to;

      if (updates.busNumber && !updates.busPlate) merged.busPlate = updates.busNumber;
      if (updates.busPlate && !updates.busNumber) merged.busNumber = updates.busPlate;

      if (updates.priceNumeric != null && !isNaN(Number(updates.priceNumeric))) {
        merged.priceNumeric = Number(updates.priceNumeric);
        if (!updates.ticketPrice) merged.ticketPrice = `RM${merged.priceNumeric.toFixed(2)}`;
      } else if (updates.ticketPrice) {
        merged.priceNumeric = parseFloat(String(updates.ticketPrice).replace(/[^\d.]/g, '')) || 0;
      }

      list[idx] = _normalizeSchedule(merged);
      _writeRaw(KEYS.SCHEDULES, list);
      this.emitChange(KEYS.SCHEDULES, 'update', list[idx]);
      return list[idx];
    },

    deleteSchedule(idOrBus) {
      if (!idOrBus) return false;
      const target = String(idOrBus).trim().toLowerCase();
      const list = this.getSchedules();
      const idx = list.findIndex(s => {
        const idMatch = String(s.id).trim().toLowerCase() === target;
        const busNumMatch = (s.busNumber || '').trim().toLowerCase() === target;
        const busPlateMatch = (s.busPlate || '').trim().toLowerCase() === target;
        return idMatch || busNumMatch || busPlateMatch;
      });

      if (idx === -1) return false;
      const [removed] = list.splice(idx, 1);
      _writeRaw(KEYS.SCHEDULES, list);
      this.emitChange(KEYS.SCHEDULES, 'delete', removed);
      return true;
    },

    // =========================================================================
    // FLEET CRUD (easybus_fleet)
    // =========================================================================

    getFleet() {
      const list = _readParsed(KEYS.FLEET);
      return Array.isArray(list) ? list : [];
    },

    getFleetByPlate(plate) {
      if (!plate) return null;
      const target = String(plate).trim().toUpperCase();
      const list = this.getFleet();
      return list.find(f => {
        const p = (f.busPlate || f.busNumber || '').trim().toUpperCase();
        const id = (f.id || '').trim().toUpperCase();
        return p === target || id === target;
      }) || null;
    },

    addFleetAsset(asset = {}) {
      const list = this.getFleet();
      const rawPlate = asset.busPlate || asset.busNumber || asset.plate || asset.busPlateNum;
      const plate = (rawPlate || `BUS-${Math.floor(1000 + Math.random() * 9000)}`).trim().toUpperCase();

      const item = {
        id: asset.id || `FLT-${Math.floor(100 + Math.random() * 900)}`,
        busPlate: plate,
        plate: plate,
        seatCapacity: Number(asset.seatCapacity || asset.capacity || asset.seats) || 40,
        capacity: Number(asset.seatCapacity || asset.capacity || asset.seats) || 40,
        driverName: asset.driverName || asset.driver || 'Unassigned',
        driver: asset.driverName || asset.driver || 'Unassigned',
        licenseNum: asset.licenseNum || asset.license || `LIC-${Math.floor(1000 + Math.random() * 9000)}`,
        contactPhone: asset.contactPhone || asset.phone || '012-0000000',
        phone: asset.contactPhone || asset.phone || '012-0000000',
        status: asset.status || 'Active',
        onboardedAt: new Date().toISOString()
      };

      list.push(item);
      _writeRaw(KEYS.FLEET, list);
      this.emitChange(KEYS.FLEET, 'create', item);
      return item;
    },

    updateFleetAsset(plate, updates = {}) {
      if (!plate) return null;
      const target = String(plate).trim().toUpperCase();
      const list = this.getFleet();
      const idx = list.findIndex(f => {
        const p = (f.busPlate || f.busNumber || '').trim().toUpperCase();
        const id = (f.id || '').trim().toUpperCase();
        return p === target || id === target;
      });

      if (idx === -1) return null;

      const current = list[idx];
      const merged = { ...current, ...updates, updatedAt: new Date().toISOString() };
      if (updates.busPlate) merged.busPlate = updates.busPlate.trim().toUpperCase();
      if (updates.seatCapacity != null) merged.seatCapacity = Number(updates.seatCapacity);

      list[idx] = merged;
      _writeRaw(KEYS.FLEET, list);
      this.emitChange(KEYS.FLEET, 'update', list[idx]);
      return list[idx];
    },

    deleteFleetAsset(plate) {
      if (!plate) return false;
      const target = String(plate).trim().toUpperCase();
      const list = this.getFleet();
      const idx = list.findIndex(f => {
        const p = (f.busPlate || f.busNumber || '').trim().toUpperCase();
        const id = (f.id || '').trim().toUpperCase();
        return p === target || id === target;
      });

      if (idx === -1) return false;
      const [removed] = list.splice(idx, 1);
      _writeRaw(KEYS.FLEET, list);
      this.emitChange(KEYS.FLEET, 'delete', removed);
      return true;
    },

    // =========================================================================
    // BOOKINGS CRUD (easybus_admin_bookings)
    // =========================================================================

    getBookings() {
      const list = _readParsed(KEYS.BOOKINGS);
      if (!Array.isArray(list)) return [];
      return list.map(_normalizeBooking);
    },

    getBookingById(id) {
      if (!id) return null;
      const target = String(id).trim().toLowerCase();
      const list = this.getBookings();
      return list.find(b => String(b.id).trim().toLowerCase() === target) || null;
    },

    addBooking(booking = {}) {
      const list = this.getBookings();

      let fare = booking.fare || booking.amount;
      let amount = booking.amount || booking.fare;
      let fareNumeric = booking.fareNumeric;

      if (fareNumeric != null && !isNaN(Number(fareNumeric))) {
        fareNumeric = Number(fareNumeric);
        if (!fare) fare = `RM ${fareNumeric.toFixed(2)}`;
        if (!amount) amount = `RM ${fareNumeric.toFixed(2)}`;
      } else if (fare || amount) {
        fareNumeric = parseFloat(String(fare || amount).replace(/[^\d.]/g, '')) || 0;
      } else {
        fareNumeric = 35.0;
        fare = 'RM 35.00';
        amount = 'RM 35.00';
      }

      const note = booking.note || booking.paymentNote || 'Booking created via portal';
      const paymentNote = booking.paymentNote || booking.note || note;

      const item = {
        id: booking.id || `BK-${Math.floor(10000 + Math.random() * 90000)}`,
        passenger: booking.passenger || booking.fullName || 'Guest Passenger',
        phone: booking.phone || '011-00000000',
        email: booking.email || 'passenger@example.com',
        route: booking.route || 'Kuala Lumpur → Johor Bahru',
        bus: (booking.bus || booking.busPlate || booking.busNumber || 'ABC1234').trim().toUpperCase(),
        seat: booking.seat || booking.seatId || '1A',
        date: booking.date || new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        amount,
        fare,
        fareNumeric,
        gateway: booking.gateway || 'Online Banking',
        paymentNote,
        note,
        status: booking.status || 'Pending',
        createdAt: new Date().toISOString()
      };

      list.push(item);
      _writeRaw(KEYS.BOOKINGS, list);
      this.emitChange(KEYS.BOOKINGS, 'create', item);
      return item;
    },

    updateBookingStatus(id, status, note) {
      if (!id) return null;
      const target = String(id).trim().toLowerCase();
      const list = this.getBookings();
      const idx = list.findIndex(b => String(b.id).trim().toLowerCase() === target);

      if (idx === -1) return null;

      const current = list[idx];
      const merged = { ...current };

      if (status) merged.status = status;
      if (note !== undefined && note !== null) {
        merged.note = note;
        merged.paymentNote = note;
      }
      merged.updatedAt = new Date().toISOString();

      list[idx] = _normalizeBooking(merged);
      _writeRaw(KEYS.BOOKINGS, list);
      this.emitChange(KEYS.BOOKINGS, 'update', list[idx]);
      return list[idx];
    },

    deleteBooking(id) {
      if (!id) return false;
      const target = String(id).trim().toLowerCase();
      const list = this.getBookings();
      const idx = list.findIndex(b => String(b.id).trim().toLowerCase() === target);

      if (idx === -1) return false;
      const [removed] = list.splice(idx, 1);
      _writeRaw(KEYS.BOOKINGS, list);
      this.emitChange(KEYS.BOOKINGS, 'delete', removed);
      return true;
    },

    // =========================================================================
    // RESERVED SEATS (easybus_reserved_seats)
    // =========================================================================

    getReservedSeats(busNumber = null) {
      const list = _readParsed(KEYS.SEATS);
      if (!Array.isArray(list)) return [];
      if (busNumber == null || String(busNumber).trim() === '') {
        return [...list];
      }
      const targetBus = String(busNumber).trim().toUpperCase();
      const seats = [];
      for (const item of list) {
        const s = String(item).trim().toUpperCase();
        if (s.includes(':')) {
          const [bus, seat] = s.split(':');
          if (bus.trim() === targetBus && seat) {
            seats.push(seat.trim());
          }
        } else {
          // Unscoped default seats apply to all buses for backwards compatibility
          seats.push(s);
        }
      }
      return [...new Set(seats)];
    },

    isSeatReserved(seatId, busNumber = null) {
      if (seatId == null) return false;
      const target = String(seatId).trim().toUpperCase();
      if (!target) return false;
      if (busNumber != null && String(busNumber).trim() !== '') {
        const seats = this.getReservedSeats(busNumber);
        return seats.some(s => String(s).trim().toUpperCase() === target);
      }
      const list = _readParsed(KEYS.SEATS);
      if (!Array.isArray(list)) return false;
      return list.some(s => {
        const str = String(s).trim().toUpperCase();
        if (str === target) return true;
        if (str.includes(':')) {
          const parts = str.split(':');
          return parts[1] && parts[1].trim().toUpperCase() === target;
        }
        return false;
      });
    },

    reserveSeat(seatId, busNumber = null) {
      if (seatId == null) return false;
      const target = String(seatId).trim().toUpperCase();
      if (!target) return false;

      const list = _readParsed(KEYS.SEATS);
      const seatList = Array.isArray(list) ? [...list] : [];
      const hasBus = busNumber != null && String(busNumber).trim() !== '';
      const targetBus = hasBus ? String(busNumber).trim().toUpperCase() : null;
      const scopedKey = targetBus ? `${targetBus}:${target}` : target;

      if (this.isSeatReserved(target, busNumber)) {
        return false;
      }

      seatList.push(scopedKey);
      _writeRaw(KEYS.SEATS, seatList);
      this.emitChange(KEYS.SEATS, 'reserve', { seatId: target, busNumber: targetBus, scopedKey });
      return true;
    },

    releaseSeat(seatId, busNumber = null) {
      if (seatId == null) return false;
      const target = String(seatId).trim().toUpperCase();
      if (!target) return false;

      const list = _readParsed(KEYS.SEATS);
      if (!Array.isArray(list)) return false;
      const seatList = [...list];
      const hasBus = busNumber != null && String(busNumber).trim() !== '';
      const targetBus = hasBus ? String(busNumber).trim().toUpperCase() : null;

      const idx = seatList.findIndex(s => {
        const str = String(s).trim().toUpperCase();
        if (targetBus) {
          return str === `${targetBus}:${target}` || str === target;
        } else {
          return str === target || (str.includes(':') && str.split(':')[1]?.trim() === target);
        }
      });

      if (idx === -1) return false;
      const [removed] = seatList.splice(idx, 1);
      _writeRaw(KEYS.SEATS, seatList);
      this.emitChange(KEYS.SEATS, 'release', { seatId: target, busNumber: targetBus, removed });
      return true;
    },

    // =========================================================================
    // CURRENT USER SESSION (easybus_current_user)
    // =========================================================================

    getCurrentUser() {
      return _readParsed(KEYS.USER);
    },

    setCurrentUser(user = {}) {
      const current = this.getCurrentUser() || {};
      const updated = {
        ...current,
        ...user,
        updatedAt: new Date().toISOString()
      };
      _writeRaw(KEYS.USER, updated);
      this.emitChange(KEYS.USER, 'set', updated);
      return updated;
    },

    clearCurrentUser() {
      _removeRaw(KEYS.USER);
      this.emitChange(KEYS.USER, 'clear', null);
    },

    isLoggedIn() {
      const user = this.getCurrentUser();
      return Boolean(user && (user.fullName || user.email));
    },

    // =========================================================================
    // ANALYTICS & KPIS
    // =========================================================================

    /**
     * Compute real financial metrics directly from active booking records
     */
    getFinancialMetrics() {
      const bookings = this.getBookings();
      const activeBookings = bookings.filter(b => b && b.status !== 'Cancelled');
      const totalTicketsSold = activeBookings.length;

      const totalRevenue = activeBookings.reduce((sum, b) => {
        const val = (b.fareNumeric != null && !isNaN(Number(b.fareNumeric)))
          ? Number(b.fareNumeric)
          : (parseFloat(String(b.amount || b.fare || 0).replace(/[^\d.]/g, '')) || 0);
        return sum + val;
      }, 0);

      const averageTicketValue = totalTicketsSold > 0
        ? Number((totalRevenue / totalTicketsSold).toFixed(2))
        : 0;

      const routeMap = new Map();
      activeBookings.forEach((b) => {
        const rName = b.route || 'General Route';
        if (!routeMap.has(rName)) {
          routeMap.set(rName, {
            route: rName,
            bus: b.bus || 'N/A',
            tickets: 0,
            revenue: 0,
            percentage: 0
          });
        }
        const record = routeMap.get(rName);
        record.tickets += 1;
        const val = (b.fareNumeric != null && !isNaN(Number(b.fareNumeric)))
          ? Number(b.fareNumeric)
          : (parseFloat(String(b.amount || b.fare || 0).replace(/[^\d.]/g, '')) || 0);
        record.revenue += val;
      });

      const routeBreakdown = Array.from(routeMap.values()).map((r) => {
        const pct = totalRevenue > 0 ? Math.round((r.revenue / totalRevenue) * 100) : 0;
        return {
          ...r,
          revenue: Number(r.revenue.toFixed(2)),
          percentage: pct,
          percent: pct
        };
      });

      return {
        totalTicketsSold,
        totalRevenue: Number(totalRevenue.toFixed(2)),
        averageTicketValue,
        routeBreakdown
      };
    },

    /**
     * Compute operational overview KPIs directly from schedules and fleet assets
     */
    getOperationsKPI() {
      const schedules = this.getSchedules();
      const fleet = this.getFleet();
      const platesSet = new Set();

      schedules.forEach((s) => {
        if (!s || typeof s !== 'object') return;
        const p = (s.busNumber || s.busPlate || '').trim().toUpperCase();
        if (p) platesSet.add(p);
      });

      fleet.forEach((f) => {
        if (!f || typeof f !== 'object') return;
        const p = (f.busPlate || f.busNumber || f.plate || f.busPlateNum || '').trim().toUpperCase();
        if (p) platesSet.add(p);
      });

      let availableSchedules = 0;
      let otherSchedules = 0;

      schedules.forEach((s) => {
        if (!s || typeof s !== 'object') return;
        const status = (s.busStatus || '').trim().toLowerCase();
        if (status === 'available') {
          availableSchedules++;
        } else {
          otherSchedules++;
        }
      });

      const uniquePlates = Array.from(platesSet).sort();

      return {
        totalBuses: uniquePlates.length,
        uniquePlates,
        availableSchedules,
        otherSchedules
      };
    }
  };

  return EasyBusStore;
});
