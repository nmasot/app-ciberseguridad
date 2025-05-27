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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CalendarDays,
  Trophy,
  Target,
  Clock,
  ArrowLeft,
  Play,
  Star,
} from "lucide-react";
import { Badge as BadgeComponent } from "@/components/gamification/Badge";
import { PointsDisplay } from "@/components/gamification/PointsDisplay";
import { ProgressBar } from "@/components/gamification/ProgressBar";
import { getCurrentUser } from "@/lib/auth";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  const getPlayerLevel = (completedLevels: number) => {
    return Math.floor(completedLevels / 2) + 1;
  };

  const getNextLevelProgress = (completedLevels: number) => {
    return completedLevels % 2;
  };

  const getSecurityRating = (points: number) => {
    if (points >= 1500)
      return { rating: "Experto", color: "text-green-600", bg: "bg-green-100" };
    if (points >= 1000)
      return { rating: "Avanzado", color: "text-blue-600", bg: "bg-blue-100" };
    if (points >= 500)
      return {
        rating: "Intermedio",
        color: "text-yellow-600",
        bg: "bg-yellow-100",
      };
    return {
      rating: "Principiante",
      color: "text-gray-600",
      bg: "bg-gray-100",
    };
  };

  const getAchievements = () => {
    if (!user) return [];

    const achievements = [];

    if (user.totalPoints >= 100) {
      achievements.push({
        title: "Primeros Pasos",
        description: "Obtener 100 puntos",
        icon: "🎯",
        completed: true,
      });
    }

    if (user.totalPoints >= 500) {
      achievements.push({
        title: "Defensor Digital",
        description: "Obtener 500 puntos",
        icon: "🛡️",
        completed: true,
      });
    }

    if (user.totalPoints >= 1000) {
      achievements.push({
        title: "Guardián de la Seguridad",
        description: "Obtener 1000 puntos",
        icon: "🔒",
        completed: true,
      });
    }

    if (user.completedLevels >= 5) {
      achievements.push({
        title: "Veterano del Entrenamiento",
        description: "Completar 5 entrenamientos",
        icon: "📚",
        completed: true,
      });
    }

    if (user.badges.some((badge) => badge.type === "gold")) {
      achievements.push({
        title: "Perfección Dorada",
        description: "Obtener una insignia de oro",
        icon: "🥇",
        completed: true,
      });
    }

    // Future achievements
    if (user.totalPoints < 1500) {
      achievements.push({
        title: "Maestro de la Ciberseguridad",
        description: "Obtener 1500 puntos",
        icon: "👑",
        completed: false,
      });
    }

    return achievements;
  };

  if (!user) {
    return null;
  }

  const securityRating = getSecurityRating(user.totalPoints);
  const playerLevel = getPlayerLevel(user.completedLevels);
  const nextLevelProgress = getNextLevelProgress(user.completedLevels);
  const achievements = getAchievements();

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
              <h1 className="text-xl font-bold text-cybersec-blue">
                Mi Perfil
              </h1>
            </div>
            <Button
              onClick={() => navigate("/game")}
              className="bg-cybersec-blue hover:bg-blue-600 flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Nuevo Entrenamiento</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="text-3xl bg-cybersec-blue text-white">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left space-y-3">
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge
                      className={`${securityRating.bg} ${securityRating.color} border-0`}
                    >
                      Nivel de Seguridad: {securityRating.rating}
                    </Badge>
                    <Badge variant="outline">Nivel {playerLevel}</Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center space-x-1"
                    >
                      <CalendarDays className="w-3 h-3" />
                      <span>
                        Miembro desde {user.lastActivity.toLocaleDateString()}
                      </span>
                    </Badge>
                  </div>
                </div>

                <PointsDisplay
                  points={user.totalPoints}
                  variant="cybersec"
                  size="md"
                />
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Entrenamientos Completados
                </CardTitle>
                <Target className="h-4 w-4 ml-auto text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cybersec-blue">
                  {user.completedLevels}
                </div>
                <p className="text-xs text-muted-foreground">
                  +1 desde la última sesión
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Insignias Obtenidas
                </CardTitle>
                <Trophy className="h-4 w-4 ml-auto text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cybersec-green">
                  {user.badges.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {user.badges.filter((b) => b.type === "gold").length} de oro,{" "}
                  {user.badges.filter((b) => b.type === "silver").length} de
                  plata
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Última Actividad
                </CardTitle>
                <Clock className="h-4 w-4 ml-auto text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Hoy</div>
                <p className="text-xs text-muted-foreground">
                  {user.lastActivity.toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Progress Section */}
          <Card>
            <CardHeader>
              <CardTitle>Progreso Actual</CardTitle>
              <CardDescription>
                Tu camino hacia convertirte en un experto en ciberseguridad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ProgressBar
                value={user.totalPoints}
                max={2000}
                label="Progreso hacia Maestro (2000 puntos)"
                color="blue"
              />

              <ProgressBar
                value={nextLevelProgress}
                max={2}
                label={`Progreso hacia Nivel ${playerLevel + 1}`}
                color="green"
              />

              <ProgressBar
                value={user.badges.length}
                max={10}
                label="Colección de Insignias"
                color="default"
              />
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Tabs defaultValue="badges" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="badges">Mis Insignias</TabsTrigger>
              <TabsTrigger value="achievements">Logros</TabsTrigger>
            </TabsList>

            <TabsContent value="badges" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Colección de Insignias</CardTitle>
                  <CardDescription>
                    Todas las insignias que has obtenido en tu entrenamiento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user.badges.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {user.badges.map((badge) => (
                        <BadgeComponent
                          key={badge.id}
                          badge={badge}
                          size="md"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Aún no has obtenido insignias. ¡Completa tu primer
                        entrenamiento para empezar!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Logros Desbloqueados</CardTitle>
                  <CardDescription>
                    Metas alcanzadas y desafíos completados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-4 p-4 rounded-lg border ${
                          achievement.completed
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3
                            className={`font-medium ${
                              achievement.completed
                                ? "text-green-900"
                                : "text-gray-600"
                            }`}
                          >
                            {achievement.title}
                          </h3>
                          <p
                            className={`text-sm ${
                              achievement.completed
                                ? "text-green-700"
                                : "text-gray-500"
                            }`}
                          >
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.completed && (
                          <Badge className="bg-green-600 text-white">
                            ✓ Completado
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
