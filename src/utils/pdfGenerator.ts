import { StudyPlan, StudyNote } from '../data/studyContent';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Function to generate HTML content for study plan
export const generateStudyPlanHTML = (plan: StudyPlan): string => {
  const weeksHtml = plan.schedule.map(week => `
    <div class="week-section" style="margin-bottom: 20px; page-break-inside: avoid;">
      <h3 style="color: #10ac69; font-size: 18px; margin-bottom: 10px;">
        Semaine ${week.week} - Chapitres ${week.chapters}
      </h3>
      <div style="margin-bottom: 10px;">
        <strong>Focus:</strong> ${week.focus || 'Non spécifié'}
      </div>
      <div style="margin-bottom: 10px;">
        <strong>Heures:</strong> ${week.hours || 'Non spécifié'}
      </div>
      <div>
        <strong>Tâches:</strong>
        <ul style="margin-top: 5px; margin-bottom: 0;">
          ${week.tasks.map(task => {
            if (task.includes('\n    • ')) {
              const [mainTask, ...nestedTasks] = task.split('\n    • ');
              return `
                <li style="margin-bottom: 8px;">
                  ${mainTask}
                  <ul style="margin-top: 5px; margin-left: 20px;">
                    ${nestedTasks.map(nestedTask => `
                      <li style="color: #666; font-size: 14px;">${nestedTask}</li>
                    `).join('')}
                  </ul>
                </li>
              `;
            } else {
              return `<li style="margin-bottom: 5px;">${task}</li>`;
            }
          }).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  return `
    <div id="pdf-content" style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="/public/logo.png" alt="Le Dojo Financier" style="width: 100px; height: auto; margin-bottom: 20px;">
        <h1 style="color: #3b3b3b; font-size: 24px; margin-bottom: 10px;">
          ${plan.title}
        </h1>
        <p style="color: #666; font-size: 16px; margin-bottom: 5px;">
          ${plan.description}
        </p>
        <div style="display: flex; justify-content: center; gap: 30px; margin-top: 15px;">
          <div style="text-align: center;">
            <div style="font-weight: bold; color: #10ac69;">${plan.totalHours}</div>
            <div style="font-size: 12px; color: #666;">Total d'étude</div>
          </div>
          <div style="text-align: center;">
            <div style="font-weight: bold; color: #10ac69;">${plan.dailyCommitment}</div>
            <div style="font-size: 12px; color: #666;">Par jour</div>
          </div>
          <div style="text-align: center;">
            <div style="font-weight: bold; color: #10ac69;">${plan.weeks} semaines</div>
            <div style="font-size: 12px; color: #666;">Durée totale</div>
          </div>
        </div>
      </div>
      
      <div style="border-top: 2px solid #10ac69; padding-top: 20px;">
        <h2 style="color: #3b3b3b; font-size: 20px; margin-bottom: 20px;">
          Calendrier détaillé
        </h2>
        ${weeksHtml}
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #999; text-align: center;">
          Généré le ${new Date().toLocaleDateString('fr-FR')} - FIC Study Platform
        </p>
      </div>
    </div>
  `;
};

// Function to generate HTML content for study notes
export const generateStudyNotesHTML = (notes: StudyNote): string => {
  const sectionsHtml = notes.sections.map(section => `
    <div class="section" style="margin-bottom: 25px; page-break-inside: avoid;">
      <h3 style="color: #10ac69; font-size: 18px; margin-bottom: 15px;">
        ${section.title}
      </h3>
      <ul style="margin: 0; padding-left: 20px;">
        ${section.points.map(point => `
          <li style="margin-bottom: 8px; line-height: 1.5;">${point}</li>
        `).join('')}
      </ul>
    </div>
  `).join('');

  return `
    <div id="pdf-content" style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #3b3b3b; font-size: 24px; margin-bottom: 10px;">
          ${notes.title}
        </h1>
      </div>
      
      <div style="border-top: 2px solid #10ac69; padding-top: 20px;">
        ${sectionsHtml}
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #999; text-align: center;">
          Généré le ${new Date().toLocaleDateString('fr-FR')} - FIC Study Platform
        </p>
      </div>
    </div>
  `;
};

// Function to generate HTML content for all study notes
export const generateAllStudyNotesHTML = (allNotes: Record<number, StudyNote>): string => {
  const chaptersHtml = Object.values(allNotes)
    .filter(notes => notes.sections.length > 0) // Only include chapters with content
    .map(notes => {
      const sectionsHtml = notes.sections.map(section => `
        <div class="section" style="margin-bottom: 20px; page-break-inside: avoid;">
          <h4 style="color: #10ac69; font-size: 16px; margin-bottom: 10px;">
            ${section.title}
          </h4>
          <ul style="margin: 0; padding-left: 20px;">
            ${section.points.map(point => `
              <li style="margin-bottom: 6px; line-height: 1.4; font-size: 14px;">${point}</li>
            `).join('')}
          </ul>
        </div>
      `).join('');

      return `
        <div class="chapter" style="margin-bottom: 40px; page-break-inside: avoid;">
          <h2 style="color: #3b3b3b; font-size: 20px; margin-bottom: 20px; border-bottom: 2px solid #10ac69; padding-bottom: 10px;">
            ${notes.title}
          </h2>
          ${sectionsHtml}
        </div>
      `;
    }).join('');

  return `
    <div id="pdf-content" style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="/public/logo.png" alt="Le Dojo Financier" style="width: 100px; height: auto; margin-bottom: 20px;">
        <h1 style="color: #3b3b3b; font-size: 28px; margin-bottom: 10px;">
          Notes d'étude complètes
        </h1>
        <p style="color: #666; font-size: 16px; margin-bottom: 5px;">
          Programme FIC - Tous les chapitres
        </p>
        <p style="color: #999; font-size: 14px;">
          ${Object.keys(allNotes).length} chapitres • ${new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>
      
      <div style="border-top: 2px solid #10ac69; padding-top: 20px;">
        ${chaptersHtml}
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #999; text-align: center;">
          Généré le ${new Date().toLocaleDateString('fr-FR')} - FIC Study Platform
        </p>
      </div>
    </div>
  `;
};

// Function to generate PDF from HTML content
const generatePDFFromHTML = async (html: string, filename: string): Promise<void> => {
  // Create a temporary container
  const container = document.createElement('div');
  container.innerHTML = html;
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '800px';
  document.body.appendChild(container);

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(container, {
      width: 800,
      height: container.scrollHeight,
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Download PDF
    pdf.save(filename);

  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback to HTML download
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.replace('.pdf', '.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
};

// Export functions for use in components
export const downloadStudyPlanPDF = async (plan: StudyPlan) => {
  const html = generateStudyPlanHTML(plan);
  const filename = `Plan-Etude-${plan.weeks}-semaines.pdf`;
  await generatePDFFromHTML(html, filename);
};

export const downloadStudyNotesPDF = async (notes: StudyNote) => {
  const html = generateStudyNotesHTML(notes);
  const filename = `Notes-Chapitre-${notes.chapter}.pdf`;
  await generatePDFFromHTML(html, filename);
};

export const downloadAllStudyNotesPDF = async (allNotes: Record<number, StudyNote>) => {
  const html = generateAllStudyNotesHTML(allNotes);
  const filename = `Notes-Etude-Completes-FIC.pdf`;
  await generatePDFFromHTML(html, filename);
};
