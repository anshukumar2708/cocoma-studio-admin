import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Services from "./pages/admin/Services";
import Portfolio from "./pages/admin/Portfolio";
import Blog from "./pages/admin/Blog";
import Testimonials from "./pages/admin/Testimonials";
import Team from "./pages/admin/Team";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/services" element={<AdminLayout><Services /></AdminLayout>} />
          <Route path="/admin/portfolio" element={<AdminLayout><Portfolio /></AdminLayout>} />
          <Route path="/admin/blog" element={<AdminLayout><Blog /></AdminLayout>} />
          <Route path="/admin/testimonials" element={<AdminLayout><Testimonials /></AdminLayout>} />
          <Route path="/admin/team" element={<AdminLayout><Team /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><Settings /></AdminLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
