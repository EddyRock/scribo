import EmptyPage from './EmptyPage';
import NotesList from '@/components/NotesList/NotesList';

import { useParams } from 'react-router';

function HomePage() {
  const { folderId = '' } = useParams();

  console.log(folderId);

  return <>{folderId ? <NotesList folderId={folderId} /> : <EmptyPage />}</>;
}

export default HomePage;
