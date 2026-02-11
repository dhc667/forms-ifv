import { Plus, Trash2 } from 'lucide-react';
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
  return (
    <div className="border-2 border-dashed border-primary-light rounded-lg p-6 bg-background relative group">
      <button
        onClick={onDelete}
        className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
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
              Text
            </Button>
            <Button variant="default" size="sm" className="text-sm">
              Table
            </Button>
            <Button variant="default" size="sm" className="text-sm">
              Selection
            </Button>
          </div>
        </div>
      </div>

      <button onClick={() => onAddQuestion(questionNumber)} className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary-light text-primary-foreground rounded-full p-1.5 hover:bg-primary-dark transition-colors">
        <Plus size={18} />
      </button>
    </div>
  );
}
