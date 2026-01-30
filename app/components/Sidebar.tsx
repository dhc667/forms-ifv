import { useState } from 'react';
import { ChevronRight, Search, Type, Table, List, Hash, Calendar, Mail, Phone } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ComponentItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
}

interface CollapsibleGroupProps {
  title: string;
  icon: React.ReactNode;
  items: ComponentItem[];
  defaultOpen?: boolean;
  onDragStart: (component: ComponentItem) => void;
}

function CollapsibleGroup({ title, icon, items, defaultOpen = false, onDragStart }: CollapsibleGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between p-3 h-auto font-medium hover:bg-muted/50"
        >
          <div className="flex items-center gap-2">
            {icon}
            <span>{title}</span>
          </div>
          <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 px-3 pb-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-background border border-border rounded p-3 cursor-move hover:bg-muted/50 transition-colors"
            draggable
            onDragStart={() => onDragStart(item)}
          >
            <div className="flex items-center gap-2 mb-2">
              {item.icon}
              <span className="text-sm font-medium">{item.title}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {item.preview}
            </div>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');

  const componentGroups = [
    {
      title: 'Text Components',
      icon: <Type className="h-4 w-4" />,
      defaultOpen: true,
      items: [
        {
          id: 'text-input',
          title: 'Text Input',
          icon: <Type className="h-3 w-3" />,
          preview: <Input placeholder="Enter text..." className="h-8 text-xs" readOnly />
        },
        {
          id: 'number-input',
          title: 'Number',
          icon: <Hash className="h-3 w-3" />,
          preview: <Input type="number" placeholder="0" className="h-8 text-xs" readOnly />
        },
        {
          id: 'email-input',
          title: 'Email',
          icon: <Mail className="h-3 w-3" />,
          preview: <Input type="email" placeholder="email@example.com" className="h-8 text-xs" readOnly />
        },
        {
          id: 'phone-input',
          title: 'Phone',
          icon: <Phone className="h-3 w-3" />,
          preview: <Input type="tel" placeholder="+1 (555) 123-4567" className="h-8 text-xs" readOnly />
        },
        {
          id: 'date-input',
          title: 'Date',
          icon: <Calendar className="h-3 w-3" />,
          preview: <Input type="date" className="h-8 text-xs" readOnly />
        },
        {
          id: 'textarea',
          title: 'Text Area',
          icon: <Type className="h-3 w-3" />,
          preview: <textarea className="w-full h-16 px-3 py-2 text-xs border border-border rounded resize-none bg-background" placeholder="Enter longer text..." readOnly />
        }
      ]
    },
    {
      title: 'Tables',
      icon: <Table className="h-4 w-4" />,
      defaultOpen: false,
      items: [
        {
          id: 'basic-table',
          title: 'Basic Table',
          icon: <Table className="h-3 w-3" />,
          preview: (
            <div className="border border-border rounded overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-2 py-1 text-left border-r">Column 1</th>
                    <th className="px-2 py-1 text-left">Column 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-1 border-r">Data 1</td>
                    <td className="px-2 py-1">Data 2</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="px-2 py-1 border-r">Data 3</td>
                    <td className="px-2 py-1">Data 4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        }
      ]
    },
    {
      title: 'Selection',
      icon: <List className="h-4 w-4" />,
      defaultOpen: false,
      items: [
        {
          id: 'radio-group',
          title: 'Single Choice',
          icon: <List className="h-3 w-3" />,
          preview: (
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-xs">
                <input type="radio" name="preview" className="text-primary" readOnly />
                Option 1
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input type="radio" name="preview" className="text-primary" readOnly />
                Option 2
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input type="radio" name="preview" className="text-primary" readOnly />
                Option 3
              </label>
            </div>
          )
        },
        {
          id: 'checkbox-group',
          title: 'Multiple Choice',
          icon: <List className="h-3 w-3" />,
          preview: (
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="text-primary" readOnly />
                Option 1
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="text-primary" readOnly />
                Option 2
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="text-primary" readOnly />
                Option 3
              </label>
            </div>
          )
        }
      ]
    }
  ];

  const filteredGroups = componentGroups.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const handleDragStart = (component: ComponentItem) => {
    // TODO: Implement drag and drop logic
    console.log('Dragging component:', component);
  };

  return (
    <aside className="w-80 bg-primary-light min-h-screen flex flex-col">
      <div className="p-4 border-b border-primary-dark">
        <h2 className="font-semibold text-lg text-primary-foreground mb-3">Components</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-border">
          {filteredGroups.map((group) => (
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