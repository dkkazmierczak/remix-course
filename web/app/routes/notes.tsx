import { json, redirect } from '@remix-run/node';
import { useLoaderData, useRouteError } from '@remix-run/react';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import NoteList, { links as noteListLinks } from '~/components/NoteList';
import { getStoredNotes, storeNotes } from '~/data/notes';

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export const meta = () => {
  return {
    title: 'All notes',
  };
};

export default function NotesPage() {
  const notes = useLoaderData();
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

//this will never reach client side
export const loader = async () => {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json({ message: 'No notes found' }, { status: 404, statusText: 'Not found' });
  }
  return notes;
  //it returns a json response
  //   return json(notes);
};

//this is done on the server, not in the browser
export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const noteData = {
    title: formData.get('title'),
    content: formData.get('content'),
    id: new Date().toISOString(),
  };
  //    Object.fromEntries(formData)

  if (noteData.title.length < 3) {
    return json({ message: 'Title must be at least 3 characters long' }, { status: 422 });
  }

  const existingNotes = await getStoredNotes();
  // noteData.id = new Date().toISOString()
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  //   await new Promise(resolve => setTimeout(resolve, 2000));
  return redirect('/notes');
};

export function CatchBoundary() {
  const error = useRouteError();
  return (
    <main>
      <NewNote />
      <p className='info-message'>{error?.data?.message ?? 'Something went wrong'}</p>
    </main>
  );
}
