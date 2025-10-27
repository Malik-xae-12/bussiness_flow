import { useState } from "react";
import {
  Users,
  ClipboardList,
  Package,
  Ship,
  Building2,
  Truck,
  PackageCheck,
  Layout,
  Factory,
  FileText,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { WorkflowHeader } from "./WorkflowHeader";
import { DepartmentLane } from "./DepartmentLane";
import { ProcessNode } from "./ProcessNode";
import { toast } from "sonner";

export const WorkflowDiagram = () => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.7));
  };

  const handleExport = () => {
    toast.success("Export feature coming soon!", {
      description: "PDF and image export will be available shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <WorkflowHeader
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onExport={handleExport}
      />

      <div className="overflow-auto">
        <div
          className="min-w-max origin-top-left transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
        >
          {/* Buyer */}
          <DepartmentLane name="Buyer" icon={Users} color="text-accent">
            <ProcessNode
              title="Style Requirements"
              description="Shares techpack & projection"
              icon={FileText}
              status="normal"
            />
          </DepartmentLane>

          {/* Merchandising */}
          <DepartmentLane name="Merchandising - Ambattur" icon={ClipboardList} color="text-primary">
            <ProcessNode
              title="Style Code Creation"
              description="Create style & costing"
              icon={FileText}
              status="normal"
            />
            <ProcessNode
              title="Sample Approvals"
              description="Review and approve samples"
              icon={CheckCircle}
              status="success"
            />
            <ProcessNode
              title="Sales Order (ERP)"
              description="Create order in OrderReg"
              icon={DollarSign}
              status="success"
            />
          </DepartmentLane>

          {/* Fabric Team */}
          <DepartmentLane name="Fabric Team - Ambattur" icon={Package} color="text-primary">
            <ProcessNode
              title="Create FIS"
              description="Fabric Issue Sheet"
              icon={FileText}
              status="normal"
            />
            <ProcessNode
              title="Update MRCINF"
              description="Consumption & allowance"
              icon={Layout}
              status="normal"
            />
            <ProcessNode
              title="Material Requirement"
              description="Send to Import team"
              icon={Package}
              status="normal"
            />
            <ProcessNode
              title="ETD/ETA Updates"
              description="Manual revisions only"
              icon={Clock}
              status="warning"
              hasWarning
              warningText="Manual process"
            />
          </DepartmentLane>

          {/* Import Team */}
          <DepartmentLane name="Import Team - Ambattur" icon={Ship} color="text-primary">
            <ProcessNode
              title="Create RMO + PI"
              description="Purchase request"
              icon={FileText}
              status="normal"
            />
            <ProcessNode
              title="Booking Number"
              description="Shipment booking"
              icon={Ship}
              status="normal"
            />
            <ProcessNode
              title="Delay Updates"
              description="Email-only tracking"
              icon={AlertCircle}
              status="warning"
              hasWarning
              warningText="Email only ⚠️"
            />
          </DepartmentLane>

          {/* Commercial Ambattur */}
          <DepartmentLane name="Commercial - Ambattur" icon={Building2} color="text-primary">
            <ProcessNode
              title="Forward to Supplier"
              description="RMO + PI request"
              icon={FileText}
              status="normal"
            />
            <ProcessNode
              title="LC Request"
              description="Letter of Credit"
              icon={DollarSign}
              status="normal"
            />
            <ProcessNode
              title="Create PO in ERP"
              description="Purchase Order"
              icon={FileText}
              status="success"
            />
            <ProcessNode
              title="Update Planned Dates"
              description="ETD & ETA"
              icon={Clock}
              status="normal"
            />
          </DepartmentLane>

          {/* Supplier */}
          <DepartmentLane name="Supplier" icon={Factory} color="text-accent">
            <ProcessNode
              title="Receive Request"
              description="RMO + PI from Commercial"
              icon={FileText}
              status="normal"
            />
            <ProcessNode
              title="Send PI Details"
              description="Ex-Mill Date & ETD"
              icon={Clock}
              status="normal"
            />
            <ProcessNode
              title="LC Processing"
              description="Bank verification"
              icon={DollarSign}
              status="normal"
            />
          </DepartmentLane>

          {/* Commercial Bangladesh */}
          <DepartmentLane name="Commercial - Bangladesh" icon={Building2} color="text-primary">
            <ProcessNode
              title="Send LC to Bank"
              description="Supplier bank"
              icon={DollarSign}
              status="normal"
            />
            <ProcessNode
              title="LC Correction Loop"
              description="Email-based if mismatch"
              icon={AlertCircle}
              status="warning"
              hasWarning
              warningText="Manual correction"
            />
            <ProcessNode
              title="LC Approved"
              description="Final approval"
              icon={CheckCircle}
              status="success"
            />
          </DepartmentLane>

          {/* Warehouse & QC */}
          <DepartmentLane name="Warehouse + QC" icon={PackageCheck} color="text-success">
            <ProcessNode
              title="Material Receipt"
              description="Update InHouse Date"
              icon={Truck}
              status="normal"
            />
            <ProcessNode
              title="Quality Inspection"
              description="QC check"
              icon={CheckCircle}
              status="success"
            />
          </DepartmentLane>

          {/* Fabric Allocation */}
          <DepartmentLane name="Fabric Allocation" icon={Layout} color="text-primary">
            <ProcessNode
              title="Multi-Shipment"
              description="Per style tracking"
              icon={Package}
              status="normal"
            />
            <ProcessNode
              title="Urgent Orders First"
              description="Priority allocation"
              icon={AlertCircle}
              status="warning"
            />
            <ProcessNode
              title="Manual Balance"
              description="Tracking issues"
              icon={AlertCircle}
              status="warning"
              hasWarning
              warningText="Manual tracking ⚠️"
            />
          </DepartmentLane>

          {/* Production */}
          <DepartmentLane name="Production" icon={Factory} color="text-success">
            <ProcessNode
              title="Cutting"
              description="Fabric cutting"
              icon={Layout}
              status="normal"
            />
            <ProcessNode
              title="Stitching"
              description="Garment assembly"
              icon={Package}
              status="normal"
            />
            <ProcessNode
              title="Finishing"
              description="Final touches"
              icon={CheckCircle}
              status="normal"
            />
            <ProcessNode
              title="Dispatch"
              description="Ship to buyer"
              icon={Truck}
              status="success"
            />
          </DepartmentLane>
        </div>
      </div>
    </div>
  );
};
