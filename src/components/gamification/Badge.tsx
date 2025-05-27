import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge as BadgeType } from "@/lib/auth";

interface BadgeProps {
  badge: BadgeType;
  size?: "sm" | "md" | "lg";
  showDescription?: boolean;
  className?: string;
}

const badgeColors = {
  bronze: "from-amber-600 to-amber-400",
  silver: "from-gray-500 to-gray-300",
  gold: "from-yellow-500 to-yellow-300",
};

export const Badge = ({
  badge,
  size = "md",
  showDescription = true,
  className,
}: BadgeProps) => {
  const sizeClasses = {
    sm: "w-12 h-12 text-lg",
    md: "w-16 h-16 text-2xl",
    lg: "w-24 h-24 text-4xl",
  };

  return (
    <Card
      className={cn(
        "p-4 text-center transition-all hover:scale-105",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto rounded-full bg-gradient-to-br flex items-center justify-center mb-2",
          badgeColors[badge.type],
          sizeClasses[size],
        )}
      >
        <span className="text-white font-bold">{badge.icon}</span>
      </div>
      <h3 className="font-medium text-sm">{badge.name}</h3>
      {showDescription && (
        <p className="text-xs text-muted-foreground mt-1">
          {badge.description}
        </p>
      )}
      <p className="text-xs text-muted-foreground mt-1">
        {badge.earnedAt.toLocaleDateString()}
      </p>
    </Card>
  );
};
