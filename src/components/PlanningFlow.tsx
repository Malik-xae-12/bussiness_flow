import { AlertCircle, ArrowDown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanningStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const planningSteps: PlanningStep[] = [
  {
    id: "projection-shared",
    title: "Projection Shared by Merchant",
    description: "Merchant provides style, quantity, and delivery breakdowns.",
    icon: "🧾",
  },
  {
    id: "planner-reviews",
    title: "Planner Reviews Mail Details",
    description: "Planner inputs received information into planning tracker.",
    icon: "📧",
  },
  {
    id: "line-allocation",
    title: "Line Allocation & Plan Creation",
    description: "Planner allocates styles to lines and sets production start & end dates.",
    icon: "🏭",
  },
  {
    id: "material-delay-check",
    title: "Material Delay Check",
    description:
      "If materials arrive after packaging date but before sewing start – no change.\nIf materials arrive after sewing start – re-plan start date.",
    icon: "⚠️",
  },
  {
    id: "revised-planning",
    title: "Revised Planning Updated",
    description: "Revised plan shared for approval and updated in the system.",
    icon: "🔄",
  },
];

export const PlanningFlow = () => {
  return (
    <section className="w-full py-12 px-4 md:px-6 bg-gradient-to-b from-background via-muted/30 to-background border-y border-border/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
              Phase 2: Procurement & Sourcing
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Planning Workflow
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
            From Projection to Re-Planning: Once the merchant shares the projection quantity and
            multiple delivery schedules, the planning team begins line allocation based on available
            capacity. The planner details the received mail, allocates quantities to respective
            groups, and creates the master production plan. If material delays occur, re-planning is
            triggered to adjust the start date according to actual material arrival.
          </p>
        </div>

        {/* Planning Flow Steps */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Visual Flow */}
          <div className="flex-1 flex justify-center items-start">
            <div className="w-full max-w-sm space-y-0">
              {planningSteps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  {/* Step Card */}
                  <div
                    className={cn(
                      "w-full p-4 md:p-5 rounded-xl border-2 transition-all duration-300 text-left group",
                      "bg-gradient-to-br from-card to-card/80 border-primary/30 hover:border-primary/50 hover:shadow-lg",
                      "animate-fade-up"
                    )}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl md:text-3xl flex-shrink-0 mt-0.5">
                        {step.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm md:text-base text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1.5 whitespace-pre-wrap">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connector Arrow */}
                  {index < planningSteps.length - 1 && (
                    <div className="flex flex-col items-center my-3 group">
                      <ArrowDown className="h-6 w-6 text-primary/40 group-hover:text-primary/60 transition-colors animate-bounce" />
                    </div>
                  )}
                </div>
              ))}

              {/* Completion Marker */}
              <div className="flex items-center justify-center mt-6 pt-6 border-t border-primary/20">
                <div className="rounded-full bg-success/10 border-2 border-success p-3 shadow-sm">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Information & Notes */}
          <div className="flex-1 flex flex-col justify-center gap-6">
            {/* Key Steps Summary */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Planning Sequence</h3>

              <div className="space-y-3">
                {[
                  {
                    title: "Input Phase",
                    items: [
                      "Merchant shares projection & delivery schedule",
                      "Planner captures details from communication",
                    ],
                  },
                  {
                    title: "Allocation Phase",
                    items: [
                      "Allocate styles to available production lines",
                      "Set production start & end dates",
                      "Create master production plan (MPP)",
                    ],
                  },
                  {
                    title: "Contingency Phase",
                    items: [
                      "Monitor material arrival dates",
                      "Trigger re-planning if delays detected",
                      "Adjust start dates to meet delivery targets",
                    ],
                  },
                ].map((section, idx) => (
                  <div key={idx} className="p-3 md:p-4 rounded-lg bg-muted/50 border border-border/50">
                    <h4 className="text-sm font-semibold text-foreground mb-2">{section.title}</h4>
                    <ul className="space-y-1.5">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                          <span className="text-primary font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Note */}
            <div className="p-4 md:p-5 rounded-lg border-2 border-warning/30 bg-warning/5 flex gap-3">
              <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-warning mb-1">Re-Planning Trigger</p>
                <p className="text-xs md:text-sm text-warning/80">
                  Delays beyond sewing start trigger re-planning to ensure delivery targets are met.
                </p>
              </div>
            </div>
          </div>
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
