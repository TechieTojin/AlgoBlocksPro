
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Blocks, LineChart, TrendingUp, DollarSign, BarChart } from "lucide-react";
import { DraggableBlock } from "./DraggableBlock";

export function BlockLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter blocks based on search term
  const filterBlocks = (blocks: any[]) => {
    if (!searchTerm) return blocks;
    return blocks.filter(block => 
      block.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Block definitions
  const indicatorBlocks = [
    { id: "moving-average", title: "Moving Average", description: "Simple Moving Average (SMA) indicator", type: "indicator", icon: LineChart },
    { id: "rsi", title: "RSI", description: "Relative Strength Index", type: "indicator", icon: TrendingUp },
    { id: "macd", title: "MACD", description: "Moving Average Convergence Divergence", type: "indicator", icon: LineChart },
    { id: "bollinger", title: "Bollinger Bands", description: "Volatility bands", type: "indicator", icon: LineChart },
  ];
  
  const orderBlocks = [
    { id: "buy-market", title: "Buy Market", description: "Execute market buy order", type: "order", icon: DollarSign },
    { id: "sell-market", title: "Sell Market", description: "Execute market sell order", type: "order", icon: DollarSign },
    { id: "buy-limit", title: "Buy Limit", description: "Place limit buy order", type: "order", icon: DollarSign },
    { id: "sell-limit", title: "Sell Limit", description: "Place limit sell order", type: "order", icon: DollarSign },
  ];
  
  const conditionBlocks = [
    { id: "crossover", title: "Crossover", description: "Detect when one line crosses above another", type: "condition", icon: Blocks },
    { id: "threshold", title: "Threshold", description: "Check if value crosses above/below threshold", type: "condition", icon: Blocks },
    { id: "comparison", title: "Comparison", description: "Compare two values", type: "condition", icon: Blocks },
  ];
  
  const riskBlocks = [
    { id: "stop-loss", title: "Stop Loss", description: "Set stop loss level", type: "risk", icon: BarChart },
    { id: "take-profit", title: "Take Profit", description: "Set take profit level", type: "risk", icon: BarChart },
    { id: "position-size", title: "Position Size", description: "Calculate position size", type: "risk", icon: BarChart },
  ];

  return (
    <Card className="h-full w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Block Library</CardTitle>
        <CardDescription>
          Drag blocks to build your strategy
        </CardDescription>
        <Input
          type="search"
          placeholder="Search blocks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-9"
        />
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="indicators" className="h-[calc(100%-6rem)]">
          <TabsList className="w-full grid grid-cols-4 rounded-none">
            <TabsTrigger value="indicators">Indicators</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="conditions">Conditions</TabsTrigger>
            <TabsTrigger value="risk">Risk</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[calc(100%-40px)]">
            <TabsContent value="indicators" className="p-4 m-0">
              <div className="grid gap-3">
                {filterBlocks(indicatorBlocks).map((block) => (
                  <DraggableBlock key={block.id} block={block} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="orders" className="p-4 m-0">
              <div className="grid gap-3">
                {filterBlocks(orderBlocks).map((block) => (
                  <DraggableBlock key={block.id} block={block} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="conditions" className="p-4 m-0">
              <div className="grid gap-3">
                {filterBlocks(conditionBlocks).map((block) => (
                  <DraggableBlock key={block.id} block={block} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="risk" className="p-4 m-0">
              <div className="grid gap-3">
                {filterBlocks(riskBlocks).map((block) => (
                  <DraggableBlock key={block.id} block={block} />
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
}
