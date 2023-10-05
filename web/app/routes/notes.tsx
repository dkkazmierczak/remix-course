import { redirect } from '@remix-run/node';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import { getStoredNotes, storeNotes } from '~/data/notes';

export function links() {
  return [...newNoteLinks()];
}

export default function NotesPage() {
  return (
    <main>
      <h1>My notes</h1>
      <NewNote />
    </main>
  );
}

//this is done on the server, not in the browser
export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const noteData = {
    title: formData.get('title'),
    content: formData.get('content'),
    id: new Date().toISOString(),
  };
  //    Object.fromEntries(formData)
  const existingNotes = await getStoredNotes();
  // noteData.id = new Date().toISOString()
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect('/notes');
};
