# EasyBus storyboard CRUD and dashboard HTML snippets

Paste each block below the screenshot for the matching function in Section 4 of your storyboard. For **4.1 Function 2** and **4.2 Function 4**, these excerpts can replace the full HTML pages already pasted into the draft.

These are abridged excerpts of the current previews and use sample data. They omit styling and surrounding markup. Capture screenshots from the source pages listed below. The Delete dialogs use browser-only state and reset on reload.

## 4.1 CREATE operations

### Function 1. Register New Bus Schedule

Source page `frontend/add-schedule.html`

```html
<form method="post">
  <h3>Register New Bus Schedule</h3>
  <label>Bus number <input name="busNumber" placeholder="e.g. VJE 9021" required></label>
  <label>Route <input name="routeAssignment" required></label>
  <label>Driver <input name="driverName" required></label>
  <label>Available seats <input type="number" name="availableSeats" min="1" max="80" value="40" required></label>
  <label>Departure terminal <input name="departureLocation" required></label>
  <label>Arrival terminal <input name="arrivalLocation" required></label>
  <label>Date <input type="date" name="departureDate" required></label>
  <label>Time <input type="time" name="departureTime" required></label>
  <label>Fare (RM) <input type="text" name="ticketPrice" placeholder="45.00" required></label>
  <label>Status
    <select name="busStatus">
      <option selected>Available</option><option>Full</option>
      <option>Delayed</option><option>Cancelled</option>
    </select>
  </label>
  <button type="submit" disabled>Add Schedule</button>
</form>
```

### Function 2. Book Bus Ticket and Reserve a Seat

Source page `frontend/seat-selection.html`. The **Confirm Seat** link reveals the confirmation preview shown in 4.3 Function 2.

```html
<form id="seat-preview" method="post">
  <h3>Seat Reservation Preview</h3>
  <input type="hidden" name="tripId" value="1">
  <fieldset>
    <legend>Choose one seat</legend>
    <label><input type="radio" id="seat-1A" name="seatNumber" value="1A"> 1A</label>
    <label><input type="radio" id="seat-1C" name="seatNumber" value="1C" checked> 1C</label>
  </fieldset>
  <p>Fare <strong>RM 35.00</strong></p>
  <div class="seat-preview-before">
    <p>Status: Available</p>
    <a href="#seat-confirmed">Confirm Seat</a>
  </div>
</form>
```

### Function 3. Register New Passenger Account

Source page `frontend/index.html`, passenger registration form

```html
<form method="post">
  <h3>Passenger Registration</h3>
  <label>Full name <input name="fullName" autocomplete="name" required></label>
  <label>Email <input type="email" name="email" autocomplete="email" required></label>
  <label>Phone <input type="tel" name="phone" autocomplete="tel" required></label>
  <label>Password <input type="password" name="password" autocomplete="new-password" required></label>
  <label><input type="checkbox" name="terms" required> I accept the terms</label>
  <button type="submit" disabled>Create Account</button>
</form>
```

### Function 4. Onboard New Bus Vehicle and Driver

Source page `frontend/fleet-registration.html`

```html
<form method="post">
  <h3>Fleet and Driver Registration</h3>
  <fieldset>
    <legend>Bus details</legend>
    <label>Plate number <input name="busPlateNum" value="DEF9012" required></label>
    <label>Seat capacity <input type="number" name="seatCapacity" min="10" max="80" value="40" required></label>
  </fieldset>
  <fieldset>
    <legend>Driver details</legend>
    <label>Name <input name="driverName" value="Lim" required></label>
    <label>Licence number <input name="licenseNum" value="LIC-1003" required></label>
    <label>Phone <input type="tel" name="contactPhone" required></label>
  </fieldset>
  <button type="submit" disabled>Onboard Vehicle &amp; Driver</button>
</form>
```

## 4.2 READ operations

### Function 1. Display and Filter the Master Bus Schedule

Source page `frontend/schedule-list.html`. The current preview shows the sample table. Describe live filtering separately as planned behavior.

