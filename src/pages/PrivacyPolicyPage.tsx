import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#3b3b3b] mb-4">Politique de Confidentialité</h1>
            <p className="text-xl text-gray-600">
              Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Le Dojo Financier ("nous", "notre", "nos") s'engage à protéger votre vie privée. 
                Cette politique de confidentialité explique comment nous collectons, utilisons et 
                protégeons vos informations personnelles lorsque vous utilisez notre plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">2. Informations que nous collectons</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">Informations personnelles</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#3b3b3b] mb-2">Informations d'utilisation</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Données de navigation et d'utilisation</li>
                    <li>Préférences d'étude et progression</li>
                    <li>Résultats de quiz et examens</li>
                    <li>Données techniques (adresse IP, type de navigateur)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">3. Comment nous utilisons vos informations</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nous utilisons vos informations pour :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Fournir et améliorer nos services d'éducation</li>
                <li>Personnaliser votre expérience d'apprentissage</li>
                <li>Traiter les paiements et gérer les abonnements</li>
                <li>Communiquer avec vous concernant nos services</li>
                <li>Assurer la sécurité de notre plateforme</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">4. Partage des informations</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. 
                Nous pouvons partager vos informations uniquement dans les cas suivants :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Avec votre consentement explicite</li>
                <li>Avec nos prestataires de services de confiance (paiement, hébergement)</li>
                <li>Pour respecter les obligations légales</li>
                <li>Pour protéger nos droits et notre sécurité</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">5. Sécurité des données</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos 
                informations personnelles contre l'accès non autorisé, la modification, 
                la divulgation ou la destruction.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Ces mesures incluent le chiffrement SSL, l'authentification sécurisée et 
                des contrôles d'accès stricts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">6. Cookies et technologies similaires</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nous utilisons des cookies et des technologies similaires pour améliorer 
                votre expérience, analyser l'utilisation de notre site et personnaliser 
                le contenu.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Vous pouvez contrôler l'utilisation des cookies via les paramètres de votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">7. Vos droits</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Vous avez le droit de :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Accéder à vos informations personnelles</li>
                <li>Corriger des informations inexactes</li>
                <li>Demander la suppression de vos données</li>
                <li>Vous opposer au traitement de vos données</li>
                <li>Retirer votre consentement à tout moment</li>
                <li>Exporter vos données</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">8. Conservation des données</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous conservons vos informations personnelles aussi longtemps que nécessaire 
                pour fournir nos services et respecter nos obligations légales. 
                Les données peuvent être conservées jusqu'à 7 ans après la fin de votre 
                relation avec nous.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">9. Modifications de cette politique</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. 
                Nous vous informerons de tout changement important par email ou via notre plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#3b3b3b] mb-4">10. Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                Si vous avez des questions concernant cette politique de confidentialité, 
                contactez-nous à : <strong>info@dojofinancier.com</strong>
              </p>
            </section>
          </div>
                 </div>
       </main>
     </div>
   );
 };
