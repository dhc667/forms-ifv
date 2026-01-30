import { Header } from '@/components/Header';
import { TableView } from '@/components/TableView';

export default function FormsPage() {
  return (
    <div>
      <Header showSearch={true}/>
      <TableView />
    </div>
  );
}
