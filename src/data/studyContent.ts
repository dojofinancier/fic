// Auto-generated from markdown files - DO NOT EDIT DIRECTLY
// Run 'npm run convert-markdown' to regenerate

export interface StudyPlan {
  weeks: 6 | 8 | 12;
  title: string;
  description: string;
  totalHours: string;
  dailyCommitment: string;
  pdfUrl?: string;
  schedule: {
    week: number;
    chapters: string;
    focus?: string;
    hours?: string;
    tasks: string[];
  }[];
}

export interface StudyNote {
  chapter: number;
  title: string;
  sections: {
    title: string;
    points: string[];
  }[];
  pdfUrl?: string;
}

// Study Plans Data
export const studyPlans: Record<6 | 8 | 12, StudyPlan> = {
  "6": {
    "title": "Plan d'étude standard - 8 semaines",
    "description": "Programme équilibré recommandé pour la plupart des candidats",
    "totalHours": "100 heures",
    "dailyCommitment": "2-3 heures",
    "schedule": [
      {
        "week": 1,
        "chapters": "1–4",
        "focus": "Fondations & KYC",
        "hours": "18 h",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 1 — Rôle du représentant en épargne collective (3 h)\n    • Chap. 2 — Aperçu du secteur financier canadien (3 h)\n    • Chap. 3 — Aperçu de l’économique (3 h)\n    • Chap. 4 — Apprendre à connaître le client (3 h)",
          "Pratique avec les cartes mémoires : chap. 1–4 (6 × 20 min)",
          "Quiz et examens pratique : chap. 1–4 (4 × 30 min)",
          "Deep dive (3 × 30 min) : KYC, profil de risque, collecte d’information, communication efficace"
        ]
      },
      {
        "week": 2,
        "chapters": "5–7",
        "focus": "Comportement, fiscalité/retraite & produits",
        "hours": "15 h",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 5 — Finance comportementale (3 h)\n    • Chap. 6 — Planification de la retraite et planification fiscale (3 h)\n    • Chap. 7 — Types de produits de placement et modes de négociation (3 h)",
          "Pratique avec les cartes mémoires : révision cumulative chap. 1–7 (6 × 20 min)",
          "Quiz et examens pratique : chap. 4–7 (3 × 30 min + 1 × 45 min cas pratique)",
          "Deep dive (3 × 30 min) : REER/CELI/REEE, fiscalité des FCP, biais comportementaux"
        ]
      },
      {
        "week": 3,
        "chapters": "8–10",
        "focus": "Portefeuilles, analyse & FCP modernes",
        "hours": "15 h",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 8 — Constitution de portefeuilles de placements (3 h)\n    • Chap. 9 — Comprendre les états financiers (3 h)\n    • Chap. 10 — Les fonds communs de placement modernes (3 h)",
          "Pratique avec les cartes mémoires : chap. 5–10 (6 × 20 min)",
          "Quiz et examens pratique : chap. 7–10 (4 × 30 min)",
          "Deep dive (3 × 30 min) : écart-type, corrélation, bêta; ratios clés; structure/prospectus des FCP"
        ]
      },
      {
        "week": 4,
        "chapters": "11–14",
        "focus": "Catégories de FCP, performance & alternatifs",
        "hours": "19 h",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 11 — Fonds communs de placement prudents (3 h)\n    • Chap. 12 — Fonds communs de placement plus risqués (3 h)\n    • Chap. 14 — Comprendre le rendement des fonds communs de placement (3 h)\n    • Chap. 13 — Produits gérés alternatifs (3 h)",
          "Pratique avec les cartes mémoires : chap. 8–14 (7 × 20 min)",
          "Quiz et examens pratique : chap. 9–14 (4 × 30 min + 1 × 60 min mini-examen chronométré)",
          "Deep dive (3 × 30 min) : TWR vs TRI, impact des frais sur le rendement, risques/levier/liquidité des PGA"
        ]
      },
      {
        "week": 5,
        "chapters": "15–17",
        "focus": "Sélection, frais & réglementation + Examen pratique 1",
        "hours": "20 h",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 15 — Choisir un fonds commun de placement (3 h)\n    • Chap. 16 — Frais et services des fonds communs de placement (3 h)\n    • Chap. 17 — Réglementation des courtiers en épargne collective (4 h)",
          "Pratique avec les cartes mémoires : révision cumulative chap. 1–17 (8 × 20 min)",
          "Quiz et examens pratique : cas intégrés (2 × 45 min); EXAMEN PRATIQUE #1 (3 h) + correction/retour (1 h)",
          "Deep dive (2 × 30 min) : grille de sélection, lecture DIC/prospectus, obligations de convenance & documentation"
        ]
      },
      {
        "week": 6,
        "chapters": "18 + révision",
        "focus": "Déontologie appliquée, révision ciblée + Examen pratique 2",
        "hours": "15 h",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 18 — Comment appliquer les normes de déontologie à ce que vous avez appris (3 h)\n    • Revue synthèse KYC / sélection / réglementation (3 h)",
          "Pratique avec les cartes mémoires : deck complet, focus points faibles (6 × 20 min)",
          "Quiz et examens pratique : quizz ciblés (2 × 30 min); EXAMEN PRATIQUE #2 (3 h) + correction/retour (1 h)",
          "Deep dive (2 × 30 min) : gestion des plaintes, conflits d’intérêts, checklist « avant l’examen » des formules & pièges"
        ]
      }
    ],
    "weeks": 6
  },
  "8": {
    "title": "Plan d'étude standard - 8 semaines",
    "description": "Programme équilibré recommandé pour la plupart des candidats",
    "totalHours": "120 heures",
    "dailyCommitment": "2 heures",
    "schedule": [
      {
        "week": 1,
        "chapters": "1–2",
        "focus": "Introduction au marché & secteur",
        "hours": "13 h",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 1 — Rôle du représentant en épargne collective (3 h)\n    • Chap. 2 — Aperçu du secteur financier canadien (3 h)",
          "Pratique avec les cartes mémoires : chap. 1–2 (4 × 20 min)",
          "Quiz et examens pratique : chap. 1–2 (2 × 30 min)",
          "Deep dive (2 × 30 min) : rôle/conduite du représentant, structure du marché FCP"
        ]
      },
      {
        "week": 2,
        "chapters": "3–4",
        "focus": "Économie & KYC (pondération forte)",
        "hours": "15 h",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 3 — Aperçu de l’économique (4 h)\n    • Chap. 4 — Bien connaître le client (4 h)",
          "Pratique avec les cartes mémoires : chap. 1–4 (5 × 20 min)",
          "Quiz et examens pratique : chap. 1–4 (3 × 30 min)",
          "Deep dive (3 × 30 min) : profil de risque, convenance, communication/documentation KYC"
        ]
      },
      {
        "week": 3,
        "chapters": "5–6",
        "focus": "Comportement & retraite/fiscalité",
        "hours": "15 h",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 5 — Finance comportementale (3 h)\n    • Chap. 6 — Planification de la retraite et fiscale (4 h)",
          "Pratique avec les cartes mémoires : chap. 3–6 (5 × 20 min)",
          "Quiz et examens pratique : chap. 3–6 (3 × 30 min)",
          "Deep dive (3 × 30 min) : biais courants, REER/CELI/REEE, fiscalité des FCP"
        ]
      },
      {
        "week": 4,
        "chapters": "7–8",
        "focus": "Produits & portefeuille",
        "hours": "15 h",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 7 — Types de produits & modes de négociation (4 h)\n    • Chap. 8 — Constitution de portefeuilles (4 h)",
          "Pratique avec les cartes mémoires : chap. 5–8 (5 × 20 min)",
          "Quiz et examens pratique : chap. 5–8 (3 × 30 min)",
          "Deep dive (3 × 30 min) : diversification, corrélation, rééquilibrage, caractéristiques des classes d’actifs"
        ]
      },
      {
        "week": 5,
        "chapters": "9–10",
        "focus": "Analyse & FCP modernes",
        "hours": "14 h",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 9 — Comprendre les états financiers (4 h)\n    • Chap. 10 — FCP modernes (3 h)",
          "Pratique avec les cartes mémoires : chap. 7–10 (5 × 20 min)",
          "Quiz et examens pratique : chap. 7–10 (3 × 30 min)",
          "Deep dive (2 × 30 min) : ratios de base, DIC/prospectus, structure et liquidité des FCP"
        ]
      },
      {
        "week": 6,
        "chapters": "11–14",
        "focus": "Catégories de FCP, performance & alternatifs",
        "hours": "17 h",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 11 — FCP prudents (3 h)\n    • Chap. 12 — FCP plus risqués (3 h)\n    • Chap. 14 — Comprendre le rendement des FCP (3 h)\n    • Chap. 13 — Produits gérés alternatifs (3 h)",
          "Pratique avec les cartes mémoires : chap. 9–14 (6 × 20 min)",
          "Quiz et examens pratique : chap. 9–14 (4 × 30 min + 1 × 60 min mini-examen)",
          "Deep dive (2 × 30 min) : TWR vs TRI, impact des frais, risques/levier/liquidité des PGA"
        ]
      },
      {
        "week": 7,
        "chapters": "15–17",
        "focus": "Sélection, frais & réglementation + Examen pratique 1",
        "hours": "17 h 30",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 15 — Choisir un fonds commun de placement (3 h)\n    • Chap. 16 — Frais et services des FCP (3 h)\n    • Chap. 17 — Réglementation des CE (4 h)",
          "Pratique avec les cartes mémoires : révision cumulative chap. 1–17 (6 × 20 min)",
          "Quiz et examens pratique : cas intégrés (2 × 45 min)",
          "Deep dive (2 × 30 min) : grille de sélection, KYP/convénance, divulgations/tenue de dossiers"
        ]
      },
      {
        "week": 8,
        "chapters": "18 + révision",
        "focus": "Déontologie & révision ciblée + Examen pratique 2",
        "hours": "18 h",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 18 — Déontologie (3 h)\n    • Synthèse KYC/sélection/réglementation (3 h)",
          "Pratique avec les cartes mémoires : deck complet, focus points faibles (6 × 20 min)",
          "Quiz et examens pratique : quizz ciblés (2 × 30 min)",
          "Deep dive (2 × 30 min) : gestion des plaintes, conflits d’intérêts, checklist « jour d’examen »"
        ]
      }
    ],
    "weeks": 8
  },
  "12": {
    "title": "Plan d'étude standard - 12 semaines",
    "description": "Programme équilibré recommandé pour la plupart des candidats",
    "totalHours": "150 heures",
    "dailyCommitment": "1-2 heures",
    "schedule": [
      {
        "week": 1,
        "chapters": "1–2",
        "focus": "Introduction au marché & secteur",
        "hours": "11 h",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 1 — Rôle du représentant en épargne collective (3 h)\n    • Chap. 2 — Aperçu du secteur financier canadien (3 h)",
          "Pratique avec les cartes mémoires : chap. 1–2 (4 × 20 min)",
          "Quiz et examens pratique : chap. 1–2 (2 × 30 min)",
          "Deep dive (2 × 30 min) : cadre des FCP au Canada, devoirs du représentant"
        ]
      },
      {
        "week": 2,
        "chapters": "3–4",
        "focus": "Économie & KYC (pondération forte)",
        "hours": "12 h 30",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 3 — Aperçu de l’économique (3 h)\n    • Chap. 4 — Bien connaître le client (3 h)",
          "Pratique avec les cartes mémoires : chap. 1–4 (5 × 20 min)",
          "Quiz et examens pratique : chap. 1–4 (3 × 30 min)",
          "Deep dive (2 × 30 min) : profil de risque, convenance (KYC/KYP), documentation"
        ]
      },
      {
        "week": 3,
        "chapters": "5–6",
        "focus": "Comportement & retraite/fiscalité",
        "hours": "12 h 30",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 5 — Finance comportementale (3 h)\n    • Chap. 6 — Planification de la retraite et fiscale (3 h)",
          "Pratique avec les cartes mémoires : chap. 3–6 (5 × 20 min)",
          "Quiz et examens pratique : chap. 3–6 (3 × 30 min)",
          "Deep dive (2 × 30 min) : biais d’investisseur, REER/CELI/REEE, fiscalité des FCP"
        ]
      },
      {
        "week": 4,
        "chapters": "7",
        "focus": "Produits & modes de négociation",
        "hours": "10 h 30",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 7 — Types de produits de placement et modes de négociation (5–6 h)",
          "Pratique avec les cartes mémoires : chap. 5–7 (4 × 20 min)",
          "Quiz et examens pratique : chap. 5–7 (2 × 30 min + 1 × 45 min cas)",
          "Deep dive (2 × 30 min) : liquidité, frais implicites/explicites, exécution des ordres"
        ]
      },
      {
        "week": 5,
        "chapters": "8",
        "focus": "Portefeuilles (construction)",
        "hours": "10 h 30",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 8 — Constitution de portefeuilles de placements (5–6 h)",
          "Pratique avec les cartes mémoires : chap. 7–8 (4 × 20 min)",
          "Quiz et examens pratique : chap. 7–8 (2 × 30 min)",
          "Deep dive (2 × 30 min) : diversification, corrélation, bêta, rééquilibrage"
        ]
      },
      {
        "week": 6,
        "chapters": "9–10",
        "focus": "Analyse & FCP modernes",
        "hours": "12 h 30",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 9 — Comprendre les états financiers (4 h)\n    • Chap. 10 — FCP modernes (4 h)",
          "Pratique avec les cartes mémoires : chap. 8–10 (5 × 20 min)",
          "Quiz et examens pratique : chap. 8–10 (3 × 30 min)",
          "Deep dive (2 × 30 min) : ratios de base (marge, ROE/ROA), DIC/prospectus"
        ]
      },
      {
        "week": 7,
        "chapters": "11–12",
        "focus": "Catégories de FCP",
        "hours": "12 h 30",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 11 — FCP prudents (4 h)\n    • Chap. 12 — FCP plus risqués (4 h)",
          "Pratique avec les cartes mémoires : chap. 10–12 (5 × 20 min)",
          "Quiz et examens pratique : chap. 10–12 (3 × 30 min)",
          "Deep dive (2 × 30 min) : profils risque-rendement, style boxes, allocation tactique"
        ]
      },
      {
        "week": 8,
        "chapters": "13–14",
        "focus": "Performance & alternatifs",
        "hours": "13 h 30",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 14 — Comprendre le rendement des FCP (3–4 h)\n    • Chap. 13 — Produits gérés alternatifs (3 h)",
          "Pratique avec les cartes mémoires : chap. 11–14 (5 × 20 min)",
          "Quiz et examens pratique : chap. 11–14 (3 × 30 min + 1 × 60 min mini-examen)",
          "Deep dive (2 × 30 min) : TWR vs TRI, volatilité vs risque, levier/illiquidité des PGA"
        ]
      },
      {
        "week": 9,
        "chapters": "15",
        "focus": "Sélection des FCP (KYP)",
        "hours": "11 h 30",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 15 — Choisir un fonds commun de placement (6–7 h)",
          "Pratique avec les cartes mémoires : chap. 14–15 (4 × 20 min)",
          "Quiz et examens pratique : chap. 14–15 (3 × 30 min)",
          "Deep dive (2 × 30 min) : grille de sélection (frais, mandat, équipe, track-record), comparateurs"
        ]
      },
      {
        "week": 10,
        "chapters": "16–17",
        "focus": "Frais & réglementation (pondération forte)",
        "hours": "13 h 30",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 16 — Frais et services des FCP (4 h)\n    • Chap. 17 — Réglementation des CE (5 h)",
          "Pratique avec les cartes mémoires : chap. 15–17 (5 × 20 min)",
          "Quiz et examens pratique : cas intégrés (2 × 45 min)",
          "Deep dive (2 × 30 min) : KYC/KYP, désignations de convenance, tenue de dossiers, divulgations"
        ]
      },
      {
        "week": 11,
        "chapters": "18 + révision",
        "focus": "Déontologie & révision ciblée + Examen pratique 1",
        "hours": "15 h",
        "tasks": [
          "Lecture du chapitre\n    • Chap. 18 — Déontologie (4 h)\n    • Synthèse KYC/sélection/réglementation (3 h)",
          "Pratique avec les cartes mémoires : deck complet, focus points faibles (6 × 20 min)",
          "Quiz et examens pratique : <strong>Examen pratique #1 (3 h)</strong> + <strong>correction/retour (1 h)</strong>",
          "Deep dive (2 × 30 min) : gestion des plaintes, conflits d’intérêts, code déontologique"
        ]
      },
      {
        "week": 12,
        "chapters": "Révision globale",
        "focus": "Révision finale + Examen pratique 2",
        "hours": "14 h",
        "tasks": [
          "Lecture du chapitre\n    • Revue globale (tous chapitres) avec emphase pondérée (3–4 h)",
          "Pratique avec les cartes mémoires : deck complet en mode rétention espacée (6 × 20 min)",
          "Quiz et examens pratique : <strong>Examen pratique #2 (3 h)</strong> + <strong>correction/retour (1 h)</strong>",
          "Deep dive (2 × 30 min) : analyse d’erreurs de l’examen #1 → plan de correction rapide"
        ]
      }
    ],
    "weeks": 12
  }
};

