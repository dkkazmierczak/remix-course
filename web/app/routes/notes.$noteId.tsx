import { Link, useLoaderData, useRouteError } from '@remix-run/react';
import { LinksFunction, json } from '@remix-run/node';

import noteStyles from '../styles/noteDetails.css';
import { getStoredNotes } from '~/data/notes';
import NewNote from '~/components/NewNote';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: noteStyles }];

export default function NoreDetailsPage() {
  const note = useLoaderData();

  return (
    <main id='note-details'>
      <header>
        <nav>
          <Link to='/notes'>Back to all notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id='note-details-content'>{note.content}</p>
    </main>
  );
}

export async function loader({ params: { noteId } }: any) {
  const notes = await getStoredNotes();
  const selectedNote = notes.find((note: any) => note.id === noteId);
  if (!selectedNote) {
    throw json({ message: 'Note not found for id ' + noteId }, { status: 404 });
  }
  return selectedNote;
}

export function CatchBoundary() {
  const error = useRouteError();
  return (
    <main>
      <p className='info-message'>{error?.data?.message ?? 'Something went wrong'}</p>
    </main>
  );
}
