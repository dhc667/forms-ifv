import { useState } from 'react';
import { ChevronRight, Type, Table, List, Image } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { PreviewRenderer } from '@/components/form-renderers/PreviewRenderer';
import { createSidebarElements } from '@/lib/form-builder/sidebar-elements';
import type { QuestionComponent } from '@/lib/form-builder/types/question';

interface ComponentItem {
  id: string;
  preview: React.ReactNode;
  schema: QuestionComponent;
}

interface CollapsibleGroupProps {
  title: string;
  icon: React.ReactNode;
  items: ComponentItem[];
  defaultOpen?: boolean;
  onDragStart: (component: ComponentItem) => void;
}

function CollapsibleGroup({
  title,
  icon,
  items,
  defaultOpen = false,
  onDragStart,
}: CollapsibleGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-muted/50 text-primary-foreground h-auto w-full justify-between p-3 font-medium"
        >
          <div className="flex items-center gap-2">
            {icon}
            <span>{title}</span>
          </div>
          <ChevronRight
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 px-3 pb-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="border-border/30 hover:bg-muted/20 bg-background cursor-move rounded border border-dashed p-2 transition-all"
            draggable
            onDragStart={() => onDragStart(item)}
          >
            {item.preview}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function Sidebar() {
  const { t } = useTranslation(['navigation', 'form-builder']);

  // Generate sidebar elements with current language
  const sidebarElementFactories = createSidebarElements(t);

  // Create component groups
  const componentGroups = [
    {
      title: t('textComponents'),
      icon: <Type className="h-4 w-4" />,
      defaultOpen: true,
      items: sidebarElementFactories
        .filter((el) => el.type === 'text')
        .map((el) => ({
          id: el.id,
          preview: <PreviewRenderer element={el.createElement(t)} />,
          schema: el.createElement(t),
        })),
    },
    {
      title: t('tables'),
      icon: <Table className="h-4 w-4" />,
      defaultOpen: false,
      items: sidebarElementFactories
        .filter((el) => el.type === 'table')
        .map((el) => ({
          id: el.id,
          preview: <PreviewRenderer element={el.createElement(t)} />,
          schema: el.createElement(t),
        })),
    },
    {
      title: t('selection'),
      icon: <List className="h-4 w-4" />,
      defaultOpen: false,
      items: sidebarElementFactories
        .filter((el) => el.type === 'selection')
        .map((el) => ({
          id: el.id,
          preview: <PreviewRenderer element={el.createElement(t)} />,
          schema: el.createElement(t),
        })),
    },
    {
      title: t('images'),
      icon: <Image className="h-4 w-4" />,
      defaultOpen: false,
      items: sidebarElementFactories
        .filter((el) => el.type === 'image')
        .map((el) => ({
          id: el.id,
          preview: <PreviewRenderer element={el.createElement(t)} />,
          schema: el.createElement(t),
        })),
    },
  ];

  const handleDragStart = (component: ComponentItem) => {
    // TODO: Implement drag and drop logic
    console.log('Dragging component:', component);
  };

  return (
    <aside className="bg-primary-light flex min-h-screen w-80 flex-col">
      <div className="border-primary-dark border-b p-4">
        <h2 className="text-primary-foreground text-lg font-semibold">{t('components')}</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-border divide-y">
          {componentGroups.map((group) => (
            <CollapsibleGroup
              key={group.title}
              title={group.title}
              icon={group.icon}
              items={group.items}
              defaultOpen={group.defaultOpen}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
