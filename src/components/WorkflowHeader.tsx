import { FileText, List, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WorkflowHeaderProps {
  viewMode: "interactive" | "grid";
  onViewModeChange: (mode: "interactive" | "grid") => void;
}

export const WorkflowHeader = ({ viewMode, onViewModeChange }: WorkflowHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-card/98 via-card/95 to-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-sm border-b border-border/40">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Left: Title Section */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-md">
            <FileText className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex sm:hidden h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Ambattur Workflow
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              End-to-End Production Process
            </p>
          </div>
        </div>

        {/* Right: View Mode Toggle */}
        <div className="flex items-center gap-2 ml-4">
          <div className="hidden sm:flex items-center gap-1 bg-muted/40 rounded-full p-1 border border-border/50 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange("interactive")}
              className={cn(
                "rounded-full gap-2 px-4 transition-all duration-200",
                viewMode === "interactive"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              <List className="h-4 w-4" />
              <span className="text-sm font-medium">Interactive</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className={cn(
                "rounded-full gap-2 px-4 transition-all duration-200",
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              <Grid3x3 className="h-4 w-4" />
              <span className="text-sm font-medium">Grid</span>
            </Button>
          </div>

          {/* Mobile: Compact Toggle */}
          <div className="sm:hidden flex items-center gap-1 bg-muted/40 rounded-full p-1 border border-border/50">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewModeChange("interactive")}
              className={cn(
                "rounded-full h-9 w-9 transition-all duration-200",
                viewMode === "interactive"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
              title="Interactive View"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewModeChange("grid")}
              className={cn(
                "rounded-full h-9 w-9 transition-all duration-200",
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
              title="Grid View"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
