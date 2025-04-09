import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import PrivateRoute from "./routes/PrivateRoute"
import PostsPage from "./pages/PostsPage"
import PostFormPage from "./pages/PostFormPage"

const App = () => {
  return (
    <Routes>
      <Route
        path="/posts"
        element={
          <PrivateRoute>
            <PostsPage />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/posts/:id"
        element={
          <PrivateRoute>
            <PostFormPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/posts/add"
        element={
          <PrivateRoute>
            <PostFormPage />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default App
