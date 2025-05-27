import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Trophy,
  Star,
  Clock,
  Target,
  RotateCcw,
  User,
  ArrowRight,
} from "lucide-react";
import { Badge as BadgeComponent } from "@/components/gamification/Badge";
import { PointsDisplay } from "@/components/gamification/PointsDisplay";
import { ProgressBar } from "@/components/gamification/ProgressBar";
import { useGameState } from "@/hooks/use-game-state";
import { getCurrentUser } from "@/lib/auth";

export default function Results() {
  const navigate = useNavigate();
  const { getResults, resetGame } = useGameState();
  const [user, setUser] = useState(getCurrentUser());
  const results = getResults();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    if (!results) {
      navigate("/game");
      return;
    }
  }, [user, results, navigate]);

  const handlePlayAgain = () => {
    resetGame();
    navigate("/game");
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90)
      return "¡Excelente trabajo! Eres un experto en detectar phishing.";
    if (score >= 70)
      return "¡Bien hecho! Tienes buenos conocimientos de seguridad.";
    if (score >= 50) return "Buen intento. Sigue practicando para mejorar.";
    return "Necesitas más práctica. ¡No te desanimes!";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  if (!user || !results) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-cybersec-blue">
              Resultados del Entrenamiento
            </h1>
            <Button
              variant="outline"
              onClick={() => navigate("/profile")}
              className="flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Ver Perfil</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Results Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-cybersec-blue to-cybersec-green rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-cybersec-blue">
              ¡Entrenamiento Completado!
            </h1>
            <p
              className={`text-xl font-medium ${getScoreColor(results.score)}`}
            >
              {getScoreMessage(results.score)}
            </p>
          </div>

          {/* Score Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-cybersec-blue rounded-full flex items-center justify-center mx-auto">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-cybersec-blue">
                  {results.score}%
                </CardTitle>
                <CardDescription>Puntuación Final</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-cybersec-green rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-cybersec-green">
                  {results.correctAnswers}/{results.totalQuestions}
                </CardTitle>
                <CardDescription>Respuestas Correctas</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-yellow-600">
                  {Math.floor(results.timeSpent / 60)}:
                  {(results.timeSpent % 60).toString().padStart(2, "0")}
                </CardTitle>
                <CardDescription>Tiempo Total</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Points and Badge Earned */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>Puntos Obtenidos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <PointsDisplay
                    points={results.pointsEarned}
                    label="Nuevos Puntos"
                    variant="cybersec"
                    animated
                  />
                  <div className="text-sm text-muted-foreground">
                    <p>
                      • Respuestas correctas: {results.correctAnswers} × 50 ={" "}
                      {results.correctAnswers * 50} puntos
                    </p>
                    <p>
                      • Bonificación por rendimiento:{" "}
                      {results.pointsEarned - results.correctAnswers * 50}{" "}
                      puntos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span>Insignia Obtenida</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <BadgeComponent
                    badge={{
                      id: "temp",
                      name: results.badge.name,
                      description: `Obtenido con ${results.score}% de aciertos`,
                      icon: results.badge.icon,
                      earnedAt: new Date(),
                      type: results.badge.type,
                    }}
                    size="lg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Update */}
          <Card>
            <CardHeader>
              <CardTitle>Tu Progreso Actualizado</CardTitle>
              <CardDescription>
                Revisa cómo has mejorado en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ProgressBar
                value={user.totalPoints + results.pointsEarned}
                max={2000}
                label="Puntos Totales"
                color="blue"
              />

              <ProgressBar
                value={user.completedLevels + 1}
                max={10}
                label="Niveles Completados"
                color="green"
              />

              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-cybersec-blue">Nivel Actual</p>
                  <p className="text-sm text-muted-foreground">
                    Has completado {user.completedLevels + 1} entrenamientos
                  </p>
                </div>
                <Badge className="bg-cybersec-blue text-white">
                  Nivel {Math.floor((user.completedLevels + 1) / 2) + 1}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handlePlayAgain}
              className="bg-cybersec-blue hover:bg-blue-600 flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jugar de Nuevo</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/profile")}
              className="flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Ver Perfil Completo</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Tips for Improvement */}
          {results.score < 90 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-cybersec-blue">
                  Consejos para Mejorar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <span className="text-cybersec-blue">•</span>
                    <p>
                      Verifica siempre el dominio del remitente antes de hacer
                      clic en enlaces
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-cybersec-blue">•</span>
                    <p>
                      Desconfía de emails que crean urgencia o presión para
                      actuar rápidamente
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-cybersec-blue">•</span>
                    <p>
                      Nunca proporciones información personal o credenciales por
                      email
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-cybersec-blue">•</span>
                    <p>
                      Cuando tengas dudas, contacta directamente con la empresa
                      por otros medios
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