```html
<table>
  <caption>Master Bus Schedule</caption>
  <thead>
    <tr><th scope="col">Bus</th><th scope="col">Route</th><th scope="col">Departure</th>
        <th scope="col">Fare</th><th scope="col">Status</th><th scope="col">Actions</th></tr>
  </thead>
  <tbody>
    <tr><td>ABC1234</td><td>Kuala Lumpur to Johor Bahru</td><td>1 Jun 2026, 8:00 a.m.</td>
        <td>RM 35.00</td><td>Available</td>
        <td><a href="edit-schedule.html">Edit</a> <button type="button" disabled>Delete</button></td></tr>
  </tbody>
</table>
```

### Function 2. Search Trips by Route and Travel Date

Source pages `frontend/index.html` for the form and `frontend/schedules.html` for sample departures. The link opens the same sample list regardless of the search fields. The storyboard's trip-type selector is planned.

```html
<form method="get">
  <h3>Find a Trip</h3>
  <label>From <input name="from" value="TBS Kuala Lumpur"></label>
  <label>To <input name="to" value="Penang Sentral"></label>
  <label>Departure date <input type="date" name="date" value="2026-06-01"></label>
  <label>Return date <input type="date" name="returnDate"></label>
  <label>Passengers
    <select name="pax">
      <option value="1" selected>1 Pax</option><option value="2">2 Pax</option>
      <option value="3">3 Pax</option><option value="4">4 Pax</option>
    </select>
  </label>
  <a href="schedules.html">View Schedules</a>
</form>
```

### Function 3. Display the Cabin Seat Matrix

Source page `frontend/seat-selection.html`. Cabin markers link to the radio controls in 4.1 Function 2. Seat 1C starts selected in the preview. The reserved marker has no linked control.

```html
<div id="seat-container">
  <div id="btn-seat-1A" class="seat-marker">
    <label for="seat-1A" class="seat-preview-pin" id="pin-1A">1A</label>
  </div>
  <div id="btn-seat-1C" class="seat-marker">
    <label for="seat-1C" class="seat-preview-pin" id="pin-1C">1C</label>
  </div>
  <div id="btn-seat-2B" class="seat-marker is-reserved">
    <span>2B</span> <span id="tooltip-2B">Reserved</span>
  </div>
</div>
```

### Function 4. Display Bus Tracking and Route Milestones

Source page `frontend/tracking.html`. The route diagram, trip milestones and telemetry are static sample data.

```html
<section aria-label="Sample bus tracking">
  <h3>Bus ABC1234 · Kuala Lumpur to Johor Bahru</h3>
  <dl>
    <dt>Speed</dt><dd>82 km/h</dd>
    <dt>Estimated arrival</dt><dd>1:15 p.m.</dd>
    <dt>Remaining distance</dt><dd>135 km</dd>
  </dl>
  <ol aria-label="Journey milestones">
    <li>Ticket booked</li>
    <li>Departed TBS</li>
    <li aria-current="step">In transit on the PLUS Highway</li>
    <li>Arriving at Johor Bahru · Larkin Sentral</li>
  </ol>
</section>
```

## 4.3 UPDATE operations

### Function 1. Update Bus Schedule Details and Fare

Source page `frontend/edit-schedule.html`

```html
<form method="post">
  <h3>Edit Schedule · ABC1234</h3>
  <input type="hidden" name="tripId" value="1">
  <label>Driver <input name="driverName" value="Ahmad Albab" required></label>
  <label>Date <input type="date" name="departureDate" value="2026-06-01" required></label>
  <label>Time <input type="time" name="departureTime" value="08:00" required></label>
  <label>Fare (RM) <input type="text" name="ticketPrice" value="35.00" required></label>
  <label>Status
    <select name="busStatus">
      <option selected>Available</option><option>Full</option>
      <option>Delayed</option><option>Cancelled</option>
    </select>
  </label>
  <button type="submit" disabled>Update Schedule</button>
  <a href="schedule-list.html">Back to Schedules</a>
</form>
```

