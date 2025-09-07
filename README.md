# Giftify - Gift Shop Application

A beautiful and modern gift shop application built with React, Redux Toolkit, and Tailwind CSS.It securely built with OIDC.
Authentication is developed using Asgardeo IDP and also at secure from the vulnerabilities like CSRF,XSS and SQL injection.
## Features

- 🎁 Browse beautiful gift items
- 🛒 Add items to cart
- 👤 User authentication (login/register)
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔄 State management with Redux Toolkit

## Tech Stack

- **Frontend**: React 18
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)

### Installation

1. **Navigate to the frontend directory**:

   ```bash
   cd Gift-shop/frontend
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   pnpm add react
   pnpm add @asgardeo/auth-react
   pnpm add react-router-dom
   pnpm add -D tailwindcss postcss autoprefixer
   pnpm exec tailwindcss init -p
3. **Navigate to the backendtend directory**:

   ```bash
   cd Gift-shop/backend
   ```

2. **Install dependencies**:
   ```bash
   pnpm init
   pnpm add express
   pnpm add cors
   pnpm add @asgardeo/oidc-node
   ppnpm add dotenv
   pnpm add -D nodemon


   ```

### Running the Application

1. **Start the development server**:

   ```bash
   pnpm run dev
   pnpm run start
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

### Building for Production

```bash
pnpm run build
```

This will create a `dist` folder in the frontend directory with the production build.

## Project Structure

```
Gift-shop/
├── backend/
│   ├── confic/
│   │   |──config.js
│   │   │──default.json 
│   │   
│   │── middleware/   
│   │   │──auth.js
│   │   │──security.js
│   │── models/    
│   │   ├── order.js
│   │   │──products.js           
│   │   ├── User.js               
│   │──nodemodules               
│   │──routes/           
│   │   │──index.js
│   │   │──order.js
│   │   │──products.js
│   │   │──users.js
│   │──views
│   │   │──error.ejs
│   │   │──index.ejs
│   │──.env        
│   ├── package-lock.json                
│   ├── package.js
│   └── server.js
|
|
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthContext.js      
│   │   │   ├── CartContext.js     
│   │   │   ├── GiftItem.js         
│   │   │   ├── Navbar.js           
│   │   │   │── ProductModal.js     
│   │   ├   │── CartDrawer.jsx
│   │   │   │── PurchaseForm.jsx     
│   │   ├   │── userProfile.jsx      
│   │   ├── pages/     
│   │   ├    │── Home.jsx         
│   │   ├──App.jsx 
│   │   └── index.css           
│   ├   |──main.jsx         
│   ├   |──productSlice.js
│   └   |──store.js
|   |   |──tailwind.css    
└   |──index.html
|   |──package.json
|   |──package-lock.json
|   |──postcss.config.cjs
|──README.me
```

## Features Explained

### Authentication

- Used Asgardeo IDP
- login and logout functionality
- User session management

### Shopping Cart

- Add items to cart
- View cart contents
- Cart count display in navbar
- checout the order by filling the purchase form according to their wish

### Product Management

- Browse gift items with images and descriptions
- Click items to view details in modal
- Quantity selection in product modal
- Redux state management for product selection

### UI/UX

- Responsive design that works on all devices
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Modern card-based layout
- Interactive hover effects

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run lint` - Run ESLint
- `pnpm run preview` - Preview production build

