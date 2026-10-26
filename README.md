# EasyBus - Online Bus Reservation System

Group project for the **EasyBus** bus schedule and reservation system, compatible with **Eclipse IDE 2022-12 (4.26.0)** (`JavaSE-17`) and **XAMPP / MySQL**.

## Project Structure

```text
Group Project/
├── frontend/                  # HTML, CSS, and JS frontend files (index.html, add.html, edit-bus.html, etc.)
├── sql/
│   └── easybus_db.sql         # MySQL / phpMyAdmin schema & sample data (7 ERD tables)
└── src/
    └── com/easybus/
        ├── Main.java          # Entry point to test ERD entity models & DB connection
        ├── model/             # 7 ERD entity classes (Passenger, Booking, Driver, Trip, Bus, Seat, Route)
        └── util/
            └── DBConnection.java  # JDBC helper for XAMPP MySQL
```

## Setup in Eclipse IDE 2022-12 (4.26.0)

1. Clone this repository:
   ```bash
   git clone <REPO_URL>
   ```
2. Open **Eclipse IDE 2022-12** -> **File** -> **Import...** -> **General** -> **Existing Projects into Workspace** -> select the cloned folder -> **Finish**.
3. Run `src/com/easybus/Main.java` via **Right-click** -> **Run As** -> **Java Application**.

## Database Setup (XAMPP / MySQL)

1. Start **Apache** and **MySQL** in XAMPP.
2. Open `http://localhost/phpmyadmin` and import `sql/easybus_db.sql`.
3. Add `mysql-connector-j-*.jar` to **Project Properties** -> **Java Build Path** -> **Libraries** -> **Classpath** -> **Add External JARs...**.

## Adding Frontend Files

Teammates working on the HTML/Bootstrap frontend can add their `.html`, `.css`, and `.js` files inside the [`frontend/`](frontend/) folder, commit, and push to GitHub.
