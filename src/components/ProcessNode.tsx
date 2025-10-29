import { LucideIcon, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProcessNodeProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  status?: "normal" | "warning" | "success" | "critical";
  hasWarning?: boolean;
  warningText?: string;
  className?: string;
  hideArrow?: boolean;
}
export const ProcessNode = ({
  title,
  description,
  icon: Icon,
  status = "normal",
  hasWarning,
  warningText,
  className,
  hideArrow,
}: ProcessNodeProps) => {
  const statusColors = {
    normal: "border-border bg-card hover:shadow-md",
    warning: "border-warning/30 bg-warning/5 hover:shadow-lg shadow-warning/10",
    success: "border-success/30 bg-success/5 hover:shadow-lg shadow-success/10",
    critical: "border-destructive/30 bg-destructive/5 hover:shadow-lg shadow-destructive/10",
  };

  const iconColors = {
    normal: "text-primary",
    warning: "text-warning",
    success: "text-success",
    critical: "text-destructive",
  };

  return (
    <div className="relative flex items-center gap-4 group">
      <div
        className={cn(
          "group relative flex w-[280px] flex-col gap-3 rounded-xl border-2 p-4 transition-all duration-300",
          statusColors[status],
          className // Ensure className doesn't override width
        )}
      >
        <div className="flex items-start gap-3">
          <div className={cn("rounded-lg bg-background p-2 shadow-sm", iconColors[status])}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold leading-tight">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {status === "success" && (
            <CheckCircle2 className="h-5 w-5 text-success" />
          )}
        </div>

        {hasWarning && warningText && (
          <Badge variant="outline" className="gap-1 border-warning/50 bg-warning/10 text-warning-foreground">
            <AlertTriangle className="h-3 w-3" />
            {warningText}
          </Badge>
        )}
      </div>

      {!hideArrow && <ArrowRight className="h-6 w-6 text-muted-foreground/50" />}
    </div>
  );
};
