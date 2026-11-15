import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// Lazy-load private, restricted, and auth routes to keep public page bundles lean and fast
const CourseContent = lazy(() => import('./pages/CourseContent'));
const Profile = lazy(() => import('./pages/Profile'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Admin = lazy(() => import('./pages/Admin'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const MsaClass7 = lazy(() => import('./pages/MsaClass7'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RouteLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" aria-label="Loading page" />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteLoader />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/course-content" 
            element={
              <ProtectedRoute>
                <CourseContent />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/course/:id" 
            element={
              <ProtectedRoute>
                <CourseContent />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="/about" element={<About />} />
          <Route 
            path="/resources/msa-class-7" 
            element={
              <ProtectedRoute requiredRole="aeen">
                <MsaClass7 />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/practice/msa-class-7" 
            element={
              <ProtectedRoute requiredRole="aeen">
                <MsaClass7 />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/msa-class-7" 
            element={
              <ProtectedRoute requiredRole="aeen">
                <MsaClass7 />
              </ProtectedRoute>
            } 
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}
