import { Header } from '@/components/Header';
import { SchemasTableView } from '@/components/SchemasTableView';

export default function SchemasPage() {
  return (
    <div>
      <Header showSearch={true} />
      <SchemasTableView />
    </div>
  );
}
