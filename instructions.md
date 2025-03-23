# Assignment: Mini Expense Tracker with Intelligent Insights

You are tasked with creating a **Mini Expense Tracker** application. The app will allow users to authenticate securely, manage expenses, and receive insights about their spending patterns.

## Tech Stack
- **Frontend**: ReactJS
- **Backend**: Python or NodeJS
- **Database**: MongoDB or PostgreSQL using ORMs (Mongoose for MongoDB or Sequelize for PostgreSQL)

## Requirements

### 1. Authentication (MUST MEET REQUIREMENT)
- Implement **JWT-based authentication** with **HTTP-only cookies**.
- Users should be able to:
  - **Register** with first name, last name, email, and password.
  - **Log in** to receive a secure token.
  - **Log out** (invalidate the token).
- Handle **token expiry** gracefully, including **refresh tokens**.

### 2. Expense Management (CRUD)
- Allow users to:
  - **Add**, **update**, **delete**, and **view** expenses.
- Each expense must include:
  - **Amount** (numeric, required).
  - **Category** (e.g., Food, Travel, etc.).
  - **Date** (required).
  - **Description** (optional).
- Expenses should be **paginated** and **filterable** by **date range** and **category**.

### 3. Spending Insights
- Implement an endpoint that calculates:
  - **Total spending per category**.
  - **Percentage distribution** of expenses across categories.
- Use the insights to display:
  - A **bar chart or pie chart** on the frontend visualizing category-wise spending.
- Backend logic should handle **large datasets** efficiently.

### 4. Frontend Requirements (ReactJS)
- Build the following pages:
  1. **Login/Registration**: Securely handle JWT (via HTTP-only cookies).
  2. **Dashboard**:
     - Show a **list of expenses** (with pagination and filters).
     - Display the **spending insights chart**.
  3. **Add/Edit Expense**: A simple form for creating or editing expenses.
  4. **Delete Expense**: Ability to delete an expense which is added by mistake or is duplicated.

## Deliverables
- A **deployed app** (e.g., AWS, Vercel, Heroku, or any other platform you are familiar with).
- A **GitHub repository** with:
  - A clear **README** explaining:
    - The approach taken.
  - Brief documentation for:
    - **JWT implementation**
    - **Expense management**
    - **Spending insights endpoint**

## Evaluation Criteria
- **Code Quality**: Clean, modular, and well-documented.
- **Problem-Solving**: Efficient insights logic and smooth integration of features.
- **Frontend Skills**: Clean UI/UX, responsiveness, and React best practices.
- **Backend Skills**: Secure JWT handling, efficient API design, and pagination logic.
- **Database Design**: Logical schema design and query optimization.

## Timeline
- **2 days** to complete the assignment.

