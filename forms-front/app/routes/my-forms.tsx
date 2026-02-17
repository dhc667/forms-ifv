import { Header } from '@/components/Header';
import { MyFormsTableView } from '@/components/MyFormsTableView';

export default function MyFormsPage() {
  return (
    <div>
      <Header showSearch={true} />
      <MyFormsTableView />
    </div>
  );
}
