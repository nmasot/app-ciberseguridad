import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Shield, Play, LogOut, User } from "lucide-react";
import { QuestionCard } from "@/components/phishing/QuestionCard";
import { useGameState } from "@/hooks/use-game-state";
import { getCurrentUser, logout } from "@/lib/auth";
import { PointsDisplay } from "@/components/gamification/PointsDisplay";

export default function PhishingGame() {
  const navigate = useNavigate();
  const {
    gameState,
    startGame,
    answerQuestion,
    resetGame,
    getCurrentQuestion,
  } = useGameState();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    if (gameState.isGameFinished) {
      navigate("/results");
    }
  }, [gameState.isGameFinished, navigate]);

  const handleStartGame = () => {
    startGame(5); // Start game with 5 questions
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAnswer = (answerIndex: number) => {
    answerQuestion(answerIndex);
  };

  const currentQuestion = getCurrentQuestion();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-cybersec-blue" />
              <h1 className="text-xl font-bold text-cybersec-blue">
                CyberSec Training
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <PointsDisplay
                points={user.totalPoints}
                size="sm"
                variant="cybersec"
                className="px-3 py-1"
              />

              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/passwords")}
                className="flex items-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>Contraseñas</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/profile")}
                className="flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Perfil</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLogoutDialog(true)}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Salir</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!gameState.isGameStarted ? (
          /* Welcome Screen */
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-cybersec-blue">
                ¡Bienvenido, {user.name}!
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Pon a prueba tus conocimientos sobre phishing y aprende a
                proteger tu empresa de los ataques más comunes de ingeniería
                social.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-cybersec-blue rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl text-white">📧</span>
                  </div>
                  <CardTitle className="text-cybersec-blue">
                    Emails Reales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Analiza ejemplos reales de emails de phishing y aprende a
                    identificar las señales de alarma.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-cybersec-green rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl text-white">🎯</span>
                  </div>
                  <CardTitle className="text-cybersec-green">
                    Desafíos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Responde preguntas de opción múltiple y demuestra tu
                    capacidad para detectar amenazas.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl text-white">🏆</span>
                  </div>
                  <CardTitle className="text-yellow-600">Recompensas</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Gana puntos e insignias por tus logros y sube de nivel en tu
                    conocimiento de ciberseguridad.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl text-white">🔐</span>
                  </div>
                  <CardTitle className="text-purple-600">
                    Laboratorio de Contraseñas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>
                    Aprende a crear contraseñas seguras con retroalimentación en
                    tiempo real y desafíos interactivos.
                  </CardDescription>
                  <Button
                    onClick={() => navigate("/passwords")}
                    variant="outline"
                    className="w-full"
                  >
                    Ir al Laboratorio
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-cybersec-blue to-blue-600 text-white border-0">
                <CardHeader>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">📧</span>
                  </div>
                  <CardTitle className="text-white">
                    Entrenamiento Phishing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-blue-100">
                    Pon a prueba tus habilidades identificando emails maliciosos
                    en este módulo principal.
                  </CardDescription>
                  <Button
                    onClick={handleStartGame}
                    className="w-full bg-white text-cybersec-blue hover:bg-gray-100"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Comenzar Entrenamiento
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Game Screen */
          currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              questionNumber={gameState.currentQuestionIndex + 1}
              totalQuestions={gameState.questions.length}
              onAnswer={handleAnswer}
            />
          )
        )}
      </main>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres cerrar sesión? Se perderá cualquier
              progreso no guardado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancelar
            </Button>
            <AlertDialogAction onClick={handleLogout}>
              Cerrar Sesión
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
