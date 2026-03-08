# 🎬 MoviX — Full Stack Movie CRUD Application

A modern, full-stack movie management web application built with **React**, **Redux Toolkit**, **Express.js**, and **MongoDB Atlas**. Add, view, edit, and delete movies with a sleek dark-themed UI powered by **Tailwind CSS**.

---

## 🖥️ Live Preview

> Run locally — see setup instructions below.

---

## ✨ Features

- ✅ **Full CRUD** — Create, Read, Update, Delete movies
- ✅ **MongoDB Atlas** — Cloud database with persistent storage
- ✅ **Redux Toolkit** — Centralized state management with async thunks
- ✅ **REST API** — Express.js backend with clean route structure
- ✅ **Tailwind CSS** — Responsive dark-themed UI with smooth transitions
- ✅ **React Router** — Client-side navigation
- ✅ **Toast Notifications** — Real-time feedback on all actions
- ✅ **Movie Poster Support** — Image URL or auto-generated placeholder

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React 19, Vite, Tailwind CSS         |
| State      | Redux Toolkit, React-Redux           |
| Routing    | React Router DOM v6                  |
| HTTP       | Axios                                |
| Backend    | Node.js, Express.js                  |
| Database   | MongoDB Atlas (Mongoose ODM)         |
| Dev Tools  | Nodemon, Concurrently                |
| Icons      | React Icons                          |
| Notify     | React Toastify                       |

---

## 📁 Project Structure

```
movix/
├── server/
│   ├── index.js              # Express server + MongoDB connection
│   ├── models/
│   │   └── Movie.js          # Mongoose Movie schema
│   └── routes/
│       └── movieRoutes.js    # CRUD API routes
│
├── src/
│   ├── main.jsx              # App entry point (Redux Provider)
│   ├── App.jsx               # Routes setup
│   ├── index.css             # Tailwind CSS import
│   ├── store/
│   │   ├── store.js          # Redux store configuration
│   │   └── movieSlice.js     # Movie slice (thunks + reducers)
│   └── components/
│       ├── Navbar.jsx        # Top navigation bar
│       ├── MovieList.jsx     # Movies grid with delete
│       ├── MovieCard.jsx     # Individual movie card
│       └── MovieForm.jsx     # Add / Edit movie form
│
├── .env                      # Environment variables (MongoDB URI)
├── package.json
└── vite.config.js
```

---

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api/movies`

| Method   | Endpoint      | Description          |
|----------|---------------|----------------------|
| `GET`    | `/`           | Get all movies       |
| `GET`    | `/:id`        | Get single movie     |
| `POST`   | `/`           | Create new movie     |
| `PUT`    | `/:id`        | Update a movie       |
| `DELETE` | `/:id`        | Delete a movie       |

---

## 📦 Movie Schema

```js
{
  title:       String   // required
  description: String   // required
  year:        Number   // required
  genre:       String   // required
  rating:      Number   // 0–10, default: 0
  image:       String   // optional poster URL
  createdAt:   Date     // auto
  updatedAt:   Date     // auto
}
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd movix
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=5000
```

> **Note:** Make sure your IP address is whitelisted in MongoDB Atlas under  
> **Network Access → Add IP Address**.

### 4. Run the application

```bash
# Run both frontend and backend together
npm run start

# Or run separately:
npm run dev       # Frontend only (Vite)
npm run server    # Backend only (Nodemon)
```

### 5. Open in browser

```
Frontend:  http://localhost:5173
Backend:   http://localhost:5000
```

---

## 🔧 Available Scripts

| Script          | Description                              |
|-----------------|------------------------------------------|
| `npm run start` | Run frontend + backend simultaneously   |
| `npm run dev`   | Start Vite frontend dev server           |
| `npm run server`| Start Express backend with nodemon       |
| `npm run build` | Build frontend for production            |
| `npm run lint`  | Run ESLint                               |

---

## 🐛 Troubleshooting

### MongoDB connection error: `querySrv ECONNREFUSED`

This means your system DNS cannot resolve MongoDB Atlas SRV records.

**Fix applied in this project:** The server uses `dns.setServers(["8.8.8.8", "8.8.4.4"])` to force Google DNS.

Additional steps:
1. **Whitelist your IP** in MongoDB Atlas → Network Access
2. **Check your internet connection**
3. Try using a **mobile hotspot** if on a restricted network (school/office)

---

## 📸 Screenshots

| Page        | Description                              |
|-------------|------------------------------------------|
| Home        | Movie grid with edit/delete on hover     |
| Add Movie   | Form to add a new movie                  |
| Edit Movie  | Pre-filled form to update movie details  |

---

## 👨‍💻 Author

**Muhammad Taha Zahid**  
Full Stack Developer

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
