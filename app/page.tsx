'use client';

import { useState } from 'react';
import Flashcard from './components/Flashcard';

interface FlashcardData {
  question: string;
  answer: string;
}

export default function Home() {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleGenerate = async () => {
    setError('');

    try {
      let textToUse = '';
      let source = '';

      // 📄 PDF FLOW
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const raw = await response.text();
          let data;
          try {
            data = JSON.parse(raw);
          } catch {
          setError("Upload API failed");
          return;
          }

        if (!response.ok) {
          setError(data.error || 'Failed to process PDF');
          return;
        }

        textToUse = data.text;
        source = "pdf";
      }

      // ✍️ TEXT FLOW
      else if (text.trim()) {
        textToUse = text.trim();
        source = "manual";
      }

      else {
        setError("Please enter text or upload PDF");
        return;
      }

      const flashRes = await fetch('/api/generate-from-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToUse, source }),
      });

      const rawFlash = await flashRes.text();
      console.log("FLASH RESPONSE:", rawFlash);
      let flashData;
      try {
       flashData = JSON.parse(rawFlash);
      } catch {
      setError("Flashcard API returned invalid response");
      return;
     }

      if (!flashRes.ok) {
        setError(flashData.error || 'Failed to generate flashcards');
        return;
      }

      setFlashcards(flashData.flashcards);
      setCurrentCardIndex(0);
      setIsFlipped(false);

    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  const toggleFlip = () => setIsFlipped(!isFlipped);

  const handleNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleReset = () => {
    setFlashcards([]);
    setText('');
    setFile(null);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      
      {flashcards.length === 0 ? (
        // 🔥 INPUT UI (same as your original)
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            AI Flashcard Generator
          </h1>

          <div className="space-y-4">
            
            {/* TEXT INPUT */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paste your text here:
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to generate flashcards..."
                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* PDF UPLOAD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or upload a PDF:
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {file && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ {file.name} selected
                </p>
              )}
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              onClick={handleGenerate}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors"
            >
              Generate Flashcards
            </button>
          </div>
        </div>
      ) : (
        // 🔥 FLASHCARD UI (same as before)
        <div className="max-w-xl w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              AI Flashcard Generator
            </h1>
            <p className="text-gray-600">
              Card {currentCardIndex + 1} of {flashcards.length}
            </p>
          </div>

          <div className="mb-8">
            <Flashcard
              question={flashcards[currentCardIndex].question}
              answer={flashcards[currentCardIndex].answer}
              isFlipped={isFlipped}
              onFlip={toggleFlip}
            />
          </div>

          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={handlePrevious}
              disabled={currentCardIndex === 0}
              className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-300"
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              disabled={currentCardIndex === flashcards.length - 1}
              className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-300"
            >
              Next →
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
            >
              Generate New Flashcards
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
  