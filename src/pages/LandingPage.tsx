import React, { useEffect, useRef } from 'react';
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

// Background gradient component
const GradientBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Main solid background */}
    <div className="absolute inset-0 bg-[#063D3A]"></div>
    
    {/* Blurred ellipse overlay */}
    <svg 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl opacity-70" 
      viewBox="0 0 1296 1121" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.8" filter="url(#filter0_f_22785_17842)">
        <ellipse 
          cx="648.057" 
          cy="561.489" 
          rx="534.167" 
          ry="124.945" 
          transform="rotate(48.4186 648.057 561.489)" 
          fill="#10ac69"
        />
      </g>
      <defs>
        <filter 
          id="filter0_f_22785_17842" 
          x="0.561768" 
          y="-127.447" 
          width="1294.99" 
          height="1377.87" 
          filterUnits="userSpaceOnUse" 
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
          <feGaussianBlur stdDeviation="140.388" result="effect1_foregroundBlur_22785_17842"></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  </div>
);

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const phoneRef = useRef<HTMLDivElement>(null);
  
  const handleGetStarted = () => {
    navigate('/pricing');
  };

  // Simple floating animation for iPhone
  useEffect(() => {
    const phone = phoneRef.current;
    if (!phone) return;

    // Add a subtle floating animation
    const img = phone.querySelector('.hero-img') as HTMLElement;
    if (img) {
      img.style.animation = 'phoneFloat 6s ease-in-out infinite';
    }
  }, []);

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
            'Préparation complète à l\'examen FIC®',
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
              content: 'Le Dojo Financier m\'a aidée à réussir l\'examen FIC® du premier coup. Les examens pratiques étaient incroyablement réalistes !',
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
      <section className="relative text-white py-20 lg:py-32 overflow-hidden">
        <GradientBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 drop-shadow-lg">
              Maîtrisez l'examen du
              <br />
              <span className="text-[#10ac69]">FIC®</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Réussissez l'examen de fonds d'investissement au Canada (FIC®) du premier coup grâce à une préparation complète et efficace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={handleGetStarted}>
                Commencez votre parcours
              </Button>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[#063D3A]">
                  Me connecter
                </Button>
              </Link>
            </div>
            
            {/* Animated iPhone Mockup */}
            <div className="w-full max-w-5xl mx-auto">
              <div className="hero-img-container relative">
                {/* Feature Screenshot - Quiz */}
                <div className="feature-screenshot quiz-screenshot absolute top-4 -right-20 w-[300px] h-auto hidden lg:block">
                  <img 
                    src="/quiz.JPG" 
                    alt="FIC® Quiz Interface" 
                    className="w-full h-auto object-cover rounded-2xl shadow-2xl border-2 border-white/20"
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 -right-24 text-center">
                    <p className="text-white font-bold text-base bg-black/40 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg whitespace-nowrap">
                      Apprentissage guidé avec un tuteur virtuel
                    </p>
                  </div>
                </div>
                
                {/* Feature Screenshot - Flashcards */}
                <div className="feature-screenshot flashcards-screenshot absolute bottom-16 right-8 w-[150px] h-[324px] hidden lg:block">
                  <img 
                    src="/iphone-flashcard.JPG" 
                    alt="FIC® Flashcards" 
                    className="w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-white/20"
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 -right-24 text-center">
                    <p className="text-white font-bold text-base bg-black/40 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg whitespace-nowrap">
                      Cartes mémoire (flashcards)
                    </p>
                  </div>
                </div>
                
                {/* Feature Screenshot - Notes */}
                <div className="feature-screenshot notes-screenshot absolute bottom-4 -left-20 w-[300px] h-auto hidden lg:block">
                  <img 
                    src="/notes.JPG" 
                    alt="FIC® Study Notes" 
                    className="w-full h-auto object-cover rounded-2xl shadow-2xl border-2 border-white/20"
                  />
                                    <div className="absolute top-1/2 -translate-y-1/2 -left-24 text-center">
                    <p className="text-white font-bold text-base bg-black/40 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg whitespace-nowrap">
                      Notes d'étude détaillées
                    </p>
                  </div>
                </div>
                
                {/* Feature Screenshot - Study Plans */}
                <div className="feature-screenshot plans-screenshot absolute top-4 left-8 w-[150px] h-[324px] hidden lg:block">
                  <img 
                    src="/iphone-plans.JPG" 
                    alt="FIC® Study Plans" 
                    className="w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-white/20"
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 -left-24 text-center">
                    <p className="text-white font-bold text-base bg-black/40 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg whitespace-nowrap">
                    <span className="block">Plans d'étude personnalisés</span>
                    <span className="block">pour 6, 8 et 12 semaines</span>
                    </p>
                  </div>
                </div>
                
                {/* Main iPhone Mockup */}
                <div className="hero-image-wrapper relative mx-auto w-full max-w-sm lg:max-w-lg" ref={phoneRef}>
                  <img 
                    src="/iphone-dash.png" 
                    alt="FIC® Study Platform Dashboard" 
                    className="hero-img w-full h-auto drop-shadow-2xl"
                    style={{
                      transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(5deg) rotateY(-8deg) rotateZ(0deg)',
                      transformStyle: 'preserve-3d',
                      willChange: 'transform'
                    }}
                  />
                  {/* 3D Shadow Effect */}
                  <div 
                    className="_3d-shade absolute inset-0 bg-black/20 rounded-3xl blur-xl -z-10"
                    style={{
                      transform: 'translate3d(2.499px, 2.499px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
                      transformStyle: 'preserve-3d'
                    }}
                  ></div>
                </div>
                
                {/* Mobile Subtitles - Equally Spaced with Alternating Alignment */}
                <div className="lg:hidden">
                  {/* Plans - Top row, left aligned */}
                  <div className="absolute top-9 left-4 z-10">
                    <p className="text-white font-bold text-base bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                      Plans d'étude personnalisés
                    </p>
                  </div>
                  
                  {/* Quiz - Second row, right aligned */}
                  <div className="absolute top-1/3 right-4 z-10">
                    <p className="text-white font-bold text-base bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                      Tuteur Virtuel
                    </p>
                  </div>
                  
                  {/* Flashcards - Third row, left aligned */}
                  <div className="absolute top-2/3 left-4 z-10">
                    <p className="text-white font-bold text-base bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                      Stratégies d'étude
                    </p>
                  </div>
                  
                  {/* Notes - Bottom row, right aligned */}
                  <div className="absolute bottom-6 right-4 z-10">
                    <p className="text-white font-bold text-base bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                      Notes d'étude détaillées
                    </p>
                  </div>
                </div>
              </div>
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
                Nous avons conçu notre plateforme spécifiquement pour les candidats à l'examen des fonds d'investissement au Canada (FIC®) offert par le CSI, 
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
              Rejoignez des centaines de candidats FIC® qui ont réussi
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
              <span>Rejoignez plus de 850 étudiants qui ont réussi</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};