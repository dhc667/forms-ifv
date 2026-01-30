import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { QuestionCard } from '@/components/QuestionCard';
import { Button } from '@/components/ui/button';

type Question = {
  id: number;
  text?: string;
  blanks?: { text: string; beforeText: string }[];
};

export default function CreateSchemaPage() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: 'You should complete with phrases the correct answer. This type of activity helps improve understanding of various topics, such as history, science, or literature.',
      blanks: [
        { text: '', beforeText: 'The sun is a star located in the center of our' },
        { text: '', beforeText: 'The capital of France is' }
      ]
    },
    {
      id: 2,
      blanks: []
    }
  ]);

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const addQuestion = () => {
    const newId = Math.max(...questions.map(q => q.id), 0) + 1;
    setQuestions([...questions, { id: newId, blanks: [] }]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                questionNumber={index + 1}
                text={question.text}
                blanks={question.blanks}
                onDelete={() => deleteQuestion(question.id)}
              />
            ))}

            <Button
              onClick={addQuestion}
              variant="outline"
              className="w-full border-dashed border-primary-light text-primary hover:bg-primary/5"
            >
              <span className="text-2xl mr-2">+</span>
              <span>Add Question</span>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}