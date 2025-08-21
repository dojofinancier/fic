import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to parse markdown study plan
function parseStudyPlanMarkdown(content) {
  const lines = content.split('\n');
  const plan = {
    title: '',
    description: '',
    totalHours: '',
    dailyCommitment: '',
    schedule: []
  };

  let currentWeek = null;
  let inTasks = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('# ')) {
      plan.title = convertMarkdownBold(trimmedLine.substring(2));
    } else if (trimmedLine.includes('**Description:**')) {
      plan.description = convertMarkdownBold(trimmedLine.split('**Description:**')[1].trim());
    } else if (trimmedLine.includes('**Heures totales:**')) {
      plan.totalHours = convertMarkdownBold(trimmedLine.split('**Heures totales:**')[1].trim());
    } else if (trimmedLine.includes('**Engagement quotidien:**')) {
      plan.dailyCommitment = convertMarkdownBold(trimmedLine.split('**Engagement quotidien:**')[1].trim());
    } else if (trimmedLine.startsWith('## Semaine ')) {
      if (currentWeek) {
        plan.schedule.push(currentWeek);
      }
      const weekNum = parseInt(trimmedLine.split('Semaine ')[1]);
      currentWeek = {
        week: weekNum,
        chapters: '',
        focus: '',
        hours: '',
        tasks: []
      };
      inTasks = false;
    } else if (currentWeek && trimmedLine.includes('**Chapitres:**')) {
      currentWeek.chapters = convertMarkdownBold(trimmedLine.split('**Chapitres:**')[1].trim());
    } else if (currentWeek && trimmedLine.includes('**Focus:**')) {
      currentWeek.focus = convertMarkdownBold(trimmedLine.split('**Focus:**')[1].trim());
    } else if (currentWeek && trimmedLine.includes('**Heures:**')) {
      currentWeek.hours = convertMarkdownBold(trimmedLine.split('**Heures:**')[1].trim());
    } else if (currentWeek && trimmedLine.includes('**Tâches:**')) {
      inTasks = true;
    } else if (currentWeek && inTasks && trimmedLine.startsWith('- ')) {
      // Handle nested tasks with indentation
      const taskText = trimmedLine.substring(2);
      const indentation = line.length - line.trimStart().length;
      
      // If this is a top-level task (no indentation or minimal indentation)
      if (indentation <= 2) {
        currentWeek.tasks.push(convertMarkdownBold(taskText));
      } else {
        // This is a nested task, append it to the last task with proper indentation
        if (currentWeek.tasks.length > 0) {
          const lastTask = currentWeek.tasks[currentWeek.tasks.length - 1];
          // Add the nested task with visual indentation
          currentWeek.tasks[currentWeek.tasks.length - 1] = lastTask + '\n    • ' + convertMarkdownBold(taskText);
        } else {
          // Fallback if no parent task exists
          currentWeek.tasks.push('    • ' + convertMarkdownBold(taskText));
        }
      }
    } else if (currentWeek && inTasks && trimmedLine === '') {
      // Only stop tasks section if we encounter a completely empty line
      // This allows for multi-line nested tasks
      if (i + 1 < lines.length && !lines[i + 1].trim().startsWith('-')) {
        inTasks = false;
      }
    }
  }

  if (currentWeek) {
    plan.schedule.push(currentWeek);
  }

  return plan;
}

