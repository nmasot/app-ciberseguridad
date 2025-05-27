import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PhishingEmail } from "@/lib/game-data";
import { cn } from "@/lib/utils";

interface EmailExampleProps {
  email: PhishingEmail;
  showAnswer?: boolean;
  className?: string;
}

export const EmailExample = ({
  email,
  showAnswer = false,
  className,
}: EmailExampleProps) => {
  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  };

  return (
    <Card className={cn("max-w-2xl mx-auto", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge className={difficultyColors[email.difficulty]}>
            {email.difficulty === "easy" && "Fácil"}
            {email.difficulty === "medium" && "Medio"}
            {email.difficulty === "hard" && "Difícil"}
          </Badge>
          {showAnswer && (
            <Badge variant={email.isPhishing ? "destructive" : "default"}>
              {email.isPhishing ? "⚠️ Phishing" : "✅ Legítimo"}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 border rounded-lg p-4 space-y-3">
          <div className="border-b pb-2">
            <div className="text-sm text-gray-600">De:</div>
            <div className="font-mono text-sm">{email.sender}</div>
          </div>

          <div className="border-b pb-2">
            <div className="text-sm text-gray-600">Asunto:</div>
            <div className="font-semibold">{email.subject}</div>
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-2">Contenido:</div>
            <div className="whitespace-pre-line text-sm bg-white p-3 rounded border">
              {email.body}
            </div>
          </div>
        </div>

        {showAnswer && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">
              Indicadores clave:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
              {email.indicators.map((indicator, index) => (
                <li key={index}>{indicator}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
