import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { 
  Upload, 
  Download, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileText,
  Eye
} from 'lucide-react';
import { 
  importQuestions, 
  importFlashcards, 
  generateQuestionTemplate, 
  generateFlashcardTemplate 
} from '../../utils/csvImport';
import { ImportResult, Question } from '../../types';
import { Flashcard } from '../../types/flashcard';

interface CSVImportProps {
  type: 'questions' | 'flashcards';
  onImportComplete: (data: Question[] | Flashcard[]) => void;
}

export const CSVImport: React.FC<CSVImportProps> = ({ type, onImportComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<string>('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setResult(null);
      
      // Lire le fichier pour la prévisualisation
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setPreviewData(content);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvContent = e.target?.result as string;
        
        let importResult: ImportResult;
        if (type === 'questions') {
          importResult = importQuestions(csvContent);
        } else {
          importResult = importFlashcards(csvContent);
        }
        
        setResult(importResult);
        
        if (importResult.success && importResult.data) {
          onImportComplete(importResult.data);
        }
        
        setImporting(false);
      };
      
      reader.readAsText(file);
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const template = type === 'questions' 
      ? generateQuestionTemplate() 
      : generateFlashcardTemplate();
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `template-${type}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPreviewLines = () => {
    if (!previewData) return [];
    return previewData.split('\n').slice(0, 5); // Afficher les 5 premières lignes
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <Card>
        <h3 className="text-lg font-semibold text-[#3b3b3b] mb-4">
          Import CSV - {type === 'questions' ? 'Questions' : 'Cartes mémoire'}
        </h3>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-[#3b3b3b] mb-2">Format requis :</h4>
            {type === 'questions' ? (
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>id</strong> : Identifiant unique</li>
                <li>• <strong>question</strong> : Texte de la question</li>
                <li>• <strong>option1-4</strong> : Les 4 options de réponse</li>
                <li>• <strong>correctAnswer</strong> : Numéro de la bonne réponse (1-4)</li>
                <li>• <strong>explanation</strong> : Explication de la réponse</li>
                <li>• <strong>chapter</strong> : Numéro du chapitre (0-15)</li>
                <li>• <strong>type</strong> : "quiz" ou "exam"</li>
              </ul>
            ) : (
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>id</strong> : Identifiant unique</li>
                <li>• <strong>front</strong> : Recto de la carte (question)</li>
                <li>• <strong>back</strong> : Verso de la carte (réponse)</li>
                <li>• <strong>chapter</strong> : Numéro du chapitre (1-15)</li>
                <li>• <strong>category</strong> : Catégorie de la carte</li>
              </ul>
            )}
          </div>
          
          <Button variant="outline" onClick={downloadTemplate}>
            <Download className="h-4 w-4 mr-2" />
            Télécharger le modèle CSV
          </Button>
        </div>
      </Card>

      {/* Upload */}
      <Card>
        <h4 className="font-medium text-[#3b3b3b] mb-4">Sélectionner le fichier CSV</h4>
        
        <div className="space-y-4">
          <Input
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#10ac69] file:text-white hover:file:bg-[#0e9558]"
          />
          
          {file && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FileText className="h-4 w-4" />
              <span>{file.name} ({Math.round(file.size / 1024)} KB)</span>
            </div>
          )}
        </div>
      </Card>

      {/* Preview */}
      {file && previewData && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-[#3b3b3b]">Prévisualisation</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? 'Masquer' : 'Afficher'}
            </Button>
          </div>
          
          {showPreview && (
            <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                {getPreviewLines().join('\n')}
                {previewData.split('\n').length > 5 && '\n... (et plus)'}
              </pre>
            </div>
          )}
        </Card>
      )}

      {/* Import Button */}
      {file && (
        <Card>
          <Button
            onClick={handleImport}
            disabled={importing}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            {importing ? 'Import en cours...' : 'Importer les données'}
          </Button>
        </Card>
      )}

      {/* Results */}
      {result && (
        <Card>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {result.success ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500" />
              )}
              <h4 className="font-medium text-[#3b3b3b]">
                {result.success ? 'Import réussi !' : 'Erreurs détectées'}
              </h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{result.imported}</div>
                <div className="text-sm text-green-700">Éléments importés</div>
              </div>
              
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{result.errors.length}</div>
                <div className="text-sm text-red-700">Erreurs</div>
              </div>
            </div>
            
            {result.errors.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <h5 className="font-medium text-[#3b3b3b]">Détail des erreurs :</h5>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                  {result.errors.map((error, index) => (
                    <div key={index} className="text-sm text-red-700 mb-1">
                      <strong>Ligne {error.row}</strong> - {error.field}: {error.message}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};