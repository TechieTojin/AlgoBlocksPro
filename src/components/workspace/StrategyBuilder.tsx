
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Play, Save, Trash2 } from "lucide-react";
import { DropZone } from "./DropZone";

interface BlockData {
  id: string;
  title: string;
  description: string;
  type: "indicator" | "order" | "condition" | "risk";
}

export function StrategyBuilder() {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  
  const handleDrop = (blockData: BlockData) => {
    // Generate a unique instance ID for this block
    const instanceId = `${blockData.id}-${Date.now()}`;
    setBlocks([...blocks, { ...blockData, id: instanceId }]);
  };
  
  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };
  
  const runBacktest = () => {
    console.log("Running backtest with blocks:", blocks);
    // This would trigger the backtest simulation
  };
  
  return (
    <Card className="h-full w-full shadow-sm border-muted/40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl">Strategy Builder</CardTitle>
          <CardDescription>
            Drop blocks to build your trading algorithm
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button size="sm" onClick={runBacktest}>
            <Play className="mr-2 h-4 w-4" />
            Run Backtest
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-18rem)] pr-4">
          <div className="space-y-4">
            {blocks.length === 0 ? (
              <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Plus className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="mt-4 text-xl font-medium">No blocks added</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Drag and drop blocks from the library to build your strategy
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {blocks.map((block) => (
                  <div 
                    key={block.id} 
                    className={`p-4 rounded-md border transition-all hover:shadow-md ${
                      block.type === "indicator" ? "bg-blue-50 border-blue-200" :
                      block.type === "order" ? "bg-green-50 border-green-200" :
                      block.type === "condition" ? "bg-purple-50 border-purple-200" :
                      "bg-orange-50 border-orange-200"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{block.title}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-red-100 hover:text-red-600"
                        onClick={() => removeBlock(block.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{block.description}</p>
                    {/* Block configuration UI would go here */}
                    <div className="mt-2 p-2 bg-background/80 rounded-sm text-xs">
                      {block.type === "indicator" && (
                        <div className="font-mono">period = 14</div>
                      )}
                      {block.type === "order" && (
                        <div className="font-mono">size = 100%</div>
                      )}
                      {block.type === "condition" && (
                        <div className="font-mono">value1 &gt; value2</div>
                      )}
                      {block.type === "risk" && (
                        <div className="font-mono">amount = 2%</div>
                      )}
                    </div>
                  </div>
                ))}
                <DropZone onDrop={handleDrop} />
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
