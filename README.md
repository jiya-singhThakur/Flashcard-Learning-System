📚 AI PDF Flashcard App

A smart flashcard generator that converts PDF documents into structured, interactive study decks using AI. Built with Next.js.
It helps students learn more effectively using active recall and spaced repetition, instead of passive reading.
The system extracts key concepts from documents and turns them into meaningful flashcards that can be revised and tracked over time.

🚀 Why this project?
  - Most students struggle with:
  - Memorizing large content from PDFs
  - Inefficient revision methods
  - Passive reading without retention

This app solves that by automatically converting study material into an interactive learning system.

🚀 Features
📄 Upload any PDF (notes, textbooks, documents)
🤖 AI-powered flashcard generation
🧠 Extracts:
Key concepts
  - Definitions
  - Important relationships
  - Examples & edge cases
🗂️ Multiple deck management
⚡ Fast, responsive UI

🧠 How it works
User uploads a PDF
Backend extracts text content
AI processes content and generates flashcards
Flashcards are stored in structured decks

🛠️ Tech Stack
Next.js (App Router)
TypeScript
Tailwind CSS
PDF parsing library
AI API (OpenAI / similar)
Node.js backend routes

🧩 Project Structure
/app – Pages & API routes
/components – UI components
/lib – Utility functions (PDF parsing, AI logic, etc.)
/types – TypeScript types

▶️ Getting Started
npm install
npm run dev

Open the app in your browser:
http://localhost:<port>

📈 Future Improvements
OCR support for scanned PDFs
Better AI prompt tuning for higher-quality cards
User authentication
Cloud sync for decks
Mobile responsive flashcard mode

🏗️Architecture
User Uploads PDF
        ↓
Frontend (Next.js UI)
        ↓
API Route (/api/...)
        ↓
PDF Processing (pdf-parse)
        ↓
Text Extraction & Cleaning
        ↓
AI Model (Flashcard Generation)
        ↓
Structured Flashcards
        ↓
Frontend Displays Deck

##screenshots
<img width="1920" height="1140" alt="Screenshot 2026-04-17 021810" src="https://github.com/user-attachments/assets/41d6dbb9-11cc-4cb4-8b0b-ef952b1e4e06" />
<img width="1920" height="1140" alt="Screenshot 2026-04-17 021645" src="https://github.com/user-attachments/assets/503886bf-ebba-428f-83d4-3a00e29ca0a1" />




