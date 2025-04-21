import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  showValue?: boolean;
  className?: string;
  progressClassName?: string;
}

export function ProgressBar({
  value,
  max,
  showValue = true,
  className,
  progressClassName,
}: ProgressBarProps) {
  const percentage = Math.min(100, (value / max) * 100);
  
  // Set color based on percentage
  let colorClass = "bg-primary";
  if (percentage > 80) {
    colorClass = "bg-destructive";
  } else if (percentage > 60) {
    colorClass = "bg-amber-500";
  } else if (percentage > 40) {
    colorClass = "bg-blue-500";
  }

  return (
    <div className={cn("w-full h-2 bg-muted rounded-full overflow-hidden", className)}>
      <div
        className={cn(colorClass, "h-full rounded-full transition-all duration-300", progressClassName)}
        style={{ width: `${percentage}%` }}
      />
      {showValue && (
        <div className="text-xs text-muted-foreground mt-1 text-right">
          {value} / {max}
        </div>
      )}
    </div>
  );
} 