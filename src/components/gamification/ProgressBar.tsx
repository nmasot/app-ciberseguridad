import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
  showPercentage?: boolean;
  color?: "blue" | "green" | "default";
  className?: string;
}

export const ProgressBar = ({
  value,
  max,
  label,
  showPercentage = true,
  color = "default",
  className,
}: ProgressBarProps) => {
  const percentage = Math.round((value / max) * 100);

  const colorClasses = {
    blue: "[&>div]:bg-cybersec-blue",
    green: "[&>div]:bg-cybersec-green",
    default: "",
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        {showPercentage && (
          <span className="text-sm text-muted-foreground">
            {value}/{max} ({percentage}%)
          </span>
        )}
      </div>
      <Progress value={percentage} className={cn("h-2", colorClasses[color])} />
    </div>
  );
};
