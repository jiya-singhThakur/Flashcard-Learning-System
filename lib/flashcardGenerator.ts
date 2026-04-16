interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

const commonDefinitions: Record<string, string> = {
  'artificial intelligence': 'Artificial Intelligence is the simulation of human intelligence in machines. It enables systems to learn from data and make decisions.',
  'ai': 'AI stands for Artificial Intelligence, the field where machines perform tasks that usually require human intelligence.',
  'machine learning': 'Machine Learning is a subset of AI that enables systems to learn from data without explicit programming. It improves performance through experience.',
  'ml': 'ML stands for Machine Learning, which teaches computers to improve their performance by learning from examples.',
  'deep learning': 'Deep Learning is a subset of Machine Learning that uses neural networks with many layers. It is often used for image and speech recognition.',
  'dl': 'DL stands for Deep Learning, a form of machine learning that uses layered neural networks for complex pattern recognition.',
  'natural language processing': 'Natural Language Processing is the field that enables computers to understand and generate human language. It is used in chatbots, translation, and text analysis.',
  'nlp': 'NLP stands for Natural Language Processing, the technology behind how machines understand and work with human language.',
  'neural network': 'A neural network is a computing system inspired by the human brain. It consists of layers of connected nodes that learn to recognize patterns.',
  'computer vision': 'Computer Vision is the field that enables computers to interpret and understand images and video. It is used for tasks like object detection and face recognition.',
};

function getDefinitionForQuestion(question: string): string {
  const concept = question.trim().replace(/^what is\s+/i, '').replace(/\?$/, '').trim().toLowerCase();
  if (!concept) return '';
  const normalized = concept.replace(/\s+/g, ' ');
  if (commonDefinitions[normalized]) {
    return commonDefinitions[normalized];
  }
  const capitalized = concept.charAt(0).toUpperCase() + concept.slice(1);
  return `${capitalized} refers to ${concept}. It is a concept that explains the main idea behind this term in a clear and simple way.`;
}

export function generateFlashcards(text: string): Flashcard[] {
  const flashcards: Flashcard[] = [];
  const trimmedText = text.trim();
  const questionMatch = trimmedText.match(/^what is\s+(.+?)[?]?$/i);

  if (questionMatch) {
    const answer = getDefinitionForQuestion(trimmedText);
    return [{ id: 'card-1', question: trimmedText, answer }];
  }

  // Split text into sentences
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10);

  // Look for definition patterns: "X is ..." or "X are ..."
  const definitionPatterns = [
    /(\w+(?:\s+\w+)*)\s+is\s+([^.]*)/gi,
    /(\w+(?:\s+\w+)*)\s+are\s+([^.]*)/gi,
    /(\w+(?:\s+\w+)*)\s+refers?\s+to\s+([^.]*)/gi,
  ];

  for (const sentence of sentences) {
    for (const pattern of definitionPatterns) {
      const matches = [...sentence.matchAll(pattern)];
      for (const match of matches) {
        const concept = match[1].trim();
        const definition = match[2].trim();

        // Skip if concept is too short or common word
        if (concept.length < 3 || /^[a-z]$/i.test(concept)) continue;

        // Create question
        const question = `What is ${concept}?`;

        // Create answer: combine definition with next sentence if needed, limit to 2-3 lines
        let answer = definition;
        const sentenceIndex = sentences.indexOf(sentence);
        if (sentenceIndex < sentences.length - 1 && answer.split(' ').length < 20) {
          answer += '. ' + sentences[sentenceIndex + 1];
        }
        // Limit to approximately 2-3 lines (about 100-150 characters)
        if (answer.length > 150) {
          answer = answer.substring(0, 150) + '...';
        }

        // Avoid duplicates
        if (!flashcards.some(f => f.question === question)) {
          flashcards.push({
            id: `card-${flashcards.length + 1}`,
            question,
            answer
          });
        }
      }
    }
  }

  // If no flashcards found, create from key sentences
  if (flashcards.length === 0) {
    for (let i = 0; i < Math.min(5, sentences.length); i++) {
      const sentence = sentences[i];
      // Try to extract a concept from the sentence
      const words = sentence.split(' ');
      const concept = words.slice(0, 3).join(' '); // First few words as concept
      const question = `What is ${concept}?`;
      const answer = sentence.length > 150 ? sentence.substring(0, 150) + '...' : sentence;

      flashcards.push({
        id: `card-${i + 1}`,
        question,
        answer
      });
    }
  }

  return flashcards.slice(0, 10); // Limit to 10 flashcards
}
