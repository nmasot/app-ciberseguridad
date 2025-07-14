import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, LogOut, User, ArrowLeft } from "lucide-react";
import { PasswordChallenge } from "@/components/password/PasswordChallenge";
import { getCurrentUser, updateUser, logout } from "@/lib/auth";
import { PointsDisplay } from "@/components/gamification/PointsDisplay";
import { ProgressBar } from "@/components/gamification/ProgressBar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PasswordGame() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    // Load completed password challenges from user data
    const passwordChallenges = user.badges
      .filter((badge) => badge.id.startsWith("password-"))
      .map((badge) => badge.id.replace("password-", ""));
    setCompletedChallenges(passwordChallenges);
  }, [user, navigate]);

  const handleChallengeComplete = (challengeId: string, points: number) => {
    if (!user) return;

    // Create new badge for the completed challenge
    const challengeTitles = {
      basic: "Creador de Contraseñas",
      intermediate: "Guardián de Credenciales",
      expert: "Maestro de la Seguridad",
    };

    const challengeIcons = {
      basic: "🔐",
      intermediate: "🛡️",
      expert: "👑",
    };

    const newBadge = {
      id: `password-${challengeId}`,
      name:
        challengeTitles[challengeId as keyof typeof challengeTitles] ||
        "Experto en Contraseñas",
      description: `Completó el desafío de contraseñas: ${challengeId}`,
      icon: challengeIcons[challengeId as keyof typeof challengeIcons] || "🔒",
      earnedAt: new Date(),
      type:
        challengeId === "expert"
          ? ("gold" as const)
          : challengeId === "intermediate"
            ? ("silver" as const)
            : ("bronze" as const),
    };

    // Update user data
    const updatedUser = {
      ...user,
      totalPoints: user.totalPoints + points,
      badges: [...user.badges, newBadge],
      lastActivity: new Date(),
    };

    updateUser(updatedUser);
    setUser(updatedUser);
    setCompletedChallenges((prev) => [...prev, challengeId]);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
              <Button
                variant="ghost"
                onClick={() => navigate("/game")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </Button>
              <Shield className="w-8 h-8 text-cybersec-blue" />
              <h1 className="text-xl font-bold text-cybersec-blue">
                Juego de Contraseñas
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-cybersec-blue">
              Laboratorio de Contraseñas Seguras
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aprende a crear contraseñas robustas que protejan tu información
              personal y empresarial. Completa los desafíos y mejora tus
              habilidades de seguridad digital.
            </p>
          </div>

          {/* Progress Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cybersec-blue rounded-full flex items-center justify-center">
                  <span className="text-2xl text-white">🎯</span>
                </div>
                <div>
                  <h3 className="font-semibold text-cybersec-blue">
                    Desafíos Completados
                  </h3>
                  <p className="text-2xl font-bold">
                    {completedChallenges.length}/3
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cybersec-green rounded-full flex items-center justify-center">
                  <span className="text-2xl text-white">🏆</span>
                </div>
                <div>
                  <h3 className="font-semibold text-cybersec-green">
                    Insignias de Contraseñas
                  </h3>
                  <p className="text-2xl font-bold">
                    {
                      user.badges.filter((badge) =>
                        badge.id.startsWith("password-"),
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-white">⭐</span>
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-600">
                    Puntos Totales
                  </h3>
                  <p className="text-2xl font-bold">{user.totalPoints}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <ProgressBar
              value={completedChallenges.length}
              max={3}
              label="Progreso en Desafíos de Contraseñas"
              color="blue"
            />
          </div>

          {/* Password Challenge Component */}
          <div className="bg-white p-8 rounded-lg border shadow-sm">
            <PasswordChallenge
              onChallengeComplete={handleChallengeComplete}
              completedChallenges={completedChallenges}
            />
          </div>

          {/* Security Tips */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-cybersec-blue mb-4">
              💡 Consejos para Contraseñas Seguras
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="flex items-start space-x-2">
                  <span className="text-cybersec-blue">•</span>
                  <span>Usa al menos 12 caracteres de longitud</span>
                </p>
                <p className="flex items-start space-x-2">
                  <span className="text-cybersec-blue">•</span>
                  <span>
                    Combina mayúsculas, minúsculas, números y símbolos
                  </span>
                </p>
                <p className="flex items-start space-x-2">
                  <span className="text-cybersec-blue">•</span>
                  <span>Evita información personal (nombres, fechas)</span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-start space-x-2">
                  <span className="text-cybersec-blue">•</span>
                  <span>No reutilices contraseñas importantes</span>
                </p>
                <p className="flex items-start space-x-2">
                  <span className="text-cybersec-blue">•</span>
                  <span>Considera usar un gestor de contraseñas</span>
                </p>
                <p className="flex items-start space-x-2">
                  <span className="text-cybersec-blue">•</span>
                  <span>
                    Actualiza contraseñas comprometidas inmediatamente
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres cerrar sesión? Tu progreso se
              guardará automáticamente.
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
