# 📰 Global News Pulse (News Board)

Global News Pulse is a dynamic, single-page application (SPA) designed to combine real-time global news headlines with financial data (Forex charts). Built with a focus on clean, modern design and performant front-end architecture, it provides users with a comprehensive view of global events and their correlation with market movements.

---

## ✨ Features

* **📰 Global News Feed:** Fetches and displays the latest English-language news headlines using the MediaStack API.
* **📊 Dynamic Forex Chart:** Renders historical exchange rate data (USD to EUR by default) using the Frankfurter API and Chart.js to visualize market trends.
* **🧩 Component-Based Views:** Uses vanilla JavaScript for client-side routing and template loading to simulate a fast, modern Single Page Application (SPA) experience.
* **📱 Responsive & Modern UI:** Styled using Tailwind CSS for a professional, mobile-first, and maintainable user interface.
* **🌐 Active Navigation:** Navigation links are dynamically highlighted based on the current page path, providing clear user context.
* **🗄️ Form Handling:** Includes front-end logic for newsletter subscription and lead reporting, storing data in the browser's `localStorage`.

---

## 🛠️ Technology Stack

This project is built using a modern, efficient frontend stack:

| Component | Technology / Library | Role |
| :--- | :--- | :--- |
| **Build Tool** | **Vite** | Modern, fast development server and build tool. |
| **Styling** | **Tailwind CSS v4** | Utility-first CSS framework for rapid and responsive UI development. |
| **Charting** | **Chart.js** | Used for drawing the dynamic, responsive Forex line charts. |
| **Mobile UX** | **@tailwindplus/elements** | Provides the necessary JavaScript logic for interactive components like the mobile navigation dropdown (`<el-disclosure>`). |
| **Routing** | **Vanilla JavaScript (History API)** | Handles seamless navigation without full page reloads. |

---

## 🚀 Getting Started

### Prerequisites

1.  **Node.js**: Ensure you have Node.js installed (version >= 18 is recommended based on project dependencies).
2.  **API Key**: You need a MediaStack API key.

### Setup Instructions

1.  **Clone the Repository:**
    ```bash
    git clone [Your Repository URL]
    cd newsboard
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure API Key:**
    Create a file named **`.env`** in the root directory of the project. Add your MediaStack API key to this file:
    ```
    VITE_NEWS_API_KEY="YOUR_MEDIASTACK_API_KEY_HERE"
    ```
    *(The application uses `import.meta.env.VITE_NEWS_API_KEY` to securely access this key in the `newsAPI.js` module.)*

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    The application will open in your browser, typically at `http://localhost:5173/`.

### Deployment

This project uses the `gh-pages` package for easy deployment to GitHub Pages.

To deploy, run:

```bash
npm run deploy