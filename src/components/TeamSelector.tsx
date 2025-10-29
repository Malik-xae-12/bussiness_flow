import { WorkflowTeam } from "@/data/workflowTeams";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface TeamSelectorProps {
  teams: WorkflowTeam[];
  selectedTeamId: string | null;
  onSelectTeam: (teamId: string) => void;
  expandedTeams: Set<string>;
  onToggleTeam: (teamId: string) => void;
}

export const TeamSelector = ({
  teams,
  selectedTeamId,
  onSelectTeam,
  expandedTeams,
  onToggleTeam,
}: TeamSelectorProps) => {
  const groupedTeams = teams.reduce(
    (acc, team) => {
      const phase = team.phase;
      if (!acc[phase]) {
        acc[phase] = [];
      }
      acc[phase].push(team);
      return acc;
    },
    {} as Record<string, WorkflowTeam[]>
  );

  return (
    <div className="w-full md:w-80 h-full border-r border-border bg-gradient-to-b from-card/50 to-muted/20 flex flex-col">
      <div className="p-6 border-b border-border bg-card/95 backdrop-blur">
        <h2 className="text-lg font-semibold">Teams</h2>
        <p className="text-xs text-muted-foreground mt-1">Select a team to view processes</p>
      </div>

      <div
        className="flex-1 overflow-y-auto"
        style={{
          overscrollBehavior: 'contain',
        }}
      >
        {Object.entries(groupedTeams).map(([phase, phaseTeams]) => (
          <div key={phase} className="p-4 border-b border-border/50">
            <button
              onClick={() => onToggleTeam(phase)}
              className="flex items-center gap-2 w-full mb-3 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  expandedTeams.has(phase) ? "rotate-0" : "-rotate-90"
                )}
              />
              {phase}
            </button>

            {expandedTeams.has(phase) && (
              <div className="space-y-2">
                {phaseTeams.map((team) => {
                  const Icon = team.icon;
                  const isSelected = selectedTeamId === team.id;

                  return (
                    <button
                      key={team.id}
                      onClick={() => onSelectTeam(team.id)}
                      className={cn(
                        "w-full p-3 rounded-lg border-2 transition-all duration-200 text-left group",
                        "hover:shadow-md",
                        isSelected
                          ? "border-primary bg-gradient-to-br " +
                            team.color +
                            " shadow-lg shadow-primary/20"
                          : "border-border/50 bg-card/50 hover:border-primary/30 hover:bg-primary/5"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "h-10 w-10 rounded-lg flex items-center justify-center transition-colors",
                            isSelected
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "font-semibold text-sm leading-tight",
                              isSelected ? "text-primary" : "text-foreground"
                            )}
                          >
                            {team.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {team.description}
                          </p>
                          <span className="text-xs font-medium text-primary/70 mt-2 inline-block">
                            {team.tasks.length} task{team.tasks.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        [data-team-selector] {
          scroll-behavior: smooth;
        }
        [data-team-selector]::-webkit-scrollbar {
          width: 6px;
        }
        [data-team-selector]::-webkit-scrollbar-track {
          background: transparent;
        }
        [data-team-selector]::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }
        [data-team-selector]::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
};
