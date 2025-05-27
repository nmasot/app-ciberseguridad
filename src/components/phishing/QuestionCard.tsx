import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GameQuestion } from "@/lib/game-data";
import { EmailExample } from "./EmailExample";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: GameQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerIndex: number) => void;
  showFeedback?: boolean;
  userAnswer?: number;
  className?: string;
}

export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  showFeedback = false,
  userAnswer,
  className,
}: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === "") return;

    const answerIndex = parseInt(selectedAnswer);
    setHasAnswered(true);
    onAnswer(answerIndex);
  };

  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-cybersec-blue">
          Pregunta {questionNumber} de {totalQuestions}
        </h2>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-cybersec-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <EmailExample email={question.email} showAnswer={showFeedback} />

      <Card>
        <CardHeader>
          <CardTitle className="text-cybersec-blue">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={selectedAnswer}
            onValueChange={setSelectedAnswer}
            disabled={hasAnswered}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  className={cn(
                    showFeedback &&
                      userAnswer === index &&
                      isCorrect &&
                      "border-green-500",
                    showFeedback &&
                      userAnswer === index &&
                      !isCorrect &&
                      "border-red-500",
                  )}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className={cn(
                    "cursor-pointer text-sm flex-1 p-2 rounded transition-colors",
                    showFeedback &&
                      index === question.correctAnswer &&
                      "bg-green-100 text-green-800",
                    showFeedback &&
                      userAnswer === index &&
                      !isCorrect &&
                      "bg-red-100 text-red-800",
                  )}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {!hasAnswered && !showFeedback && (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === ""}
              className="w-full bg-cybersec-blue hover:bg-blue-600"
            >
              Responder
            </Button>
          )}

          {showFeedback && (
            <Alert
              className={isCorrect ? "border-green-500" : "border-red-500"}
            >
              <AlertDescription>
                <div className="space-y-2">
                  <div
                    className={cn(
                      "font-semibold",
                      isCorrect ? "text-green-700" : "text-red-700",
                    )}
                  >
                    {isCorrect ? "¡Correcto!" : "Incorrecto"}
                    {!isCorrect &&
                      ` - La respuesta correcta era: ${question.options[question.correctAnswer]}`}
                  </div>
                  <div className="text-sm">
                    <strong>Explicación:</strong> {question.explanation}
                  </div>
                  <div className="text-sm text-cybersec-blue font-medium">
                    Puntos obtenidos: {isCorrect ? question.points : 0}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
