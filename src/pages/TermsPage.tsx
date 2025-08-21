import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#3b3b3b] mb-4">Termes et Conditions</h1>
            <p className="text-xl text-gray-600">
              Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">1. Acceptation des termes</h2>
              <p className="text-gray-700 leading-relaxed">
                En utilisant la plateforme Le Dojo Financier, vous acceptez d'être lié par ces 
                termes et conditions. Si vous n'acceptez pas ces termes, veuillez ne pas utiliser 
                nos services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">2. Description du service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Le Dojo Financier fournit des services d'éducation en ligne, incluant :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Plans d'étude personnalisés</li>
                <li>Notes d'étude détaillées</li>
                <li>Quiz et examens pratiques</li>
                <li>Cartes mémoire interactives</li>
                <li>Ressources pédagogiques</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">3. Inscription et compte</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Pour utiliser nos services, vous devez créer un compte en fournissant des 
                  informations exactes et à jour.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Vous êtes responsable de maintenir la confidentialité de vos identifiants 
                  de connexion et de toutes les activités qui se produisent sous votre compte.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">4. Paiements et abonnements</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  L'accès à nos services premium nécessite un abonnement payant. Les prix sont 
                  affichés en dollars canadiens et peuvent être modifiés sans préavis.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Les paiements sont traités de manière sécurisée par nos prestataires de paiement. 
                  Vous autorisez Le Dojo Financier à facturer votre méthode de paiement pour 
                  les frais d'abonnement.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">5. Utilisation acceptable</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Vous vous engagez à utiliser nos services uniquement à des fins légales et 
                conformes à ces termes. Vous ne devez pas :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Partager votre compte avec d'autres personnes</li>
                <li>Tenter d'accéder de façon non autorisée à nos systèmes</li>
                <li>Utiliser nos services pour des activités frauduleuses</li>
                <li>Reproduire ou distribuer notre contenu sans autorisation</li>
                <li>Porter atteinte aux droits de propriété intellectuelle</li>
                <li>Utiliser nos services pour harceler ou intimider d'autres utilisateurs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">6. Propriété intellectuelle</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Tout le contenu de notre plateforme, y compris les textes, images, vidéos, 
                logiciels et autres matériels, est protégé par les droits d'auteur et autres 
                lois sur la propriété intellectuelle.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Vous recevez une licence limitée, non exclusive et non transférable pour 
                utiliser nos services à des fins personnelles uniquement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">7. Limitation de responsabilité</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Dans toute la mesure permise par la loi, Le Dojo Financier ne sera pas 
                responsable des dommages indirects, accessoires, spéciaux ou consécutifs 
                résultant de l'utilisation de nos services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Notre responsabilité totale ne dépassera jamais le montant que vous avez 
                payé pour nos services au cours des 12 mois précédant la réclamation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">8. Garanties et exclusions</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nos services sont fournis "en l'état" sans garantie d'aucune sorte. 
                Nous ne garantissons pas que :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Nos services seront ininterrompus ou sans erreur</li>
                <li>Les résultats d'apprentissage seront garantis</li>
                <li>Nos services répondront à tous vos besoins spécifiques</li>
                <li>Les défauts seront corrigés</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">9. Résiliation</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nous pouvons suspendre ou résilier votre compte à tout moment pour violation 
                de ces termes ou pour toute autre raison à notre seule discrétion.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Vous pouvez résilier votre compte à tout moment en nous contactant. 
                La résiliation prendra effet à la fin de votre période de facturation en cours.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">10. Droit applicable</h2>
              <p className="text-gray-700 leading-relaxed">
                Ces termes sont régis par les lois de la province de Québec et du Canada. 
                Tout litige sera résolu par les tribunaux compétents.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">11. Modifications</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous nous réservons le droit de modifier ces termes à tout moment. 
                Les modifications prendront effet immédiatement après leur publication. 
                Votre utilisation continue de nos services constitue votre acceptation 
                des nouveaux termes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">12. Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                Si vous avez des questions concernant ces termes et conditions, 
                contactez-nous à : <strong>info@dojofinancier.com</strong>
              </p>
            </section>
          </div>
                 </div>
       </main>
     </div>
   );
 };
