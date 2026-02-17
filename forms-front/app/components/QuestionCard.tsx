import { Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ElementRenderer } from '@/components/form-renderers';
import type { QuestionComponent } from '@/lib/form-builder/types/question';

interface QuestionCardProps {
  questionNumber: number;
  components: QuestionComponent[]; // Required now
  onDelete: () => void;
  onAddQuestion: (index?: number) => void;
  onElementRightClick: (element: any, event: React.MouseEvent) => void;
}

export function QuestionCard({
  questionNumber,
  components,
  onDelete,
  onElementRightClick,
  onAddQuestion,
}: QuestionCardProps) {
  const { t } = useTranslation('create-schema');
  return (
    <div className="border-primary-light bg-background group relative rounded-lg border-2 border-dashed p-6">
      <button
        onClick={onDelete}
        className="text-muted-foreground hover:text-destructive absolute top-4 right-4 opacity-0 transition-colors group-hover:opacity-100"
      >
        <Trash2 size={18} />
      </button>

      <div className="flex gap-4">
        <span className="text-muted-foreground text-lg">{questionNumber}.</span>
        <div className="flex-1 space-y-4">
          {/* New form elements rendering */}
          {components.map((component, idx) => (
            <ElementRenderer
              key={component.id || idx}
              element={component}
              onRightClick={onElementRightClick || (() => {})}
            />
          ))}

          <div className="flex justify-center gap-3 pt-4">
            <Button variant="default" size="sm" className="text-sm">
              {t('elementTypes.text')}
            </Button>
            <Button variant="default" size="sm" className="text-sm">
              {t('elementTypes.table')}
            </Button>
            <Button variant="default" size="sm" className="text-sm">
              {t('elementTypes.selection')}
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={() => onAddQuestion(questionNumber)}
        className="bg-primary-light text-primary-foreground hover:bg-primary-dark absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full p-1.5 transition-colors"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
