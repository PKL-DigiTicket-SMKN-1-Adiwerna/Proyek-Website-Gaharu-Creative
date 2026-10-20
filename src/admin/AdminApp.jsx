import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout.jsx";
import AdminGuard from "./AdminGuard.jsx";
import AdminLoginPage from "./AdminLoginPage.jsx";
import AdminDashboardPage from "./AdminDashboardPage.jsx";
import AdminServicesPage from "./AdminServicesPage.jsx";
import AdminInquiriesPage from "./AdminInquiriesPage.jsx";
import AdminPortfolioPage from "./AdminPortfolioPage.jsx";
import AdminArticlesPage from "./AdminArticlesPage.jsx";
import AdminSiteSettingsPage from "./AdminSiteSettingsPage.jsx";
import AdminAboutPage from "./AdminAboutPage.jsx";
import AdminStatsPage from "./AdminStatsPage.jsx";

export default function AdminApp() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<AdminGuard />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/services" element={<AdminServicesPage />} />
          <Route path="/admin/inquiries" element={<AdminInquiriesPage />} />
          <Route path="/admin/portfolio" element={<AdminPortfolioPage />} />
          <Route path="/admin/articles" element={<AdminArticlesPage />} />
          <Route path="/admin/site" element={<AdminSiteSettingsPage />} />
          <Route path="/admin/about" element={<AdminAboutPage />} />
          <Route path="/admin/stats" element={<AdminStatsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
