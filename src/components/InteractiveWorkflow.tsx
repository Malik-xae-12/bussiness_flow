import { useState, useEffect } from "react";
import { workflowTeams, WorkflowTeam } from "@/data/workflowTeams";
import { WorkflowHeader } from "./WorkflowHeader";
import { TeamSelector } from "./TeamSelector";
import { ProcessFlow } from "./ProcessFlow";
import { Button } from "@/components/ui/button";
import { Grid3x3, List } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "interactive" | "grid";

export const InteractiveWorkflow = () => {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(
    new Set(["Phase 1: Style & Merchandising", "Phase 2: Procurement & Sourcing"])
  );
  const [viewMode, setViewMode] = useState<ViewMode>("interactive");

  const selectedTeam = workflowTeams.find((t) => t.id === selectedTeamId) || null;

  const togglePhase = (phase: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phase)) {
      newExpanded.delete(phase);
    } else {
      newExpanded.add(phase);
    }
    setExpandedPhases(newExpanded);
  };

  // Select first team on mount
  useEffect(() => {
    if (!selectedTeamId && workflowTeams.length > 0) {
      setSelectedTeamId(workflowTeams[0].id);
    }
  }, [selectedTeamId]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      <WorkflowHeader />

      {/* View Mode Controls */}
      <div className="border-b border-border bg-card/50 px-4 py-3 flex items-center justify-end">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "interactive" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("interactive")}
            className="gap-2"
          >
            <List className="h-4 w-4" />
            Interactive
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="gap-2"
          >
            <Grid3x3 className="h-4 w-4" />
            Grid
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === "interactive" ? (
        <div className="flex-1 flex overflow-hidden">
          <TeamSelector
            teams={workflowTeams}
            selectedTeamId={selectedTeamId}
            onSelectTeam={setSelectedTeamId}
            expandedTeams={expandedPhases}
            onToggleTeam={togglePhase}
          />
          <ProcessFlow
            team={selectedTeam}
            selectedTaskId={selectedTaskId}
            onSelectTask={setSelectedTaskId}
          />
        </div>
      ) : (
        <div className="flex-1 overflow-auto p-6">
          <div
            className="origin-top-left transition-transform duration-300"
            style={{ transform: `scale(${scale})` }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
              {workflowTeams.map((team) => (
                <GridTeamCard
                  key={team.id}
                  team={team}
                  isSelected={selectedTeamId === team.id}
                  onClick={() => {
                    setSelectedTeamId(team.id);
                    setViewMode("interactive");
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GridTeamCard = ({
  team,
  isSelected,
  onClick,
}: {
  team: WorkflowTeam;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const Icon = team.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "p-6 rounded-xl border-2 transition-all duration-300 text-left",
        isSelected
          ? "border-primary bg-gradient-to-br " +
            team.color +
            " shadow-lg shadow-primary/20"
          : "border-border/50 bg-card hover:border-primary/30 hover:bg-primary/5 hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className={cn(
            "h-12 w-12 rounded-lg flex items-center justify-center",
            isSelected
              ? "bg-primary/20 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3
            className={cn(
              "font-bold",
              isSelected ? "text-primary" : "text-foreground"
            )}
          >
            {team.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {team.phase}
          </p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {team.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        <span className="text-xs font-medium text-primary">
          {team.tasks.length} task{team.tasks.length !== 1 ? "s" : ""}
        </span>
        <span className="text-xs text-muted-foreground">
          {team.tasks.filter((t) => t.status === "success").length} complete
        </span>
      </div>
    </button>
  );
};
