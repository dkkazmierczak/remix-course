import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import NoteList, { links as noteListLinks } from '~/components/NoteList';
import { getStoredNotes, storeNotes } from '~/data/notes';

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

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
