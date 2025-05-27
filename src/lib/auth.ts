import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginData = z.infer<typeof loginSchema>;

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  totalPoints: number;
  badges: Badge[];
  completedLevels: number;
  lastActivity: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  type: "bronze" | "silver" | "gold";
}

// Mock authentication for demo
export const mockLogin = async (data: LoginData): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (data.email === "demo@empresa.com" && data.password === "demo123") {
    const user: User = {
      id: "1",
      email: data.email,
      name: "Usuario Demo",
      avatar: "👤",
      totalPoints: 750,
      badges: [
        {
          id: "first-login",
          name: "Primer Inicio",
          description: "Has iniciado sesión por primera vez",
          icon: "🎯",
          earnedAt: new Date(),
          type: "bronze",
        },
      ],
      completedLevels: 3,
      lastActivity: new Date(),
    };

    localStorage.setItem("cybersec-user", JSON.stringify(user));
    return user;
  }

  throw new Error("Credenciales inválidas");
};

export const getCurrentUser = (): User | null => {
  try {
    const userData = localStorage.getItem("cybersec-user");
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

export const updateUser = (updates: Partial<User>): void => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const updatedUser = { ...currentUser, ...updates };
    localStorage.setItem("cybersec-user", JSON.stringify(updatedUser));
  }
};

export const logout = (): void => {
  localStorage.removeItem("cybersec-user");
};
