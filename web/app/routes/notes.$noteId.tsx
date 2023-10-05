import { Link } from '@remix-run/react';
import { LinksFunction } from '@remix-run/node';

import noteStyles from '../styles/noteDetails.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: noteStyles }];

export default function NoreDetailsPage() {
  return (
    <main id='note-details'>
      <header>
        <nav>
          <Link to='/notes'>Back to all notes</Link>
        </nav>
        <h1>Note title</h1>
      </header>
      <p id='note-details-content'>content</p>
    </main>
  );
}