// Study Notes Data
export const studyNotes: Record<number, StudyNote> = {
  "1": {
    "title": "Rôle du représentant en épargne collective",
    "sections": [
      {
        "title": "Comment le secteur des fonds communs de placement a-t-il évolué?",
        "points": [
          "Définition de base d’un fonds commun de placement : instrument qui regroupe l’épargne pour investir dans actions/obligations/monétaires; parts/actions; gestion professionnelle; style et objectifs du fonds.",
          "Pourquoi les fonds ont pris de l’ampleur : donnent accès à un portefeuille diversifié géré par des professionnels, à faible coût pour des investisseurs avec une petite mise.",
          "Croissance du secteur canadien : hausse marquée de la diversité des produits et des actifs sous gestion au fil des décennies.",
          "<strong>Historique – jalons clés (Canada)</strong> :\n    • Années 1930 : premières sociétés d’investissement à capital variable.\n    • Années 1960 : ~30 sociétés; ~560 M$ d’actifs; double à ~1 G$ milieu de décennie.\n    • Années 1980 : entrée des banques; le nombre de fonds passe d’~80 à ~400.\n    • Années 2000 : ~400 G$ d’actifs sous gestion.\n    • 2018 : > 1,4 billion $ d’actifs."
        ]
      },
      {
        "title": "Quelle est la valeur de votre accréditation?",
        "points": [
          "Exigences d’obtention (au Canada) : critères en formation, emploi et expérience; dossier traité par l’employeur ou un parrain; formation continue possible pour la conserver.",
          "Avantages de l’accréditation (pour vous et vos clients) :\n    • Montre l’engagement envers le perfectionnement professionnel; compréhension des types/caractéristiques de fonds offerts.\n    • Démontre votre niveau de compétence et la capacité de formuler des recommandations qui conviennent au client.\n    • Affirme votre conduite conforme à l’éthique.\n    • Témoigne de votre compréhension du rôle des organismes de réglementation.",
          "Ce que le cours vous apporte : meilleure compréhension du produit, du client et de la réglementation; relation fondée sur la confiance; nécessité de rester à jour (formation continue)."
        ]
      },
      {
        "title": "Pourquoi offrir l’excellence du service à la clientèle",
        "points": [
          "<strong>Ce que signifie “service à la clientèle”</strong> :\n    • Comprendre parfaitement les besoins du client;\n    • Trouver la solution qui s’accorde à ces besoins.",
          "<strong>Pourquoi c’est crucial</strong> : facteur de différenciation; peut-être l’aspect le plus important du travail; on place le service avant le produit.",
          "<strong>Avantages d’un excellent service</strong> :\n    • Le client revient;\n    • Génère des références (famille/amis) → volume accru;\n    • Achats connexes.",
          "<strong>Pourquoi l’importance dès le départ</strong> :\n    • Vente de FCP réglementée et assortie d’obligations d’information → approche spécialisée;\n    • Environnement de services financiers en évolution rapide → bien comprendre caractéristiques/raison d’être des produits."
        ]
      },
      {
        "title": "Pourquoi est-il important de bien connaître vos clients et vos produits?",
        "points": [
          "Contexte client : beaucoup sont nouveaux aux FCP; connaissances limitées; ils cherchent conseil → responsabilité de bien connaître le secteur, les produits, et les clients.",
          "<strong>Types de responsabilité du représentant</strong> :\n    • Juridique : recommander seulement des placements qui conviennent; cohérents avec objectifs, situation financière et personnelle, connaissances, tolérance au risque.\n    • Éthique : faire passer les besoins du client avant les vôtres/ceux de l’établissement.\n    • Professionnelle : fournir le meilleur service possible.",
          "<strong>Confiance, éthique et conformité</strong> :\n    • Code de déontologie et de conduite (confidentialité, meilleures pratiques).\n    • Conformité = respect des règles (loi/politiques) → responsabilité légale en cas de manquement.\n    • Éthique = aller au-delà de la lettre de la loi (esprit); possible d’être conforme mais contraire à l’éthique.\n    • Obligation fiduciaire possible : intérêts du client en premier; prudence/honnêteté/bonne foi; ne pas profiter de la confiance du client.",
          "<strong>Obligation d’information & documents clés</strong> :\n    • Aperçu du fonds : 4 pages max, fournit les renseignements principaux (détails du fonds, historique de rendement, placements, coûts).\n    • Prospectus : plus détaillé et plus long.",
          "<strong>Bien connaître son client (KYC) – 5 aspects</strong> : objectifs financiers, situation financière, situation personnelle, connaissances en matière de placement, tolérance au risque.",
          "<strong>Bien connaître son produit (KYP)</strong> : comprendre toutes les caractéristiques du fonds (conception, comportement selon le marché, frais d’acquisition/annuels, conditions/frais au rachat, type de revenu); la connaissance du produit est essentielle pour juger de la convenance."
        ]
      },
      {
        "title": "Pourquoi la règle « Bien connaître son client » et l’obligation de convenance sont-elles importantes?",
        "points": [
          "<strong>Convenance</strong> : les recommandations doivent tenir compte de la situation particulière et des objectifs du client; s’appuyer sur la compréhension de la situation personnelle/financière du client et des produits recommandés.",
          "<strong>Exigence de diligence KYC</strong> : apprendre tous les faits essentiels (revenu, valeur nette, situation familiale/engagements, objectifs).",
          "<strong>Si l’information manque/refus KYC</strong> : impossible légalement de vendre des FCP.",
          "<strong>Si vous ne pouvez pas juger de la convenance</strong> : ne pas accepter l’ordre du client.",
          "<strong>Sensibilisation au risque/volatilité & horizon</strong> : expliquer la volatilité (fonds d’actions vs obligations/monétaire) et l’horizon de placement pour établir la convenance."
        ]
      },
      {
        "title": "Quel est le rôle du représentant en épargne collective?",
        "points": [
          "<strong>Rôle central</strong> : veiller à ce que le client achète uniquement des produits qui lui conviennent (objectifs financiers, situation financière/personnelle, connaissances, tolérance au risque).",
          "<strong>Rôle d’éducateur</strong> (selon l’expérience du client) et limites : certains services ne sont pas autorisés (p. ex., planification financière). Référer au besoin aux spécialistes.",
          "<strong>Respect du permis</strong> : si le client veut des actions individuelles, référer à un représentant autorisé; le permis FCP limite vos discussions aux fonds communs.",
          "<strong>Travail conjoint avec le client</strong> : recueillir l’info, évaluer la concordance client-produit; si concordance faible, expliquer pourquoi et proposer de meilleurs choix."
        ]
      },
      {
        "title": "La vente de fonds communs de placement, en pratique",
        "points": [
          "<strong>Ouverture de compte / demande de souscription</strong> : compléter le formulaire (identité, montant, objectifs financiers, connaissances, revenu annuel, valeur nette = actif total moins dettes personnelles/hypothécaires, tolérance au risque).",
          "<strong>KYC obligatoire</strong> : la section “information sur le client” sert à bien connaître votre client; sans ces renseignements, la vente est illégale.",
          "<strong>Information au client</strong> : remettre l’aperçu du fonds (et prospectus sur demande); souligner les points importants (p. ex. objectifs du fonds, risques, volatilité); relier ces éléments aux objectifs/horizon du client.",
          "<strong>Éducation et mise en garde</strong> : expliquer les risques pertinents et la volatilité relative des catégories de fonds; tenir compte de l’horizon de placement.",
          "<strong>Évaluation continue de vos responsabilités</strong> : vérifier que votre démarche respecte vos responsabilités juridique, éthique et professionnelle (convenance, intérêts du client en premier, qualité du service)."
        ]
      },
      {
        "title": "Termes clés à maîtriser",
        "points": [
          "Service à la clientèle,",
          "Conformité,",
          "Conduite conforme à l’éthique / responsabilité éthique,",
          "Déontologie/éthique, Situation/objectif financier,",
          "Planificateur financier,",
          "Aperçu du fonds,",
          "Fonds d’investissement / Fonds commun de placement (OPC),",
          "Horizon de placement, Connaissances en matière de placement,",
          "Bien connaître son client / son produit,",
          "Responsabilité juridique / professionnelle,",
          "Prospectus,",
          "Risque / Volatilité,",
          "Aversion / Tolérance au risque,",
          "Convenance,",
          "Représentant en épargne collective,",
          "Valeur nette,",
          "Situation personnelle."
        ]
      }
    ],
    "chapter": 1
  },
  "2": {
    "title": "Aperçu du secteur financier canadien",
    "sections": [
      {
        "title": "Que sont les capitaux de placement?",
        "points": [
          "Définition large du <strong>capital</strong> : richesse (biens réels ou <strong>titres représentatifs</strong> comme argent, <strong>actions</strong>, <strong>obligations</strong>) disponible pour être investie.",
          "<strong>Épargne</strong> → importance économique seulement lorsqu’elle est rendue <strong>productive</strong>.",
          "<strong>Placement direct</strong> : investissement dans un bien réel (p. ex. infrastructure, usine).",
          "<strong>Placement indirect</strong> : achat de <strong>valeurs mobilières</strong> (actions, obligations, <strong>fonds communs de placement</strong>) ou dépôts d’épargne; l’émetteur utilise les fonds pour des placements productifs.",
          "<strong>Caractéristiques des capitaux</strong> : <strong>mobiles</strong>, <strong>sensibles au milieu</strong> (réagissent aux politiques, fiscalité, réglementation, taux de change, barrières commerciales), <strong>rares</strong>.",
          "Évaluation du <strong>risque pays</strong> (critères) : <strong>climat politique</strong>, <strong>tendances économiques</strong> (PIB, inflation, activité), <strong>politique budgétaire</strong> (impôts, dépenses, incitatifs), <strong>politique monétaire</strong> (masse monétaire, stabilité des prix et des changes), <strong>possibilités de placement</strong>, <strong>caractéristiques de la main-d’œuvre</strong>.",
          "<strong>Fournisseurs de capitaux</strong> : <strong>clients de détail</strong>, <strong>investisseurs institutionnels</strong> (p. ex. caisses de retraite, <strong>organismes de placement collectif</strong>), <strong>investisseurs étrangers</strong> (secteurs ciblés; restrictions dans certains secteurs).",
          "<strong>Utilisateurs de capitaux</strong> :\n    • <strong>Particuliers</strong> : financement maison/biens durables via <strong>emprunts</strong> (personnel, <strong>hypothécaire</strong>, crédit).\n    • <strong>Entreprises</strong> : besoins pour opérations et investissements; sources <strong>internes</strong> (bénéfices réinvestis), <strong>intermédiaires financiers</strong> (banques), et <strong>marchés</strong> (papier à court terme, <strong>titres d’emprunt</strong> à moyen/long terme, <strong>actions ordinaires/privilégiées</strong>).\n    • <strong>Gouvernements</strong> (principaux <strong>émetteurs</strong> sur marchés libres) :\n    • <strong>Fédéral</strong> : <strong>bons du Trésor</strong> et <strong>obligations négociables</strong>.\n    • <strong>Provinciaux</strong> : émissions directes (y c. obligations destinées au fédéral ou emprunts au <strong>RPC/RRQ</strong>; bons du Trésor; <strong>obligations d’épargne</strong>).\n    • <strong>Municipalités</strong> : <strong>débentures à versements échelonnés</strong> (échéances en série) pour infrastructures."
        ]
      },
      {
        "title": "Que sont les différents instruments financiers?",
        "points": [
          "Rôle des <strong>valeurs mobilières</strong> : <strong>documents juridiques officiels</strong> énonçant droits/obligations; caractéristiques définies facilitant la <strong>négociation</strong>; diversité de catégories pour répondre à des besoins spécifiques.",
          "<strong>Titres d’emprunt</strong> (<strong>titres à revenu fixe</strong>) : prêt de l’investisseur à l’émetteur; <strong>intérêts</strong> périodiques et <strong>remboursement à l’échéance</strong>; exemples : <strong>obligations</strong>, <strong>débentures</strong>, <strong>hypothèques</strong>, <strong>bons du Trésor</strong>, <strong>papier commercial</strong>.",
          "<strong>Titres de participation</strong> : <strong>actions</strong> (copropriété → <strong>gain en capital</strong> potentiel; <strong>dividendes</strong> non obligatoires); principales catégories : <strong>ordinaires</strong> et <strong>privilégiées</strong>.",
          "<strong>Fonds d’investissement</strong> : société/fiducie qui gère des placements; forme courante <strong>SICAV / fonds commun de placement</strong>; collecte par émission de <strong>parts/actions</strong>; revenus/charges/gains/pertes partagés; <strong>parts rachetables</strong> au <strong>prix courant</strong>.",
          "<strong>Produits dérivés</strong> : instruments dérivés d’un sous-jacent (action, <strong>indice</strong>); conviennent surtout à des investisseurs avertis; produits courants : <strong>options</strong>, <strong>contrats de gré à gré</strong>.",
          "<strong>Autres instruments financiers</strong> (produits <strong>hybrides</strong>) : <strong>billets liés</strong> et <strong>fonds négociés en bourse (FNB)</strong>."
        ]
      },
      {
        "title": "Que sont les marchés financiers?",
        "points": [
          "Rôle : facilitent le <strong>transfert efficace</strong> des capitaux; marchés bien organisés = <strong>opérations rapides</strong>, <strong>frais faibles</strong>, <strong>grande liquidité</strong>, <strong>réglementation efficace</strong>.",
          "Nature : pas nécessairement un lieu physique; réseaux électroniques; au Canada, <strong>toutes les bourses sont électroniques</strong>.",
          "<strong>Marché primaire</strong> : vente des <strong>nouvelles émissions</strong> par sociétés/gouvernements; <strong>PAPE</strong> pour la première émission d’une société; <strong>parts de fonds communs</strong> achetées et vendues <strong>directement auprès du fonds</strong>.",
          "<strong>Marché secondaire</strong> : négociation <strong>entre investisseurs</strong>; l’<strong>émetteur</strong> ne reçoit pas le produit; clé pour la <strong>liquidité</strong>.",
          "<strong>Marchés aux enchères</strong> : ordres d’achat/vente centralisés; <strong>cours acheteur</strong> vs <strong>cours vendeur</strong>.",
          "<strong>Bourses canadiennes</strong> (produits principaux) : <strong>TSX</strong>, <strong>TSX Croissance</strong>, <strong>Bourse Alpha</strong>, <strong>Bourse de Montréal (MX)</strong> (options/contrats à terme), <strong>Natural Gas Exchange (NGX)</strong> (électricité/gaz naturel), <strong>CSE</strong>, <strong>NEO Bourse Aequitas</strong>, <strong>ICE Futures Canada</strong>.\n    • <strong>Liquidité</strong> d’une bourse : opérations nombreuses; <strong>faible écart</strong> acheteur-vendeur; <strong>faibles fluctuations</strong> entre opérations.",
          "<strong>Marchés entre courtiers</strong> (<strong>hors cote</strong>, <strong>gré à gré</strong>) : réseau de courtiers; la plupart des <strong>obligations/débentures</strong> s’y négocient; volume (en $) <strong>très important</strong>, souvent supérieur au marché des actions."
        ]
      },
      {
        "title": "Qui sont les intermédiaires financiers?",
        "points": [
          "Définition : organismes/établissements qui <strong>facilitent la circulation</strong> des instruments financiers entre <strong>fournisseurs</strong> et <strong>utilisateurs</strong> de capitaux.",
          "Deux catégories :\n    • <strong>Établissements de dépôt</strong> : <strong>banques</strong>, <strong>sociétés de fiducie</strong> (regroupent dépôts et les réinvestissent; prêts aux particuliers/entreprises/gouvernements; placements marché monétaire).\n    • <strong>Établissements sans dépôts</strong> : <strong>sociétés d’assurances</strong>, <strong>courtiers en valeurs mobilières</strong> (accumulent capitaux via <strong>primes</strong> ou agissent comme <strong>mandataires/contrepartistes</strong>).",
          "<strong>Courtiers en valeurs mobilières</strong> :\n    • <strong>Prise ferme</strong> et <strong>placement</strong> de nouvelles valeurs (rôle sur <strong>marché primaire</strong>).\n    • <strong>Soutien du marché secondaire</strong> (liquidité; transfert entre investisseurs).",
          "<strong>Banques à charte</strong> : régies par la <strong>Loi sur les banques</strong> (mise à jour périodique); fin 2018 : <strong>88 banques</strong> (35 canadiennes, 21 filiales, 32 succursales); les <strong>six plus grandes</strong> contrôlent <strong>\\> 90 %</strong> de l’actif bancaire total (~<strong>4 billions $</strong>); <strong>Banque Royale</strong>, <strong>Banque Scotia</strong> et <strong>TD Canada Trust</strong> parmi les 50 plus grandes mondiales (capitalisation).",
          "<strong>Sociétés d’assurances</strong> : deux secteurs (<strong>vie</strong> et <strong>IARD</strong>); produits (prestations décès/maladie/invalidité, protection du revenu, <strong>vie temporaire/entière</strong>, <strong>rentes viagères</strong>, <strong>REER</strong>); <strong>\\>150 000</strong> emplois; <strong>\\>800 G$</strong> d’actifs gérés.",
          "<strong>Caisses de crédit / caisses populaires</strong> : appartenant aux <strong>membres</strong>; recrutent dans des <strong>groupes d’intérêt commun</strong>; services : dépôts/prêts (entreprises/particuliers), <strong>prêts hypothécaires</strong>, <strong>parts de FCP</strong>, <strong>produits d’assurance</strong>, <strong>services fiduciaires</strong>, <strong>courtage</strong>, <strong>cartes débit/crédit</strong>; <strong>confédérations provinciales</strong>; souvent <strong>une succursale</strong>.",
          "<strong>Fonds d’investissement</strong> : instrument géré regroupant l’épargne pour investir en <strong>actions</strong>, <strong>obligations</strong>, <strong>marché monétaire</strong>; porteurs de parts <strong>partagent</strong> revenus/charges/gains/pertes; gestion selon <strong>politiques</strong>, <strong>objectifs</strong> et <strong>style</strong>; parts <strong>rachetables</strong> au prix courant."
        ]
      },
      {
        "title": "Qu’est-ce que le cadre du régime canadien de réglementation des valeurs mobilières?",
        "points": [
          "<strong>Partage des compétences</strong> : lois <strong>fédérales</strong> (p. ex. <strong>Loi sur la protection du consommateur</strong>, <strong>Code criminel</strong>, <strong>Loi sur les banques</strong>, <strong>Loi canadienne sur les sociétés par actions</strong>) et lois <strong>provinciales</strong> (<strong>loi sur les valeurs mobilières</strong> de chaque province).",
          "<strong>Commissions provinciales</strong> : responsables de l’application; coordination/harmonisation via les <strong>Autorités canadiennes en valeurs mobilières (ACVM)</strong>.",
          "<strong>Organismes d’autoréglementation (OAR)</strong> : organismes privés mandatés par les commissions; imposent <strong>règles</strong> et <strong>exigences financières</strong> à leurs membres; <strong>la règle la plus rigoureuse</strong> (OAR vs province) s’applique.",
          "<strong>ACFM</strong> (distribution des <strong>fonds communs de placement</strong>) : ne réglemente <strong>pas les fonds</strong> eux-mêmes (rôle des commissions); membres = <strong>courtiers en épargne collective</strong> (sauf s’ils sont membres de l’<strong>OCRCVM</strong>).",
          "<strong>Québec</strong> : <strong>AMF</strong> (surveillance des <strong>OPC</strong>) + <strong>Chambre de la sécurité financière</strong> (critères de <strong>formation continue</strong>, <strong>code de déontologie</strong>); <strong>entente de coopération ACFM–AMF</strong> pour éviter les chevauchements et maintenir la <strong>protection des épargnants</strong>.",
          "<strong>OCRCVM</strong> : supervise <strong>tous les courtiers en valeurs mobilières</strong> et la <strong>négociation</strong>; établit et applique règles de <strong>compétence</strong>, <strong>conduite</strong>, <strong>intégrité du marché</strong>; <strong>adhésion obligatoire</strong> pour les courtiers."
        ]
      }
    ],
    "chapter": 2
  },
  "3": {
    "title": "Principes économiques",
    "sections": [
      {
        "title": "Qu’est-ce que l’économique?",
        "points": [
          "L’économique cherche à comprendre les choix individuels et comment, ensemble, ils influent sur l’économie de marché; les prix sont déterminés par l’<strong>offre</strong> et la <strong>demande</strong> sur des marchés organisés (ex.: Bourse de Toronto).",
          "<strong>Offre et demande</strong> :\n    • Loi de la demande : prix ↑ ⇒ quantité demandée ↓ (toutes choses égales par ailleurs).\n    • Loi de l’offre : prix ↑ ⇒ quantité offerte ↑.",
          "<strong>Équilibre du marché</strong> : le <strong>prix d’équilibre</strong> est celui où la quantité demandée = quantité offerte.",
          "Points à retenir pour les marchés financiers : les forces d’offre et de demande régulent le prix des instruments; une demande accrue (ou une offre accrue) déplace les prix."
        ]
      },
      {
        "title": "Comment la croissance économique se mesure-t-elle?",
        "points": [
          "<strong>PIB (valeur marchande des biens finaux et services finaux)</strong> sur une période (trimestre/année). Les biens « finaux » excluent les intrants pour éviter le double comptage.",
          "Deux <strong>méthodes de calcul</strong> :\n    • <strong>Dépenses</strong> : PIB = <strong>C + I + G + (X – M)</strong>.\n    • <strong>Revenus</strong> : somme des revenus versés pour les facteurs (rémunération du travail, loyers, intérêts, profits).",
          "<strong>PIB nominal vs PIB réel</strong> :\n    • Nominal = aux prix courants; Réel = aux prix d’une <strong>année de base</strong> (mesure la variation des volumes). La différence nominal–réel est due aux prix (inflation).",
          "<strong>Facteurs de croissance du PIB</strong> : population, capital national, améliorations technologiques."
        ]
      },
      {
        "title": "Quelles sont les phases du cycle économique?",
        "points": [
          "Un <strong>cycle économique</strong> comprend 5 phases : <strong>reprise</strong>, <strong>expansion</strong>, <strong>sommet</strong>, <strong>contraction</strong>, <strong>creux</strong>.",
          "<strong>Creux</strong> : taux d’intérêt ↓, inflation ralentit; ménages recommencent à dépenser; les cours des actions remontent. <strong>Reprise</strong> : PIB remonte jusqu’au sommet précédent; forte sensibilité des achats aux taux d’intérêt; productions et stocks se redressent, chômage encore élevé au début.",
          "<strong>Indicateurs économiques</strong> pour analyser la conjoncture :\n    • <strong>Précurseurs</strong> : mises en chantier, nouvelles commandes, prix des marchandises, moyenne hebdomadaire d’heures, cours des actions, masse monétaire.\n    • <strong>Simultanés</strong> : revenu personnel, PIB, production industrielle, ventes au détail.\n    • <strong>Retardataires</strong> : chômage, dépenses d’usines/équipement, prêts et intérêts, coûts de la main-d’œuvre, taux d’inflation.",
          "<strong>Récession</strong> (caractéristiques) : baisse du PIB réel ≥ 2 trimestres; mais les organismes évaluent aussi ampleur, durée, étendue du déclin; « atterrissage en douceur » = forte décélération de la croissance sans décroissance avec inflation basse/faible."
        ]
      },
      {
        "title": "Quels sont les principaux indicateurs du marché du travail canadien?",
        "points": [
          "<strong>Population en âge de travailler</strong> : ≥ 15 ans; <strong>population active</strong> = personnes en âge de travailler qui ont un emploi ou sont en chômage.",
          "<strong>Taux d’activité</strong> : population active / population en âge de travailler (≈ 66 % au Canada selon l’EPA, valeur donnée dans le chapitre). <strong>Taux de chômage</strong> : % de la population active sans emploi qui cherche activement du travail.",
          "<strong>Travailleurs découragés</strong> : cessent de chercher; exclus du taux de chômage (peut le sous-estimer).",
          "<strong>Types de chômage</strong> :\n    • <strong>Conjoncturel</strong> (lié au cycle), <strong>saisonnier</strong>, <strong>frictionnel</strong> (roulement normal), <strong>structurel</strong> (inadéquation compétences/lieu/salaire; dure + longtemps).",
          "<strong>Taux naturel de chômage</strong> (niveau non inflationniste) et rôle de la Banque du Canada; écart chômage réel vs naturel et effets sur salaires/inflation."
        ]
      },
      {
        "title": "Quel rôle jouent les taux d’intérêt?",
        "points": [
          "Les taux d’intérêt relient activité <strong>actuelle</strong> et <strong>future</strong> : pour les ménages, « loyer de l’argent » (incitation à épargner/consommer); pour les entreprises, composante du <strong>coût des capitaux</strong>; très influents sur marchés monétaires/obligataires.",
          "<strong>Facteurs influant sur les taux</strong> (énumérés dans le chapitre) : <strong>offre et demande de capitaux</strong>, <strong>risque de défaut</strong>, <strong>opérations de la banque centrale</strong>, <strong>taux à l’étranger</strong>, <strong>inflation</strong>.",
          "<strong>Effets macro</strong> : hausses de taux ⇒ coût de l’emprunt ↑, consommation/investissement ↓, <strong>ralentissement</strong> de la croissance; baisses ⇒ effet <strong>expansionniste</strong>.",
          "<strong>Attentes & inflation</strong> : le <strong>taux nominal</strong> inclut l’inflation; <strong>taux réel = taux nominal – inflation prévue</strong>; attentes d’inflation influent fortement sur les taux nominaux."
        ]
      },
      {
        "title": "Quelle est la nature de l’argent et de l’inflation?",
        "points": [
          "<strong>Fonctions de la monnaie</strong> : moyen d’échange (évite le troc), unité de compte (exprime les prix), réserve de pouvoir d’achat (stabilité recherchée).",
          "<strong>Agrégats monétaires</strong> (mesures de la quantité d’argent) suivis par la Banque du Canada pour guider la politique monétaire et maintenir un inflation faible et une croissance durable.",
          "<strong>Inflation</strong> (définition) : hausse <strong>généralisée et soutenue</strong> des prix; hausse ponctuelle (p.ex. taxe/prix du pétrole) ≠ inflation si elle ne diffuse pas aux salaires/autres coûts; liée à une <strong>masse monétaire</strong> trop abondante par rapport aux biens.",
          "<strong>Mesure (IPC)</strong> : panier (env. 600 biens et services) pondéré; année de référence = 100;\n    • <strong>taux d’inflation</strong> = (IPC courant – IPC précédent) / IPC précédent × 100.",
          "<strong>Coûts de l’inflation</strong> : érosion du pouvoir d’achat (revenus fixes), réduction de la valeur réelle des placements à taux fixe, brouillage des signaux de prix, montée des taux d’intérêt et risques de récession si l’inflation s’accélère.",
          "<strong>Désinflation</strong> : ralentissement du rythme de hausse des prix; <strong>courbe de Phillips</strong> (trade-off court terme inflation-chômage); <strong>ratio de sacrifice</strong> : % de PIB à « sacrifier » pour baisser l’inflation de 1 %.",
          "<strong>Déflation</strong> : baisse soutenue des prix (IPC < 0 d’une année à l’autre) — effets négatifs si elle dure.",
          "<strong>Causes & pressions inflationnistes</strong> :\n    • <strong>Écart de production</strong> (PIB réel vs <strong>PIB potentiel</strong>) : écart <strong>positif</strong> ⇒ tensions (salaires/ressources) ⇒ inflation; écart <strong>négatif</strong> ⇒ capacité inutilisée ⇒ inflation stable/↓.\n    • <strong>Inflation par la demande</strong> (demande soutenue au-delà de la capacité). <strong>Inflation par les coûts</strong> (hausse coûts salariaux/matières)."
        ]
      },
      {
        "title": "Quelle est l’incidence des politiques monétaire et budgétaire et de l’économie internationale sur l’économie?",
        "points": [
          "<strong>Politique monétaire</strong> : régulation de la <strong>masse monétaire</strong> et du <strong>crédit</strong> pour une croissance durable et la stabilité des prix. <strong>Politique budgétaire</strong> : décisions délibérées (dépenses, fiscalité) pour influer sur l’économie.",
          "<strong>Balance des paiements</strong> : état des opérations d’un pays avec le reste du monde.\n    • <strong>Compte courant</strong> : échanges de biens/services, revenus de placements, transferts nets.\n    • <strong>Compte capital et financier</strong> : flux financiers liés aux placements (entrées/sorties de capitaux).",
          "<strong>Mécanique & interprétation</strong> : déficit du compte courant ⇒ doit être financé par un excédent du compte capital et financier ou par endettement; excédent courant ⇒ épargne nette pouvant être prêtée à l’étranger.",
          "<strong>Facteurs du commerce</strong> et <strong>taux de change</strong> : progression relative de la demande intérieure/étrangère; dépréciation du dollar canadien ↓ prix des exportations (↑ exportations) et ↑ coût des importations (↓ importations) — avec nuances si la dépréciation renchérit les coûts domestiques."
        ]
      }
    ],
    "chapter": 3
  },
  "4": {
    "title": "Bien connaître le client",
    "sections": [
      {
        "title": "Pourquoi la communication avec le client et la planification sont-elles importantes?",
        "points": [
          "La <strong>convenance</strong> d’un placement est évaluée à partir des <strong>objectifs financiers</strong> déjà établis du client; ton rôle est d’identifier les fonds qui s’alignent avec ces objectifs.",
          "La <strong>planification financière</strong> doit être abordée comme un <strong>processus</strong>: exercice <strong>continu</strong> qui exige des <strong>révisions</strong> dès qu’il y a des changements dans la <strong>situation financière et personnelle</strong> du client ou dans la <strong>conjoncture économique</strong>.",
          "Pour juger si des objectifs sont <strong>raisonnables</strong>, il faut comprendre <strong>comment ils sont établis</strong>, et vérifier leur <strong>cohérence</strong> avec les renseignements recueillis sur le client et avec les <strong>résultats à court et à long terme</strong> des fonds et autres produits.",
          "Les <strong>renseignements sur le client</strong> donnent une <strong>vue d’ensemble</strong> de sa situation et de ses objectifs futurs; la <strong>pyramide de la planification financière</strong> aide à préciser la situation actuelle et les besoins de planification."
        ]
      },
      {
        "title": "Qu’est-ce que l’approche de la planification financière?",
        "points": [
          "Définition: évaluer la <strong>situation financière et personnelle</strong>, les <strong>contraintes</strong> et <strong>objectifs</strong> du client, puis formuler des <strong>recommandations</strong> au moyen d’un <strong>plan financier</strong> pour atteindre ces objectifs.",
          "Le conseiller peut intégrer les analyses de <strong>spécialistes</strong> (gestion financière, fiscalité, succession, etc.) dans un plan <strong>cohérent</strong> adapté aux besoins du client.",
          "L’analyse tient compte notamment de: <strong>âge</strong>, <strong>avoirs</strong>, <strong>carrière</strong>, <strong>état civil</strong>, <strong>situation fiscale</strong>, <strong>succession</strong>, <strong>capacité à prendre des risques</strong>, <strong>objectifs de placement</strong> et <strong>questions juridiques</strong>.",
          "Effets pour le client: la <strong>discipline</strong> et l’<strong>introspection</strong> exigées par la préparation d’un plan aident à <strong>clarifier attentes et objectifs</strong> et à <strong>augmenter les chances</strong> de réussite.",
          "Quatre caractéristiques d’un bon plan: <strong>réalisable</strong>, <strong>modifiable</strong> (si le mode de vie/le revenu change), <strong>non intimidant</strong>, et qui couvre les <strong>besoins de base</strong> tout en permettant certains <strong>luxes/récompenses</strong>.",
          "Portée: le processus fournit un <strong>plan de base</strong>; les questions complexes (p. ex. fiducies, gel successoral, besoins d’assurance) dépassent ce cours et sont traitées ailleurs.",
          "Outils mentionnés: <strong>pyramide de la planification financière</strong> (pour situer le client et ses besoins)."
        ]
      },
      {
        "title": "Quelles sont les étapes du processus de planification financière?",
        "points": [
          "Discussion initiale: cerner <strong>préoccupations</strong> et <strong>problèmes</strong>; présenter la <strong>méthode</strong> et les <strong>choix</strong>; annoncer tout <strong>conflit d’intérêts</strong>.",
          "<strong>Lettre d’entente/contrat</strong>: précise la <strong>nature des services</strong>, les <strong>informations</strong> à fournir, le <strong>mode de rémunération</strong>, et la responsabilité quant aux <strong>honoraires d’autres professionnels</strong>.",
          "<strong>Essentiel à obtenir</strong>:\n    • <strong>Situation financière et personnelle</strong>; <strong>objectifs et préférences</strong> en matière de placement; <strong>tolérance au risque</strong>.\n    • <strong>Renseignements personnels</strong>: âge, <strong>état civil</strong>, personnes à charge, <strong>tolérance au risque</strong>, <strong>santé</strong>, <strong>travail</strong> (peuvent révéler des <strong>contraintes</strong> et préciser <strong>objectifs</strong> et <strong>capacité de risque</strong>).\n    • <strong>Avoir net & budget familial</strong>: dresser un <strong>budget familial</strong> et un <strong>état de l’avoir net</strong> pour connaître <strong>actif</strong>, <strong>passif</strong>, <strong>revenu</strong>, <strong>épargne/revenu disponible</strong>.\n    • <strong>Tenue de dossiers</strong>: recommander des <strong>dossiers complets et précis</strong> (emplacement des <strong>testaments</strong>, <strong>polices</strong>, <strong>comptes</strong>; liste des <strong>professionnels</strong>).",
          "<strong>Formulaire d’ouverture de compte / KYC (données minimales)</strong>:\n    • <strong>Situation personnelle</strong> (incluant <strong>connaissances en placement</strong> et <strong>tolérance au risque</strong>)\n    • <strong>Situation financière</strong> (incluant <strong>revenu annuel</strong> et <strong>valeur nette</strong>)\n    • <strong>Objectifs financiers</strong> et **horizon de placement\n    • <strong>Âge</strong> du client.",
          "<strong>Mise à jour</strong>: tenir un <strong>dossier client à jour</strong> pour refléter tout <strong>changement important</strong>; utiliser le <strong>formulaire standard</strong> de l’employeur; liste d’infos usuelles (nom, adresse, NAS, emploi, etc.).",
          "<strong>Refus d’information</strong>: si un client refuse un renseignement <strong>essentiel</strong>, faire consigner le <strong>refus par écrit</strong> (procédure interne).",
          "<strong>Ordres téléphone/télécopieur</strong>: exiger une <strong>autorisation spéciale</strong> préalable; <strong>enregistrement</strong> des appels pour preuve/qualité.",
          "<strong>Budget familial & valeur nette</strong>: modèles fournis; la <strong>valeur nette</strong> et le <strong>revenu annuel</strong> sont souvent recueillis par <strong>cases à cocher</strong> pour apprécier <strong>patrimoine</strong> et <strong>réalisme des objectifs</strong>.",
          "<strong>Fonds d’urgence</strong>: tous les clients devraient en maintenir un, généralement <strong>3 à 6 mois</strong> de <strong>revenu net</strong>; si pas de réserve de liquidités, orienter vers <strong>fonds très liquides</strong> (p. ex. <strong>fonds du marché monétaire</strong>) pour la réserve.",
          "<strong>Connaissances en placement & tolérance au risque</strong>:\n    • Les <strong>connaissances</strong> influencent la <strong>capacité d’assumer le risque</strong>.\n    • La <strong>tolérance au risque</strong> a une composante <strong>psychologique</strong> (évolue avec l’âge) et une composante liée à la <strong>situation personnelle/financière</strong> et aux <strong>connaissances</strong>.",
          "But: déterminer <strong>quels types de fonds</strong> s’accordent avec <strong>objectifs</strong> et <strong>contraintes</strong>; parfois <strong>réviser les objectifs</strong> (p. ex., absence de fonds de réserve).",
          "Réaffirmer les <strong>données minimales</strong> KYC et l’obligation de maintenir le dossier <strong>à jour</strong>.",
          "Les recommandations doivent découler d’une <strong>analyse soignée</strong> des renseignements, qu’un ordre soit <strong>sollicité ou non</strong>; elles <strong>dépendent directement des objectifs</strong> du client.",
          "Déterminer la <strong>convenance des placements</strong>: si le client a déjà un <strong>portefeuille</strong>, juger s’il est approprié; sinon, proposer une <strong>répartition de l’actif</strong> (liquidités, titres à revenu fixe, titres de participation).",
          "S’appuyer au besoin sur des <strong>partenaires d’affaires</strong> (avocat, fiscaliste, conseiller en valeurs, spécialiste de la retraite, assurance).",
          "<strong>Objectifs généraux (formulaires d’ouverture de compte)</strong> et implications:\n    • <strong>Sécurité du capital</strong> (fonds du marché monétaire; rendements d’<strong>intérêts</strong>; vise la <strong>préservation</strong> du capital).\n    • <strong>Revenu courant</strong> (fonds hypothécaires/obligations/actions privilégiées/dividendes élevés; horizon plus <strong>long</strong>; objectif: <strong>maintenir le pouvoir d’achat</strong> et générer des <strong>surplus</strong>).\n    • <strong>Croissance du capital (gains en capital)</strong> (fonds de <strong>croissance</strong>; <strong>volatilité</strong> plus élevée; convient aux <strong>horizons à long terme</strong>).\n    • <strong>Réduction des impôts</strong> (tenir compte de la <strong>nature du rendement</strong>: intérêts/dividendes/gains en capital et de leur <strong>traitement fiscal</strong>).",
          "Exécuter les <strong>recommandations</strong> retenues avec le client",
          "Le plan <strong>n’est jamais définitif</strong>; mener une <strong>revue</strong> au moins <strong>annuelle</strong> + <strong>petits examens</strong> selon les circonstances (fiscalité, économie, carrière).",
          "La révision peut inclure des <strong>ajustements</strong> (testament, bénéficiaires, techniques d’<strong>économie d’impôts</strong>) — recommandations allant de <strong>« Aucun changement »</strong> à <strong>modifications nombreuses</strong>; faire un <strong>suivi</strong> pour assurer la <strong>mise en application</strong>.",
          "Le processus de planification donne un <strong>plan de base</strong>, sans traiter les <strong>questions plus complexes</strong> (fiducies, gel successoral, assurances), qui relèvent d’autres cours."
        ]
      },
      {
        "title": "Qu’est-ce que l’hypothèse du cycle de vie?",
        "points": [
          "<strong>Principe fondamental</strong>: avec l’âge, évoluent <strong>objectifs</strong>, <strong>situation financière et personnelle</strong>, <strong>connaissances en placement</strong> et <strong>tolérance au risque</strong>.",
          "<strong>Utilité et limites</strong>: utile pour beaucoup de clients, mais <strong>pas pour tous</strong> — il faut <strong>adapter</strong> l’approche au fur et à mesure que l’on recueille des renseignements (approche <strong>personnalisée</strong>).",
          "<strong>Phases du cycle de vie</strong> (avec chevauchements possibles; l’âge ne détermine pas toujours la phase exacte):\n    • <strong>Début de la carrière</strong> – jusqu’à **30 ans\n    • <strong>Années d’obligations familiales</strong> – **25 à 35 ans\n    • <strong>Années de revenu maximal</strong> – **30 à 50 ans\n    • <strong>Années précédant la retraite</strong> – **45 à 65 ans\n    • <strong>Retraite</strong> – à partir de <strong>50 ans</strong>.\n    • Les phases <strong>se chevauchent</strong>; il faut des <strong>renseignements supplémentaires</strong> pour bien situer le client.",
          "<strong>Caractéristiques typiques par phase</strong>:\n    • <strong>Phase 1</strong>: objectifs surtout <strong>à court terme</strong>, <strong>peu d’obligations</strong>; souvent pas de besoin d’<strong>assurance vie</strong>.\n    • <strong>Phase 2</strong>: <strong>obligations</strong> qui s’accroissent (versements <strong>hypothécaires</strong>, <strong>garde des enfants</strong>), <strong>manque de liquidités</strong> fréquent; l’<strong>assurance-vie</strong> devient une <strong>nécessité</strong>.\n    • <strong>Phase 3</strong>: capacité d’<strong>épargner</strong> pour plusieurs objectifs; attention accrue à l’<strong>épargne-retraite</strong>; <strong>répartition de l’actif</strong> souvent plus axée sur les <strong>fonds d’actions</strong>, avec considération des <strong>impôts</strong>.\n    • <strong>Phase 4</strong>: moins d’<strong>obligations familiales</strong>; prise de conscience de la dépendance aux <strong>économies</strong> à venir; <strong>prudence</strong> accrue.\n    • <strong>Retraite</strong>: priorités axées sur le <strong>revenu</strong> et la <strong>préservation</strong> du capital (le chapitre souligne surtout le principe d’adapter au cas par cas).",
          "<strong>Répartition de l’actif</strong>: varie par phase et contraintes, mais le <strong>facteur dominant</strong> demeure la <strong>capacité psychologique d’assumer des risques</strong> (certains retraités tolèrent beaucoup le risque; certains jeunes sont très prudents).",
          "<strong>Modèles explicatifs</strong>: utiles pour saisir l’essentiel, mais <strong>aucun modèle n’est universel</strong>; ne pas « forcer » un client dans une phase — utiliser l’hypothèse comme <strong>outil général</strong>."
        ]
      }
    ],
    "chapter": 4
  },
  "5": {
    "title": "Finance comportementale",
    "sections": [],
    "chapter": 5
  },
  "6": {
    "title": "Planification de la retraite et planification fiscale",
    "sections": [
      {
        "title": "Stratégie générale de planification fiscale",
        "points": [
          "Les impôts influencent fortement les rendements et la planification de la retraite; viser le rendement après impôts, pas seulement les « avantages fiscaux » d’un placement.",
          "Techniques d’évitement légitime de l’impôt : utiliser toutes les déductions, convertir des frais non déductibles en frais déductibles, reporter du revenu, fractionner le revenu (selon les procédés autorisés), et choisir des placements maximisant le rendement après impôts.",
          "LIR fédérale + lois provinciales; le fédéral perçoit pour presque toutes les provinces (sauf le Québec pour particuliers/sociétés et l’Alberta pour sociétés).",
          "Année d’imposition : particuliers = année civile; sociétés = exercice (≤ 53 semaines).",
          "Calcul de l’impôt : (1) revenu total, (2) déductions → revenu imposable, (3) impôt de base, (4) crédits d’impôt → impôt net."
        ]
      },
      {
        "title": "Imposition des revenus de placement",
        "points": [
          "Intérêts : imposés au taux applicable aux particuliers; distribués via feuillets T3/T5 si placements non enregistrés.",
          "Dividendes de sociétés canadiennes : majoration de 38 % + crédit d’impôt fédéral 15,02 % (traitement préférentiel); les dividendes étrangers ne sont pas admissibles.",
          "Gains/pertes en capital : 50 % des gains imposables; les pertes en capital ne réduisent pas d’autres revenus (intérêts, dividendes, emploi).",
          "Crédit d’impôt pour impôt étranger : dégrèvement = moindre de l’impôt étranger payé ou de l’impôt canadien sur ce revenu (après redressements).",
          "Choix de titres pour réduire le revenu imposable : dividendes canadiens admissibles et gains en capital vs intérêts; l’avantage relatif varie selon le taux marginal (exemples/tables 6.2–6.3)."
        ]
      },
      {
        "title": "Déductions permises du revenu de placement (frais financiers)",
        "points": [
          "Déductibles : intérêt sur fonds empruntés pour gagner un revenu (intérêts/dividendes), certains conseils en placement, frais de gestion/garde.",
          "Conditions pour déduire l’intérêt : obligation légale de payer; emprunt contracté pour gagner un revenu; revenu non exonéré d’impôt. Particularité des débentures convertibles (frais financiers normalement déductibles)."
        ]
      },
      {
        "title": "Régimes de retraite d’État",
        "points": [
          "RPC (sauf Québec) / RRQ (Québec) : cotisation automatique; droits à pension irrévocables; prestations viagères dès 65 ans (réduction si anticipées dès 60 ans; augmentation si report jusqu’à 70 ans).",
          "Sécurité de la vieillesse (SV) : payée aux citoyens/résidents autorisés; pension complète si 40 ans de résidence après 18 ans ou 10 ans ininterrompus avant la demande; demander ~6 mois avant l’admissibilité; versements rétroactifs possibles (≤ 12 mois).",
          "Disposition de récupération de la SV (ex. 2018) : seuil ~75 910 $; on rembourse 15 % de chaque dollar au-delà; récupération totale vers ~123 386 $."
        ]
      },
      {
        "title": "Régimes offerts par l’employeur (RPA)",
        "points": [
          "RPA : fiducie enregistrée (ARC ou agence provinciale); cotisations patronales et salariales déductibles. Deux catégories : régimes à prestations déterminées (RPD) vs régimes à cotisations déterminées (RCD).",
          "RPD – trois formules :\n    • Régime à rente uniforme (montant fixe par année de service).\n    • Régime salaires de carrière (pourcentage des gains sur l’ensemble de la carrière).\n    • Régime fin de carrière (moyenne des meilleures années récentes).",
          "RCD : cotisation (employeur/salarié) fixe; prestations dépendantes de l’accumulation et du rendement; rente souvent utilisée à la retraite.",
          "Cessation/immobilisation : prestations forfaitaires transférées vers un compte de retraite immobilisé (CRI); fonds immobilisés (retraits non permis avant âge déterminé)."
        ]
      },
      {
        "title": "REER (régime enregistré d’épargne-retraite)",
        "points": [
          "Types : REER gérés (placements détenus en fiducie; décisions déléguées) et REER autogérés (placements admissibles variés; décisions par l’épargnant).",
          "Caractéristiques : compte en fiducie; retraits imposables (impôt progressif) dans l’année du retrait; actifs ne peuvent servir de garantie.",
          "Cotisations maximales déductibles : moindre de 18 % du revenu gagné de l’année précédente ou du plafond de l’année; ajuster pour FE/FESP; ajouter droits inutilisés; plafond 2019 = 26 500 $; déductibles si versées dans l’année ou dans les 60 jours suivants; report des droits indéfiniment.",
          "Définition de « revenu gagné » (aux fins REER) : emploi (moins cotisations syndicales/prof.), location net, travail autonome, redevances, pensions alimentaires, invalidité RPC/RRQ, certaines prestations complémentaires d’assurance-emploi (pas celles de RHDSC).",
          "Cotisations excédentaires : tolérance de 2 000 $; au-delà pénalité 1 %/mois.",
          "Cotisation en nature : disposition présumée à la JVM; gain en capital imposable; pertes réputées nulles.",
          "REER de conjoint : déductible par le cotisant; attribution des retraits au cotisant si retirés l’année du retrait ou dans les deux années précédentes où une déduction a été réclamée.",
          "Liquidation obligatoire : au plus tard l’année civile des 71 ans; options : somme imposable, achat d’une rente viagère/à terme, conversion en FERR, ou combinaison; traitement au décès (transferts au conjoint/enfants à charge selon cas).",
          "Avantages : réduction du revenu imposable, transferts en franchise d’impôt de certains revenus de retraite, accumulation à l’abri, report d’impôt à des années de tranches inférieures, fractionnement via régime du conjoint (crédits de 2 000 $ chacun au titre de revenus de pension).",
          "Inconvénients : retraits imposés comme revenu, pas de crédit pour dividendes admissibles, traitement au décès si pas de bénéficiaire admissible, actifs non nantissables."
        ]
      },
      {
        "title": "FERR (fonds enregistré de revenu de retraite)",
        "points": [
          "Mécanisme de report après REER; retrait annuel minimum (montant annuel minimum) déterminé par formule pour fournir des prestations jusqu’au décès; aucun maximum; on peut baser l’échéance sur l’âge du conjoint plus jeune. Formule avant 71 ans : 1 ÷ (90 − âge). À 71 ans, facteur 5,28 %, puis jusqu’à 20 % à 95 ans."
        ]
      },
      {
        "title": "Régimes immobilisés et décaissement « verrouillé »",
        "points": [
          "CRI (REER immobilisé) : fonds transférés d’un RPA; retraits avant un âge déterminé interdits; options de décaissement : FRV (min. et max.) ou rente viagère (versements prédéterminés jusqu’au décès). Variante PRRIF en Saskatchewan."
        ]
      },
      {
        "title": "CELI (compte d’épargne libre d’impôt)",
        "points": [
          "Principes : en vigueur depuis début 2009; revenu gagné dans un CELI exonéré d’impôt à vie; retraits libres (montant/moment) pour toute fin.",
          "Admissibilité & droits : tout résident ≥ 18 ans; pas besoin de « revenu gagné »; droits non utilisés reportables.",
          "Plafonds annuels 2009–2019 (cumul 63 500 $) — voir Tableau 6.4.",
          "Impôt : cotisations non déductibles; revenus (intérêts/dividendes/gains en capital) non imposables.",
          "Placements admissibles : CPG, comptes d’épargne, actions, obligations, fonds communs.",
          "Retraits & remise : retraits non imposés, sans pénalité; remise possible la même année seulement s’il reste des droits inutilisés, sinon l’année suivante (pas de date limite).",
          "Utilisations : épargne polyvalente (études, prêts étudiants, mariage, vacances, voiture, maison, héritage), fonds d’urgence."
        ]
      },
      {
        "title": "REEE (régime enregistré d’épargne-études)",
        "points": [
          "Nature : épargne à imposition reportée pour études postsecondaires; cotisations non déductibles; croissance en franchise d’impôt; au retrait, la portion « revenu » imposable entre les mains du bénéficiaire inscrit (souvent à taux inférieur).",
          "Limites : pas de plafond annuel par bénéficiaire; plafond cumulatif 50 000 $; cotisations sur 31 ans max.; régime doit se terminer au plus tard 35 ans après l’établissement.",
          "Types : régimes collectifs (cotisations préétablies, gestion prudente, administrateur détermine le montant versé) vs régimes autogérés (souplesse, choix des placements et de la distribution). Régimes familiaux possibles (plusieurs bénéficiaires).",
          "Versement du revenu au cotisant (AIP) : possible si le régime existe depuis ≥ 10 ans et qu’aucun bénéficiaire n’a commencé un programme admissible avant 21 ans (ou s’ils sont décédés); sinon, transfert autorisé de revenu REEE → REER du cotisant, jusqu’à 50 000 $ (si droit de cotisation suffisant); sinon, imposition au taux régulier + pénalité 20 %.",
          "SCEE : 20 % de la première tranche de 2 500 $ / année (base); SCEE additionnelle selon le revenu familial (ex. 100 $ ou 50 $ sur les premiers 500 $); maximum annuel 500–600 $; maximum à vie 7 200 $; remboursable si pas d’études admissibles."
        ]
      },
      {
        "title": "RPAC (régime de pension agréé collectif)",
        "points": [
          "Régime d’épargne-retraite à grande échelle et à faible coût, administré par des institutions financières admissibles; actifs regroupés de multiples employeurs.",
          "Admissibles : employés/travailleurs indépendants dans T.N.-O., Nunavut, Yukon; travailleurs d’entreprises sous réglementation fédérale dont l’employeur opte pour un RPAC."
        ]
      }
    ],
    "chapter": 6
  },
  "7": {
    "title": "Types de produits de placement et modes de négociation",
    "sections": [
      {
        "title": "Titres à revenu fixe : titres de créance émis et vendus aux investisseurs; modalités : promesse de rembourser la valeur à l’échéance (capital) et versements d’intérêt à une fréquence déterminée; catégories courantes : obligations d’État et de sociétés, CPG, bons du Trésor, acceptations bancaires, papier commercial.",
        "points": []
      }
    ],
    "chapter": 7
  },
  "8": {
    "title": "Chapitre 8 : Constitution de portefeuilles de placements",
    "sections": [
      {
        "title": "Qu’est-ce que le risque et le rendement?",
        "points": [
          "Le risque et le rendement sont interreliés : pour viser un rendement plus élevé, il faut généralement accepter plus de risque. À rendement espéré égal, l’investisseur rationnel choisit l’option la moins risquée; à risque égal, celle au rendement le plus élevé. Chaque investisseur a un profil de risque différent.",
          "Le « rendement » combine rentrées de fonds (intérêts, dividendes, etc.) et gains/pertes en capital (variation entre valeur de fin et de début). Les rendements sont rarement garantis, d’où l’expression « rendements espérés ».",
          "En pratique, le « risque » renvoie souvent à la volatilité des résultats (variabilité d’une période à l’autre).",
          "Ordre général risque-rendement par catégories d’actifs (schéma du chapitre) : bons du Trésor < obligations < débentures < actions privilégiées < actions ordinaires < dérivés."
        ]
      },
      {
        "title": "Comment les conditions économiques influent-elles sur la comparaison des rendements?",
        "points": [
          "<strong>Inflation</strong> : tendance générale et soutenue à la hausse des prix; elle réduit la valeur de l’argent et donc le niveau de vie. Les investisseurs s’intéressent au <strong>taux de rendement réel</strong> (ajusté de l’inflation) plutôt qu’au nominal. Approximativement : rendement réel ≈ taux nominal − taux d’inflation annuel.",
          "<strong>Pouvoir d’achat</strong> : maintenu lorsque le rendement nominal suit l’inflation (rendement réel de 0 %). Accroître le patrimoine exige généralement d’obtenir un rendement réel positif.",
          "<strong>Impôt</strong> : trois types de revenus de placement (intérêt, dividendes, gains en capital) sont imposés différemment; l’intérêt est imposé au taux du revenu d’emploi, les dividendes de sociétés canadiennes bénéficient d’un <strong>crédit d’impôt pour dividendes</strong>, et seulement 50 % des <strong>gains en capital</strong> sont imposables. Toujours raisonner en <strong>rendements après impôt</strong>."
        ]
      },
      {
        "title": "Comment calculer un rendement?",
        "points": [
          "**Taux de rendement d’un seul titre (période d’un an)",
          "Si la période ≠ 1 an, on parle de <strong>rendement pendant la période de détention</strong> (même logique de calcul, appliquée à la période).",
          "<strong>Comparer des séries de rendements</strong> :\n    • <strong>Moyenne arithmétique</strong> = somme des rendements périodiques ÷ nombre de périodes (rendement « moyen » simple).\n    • <strong>Moyenne géométrique</strong> = rendement composé moyen : \\[(1+R1)×⋯×(1+RT)\\]1/T−1\\\\big\\[(1+R_1)\\\\times\\\\dots\\\\times(1+R_T)\\\\big\\]^{1/T}-1\\[(1+R1​)×⋯×(1+RT​)\\]1/T−1.",
          "<strong>Rendement espéré d’un portefeuille</strong> (pondéré) :"
        ]
      },
      {
        "title": "Comment évaluer le risque?",
        "points": [
          "<strong>Volatilité</strong> : imprévisibilité des rendements; risque et rendement sont directement liés.",
          "<strong>Actions – mesures usuelles</strong> :\n    • <strong>Variance</strong> : dispersion des rendements autour du rendement espéré (plus la dispersion est grande, plus le risque est élevé).\n    • <strong>Écart type</strong> : racine carrée de la variance; mesure standard du risque des titres/portefeuilles.\n    • <strong>Bêta</strong> : sensibilité d’une action/portefeuille aux mouvements du marché; 1,0 ≈ même volatilité que le marché; >1,0 plus volatil; <1,0 moins volatil.",
          "<strong>Obligations – mesure clé</strong> :\n    • <strong>Duration</strong> : sensibilité du cours à une variation de 1 % des taux d’intérêt (variation approximative en % du prix). Plus la duration est élevée, plus le cours réagit.",
          "<strong>Diversification et corrélation</strong> :\n    • La diversification réduit le risque <strong>non systématique</strong>; elle n’élimine pas le <strong>risque de marché (risque systématique)</strong>.\n    • Ajouter des titres <strong>en parfaite corrélation positive (+1)</strong> ne réduit pas le risque; une <strong>corrélation négative parfaite (−1)</strong> maximise la réduction du risque (rare en pratique).\n    • L’ajout de titres faiblement corrélés réduit le risque total, avec des bénéfices décroissants; au-delà d’un certain nombre de titres, la réduction supplémentaire devient minime; il demeure un <strong>risque systématique</strong> incompressible.",
          "<strong>Bêta et alpha de portefeuille</strong> : le bêta agrégé renseigne sur la sensibilité du portefeuille au marché; l’<strong>alpha</strong> est le <strong>rendement excédentaire</strong> attribuable à la compétence de sélection."
        ]
      },
      {
        "title": "Qu’est-ce que l’analyse de portefeuille?",
        "points": [
          "Un <strong>portefeuille de placements</strong> est un ensemble de titres (obligations, actions, marché monétaire, produits dérivés, etc.), dont la caractéristique fondamentale est la <strong>diversification</strong>.",
          "L’objectif est de sélectionner des titres de façon à <strong>maximiser le rendement</strong> pour un <strong>risque global</strong> donné; la combinaison n’est pas une simple somme des parties (effet de synergie).",
          "La <strong>corrélation</strong> entre titres est l’outil d’évaluation clé pour vérifier si la combinaison réduit réellement le risque."
        ]
      },
      {
        "title": "Comment les portefeuilles sont-ils gérés?",
        "points": [
          "Le gestionnaire décide des <strong>achats/ventes</strong>, des <strong>pondérations sectorielles</strong> et de la <strong>répartition des actifs</strong>, selon l’évolution de l’économie.",
          "Deux philosophies :\n    • <strong>Gestion passive</strong> (ne pas « battre le marché »; diversification, suivi d’indice).\n    • <strong>Gestion active</strong> (recherche d’inefficiences; viser un <strong>rendement excédentaire</strong>). Le style dépend notamment de la vision de l’<strong>efficience des marchés</strong>. La <strong>synchronisation du marché</strong> (market timing) est une stratégie active.\n    • Avertissement légal : l’utilisation d’« information importante non publique » constitue un <strong>délit d’initié</strong>.",
          "<strong>Décision la plus déterminante</strong> : la <strong>répartition des actifs</strong> (quelles catégories détenir et en quelles pondérations). La <strong>répartition stratégique des actifs</strong> est la référence de long terme, suivie et <strong>rééquilibrée</strong> au besoin.",
          "Trouver la <strong>répartition stratégique</strong> : analyser des combinaisons d’actifs pour déterminer le portefeuille « optimal », puis retenir la combinaison adaptée à la <strong>tolérance au risque</strong> du client; possibilité d’écarts si cela demeure conforme au profil « connaître son client »."
        ]
      },
      {
        "title": "Quelles sont les méthodes d’analyse?",
        "points": [
          "<strong>Analyse de titres</strong> : évaluer les caractéristiques de <strong>risque</strong> et de <strong>rendement</strong> d’un titre. Deux approches principales :\n    • <strong>Analyse fondamentale</strong> : évalue les perspectives (court/moyen/long terme) des <strong>secteurs</strong> et <strong>sociétés</strong>; tient compte de la conjoncture des marchés et des <strong>perspectives économiques du Canada</strong> (et partenaires).\n    • <strong>Analyse technique</strong> : étude des <strong>cours historiques</strong> et du <strong>comportement du marché</strong> pour reconnaître des modèles.",
          "Contexte de marché : en période d’incertitude, le <strong>comportement de masse</strong> des investisseurs et la <strong>négociation assistée par ordinateur</strong> peuvent compliquer l’analyse technique (sur- ou sous-réactions collectives)."
        ]
      }
    ],
    "chapter": 8
  },
  "9": {
    "title": "Comprendre les états financiers",
    "sections": [
      {
        "title": "Que sont les états financiers?",
        "points": [
          "Les états financiers (préparés par la direction et vérifiés par des experts-comptables) résument comment une société s’est récemment comportée; ils sont essentiels à la sélection de titres.",
          "Au Canada, les sociétés ouvertes préparent leurs états conformément aux Normes internationales d’information financière (IFRS), des normes fondées sur des principes visant une information détaillée et utile à l’investisseur.",
          "Les quatre principaux états sont : état de la situation financière; état du résultat étendu; état des capitaux propres; état des flux de trésorerie (ce chapitre s’attarde surtout aux trois premiers).",
          "Rapport du vérificateur (quatre sections) : introduction (états visés); responsabilités de la direction; responsabilités du vérificateur et normes suivies; opinion sur la justesse des états (selon les IFRS)."
        ]
      },
      {
        "title": "Qu’est-ce que l’état de la situation financière?",
        "points": [
          "Présente la situation financière <strong>à une date donnée</strong> (souvent fin d’exercice; p. ex. les banques clôturent souvent le 31 octobre).",
          "Montre <strong>actif</strong>, <strong>passif</strong> et <strong>capitaux propres</strong>; relation fondamentale : <strong>Actif = Passif + Capitaux propres</strong>.",
          "<strong>Actif à court terme</strong> (convertible en espèces < ~1 an, p. ex. créances clients) vs <strong>actif à long terme</strong>.",
          "<strong>Passif</strong> : à court terme et à long terme (obligations financières de la société).",
          "<strong>Capitaux propres</strong> : comprennent les actions ordinaires et les <strong>bénéfices non répartis</strong> (bénéfices accumulés non distribués; décision de dividendes par le CA)."
        ]
      },
      {
        "title": "Qu’est-ce que l’état du résultat étendu?",
        "points": [
          "Présente <strong>produits</strong> et <strong>charges pour une période</strong> (trimestre ou année), à la différence de la « photo » à une date donnée fournie par l’état de la situation financière.",
          "<strong>Bénéfice brut</strong> = produits − coût des ventes (matières, main-d’œuvre, frais de fabrication).",
          "Charges typiques ensuite : frais d’administration et généraux, frais de vente, amortissement, intérêts débiteurs, impôt.",
          "<strong>Bénéfice (net)</strong> = chiffre d’affaires − toutes les charges, intérêts et impôts."
        ]
      },
      {
        "title": "Qu’est-ce que l’état des capitaux propres?",
        "points": [
          "Présente la somme des <strong>bénéfices non répartis</strong> depuis la création.",
          "Fait le <strong>lien</strong> entre l’état du résultat étendu et l’état de la situation financière :"
        ]
      },
      {
        "title": "Qu’est-ce que l’analyse des états financiers?",
        "points": [
          "Les gestionnaires et analystes s’appuient largement sur les états; <strong>l’analyse de ratios</strong> est l’outil le plus courant (un ratio exprime le lien entre deux mesures).",
          "Quatre <strong>familles de ratios</strong> : <strong>liquidité</strong>, <strong>analyse du risque/levier</strong>, <strong>rentabilité</strong>, <strong>rendement des titres</strong>.",
          "<strong>Prudence</strong> : un ratio isolé révèle peu; comparer aux pairs du même secteur et observer les <strong>tendances</strong> pluriannuelles.",
          "<strong>Ratio du fonds de roulement (ratio de liquidité générale)</strong> = <strong>Actif à court terme / Passif à court terme</strong>. Sert à juger la capacité de faire face aux obligations et à profiter d’occasions; l’insuffisance du fonds de roulement est une cause fréquente de faillite.",
          "<strong>Ratio de liquidité relative (quick ratio)</strong> = <strong>(Actif à court terme − stocks) / Passif à court terme</strong>; test plus prudent (les stocks sont parfois difficiles à convertir). En général, <strong>≥ 1:1</strong> indique une bonne liquidité; l’interprétation dépend aussi de la rotation des stocks.",
          "<strong>Ratio capitaux empruntés–capitaux propres (Debt/Equity)</strong> = <strong>Dette totale (CT+LT) / Capitaux propres</strong>; un niveau élevé peut signaler des emprunts excessifs et un risque financier accru.",
          "<strong>Ratio flux de trésorerie d’exploitation–endettement</strong> = <strong>Flux de trésorerie d’exploitation / Dette totale</strong> avec <strong>FTE = bénéfice + charges sans sortie de fonds (p. ex. amortissement) − ajouts non encaissés</strong>; évalue la capacité à rembourser les emprunts.",
          "<strong>Ratio de couverture des intérêts</strong> = <strong>BAII (bénéfice avant intérêts et impôts) / Intérêts débiteurs</strong>; mesure clé du risque des titres d’emprunt. Tenir compte <strong>de tous</strong> les intérêts; on évalue aussi des <strong>critères de couverture</strong> (p. ex. couverture multiple sur plusieurs exercices) et surtout la <strong>tendance</strong>. Plus la couverture est grande, plus la marge de sécurité est élevée.",
          "<strong>Marge bénéficiaire brute</strong> = <strong>(Produits − coût des ventes) / Produits</strong>; met en lumière le résultat après coût des ventes.",
          "<strong>Marge bénéficiaire nette</strong> = <strong>Bénéfice / Produits</strong>; indicateur synthèse de la qualité de la gestion (inclut charges et impôts).",
          "<strong>Rendement des capitaux propres (RCP/ROE)</strong> = <strong>Bénéfice / Capitaux propres</strong>; mesure la rentabilité générée sur le capital des actionnaires (suivre la tendance).",
          "<strong>Rotation des stocks</strong> = <strong>Coût des ventes / Stocks</strong>; plus le ratio est élevé (dans les normes du secteur), mieux l’équilibre stocks/ventes; trop élevé peut signaler des ruptures.",
          "<strong>Bénéfice par action ordinaire (BPA)</strong> = <strong>Bénéfice / nombre d’actions ordinaires en circulation</strong>; attention à la <strong>dilution</strong> potentielle (convertibles, options, bons).",
          "<strong>Rendement des actions (dividend yield)</strong> = <strong>Dividende annuel indiqué par action / cours de l’action</strong>; indique le pourcentage de rendement en dividendes.",
          "<strong>Ratio cours–bénéfice (C/B ou P/E)</strong> = <strong>Cours de l’action / BPA</strong>; très utilisé pour comparer des sociétés <strong>du même secteur</strong>; souvent calculé avec un <strong>BPA prévu</strong> (prudence avec les estimations).",
          "Comparer <strong>dans le temps</strong> (analyse des tendances) et <strong>avec des pairs</strong> (moyennes sectorielles) pour donner du sens aux ratios."
        ]
      }
    ],
    "chapter": 9
  },
  "10": {
    "title": "Les fonds communs de placement modernes",
    "sections": [
      {
        "title": "Qu’est-ce qu’un fonds commun de placement?",
        "points": [
          "Instrument de placement qui regroupe les sommes des épargnants pour investir dans divers titres (actions, obligations, instruments du marché monétaire) selon des politiques et objectifs précis du fonds. Les investisseurs deviennent actionnaires ou porteurs de parts et partagent revenus/charges/gains/pertes au prorata. Les parts/actions sont rachetables à la valeur de l’actif net par action (VANPA) ou par part (VANPP). Les objectifs et le degré de risque figurent dans le prospectus. Le représentant doit évaluer le profil du client (tolérance au risque, objectifs) et la convenance.",
          "Avantages (principaux):\n    • Gestion professionnelle peu coûteuse et suivie en continu (repérage de titres, ajustements).\n    • Diversification importante (60 à 100+ titres, 15–20 secteurs) et économies d’échelle; accès à une gamme plus vaste de valeurs et à des coûts d’opération moindres.\n    • Variété de catégories de fonds et possibilité de transferts au sein d’une même famille de fonds.\n    • Programmes d’achat/rachat variés; possibilité d’investir de petites sommes (p. ex., plans contractuels dès ~100 $).\n    • Liquidité: rachat à la valeur liquidative; paiements exigés dans les trois jours ouvrables (Règlement 81-102).\n    • Planification successorale simplifiée pendant l’homologation; définitions de succession/homologation.\n    • Nantissement de prêt et admissibilité à la marge (effet de levier — avantages/risques).\n    • Options spéciales (p. ex., réinvestissement des dividendes).\n    • Rapports réglementaires accessibles (notice annuelle, états financiers, rapport annuel) via SEDAR; tenue de registres utile pour la fiscalité et le suivi.",
          "Inconvénients (principaux):\n    • Coûts (frais d’acquisition, frais de gestion) historiquement élevés, bien que la concurrence ait réduit ces frais.\n    • Inadéquation pour le court terme/réserve d’urgence (sauf fonds du marché monétaire).\n    • Gestion professionnelle non infaillible (sensibilité au risque de marché).\n    • Complications fiscales (réalisations de gains imposables non alignées avec l’horizon de l’investisseur)."
        ]
      },
      {
        "title": "Structure organisationnelle des fonds communs de placement",
        "points": [
          "Deux formes juridiques: fiducie (à capital variable) ou société.",
          "Fiducie de fonds commun de placement:\n    • Exonération d’impôt au niveau du fonds si le revenu (intérêts/dividendes/gains en capital) est distribué aux porteurs de parts; l’imposition se fait dans les mains du porteur selon la nature du revenu et le type de compte.\n    • Déclaration/acte de fiducie: objectifs de placement, politique, restrictions, identification du fiduciaire/gestionnaire/dépositaire, catégories/séries de parts.\n    • Droits: rachat à la VANPP; droits de vote généralement limités; assemblée requise pour certaines décisions (p. ex., modification d’objectifs, changement de gestionnaire, nouveaux frais, fréquence du calcul de la VL) sous le Règlement 81-102.",
          "Société de fonds commun de placement:\n    • N’est pas « translucidement » imposée; peut atteindre un résultat similaire en déclarant des dividendes (imposables chez l’actionnaire) équivalents au bénéfice net.",
          "Gouvernance & fonctions clés:\n    • Conseil d’administration (société) ou fiduciaire(s) (fiducie): responsabilité ultime et conformité aux objectifs de placement; délégation de fonctions (gestion, distribution, garde, tenue des registres/transferts).\n    • Gestionnaire de fonds: gestion quotidienne, respect de l’acte/prospectus et Règlement 81-102; peut mandater des gestionnaires de portefeuille; maintien de liquidités; calcul de la valeur liquidative; préparation de l’aperçu du fonds/prospectus/notice; fiscalité; registres; rapports aux porteurs; instructions au dépositaire; perçoit des honoraires de gestion calculés quotidiennement et versés mensuellement; inscription obligatoire depuis fin 2010 (exigences de capital/assurance).\n    • Comité d’examen indépendant (CEI, Règlement 81-107): approuve/examine les situations de conflits d’intérêts (p. ex., opérations entre fonds, prises fermes par une entité apparentée); doit juger l’équité pour le fonds; rapport annuel aux porteurs si le gestionnaire ne suit pas ses recommandations.\n    • Distribution: par courtiers en valeurs mobilières, courtiers en épargne collective (et parfois marché dispensé); employés doivent se conformer aux lois/règlements, expliquer les caractéristiques, traiter les avis de rachat/achat et respecter KYC/convenance.\n    • Dépositaire: détient tous les actifs et effectue les décaissements (frais, achats de titres, paiements de rétrocessions, distributions/dividendes); peut aussi agir comme agent des registres/transferts; forte complexité (rompus, réinvestissements).\n    • Inscription en compte: pas de certificats physiques; opérations inscrites au compte tenu par l’agent des registres/transferts; relevés périodiques concordant avec les registres."
        ]
      },
      {
        "title": "Comment les fonds communs de placement sont-ils réglementés?",
        "points": [
          "Cadre général: réglementation provinciale/territoriale; trois principes fondamentaux pour les OPC — confiance, information, réglementation — soutenus par un code de déontologie (prudence, intégrité, justice, équité, honnêteté).",
          "OAR et rôles:\n    • ACFM (distribution des fonds communs de placement); OCRCVM demeure compétent pour ses membres; au Québec: Autorité des marchés financiers (surveillance) et Chambre de la sécurité financière (formation continue et code de déontologie).",
          "Règlements clés:\n    • Règlement 81-101: informations à fournir (prospectus de fonds commun de placement, notamment l’aperçu du fonds).\n    • Règlement 81-102: exigences/directives sur la création, l’exploitation, la distribution et la publicité des OPC.",
          "Obligations d’information des fonds:\n    • Documents visés: aperçu du fonds, prospectus simplifié, notice annuelle, états financiers (annuels vérifiés et/ou intermédiaires), autres renseignements requis (rapports sur changements importants, circulaires).\n    • L’aperçu du fonds doit être transmis à l’achat, sauf demande explicite des autres documents.",
          "Aperçu du fonds (format/contenu essentiel):\n    • Document concis, en langage simple, max. deux pages recto verso; comparabilité; livré avant l’achat (toutes catégories/séries).\n    • Droits de l’investisseur à inclure: droit d’annuler l’achat dans les 48 h suivant la confirmation; droits en cas de présentation inexacte des faits; délais provinciaux pour exercer ces droits; droit de demander le prospectus simplifié.\n    • Section « Information sur le fonds »: introduction (date, nom du fonds/gestionnaire, catégorie/série), aperçu (date de création, actif total, RFG, gestionnaire de portefeuille, politique de distribution, minimums), placements (mandat + 10 principaux titres et répartition), risques (cote: Faible à Élevé; rappel d’absence de garantie), rendement passé (rendements annuels jusqu’à 10 ans; meilleur/pire 3 mois; valeur d’un 1 000 $ et rendement composé), convenance (« À qui le fonds est-il destiné? »), fiscalité (« Un mot sur la fiscalité »).\n    • Section « Frais, droits et autres renseignements »: frais d’acquisition (à l’achat, réduits, différés, sans frais); frais du fonds (RFG, RFO, commission de suivi; présentés en % et par 1 000 $); autres frais (négociation à court terme, substitution, changement); information sur les droits (« Et si je change d’idée? »); coordonnées pour obtenir d’autres documents.",
          "Prospectus simplifié:\n    • Toujours déposé (et remis sur demande) malgré l’aperçu du fonds; plus court/simplifié qu’un prospectus d’actions ordinaires; déposé annuellement; format standardisé.\n    • Contenu: deux parties (A — renseignements généraux/famille de fonds; B — données spécifiques); peut couvrir plusieurs fonds d’une même famille; informations détaillées (but, autres documents; dénomination/constitution/activités; facteurs de risque/description des titres; méthode de tarification et frais d’acquisition; distribution des revenus; responsables (gestion/frais aux courtiers); RFG historique; objectifs/politiques; dividendes/distributions; fiscalité; litiges; vérificateurs/agents; droits de l’acquéreur; sommaire des frais)."
        ]
      }
    ],
    "chapter": 10
  },
  "11": {
    "title": "Fonds communs de placement prudents",
    "sections": [
      {
        "title": "Que sont les fonds du marché monétaire?",
        "points": [
          "<strong>Définition (CIFSC).</strong> Au moins 95 % de l’actif net total dans des <strong>titres du marché monétaire</strong> (instruments à revenu fixe, à court terme, très liquides, échéance ≤ 364 jours, facilement convertibles en espèces).",
          "<strong>Rendements & différences vs dépôts bancaires.</strong> Le rendement suit les <strong>taux à court terme</strong>; deux différences clés : (1) <strong>pas</strong> de garantie de la SADC ni d’un autre assureur; (2) la <strong>VLP</strong> par part peut fluctuer avec les taux.",
          "<strong>Objectif de placement.</strong> Produire des <strong>rendements stables</strong> via des placements à court terme : bons du Trésor (Canada/provinces), autres titres gouvernementaux très courts, <strong>papier commercial</strong> et <strong>acceptations bancaires</strong> de premier ordre. <strong>Règlement 81-102</strong> : <strong>temps à courir</strong> < 1 an pour chaque titre et <strong>durée de vie résiduelle moyenne</strong> du fonds <strong>≤ 90 jours</strong>.",
          "<strong>Risque.</strong> Capital et <strong>liquidité</strong> priorisés; <strong>faible volatilité</strong>; <strong>faible risque de défaillance</strong> (quasi nul pour titres étatiques; les titres de sociétés doivent être de <strong>très haute cote</strong>). <strong>Risque d’inflation</strong> : le rendement peut ne pas suivre la hausse des prix à long terme.",
          "<strong>Ce qu’on trouve dans les tableaux/fiche du fonds.</strong> Données de rendement (périodes standard), comparaison à un <strong>indice</strong>, répartition d’actifs/sectorielle, <strong>top 10</strong> positions, historique des <strong>distributions</strong>, profil du <strong>gestionnaire</strong>, historique/graphes de cours, <strong>frais</strong> (p. ex. gestion), admissibilité <strong>REER</strong>, <strong>minimums</strong>.",
          "<strong>Présentation des rendements (spécifique MM).</strong> La plupart <strong>assument VLP ≈ 10 $</strong> et publient un <strong>rendement récent</strong> plutôt que des variations de VLP. Deux mesures : <strong>rendement courant</strong> et <strong>rendement réel</strong> (tous deux fondés sur le <strong>rendement sur 7 jours</strong>). Données utilisées : <strong>≤ 45 jours</strong>.\n    • <strong>Rendement sur 7 jours</strong> = VLP fin / VLP début − 1.\n    • <strong>Rendement courant (annualisé)</strong> = (rendement 7 jours) × (365/7).\n    • <strong>Rendement réel (effectif)</strong> = (1 + rendement 7 jours)^(365/7) − 1 (prend la <strong>capitalisation</strong> en compte).\n    • <strong>Quand utiliser quoi</strong> : pour horizon court <strong>sans réinvestir</strong>, privilégier le <strong>courant</strong>; pour horizon plus long, privilégier le <strong>réel</strong> (capitalisé).",
          "<strong>Terminologie (dans le texte).</strong> _Rendement sur 7 jours, rendement courant, rendement réel, temps à courir jusqu’à l’échéance (durée de vie résiduelle)_."
        ]
      },
      {
        "title": "Que sont les fonds de créances hypothécaires?",
        "points": [
          "<strong>Nature & placements.</strong> Principalement <strong>créances hypothécaires résidentielles de grande qualité</strong>, souvent <strong>assurées en vertu de la LNH</strong>; petites portions en <strong>espèces</strong>, <strong>obligations</strong> ou <strong>titres adossés à des créances hypothécaires</strong>. Appartiennent aux <strong>fonds à revenu fixe</strong>.",
          "<strong>Comparatif de risque/volatilité.</strong> Classement (du moins au plus volatile) : <strong>fonds du marché monétaire</strong> → <strong>fonds de créances hypothécaires</strong> → <strong>fonds d’obligations</strong> → <strong>fonds de dividendes privilégiés</strong>.",
          "<strong>Principales caractéristiques des prêts.</strong> Un <strong>prêt hypothécaire</strong> est garanti par un immeuble et comporte : une <strong>période d’amortissement</strong> (pouvant aller jusqu’à <strong>25 ans</strong>, parfois plus) et une <strong>durée</strong> (6 mois à <strong>10 ans</strong>) au cours de laquelle un <strong>taux</strong> (fixe ou <strong>variable</strong>) s’applique.",
          "<strong>Composition & politiques (exemples de politiques types).</strong> Certains fonds limitent aux <strong>créances de premier rang assurées LNH</strong>; d’autres ajoutent <strong>titres d’emprunt</strong> fédéraux/provinciaux/municipaux ou <strong>sociétaires</strong>; d’autres encore investissent en <strong>créances commerciales/industrielles</strong> (montants unitaires plus élevés; <strong>durées</strong> plus longues que le résidentiel).",
          "**Risques clés.\n    • <strong>Risque de défaillance</strong> : généralement <strong>faible</strong> grâce à la <strong>diversification</strong> très large (portefeuilles contenant un très grand nombre de créances) et, souvent, à l’<strong>assurance</strong>.\n    • <strong>Volatilité</strong> : inférieure à celle des fonds d’obligations, supérieure aux MM.",
          "<strong>Rendements & distributions.</strong> Deux sources : <strong>intérêts</strong> (distribués <strong>au moins trimestriellement</strong>, souvent <strong>mensuellement</strong>) et <strong>gains en capital</strong> (distribués <strong>annuellement</strong>).",
          "<strong>Convenance (profil type).</strong> Convient aux épargnants cherchant <strong>revenu régulier</strong> avec <strong>faible tolérance au risque</strong>, lorsque le portefeuille vise des <strong>créances assurées de premier rang</strong>.",
          "<strong>Terminologie (dans le texte).</strong> _Créance hypothécaire de premier rang assurée (LNH); période d’amortissement; durée_."
        ]
      },
      {
        "title": "Que sont les fonds d’obligations et les autres fonds de titres à revenu fixe?",
        "points": [
          "**Fonds d’obligations (généraux).\n    • <strong>Objectifs</strong> : <strong>revenu courant élevé</strong> avec <strong>certaine croissance du capital</strong>; placements dans <strong>titres d’emprunt de grande qualité</strong> (gouvernement du Canada, provinces, sociétés) avec <strong>temps à courir</strong> <strong>\\> 1 an</strong>.\n    • <strong>Sensibilité aux taux (notion de duration).</strong> Le <strong>risque de taux d’intérêt</strong> est <strong>central</strong> pour obligations, créances hypothécaires et actions privilégiées. <strong>Duration</strong> : mesure (en <strong>années</strong>) de la <strong>sensibilité</strong> du prix d’une obligation (ou d’un portefeuille) aux variations des taux; outil de gestion du <strong>risque de taux</strong> en fonction des <strong>objectifs</strong> et des <strong>perspectives</strong> du gestionnaire.",
          "**Fonds d’obligations à court terme.\n    • <strong>Objectifs</strong> : <strong>préserver le capital</strong> et générer un <strong>revenu courant supérieur</strong> à celui des fonds du marché monétaire; potentiel de gains en capital <strong>limité</strong> (durée courte).\n    • <strong>Appellation “marché monétaire”</strong> : réservée aux fonds dont <strong>tous</strong> les titres ont <strong>≤ 364 jours</strong> de <strong>temps à courir</strong>; d’où la distinction claire entre <strong>fonds MM</strong> et <strong>fonds d’obligations à court terme</strong>.",
          "**Fonds de dividendes privilégiés.\n    • <strong>Objectif</strong> : <strong>revenu de dividendes courant</strong> tout en <strong>préservant le capital</strong>; potentiel de gains en capital <strong>limité</strong>.\n    • <strong>Pourquoi viser des dividendes?</strong> (1) Les titres versant dividendes (actions <strong>privilégiées</strong> et parfois <strong>ordinaires</strong> d’entreprises solides) portent un <strong>profil de risque plus élevé</strong> que les obligations ⇒ <strong>rendements</strong> attendus plus élevés; (2) Les <strong>dividendes de source canadienne</strong> sont <strong>moins imposés</strong> (crédit d’impôt pour dividendes).\n    • <strong>Portefeuille typique</strong> : forte part en <strong>actions privilégiées</strong> de <strong>grande qualité</strong> (cotes <strong>P1/P2</strong>). <strong>Risque principal</strong> : <strong>risque de taux d’intérêt</strong> (sensibilité du prix des privilégiées). <strong>Distributions</strong> : dividendes <strong>mensuels/trimestriels</strong>; gains en capital <strong>annuels</strong>; pour l’<strong>efficience fiscale</strong>, le revenu de dividendes doit provenir de <strong>sociétés canadiennes</strong>.",
          "<strong>Comparatif global de volatilité (rappel utile).</strong> Moins → plus volatils : <strong>MM</strong> → <strong>créances hypothécaires</strong> → <strong>obligations</strong> → <strong>dividendes privilégiés</strong>."
        ]
      }
    ],
    "chapter": 11
  },
  "12": {
    "title": "Chapitre 12 : Fonds communs de placement plus risqués",
    "sections": [
      {
        "title": "Que sont les fonds d’actions?",
        "points": [
          "**Définition & objectif",
          "**Trois types (classification du chapitre)",
          "**Solution de rechange",
          "**Produits dérivés (utilisation encadrée)",
          "**Rendements & volatilité (repères du chapitre)"
        ]
      },
      {
        "title": "Que sont les fonds équilibrés?",
        "points": [
          "**Définition & objectifs",
          "**Gestion & répartition",
          "**Rendements & risque",
          "**Fonds à date cible (type de fonds équilibré)"
        ]
      },
      {
        "title": "Que sont les fonds mondiaux?",
        "points": [
          "**Définition & portée",
          "**Objectifs",
          "**Pourquoi investir (selon le texte)",
          "**Risque de change & couverture",
          "**Autres risques spécifiques",
          "**Nature des rendements & fiscalité (selon le chapitre)"
        ]
      },
      {
        "title": "Que sont les fonds spécialisés?",
        "points": [
          "**Définition",
          "**Profil de risque",
          "**Catégories fréquentes dans le chapitre (terminologie)",
          "<strong>Comptes intégrés de fonds communs de placement</strong> (structure regroupant plusieurs fonds)"
        ]
      }
    ],
    "chapter": 12
  },
  "13": {
    "title": "Chapitre 13 : Produits gérés alternatifs",
    "sections": [
      {
        "title": "Que sont les billets à capital protégé (BCP)?",
        "points": [
          "**Définition/structure\n    • Instrument d’emprunt avec <strong>date d’échéance</strong>; remboursement du <strong>capital</strong> à l’échéance. Intérêt versé à l’échéance ou par <strong>paiements liés au rendement positif</strong> d’un <strong>actif sous-jacent</strong> (actions, indices, fonds, FNB, marchandises, fonds de couverture).",
          "**Émetteurs et rôles (Canada)\n    • Émis par les <strong>six grandes banques</strong>. Rôles : <strong>garant</strong> (remboursement du capital; dépend de la solvabilité), <strong>concepteur</strong> (sous-jacent, échéance, caractéristiques de paiement; souvent groupe dérivés actions), <strong>distributeur</strong> (division de courtage/tiers).",
          "**Transparence/réglementation\n    • <strong>Non couverts par la SADC</strong>, généralement <strong>sans prospectus</strong> (pas des valeurs mobilières); souvent <strong>aucun permis particulier</strong> requis pour la vente.",
          "**Coûts explicites courants\n    • <strong>Commissions</strong> (réduisent directement la valeur liquidative), <strong>frais de gestion</strong>, <strong>frais de rachat anticipé</strong> (barème typique 2–5 ans, décroissant), <strong>frais de structuration/garantie</strong>.",
          "**Coûts implicites courants\n    • <strong>Formules d’établissement de la moyenne du rendement</strong> (paiement basé sur un rendement moyen), <strong>plafond de participation au rendement</strong>, <strong>rendement sur le cours vs rendement total</strong> (exclut dividendes/intérêts → <strong>coût caché</strong>).",
          "**Avantages (soulignés dans le texte)\n    • Permet <strong>d’accéder</strong> à des marchés autrement inaccessibles avec de <strong>faibles montants</strong>, tout en <strong>protégeant le capital</strong>; peut <strong>rehausser le rendement</strong> d’espèces/quasi-espèces; utile pour forte <strong>aversion au risque</strong> (exposition sans prendre le risque direct).",
          "**Risques (résumé de fin de chapitre)\n    • <strong>Risque de marché</strong>, <strong>liquidité</strong>, <strong>crédit</strong>, <strong>change</strong>; <strong>moins de transparence</strong> que les FCP.",
          "**Avant d’investir (points à vérifier)\n    • <strong>Solvabilité</strong> de l’émetteur et <strong>levier</strong> utilisé; <strong>méthode de calcul</strong>/risques de l’actif sous-jacent; <strong>valeur du coût</strong> de la protection du capital."
        ]
      },
      {
        "title": "Que sont les fonds de couverture?",
        "points": [
          "**Définition et portée\n    • <strong>Fonds de capitaux peu réglementés</strong>; large <strong>latitude</strong> stratégique (ventes à découvert, dérivés pour levier/spéculation, arbitrage); investissent <strong>dans tout type de marché</strong>. Les <strong>fonds communs de placement alternatifs</strong> (fonds alternatifs liquides) sont une autre structure qui utilise des stratégies alternatives.",
          "**Comparaison (aperçu)\n    • Les FCP traditionnels, FCP <strong>alternatifs</strong> et <strong>fonds de couverture</strong> partagent certains mécanismes, mais se distinguent par objectifs, limites de vente à découvert, concentration, fréquence de calcul de la VANPA, etc. (voir tableau 13.4 dans le texte).",
          "**Avantages\n    • <strong>Rendements absolus</strong> plutôt que relatifs; <strong>faible corrélation</strong> avec les actifs traditionnels; <strong>potentiel</strong> de volatilité <strong>inférieure</strong> et de rendement <strong>supérieur</strong>.",
          "**Risques majeurs\n    • <strong>Faible surveillance réglementaire</strong> (manque de transparence), <strong>risque de marché</strong> (premier ordre), <strong>contraintes de liquidité</strong> (impossibilité de liquider rapidement), <strong>risques liés à la négociation/stratégies</strong> (deuxième ordre; complexité).",
          "**Accès/Distribution (marché dispensé)\n    • Généralement <strong>vendus sans prospectus</strong> à des <strong>investisseurs dispensés</strong> (institutionnels et particuliers qualifiés). Dispenses : <strong>investisseur qualifié</strong> (p. ex. > <strong>1 M$</strong> d’<strong>actifs financiers</strong> nets; <strong>revenu</strong> net > <strong>200 k$</strong> ou 300 k$ avec conjoint pendant 2 ans; ou <strong>actif net</strong> ≥ <strong>5 M$</strong>), <strong>souscription minimale</strong> (150 k$ pour personnes morales), <strong>notice d’offre</strong> (droits de désengagement/poursuite; limites; formulaire de reconnaissance du risque).\n    • <strong>Droit de désengagement</strong> : absent pour les fonds de couverture (comparativement aux FCP).",
          "**Stratégies (catégories)\n    • Trois grandes familles : <strong>valeur relative</strong>, <strong>événementielle</strong>, <strong>directionnelle</strong> (avec profils de risque/rendement croissants).",
          "**Diligence raisonnable – à vérifier\n    • <strong>Antécédents</strong> (≥ <strong>2 ans</strong>; <strong>≥ 25 M$</strong> d’actifs), <strong>adéquation risque</strong> vs profil client, <strong>expérience du gestionnaire</strong>, <strong>structure de frais</strong> (incluant rémunération au rendement avec <strong>niveau maximal enregistré</strong>), <strong>levier</strong>, <strong>liquidité</strong>, <strong>statistiques de rendement</strong> sur plusieurs cycles, <strong>fiscalité</strong>, <strong>exposition au change</strong>."
        ]
      },
      {
        "title": "Que sont les fonds à capital fixe?",
        "points": [
          "**Définition/structure\n    • Fonds géré <strong>négocié en bourse</strong> avec <strong>nombre déterminé d’actions</strong> (varie rarement : émissions supplémentaires, dividendes en actions, rachats).",
          "**Frais et négociation\n    • <strong>Frais de gestion</strong> prélevés à même l’actif; <strong>généralement inférieurs</strong> à ceux des FCP (rotation plus faible, coûts de commercialisation moindres). <strong>Achat/vente via courtage</strong>, comme un titre individuel.",
          "**Avantages\n    • Accès à des techniques non disponibles aux FCP (p. ex. <strong>vente à découvert</strong>, <strong>effet de levier</strong>); <strong>souplesse</strong> pour des <strong>stratégies à long terme</strong> (pas de flux imprévisibles), <strong>pleinement investis</strong> plus souvent; <strong>suivi ACB</strong> facilité; <strong>RFG</strong> potentiellement plus faible qu’un fonds à capital variable.",
          "**Risques\n    • <strong>Écart cours–VLI</strong> (escompte/prime) pouvant s’<strong>accentuer</strong> en marchés volatils; <strong>liquidité</strong> moindre (trouvent acheteurs/vendeurs sur le marché; courtage à l’achat et à la vente); <strong>risque d’effet de levier</strong>; <strong>ne se négocient pas nécessairement à la VLI</strong>.",
          "**Avant d’investir\n    • Comprendre l’<strong>escompte/prime</strong> vs la VLI; évaluer si l’<strong>escompte</strong> est <strong>en deçà</strong> des <strong>normes historiques</strong> (peut signaler problèmes : stratégie, changement/contre-performance du gestionnaire, hausse des frais, coûts extraordinaires)."
        ]
      },
      {
        "title": "Que sont les fonds négociés en bourse (FNB)?",
        "points": [
          "**Définition et fonctionnement\n    • <strong>Paniers de titres</strong> constitués comme des FCP, <strong>négociés comme des actions</strong>; visent à <strong>répliquer</strong> un <strong>indice</strong> (rendement suit l’indice); <strong>négociation intrajournalière</strong> à la bourse.",
          "**Avantages (tableau 13.7)\n    • <strong>« Acheter le marché »</strong> (diversification en une opération), <strong>gestion professionnelle</strong>, <strong>RFG inférieurs</strong> (souvent), <strong>coûts d’exploitation</strong> inférieurs, <strong>moins d’incidence des soldes en espèces</strong>, <strong>efficience fiscale</strong> (faible rotation → moins de distributions).",
          "**Risques\n    • Soumis aux <strong>mêmes risques</strong> que les titres individuels : <strong>marché</strong>, <strong>sectoriel</strong>, <strong>négociation</strong>, <strong>change</strong>; <strong>erreur de suivi</strong> (réplication partielle); <strong>risque de concentration</strong> (poids sectoriels/valeurs dominantes); <strong>écart vs VLI</strong> et <strong>liquidité</strong> du marché.",
          "**Coûts\n    • <strong>Courtage</strong> à l’achat/vente; <strong>frais de gestion, de distribution et autres frais d’exploitation</strong> (tendance à être inférieurs à des FCP comparables). <strong>RFG typiques au Canada ~0,17 % à 1,70 %</strong> (étrangers jusqu’à <strong>~1 %</strong>; émergents souvent plus élevés).",
          "**Avant d’investir\n    • Vérifier l’<strong>actif sous-jacent</strong> suivi; pour les <strong>FNB spécialisés</strong> (or, pétrole, immobilier, etc.), exiger <strong>faibles coûts</strong> et <strong>haute liquidité</strong>."
        ]
      },
      {
        "title": "Que sont les fonds distincts?",
        "points": [
          "**Définition/garanties\n    • <strong>Contrats d’assurance</strong> à deux volets : <strong>placement</strong> (rendement) + <strong>police</strong> (couverture du risque). Ressemblent aux FCP (mêmes risques de <strong>marché</strong> et <strong>gestion pro</strong>), mais assortis d’une <strong>garantie à l’échéance</strong> et d’une <strong>prestation de décès</strong> (protection du <strong>capital</strong> selon le plus élevé : montant investi vs valeur marchande).",
          "**Détention/échéance\n    • <strong>Rachat en tout temps</strong>, mais pour être admissible à la <strong>garantie</strong>, il faut généralement <strong>détenir ~10 ans</strong>; vente avant l’échéance → reçoit la <strong>valeur marchande</strong> (peut être < montant initial).",
          "**Réglementation/vente\n    • Régis par les <strong>organismes provinciaux d’assurance</strong>; <strong>permis d’assurance</strong> requis pour la vente.",
          "**Coûts\n    • <strong>RFG plus élevé</strong>; s’ajoutent <strong>frais liés</strong> aux <strong>garanties</strong> (échéance/décès), ainsi que frais usuels (transfert, administration, vente, gestion).",
          "**Variantes – Fonds à portefeuille de fonds\n    • Investissent <strong>dans d’autres fonds</strong> (diversification en un seul placement); <strong>frais de gestion habituellement plus élevés</strong> (répartition d’actif + frais des fonds sous-jacents).",
          "<strong>BCP</strong> : accès à plus de marchés avec protection du capital; attention aux <strong>coûts explicites/implicites</strong>; risques : marché, liquidité, crédit, change.",
          "<strong>Fonds de couverture</strong> : visent des <strong>rendements absolus</strong>; <strong>faible corrélation</strong>; risques élevés liés aux <strong>stratégies</strong> et à la <strong>surveillance</strong>.",
          "<strong>Fonds à capital fixe</strong> : <strong>négociés en bourse</strong>, nombre d’actions fixe; <strong>opportunités</strong> (levier/vente à découvert) mais <strong>écart vs VLI</strong> et <strong>liquidité</strong> à surveiller.",
          "<strong>FNB</strong> : <strong>paniers indexés</strong>, <strong>frais</strong> bas, <strong>efficience fiscale</strong>; risques de <strong>marché</strong>, <strong>négociation</strong>, <strong>change</strong>, <strong>erreur de suivi</strong>.",
          "<strong>Fonds distincts</strong> : <strong>placement + assurance</strong>, garanties (échéance, décès), avantages comme <strong>insaisissabilité</strong> possible; attention au <strong>RFG</strong> plus élevé."
        ]
      }
    ],
    "chapter": 13
  },
  "14": {
    "title": "Chapitre 14 : Comprendre le rendement des fonds communs de placement",
    "sections": [
      {
        "title": "Comment le rendement du portefeuille est-il évalué?",
        "points": [
          "<strong>But de l’évaluation</strong> : vérifier si le gestionnaire a fait mieux ou pire que des <strong>fonds comparables</strong> ou qu’un <strong>indice de référence</strong> prédéterminé, sur une <strong>période d’évaluation</strong> donnée.",
          "<strong>Comparaison aux pairs</strong> : succès mesuré en comparant le <strong>taux de rendement total</strong> du portefeuille à la <strong>moyenne de portefeuilles semblables</strong> (normes du secteur).",
          "<strong>Sources de comparaison publiées</strong> : utiliser les <strong>Survey of Funds</strong> dans les publications financières pour situer un portefeuille et chacune de ses composantes (ex. composante actions).",
          "<strong>Valeur de référence précisée dans l’EPP</strong> : l’<strong>énoncé de politique de placement</strong> définit la référence; un repère courant = <strong>taux des bons du Trésor + marge</strong> (p. ex. +4 %).",
          "<strong>Indice de référence pertinent</strong> : toujours comparer à un <strong>indice qui reflète l’univers de placement</strong> du fonds (ex. S&P/TSX pour actions canadiennes; S&P 500; MSCI EAFE; FTSE Canada univers obligataire; T-bons 91 j)."
        ]
      },
      {
        "title": "Comment effectuer une évaluation du rendement?",
        "points": [
          "<strong>Rendement total (VANPA)</strong> : calculer la <strong>variation de la VANPA</strong> entre début et fin de période, <strong>dividendes réinvestis</strong>, et exprimer le gain en % de la VANPA initiale. Formule :",
          "<strong>Comparer sur des périodes identiques</strong> et utiliser des <strong>fournisseurs de données</strong> reconnus (p. ex. Morningstar, Globefund).",
          "**Rendement pondéré en fonction du risque (ratio de Sharpe)\n    • <strong>Idée</strong> : intègre <strong>rendement</strong> et <strong>risque</strong> (écart type).\n    • <strong>Formule</strong> : Sp=Rp−RfσpS_p = \\\\dfrac{R_p - R_f}{\\\\sigma_p}Sp​=σp​Rp​−Rf​​ où RfR_fRf​ = taux hors risque (souvent bons du Trésor 3 mois).\n    • <strong>Lecture</strong> : plus SpS_pSp​ est <strong>grand</strong>, meilleure est la performance; Sp<0S_p<0Sp​<0 → rendement <strong>sous</strong> le taux hors risque.",
          "<strong>Autres facteurs à considérer</strong> : différences d’<strong>objectifs</strong>, <strong>restrictions</strong> et <strong>profils de risque</strong> entre portefeuilles; privilégier <strong>résultats à long terme</strong> et <strong>stabilité</strong> des rendements.",
          "<strong>Mesures de volatilité/réaction au marché</strong> : regarder <strong>écart type</strong>, <strong>bêta</strong>, années en <strong>perte</strong>, <strong>pires périodes</strong> (annuelles/trimestrielles/mensuelles); comprendre le comportement en <strong>marché haussier/baissier</strong>."
        ]
      },
      {
        "title": "Comment les univers de comparaison sont-ils utilisés?",
        "points": [
          "<strong>Définition</strong> : comparer le rendement d’un fonds à un <strong>groupe de fonds au mandat similaire</strong> (univers de comparaison / univers de rendement).",
          "<strong>Construction & données</strong> : univers élaborés par des <strong>sociétés d’évaluation</strong> (p. ex. <strong>Morningstar</strong>, <strong>Globefund</strong>) qui publient régulièrement les résultats.",
          "<strong>Interprétation standard</strong> : fonds <strong>surclasse</strong> si son rendement dépasse la <strong>moyenne</strong> du groupe pour la même période; fonds <strong>sous-performe</strong> si inférieur.",
          "<strong>Pièges à éviter (comparabilité)</strong> :\n    • Ne pas comparer des <strong>fonds dissemblables</strong> (objectifs/risques différents).\n    • Attention aux <strong>mauvais appariements</strong> (p. ex. fonds dits « actions canadiennes » détenant des actions non canadiennes → on compare des <strong>pommes et oranges</strong>).\n    • Des univers trop <strong>vagues</strong> ou <strong>petits</strong>, ou avec profils de <strong>risque divergents</strong>, faussent la comparaison.",
          "<strong>Erreur systématique de survie</strong> : univers souvent <strong>biaisé vers les survivants</strong> (fonds liquidés exclus), ce qui <strong>gonfle</strong> les rendements de l’univers; la position relative d’un gestionnaire <strong>peut se détériorer</strong> à mesure que l’historique s’allonge.",
          "<strong>Différences de méthodologie entre fournisseurs</strong> : un même gestionnaire peut apparaître <strong>dans la moitié supérieure</strong> dans un univers et <strong>dans la moitié inférieure</strong> dans un autre."
        ]
      },
      {
        "title": "Comment le classement par quartile est-il utilisé?",
        "points": [
          "<strong>Principe</strong> : classement des fonds en <strong>4 blocs égaux</strong> (quartiles) <strong>au sein du même univers</strong> de fonds comparables.",
          "<strong>Lecture</strong> :\n    • <strong>1er quartile</strong> = meilleurs rendements; <strong>4e quartile</strong> = pires rendements.\n    • Dans la pratique, viser la <strong>stabilité</strong> (souvent 1er–2e quartiles) plutôt qu’un 1er quartile <strong>chaque année</strong> (difficile).",
          "<strong>Mise en garde</strong> : les <strong>classements à court terme</strong> (ex. 1 an) sont <strong>volatils</strong>; privilégier des <strong>périodes plus longues</strong> et la <strong>constance</strong>."
        ]
      },
      {
        "title": "Annexes utiles (du chapitre)",
        "points": [
          "<strong>Rappel “indices de référence”</strong> (exemples du tableau 14.1) : S&P/TSX (actions canadiennes), S&P/TSX 60 (forte capitalisation), S&P 500 (actions US), MSCI EAFE (hors Amérique du Nord), <strong>FTSE Canada univers obligataire</strong> (obligations), <strong>FTSE Canada T-bons 91 j</strong> (espèces/MMF)."
        ]
      }
    ],
    "chapter": 14
  },
  "15": {
    "title": "<strong>CHAPITRE 15 — Choisir un fonds commun de placement (notes d’étude)</strong>",
    "sections": [
      {
        "title": "Quelle est l’incidence de la volatilité sur les rendements des fonds communs de placement?",
        "points": [
          "Le profil risque-rendement d’un fonds découle directement des titres détenus; en pratique, fonds du marché monétaire < fonds d’obligations < fonds d’actions en termes de risque, et inversement pour le rendement espéré.",
          "La volatilité d’un fonds varie d’un fonds à l’autre même au sein d’une même catégorie; p. ex., un fonds d’obligations à coupon zéro peut être plus volatil qu’un fonds obligataire « classique » en période de volatilité des taux.",
          "Mécanique des cours : quand l’information nouvelle arrive, elle modifie la perception de valeur, entraîne achats/ventes et fait bouger les prix (source première de volatilité).",
          "Risque spécifique (« risque unique ») vs risque de marché (systématique) :\n    • Le risque spécifique provient de la sensibilité d’un titre aux nouvelles propres à l’émetteur; il s’atténue par la diversification d’un portefeuille bien diversifié.\n    • Le risque de marché affecte des catégories entières de titres et ne peut pas être éliminé par diversification; tous les fonds (sauf marché monétaire) y sont exposés à des degrés divers.",
          "Autres sources de volatilité et leviers de réduction (Tableau 15.1) :\n    • Risque spécifique → Diversification.\n    • Risque de défaillance → Éviter la spécialisation en obligations de sociétés.\n    • Risque de marché → Aucune (non diversifiable).\n    • Risque de change → Couverture.\n    • Risque de taux d’intérêt → Éviter la spécialisation en titres à revenu fixe.",
          "Idée clé : la volatilité d’un fonds résulte de l’interaction de plusieurs risques; des portefeuilles de composition différente → volatilités différentes."
        ]
      },
      {
        "title": "Quelles sont les étapes à suivre dans le choix d’un fonds commun de placement?",
        "points": [
          "<strong>Définir l’univers pertinent</strong> (classification CIFSC par catégories : p. ex., actions, revenu, équilibrés, obligations, spécialisés, etc.) pour comparer des fonds aux objectifs semblables.",
          "<strong>Rassembler les données de rendement</strong> (périodes de 1 mois jusqu’à depuis la création, comparaison à un indice, répartition de l’actif, 10 plus grosses positions, frais, etc.).",
          "<strong>Se concentrer sur les objectifs de placement appropriés</strong> : ne pas comparer un fonds du marché monétaire à un fonds d’actions; comparer « pommes avec pommes ».",
          "<strong>Privilégier le meilleur rendement à long terme</strong> (p. ex., rendement composé 10 ans; inclut réinvestissement et frais du fonds, hors frais d’investisseur). Attention aux fonds trop récents (1–3 ans).",
          "<strong>Examiner la stabilité d’année en année</strong> (taux de rendement simple = rendement gagné sur une période donnée; viser la variation la plus faible à rendements LT comparables).",
          "<strong>Mesurer la volatilité et le risque</strong> :\n    • Écart type (dispersion des rendements). (Terme clé du chapitre.)\n    • Ratio rémunération-risque = Rendement du fonds ÷ Écart type (rendement par unité de risque).\n    • Ratio de Sharpe = (Rendement du fonds – taux des bons du Trésor) ÷ Écart type; compare fonds entre eux et à l’indice de référence; plus élevé = meilleur pour un même risque.\n    • Bêta : relation entre volatilité du fonds d’actions et celle du marché boursier en général.\n    • (Rappel utile du ch. 14 : interprétation du Sharpe vs référence.)",
          "<strong>Vérifier qui a généré la performance</strong> (continuité du gestionnaire en place).",
          "<strong>Comparer l’aperçu/prospectus</strong>, <strong>évaluer les frais et dépenses</strong> et <strong>analyser la taille du fonds (actifs sous gestion)</strong> avant la décision finale.",
          "<strong>Rappels terminologiques</strong> (du chapitre) : Taux de rendement simple; Ratio rémunération-risque; Ratio de Sharpe; Bêta; Alpha (rendement excédentaire ajouté par la gestion)."
        ]
      },
      {
        "title": "De quels autres éléments faut-il tenir compte pour analyser et choisir des fonds?",
        "points": [
          "<strong>Quatre grands volets à évaluer</strong> : <strong>Personnel</strong>, <strong>Philosophie</strong>, <strong>Processus</strong>, <strong>Rendement</strong>.\n    • <strong>Personnel</strong> : importance critique d’évaluer le gestionnaire et l’équipe qui gèrent le fonds. Approche « d’équipe » = meilleure continuité/relève.\n    • <strong>Philosophie (styles de gestion)</strong> : conception cohérente de la façon dont les marchés fonctionnent; styles attendus par classe d’actifs.\n    • <strong>Titres de participation</strong> (Tableau 15.2) :\n    • Gestion axée sur la <strong>valeur</strong> : acheter sous la valeur de l’actif; horizon LT (≥ 5 ans).\n    • Gestion axée sur la <strong>croissance</strong> : miser sur la hausse des bénéfices futurs; secteurs en expansion; R-D élevée; rendements du capital élevés.\n    • <strong>Rotation sectorielle</strong> : surpondérer les secteurs qui devraient surperformer selon le cycle.\n    • <strong>Placement momentum</strong> : prolongement des hausses de bénéfices/cours; modèles quantitatifs/techniques; risque/rotation élevés; souvent plus concentré sectoriellement.\n    • <strong>GARP (croissance à bon prix)</strong> : croissance recherchée mais en évitant les multiples trop élevés (mélange croissance/valeur).\n    • <strong>Titres à revenu fixe</strong> (Tableau 15.3) :\n    • <strong>Anticipation des taux d’intérêt</strong> : arbitrer duration (bons très court terme ↔ obligations LT) selon vues de taux; sensibilité ↑ avec échéance et ↓ taux nominal.\n    • <strong>Sélection de titres</strong> : analyse fondamentale/crédit/quantitative des obligations (flux, probabilité de paiement, facteurs macro/sectoriels/émetteur).\n    • <strong>Négociation sectorielle</strong> : ajuster les pondérations par segments obligataires selon valeur relative/techniques (offre/demande); accepter du risque de taux pour accroître le rendement dans certains secteurs.\n    • <strong>Processus</strong> : outils et coordination (comptes rendus de visites, critères de présélection/sélection, modèles exclusifs, fourchettes de pondération, nb min/max de titres, suivi des risques, règles de vente). Un bon processus est rigoureux et reproductible.\n    • <strong>Rendement</strong> : au-delà de la valeur ajoutée vs indice; tenir compte de l’uniformité et de la fréquence de surperformance <strong>par unité de risque</strong> et de la constance du style. Difficile à prévoir; on privilégie l’analyse sur longue période.",
          "<strong>Analyse du style & dérive du style</strong> :\n    • <strong>Pourquoi</strong> : plus la dérive du style est grande, plus il est difficile d’attribuer la performance à la compétence plutôt qu’au hasard.\n    • <strong>Deux méthodes</strong> :\n    • <strong>Fondée sur les rendements</strong> (Sharpe) : comparer 36–60 mois de rendements du fonds à des indices passifs de style (grande/petite capitalisation; valeur/croissance; obligations; quasi-espèces, etc.).\n    • <strong>Fondée sur le portefeuille</strong> : classer chaque titre selon des attributs (capitalisation, C/B, C/VC, rendement, etc.) pour construire un profil de style moyen comme référence personnalisée.",
          "Ratio rémunération-risque = Rendement du fonds ÷ Écart type.",
          "Ratio de Sharpe = (Rendement du fonds – taux des bons du Trésor) ÷ Écart type.",
          "Bêta : lien volatilité fonds d’actions ↔ marché. Alpha : rendement excédentaire attribuable à la gestion.",
          "Volatilité et rendements; Étapes de sélection; Autres éléments (Personnel, Philosophie, Processus, Rendement)."
        ]
      }
    ],
    "chapter": 15
  },
  "16": {
    "title": "Chapitre 16 : Frais et services des fonds communs de placement",
    "sections": [
      {
        "title": "Quels sont les frais des fonds communs de placement?",
        "points": [
          "**Deux grandes familles de frais\n    • <strong>Frais d’acquisition (commissions)</strong> : exigés des investisseurs à l’<strong>achat</strong> ou au <strong>rachat</strong> des parts. Fonds <strong>sans frais d’acquisition</strong> = aucun frais d’acquisition exigé.\n    • <strong>Frais de gestion</strong> : versés par le <strong>fonds</strong> à ses fournisseurs de services; débités du rendement; <strong>≈ 0,5 % à 3 %</strong> de l’actif net/an (peuvent dépasser).",
          "**Frais de suivi (commission de suivi / frais de service)\n    • Annuel, % fixe de l’actif; rémunère le <strong>service continu</strong> aux clients (≈ <strong>0,25 %</strong> MMF → <strong>1,00 %</strong> actions). Inclus dans les frais de gestion globaux.",
          "<strong>Frais à l’achat</strong> (aka <strong>frais d’acquisition à l’achat / frais à la souscription</strong>)\n    • Commission payée au moment d’acheter; <strong>augmente</strong> le <strong>prix de vente</strong> des parts → <strong>réduit</strong> le montant réellement investi. Formule du <strong>prix de vente</strong> (à partir de la <strong>VANPA</strong> et d’un pourcentage de frais).\n    • Communication à l’<strong>aperçu du fonds</strong> : % et <strong>somme</strong> sur le <strong>montant net investi</strong>.",
          "<strong>Frais au rachat</strong> (aka <strong>frais d’acquisition différés / à la rétrocession</strong>)\n    • Payés lors de la <strong>liquidation</strong>; barème <strong>décroissant</strong> au fil des années de détention (ex. 6 % → 0 %). Choix initiaux fréquents : <strong>frais à l’achat</strong> (série A) vs <strong>frais au rachat</strong> (série B).",
          "**Autres frais (exemples usuels)\n    • <strong>Frais de transfert</strong> (pouvant atteindre <strong>2 %</strong> dans certains cas), <strong>frais pour opérations fréquentes</strong> (dissuasion), <strong>frais de fiduciaire/administration</strong> (REER/FERR/REEE), <strong>frais d’établissement</strong>, <strong>frais de fermeture de compte</strong>.",
          "**Frais payés par le fonds (à même l’actif)\n    • <strong>Frais de gestion</strong> (rémunèrent le <strong>promoteur du fonds</strong>), <strong>frais d’exploitation</strong> (intérêt, dépôt réglementaire, impôts, juridiques/vérification, fiduciaire/dépositaire/garde, service aux investisseurs, documents réglementaires). Réduisent la <strong>valeur liquidative</strong>.",
          "**Indicateurs de coûts\n    • <strong>RFG (ratio des frais de gestion)</strong> = frais de gestion + <strong>frais d’exploitation</strong> / actif net moyen (toujours <strong>\\></strong> frais de gestion seuls). <strong>Facteurs</strong> influençant le RFG : <strong>catégorie d’actifs</strong>, <strong>taille du fonds</strong>, <strong>gestionnaire/sous-conseiller</strong>, <strong>frais de suivi/service</strong>.",
          "**Coûts explicites vs implicites\n    • <strong>Explicites</strong> : <strong>frais de gestion</strong>, <strong>frais d’exploitation</strong>, <strong>frais d’acquisition</strong> (voir <strong>RFG</strong>).\n    • <strong>Implicites</strong> : <strong>frais d’opération</strong> (courtage) reflétés via la <strong>rotation du portefeuille</strong>; mesurés par le <strong>RFO</strong>; <strong>charges du fonds = RFG + RFO</strong>.",
          "**Rotation & incidence\n    • Taux de rotation élevé → <strong>coûts supérieurs</strong>, <strong>passifs fiscaux</strong> possibles et difficulté accrue de <strong>surperformer</strong>; profits d’échelle de gros <strong>promoteurs</strong> (courtage moindre).",
          "**À retenir (sélection de fonds)\n    • Les <strong>coûts comptent</strong>, mais ne doivent pas être l’<strong>unique</strong> critère; comparer d’abord <strong>rendement/volatilité</strong>, puis les frais; l’impact des frais est <strong>plus lourd</strong> pour <strong>revenu fixe</strong>/<strong>marché monétaire</strong> et pour les <strong>indices</strong>."
        ]
      },
      {
        "title": "Que sont les plans d’épargne-achat?",
        "points": [
          "**Définition\n    • Achat <strong>périodique et automatique</strong> de parts (<strong>programme de placements préautorisés</strong> / <strong>plan d’épargne-achat</strong>).",
          "**Plan d’épargne-achat volontaire\n    • Le client <strong>choisit</strong> le <strong>montant</strong> et la <strong>fréquence</strong> (mens., trim., semestr., annuel); <strong>annulable</strong> en tout temps (frais minimes possibles). Montant minimal <strong>souvent inférieur</strong> à un achat non récurrent.",
          "**Avantages clés\n    • <strong>Discipline de placement</strong> + <strong>achats périodiques par sommes fixes</strong> (abaisse <strong>souvent</strong> le <strong>coût moyen</strong> à long terme; évite la <strong>synchronisation du marché</strong>)."
        ]
      },
      {
        "title": "Que sont les plans de retrait systématique?",
        "points": [
          "**Principe & droit de rachat\n    • Les fonds sont <strong>rachetables à vue</strong> à la <strong>VANPA</strong>; plutôt qu’un rachat total, le client met en place un <strong>plan de retrait systématique</strong> (fréquence prédéfinie).",
          "**5 types (calcul du versement)\n    • <strong>Plan de retrait de sommes fixes</strong> : montant <strong>fixe</strong> périodique; <strong>montant initial minimal</strong> requis fréquent; <strong>frais de service</strong> annuels possibles; si retraits > revenus+gains, <strong>réduction du capital</strong>; <strong>mention obligatoire</strong> au prospectus (« effritement/épuisement du capital »).\n    • <strong>Plan de retrait à pourcentage fixe</strong> : % de la <strong>valeur courante</strong>; <strong>montant variable</strong> selon le marché; techniquement, <strong>n’épuise pas</strong> totalement (sauf 100 %).\n    • <strong>Plan de retrait à délai fixe</strong> : versements sur une <strong>période déterminée</strong> jusqu’à liquidation complète; montant = valeur restante ÷ années restantes.\n    • <strong>Plan de retrait viager / en fonction de l’espérance de vie</strong> : identique au délai fixe, mais <strong>période = espérance de vie</strong> (tables de mortalité).\n    • <strong>Rentes / rente variable</strong> : contrat d’assurance (le <strong>rentier</strong> verse une somme; l’assureur paie des <strong>versements réguliers</strong>; la <strong>rente variable</strong> fluctue selon la valeur du fonds)."
        ]
      },
      {
        "title": "Comment les fonds communs de placement sont-ils imposés?",
        "points": [
          "**Deux sources d’imposition\n    • <strong>Distributions</strong> annuelles du fonds (<strong>intérêts</strong>, <strong>dividendes</strong>, <strong>gains en capital</strong>). Hors régime enregistré : <strong>feuillet T3</strong> (fiducie) ou <strong>T5</strong> (société); imposés dans l’année de <strong>réception</strong>.\n    • <strong>Gains/pertes en capital</strong> lors de la <strong>vente</strong> des parts par l’épargnant (rétrocession) : <strong>inclusion 50 %</strong> au revenu imposable; non indiqué sur le T5/T3 (car <strong>opération de l’épargnant</strong>, pas <strong>dans le fonds</strong>).",
          "**Distributions en fin d’année : impôts imprévus\n    • Achat <strong>peu avant</strong> une distribution de <strong>gains en capital</strong> → reçoit la <strong>distribution</strong> (au comptant ou réinvestie), <strong>VANPA</strong> baisse d’autant, mais <strong>impôt dû</strong> sur la distribution <strong>entière</strong> reçue.",
          "**Réinvestissement des distributions & VANPA\n    • Après distribution, la <strong>VANPA diminue</strong>; si <strong>réinvestie</strong>, l’épargnant détient <strong>plus de parts</strong> à une valeur <strong>moindre</strong> → <strong>valeur totale</strong> inchangée (illustration).",
          "**Prix de base rajusté (PBR)\n    • Réinvestir automatiquement le revenu (hors régime enregistré) <strong>augmente le PBR</strong>; sans suivi, risque de <strong>taxation double</strong>. Conserver relevés (souvent fournis) pour calcul précis.",
          "**Comptes enregistrés\n    • Rachat <strong>dans un compte enregistré</strong> : <strong>aucune</strong> conséquence fiscale immédiate (contrairement au compte non enregistré).",
          "<strong>Frais d’acquisition (à l’achat / au rachat / différés / à la rétrocession)</strong>, <strong>frais de gestion</strong>, <strong>frais d’exploitation</strong>, <strong>RFG</strong>, <strong>RFO</strong>, <strong>frais de suivi (commission de suivi / frais de service)</strong>, <strong>droit de rachat</strong>, <strong>programme de placements préautorisés</strong>, <strong>achats périodiques par sommes fixes</strong>, <strong>plan de retrait systématique</strong> (sommes fixes / % fixe / délai fixe / viager), <strong>rente / rente variable</strong>, <strong>VANPA</strong>, <strong>prix de base rajusté</strong>, <strong>relevés T3/T5</strong>, <strong>taux de rotation du portefeuille</strong>."
        ]
      }
    ],
    "chapter": 16
  },
  "17": {
    "title": "Chapitre 17 : Réglementation des courtiers en épargne collective",
    "sections": [
      {
        "title": "Quels sont le mandat et le champ de compétence des autorités en valeurs mobilières?",
        "points": [
          "Chaque province et territoire administre ses propres lois sur les valeurs mobilières via son autorité (p. ex., CVMO en Ontario; AMF au Québec). Collectivement, elles forment les Autorités canadiennes en valeurs mobilières (ACVM).",
          "Pouvoirs clés des autorités (trois catégories) :\n    • <strong>Inscription</strong> (formation/titres requis, évaluation de l’intégrité/compétence/solvabilité; pouvoir de suspendre/annuler; pouvoirs sur les bourses).\n    • <strong>Communication de l’information</strong> (prospectus complet, véridique et clair; rapports financiers; opérations d’initiés; information exacte et opportune).\n    • <strong>Mise en application</strong> (enquêtes, assignations, saisie de documents, poursuites, sanctions).",
          "Outils de normalisation publiés par les autorités : <strong>normes canadiennes (règlements)</strong> ayant force de loi et <strong>instructions générales</strong> (lignes directrices); certaines instructions sont provinciales."
        ]
      },
      {
        "title": "Quels sont les organismes d’autoréglementation?",
        "points": [
          "<strong>ACFM</strong> : OAR mandaté pour réglementer les courtiers en épargne collective (hors Québec); applique ses règles/politiques aux membres et à leurs représentants; supervise toutes les ventes de fonds communs de placement de ses membres.",
          "<strong>Québec</strong> : l’<strong>AMF</strong> est l’autorité principale pour les fonds communs de placement et délivre le droit de pratique.",
          "<strong>RCS (responsable de la conformité de la succursale)</strong> : requis pour chaque succursale inscrite comptant 4 représentants ou plus; surveille la conformité et le comportement des représentants."
        ]
      },
      {
        "title": "Quelles sont les exigences d’inscription?",
        "points": [
          "Doit être inscrit comme <strong>représentant de courtier en épargne collective</strong> dans chaque province/territoire où résident les clients.",
          "<strong>Base de données nationale d’inscription (BDNI)</strong> : demande électronique (Formulaire BDNI 33-109A4) + droits; Règlement 31-103 encadre l’inscription/rénovation.",
          "<strong>Parrainage/emploi unique</strong> : ne peut être employé/parrainé que par un seul courtier; <strong>activités extérieures</strong> interdites sans autorisation préalable (autorité en valeurs mobilières et OAR) et doivent être déclarées au courtier.",
          "<strong>Renseignements à fournir</strong> : historique d’emplois/entreprises/conduite; consentement pour <strong>casier judiciaire (GRC)</strong>; divulgation des <strong>mesures disciplinaires</strong>, <strong>infractions criminelles</strong>, <strong>faillites/arrangements</strong>, <strong>jugements civils/saisies-arrêts</strong>.",
          "<strong>Emploi dans une double fonction</strong> (p. ex., agent d’assurance vie) permis sous conditions établies par les autorités/OAR.",
          "<strong>Frais/cessation</strong> : droits annuels requis (sinon l’inscription échoit); suspension automatique à la cessation d’emploi; réactivation seulement avec avis écrit d’un nouveau courtier parrain."
        ]
      },
      {
        "title": "Comment respecter la règle « Bien connaître son client » (KYC/KYP)?",
        "points": [
          "<strong>But</strong> : disposer des détails complets (situation financière, objectifs, tolérance au risque) pour évaluer la <strong>convenance</strong>; obligation concomitante de <strong>Bien connaître son produit (KYP)</strong>.",
          "<strong>Quand réévaluer la convenance</strong> : transfert de compte; <strong>changement important</strong> de l’information; <strong>changement de représentant</strong>; s’applique aussi aux <strong>ordres non sollicités</strong>.",
          "<strong>Intérêt financier dans le compte</strong> : recueillir l’expérience/connaissances de toutes les personnes pouvant négocier; obtenir l’info KYC de toute personne ayant un intérêt financier (comptes conjoints, fiducies, etc.).",
          "<strong>Mise à jour de l’information client</strong> : tenir l’info à jour de façon continue; au moins une <strong>demande annuelle</strong> écrite au client; consigner la demande/réponse; approbation par la personne responsable; vérification de l’identité lors de changements d’identité/adresse/renseignements bancaires."
        ]
      },
      {
        "title": "Quelles sont les étapes à suivre pour ouvrir un compte de fonds commun de placement?",
        "points": [
          "<strong>Nouveaux comptes</strong> : examen/approbation en temps raisonnable par la personne responsable; <strong>aucun numéro de compte</strong> avant confirmation du <strong>nom légal complet</strong> et de <strong>l’adresse</strong>.",
          "<strong>FDOC (Formulaire de demande d’ouverture de compte)</strong> : requis pour chaque nouveau compte; <strong>jamais</strong> laisser un document <strong>« en blanc »</strong>; le FDOC consigne aussi les changements de renseignements.",
          "<strong>Contenu KYC minimal</strong> à documenter (si non inclus au FDOC, formulaire distinct) : renseignements personnels et financiers, <strong>tolérance au risque</strong>, <strong>objectifs de placement</strong>, <strong>statut d’initié/important actionnaire</strong>.",
          "<strong>Types de comptes</strong> : p. ex. conjoints/tenants communs; sociétés, successions, fiducies, sociétés de personnes; régimes collectifs; mineurs; clubs d’investissement; entités publiques/associations/lieux de culte (indiquer le type dans le FDOC).",
          "<strong>Information sur la relation avec le client</strong> (document normalisé, approuvé par siège/succursale; preuve de remise à conserver; informer le client des <strong>changements importants</strong>) :\n    • description de la <strong>nature et du type de compte</strong>; des <strong>produits et services</strong> du courtier/représentant; des <strong>procédures espèces/chèques</strong>; des <strong>obligations de convenance</strong> (même avec directives du client).\n    • <strong>explication des indices de référence</strong> et des options d’information supplémentaire."
        ]
      },
      {
        "title": "Quelles sont les pratiques commerciales interdites?",
        "points": [
          "<strong>Antidatation d’un ordre d’achat</strong> (interdite; la VANPA applicable dépend de l’heure de réception de l’ordre).",
          "<strong>Offre de rachat d’un titre</strong>, <strong>vente sans permis</strong>, <strong>publicité de l’inscription</strong>, <strong>vente à des résidents d’une province/territoire où le représentant n’est pas inscrit</strong>, <strong>vente de titres autres que des fonds communs de placement</strong>, <strong>acceptation d’avantages non pécuniaires</strong> offerts par des gestionnaires."
        ]
      },
      {
        "title": "Quelles sont les règles visant les communications avec les clients?",
        "points": [
          "<strong>Règlement 81-102</strong> : cadre des communications publicitaires (y compris celles du représentant); <strong>approbation préalable</strong> exigée; s’applique à toute publicité/déclaration orale/écrite au client.",
          "Contenu typique : <strong>caractéristiques des fonds</strong>, <strong>comparaisons</strong> (fonds/indice), <strong>données sur le rendement</strong> (règles précises de calcul/présentation), mention <strong>sans frais d’acquisition</strong> lorsque applicable.",
          "<strong>Aucune communication trompeuse</strong> : ni énoncés faux, ni omissions ou présentation biaisant les données; cohérence avec l’<strong>aperçu du fonds</strong> et le <strong>prospectus simplifié</strong>.",
          "<strong>Traitement des plaintes</strong> (Principe directeur no 3 de l’ACFM) : accusé de réception écrit, enquête/réponse écrites en temps opportun; traitement par supérieur/personnel de conformité; signalement à la haute direction en cas d’allégations graves; définitions et exigences particulières au Québec (plainte écrite; trois éléments; assistance de l’AMF)."
        ]
      },
      {
        "title": "Qu’est-ce que le Modèle de relation client-conseiller (MRCC)?",
        "points": [
          "<strong>Origine/objectif</strong> : issu du <strong>Règlement 31-103</strong> et de son <strong>Instruction générale</strong>; première phase en <strong>2009</strong>; but = transparence accrue de la relation client.",
          "<strong>MRCC 2</strong> (modifications 2013; règles ACVM + OCRCVM/ACFM) : permettre aux investisseurs de connaître le <strong>coût réel</strong> et d’obtenir un <strong>reporting</strong> plus clair (rendement/positions). Certaines catégories de <strong>clients autorisés</strong> sont exemptées de certaines informations.",
          "<strong>Exigences clés du MRCC 2</strong> (extraits) :\n    • <strong>Information sur les frais avant l’opération</strong>; <strong>explication des indices de référence</strong>; divulgation de la <strong>rémunération sur titres de créance</strong> dans les avis d’exécution.\n    • <strong>Relevés trimestriels</strong>; <strong>information sur le coût des positions</strong> (méthode prescrite); <strong>information plus détaillée sur les coûts</strong> dans les avis d’exécution.\n    • <strong>Rapport annuel sur le rendement</strong> au niveau du compte; <strong>divulgations des gestionnaires</strong> aux courtiers/conseillers."
        ]
      },
      {
        "title": "Quelles sont vos autres responsabilités sur le plan juridique?",
        "points": [
          "<strong>Protection des renseignements personnels (LPRPDE)</strong> : protège la confidentialité; confère un <strong>statut juridique aux documents électroniques</strong>; le <strong>Commissariat à la protection de la vie privée</strong> peut recevoir/enquêter/résoudre les plaintes et vérifier les méthodes de gestion des renseignements.\n    • <strong>Document électronique</strong> : données enregistrées lisibles (y compris affichage et sorties); <strong>signature électronique</strong> : signature numérique liée au document.",
          "<strong>Lutte contre le blanchiment d’argent et le financement des activités terroristes (LBA/FAT)</strong> :\n    • Obligation de <strong>signaler</strong> les opérations/tractations possiblement liées au <strong>blanchiment d’argent</strong> ou au <strong>financement d’activités terroristes</strong> selon les politiques internes; transmission au <strong>CANAFE</strong> par la Conformité.\n    • <strong>Blanchiment d’argent</strong> : accepter des fonds/biens d’origine illégale et leur donner une apparence légitime; <strong>infraction criminelle</strong>; <strong>trois étapes</strong> : <strong>placement</strong>, <strong>empilement (dispersion)</strong>, <strong>intégration</strong>.\n    • <strong>Financement d’activités terroristes</strong> : fournit des fonds à des activités terroristes (sources étatiques, criminelles ou légitimes); définition des groupes/personnes visés.\n    • <strong>GAFI</strong> : élabore/promeut les politiques nationales/internationales; vérification d’identité/propriété véritable; tenue de dossiers; déclaration des opérations douteuses; publie une <strong>liste annuelle</strong> des pays/territoires non coopératifs.",
          "<strong>Autres encadrements de conformité</strong> :\n    • <strong>Arrangements concernant l’indication de clients</strong> permis s’ils sont <strong>consignés par écrit</strong>, avec <strong>honoraires enregistrés</strong> dans les livres et <strong>avis écrit au client</strong> (explication/calcul, parties payeuses/bénéficiaires); consulter les politiques internes/conformité avant toute démarche.\n    • <strong>Autorisation d’opérations limitée</strong> : requiert approbation (ACFM + conformité/succursale); chaque opération effectuée sous autorisation limitée doit être <strong>identifiée</strong> comme telle dans les registres."
        ]
      }
    ],
    "chapter": 17
  },
  "18": {
    "title": "Chapitre 18 : Comment appliquer les normes de déontologie à ce que vous avez appris",
    "sections": [
      {
        "title": "Que sont la déontologie et les normes de conduite?",
        "points": [
          "<strong>Déontologie/éthique (définition, rôle)</strong> : ensemble de règles morales guidant la conduite; fondement de la relation de confiance — faire passer les besoins et intérêts du client « par-dessus tout ».",
          "<strong>Code de déontologie (valeurs clés)</strong> :\n    • <strong>Prudence raisonnable</strong>, discernement, impartialité.\n    • <strong>Loyauté, intégrité, honnêteté, équité</strong> dans tous les rapports (public, clients, employeurs, collègues).\n    • <strong>Professionnalisme</strong> : exercer/encourager une pratique professionnelle; <strong>maintenir/accroître ses connaissances</strong>; <strong>partager</strong> l’information utile à la profession.\n    • <strong>Conformité</strong> aux lois sur les valeurs mobilières de la/les province(s) d’inscription et aux <strong>exigences des OAR</strong> applicables.\n    • <strong>Confidentialité</strong> de tous les renseignements obtenus des clients.",
          "<strong>Règles vs éthique</strong> : suivre les règles = respecter des normes imposées; l’<strong>éthique</strong> exige un <strong>jugement moral</strong> et le respect de « l’<strong>esprit</strong> » de la loi — nécessaire car les règles ne couvrent pas toutes les situations.",
          "<strong>Normes de conduite (cadre général)</strong> : prolongent le Code; principales normes A à E ci-dessous.",
          "<strong>Bien connaître son client (KYC)</strong> : information complète, fidèle et <strong>mise à jour</strong> (situation financière/personnelle, objectifs).",
          "<strong>Diligence raisonnable</strong> : recommandations fondées sur une <strong>analyse sérieuse</strong> des renseignements du client et de l’opération.",
          "<strong>Ordre non sollicité</strong> : donner des <strong>conseils de prudence</strong> si l’ordre ne convient pas; prendre les <strong>mesures appropriées</strong> si le client insiste.",
          "<strong>Priorité aux intérêts du client</strong> dans toute situation de <strong>conflit d’intérêts</strong> réel ou potentiel.",
          "<strong>Protection de l’actif</strong> : ne jamais utiliser les biens du client à d’autres fins.",
          "<strong>Information complète et exacte</strong> : fournir un <strong>portrait fidèle</strong> (avoirs, rendements, risques), sans présentation trompeuse.",
          "<strong>Divulgation</strong> : communiquer tous les <strong>conflits d’intérêts</strong> réels/possibles.",
          "<strong>Rapports avec les clients</strong> : sollicitation et relations qui inspirent <strong>respect et confiance</strong>.",
          "<strong>Ordre du client</strong> : n’exécuter <strong>que selon ses directives</strong>, sauf <strong>compte carte blanche</strong>/<strong>compte géré</strong> conforme.",
          "<strong>Opérations par personnes inscrites et autorisées</strong> seulement.",
          "<strong>Activités personnelles</strong> : conduite responsable et professionnelle.",
          "<strong>Rapports financiers personnels avec un client</strong> : <strong>à éviter</strong> (emprunter/prêter, régler des pertes, partager un intérêt); <strong>divulguer</strong> tout lien et <strong>éviter</strong> tout conflit (réel ou apparent).",
          "<strong>Autres activités publiques (politique, organismes, conférences)</strong> : participation <strong>responsable et modérée</strong>.",
          "<strong>Obéir</strong> aux lois/règlements applicables et aux <strong>règles des OAR</strong>; ne <strong>commettre aucune infraction</strong> liée aux activités professionnelles/financières/commerciales.",
          "<strong>Renseignements sur le client</strong> : identité, situation personnelle/financière — <strong>confidentiels</strong>; accès restreint au personnel du courtier; protection des <strong>listes/documents</strong>.",
          "<strong>Utilisation des renseignements</strong> : ne jamais les employer à des <strong>fins personnelles</strong> ou pour d’autres comptes; communication <strong>seulement</strong> avec permission, pour surveillance, ou sur <strong>ordonnance</strong> d’une autorité."
        ]
      }
    ],
    "chapter": 18
  }
};
