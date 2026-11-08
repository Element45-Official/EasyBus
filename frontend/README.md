# EasyBus Frontend (HTML / CSS / JavaScript)

This folder contains the complete storyboard and interactive UI prototypes for the **EasyBus Online Bus Reservation System**. Built using Tailwind CSS, Font Awesome, and Phosphor Icons with modern dark glassmorphism styling.

---

## 📁 Directory Structure & File Map

```text
frontend/
├── assets/
│   └── images/
│       ├── bus-interior.png      # VIP luxury bus interior photograph (used for AR seat selection)
│       └── image_cca655.png      # Compatibility alias for local image reference
├── index.html                    # 1. Main Landing Page, Search, Passenger Reg Modal & Account Links
├── schedule-list.html            # 2. Bus Schedule Management, Fleet Onboarding & Booking Management Modal
├── add-schedule.html             # 3. Add New Schedule Form Page (Function 1: Create)
├── edit-schedule.html            # 4. Edit Schedule Form Page (Function 1: Update)
├── fleet-registration.html       # 5. Admin Fleet & Driver Registration Panel (Function 4: Create)
├── booking-management.html       # 6. Admin Booking Management Panel (Function 3: Update)
├── financial-dashboard.html      # 7. Daily Financial Summary Dashboard (Feature 2: Dashboard & Revenue)
├── account-settings.html         # 8. Passenger Account Settings & Password Reset (Function 4: Update)
├── seat-selection.html           # 9. VIP Seat Selection & AR Cabin Map (Function 2: Update)
├── tracking.html                 # 10. Real-time GPS Fleet Live Tracking & Telematics (Feature 3)
├── schedules.html                # Redirect shortcut to schedule-list.html
└── seat.html                     # Redirect shortcut to seat-selection.html
```

---

## 🧭 Page Overview & User Flow

| Proper Name | Role & Target Audience | Key Features & Actions | Corresponding Storyboard Function |
|---|---|---|---|
| [`index.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/index.html) | Public / Passengers | Hero banner, trip search, destination cards, navbar account link, and **Passenger Registration Modal** (Ali bin Abu). | **CREATE Function 3** |
| [`schedule-list.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/schedule-list.html) | Admin / Operations | Searchable schedule table (ABC1234, XYZ5678, DEF9012), Add/Edit schedule links, **Fleet Onboard Modal**, and **Admin Booking Management Panel Modal**. | **CREATE Function 1 & 4**, **DELETE Function 1 & 3**, **UPDATE Function 3** |
| [`add-schedule.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/add-schedule.html) | Admin / Operations | Form to register a new trip schedule: Bus number, Route, Driver name, Available seats, Departure/Arrival terminals, Date, Time, Price, and Status. | **CREATE Function 1** |
| [`edit-schedule.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/edit-schedule.html) | Admin / Operations | Standalone glassmorphic editing view with pre-populated schedule attributes, date/time pickers, form validation, reset option, and return to dashboard. | **UPDATE Function 1** |
| [`fleet-registration.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/fleet-registration.html) | Admin / Operations | **Admin Fleet & Driver Registration Panel**: Onboard bus DEF9012, 40 seats, driver Lim (LIC-1003, 016-2233445) and active roster management. | **CREATE Function 4**, **DELETE Function 3** |
| [`seat-selection.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/seat-selection.html) | Passengers | Interactive cabin seat picker overlaid onto real VIP bus interior imagery. **Transitions seat status from Available to Reserved & Locked** immediately upon booking confirmation. | **UPDATE Function 2** |
| [`booking-management.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/booking-management.html) | Admin / Operations | **Admin Booking Management Panel**: Updates booking status from Pending to Confirmed or Cancelled following payment verification. Editable controls: Status dropdown (Pending, Confirmed, Completed, Cancelled). | **UPDATE Function 3** |
| [`account-settings.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/account-settings.html) | Passengers | **Passenger Account Settings Page**: Allows passengers to update their contact telephone number (pre-filled with `011-99887766`), Email address, and reset account password with confirm password validation. | **UPDATE Function 4** |
| [`tracking.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/tracking.html) | Passengers & Admin | Real-time GPS tracking dashboard with Leaflet map (Esri ArcGIS tiles), route timeline from Kuala Lumpur (TBS) to Johor Bahru (Larkin Sentral), speed and ETA indicators. | Storyboard Live Tracking |

---

## 🚀 Newly Implemented Update Functions

### 1. Function 2 (UPDATE): Update Seat Status Upon Reservation
- **Interface:** Bottom confirmation panel in [`seat-selection.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/seat-selection.html).
- **Behavior:**
  - Selected seat begins in `Available` state with an emerald badge.
  - Passenger selects a seat (e.g. `1C`) and clicks **"Confirm Seat"**.
  - The seat marker immediately transitions from Available to **Reserved & Locked** (`bg-red-500/25 border-red-500/60`, lock icon `<i class="ph-fill ph-lock-key"></i>`, and red tooltip).
  - The seat status badge in the bottom panel updates to `Status: Reserved & Locked`.
  - The primary action button transitions to **"Proceed to Live Tracking →"** (leading to `tracking.html`).
  - Concurrent passenger attempt protection: Clicking the locked seat shakes the seat and triggers an alert warning: *"Maaf, kerusi ini telah ditempah dan dikunci!"*.
  - A reset/unlock button is also provided for repeated testing.

