import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { SessionMonitor } from './components/auth/SessionMonitor';
import { AuthProvider } from './contexts/AuthContext';
import { QuizProvider } from './contexts/QuizContext';
import { FlashcardProvider } from './contexts/FlashcardContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SimpleFooter } from './components/layout/SimpleFooter';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { QuizzesPage } from './pages/QuizzesPage';
import { QuizPage } from './pages/QuizPage';
import { PricingPage } from './pages/PricingPage';
import { PracticeExamsPage } from './pages/PracticeExamsPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { StudyPlansPage } from './pages/StudyPlansPage';
import { StudyNotesPage } from './pages/StudyNotesPage';
import { AccountPage } from './pages/AccountPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CheckoutSuccessPage } from './pages/CheckoutSuccessPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CartProvider } from './contexts/CartContext';

// Component to determine which footer to show
const AppContent: React.FC = () => {
  const location = useLocation();
  
  // Define public routes that should show the full footer
  const publicRoutes = ['/', '/login', '/pricing', '/about', '/contact', '/privacy', '/terms'];
  const isPublicRoute = publicRoutes.includes(location.pathname);
  
  // Determine header variant based on route
  const headerVariant = location.pathname === '/' ? 'dark' : 'default';
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScrollToTop />
      <Header variant={headerVariant} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          
          {/* Routes protégées - Accès payant requis */}
          <Route path="/dashboard" element={
            <ProtectedRoute requiresAccess={true}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/quizzes" element={
            <ProtectedRoute requiresAccess={true}>
              <QuizzesPage />
            </ProtectedRoute>
          } />
          <Route path="/quiz/:quizId" element={
            <ProtectedRoute requiresAccess={true}>
              <QuizPage />
            </ProtectedRoute>
          } />
          <Route path="/practice-exams" element={
            <ProtectedRoute requiresAccess={true}>
              <PracticeExamsPage />
            </ProtectedRoute>
          } />
          <Route path="/flashcards" element={
            <ProtectedRoute requiresAccess={true}>
              <FlashcardsPage />
            </ProtectedRoute>
          } />
          <Route path="/study-plans" element={
            <ProtectedRoute requiresAccess={true}>
              <StudyPlansPage />
            </ProtectedRoute>
          } />
          <Route path="/study-notes" element={
            <ProtectedRoute requiresAccess={true}>
              <StudyNotesPage />
            </ProtectedRoute>
          } />
          
          <Route path="/account" element={
            <ProtectedRoute requiresAccess={true}>
              <AccountPage />
            </ProtectedRoute>
          } />
          
          {/* Route admin - Accès admin requis */}
          <Route path="/admin" element={
            <ProtectedRoute requiresAccess={true} requiresAdmin={true}>
              <AdminPage />
            </ProtectedRoute>
          } />
          
          {/* Placeholder routes for future features */}
          <Route path="/ai-tutor" element={
            <ProtectedRoute requiresAccess={true}>
              <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 text-center">
                  <h1 className="text-3xl font-bold text-[#3b3b3b]">Tuteur Virtuel - Bientôt disponible !</h1>
                </div>
              </div>
            </ProtectedRoute>
          } />
          
          {/* 404 - Catch all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {isPublicRoute ? <Footer /> : <SimpleFooter />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <FlashcardProvider>
          <CartProvider>
            <Router>
              <SessionMonitor />
              <AppContent />
            </Router>
          </CartProvider>
        </FlashcardProvider>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;