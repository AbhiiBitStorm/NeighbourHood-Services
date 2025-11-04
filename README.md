# 🔧 NeighbourHood-Services

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JSON Server](https://img.shields.io/badge/JSON_Server-A6A6A6?style=for-the-badge&logo=json&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)

A web application that connects local service providers (like electricians, plumbers, painters) with customers in their vicinity. This platform aims to provide digital visibility to local workers and make it easier for customers to find and book reliable services.

---

## 🌟 Key Features

*   **Role-Based Access Control**: Separate experiences for **Customers**, **Workers**, and **Admins**.
*   **Service Provider Directory**: Customers can browse, search, and filter local workers by service type and location.
*   **User Authentication**: Secure registration and login system for all user roles.
*   **Booking System**: Customers can book services from their chosen provider.
*   **Professional Dashboards**:
    *   👑 **Admin Dashboard**: A PowerBI-style dashboard with charts and key metrics (total users, workers, bookings, etc.).
    *   🛠️ **Worker Dashboard**: A dedicated dashboard for workers to view their assigned bookings and performance stats.
    *   👥 **Customer Dashboard**: A personal space for customers to manage their bookings and profile.
*   **Responsive UI**: A clean and modern user interface that works seamlessly on both desktop and mobile devices.

---

## 📸 Screenshot

*Replace this with a screenshot of your application's home page or dashboard.*

![App Screenshot](https://via.placeholder.com/800x450.png?text=Your+App+Screenshot+Here)

---

## 🛠️ Tech Stack

| Category      | Technology                                                                                                  |
|---------------|-------------------------------------------------------------------------------------------------------------|
| **Frontend**  | `React.js`, `React Router`, `Axios`, `Chart.js`                                                             |
| **Backend**   | `Node.js`, `JSON Server` (for creating a mock REST API)                                                       |
| **Styling**   | `CSS` (with a focus on clean, modern design)                                                                |
| **Dev Tools** | `VS Code`, `Git & GitHub`                                                                                   |

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   **Node.js** (v16 or later)
*   **npm** (Node Package Manager)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/local-service-marketplace.git
    cd local-service-marketplace
    ```

2.  **Setup the Backend (JSON Server):**
    *   Navigate to the backend directory:
        ```bash
        cd backend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Start the backend server (runs on `http://localhost:5000`):
        ```bash
        npm start
        ```
    *   The server will use the `db.json` file as a mock database.

3.  **Setup the Frontend (React App):**
    *   Open a **new terminal** and navigate to the frontend directory:
        ```bash
        cd frontend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Install the charting library:
        ```bash
        npm install chart.js react-chartjs-2
        ```
    *   Start the frontend development server (runs on `http://localhost:3000`):
        ```bash
        npm start
        ```

4.  **Open the application** by visiting `http://localhost:3000` in your web browser.

### 🧪 Demo Credentials

You can use these pre-configured accounts from `db.json` to test different roles:

*   **Admin:**
    *   **Email:** `admin@gmail.com`
    *   **Password:** `admin123`
*   **Worker:**
    *   **Email:** `raju@gmail.com`
    *   **Password:** `123456`
*   **Customer:**
    *   **Email:** `amit@gmail.com`
    *   **Password:** `123456`

---

## 📁 Folder Structure
