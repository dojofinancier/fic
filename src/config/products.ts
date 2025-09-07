// Product configuration - Centralized pricing and product information
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  popular?: boolean;
  badge?: string;
}

export const PRODUCTS: Record<string, Product> = {
  'full-access': {
    id: 'full-access',
    name: 'Plan d\'accès complet',
    description: 'Accès complet à tous les outils d\'apprentissage FIC®',
    price: 197,
    currency: 'CAD',
    popular: true,
    badge: 'Le plus populaire',
    features: [
      'Matériel d\'examen FIC® complet',
      'Quiz interactifs par chapitre',
      'Examens pratiques chronométrés',
      'Système de cartes mémoire intelligent',
      'Support de tutorat virtuel 24h/24 et 7j/7',
      'Plans d\'étude téléchargeables',
      'Suivi des progrès et analyses',
      'Plateforme compatible mobile',
      'Résumés de chapitres',
      'Aperçus de performance',
      'Garantie d\'accès d\'un an',
      'Garantie de remboursement'
    ]
  },
  'premium-coaching': {
    id: 'premium-coaching',
    name: 'Plan Premium + Coaching',
    description: 'Accès complet + 6h de coaching privé avec un professionnel',
    price: 2,
    currency: 'CAD',
    badge: 'Coaching inclus',
    features: [
      'Tout ce qui est inclus dans le plan de base',
      '6 heures de coaching privé en ligne',
      'Sessions personnalisées selon vos besoins',
      'Accompagnement par un professionnel certifié',
      'Planification de sessions flexibles',
      'Support par email entre les sessions'
    ]
  }
};

// Helper functions
export const getProduct = (id: string): Product | undefined => {
  return PRODUCTS[id];
};

export const getAllProducts = (): Product[] => {
  return Object.values(PRODUCTS);
};

export const getProductPrice = (id: string): number => {
  return PRODUCTS[id]?.price || 0;
};

export const formatPrice = (price: number, currency: string = 'CAD'): string => {
  return `$${price} ${currency}`;
};

// Price validation
export const isValidProductId = (id: string): boolean => {
  return id in PRODUCTS;
};

// For backward compatibility
export const PRODUCT_PRICE = PRODUCTS['full-access'].price;
