import { Question, ImportError, ImportResult, StudyNote, StudyPlan, StudyPlanWeek } from '../types';
import { Flashcard } from '../types/flashcard';

export const parseCSV = (csvText: string): string[][] => {
  const lines = csvText.trim().split('\n');
  const result: string[][] = [];
  
  for (const line of lines) {
    const row: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    row.push(current.trim());
    result.push(row);
  }
  
  return result;
};

export const validateQuestionRow = (row: string[], rowIndex: number): ImportError[] => {
  const errors: ImportError[] = [];
  
  // Vérifier le nombre de colonnes
  if (row.length < 9) {
    errors.push({
      row: rowIndex,
      field: 'general',
      message: 'Nombre insuffisant de colonnes (minimum 9 requis)'
    });
    return errors;
  }
  
  // Valider l'ID
  if (!row[0] || row[0].trim() === '') {
    errors.push({
      row: rowIndex,
      field: 'id',
      message: 'ID requis'
    });
  }
  
  // Valider la question
  if (!row[1] || row[1].trim() === '') {
    errors.push({
      row: rowIndex,
      field: 'question',
      message: 'Question requise'
    });
  }
  
  // Valider les options (colonnes 2-5)
  for (let i = 2; i <= 5; i++) {
    if (!row[i] || row[i].trim() === '') {
      errors.push({
        row: rowIndex,
        field: `option${i - 1}`,
        message: `Option ${i - 1} requise`
      });
    }
  }
  
  // Valider la réponse correcte
  const correctAnswer = parseInt(row[6]);
  if (isNaN(correctAnswer) || correctAnswer < 1 || correctAnswer > 4) {
    errors.push({
      row: rowIndex,
      field: 'correctAnswer',
      message: 'Réponse correcte doit être entre 1 et 4'
    });
  }
  
  // Valider l'explication
  if (!row[7] || row[7].trim() === '') {
    errors.push({
      row: rowIndex,
      field: 'explanation',
      message: 'Explication requise'
    });
  }
  
  // Valider le chapitre
  const chapter = parseInt(row[8]);
  if (isNaN(chapter) || chapter < 0 || chapter > 18) {
    errors.push({
      row: rowIndex,
      field: 'chapter',
      message: 'Chapitre doit être entre 0 et 18'
    });
  }
  
  // Valider le type
  const type = row[9]?.toLowerCase().trim();
  if (!type || (type !== 'quiz' && type !== 'exam')) {
    errors.push({
      row: rowIndex,
      field: 'type',
      message: 'Type doit être "quiz" ou "exam"'
    });
  }
  
  return errors;
};

export const validateFlashcardRow = (row: string[], rowIndex: number): ImportError[] => {
  const errors: ImportError[] = [];
  
  // Vérifier le nombre de colonnes
  if (row.length < 5) {
    errors.push({
      row: rowIndex,
      field: 'general',
      message: 'Nombre insuffisant de colonnes (minimum 5 requis)'
    });
    return errors;
  }
  
  // Valider l'ID
  if (!row[0] || row[0].trim() === '') {
    errors.push({
      row: rowIndex,
      field: 'id',
      message: 'ID requis'
    });
  }
  
  // Valider le recto
  if (!row[1] || row[1].trim() === '') {
    errors.push({
      row: rowIndex,
      field: 'front',
      message: 'Recto requis'
    });
  }
  
  // Valider le verso
  if (!row[2] || row[2].trim() === '') {
    errors.push({
      row: rowIndex,
      field: 'back',
      message: 'Verso requis'
    });
  }
  
  // Valider le chapitre
  const chapter = parseInt(row[3]);
  if (isNaN(chapter) || chapter < 1 || chapter > 18) {
    errors.push({
      row: rowIndex,
      field: 'chapter',
      message: 'Chapitre doit être entre 1 et 18'
    });
  }
  
  // Valider la catégorie
  if (!row[4] || row[4].trim() === '') {
    errors.push({
      row: rowIndex,
      field: 'category',
      message: 'Catégorie requise'
    });
  }
  
  return errors;
};

