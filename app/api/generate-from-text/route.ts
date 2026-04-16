import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, source } = await req.json();

    if (!text || text.trim() === "") {
      return NextResponse.json(
        { error: "No text provided" },
        { status: 400 }
      );
    }

    // ✍️ TEXT INPUT
    if (source === "manual") {
      return NextResponse.json({
        flashcards: [
          {
            question: "What is Artificial Intelligence?",
            answer: "AI is the simulation of human intelligence in machines.",
          },
          {
            question: "What is Machine Learning?",
            answer: "Machine Learning allows systems to learn from data.",
          },
          {
            question: "What is Deep Learning?",
            answer: "Deep Learning uses neural networks with multiple layers.",
          },
          
     
    {
      question: "Difference between AI and ML?",
      answer: "AI is the broader concept of machines being intelligent, while ML is a subset of AI that focuses on learning from data."
    },
    {
      question: "Difference between ML and Deep Learning?",
      answer: "ML uses simpler models and may require feature engineering, while Deep Learning uses neural networks and handles complex data automatically."
    },
    {
      question: "What is Supervised Learning?",
      answer: "Supervised Learning is a type of ML where the model is trained on labeled data with known outputs."
    },
    {
      question: "What is Unsupervised Learning?",
      answer: "Unsupervised Learning finds hidden patterns in data without labeled outputs."
    },
    {
      question: "What is Reinforcement Learning?",
      answer: "Reinforcement Learning is where an agent learns by interacting with an environment and receiving rewards or penalties."
    },
    {
      question: "What are Neural Networks?",
      answer: "Neural Networks are algorithms inspired by the human brain that process data through layers to recognize patterns."
    },
    {
      question: "What is Natural Language Processing?",
      answer: "NLP enables machines to understand, interpret, and generate human language."
    },
    {
      question: "What is Computer Vision?",
      answer: "Computer Vision allows machines to interpret and understand visual data like images and videos."
    },
    {
      question: "What is Overfitting?",
      answer: "Overfitting occurs when a model learns training data too well and performs poorly on new data."
    },
    {
      question: "What is Computer Vision?",
      answer: "Computer Vision enables machines to interpret visual data such as images and videos."
    },
    {
      question: "What is Transfer Learning?",
      answer: "Transfer Learning uses a pre-trained model on a new but related problem to save time and improve performance."
    },
    {
      question: "What is Feature Engineering?",
      answer: "Feature Engineering involves selecting and transforming variables to improve model performance."
    },
    {
      question: "What is Supervised vs Unsupervised Learning?",
      answer: "Supervised learning uses labeled data, while unsupervised learning identifies patterns in unlabeled data."
    },
    {
      question: "What is Gradient Descent?",
      answer: "Gradient Descent is an optimization algorithm used to minimize loss functions by updating model parameters iteratively."
    }
          
        ],
      });
    }

    //  PDF INPUT
    if (source === "pdf") {
      const flashcards = [
        {
          question: "What is this document about?",
          answer: text.slice(0, 150),
        },
        {
          question: "Summarize the document",
          answer: text.slice(0, 300),
        },
        {
          question: "Key idea?",
          answer: text.slice(150, 300),
        },
      ];

      return NextResponse.json({ flashcards });
    }

    return NextResponse.json({ flashcards: [] });

  } catch (error: any) {
    console.error("GEN ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}