### Function 2. Update Seat Status After Reservation

Source page `frontend/seat-selection.html`, after choosing **Confirm Seat**. The stylesheet shows this panel and visually locks the selected seat when the link targets it.

```html
<div id="seat-confirmed" tabindex="-1" class="seat-preview-after">
  <p>Status: Reserved &amp; Locked</p>
  <p>Booking confirmed in this preview. The selected seat is locked in the cabin map.</p>
  <a href="tracking.html">View Tracking Preview</a>
  <a href="#seat-preview">Reset Preview</a>
</div>
```

### Function 3. Update Booking Status

Source page `frontend/booking-management.html`

```html
<form method="post">
  <h3>Manage Booking BK-89244</h3>
  <input type="hidden" name="bookingId" value="BK-89244">
  <label>Booking status
    <select name="status">
      <option selected>Pending</option><option>Confirmed</option>
      <option>Completed</option><option>Cancelled</option>
    </select>
  </label>
  <button type="submit" disabled>Update</button>
</form>
```

### Function 4. Update Passenger Profile and Change Password

Source page `frontend/account-settings.html`

```html
<form method="post">
  <h3>Passenger Account Settings</h3>
  <label>Name <input name="profileFullName" value="Ali bin Abu" required></label>
  <label>Email <input type="email" name="profileEmail" value="ali@example.com" required></label>
  <label>Phone <input type="tel" name="profilePhone" value="011-99887766" required></label>
  <fieldset>
    <legend>Change password (optional)</legend>
    <label>Current <input type="password" name="currentPassword" autocomplete="current-password"></label>
    <label>New <input type="password" name="newPassword" autocomplete="new-password" minlength="8"></label>
    <label>Confirm <input type="password" name="confirmPassword" autocomplete="new-password"></label>
  </fieldset>
  <button type="submit" disabled>Save Profile &amp; Reset Password</button>
</form>
```

## 4.4 DELETE operations

### Function 1. Delete an Obsolete Schedule

Source page `frontend/schedule-list.html`. Choose **Delete** on the cancelled trip for **DEF9012**.

```html
<dialog id="record-dialog" aria-labelledby="record-title">
  <h2 id="record-title">Delete bus schedule?</h2>
  <p>Bus DEF9012 · 3 Jun 2026, 9:15 AM · Cancelled</p>
  <p>This departure has no bookings. Deleting it will permanently remove it from the schedule.</p>
  <form method="dialog">
    <button value="keep" autofocus>Keep schedule</button>
    <button value="confirm">Delete schedule</button>
  </form>
</dialog>
```

### Function 2. Cancel a Passenger Booking and Release the Seat

Source page `frontend/my-bookings.html`. Choose **Cancel booking** for **BK-77102**. The card then shows the cancelled status and a seat release message.

```html
<dialog id="record-dialog" aria-labelledby="record-title">
  <h2 id="record-title">Cancel this booking?</h2>
  <p>Booking BK-77102 · Seat 2A · 1 passenger</p>
  <p>Cancelling this reservation releases seat 2A. Your booking will remain in your history as cancelled.</p>
  <form method="dialog">
    <button value="keep" autofocus>Keep booking</button>
    <button value="confirm">Cancel booking</button>
  </form>
</dialog>
```

### Function 3. Remove an Unused Fleet Record

Source page `frontend/fleet-registration.html#fleet-roster`. Choose **Remove** for the unassigned vehicle **VJE 9021**. This example uses a bus with no trip references.

```html
<dialog id="record-dialog" aria-labelledby="record-title">
  <h2 id="record-title">Remove vehicle from fleet?</h2>
  <p>Bus VJE 9021 · 40 seats · No driver or trips assigned</p>
  <p>This vehicle has no linked trips. Removing it will permanently delete its fleet record.</p>
  <form method="dialog">
    <button value="keep" autofocus>Keep vehicle</button>
    <button value="confirm">Remove vehicle</button>
  </form>
</dialog>
```

