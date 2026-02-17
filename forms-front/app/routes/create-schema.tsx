import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { QuestionCard } from '@/components/QuestionCard';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { SimpleContextMenu } from '@/components/form-renderers';
import type { FormSchema } from '@/lib/form-builder/types/form';
import { exampleFormSchema } from '@/lib/debug/data/form-schema';

export default function CreateSchemaPage() {
  const { t } = useTranslation('create-schema');
  const [formSchema, setFormSchema] = useState<FormSchema>(exampleFormSchema);

  const [contextMenu, setContextMenu] = useState<{
    element: any;
    position: { x: number; y: number };
  } | null>(null);

  // Handle click outside to close context menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.context-menu')) {
        setContextMenu(null);
      }
    };

    if (contextMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [contextMenu]);

  const deleteQuestion = (questionId: string) => {
    setFormSchema((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };

  const addQuestion = (index?: number) => {
    setFormSchema((prev) => {
      const newQuestion = {
        id: crypto.randomUUID(),
        components: [],
      };

      const newQuestions = [...prev.questions];
      if (index !== undefined) {
        newQuestions.splice(index, 0, newQuestion);
      } else {
        newQuestions.push(newQuestion);
      }

      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };

  const handleElementRightClick = (element: any, event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({
      element,
      position: { x: event.clientX, y: event.clientY },
    });
  };

  const handleSave = () => {
    console.log('Saving schema:', formSchema);
    toast.success(t('saveSuccess'));
  };

  return (
    <div className="bg-background min-h-screen">
      <Header />

      {/* Floating Save Button */}
      <Button onClick={handleSave} className="fixed top-20 right-8 z-50 shadow-lg">
        <Save className="mr-2 h-4 w-4" />
        {t('save')}
      </Button>

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">{formSchema.title}</h1>
              <p className="text-muted-foreground">ID: {formSchema.id}</p>
            </div>

            {formSchema.questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                questionNumber={index + 1}
                components={question.components}
                onDelete={() => deleteQuestion(question.id)}
                onElementRightClick={handleElementRightClick}
                onAddQuestion={addQuestion}
              />
            ))}

            <Button
              onClick={() => addQuestion()}
              variant="outline"
              className="border-primary-light bg-primary text-primary-foreground hover:bg-primary/5 w-full border-dashed"
            >
              <span className="mr-2 text-2xl">+</span>
              <span>{t('addQuestion')}</span>
            </Button>
          </div>
        </main>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <SimpleContextMenu
          element={contextMenu.element}
          position={contextMenu.position}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}
