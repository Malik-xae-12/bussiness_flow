import { ClipboardList, Mail, Factory, AlertTriangle, RefreshCw, ArrowDown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanningWorkflowStep {
  id: string;
  title: string;
  description: string | string[];
  icon: React.ReactNode;
}

const planningWorkflowSteps: PlanningWorkflowStep[] = [
  {
    id: "projection-shared",
    title: "Projection Shared by Merchant",
    description: "Merchant provides style, quantity, and delivery breakdowns.",
    icon: ClipboardList,
  },
  {
    id: "planner-reviews",
    title: "Planner Reviews Mail Details",
    description: "Planner inputs received projection information into the planning tracker.",
    icon: Mail,
  },
  {
    id: "line-allocation",
    title: "Line Allocation & Plan Creation",
    description: "Planner allocates styles to lines, sets production start & end dates, and confirms daily capacity.",
    icon: Factory,
  },
  {
    id: "material-delay-check",
    title: "Material Delay Check",
    description: [
      "If materials arrive after packaging date but before sewing start → no change.",
      "If materials arrive after sewing start → re-planning triggered.",
    ],
    icon: AlertTriangle,
  },
  {
    id: "revised-planning",
    title: "Revised Planning Updated",
    description: "Revised plan shared with merchandising and updated in ERP.",
    icon: RefreshCw,
  },
];

export const PlanningWorkflow = () => {
  return (
    <section className="w-full py-12 px-4 md:px-6 bg-gradient-to-b from-background via-muted/20 to-background border-y border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section - Text Content */}
          <div className="flex flex-col justify-start">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Planning Workflow – From Projection to Re-Planning
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Once the merchant shares the projection quantity and multiple delivery schedules, the planning team begins line allocation based on available capacity. The planner details the received mail, allocates quantities to respective groups, and creates the master production plan. If material delays occur, re-planning is triggered to adjust the start date according to actual material arrival.
            </p>
          </div>

          {/* Right Section - Flow Steps */}
          <div className="flex justify-center items-start">
            <div className="w-full max-w-sm space-y-0">
              {planningWorkflowSteps.map((step, index) => {
                const Icon = step.icon as React.ElementType;
                const isMultilineDescription = Array.isArray(step.description);

                return (
                  <div key={step.id} className="flex flex-col items-center">
                    {/* Step Card */}
                    <div
                      className={cn(
                        "w-full p-4 md:p-5 rounded-xl border-2 transition-all duration-300 text-left group",
                        "bg-gradient-to-br from-card to-card/80 border-border hover:border-primary/50 hover:shadow-lg shadow-sm",
                        "animate-fade-up"
                      )}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "rounded-lg bg-background p-2 shadow-sm flex-shrink-0",
                          index === 3 ? "text-warning" : "text-primary"
                        )}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm md:text-base text-foreground">
                            {step.title}
                          </h3>
                          {isMultilineDescription ? (
                            <ul className="mt-1.5 space-y-1">
                              {(step.description as string[]).map((line, lineIdx) => (
                                <li key={lineIdx} className="text-xs md:text-sm text-muted-foreground">
                                  • {line}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs md:text-sm text-muted-foreground mt-1.5">
                              {step.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Connector Arrow */}
                    {index < planningWorkflowSteps.length - 1 && (
                      <div className="flex flex-col items-center my-2 group">
                        <ArrowDown className="h-6 w-6 text-muted-foreground/50 group-hover:text-primary/50 transition-colors animate-bounce" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Completion Marker */}
              <div className="flex items-center justify-center mt-6 pt-6 border-t border-border/50">
                <div className="rounded-full bg-success/10 border-2 border-success p-3">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-6 border-t border-border/50">
          <p className="text-xs md:text-sm text-muted-foreground text-center italic">
            Delays beyond sewing start trigger re-planning to ensure delivery targets are met.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fade-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};
