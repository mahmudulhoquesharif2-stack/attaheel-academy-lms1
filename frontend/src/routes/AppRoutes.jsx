import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import StudentDashboard from "../pages/Dashboard/StudentDashboard";

import ProtectedRoute from "../components/route-protection/ProtectedRoute";
import RoleProtectedRoute from "../components/route-protection/RoleProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;