### 2. Function 3 (UPDATE): Update Booking Payment & Execution Status
- **Interface:** Admin Booking Management Panel in [`schedule-list.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/schedule-list.html) (via **Manage Bookings** button or `#bookings` URL hash) and standalone in [`booking-management.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/booking-management.html).
- **Behavior:**
  - Displays bookings (`BK-89244` Ali bin Abu, `BK-77102` Siti Nurhaliza, `BK-65041` Tan Ah Seng, `BK-54912` Muthu A/L Raman).
  - **Editable Controls:** Booking Status dropdown with options: `Pending`, `Confirmed`, `Completed`, `Cancelled`.
  - Selecting an option or clicking "Update Status" triggers immediate status badge color change (Amber for Pending, Emerald for Confirmed, Blue for Completed, Red for Cancelled), payment verification note update, and notification toast/alert.
  - Synchronized and persisted into `localStorage`.

### 3. Function 4 (UPDATE): Update Passenger Profile & Password Reset
- **Interface:** Passenger Account Settings Page in [`account-settings.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/account-settings.html) and linked directly from the navigation bar & user profile badge in [`index.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/index.html).
- **Behavior:**
  - **Editable Fields:**
    - Full Name (`Ali bin Abu`)
    - Email Address (`ali@example.com`)
    - Contact Telephone Number (pre-filled with `011-99887766` per specification)
    - Current Password, New Password, and Confirm Password (with visibility toggle eye icons and matching validator).
  - Clicking **"Save Profile & Reset Password"** validates input, persists the profile in `localStorage`, and triggers success confirmation: *"Passenger profile updated successfully! Contact telephone number set to 011-99887766 and password reset."*.

---

## 🔗 Connected Navigation Flow

- **From [`index.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/index.html):**
  - Click **"Sign Up"** &rarr; Passenger Registration Modal (Ali bin Abu).
  - Click **"Account Settings"** or User Profile Badge &rarr; Opens [`account-settings.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/account-settings.html).
  - Click **"Schedules"** &rarr; Opens [`schedule-list.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/schedule-list.html).
  - Click **"Book Now"** on any destination card &rarr; Opens [`seat-selection.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/seat-selection.html).
  - Click **"Live Tracking"** &rarr; Opens [`tracking.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/tracking.html).
- **From [`schedule-list.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/schedule-list.html):**
  - Click **"Manage Bookings"** &rarr; Opens Admin Booking Management Panel (Function 3).
  - Click **"Onboard Fleet"** &rarr; Opens Fleet & Driver Registration Panel (Function 4: DEF9012, Lim).
  - Click **"Add New Schedule"** &rarr; Opens [`add-schedule.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/add-schedule.html).
  - Click **"Edit"** on any row &rarr; Opens [`edit-schedule.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/edit-schedule.html).
- **From [`booking-management.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/booking-management.html):**
  - Manage payment verification and update booking execution status via status dropdowns.
  - Direct links back to Schedules, Fleet, Live Tracking, and Passenger Profile.
- **From [`account-settings.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/account-settings.html):**
  - Update telephone number to `011-99887766` and reset account password.
  - Return to [`index.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/index.html) or continue to [`seat-selection.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/seat-selection.html).
- **From [`seat-selection.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/seat-selection.html):**
  - Choose seat &rarr; click **"Confirm Seat"** &rarr; transitions status from `Available` to `Reserved & Locked`.
  - Click **"Proceed to Live Tracking"** &rarr; Opens [`tracking.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/tracking.html).

---

## 📊 Section 4.5 DASHBOARD & Data Presentation

### Feature 1: Operations Overview KPI Metric Cards
- **User Interface:** Schedule Reports Overview Modal in [`schedule-list.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/schedule-list.html) (accessed via top "View Reports" button or `#reports` URL hash).
- **KPI Metrics Displayed:**
  - **Total Buses:** `3` (Active fleet vehicles: `ABC1234`, `XYZ5678`, `DEF9012`).
  - **Available Schedules:** `1` (Active departures open for booking, e.g. `ABC1234 - 08:00 AM`).
  - **Booked / Full / Other:** `2` (Fully booked or completed trips: `XYZ5678 - Full`, `DEF9012 - Cancelled`).
  - Includes route demand previews and one-click launch to the Daily Financial Summary Dashboard.

### Feature 2: Daily Bookings & Revenue Summary
- **User Interface:** Daily Financial Summary Dashboard ([`financial-dashboard.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/financial-dashboard.html)) and quick telemetry banner in [`booking-management.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/booking-management.html).
- **Metrics Displayed:**
  - **Total tickets sold today:** `142 Tickets` (142 passengers booked across active routes, +12.4% vs yesterday).
  - **Total Revenue:** `RM 4,970.00` (Cumulative revenue collected today, 100% reconciled via PayNet / FPX / TNG).
  - **Average Ticket Value (ATV):** `RM 35.00` (`RM 4,970.00 ÷ 142 tickets = RM 35.00`).
  - **Route Breakdown:** KL &rarr; JB: RM 2,380.00 (48%), KL &rarr; Penang: RM 1,575.00 (32%), Melaka &rarr; JB: RM 1,015.00 (20%).
  - **Payment Channels:** FPX Online Banking (60%), Touch 'n Go eWallet (30%), Credit/Debit Card (10%).

### Feature 3: Real-Time Fleet Live Tracking Dashboard
- **User Interface:** Fleet Tracking Dashboard ([`tracking.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/tracking.html)).
- **Dashboard Components:**
  - **Interactive GPS Map:** Real-time map displaying highway location along PLUS Expressway (E2) with animated pulsing bus marker and traveled polyline.
  - **Trip Telematics:**
    - Live speed: `82 km/h` (with real-time simulated sensor cruise telemetry).
    - Estimated Time of Arrival: `01:15 PM`.
    - Remaining Distance: `135 km` to Larkin Sentral Terminal.
  - **Assigned Driver Details Profile Card & Cockpit HUD:**
    - Driver Name: `Ahmad Albab` (Senior Fleet Captain, 4.9 ★).
    - Vehicle Plate: `ABC1234`.
    - Trip Status: `On Time` (prominent green status badge).
    - Driver License: `LIC-1003` (Class E Commercial).
    - Quick Driver Action: Direct phone call (`016-2233445`) and Dispatch Radio button.
  - **Fleet Selector:** Switch live tracking between active fleet buses (`ABC1234`, `XYZ5678`, `DEF9012`).
