# Investment Returns Calculator

A modern and responsive web application built with React, Tailwind CSS & Chart.js that helps you forecast investment growth with compound interest, inflation-adjustment, multiple investments and visual charts.

---

## 🚀 Table of Contents  
- [Features](#features)  
- [Demo / Screenshots](#demo--screenshots)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running Locally](#running-locally)  
  - [Building for Production](#building-for-production)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Validation & UI Enhancements](#validation-&-ui-enhancements)  
- [Deployment](#deployment)  
- [Contributing](#contributing)  
- [License](#license)  

---

## 🎯 Features  
- Support for **multiple investments** (each with its own amount, annual interest rate, and compounding frequency: annually, quarterly, monthly).  
- Calculates growth using the formula:  
  \[
    \text{Future Value} = P \times \Bigl(1 + \frac{r}{m}\Bigr)^{\,m \times n}
  \]  
  where:  
    - \(P\) = principal amount  
    - \(r\) = annual interest rate (decimal)  
    - \(m\) = compounding frequency per year  
    - \(n\) = number of years  
- Adjusts results for **inflation** (real return calculation).  
- Displays results in a **table** (year-by-year breakdown for each investment + total inflation-adjusted).  
- Displays results in a **chart** using Chart.js, showing each investment trajectory and the total real value.  
- **Nicer input validation UI**: error highlighting, helpful tooltips on inputs.  
- **Responsive design**: built with Tailwind CSS to work well on mobile, tablet & desktop. Tables scroll horizontally on smaller screens.  
- Persists inputs and settings (currency symbol, investments list) in **localStorage** so the user’s data isn’t lost on reload.  
- Ability to choose **currency symbol** (₹, $, €, etc.) to format displayed values.  
- Built with a frontend-only stack (no backend), so you can deploy easily to platforms like Vercel or Netlify.

---

## 📸 Demo / Screenshots  
Add some screenshots or GIFs here to showcase the UI on desktop and mobile.  
*(e.g., table screenshot, chart screenshot, input UI screenshot)*

---

## 🧩 Getting Started  

### Prerequisites  
- Node.js (v14 or later recommended)  
- npm or yarn  
- A modern browser (Chrome, Firefox, Edge, Safari)  

### Installation  
```bash
# Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install dependencies
npm install
# or
yarn install
