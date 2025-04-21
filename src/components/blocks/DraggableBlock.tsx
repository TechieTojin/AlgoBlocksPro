
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface BlockType {
  id: string;
  title: string;
  description: string;
  type: "indicator" | "order" | "condition" | "risk";
  icon: LucideIcon;
}

interface DraggableBlockProps {
  block: BlockType;
}

export function DraggableBlock({ block }: DraggableBlockProps) {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(block));
    setIsDragging(true);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  const Icon = block.icon;
  
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`strategy-block ${block.type} ${isDragging ? "dragging" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div className={`rounded p-1.5 bg-${block.type === 'indicator' ? 'algo-purple' : block.type === 'order' ? 'algo-blue' : block.type === 'condition' ? 'algo-yellow' : 'algo-red'}-500/20`}>
          <Icon className={`h-4 w-4 text-${block.type === 'indicator' ? 'algo-purple' : block.type === 'order' ? 'algo-blue' : block.type === 'condition' ? 'algo-yellow' : 'algo-red'}-500`} />
        </div>
        <div>
          <div className="font-medium">{block.title}</div>
          <div className="text-xs text-muted-foreground">{block.description}</div>
        </div>
      </div>
    </div>
  );
}
