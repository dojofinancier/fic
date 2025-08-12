import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, ArrowRight, Download, BookOpen } from 'lucide-react';

export const CheckoutSuccessPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Rediriger vers le dashboard après 3 secondes
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <Card className="text-center py-12 mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-[#3b3b3b] mb-4">
            Paiement réussi !
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Félicitations ! Vous avez maintenant accès complet au Dojo Financier.
          </p>
          <p className="text-gray-600">
            Un courriel de confirmation a été envoyé à <strong>{user?.email}</strong>
          </p>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-[#3b3b3b] mb-6">Prochaines étapes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-[#10ac69] text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-[#3b3b3b] mb-2">Accédez à votre tableau de bord</h3>
                <p className="text-gray-600 mb-3">
                  Explorez tous les outils d'apprentissage maintenant disponibles.
                </p>
                <Link to="/dashboard">
                  <Button size="sm">
                    Tableau de bord
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-[#10ac69] text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-[#3b3b3b] mb-2">Téléchargez votre plan d'étude</h3>
                <p className="text-gray-600 mb-3">
                  Choisissez un plan d'étude personnalisé pour votre préparation.
                </p>
                <Link to="/study-plans">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Plans d'étude
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-[#10ac69] text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-[#3b3b3b] mb-2">Commencez par les quiz</h3>
                <p className="text-gray-600 mb-3">
                  Testez vos connaissances avec nos quiz interactifs par chapitre.
                </p>
                <Link to="/quizzes">
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Quiz
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-[#10ac69] text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-[#3b3b3b] mb-2">Explorez les cartes mémoire</h3>
                <p className="text-gray-600 mb-3">
                  Mémorisez efficacement les concepts clés avec nos cartes interactives.
                </p>
                <Link to="/flashcards">
                  <Button variant="outline" size="sm">
                    Cartes mémoire
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* What's Included */}
        <Card>
          <h2 className="text-2xl font-bold text-[#3b3b3b] mb-6">Ce qui est inclus dans votre accès</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Quiz interactifs par chapitre',
              'Examens pratiques chronométrés',
              'Cartes mémoire intelligentes',
              'Plans d\'étude téléchargeables',
              'Notes d\'étude détaillées',
              'Suivi des progrès',
              'Support technique',
              'Accès mobile et desktop',
              'Mises à jour du contenu',
              'Garantie de remboursement 30 jours'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Support */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Besoin d'aide ? Notre équipe de support est là pour vous accompagner.
          </p>
          <p className="text-sm text-gray-500">
            Contactez-nous à <a href="mailto:support@ledojofinancier.com" className="text-[#10ac69] hover:underline">support@ledojofinancier.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};