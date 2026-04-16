'use client';

import { useState } from 'react';
import { Flashcard as FlashcardType } from '../types';

interface FlashcardProps {
  flashcard?: FlashcardType;
  question?: string;
  answer?: string;
  isFlipped?: boolean;
  onFlip?: () => void;
}

export default function Flashcard({ flashcard, question, answer, isFlipped, onFlip }: FlashcardProps) {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const usingFlashcardProp = Boolean(flashcard);
  const showFlipped = usingFlashcardProp ? internalFlipped : Boolean(isFlipped);
  const displayQuestion = flashcard ? flashcard.question : question || '';
  const displayAnswer = flashcard ? flashcard.answer : answer || '';
  const handleClick = () => {
    if (usingFlashcardProp) {
      setInternalFlipped(!internalFlipped);
    } else {
      onFlip?.();
    }
  };

  return (
    <div
      className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md p-6 cursor-pointer transform transition-transform hover:scale-105"
      onClick={handleClick}
    >
      <div className={`text-center ${showFlipped ? 'text-blue-600' : 'text-gray-800'}`}>
        <p className="text-lg font-medium">
          {showFlipped ? displayAnswer : displayQuestion}
        </p>
      </div>
      <div className="text-center mt-4 text-sm text-gray-500">
        Click to {showFlipped ? 'see question' : 'see answer'}
      </div>
    </div>
  );
}