import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DepartmentLaneProps {
  name: string;
  icon: LucideIcon;
  color: string;
  children: ReactNode;
  className?: string;
}
export const DepartmentLane = ({
  name,
  icon: Icon,
  color,
  children,
  className,
}: DepartmentLaneProps) => {
  return (
    <div className={cn("border-b border-border/50 bg-gradient-to-r from-background to-muted/20", className)}>
      <div className="flex gap-6">
        <div
          className={cn(
            "sticky left-0 w-[300px] flex flex-col items-center justify-center gap-2 border-r border-border/50 bg-card/95 p-6 backdrop-blur",
            color,
            "z-10" // Higher z-index for the left heading boxes
          )}
        >
          <div className="rounded-lg bg-background/80 p-3 shadow-sm">
            <Icon className="h-6 w-6" />
          </div>
          <h2 className="text-center text-sm font-semibold">{name}</h2>
        </div>
        
        <div className="flex flex-1 items-center gap-4 overflow-x-auto p-6 relative z-0">
          {children}
        </div>
      </div>
    </div>
  );
};
