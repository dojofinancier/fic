import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3b3b3b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img 
                src="http://dojofinancier.ca/wp-content/uploads/2025/06/LOGO-White-300.webp" 
                alt="Le Dojo Financier" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-300 max-w-md">
              Maîtrisez l'examen FIC avec notre plateforme d'apprentissage complète. 
              Quiz interactifs, examens pratiques et tutorat IA pour assurer votre succès.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Fonctionnalités</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Quiz par chapitre</li>
              <li>Examens pratiques</li>
              <li>Cartes mémoire</li>
              <li>Tutorat IA</li>
              <li>Plans d'étude</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Centre d'aide</li>
              <li>Nous contacter</li>
              <li>Politique de confidentialité</li>
              <li>Conditions d'utilisation</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Le Dojo Financier. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};