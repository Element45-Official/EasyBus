# EasyBus - Online Bus Reservation System

Group project for the **EasyBus** bus schedule and reservation system, compatible with **Eclipse IDE 2022-12 (4.26.0)** (`JavaSE-17`) and **XAMPP / MySQL**.

Note that this project is for CSC584 Cources. So it does not need to be advanced.

## Project Structure

```text
Group Project/
├── frontend/                  # HTML and CSS frontend pages
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

Open [the frontend home page](frontend/index.html) to preview the HTML/CSS screens. See [the frontend guide](frontend/README.md) for the passenger and admin flows.
