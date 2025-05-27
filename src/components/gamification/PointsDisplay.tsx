import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PointsDisplayProps {
  points: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "cybersec";
  className?: string;
  animated?: boolean;
}

export const PointsDisplay = ({
  points,
  label = "Puntos",
  size = "md",
  variant = "default",
  className,
  animated = false,
}: PointsDisplayProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const variantClasses = {
    default: "bg-card text-card-foreground",
    cybersec:
      "bg-gradient-to-r from-cybersec-blue to-cybersec-green text-white",
  };

  return (
    <Card
      className={cn(
        "p-4 text-center transition-all",
        variantClasses[variant],
        animated && "hover:scale-105 animate-pulse",
        className,
      )}
    >
      <div className="flex items-center justify-center space-x-2">
        <span className="text-yellow-500 text-xl">⭐</span>
        <div>
          <div className={cn("font-bold", sizeClasses[size])}>
            {points.toLocaleString()}
          </div>
          <div className="text-sm opacity-80">{label}</div>
        </div>
      </div>
    </Card>
  );
};
