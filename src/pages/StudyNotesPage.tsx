import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { 
  BookOpen, 
  Download, 
  ChevronRight,
  FileText,
  Lightbulb,
  Target
} from 'lucide-react';

export const StudyNotesPage: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [notesByChapter, setNotesByChapter] = useState<Record<number, { title: string; sections: { title: string; points: string[] }[]; pdfUrl?: string }>>({});

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('study_notes').select('*');
      const mapped: Record<number, any> = {};
      (data || []).forEach((n: any) => {
        const pdfUrl = n.pdf_path ? supabase.storage.from('study-assets').getPublicUrl(n.pdf_path).data.publicUrl : undefined;
        mapped[n.chapter] = { title: n.title, sections: n.sections || [], pdfUrl };
      });
      setNotesByChapter(mapped);
    };
    load();
  }, []);

  const downloadChapterNotes = (chapter: number) => {
    const entry = notesByChapter[chapter];
    if (!entry?.pdfUrl) return;
    const link = document.createElement('a');
    link.href = entry.pdfUrl;
    link.download = `Notes-Chapitre-${chapter}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentNotes = notesByChapter[selectedChapter];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3b3b3b] mb-2">Notes d'étude</h1>
          <p className="text-gray-600">
            Notes détaillées pour chaque chapitre du programme FIC
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chapter Selection */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-[#3b3b3b]">Chapitres</h2>
                <Button size="sm" disabled>
                  <Download className="h-4 w-4 mr-1" />
                  Tout
                </Button>
              </div>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                <div className="space-y-1">
                  {Array.from({ length: 18 }, (_, i) => i + 1).map((chapter) => (
                    <button
                      key={chapter}
                      onClick={() => setSelectedChapter(chapter)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
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
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#3b3b3b] mb-2">
                      Chapitre {selectedChapter}
                    </h2>
                    <h3 className="text-xl text-gray-600">{currentNotes.title}</h3>
                  </div>
                  <Button onClick={() => downloadChapterNotes(selectedChapter)}>
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>

                <div className="space-y-8">
                  {currentNotes.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border-l-4 border-[#10ac69] pl-6">
                      <h4 className="text-lg font-semibold text-[#3b3b3b] mb-4 flex items-center">
                        <Target className="h-5 w-5 text-[#10ac69] mr-2" />
                        {section.title}
                      </h4>
                      <ul className="space-y-3">
                        {section.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-[#10ac69] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedChapter(Math.max(1, selectedChapter - 1))}
                    disabled={selectedChapter === 1}
                  >
                    Chapitre précédent
                  </Button>
                  <span className="text-sm text-gray-500">
                    Chapitre {selectedChapter} sur 18
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedChapter(Math.min(18, selectedChapter + 1))}
                    disabled={selectedChapter === 18}
                  >
                    Chapitre suivant
                  </Button>
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