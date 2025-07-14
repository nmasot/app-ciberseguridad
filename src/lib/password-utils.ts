export interface PasswordStrength {
  score: number; // 0-100
  level: "very-weak" | "weak" | "fair" | "good" | "strong";
  feedback: string[];
  criteria: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
    commonWords: boolean;
  };
  points: number;
}

const commonPasswords = [
  "password",
  "123456",
  "123456789",
  "qwerty",
  "abc123",
  "password123",
  "admin",
  "letmein",
  "welcome",
  "monkey",
  "1234567890",
  "dragon",
  "master",
  "login",
  "pass",
  "solo",
  "hello",
  "freedom",
  "whatever",
  "princess",
  "sunshine",
  "iloveyou",
  "lovely",
  "secret",
  "football",
];

export const analyzePasswordStrength = (password: string): PasswordStrength => {
  const criteria = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password),
    commonWords: !commonPasswords.some((common) =>
      password.toLowerCase().includes(common.toLowerCase()),
    ),
  };

  const feedback: string[] = [];
  let score = 0;

  // Length scoring (0-40 points)
  if (password.length < 8) {
    feedback.push("La contraseña debe tener al menos 8 caracteres");
    score += Math.min(password.length * 2, 10);
  } else if (password.length < 12) {
    feedback.push("Considera usar al menos 12 caracteres para mayor seguridad");
    score += 20 + (password.length - 8) * 5;
  } else {
    score += 40;
  }

  // Character variety (0-40 points)
  if (!criteria.uppercase) {
    feedback.push("Incluye al menos una letra mayúscula (A-Z)");
  } else {
    score += 10;
  }

  if (!criteria.lowercase) {
    feedback.push("Incluye al menos una letra minúscula (a-z)");
  } else {
    score += 10;
  }

  if (!criteria.numbers) {
    feedback.push("Incluye al menos un número (0-9)");
  } else {
    score += 10;
  }

  if (!criteria.symbols) {
    feedback.push("Incluye al menos un símbolo especial (!@#$%^&*)");
  } else {
    score += 10;
  }

  // Common words check (0-20 points)
  if (!criteria.commonWords) {
    feedback.push("Evita usar palabras comunes o predecibles");
  } else {
    score += 20;
  }

  // Determine level and final adjustments
  let level: PasswordStrength["level"];
  if (score >= 90) {
    level = "strong";
    if (feedback.length === 0) {
      feedback.push("¡Excelente! Esta es una contraseña muy segura");
    }
  } else if (score >= 70) {
    level = "good";
  } else if (score >= 50) {
    level = "fair";
  } else if (score >= 30) {
    level = "weak";
  } else {
    level = "very-weak";
  }

  // Calculate points earned
  const points = Math.round(score / 10) * 5;

  return {
    score: Math.min(score, 100),
    level,
    feedback,
    criteria,
    points,
  };
};

export const generatePasswordSuggestion = (): string => {
  const adjectives = [
    "Secure",
    "Strong",
    "Swift",
    "Bright",
    "Quick",
    "Smart",
    "Bold",
    "Safe",
  ];
  const nouns = [
    "Lion",
    "Eagle",
    "Tiger",
    "Falcon",
    "Wolf",
    "Bear",
    "Shark",
    "Phoenix",
  ];
  const symbols = ["!", "@", "#", "$", "%", "^", "&", "*"];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 100) + 10;
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];

  return `${adjective}${noun}${number}${symbol}`;
};

export const getStrengthColor = (level: PasswordStrength["level"]): string => {
  switch (level) {
    case "very-weak":
      return "text-red-600";
    case "weak":
      return "text-orange-600";
    case "fair":
      return "text-yellow-600";
    case "good":
      return "text-blue-600";
    case "strong":
      return "text-green-600";
  }
};

export const getStrengthBgColor = (
  level: PasswordStrength["level"],
): string => {
  switch (level) {
    case "very-weak":
      return "bg-red-100";
    case "weak":
      return "bg-orange-100";
    case "fair":
      return "bg-yellow-100";
    case "good":
      return "bg-blue-100";
    case "strong":
      return "bg-green-100";
  }
};

export const getStrengthLabel = (level: PasswordStrength["level"]): string => {
  switch (level) {
    case "very-weak":
      return "Muy Débil";
    case "weak":
      return "Débil";
    case "fair":
      return "Regular";
    case "good":
      return "Buena";
    case "strong":
      return "Fuerte";
  }
};
