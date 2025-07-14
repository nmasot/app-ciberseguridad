import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  PasswordStrength,
  getStrengthColor,
  getStrengthBgColor,
  getStrengthLabel,
} from "@/lib/password-utils";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
  className?: string;
}

export const PasswordStrengthIndicator = ({
  strength,
  className,
}: PasswordStrengthIndicatorProps) => {
  const progressColor = {
    "very-weak": "[&>div]:bg-red-500",
    weak: "[&>div]:bg-orange-500",
    fair: "[&>div]:bg-yellow-500",
    good: "[&>div]:bg-blue-500",
    strong: "[&>div]:bg-green-500",
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Strength Level and Score */}
      <div className="flex items-center justify-between">
        <Badge
          className={cn(
            getStrengthBgColor(strength.level),
            getStrengthColor(strength.level),
            "border-0",
          )}
        >
          {getStrengthLabel(strength.level)}
        </Badge>
        <span className="text-sm font-medium">{strength.score}/100</span>
      </div>

      {/* Progress Bar */}
      <Progress
        value={strength.score}
        className={cn("h-3", progressColor[strength.level])}
      />

      {/* Criteria Checklist */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">
          Criterios de seguridad:
        </h4>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center space-x-2">
            {strength.criteria.length ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
            <span
              className={
                strength.criteria.length ? "text-green-700" : "text-red-700"
              }
            >
              Al menos 12 caracteres
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {strength.criteria.uppercase ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
            <span
              className={
                strength.criteria.uppercase ? "text-green-700" : "text-red-700"
              }
            >
              Letras mayúsculas (A-Z)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {strength.criteria.lowercase ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
            <span
              className={
                strength.criteria.lowercase ? "text-green-700" : "text-red-700"
              }
            >
              Letras minúsculas (a-z)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {strength.criteria.numbers ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
            <span
              className={
                strength.criteria.numbers ? "text-green-700" : "text-red-700"
              }
            >
              Números (0-9)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {strength.criteria.symbols ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
            <span
              className={
                strength.criteria.symbols ? "text-green-700" : "text-red-700"
              }
            >
              Símbolos especiales (!@#$%^&*)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {strength.criteria.commonWords ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
            <span
              className={
                strength.criteria.commonWords
                  ? "text-green-700"
                  : "text-red-700"
              }
            >
              Sin palabras comunes
            </span>
          </div>
        </div>
      </div>

      {/* Feedback */}
      {strength.feedback.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">
            Recomendaciones:
          </h4>
          <ul className="space-y-1">
            {strength.feedback.map((feedback, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 flex items-start space-x-2"
              >
                <span className="text-blue-500 mt-1">•</span>
                <span>{feedback}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
