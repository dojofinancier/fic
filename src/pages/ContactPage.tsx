import React from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#3b3b3b] mb-4">Contact</h1>
            <p className="text-xl text-gray-600">
              Nous sommes là pour vous aider
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-6">Informations de Contact</h2>
                
                <div className="flex items-start space-x-3">
                    <div>
                      <p className="text-gray-600 mb-4">Le courriel est le moyen le plus rapide de nous contacter. Veuillez noter que nous recevons un grand nombre de courriels mais nous tâchons de répondre à tous en 48h.</p>
                    </div>
                  </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-[#10ac69] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[#3b3b3b]">Email</h3>
                      <p className="text-gray-600">salut@dojofinancier.com</p>
                    </div>
                  </div>               
                  
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-[#10ac69] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[#3b3b3b]">Heures d'ouverture</h3>
                      <p className="text-gray-600">
                        24h sur 24, 7 jours sur 7, 365 jours sur 365.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-6">Support Technique</h2>
                <p className="text-gray-700 mb-4">
                  Besoin d'aide avec la plateforme ou avez-vous des questions techniques ?
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Support par email: support@dojofinancier.com</p>
                  <p>• Temps de réponse: 24-48 heures</p>
                  <p>• Support en français et en anglais</p>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-6">Envoyez-nous un message</h2>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10ac69] focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="general">Question générale</option>
                    <option value="technical">Support technique</option>
                    <option value="billing">Facturation</option>
                    <option value="partnership">Partenariat</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10ac69] focus:border-transparent"
                    placeholder="Votre message..."
                    required
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full">
                  Envoyer le message
                </Button>
              </form>
            </Card>
          </div>
                 </div>
       </main>
     </div>
   );
 };
