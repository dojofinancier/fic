import React, { useEffect, useMemo, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { supabase } from '../../lib/supabase';
import { Download, Upload, FileText, BookOpen, Calendar, Plus, Trash2, Save } from 'lucide-react';
import { StudyNote, StudyPlan, StudyPlanWeek } from '../../types';
import { importStudyNotesCSV, importStudyPlanWeeksCSV } from '../../utils/csvImport';

export const StudyContentManager: React.FC = () => {
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [notesCSV, setNotesCSV] = useState<File | null>(null);
  const [plansCSV, setPlansCSV] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: notesData } = await supabase.from('study_notes').select('*').order('chapter');
      const mappedNotes: StudyNote[] = (notesData || []).map((n: any) => ({
        id: n.id,
        chapter: n.chapter,
        title: n.title,
        sections: n.sections || [],
        pdfPath: n.pdf_path,
      }));
      setNotes(mappedNotes);

      const { data: plansData } = await supabase.from('study_plans').select('*');
      const plansWithWeeks: StudyPlan[] = [];
      for (const p of plansData || []) {
        const { data: weeksData } = await supabase
          .from('study_plan_weeks')
          .select('*')
          .eq('plan_id', p.id)
          .order('week_number');
        plansWithWeeks.push({
          id: p.id,
          weeks: p.weeks,
          title: p.title,
          description: p.description ?? undefined,
          totalHours: p.total_hours ?? undefined,
          dailyCommitment: p.daily_commitment ?? undefined,
          pdfPath: p.pdf_path ?? undefined,
          schedule: (weeksData || []).map((w: any) => ({
            id: w.id,
            planId: w.plan_id,
            weekNumber: w.week_number,
            chapters: w.chapters,
            focus: w.focus ?? undefined,
            hours: w.hours ?? undefined,
            tasks: w.tasks || [],
          }))
        });
      }
      setPlans(plansWithWeeks);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleNotesCSV = async () => {
    if (!notesCSV) return;
    setUploading(true);
    try {
      const text = await notesCSV.text();
      const { notes: parsed, errors } = importStudyNotesCSV(text);
      if (errors.length) {
        console.error(errors);
      }
      for (const n of parsed) {
        const { data, error } = await supabase
          .from('study_notes')
          .upsert({
            chapter: n.chapter,
            title: n.title,
            sections: n.sections,
            pdf_path: n.pdfPath ?? null
          })
          .select()
          .single();
        if (error) throw error;
      }
      await loadData();
    } catch (e) {
      console.error('Notes import error', e);
    } finally {
      setUploading(false);
    }
  };

  const handlePlansCSV = async () => {
    if (!plansCSV) return;
    setUploading(true);
    try {
      const text = await plansCSV.text();
      const { planMap, errors } = importStudyPlanWeeksCSV(text);
      if (errors.length) console.error(errors);

      for (const [weeks, entry] of planMap.entries()) {
        const { data: planRow, error: planErr } = await supabase
          .from('study_plans')
          .upsert({
            weeks,
            title: entry.plan.title,
            description: entry.plan.description ?? null,
            total_hours: entry.plan.totalHours ?? null,
            daily_commitment: entry.plan.dailyCommitment ?? null,
            pdf_path: entry.plan.pdfPath ?? null,
          })
          .select()
          .single();
        if (planErr) throw planErr;

        // Clear and re-insert weeks for idempotency
        await supabase.from('study_plan_weeks').delete().eq('plan_id', planRow.id);
        const weeksToInsert = entry.weeks.map(w => ({
          plan_id: planRow.id,
          week_number: w.weekNumber,
          chapters: w.chapters,
          focus: w.focus ?? null,
          hours: w.hours ?? null,
          tasks: w.tasks,
        }));
        const { error: weeksErr } = await supabase.from('study_plan_weeks').insert(weeksToInsert);
        if (weeksErr) throw weeksErr;
      }

      await loadData();
    } catch (e) {
      console.error('Plans import error', e);
    } finally {
      setUploading(false);
    }
  };

  const handlePDFUpload = async (file: File, suggestedPath: string): Promise<string | null> => {
    const { data, error } = await supabase.storage.from('study-assets').upload(suggestedPath, file, {
      upsert: true,
      contentType: file.type || 'application/pdf'
    });
    if (error) {
      console.error('Upload error', error);
      return null;
    }
    return data?.path ?? null;
  };

  return (
    <div className="space-y-8">
      <Card>
        <h3 className="text-lg font-semibold text-[#3b3b3b] mb-4">Importer les Notes d'étude (CSV)</h3>
        <div className="space-y-3">
          <Input type="file" accept=".csv" onChange={(e) => setNotesCSV(e.target.files?.[0] ?? null)} />
          <Button onClick={handleNotesCSV} disabled={!notesCSV || uploading}>
            <Upload className="h-4 w-4 mr-2" /> Importer Notes
          </Button>
          <div className="text-sm text-gray-600">
            Colonnes: chapter,title,section_title,points(pipe),pdf_path (header row allowed)
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-[#3b3b3b] mb-4">Importer les Plans d'étude (CSV)</h3>
        <div className="space-y-3">
          <Input type="file" accept=".csv" onChange={(e) => setPlansCSV(e.target.files?.[0] ?? null)} />
          <Button onClick={handlePlansCSV} disabled={!plansCSV || uploading}>
            <Upload className="h-4 w-4 mr-2" /> Importer Plans
          </Button>
          <div className="text-sm text-gray-600">
            Colonnes: weeks(6|8|12),week_number,chapters,focus,hours,tasks(pipe),pdf_path(optional)
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-[#3b3b3b] mb-4">Notes actuelles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map(n => (
            <div key={n.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">Chapitre {n.chapter} — {n.title}</div>
                {n.pdfPath && (
                  <a className="text-sm text-[#10ac69]" href={supabase.storage.from('study-assets').getPublicUrl(n.pdfPath).data.publicUrl} target="_blank">PDF</a>
                )}
              </div>
              <div className="text-sm text-gray-600">{n.sections.length} sections</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-[#3b3b3b] mb-4">Plans actuels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map(p => (
            <div key={p.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{p.title}</div>
                {p.pdfPath && (
                  <a className="text-sm text-[#10ac69]" href={supabase.storage.from('study-assets').getPublicUrl(p.pdfPath).data.publicUrl} target="_blank">PDF</a>
                )}
              </div>
              <div className="text-sm text-gray-600">{p.schedule.length} semaines</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};


