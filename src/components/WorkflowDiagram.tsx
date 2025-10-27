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

export const WorkflowDiagram = () => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.7));
  };


  return (
    <div className="min-h-screen bg-gradient-subtle">
      <WorkflowHeader
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />

      <div className="overflow-auto">
        <div
          className="min-w-max origin-top-left transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
        >
          {/* Buyer */}
          <DepartmentLane name="Buyer" icon={Users} color="text-accent">
            <ProcessNode
              title="Style Details"
              description="Shares techpack & projection quantity (planning only)"
              icon={FileText}
              status="normal"
            />
          </DepartmentLane>

          {/* Merchandising */}
          <DepartmentLane name="Merchandising - Ambattur" icon={ClipboardList} color="text-primary">
            <ProcessNode
              title="Style Code Creation"
              description="Create style code in ERP"
              icon={FileText}
              status="normal"
            />
            <ProcessNode
              title="Costing"
              description="Perform costing analysis"
              icon={DollarSign}
              status="normal"
            />
            <ProcessNode
              title="Sample Approvals"
              description="Get buyer approval"
              icon={CheckCircle}
              status="normal"
            />
            <ProcessNode
              title="Projection Quantity"
              description="Will be given by buyer"
              icon={CheckCircle}
              status="normal"
            />
            <ProcessNode
              title="Planning"
              description="Planning will start for projection Qty itself"
              icon={CheckCircle}
              status="normal"
            />
            <ProcessNode
              title="Sales Order"
              description="Bulk confirmed → OrderReg (ERP)"
              icon={CheckCircle}
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
          </DepartmentLane>

          {/* Import Team */}
          <DepartmentLane name="Import Team - Ambattur" icon={Ship} color="text-primary">
            <ProcessNode
              title="Create RMO"
              description="Raw Material Order"
              icon={FileText}
              status="normal"
            />
            <ProcessNode
              title="Create PI Request"
              description="Based on fabric requirements"
              icon={FileText}
              status="normal"
            />
            <ProcessNode
              title="Send to Commercial"
              description="RMO + PI request"
              icon={FileText}
              status="normal"
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
          </DepartmentLane>

          {/* Supplier */}
          <DepartmentLane name="Supplier" icon={Factory} color="text-accent">
            <ProcessNode
              title="Send PI"
              description="Proforma Invoice + Ex-Mill date + Planned ETD"
              icon={FileText}
              status="normal"
            />
          </DepartmentLane>

          {/* Commercial Ambattur → Bangladesh Flow */}
          <DepartmentLane name="Commercial - Ambattur → Bangladesh" icon={Building2} color="text-primary">
            <ProcessNode
              title="LC Request"
              description="Ambattur raises LC request"
              icon={DollarSign}
              status="normal"
            />
            <ProcessNode
              title="Forward to Bangladesh"
              description="LC request forwarded"
              icon={FileText}
              status="normal"
            />
            <ProcessNode
              title="Send to Supplier Bank"
              description="Bangladesh sends LC"
              icon={DollarSign}
              status="normal"
            />
            <ProcessNode
              title="LC Mismatch Loop"
              description="Email corrections if needed"
              icon={AlertCircle}
              status="warning"
              hasWarning
              warningText="Email-based corrections ⚠️"
            />
            <ProcessNode
              title="LC Approved"
              description="Final approval received"
              icon={CheckCircle}
              status="success"
            />
          </DepartmentLane>

          {/* Commercial Ambattur - Post LC */}
          <DepartmentLane name="Commercial - Ambattur" icon={Building2} color="text-primary">
            <ProcessNode
              title="Create PO in ERP"
              description="Purchase Order after LC approval"
              icon={FileText}
              status="success"
            />
            <ProcessNode
              title="Update Planned Dates"
              description="ETD & ETA updated in ERP"
              icon={Clock}
              status="normal"
            />
          </DepartmentLane>

          {/* Logistics / Import Team */}
          <DepartmentLane name="Logistics / Import Team - Ambattur" icon={Truck} color="text-primary">
            <ProcessNode
              title="Booking Number"
              description="Created after goods readiness"
              icon={Ship}
              status="normal"
            />
            <ProcessNode
              title="Shipment Departure"
              description="As per ETD"
              icon={Ship}
              status="normal"
            />
            <ProcessNode
              title="Delay Information"
              description="Shared via email only"
              icon={AlertCircle}
              status="warning"
              hasWarning
              warningText="Email only - No visibility ⚠️"
            />
            <ProcessNode
              title="Revised ETD/ETA"
              description="Updated by Fabric team only"
              icon={Clock}
              status="warning"
              hasWarning
              warningText="Delay history not visible ⚠️"
            />
          </DepartmentLane>

          {/* Warehouse & QC */}
          <DepartmentLane name="Warehouse + QC" icon={PackageCheck} color="text-success">
            <ProcessNode
              title="Fabric Receipt"
              description="Receives at warehouse"
              icon={Truck}
              status="normal"
            />
            <ProcessNode
              title="Update InHouse Date"
              description="Date updated in ERP"
              icon={Clock}
              status="normal"
            />
            <ProcessNode
              title="Quality Inspection"
              description="QC team inspection"
              icon={CheckCircle}
              status="success"
            />
          </DepartmentLane>

          {/* Fabric Allocation */}
          <DepartmentLane name="Fabric Allocation" icon={Layout} color="text-primary">
            <ProcessNode
              title="Multiple Deliveries"
              description="Same style, multiple shipments"
              icon={Package}
              status="normal"
            />
            <ProcessNode
              title="Urgent Priority"
              description="Urgent deliveries allocated first"
              icon={AlertCircle}
              status="warning"
            />
            <ProcessNode
              title="Balance Tracking"
              description="Manual due to system limits"
              icon={AlertCircle}
              status="warning"
              hasWarning
              warningText="Manual tracking - System limitation ⚠️"
            />
          </DepartmentLane>

          {/* Production */}
          <DepartmentLane name="Production" icon={Factory} color="text-success">
            <ProcessNode
              title="Cutting"
              description="Based on fabric availability"
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
              description="Final quality & finishing"
              icon={CheckCircle}
              status="normal"
            />
            <ProcessNode
              title="Dispatch"
              description="Shipped to buyer per PO schedule"
              icon={Truck}
              status="success"
            />
          </DepartmentLane>
        </div>
      </div>
    </div>
  );
};
