# EasyBus Frontend (HTML / CSS / JavaScript)

This folder contains the complete storyboard and interactive UI prototypes for the **EasyBus Online Bus Reservation System**. Built using Tailwind CSS, Font Awesome, and Phosphor Icons with modern glassmorphism styling.

---

## 📁 Directory Structure & File Map

```text
frontend/
├── assets/
│   └── images/
│       ├── bus-interior.png      # VIP luxury bus interior photograph (used for AR seat selection)
│       └── image_cca655.png      # Compatibility alias for local image reference
├── index.html                    # 1. Main Landing Page & Bus Search (renamed from INDEX.html)
├── schedule-list.html            # 2. Bus Schedule Management Table & Modals (renamed from LIST.HTML)
├── add-schedule.html             # 3. Add New Schedule Form Page (renamed from ADD_SCHEDULE.html)
├── edit-schedule.html            # 4. Edit Schedule Form Page (renamed from Edit schedule.html)
├── seat-selection.html           # 5. VIP Seat Selection & AR Cabin Map (renamed from seat.html)
├── tracking.html                 # 6. Real-time GPS Bus Live Tracking (renamed from Tracking.html)
├── schedules.html                # Redirect shortcut to schedule-list.html
└── seat.html                     # Redirect shortcut to seat-selection.html
```

---

## 🧭 Page Overview & User Flow

| Original Name | Proper Name | Role & Target Audience | Key Features & Actions |
|---|---|---|---|
| `INDEX.html` | [`index.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/index.html) | Public / Passengers | Hero banner, trip search (One-way/Round-trip), popular destination cards with **"Book Now"** linking directly to seat booking, navigation to schedules & tracking. |
| `LIST.HTML` | [`schedule-list.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/schedule-list.html) | Admin / Operations | Live searchable schedule table (ABC1234, XYZ5678, DEF9012), instant search filter, Add/Edit modal dialogs, status badges, and quick links. |
| `ADD_SCHEDULE.html` | [`add-schedule.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/add-schedule.html) | Admin / Operations | Form to register a new trip schedule: Bus number, Route, Driver name, Available seats, Departure/Arrival terminals, Date, Time, Price, and Status. |
| `Edit schedule.html` | [`edit-schedule.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/edit-schedule.html) | Admin / Operations | Standalone glassmorphic editing view with pre-populated schedule attributes, form validation, reset option, and return to dashboard button. |
| `seat.html` | [`seat-selection.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/seat-selection.html) | Passengers | Interactive cabin seat picker overlaid onto real VIP bus interior imagery. Real-time price calculation, reserved vs. available seat states, dynamic tooltips. |
| `Tracking.html` | [`tracking.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/tracking.html) | Passengers & Admin | Real-time GPS tracking dashboard with Leaflet map, route timeline from Kuala Lumpur (TBS) to Johor Bahru (Larkin Sentral), speed and ETA indicators. |

---

## 🔗 Connected Navigation Flow

- **From [`index.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/index.html):**
  - Click **"Search Buses"** or **"Schedules"** in the top navigation &rarr; Opens [`schedule-list.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/schedule-list.html).
  - Click **"Book Now"** on any destination card &rarr; Opens [`seat-selection.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/seat-selection.html).
  - Click **"Live Tracking"** in navigation &rarr; Opens [`tracking.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/tracking.html).
- **From [`schedule-list.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/schedule-list.html):**
  - Click EasyBus logo or **"Home"** &rarr; Returns to [`index.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/index.html).
  - Click **"Tracking"** &rarr; Opens [`tracking.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/tracking.html).
  - Open modals or navigate to [`add-schedule.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/add-schedule.html) and [`edit-schedule.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/edit-schedule.html).
- **From [`add-schedule.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/add-schedule.html) & [`edit-schedule.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/edit-schedule.html):**
  - Click **"Back to Dashboard"** / **"Cancel"** &rarr; Returns to [`schedule-list.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/schedule-list.html).
  - Click EasyBus logo &rarr; Returns to [`index.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/index.html).
- **From [`seat-selection.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/seat-selection.html):**
  - Click Back button &rarr; Returns to [`index.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/index.html).
  - Click **"Confirm Seat"** &rarr; Advances to [`tracking.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/tracking.html).
- **From [`tracking.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/tracking.html):**
  - Header links provide one-click navigation back to [`index.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/index.html) and [`schedule-list.html`](file:///c:/Users/Element/Documents/EasyBus/EasyBus/frontend/schedule-list.html).

---

## 🗄️ Backend / Database ERD Mapping

These HTML storyboard templates match the tables in `sql/easybus_db.sql`:
- **`bus` & `driver`**: Displayed and managed in `schedule-list.html`, `add-schedule.html`, and `edit-schedule.html`.
- **`trip` & `route`**: Handled across the search bar (`index.html`), schedule rows (`schedule-list.html`), and GPS route tracking (`tracking.html`).
- **`seat`**: Directly mapped to the interactive 1A-3C seating matrix in `seat-selection.html`.
- **`booking` & `passenger`**: Flow from `seat-selection.html` into booking confirmation and trip tracking in `tracking.html`.
