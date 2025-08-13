import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { CheckCircle, Star, Users } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleGetStarted = (productId: string, name: string, price: number) => {
    // Ajouter le produit au panier
    addItem({
      id: productId,
      name: name,
      description: productId === 'full-access' 
        ? 'Accès complet à tous les outils d\'apprentissage FIC'
        : 'Accès complet + 6h de coaching privé avec un professionnel',
      price: price,
      quantity: 1
    });
    
    // Rediriger vers le panier
    navigate('/cart');
  };

  const features = [
    'Matériel d\'examen FIC complet',
    'Quiz interactifs par chapitre',
    'Examens pratiques chronométrés',
    'Système de cartes mémoire intelligent',
    'Support de tutorat IA 24h/24 et 7j/7',
    'Plans d\'étude téléchargeables',
    'Suivi des progrès et analyses',
    'Plateforme compatible mobile',
    'Résumés de chapitres',
    'Aperçus de performance',
    'Garantie d\'accès d\'un an',
    'Garantie de remboursement'
  ];

  const coachingFeatures = [
    'Tout ce qui est inclus dans le plan de base',
    '6 heures de coaching privé en ligne',
    'Sessions personnalisées selon vos besoins',
    'Accompagnement par un professionnel certifié',
    'Planification de sessions flexibles',
    'Support par email entre les sessions'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#3b3b3b] mb-4">
            Choisissez votre plan d'apprentissage
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour réussir l'examen FIC avec confiance. 
            Rejoignez des milliers de candidats qui ont réussi.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          {/* Plan de base - Plus prominent */}
          <div className="lg:order-1">
            <Card className="text-center p-8 border-2 border-[#10ac69] relative h-full">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-[#10ac69] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Le plus populaire
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#3b3b3b] mb-2">Plan d'accès complet</h3>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600">(4,9/5 de 2 847 étudiants)</span>
                </div>
              </div>

              <div className="mb-8">
                <div className="text-5xl font-bold text-[#3b3b3b] mb-2">$197</div>
                <div className="text-gray-600">Paiement unique • Accès d'un an</div>
                <div className="text-sm text-green-600 font-medium mt-1">
                  Économisez 300 $ par rapport au tutorat individuel
                </div>
              </div>

              <Button size="lg" className="w-full mb-6">
                <button 
                  onClick={() => handleGetStarted('full-access', 'Plan d\'accès complet', 197)} 
                  className="w-full"
                >
                  Commencez maintenant
                </button>
              </Button>
              
              <div className="text-sm text-gray-600">
                Garantie de remboursement de 30 jours
              </div>
            </Card>
          </div>

          {/* Plan avec coaching */}
          <div className="lg:order-2">
            <Card className="text-center p-8 border border-gray-300 relative h-full">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Coaching inclus</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#3b3b3b] mb-2">Plan Premium + Coaching</h3>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600">(5,0/5 de 156 étudiants)</span>
                </div>
              </div>

              <div className="mb-8">
                <div className="text-5xl font-bold text-[#3b3b3b] mb-2">$627</div>
                <div className="text-gray-600">Paiement unique • Accès d'un an + 6h coaching</div>
                <div className="text-sm text-blue-600 font-medium mt-1">
                  Coaching privé avec un professionnel certifié
                </div>
              </div>

              <Button variant="outline" size="lg" className="w-full mb-6">
                <button 
                  onClick={() => handleGetStarted('premium-coaching', 'Plan Premium + Coaching', 627)} 
                  className="w-full"
                >
                  Choisir ce plan
                </button>
              </Button>
              
              <div className="text-sm text-gray-600">
                Garantie de remboursement de 30 jours
              </div>
            </Card>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Plan de base features */}
          <Card>
            <h3 className="text-xl font-bold text-[#3b3b3b] mb-6 text-center">
              Plan d'accès complet
            </h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#10ac69] flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Plan coaching features */}
          <Card>
            <h3 className="text-xl font-bold text-[#3b3b3b] mb-6 text-center">
              Plan Premium + Coaching
            </h3>
            <div className="space-y-4">
              {coachingFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <div className="text-3xl font-bold text-[#10ac69] mb-2">94%</div>
            <div className="text-gray-600">Taux de réussite</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-[#10ac69] mb-2">5 000+</div>
            <div className="text-gray-600">Étudiants qui ont réussi</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-[#10ac69] mb-2">4,9/5</div>
            <div className="text-gray-600">Évaluation des étudiants</div>
          </Card>
        </div>

        {/* FAQ */}
        <Card>
          <h3 className="text-xl font-bold text-[#3b3b3b] mb-6">Questions fréquemment posées</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-[#3b3b3b] mb-2">Combien de temps ai-je accès ?</h4>
              <p className="text-gray-600">Vous obtenez un accès complet pendant 1 an à partir de la date d'achat, ce qui est largement suffisant pour vous préparer et réussir votre examen FIC.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#3b3b3b] mb-2">Comment fonctionne le coaching privé ?</h4>
              <p className="text-gray-600">Après votre achat, nous vous contacterons par email pour planifier vos 6 heures de coaching. Les sessions se déroulent en ligne et sont personnalisées selon vos besoins spécifiques.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#3b3b3b] mb-2">Y a-t-il une garantie de remboursement ?</h4>
              <p className="text-gray-600">Oui ! Nous offrons une garantie de remboursement de 30 jours. Si vous n'êtes pas satisfait de la plateforme, nous rembourserons intégralement votre achat.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#3b3b3b] mb-2">Puis-je accéder à ceci sur des appareils mobiles ?</h4>
              <p className="text-gray-600">Absolument ! Notre plateforme est entièrement responsive et fonctionne parfaitement sur ordinateur de bureau, tablette et appareils mobiles.</p>
            </div>
          </div>
        </Card>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-[#3b3b3b] mb-4">
            Prêt à réussir votre examen FIC ?
          </h3>
          <p className="text-gray-600 mb-6">
            Rejoignez des milliers de candidats qui ont réussi et commencez votre parcours aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => handleGetStarted('full-access', 'Plan d\'accès complet', 197)}>
              Commencez maintenant - 197 $
            </Button>
            <Button variant="outline" size="lg" onClick={() => handleGetStarted('premium-coaching', 'Plan Premium + Coaching', 627)}>
              Plan Premium - 627 $
            </Button>
            <Link to="/login">
              <Button variant="ghost" size="lg">
                Vous avez déjà acheté ? Connexion
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};