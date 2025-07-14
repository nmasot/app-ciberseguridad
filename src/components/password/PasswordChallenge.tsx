import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, RefreshCw, Trophy, Target } from "lucide-react";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";
import {
  analyzePasswordStrength,
  generatePasswordSuggestion,
  type PasswordStrength,
} from "@/lib/password-utils";
import { PointsDisplay } from "@/components/gamification/PointsDisplay";

interface Challenge {
  id: string;
  title: string;
  description: string;
  target: string;
  minScore: number;
  points: number;
  difficulty: "easy" | "medium" | "hard";
}

const challenges: Challenge[] = [
  {
    id: "basic",
    title: "Contraseña Básica",
    description:
      "Crea una contraseña que cumpla con los criterios básicos de seguridad",
    target: "Alcanza al menos 50 puntos",
    minScore: 50,
    points: 100,
    difficulty: "easy",
  },
  {
    id: "intermediate",
    title: "Contraseña Fuerte",
    description: "Crea una contraseña robusta que sea difícil de descifrar",
    target: "Alcanza al menos 70 puntos",
    minScore: 70,
    points: 200,
    difficulty: "medium",
  },
  {
    id: "expert",
    title: "Contraseña de Experto",
    description: "Crea una contraseña extremadamente segura",
    target: "Alcanza al menos 90 puntos",
    minScore: 90,
    points: 300,
    difficulty: "hard",
  },
];

interface PasswordChallengeProps {
  onChallengeComplete: (challengeId: string, points: number) => void;
  completedChallenges: string[];
}

export const PasswordChallenge = ({
  onChallengeComplete,
  completedChallenges,
}: PasswordChallengeProps) => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(
    null,
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState<PasswordStrength | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setStrength(analyzePasswordStrength(value));
    setIsCompleted(false);
  };

  const handleStartChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge);
    setPassword("");
    setStrength(null);
    setIsCompleted(false);
  };

  const handleSubmitPassword = () => {
    if (!strength || !currentChallenge) return;

    if (strength.score >= currentChallenge.minScore) {
      setIsCompleted(true);
      onChallengeComplete(currentChallenge.id, currentChallenge.points);
    }
  };

  const handleGenerateSuggestion = () => {
    const suggestion = generatePasswordSuggestion();
    setPassword(suggestion);
    setStrength(analyzePasswordStrength(suggestion));
  };

  const handleBackToMenu = () => {
    setCurrentChallenge(null);
    setPassword("");
    setStrength(null);
    setIsCompleted(false);
  };

  const getDifficultyColor = (difficulty: Challenge["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
    }
  };

  const getDifficultyLabel = (difficulty: Challenge["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return "Fácil";
      case "medium":
        return "Medio";
      case "hard":
        return "Difícil";
    }
  };

  if (!currentChallenge) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-cybersec-blue">
            Desafíos de Contraseñas
          </h2>
          <p className="text-gray-600">
            Aprende a crear contraseñas seguras completando estos desafíos
          </p>
        </div>

        <div className="grid gap-4">
          {challenges.map((challenge) => {
            const isCompleted = completedChallenges.includes(challenge.id);

            return (
              <Card
                key={challenge.id}
                className={isCompleted ? "border-green-500 bg-green-50" : ""}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center space-x-2">
                        <span>{challenge.title}</span>
                        {isCompleted && (
                          <Trophy className="w-5 h-5 text-green-600" />
                        )}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={getDifficultyColor(challenge.difficulty)}
                        >
                          {getDifficultyLabel(challenge.difficulty)}
                        </Badge>
                        <PointsDisplay
                          points={challenge.points}
                          size="sm"
                          label="pts"
                        />
                      </div>
                    </div>
                  </div>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700">
                        Objetivo:
                      </p>
                      <p className="text-sm text-gray-600">
                        {challenge.target}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleStartChallenge(challenge)}
                      disabled={isCompleted}
                      className="bg-cybersec-blue hover:bg-blue-600"
                    >
                      {isCompleted ? "Completado" : "Comenzar"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cybersec-blue">
            {currentChallenge.title}
          </h2>
          <p className="text-gray-600">{currentChallenge.description}</p>
        </div>
        <Button variant="outline" onClick={handleBackToMenu}>
          Volver al Menú
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Objetivo</span>
              </CardTitle>
              <CardDescription>{currentChallenge.target}</CardDescription>
            </div>
            <PointsDisplay
              points={currentChallenge.points}
              label="Puntos posibles"
              variant="cybersec"
            />
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Crear Contraseña</CardTitle>
            <CardDescription>
              Escribe una contraseña que cumpla con los criterios del desafío
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Tu contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Escribe tu contraseña aquí..."
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handleGenerateSuggestion}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Generar Sugerencia</span>
              </Button>

              {strength && password && (
                <Button
                  onClick={handleSubmitPassword}
                  disabled={
                    strength.score < currentChallenge.minScore || isCompleted
                  }
                  className="bg-cybersec-blue hover:bg-blue-600"
                >
                  {strength.score >= currentChallenge.minScore
                    ? "Completar Desafío"
                    : "Mejorar Contraseña"}
                </Button>
              )}
            </div>

            {isCompleted && (
              <Alert className="border-green-500 bg-green-50">
                <Trophy className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  ¡Excelente! Has completado el desafío y ganado{" "}
                  {currentChallenge.points} puntos.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Análisis de Seguridad</CardTitle>
            <CardDescription>
              Retroalimentación en tiempo real sobre la fortaleza de tu
              contraseña
            </CardDescription>
          </CardHeader>
          <CardContent>
            {strength ? (
              <PasswordStrengthIndicator strength={strength} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                Escribe una contraseña para ver el análisis de seguridad
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
