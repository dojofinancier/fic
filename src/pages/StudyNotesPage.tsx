import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { studyNotes } from '../data/studyContent';
import { downloadStudyNotesPDF, downloadAllStudyNotesPDF } from '../utils/pdfGenerator';
import { 
  BookOpen, 
  Download, 
  ChevronRight,
  FileText,
  Lightbulb,
  Target,
  ArrowLeft
} from 'lucide-react';

export const StudyNotesPage: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<number>(1);

  const currentNotes = studyNotes[selectedChapter];

  const handleDownloadPDF = async () => {
    await downloadStudyNotesPDF(currentNotes);
  };

  const handleDownloadAllPDF = async () => {
    await downloadAllStudyNotesPDF(studyNotes);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-[#10ac69] hover:text-[#0e9558] mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au tableau de bord
          </Link>
          <h1 className="text-3xl font-bold text-[#3b3b3b] mb-2">Notes d'étude</h1>
          <p className="text-gray-600">
            Notes détaillées pour chaque chapitre du programme FIC®
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chapter Selection */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <div className="mb-4">
                <h2 className="font-semibold text-[#3b3b3b] mb-3">Chapitres</h2>
                <div className="flex justify-center sm:justify-end">
                  <Button size="sm" onClick={handleDownloadAllPDF} variant="outline" className="text-sm">
                    <Download className="h-3 w-3 mr-1" />
                    Télécharger tout
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <div className="space-y-1">
                  {Array.from({ length: 18 }, (_, i) => i + 1).map((chapter) => (
                    <button
                      key={chapter}
                      onClick={() => setSelectedChapter(chapter)}
                      className={`w-full text-left p-2 rounded-lg transition-all duration-200 flex items-center justify-between ${
                        selectedChapter === chapter
                          ? 'bg-[#10ac69] text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="text-sm font-medium">Chapitre {chapter}</span>
                      <ChevronRight className={`h-4 w-4 ${selectedChapter === chapter ? 'text-white' : 'text-gray-400'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Chapter Content */}
          <div className="lg:col-span-3">
            {currentNotes ? (
              <Card>
                <div className="mb-6">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-[#3b3b3b] mb-2">
                      Chapitre {selectedChapter}
                    </h2>
                    <h3 className="text-xl text-gray-600">{currentNotes.title}</h3>
                  </div>
                  <div className="flex justify-center sm:justify-end">
                    <Button onClick={handleDownloadPDF} variant="outline" size="sm" className="text-sm">
                      <Download className="h-3 w-3 mr-2" />
                      Télécharger PDF
                    </Button>
                  </div>
                </div>

                <div className="space-y-8">
                  {currentNotes.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border-l-4 border-[#10ac69] pl-6">
                      <h4 className="text-lg font-semibold text-[#3b3b3b] mb-4 flex items-center">
                        <Target className="h-5 w-5 text-[#10ac69] mr-2" />
                        <span dangerouslySetInnerHTML={{ __html: section.title }}></span>
                      </h4>
                      <ul className="space-y-3">
                        {section.points.map((point, pointIndex) => {
                          // Check if point contains nested items (has \n    •)
                          if (point.includes('\n    • ')) {
                            const [mainPoint, ...nestedPoints] = point.split('\n    • ');
                            return (
                              <li key={pointIndex} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-[#10ac69] rounded-full mt-2 flex-shrink-0"></div>
                                <div className="text-gray-700 leading-relaxed">
                                  <span dangerouslySetInnerHTML={{ __html: mainPoint }}></span>
                                  <ul className="mt-2 ml-4 space-y-1">
                                    {nestedPoints.map((nestedPoint, nestedIndex) => (
                                      <li key={nestedIndex} className="text-sm text-gray-600 flex items-start">
                                        <span className="text-[#10ac69] mr-2 mt-1">•</span>
                                        <span dangerouslySetInnerHTML={{ __html: nestedPoint }}></span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </li>
                            );
                          } else {
                            return (
                              <li key={pointIndex} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-[#10ac69] rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: point }}></span>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  {/* Chapter indicator - stacked above buttons on mobile */}
                  <div className="text-center mb-4">
                    <span className="text-sm text-gray-500">
                      Chapitre {selectedChapter} sur 18
                    </span>
                  </div>
                  
                  {/* Navigation buttons - always on same line */}
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedChapter(Math.max(1, selectedChapter - 1))}
                      disabled={selectedChapter === 1}
                      className="text-gray-600 hover:text-[#10ac69] hover:bg-gray-50"
                    >
                      ← Chapitre précédent
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedChapter(Math.min(18, selectedChapter + 1))}
                      disabled={selectedChapter === 18}
                      className="text-gray-600 hover:text-[#10ac69] hover:bg-gray-50"
                    >
                      Chapitre suivant →
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">
                  Notes en préparation
                </h3>
                <p className="text-gray-400">
                  Les notes pour ce chapitre seront bientôt disponibles.
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Study Tips */}
        <Card className="mt-8">
          <h3 className="text-lg font-semibold text-[#3b3b3b] mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 text-[#10ac69] mr-2" />
            Conseils pour utiliser ces notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <BookOpen className="h-8 w-8 text-[#10ac69] mx-auto mb-2" />
              <h4 className="font-medium text-[#3b3b3b] mb-2">Lecture active</h4>
              <p className="text-sm text-gray-600">
                Prenez des notes personnelles et posez-vous des questions sur chaque point
              </p>
            </div>
            <div className="text-center">
              <Target className="h-8 w-8 text-[#10ac69] mx-auto mb-2" />
              <h4 className="font-medium text-[#3b3b3b] mb-2">Révision régulière</h4>
              <p className="text-sm text-gray-600">
                Révisez les chapitres précédents avant d'aborder de nouveaux concepts
              </p>
            </div>
            <div className="text-center">
              <FileText className="h-8 w-8 text-[#10ac69] mx-auto mb-2" />
              <h4 className="font-medium text-[#3b3b3b] mb-2">Complémentarité</h4>
              <p className="text-sm text-gray-600">
                Utilisez ces notes avec les quiz et cartes mémoire pour une préparation complète
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};