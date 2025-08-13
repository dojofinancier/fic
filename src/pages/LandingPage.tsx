import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { 
  BookOpen, 
  Clock, 
  Brain, 
  MessageCircle, 
  Calendar, 
  FileText,
  CheckCircle,
  Star,
  Users,
  Trophy,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/pricing');
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Quiz par chapitre',
      description: 'Quiz interactifs pour chaque chapitre afin de tester votre compréhension et renforcer l\'apprentissage.'
    },
    {
      icon: Clock,
      title: 'Examens pratiques',
      description: 'Simulez l\'environnement d\'examen réel avec des tests pratiques chronométrés pour améliorer votre gestion du temps.'
    },
    {
      icon: Brain,
      title: 'Cartes mémoire (flashcards)',
      description: 'Cartes recto-verso avec questions et explications détaillées pour une mémorisation efficace.'
    },
    {
      icon: MessageCircle,
      title: 'Tutorat Virtuel',
      description: 'Obtenez de l\'aide instantanée et des explications de notre tuteur virtuel, disponible 24h/24 et 7j/7.'
    },
    {
      icon: Calendar,
      title: 'Plans d\'étude',
      description: 'Plans d\'étude personnalisables et téléchargeables pour vous garder organisé et sur la bonne voie.'
    },
    {
      icon: FileText,
      title: 'Notes d\'étude',
      description: 'Notes d\'étude courtes et concises pour vous aider à réviser le matériel.'
    }
  ];

  const benefits = [
    'Préparation complète à l\'examen FIC',
    'Outils d\'apprentissage interactifs',
    'Support de tutorat 24/7',
    'Suivi des progrès et analyses',
    'Accès d\'un an à tout le matériel',
    'Plateforme compatible mobile'
  ];

  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Conseillère financière',
      content: 'Le Dojo Financier m\'a aidée à réussir l\'examen FIC du premier coup. Les examens pratiques étaient incroyablement réalistes !',
      rating: 5
    },
    {
      name: 'Jean Tremblay',
      role: 'Consultant en investissement',
      content: 'La fonction de tutorat virtuel a tout changé. Avoir des explications instantanées disponibles a rendu l\'étude beaucoup plus efficace.',
      rating: 5
    },
    {
      name: 'Sophie Lavoie',
      role: 'Gestionnaire de portefeuille',
      content: 'Les plans d\'étude m\'ont gardée organisée et motivée. Je me sentais complètement préparée pour l\'examen réel.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#10ac69] to-[#0e9558] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Maîtrisez l'examen Fonds d'investissement au Canada (FIC)
                <span className="block text-white/90"></span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                Plateforme d'apprentissage complète conçue spécifiquement pour le succès à l'examen FIC du CSI. 
                Quiz interactifs, examens pratiques, tutorat virtuel et méthodes d'étude éprouvées.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={handleGetStarted}>
                  Commencez votre parcours
                </Button>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[#10ac69]">
                    Me connecter
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 bg-white/10 backdrop-blur border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                  <span className="text-xl font-semibold">Taux de réussite à l'examen</span>
                </div>
                <div className="text-4xl font-bold mb-2">94%</div>
                <p className="text-white/80">de nos étudiants réussissent l'examen FIC à leur première tentative</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#3b3b3b] mb-4">
              Tout ce dont vous avez besoin pour réussir
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre plateforme complète fournit tous les outils et ressources dont vous avez besoin pour maîtriser le matériel d'examen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover className="text-center">
                <feature.icon className="h-12 w-12 text-[#10ac69] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#3b3b3b] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#3b3b3b] mb-6">
                Pourquoi choisir Le Dojo Financier?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Nous avons conçu notre plateforme spécifiquement pour les candidats à l'examen des fonds d'investissement au Canada (FIC) offert par le CSI, 
                en utilisant nos 15 ans d'expérience dans la formation financière.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#10ac69] flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <Card className="p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-[#10ac69] mb-2">1000+</div>
                    <div className="text-gray-600">Questions pratiques</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#10ac69] mb-2">2</div>
                    <div className="text-gray-600">Examens pratiques</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#10ac69] mb-2">24/7</div>
                    <div className="text-gray-600">Support virtuel</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#10ac69] mb-2">92%</div>
                    <div className="text-gray-600">Taux de réussite</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#3b3b3b] mb-4">
              Ce que disent nos étudiants
            </h2>
            <p className="text-xl text-gray-600">
              Rejoignez des centaines de candidats FIC qui ont réussi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-[#3b3b3b]">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#10ac69]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Prêt à réussir votre examen?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Rejoignez des centaines de candidats qui ont choisi Le Dojo Financier pour leur préparation d'examen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={handleGetStarted}>
              Commencez aujourd'hui
            </Button>
            <div className="flex items-center justify-center space-x-2 text-white/90">
              <Users className="h-5 w-5" />
              <span>Rejoignez plus de 500 étudiants qui ont réussi</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};