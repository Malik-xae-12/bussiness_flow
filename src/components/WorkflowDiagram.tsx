import { workflowTeams } from "@/data/workflowTeams";
import { cn } from "@/lib/utils";

export const WorkflowDiagram = () => {
  // Group teams by phase
  const phases = ["Phase 1: Style & Merchandising", "Phase 2: Procurement & Sourcing", "Phase 3: Logistics & Shipping", "Phase 4: Production & Allocation"];
  const teamsByPhase = phases.reduce((acc, phase) => {
    acc[phase] = workflowTeams.filter(team => team.phase === phase);
    return acc;
  }, {} as Record<string, typeof workflowTeams>);

  return (
    <div className="w-full h-full overflow-auto bg-gradient-to-b from-background via-muted/10 to-background p-8">
      <div className="max-w-full">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Complete Workflow Diagram</h1>
          <p className="text-muted-foreground">End-to-end production process visualization with all teams and flows</p>
        </div>

        {/* Phase Sections */}
        <div className="space-y-16">
          {phases.map((phase, phaseIdx) => {
            const teamsInPhase = teamsByPhase[phase];
            if (teamsInPhase.length === 0) return null;

            return (
              <div key={phase} className="space-y-6">
                {/* Phase Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 border-2 border-primary">
                    <span className="text-sm font-bold text-primary">{phaseIdx + 1}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{phase}</h2>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-border to-transparent"></div>
                </div>

                {/* Teams Grid for this phase */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ml-14">
                  {teamsInPhase.map((team, idx) => {
                    const hexColor = team.hexColor || "#6B7280";
                    return (
                      <div key={team.id} className="group">
                        {/* Team Card */}
                        <div
                          className="p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg cursor-pointer h-full"
                          style={{
                            borderColor: hexColor + "50",
                            backgroundColor: hexColor + "08",
                          }}
                        >
                          {/* Team Header */}
                          <div className="flex items-start gap-4 mb-4">
                            <div
                              className="flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0 text-white"
                              style={{ backgroundColor: hexColor }}
                            >
                              {team.icon && <team.icon className="w-6 h-6" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-foreground">{team.name}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{team.description}</p>
                            </div>
                          </div>

                          {/* Tasks List */}
                          {team.tasks.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-border/50">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                Tasks ({team.tasks.length})
                              </p>
                              <div className="space-y-2">
                                {team.tasks.map((task, taskIdx) => (
                                  <div
                                    key={task.id}
                                    className={cn(
                                      "flex items-start gap-2 p-2 rounded-lg transition-colors",
                                      task.status === "success"
                                        ? "bg-success/10 text-success"
                                        : task.status === "warning"
                                          ? "bg-warning/10 text-warning"
                                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                    )}
                                  >
                                    <span
                                      className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold flex-shrink-0 text-white"
                                      style={{ backgroundColor: hexColor + "80" }}
                                    >
                                      {taskIdx + 1}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs font-medium">{task.title}</p>
                                      {task.description && (
                                        <p className="text-xs mt-0.5 opacity-75">{task.description}</p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Connector Arrow */}
                          {idx < teamsInPhase.length - 1 && (
                            <div className="mt-4 pt-4 border-t border-border/30 text-center">
                              <div className="inline-block px-2 py-1 rounded-full bg-border text-muted-foreground text-xs">
                                ↓
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Phase Separator */}
                {phaseIdx < phases.length - 1 && (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent"></div>
                    <div className="px-4 py-2 rounded-full bg-muted border border-border text-xs font-semibold text-muted-foreground">
                      ↓ Next Phase
                    </div>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Team Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {workflowTeams.map((team) => {
              const hexColor = team.hexColor || "#6B7280";
              return (
                <div key={team.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 border border-border/50"
                    style={{ backgroundColor: hexColor }}
                  ></div>
                  <span className="text-xs font-medium text-foreground">{team.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
