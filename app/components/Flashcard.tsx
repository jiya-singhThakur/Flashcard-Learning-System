interface FlashcardProps {
  question: string;
  answer: string;
  isFlipped: boolean;
  onFlip: () => void;
}

export default function Flashcard({
  question,
  answer,
  isFlipped,
  onFlip,
}: FlashcardProps) {
  return (
    <div
      onClick={onFlip}
      className="bg-white rounded-lg shadow-lg p-6 h-48 flex flex-col items-center justify-center cursor-pointer transform transition-transform hover:scale-105"
    >
      <div className="text-center w-full overflow-hidden">
        <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">
          {isFlipped ? "Answer" : "Question"}
        </p>
        <p className="text-lg font-semibold text-gray-800 line-clamp-5">
          {isFlipped ? answer : question}
        </p>
      </div>
      <p className="text-xs text-gray-400 mt-4">Click to flip</p>
    </div>
  );
}
