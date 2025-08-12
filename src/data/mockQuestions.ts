import { Question, Quiz } from '../types';

export const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'Quel est l\'objectif principal de la réglementation des Fonds d\'investissement canadiens (FIC) ?',
    options: [
      'Réglementer les transactions boursières',
      'Protéger les investisseurs et assurer des marchés équitables',
      'Fixer les taux d\'intérêt',
      'Contrôler les dépenses gouvernementales'
    ],
    correctAnswer: 1,
    explanation: 'La réglementation FIC est principalement conçue pour protéger les investisseurs et assurer des marchés de capitaux équitables, efficaces et concurrentiels.',
    chapter: 1,
    type: 'quiz' as const
  },
  {
    id: '2',
    question: 'Quelle organisation est responsable de la surveillance de la réglementation des fonds d\'investissement au Canada ?',
    options: [
      'Banque du Canada',
      'Autorités canadiennes en valeurs mobilières (ACVM)',
      'Agence du revenu du Canada',
      'Ministère des Finances'
    ],
    correctAnswer: 1,
    explanation: 'Les Autorités canadiennes en valeurs mobilières (ACVM) sont l\'organisation-cadre des organismes de réglementation des valeurs mobilières provinciaux et territoriaux.',
    chapter: 1,
    type: 'quiz' as const
  },
  {
    id: '3',
    question: 'Que signifie VNI dans la terminologie des fonds communs de placement ?',
    options: [
      'Valeur nette d\'inventaire',
      'Vérification nationale des actifs',
      'Valorisation nette annuelle',
      'Nouveau volume d\'actifs'
    ],
    correctAnswer: 0,
    explanation: 'VNI signifie Valeur nette d\'inventaire, qui représente la valeur par part d\'un fonds commun de placement.',
    chapter: 2,
    type: 'quiz' as const
  },
  {
    id: '4',
    question: 'Quel type de risque ne peut pas être éliminé par la diversification ?',
    options: [
      'Risque spécifique à l\'entreprise',
      'Risque systématique',
      'Risque non systématique',
      'Risque sectoriel'
    ],
    correctAnswer: 1,
    explanation: 'Le risque systématique (risque de marché) affecte l\'ensemble du marché et ne peut pas être éliminé par la diversification.',
    chapter: 3,
    type: 'quiz' as const
  },
  {
    id: '5',
    question: 'Quelle est la période de règlement standard pour la plupart des transactions de valeurs mobilières canadiennes ?',
    options: [
      'T+1 (1 jour ouvrable)',
      'T+2 (2 jours ouvrables)',
      'T+3 (3 jours ouvrables)',
      'Le jour même'
    ],
    correctAnswer: 1,
    explanation: 'La plupart des transactions de valeurs mobilières canadiennes se règlent en T+2, soit deux jours ouvrables après la date de transaction.',
    chapter: 4,
    type: 'exam' as const
  }
];

export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-chapter-1',
    title: 'Chapitre 1 : Introduction aux fonds d\'investissement',
    chapter: 1,
    type: 'quiz',
    questions: mockQuestions.filter(q => q.chapter === 1),
    timeLimit: 15
  },
  {
    id: 'quiz-chapter-2',
    title: 'Chapitre 2 : Notions de base des fonds communs',
    chapter: 2,
    type: 'quiz',
    questions: mockQuestions.filter(q => q.chapter === 2),
    timeLimit: 10
  },
  {
    id: 'quiz-chapter-3',
    title: 'Chapitre 3 : Risque et rendement',
    chapter: 3,
    type: 'quiz',
    questions: mockQuestions.filter(q => q.chapter === 3),
    timeLimit: 10
  },
  {
    id: 'quiz-chapter-4',
    title: 'Chapitre 4 : Négociation de valeurs mobilières',
    chapter: 4,
    type: 'quiz',
    questions: mockQuestions.filter(q => q.chapter === 4),
    timeLimit: 10
  },
  {
    id: 'practice-exam-1',
    title: 'Examen pratique 1 - Durée complète',
    chapter: 0,
    type: 'exam',
    questions: mockQuestions,
    timeLimit: 180 // 3 heures
  }
];