// Function to convert markdown bold syntax to HTML
function convertMarkdownBold(text) {
  // Convert **text** to <strong>text</strong>
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

// Function to parse markdown study notes
function parseStudyNotesMarkdown(content) {
  const lines = content.split('\n');
  const note = {
    title: '',
    sections: []
  };

  let currentSection = null;

  for (let i = 0; i < lines.length; i++) {
    const originalLine = lines[i];
    const line = originalLine.trim();
    
    if (line.startsWith('# ')) {
      note.title = convertMarkdownBold(line.substring(2));
    } else if (line.startsWith('## ')) {
      if (currentSection) {
        note.sections.push(currentSection);
      }
      currentSection = {
        title: convertMarkdownBold(line.substring(3)),
        points: []
      };
    } else if (currentSection && line.startsWith('- ')) {
      // Calculate indentation by counting leading spaces
      const indentation = originalLine.length - originalLine.trimStart().length;
      
      if (indentation <= 1) {
        // Top-level bullet point
        currentSection.points.push(convertMarkdownBold(line.substring(2)));
      } else {
        // Nested bullet point - append to the last point
        if (currentSection.points.length > 0) {
          const lastPoint = currentSection.points[currentSection.points.length - 1];
          currentSection.points[currentSection.points.length - 1] = lastPoint + '\n    • ' + convertMarkdownBold(line.substring(2));
        } else {
          // If no previous point exists, add as top-level
          currentSection.points.push(convertMarkdownBold(line.substring(2)));
        }
      }
    } else if (currentSection && originalLine.trim().startsWith('- ') && originalLine.length - originalLine.trimStart().length > 2) {
      // Handle nested bullet points that might not be detected by the above condition
      const line = originalLine.trim();
      if (currentSection.points.length > 0) {
        const lastPoint = currentSection.points[currentSection.points.length - 1];
        currentSection.points[currentSection.points.length - 1] = lastPoint + '\n    • ' + convertMarkdownBold(line.substring(2));
      } else {
        currentSection.points.push(convertMarkdownBold(line.substring(2)));
      }
    } else if (currentSection && originalLine.includes('- ') && originalLine.length - originalLine.trimStart().length > 2) {
      // Additional check for nested bullet points
      const trimmedLine = originalLine.trim();
      if (trimmedLine.startsWith('- ')) {
        if (currentSection.points.length > 0) {
          const lastPoint = currentSection.points[currentSection.points.length - 1];
          currentSection.points[currentSection.points.length - 1] = lastPoint + '\n    • ' + convertMarkdownBold(trimmedLine.substring(2));
        } else {
          currentSection.points.push(convertMarkdownBold(trimmedLine.substring(2)));
        }
      }
    }
  }

  if (currentSection) {
    note.sections.push(currentSection);
  }

  return note;
}

// Main conversion function
function convertMarkdownToTypeScript() {
  const studyPlans = {};
  const studyNotes = {};

  // Convert study plans
  const plansDir = path.join(__dirname, '../src/data/markdown/study-plans');
  if (fs.existsSync(plansDir)) {
    const planFiles = fs.readdirSync(plansDir).filter(f => f.endsWith('.md'));
    
    planFiles.forEach(file => {
      const content = fs.readFileSync(path.join(plansDir, file), 'utf8');
      const plan = parseStudyPlanMarkdown(content);
      
      // Extract weeks from filename (e.g., plan-8-weeks.md -> 8)
      const weeks = parseInt(file.match(/plan-(\d+)-weeks/)[1]);
      plan.weeks = weeks;
      
      studyPlans[weeks] = plan;
    });
  }

  // Convert study notes
  const notesDir = path.join(__dirname, '../src/data/markdown/study-notes');
  if (fs.existsSync(notesDir)) {
    const noteFiles = fs.readdirSync(notesDir).filter(f => f.endsWith('.md'));
    
    noteFiles.forEach(file => {
      const content = fs.readFileSync(path.join(notesDir, file), 'utf8');
      const note = parseStudyNotesMarkdown(content);
      
      // Extract chapter from filename (e.g., chapter-01.md -> 1)
      const chapter = parseInt(file.match(/chapter-(\d+)/)[1]);
      note.chapter = chapter;
      
      studyNotes[chapter] = note;
    });
  }

  // Generate TypeScript content
  const tsContent = `// Auto-generated from markdown files - DO NOT EDIT DIRECTLY
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
export const studyPlans: Record<6 | 8 | 12, StudyPlan> = ${JSON.stringify(studyPlans, null, 2)};

// Study Notes Data
export const studyNotes: Record<number, StudyNote> = ${JSON.stringify(studyNotes, null, 2)};
`;

  // Write to studyContent.ts
  const outputPath = path.join(__dirname, '../src/data/studyContent.ts');
  fs.writeFileSync(outputPath, tsContent);
  
  console.log('✅ Markdown files converted to TypeScript successfully!');
  console.log(`📁 Output: ${outputPath}`);
  console.log(`📊 Study plans: ${Object.keys(studyPlans).length}`);
  console.log(`📝 Study notes: ${Object.keys(studyNotes).length}`);
}

// Run if called directly
convertMarkdownToTypeScript();
