import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { QuizProvider } from './contexts/QuizContext';
import { FlashcardProvider } from './contexts/FlashcardContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
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
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CheckoutSuccessPage } from './pages/CheckoutSuccessPage';
import { AdminPage } from './pages/AdminPage';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <FlashcardProvider>
          <CartProvider>
            <Router>
              <div className="min-h-screen bg-white flex flex-col">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
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
                            <h1 className="text-3xl font-bold text-[#3b3b3b]">Tuteur IA - Bientôt disponible !</h1>
                          </div>
                        </div>
                      </ProtectedRoute>
                    } />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </CartProvider>
        </FlashcardProvider>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;