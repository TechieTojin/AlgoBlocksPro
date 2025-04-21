
import { useState } from "react";

interface DropZoneProps {
  onDrop: (blockData: any) => void;
}

export function DropZone({ onDrop }: DropZoneProps) {
  const [isActive, setIsActive] = useState(false);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsActive(true);
  };
  
  const handleDragLeave = () => {
    setIsActive(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsActive(false);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      onDrop(data);
    } catch (error) {
      console.error("Failed to parse dropped data:", error);
    }
  };
  
  return (
    <div
      className={`border-2 border-dashed rounded-md p-4 transition-colors ${
        isActive 
          ? "border-primary bg-primary/5" 
          : "border-muted-foreground/20 hover:border-muted-foreground/40"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex h-20 items-center justify-center text-sm text-muted-foreground">
        {isActive ? "Release to add to strategy" : "Drop here to add to strategy"}
      </div>
    </div>
  );
}