export const importQuestions = (csvText: string): ImportResult => {
  const rows = parseCSV(csvText);
  const errors: ImportError[] = [];
  const questions: Question[] = [];
  
  // Ignorer la ligne d'en-tête
  const dataRows = rows.slice(1);
  
  dataRows.forEach((row, index) => {
    const rowIndex = index + 2; // +2 car on ignore l'en-tête et les index commencent à 0
    const rowErrors = validateQuestionRow(row, rowIndex);
    
    if (rowErrors.length > 0) {
      errors.push(...rowErrors);
    } else {
      const question: Question = {
        id: row[0].trim(),
        question: row[1].trim(),
        options: [
          row[2].trim(),
          row[3].trim(),
          row[4].trim(),
          row[5].trim()
        ],
        correctAnswer: parseInt(row[6]) - 1, // Convertir de 1-4 à 0-3
        explanation: row[7].trim(),
        chapter: parseInt(row[8]),
        type: row[9]?.toLowerCase().trim() as 'quiz' | 'exam'
      };
      
      questions.push(question);
    }
  });
  
  return {
    success: errors.length === 0,
    imported: questions.length,
    errors,
    data: questions
  };
};

export const importFlashcards = (csvText: string): ImportResult => {
  const rows = parseCSV(csvText);
  const errors: ImportError[] = [];
  const flashcards: Flashcard[] = [];
  
  // Ignorer la ligne d'en-tête
  const dataRows = rows.slice(1);
  
  dataRows.forEach((row, index) => {
    const rowIndex = index + 2;
    const rowErrors = validateFlashcardRow(row, rowIndex);
    
    if (rowErrors.length > 0) {
      errors.push(...rowErrors);
    } else {
      const flashcard: Flashcard = {
        id: row[0].trim(),
        front: row[1].trim(),
        back: row[2].trim(),
        chapter: parseInt(row[3]),
        category: row[4].trim()
      };
      
      flashcards.push(flashcard);
    }
  });
  
  return {
    success: errors.length === 0,
    imported: flashcards.length,
    errors,
    data: flashcards
  };
};

export const generateQuestionTemplate = (): string => {
  const headers = [
    'id',
    'question',
    'option1',
    'option2',
    'option3',
    'option4',
    'correctAnswer',
    'explanation',
    'chapter',
    'type'
  ];
  
  const example = [
    '1',
    '"Quel est l\'objectif principal de la réglementation FIC ?"',
    '"Réglementer les transactions boursières"',
    '"Protéger les investisseurs et assurer des marchés équitables"',
    '"Fixer les taux d\'intérêt"',
    '"Contrôler les dépenses gouvernementales"',
    '2',
    '"La réglementation FIC est principalement conçue pour protéger les investisseurs et assurer des marchés de capitaux équitables, efficaces et concurrentiels."',
    '1',
    'quiz'
  ];
  
  return [headers.join(','), example.join(',')].join('\n');
};

export const generateFlashcardTemplate = (): string => {
  const headers = [
    'id',
    'front',
    'back',
    'chapter',
    'category'
  ];
  
  const example = [
    '1',
    '"Que signifie VNI ?"',
    '"Valeur nette d\'inventaire - représente la valeur par part d\'un fonds commun de placement"',
    '2',
    '"Terminologie"'
  ];
  
  return [headers.join(','), example.join(',')].join('\n');
};