## 4.5 Dashboard and Data Presentation

### Feature 1. Operations Overview KPI Cards

Source page `frontend/schedule-list.html#reports`. Click **View Reports** and capture the three cards in the **Operations Overview** section.

```html
<section id="reports" aria-labelledby="operations-heading">
  <h2 id="operations-heading">Operations Overview</h2>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <div>
      <span>Total Buses</span>
      <strong id="reportTotalBuses">3</strong>
      <p>ABC1234, XYZ5678, DEF9012</p>
    </div>
    <div>
      <span>Available Schedules</span>
      <strong id="reportAvailableSchedules">1</strong>
      <p>Open for booking</p>
    </div>
    <div>
      <span>Full or Cancelled</span>
      <strong id="reportOtherSchedules">2</strong>
      <p>Closed for booking</p>
    </div>
  </div>
</section>
```

In the planned app, the bus count comes from fleet records and the schedule counts group departures by availability.

### Feature 2. Daily Bookings and Revenue Summary

Source page `frontend/financial-dashboard.html`. Capture the three totals and the revenue breakdown below them. The excerpt includes one route from the breakdown.

```html
<section class="grid grid-cols-1 md:grid-cols-3 gap-5">
  <div><span>Total Tickets Sold Today</span> <strong id="finTotalTickets">142</strong></div>
  <div><span>Total Revenue (Today)</span> <strong id="finTotalRevenue">RM 4,970.00</strong></div>
  <div><span>Average Ticket Value</span> <strong id="finAvgTicketValue">RM 35.00</strong></div>
</section>
<section>
  <h2>Daily Revenue by Route</h2>
  <div id="finRouteBreakdown">
    <div>
      <strong>Kuala Lumpur (TBS) &rarr; Johor Bahru (Larkin Sentral)</strong>
      <p>88 tickets sold &bull; RM 35.00 fare</p>
      <meter class="revenue-share" min="0" max="100" value="62"
             aria-label="Kuala Lumpur to Johor Bahru share of total revenue">62%</meter>
      <p>RM 3,080.00 &bull; 62% of total revenue</p>
    </div>
  </div>
</section>
```

The planned report counts tickets sold for the reporting day, sums their fares, and divides total revenue by the ticket count. The route breakdown groups those sales by route.

### Feature 3. Fleet Tracking Dashboard

Source page `frontend/tracking.html`. Capture the route schematic with the assigned driver, trip status, and telemetry visible. The excerpt omits the timeline and the remaining SVG artwork.

```html
<section aria-label="Vehicle and trip summary">
  <p><span id="cardVehiclePlate">Bus ABC1234</span> <span id="cardTripStatus">On Time</span></p>
  <p>Driver <strong id="cardDriverName">Ahmad Albab</strong></p>
  <p>Speed <strong id="cardSpeed">82 km/h</strong></p>
  <p>ETA <strong id="cardEta">01:15 PM</strong></p>
  <p>Distance <strong id="cardDistance">135 km</strong></p>
</section>
<svg viewBox="0 0 520 340" role="img" aria-labelledby="route-map-title">
  <title id="route-map-title">Bus ABC1234 at Ayer Keroh on the route from Kuala Lumpur to Johor Bahru</title>
  <path d="M98 70 L155 104 L207 164 L270 178" fill="none" stroke="#f59e0b" stroke-width="6"/>
  <path d="M270 178 L328 228 L422 270" fill="none" stroke="#60a5fa" stroke-width="6" stroke-dasharray="8 12"/>
  <circle cx="270" cy="178" r="14" fill="#f59e0b" class="tracking-position-ring animate-ping"/>
  <circle cx="270" cy="178" r="12" fill="#f59e0b" stroke="#fff" stroke-width="3"/>
</svg>
```

The current page uses a fixed vehicle position and telemetry values. Describe real-time updates as planned behavior. The finished screen would use the latest trip location and link the trip to its assigned bus and driver.
