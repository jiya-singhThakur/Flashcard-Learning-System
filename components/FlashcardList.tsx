import { Flashcard as FlashcardType } from '../types';
import Flashcard from './Flashcard';

interface FlashcardListProps {
  flashcards: FlashcardType[];
}

export default function FlashcardList({ flashcards }: FlashcardListProps) {
  if (flashcards.length === 0) {
    return <p className="text-center text-gray-500">No flashcards generated yet.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {flashcards.map((flashcard) => (
        <Flashcard key={flashcard.id} flashcard={flashcard} />
      ))}
    </div>
  );
}