// Study Notes CSV: id(optional), chapter, title, section_title, point1|point2|point3, pdf_path(optional)
export const importStudyNotesCSV = (csvText: string): { notes: StudyNote[]; errors: ImportError[] } => {
  const rows = parseCSV(csvText);
  const errors: ImportError[] = [];
  const byChapter = new Map<number, StudyNote>();

  const dataRows = rows.slice(1);
  dataRows.forEach((row, index) => {
    const rowIndex = index + 2;
    if (row.length < 5) {
      errors.push({ row: rowIndex, field: 'general', message: 'Colonnes insuffisantes (min 5)' });
      return;
    }
    const chapter = parseInt(row[1]);
    const title = row[2]?.trim();
    const sectionTitle = row[3]?.trim();
    const points = (row[4] || '').split('|').map(p => p.trim()).filter(Boolean);
    const pdfPath = row[5]?.trim() || null;

    if (isNaN(chapter) || chapter < 1 || chapter > 18) {
      errors.push({ row: rowIndex, field: 'chapter', message: 'Chapitre 1-18 requis' });
      return;
    }
    if (!title) {
      errors.push({ row: rowIndex, field: 'title', message: 'Titre requis' });
      return;
    }
    if (!sectionTitle) {
      errors.push({ row: rowIndex, field: 'section_title', message: 'Titre de section requis' });
      return;
    }

    if (!byChapter.has(chapter)) {
      byChapter.set(chapter, {
        id: '',
        chapter,
        title,
        sections: [],
        pdfPath,
      });
    }
    const note = byChapter.get(chapter)!;
    if (note.title !== title) note.title = title;
    if (!note.pdfPath && pdfPath) note.pdfPath = pdfPath;
    note.sections.push({ title: sectionTitle, points });
  });

  return { notes: Array.from(byChapter.values()), errors };
};

// Study Plans CSV: plan_weeks rows
// columns: weeks(6|8|12), week_number, chapters, focus, hours, tasks (pipe-separated), pdf_path(optional per-plan use the same per all rows or separate meta csv)
export const importStudyPlanWeeksCSV = (csvText: string): { planMap: Map<6|8|12, { plan: Omit<StudyPlan, 'id'|'schedule'> & { pdfPath?: string | null }, weeks: StudyPlanWeek[] }>; errors: ImportError[] } => {
  const rows = parseCSV(csvText);
  const errors: ImportError[] = [];
  const planMap = new Map<6|8|12, { plan: any, weeks: StudyPlanWeek[] }>();
  const dataRows = rows.slice(1);

  dataRows.forEach((row, index) => {
    const rowIndex = index + 2;
    if (row.length < 6) {
      errors.push({ row: rowIndex, field: 'general', message: 'Colonnes insuffisantes (min 6)' });
      return;
    }
    const weeksNum = parseInt(row[0]) as 6|8|12;
    const weekNumber = parseInt(row[1]);
    const chapters = row[2]?.trim();
    const focus = row[3]?.trim() || null;
    const hours = row[4]?.trim() || null;
    const tasks = (row[5] || '').split('|').map(t => t.trim()).filter(Boolean);
    const pdfPath = row[6]?.trim() || null;

    if (![6,8,12].includes(weeksNum)) {
      errors.push({ row: rowIndex, field: 'weeks', message: 'weeks doit être 6, 8, ou 12' });
      return;
    }
    if (isNaN(weekNumber) || weekNumber < 1) {
      errors.push({ row: rowIndex, field: 'week_number', message: 'Numéro de semaine invalide' });
      return;
    }
    if (!chapters) {
      errors.push({ row: rowIndex, field: 'chapters', message: 'Chapitres requis' });
      return;
    }

    if (!planMap.has(weeksNum)) {
      planMap.set(weeksNum, {
        plan: {
          weeks: weeksNum,
          title: weeksNum === 6 ? 'Plan intensif - 6 semaines' : weeksNum === 8 ? 'Plan équilibré - 8 semaines' : 'Plan confortable - 12 semaines',
          description: null,
          totalHours: null,
          dailyCommitment: null,
          pdfPath
        },
        weeks: []
      });
    }
    const entry = planMap.get(weeksNum)!;
    if (!entry.plan.pdfPath && pdfPath) entry.plan.pdfPath = pdfPath;
    entry.weeks.push({
      id: '',
      planId: '',
      weekNumber,
      chapters,
      focus: focus ?? undefined,
      hours: hours ?? undefined,
      tasks
    });
  });

  return { planMap, errors };
};