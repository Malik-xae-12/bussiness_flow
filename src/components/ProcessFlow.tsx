import { WorkflowTeam, ProcessTask } from "@/data/workflowTeams";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProcessFlowProps {
  team: WorkflowTeam | null;
  selectedTaskId?: string;
  onSelectTask?: (taskId: string) => void;
  onNavigateToTeam?: (teamId: string) => void;
}

const ProcessTaskCard = ({
  task,
  isLast,
  isSelected,
  onSelect,
  teamId,
  onNavigateToTeam,
}: {
  task: ProcessTask;
  isLast: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  teamId?: string;
  onNavigateToTeam?: (teamId: string) => void;
}) => {
  const Icon = task.icon;

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
    <div className="flex flex-col items-center">
      <button
        onClick={() => {
          if (task.id === "planning" && onNavigateToTeam) {
            onNavigateToTeam("planning");
          } else {
            onSelect?.();
          }
        }}
        className={cn(
          "w-full max-w-sm p-4 rounded-xl border-2 transition-all duration-300 text-left group",
          statusColors[task.status],
          isSelected &&
            "ring-2 ring-primary ring-offset-2 shadow-lg scale-105"
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "rounded-lg bg-background p-2 shadow-sm",
              iconColors[task.status]
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold leading-tight text-sm md:text-base">
              {task.title}
            </h3>
            {task.description && (
              <p className="mt-1 text-xs md:text-sm text-muted-foreground">
                {task.description}
              </p>
            )}
          </div>
          {task.status === "success" && (
            <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-1" />
          )}
        </div>

        {task.hasWarning && task.warningText && (
          <Badge
            variant="outline"
            className="gap-1 border-warning/50 bg-warning/10 text-warning-foreground mt-3 text-xs"
          >
            <AlertTriangle className="h-3 w-3" />
            {task.warningText}
          </Badge>
        )}
      </button>

      {!isLast && (
        <div className="flex flex-col items-center my-2">
          <ArrowDown className="h-6 w-6 text-muted-foreground/50 animate-bounce" />
        </div>
      )}
    </div>
  );
};

export const ProcessFlow = ({
  team,
  selectedTaskId,
  onSelectTask,
  onNavigateToTeam,
}: ProcessFlowProps) => {
  if (!team) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="rounded-full bg-muted p-8 mb-4">
          <svg
            className="h-16 w-16 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 13h6m-3-3v6m-9-1a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Select a Team
        </h3>
        <p className="text-muted-foreground max-w-xs">
          Choose a team from the left column to view their process flow and
          tasks
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto flex flex-col">
      {/* Team Header */}
      <div
        className={cn(
          "bg-gradient-to-r " +
            team.color +
            " border-b border-border sticky top-0 z-10"
        )}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-background/80 p-3 shadow-sm">
              <team.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {team.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-2">
                {team.description}
              </p>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {team.phase}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Process Flow */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 flex flex-col items-center">
          <div className="space-y-0 w-full max-w-sm">
            <h3 className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wide">
              Process Flow
            </h3>

            {team.tasks.length > 0 ? (
              team.tasks.map((task, index) => (
                <ProcessTaskCard
                  key={task.id}
                  task={task}
                  isLast={index === team.tasks.length - 1}
                  isSelected={selectedTaskId === task.id}
                  onSelect={() => onSelectTask?.(task.id)}
                  teamId={team.id}
                  onNavigateToTeam={onNavigateToTeam}
                />
              ))
            ) : (
              <p className="text-muted-foreground text-center">
                No tasks found for this team
              </p>
            )}

            {team.tasks.length > 0 && (
              <div className="flex items-center justify-center mt-6 pt-6 border-t border-border/50">
                <div className="rounded-full bg-success/10 border-2 border-success p-3">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
