import { FileText, Download, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkflowHeaderProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onExport: () => void;
}

export const WorkflowHeader = ({ onZoomIn, onZoomOut, onExport }: WorkflowHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Fabric Procurement Workflow</h1>
            <p className="text-sm text-muted-foreground">End-to-End Production Process</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button onClick={onExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
    </header>
  );
};
