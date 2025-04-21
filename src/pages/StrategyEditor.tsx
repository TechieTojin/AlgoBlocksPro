import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Code, Save, Play, Settings, ChevronRight, Plus, 
  LineChart, BarChart2, History, Trash2, Copy, 
  FileCode, LayoutGrid, Layers, ArrowRight, Check, 
  PanelLeft, PanelRight, SquareCode, Cpu, ZoomIn, ZoomOut,
  Share, Info, AlertTriangle, BookMarked, Link2, Eye, 
  EyeOff, X
} from 'lucide-react';
import { toast } from "sonner";

// Sample strategy template 
const strategyTemplate = `// Strategy: Moving Average Crossover
// Description: Buys when fast MA crosses above slow MA, sells when fast MA crosses below slow MA

// Define inputs
const fastLength = input(10, "Fast MA Length");
const slowLength = input(20, "Slow MA Length");
const sourceType = input("close", "Source", ["open", "high", "low", "close"]);

// Calculate indicators
const fastMA = sma(source(sourceType), fastLength);
const slowMA = sma(source(sourceType), slowLength);

// Define entry conditions
const enterLong = crossover(fastMA, slowMA);
const enterShort = crossunder(fastMA, slowMA);

// Define exit conditions
const exitLong = crossunder(fastMA, slowMA);
const exitShort = crossover(fastMA, slowMA);

// Position sizing
const positionSize = 100; // Fixed size for simplicity

// Risk management
const stopLoss = atr(14) * 2;
const takeProfit = atr(14) * 4;

// Execute strategy
if (enterLong) {
  buy(positionSize, stopLoss, takeProfit);
} else if (enterShort) {
  sell(positionSize, stopLoss, takeProfit);
} else if (exitLong) {
  close("long");
} else if (exitShort) {
  close("short");
}`;

// Sample indicator blocks
const indicatorBlocks = [
  { id: 1, name: "Moving Average", category: "Trend", icon: LineChart },
  { id: 2, name: "RSI", category: "Oscillator", icon: BarChart2 },
  { id: 3, name: "MACD", category: "Momentum", icon: LineChart },
  { id: 4, name: "Bollinger Bands", category: "Volatility", icon: LineChart },
  { id: 5, name: "ATR", category: "Volatility", icon: BarChart2 },
  { id: 6, name: "Stochastic", category: "Oscillator", icon: LineChart },
  { id: 7, name: "Fibonacci Retracement", category: "Support/Resistance", icon: LineChart },
  { id: 8, name: "Ichimoku Cloud", category: "Trend", icon: LineChart },
];

// Sample condition blocks
const conditionBlocks = [
  { id: 1, name: "Crossover", category: "Comparison", icon: ChevronRight },
  { id: 2, name: "Above", category: "Comparison", icon: ChevronRight },
  { id: 3, name: "Below", category: "Comparison", icon: ChevronRight },
  { id: 4, name: "Equal", category: "Comparison", icon: ChevronRight },
  { id: 5, name: "Inside Range", category: "Range", icon: ChevronRight },
  { id: 6, name: "Outside Range", category: "Range", icon: ChevronRight },
];

// Sample action blocks
const actionBlocks = [
  { id: 1, name: "Buy", category: "Entry", icon: ChevronRight },
  { id: 2, name: "Sell", category: "Entry", icon: ChevronRight },
  { id: 3, name: "Close Position", category: "Exit", icon: ChevronRight },
  { id: 4, name: "Set Stop Loss", category: "Risk", icon: ChevronRight },
  { id: 5, name: "Set Take Profit", category: "Risk", icon: ChevronRight },
  { id: 6, name: "Trail Stop", category: "Risk", icon: ChevronRight },
];

// Sample timeframes
const timeframes = ["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w", "1M"];

// Sample instruments
const instruments = ["EURUSD", "BTCUSD", "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];

export default function StrategyEditor() {
  const [editorMode, setEditorMode] = useState<"visual" | "code">("visual");
  const [activeTab, setActiveTab] = useState("editor");
  const [codeContent, setCodeContent] = useState(strategyTemplate);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1h");
  const [selectedInstrument, setSelectedInstrument] = useState("BTCUSD");
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [showBlockPanel, setShowBlockPanel] = useState(true);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [blockConnections, setBlockConnections] = useState<{from: string, to: string, type: string}[]>([
    {from: "block1", to: "block3", type: "success"},
    {from: "block2", to: "block3", type: "condition"}
  ]);
  const [activeBlocks, setActiveBlocks] = useState<{id: string, type: string, position: {x: number, y: number}, title: string}[]>([
    {id: "block1", type: "indicator", position: {x: 100, y: 100}, title: "Moving Average"},
    {id: "block2", type: "indicator", position: {x: 100, y: 250}, title: "RSI"},
    {id: "block3", type: "condition", position: {x: 350, y: 175}, title: "Crossover"}
  ]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{id: string, startX: number, startY: number} | null>(null);
  
  const handleExportStrategy = () => {
    toast.success("Strategy exported successfully", {
      description: "Your strategy has been saved as a JSON file"
    });
  };
  
  const handleSaveStrategy = () => {
    toast.success("Strategy saved successfully", {
      description: "Your changes have been saved"
    });
  };
  
  const handleRunBacktest = () => {
    toast.success("Backtest started", {
      description: "Your strategy is now being backtested"
    });
    setActiveTab("results");
  };
  
  const handleOptimize = () => {
    toast.success("Optimization started", {
      description: "Your strategy parameters are being optimized"
    });
    setActiveTab("optimization");
  };
  
  const handleShareStrategy = () => {
    toast.success("Strategy shared", {
      description: "A shareable link has been copied to your clipboard"
    });
  };

  const handleAddBlock = (blockInfo: {name: string, category: string}) => {
    const newId = `block${activeBlocks.length + 1}`;
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    
    if (canvasRef.current) {
      // Position in the center of the visible canvas
      const newBlock = {
        id: newId,
        type: blockInfo.category.toLowerCase(),
        position: {
          x: (canvasRef.current.scrollWidth / 2) - 75,
          y: (canvasRef.current.scrollHeight / 2) - 75
        },
        title: blockInfo.name
      };
      
      setActiveBlocks([...activeBlocks, newBlock]);
      toast.success("Block added", {
        description: `Added ${blockInfo.name} to your strategy`
      });
    }
  };
  
  const handleDeleteBlock = (id: string) => {
    setActiveBlocks(activeBlocks.filter(block => block.id !== id));
    setBlockConnections(blockConnections.filter(conn => conn.from !== id && conn.to !== id));
  };
  
  const handleMouseDown = (e: React.MouseEvent, blockId: string) => {
    const block = activeBlocks.find(b => b.id === blockId);
    if (block) {
      dragRef.current = {
        id: blockId,
        startX: e.clientX - block.position.x,
        startY: e.clientY - block.position.y
      };
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragRef.current) {
      const { id, startX, startY } = dragRef.current;
      
      setActiveBlocks(blocks => 
        blocks.map(block => 
          block.id === id
            ? { 
                ...block, 
                position: { 
                  x: e.clientX - startX, 
                  y: e.clientY - startY 
                } 
              }
            : block
        )
      );
    }
  };
  
  const handleMouseUp = () => {
    dragRef.current = null;
  };
  
  const BlockItem = ({ block }: { block: { name: string; category: string; icon: any } }) => (
    <div 
      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer group"
      onClick={() => handleAddBlock(block)}
    >
      <div className="bg-primary/10 p-1.5 rounded">
        <block.icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{block.name}</p>
        <p className="text-xs text-muted-foreground">{block.category}</p>
      </div>
      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
        <Plus className="h-4 w-4 text-muted-foreground hover:text-primary" />
      </button>
    </div>
  );
  
  // Function to render the strategy canvas with blocks and connections
  const renderStrategyCanvas = () => {
    return (
      <div 
        ref={canvasRef}
        className="relative bg-accent/10 rounded-lg border-2 border-dashed border-accent h-full overflow-auto"
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute w-full h-full min-h-[600px] min-w-[800px]">
          {/* Grid pattern for background */}
          <svg className="absolute inset-0 w-full h-full z-0 opacity-25">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Connection lines between blocks */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            {blockConnections.map((connection, index) => {
              const sourceBlock = activeBlocks.find(b => b.id === connection.from);
              const targetBlock = activeBlocks.find(b => b.id === connection.to);
              
              if (sourceBlock && targetBlock) {
                const sourceX = sourceBlock.position.x + 75;
                const sourceY = sourceBlock.position.y + 40;
                const targetX = targetBlock.position.x;
                const targetY = targetBlock.position.y + 40;
                
                return (
                  <g key={index}>
                    <path 
                      d={`M ${sourceX} ${sourceY} C ${sourceX + 50} ${sourceY}, ${targetX - 50} ${targetY}, ${targetX} ${targetY}`}
                      stroke={connection.type === 'success' ? '#12a150' : '#8256d0'}
                      strokeWidth="2"
                      fill="none"
                      markerEnd="url(#arrowhead)"
                    />
                    <circle cx={sourceX} cy={sourceY} r="3" fill={connection.type === 'success' ? '#12a150' : '#8256d0'} />
                    <circle cx={targetX} cy={targetY} r="3" fill={connection.type === 'success' ? '#12a150' : '#8256d0'} />
                  </g>
                );
              }
              return null;
            })}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#8256d0" />
              </marker>
            </defs>
          </svg>
          
          {/* Blocks */}
          {activeBlocks.map(block => (
            <div
              key={block.id}
              className={`absolute w-[150px] rounded-md shadow-md cursor-move bg-background border p-2 z-20 ${
                block.type === 'indicator' ? 'border-blue-500' : 
                block.type === 'condition' ? 'border-purple-500' : 'border-green-500'
              }`}
              style={{
                left: `${block.position.x}px`,
                top: `${block.position.y}px`,
              }}
              onMouseDown={(e) => handleMouseDown(e, block.id)}
            >
              <div className="flex justify-between items-center mb-1">
                <div className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                  block.type === 'indicator' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 
                  block.type === 'condition' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' : 
                  'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                }`}>
                  {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
                </div>
                <div className="flex gap-1">
                  <button 
                    className="text-muted-foreground hover:text-primary"
                    onClick={() => handleDeleteBlock(block.id)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="text-sm font-medium">{block.title}</div>
              <div className="flex justify-between mt-2">
                <div className="bg-muted h-4 w-4 rounded-full border border-muted-foreground"></div>
                <div className="bg-muted h-4 w-4 rounded-full border border-muted-foreground"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto p-4 h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Strategy Editor</h1>
          <Badge variant="outline" className="ml-2">Beta</Badge>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleShareStrategy}>
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportStrategy}>
            <FileCode className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleSaveStrategy}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button size="sm" onClick={handleRunBacktest}>
            <Play className="h-4 w-4 mr-2" />
            Backtest
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100%-2rem)]">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-3">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeframes.map(tf => (
                  <SelectItem key={tf} value={tf}>{tf}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedInstrument} onValueChange={setSelectedInstrument}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Instrument" />
              </SelectTrigger>
              <SelectContent>
                {instruments.map(instrument => (
                  <SelectItem key={instrument} value={instrument}>{instrument}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2">
              <Label htmlFor="live-mode" className="text-sm cursor-pointer">Live Mode</Label>
              <Switch id="live-mode" checked={isLiveMode} onCheckedChange={setIsLiveMode} />
            </div>
          </div>
        </div>
        
        <TabsContent value="editor" className="h-full mt-4">
          <div className="grid grid-cols-12 gap-4 h-full">
            {/* Block Panel */}
            {showBlockPanel && (
              <Card className="col-span-2 h-full overflow-hidden">
                <CardHeader className="p-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Blocks</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setShowBlockPanel(false)}>
                      <PanelLeft className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs defaultValue="indicators" className="w-full">
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="indicators" className="text-xs">Indicators</TabsTrigger>
                      <TabsTrigger value="conditions" className="text-xs">Conditions</TabsTrigger>
                      <TabsTrigger value="actions" className="text-xs">Actions</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="indicators" className="p-2 overflow-hidden">
                      <Input placeholder="Search indicators..." className="mb-3" />
                      <ScrollArea className="h-[calc(100vh-20rem)]">
                        <div className="space-y-1">
                          {indicatorBlocks.map(block => (
                            <BlockItem key={block.id} block={block} />
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="conditions" className="p-2 overflow-hidden">
                      <Input placeholder="Search conditions..." className="mb-3" />
                      <ScrollArea className="h-[calc(100vh-20rem)]">
                        <div className="space-y-1">
                          {conditionBlocks.map(block => (
                            <BlockItem key={block.id} block={block} />
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                    
                    <TabsContent value="actions" className="p-2 overflow-hidden">
                      <Input placeholder="Search actions..." className="mb-3" />
                      <ScrollArea className="h-[calc(100vh-20rem)]">
                        <div className="space-y-1">
                          {actionBlocks.map(block => (
                            <BlockItem key={block.id} block={block} />
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
            
            {/* Main Editor Area */}
            <Card className={`${showBlockPanel ? 'col-span-7' : 'col-span-9'} h-full`}>
              <CardHeader className="p-3 pb-0">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {!showBlockPanel && (
                      <Button variant="ghost" size="icon" onClick={() => setShowBlockPanel(true)}>
                        <PanelRight className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="flex">
                      <Button 
                        variant={editorMode === "visual" ? "default" : "outline"} 
                        size="sm" 
                        onClick={() => setEditorMode("visual")}
                        className="rounded-r-none"
                      >
                        <LayoutGrid className="h-4 w-4 mr-2" />
                        Visual
                      </Button>
                      <Button 
                        variant={editorMode === "code" ? "default" : "outline"} 
                        size="sm" 
                        onClick={() => setEditorMode("code")}
                        className="rounded-l-none"
                      >
                        <Code className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex bg-muted/50 rounded-md p-0.5">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoom(Math.max(50, zoom - 10))}>
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <span className="flex items-center px-2 text-xs">{zoom}%</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoom(Math.min(150, zoom + 10))}>
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsPreviewMode(!isPreviewMode)}
                    >
                      {isPreviewMode ? (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          Edit
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Preview
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <History className="h-4 w-4 mr-2" />
                      History
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleOptimize}>
                      <Cpu className="h-4 w-4 mr-2" />
                      Optimize
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 h-[calc(100%-4rem)]">
                {editorMode === "visual" ? (
                  <div className="h-full relative">
                    {renderStrategyCanvas()}
                  </div>
                ) : (
                  <div className="h-full border rounded-md bg-black/90">
                    <div className="p-3 bg-black/80 border-b flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <SquareCode className="h-4 w-4 text-primary" />
                        <span className="text-sm text-gray-300">strategy.js</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-7 text-gray-300 hover:text-white">
                          <Copy className="h-3.5 w-3.5 mr-1" />
                          Copy
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-gray-300 hover:text-white">
                          <Check className="h-3.5 w-3.5 mr-1" />
                          Format
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 h-[calc(100%-3rem)] overflow-auto">
                      <pre className="text-gray-300 text-sm font-mono">
                        <code>{codeContent}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Properties Panel */}
            {showPropertiesPanel && (
              <Card className="col-span-3 h-full">
                <CardHeader className="p-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Properties</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setShowPropertiesPanel(false)}>
                      <PanelRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <ScrollArea className="h-[calc(100vh-17rem)]">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Strategy Info</h3>
                        <div className="space-y-2">
                          <div>
                            <Label htmlFor="strategy-name">Name</Label>
                            <Input id="strategy-name" defaultValue="Moving Average Crossover" />
                          </div>
                          <div>
                            <Label htmlFor="strategy-description">Description</Label>
                            <Input id="strategy-description" defaultValue="Trades crossovers between fast and slow moving averages" />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Parameters</h3>
                        <div className="space-y-2">
                          <div>
                            <Label htmlFor="fast-length">Fast MA Length</Label>
                            <Input id="fast-length" type="number" defaultValue="10" />
                          </div>
                          <div>
                            <Label htmlFor="slow-length">Slow MA Length</Label>
                            <Input id="slow-length" type="number" defaultValue="20" />
                          </div>
                          <div>
                            <Label htmlFor="source-type">Source Type</Label>
                            <Select defaultValue="close">
                              <SelectTrigger id="source-type">
                                <SelectValue placeholder="Select source" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="close">Close</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Risk Management</h3>
                        <div className="space-y-2">
                          <div>
                            <Label htmlFor="position-size">Position Size</Label>
                            <Input id="position-size" defaultValue="100" />
                          </div>
                          <div>
                            <Label htmlFor="stop-loss">Stop Loss (ATR multiplier)</Label>
                            <Input id="stop-loss" defaultValue="2" />
                          </div>
                          <div>
                            <Label htmlFor="take-profit">Take Profit (ATR multiplier)</Label>
                            <Input id="take-profit" defaultValue="4" />
                          </div>
                          <div className="flex items-center gap-2 pt-2">
                            <Switch id="trail-stop" />
                            <Label htmlFor="trail-stop">Enable Trailing Stop</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="results" className="h-full mt-4">
          <div className="grid grid-cols-1 gap-4 h-full">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle>Backtest Results</CardTitle>
                <CardDescription>Performance metrics and trade history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[calc(100vh-15rem)] border-2 border-dashed rounded-lg p-4 bg-accent/20">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Run a backtest to see results</h3>
                    <p className="text-muted-foreground mb-4">
                      Your backtest results and performance metrics will appear here
                    </p>
                    <Button onClick={() => handleRunBacktest()}>
                      Run Backtest
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="optimization" className="h-full mt-4">
          <div className="grid grid-cols-1 gap-4 h-full">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle>Strategy Optimization</CardTitle>
                <CardDescription>Optimize your strategy parameters for better performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[calc(100vh-15rem)] border-2 border-dashed rounded-lg p-4 bg-accent/20">
                  <div className="text-center">
                    <Cpu className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Optimize Your Strategy</h3>
                    <p className="text-muted-foreground mb-4">
                      Set up optimization parameters to find the best settings for your strategy
                    </p>
                    <Button onClick={() => setActiveTab("editor")}>
                      Back to Editor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="h-full mt-4">
          <div className="grid grid-cols-1 gap-4 h-full">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle>Strategy Settings</CardTitle>
                <CardDescription>Configure global settings for your strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-2xl mx-auto space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Backtest Settings</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="start-date">Start Date</Label>
                          <Input type="date" id="start-date" defaultValue="2023-01-01" />
                        </div>
                        <div>
                          <Label htmlFor="end-date">End Date</Label>
                          <Input type="date" id="end-date" defaultValue="2023-12-31" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="initial-capital">Initial Capital</Label>
                        <Input type="number" id="initial-capital" defaultValue="10000" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="include-fees" defaultChecked />
                        <Label htmlFor="include-fees">Include Trading Fees</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="include-slippage" defaultChecked />
                        <Label htmlFor="include-slippage">Include Slippage</Label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Optimization Settings</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="optimization-metric">Optimization Metric</Label>
                        <Select defaultValue="sharpe">
                          <SelectTrigger id="optimization-metric">
                            <SelectValue placeholder="Select metric" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="profit">Net Profit</SelectItem>
                            <SelectItem value="sharpe">Sharpe Ratio</SelectItem>
                            <SelectItem value="drawdown">Max Drawdown</SelectItem>
                            <SelectItem value="win-rate">Win Rate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="optimization-method">Optimization Method</Label>
                        <Select defaultValue="grid">
                          <SelectTrigger id="optimization-method">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grid">Grid Search</SelectItem>
                            <SelectItem value="random">Random Search</SelectItem>
                            <SelectItem value="genetic">Genetic Algorithm</SelectItem>
                            <SelectItem value="bayesian">Bayesian Optimization</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="use-multiprocessing" defaultChecked />
                        <Label htmlFor="use-multiprocessing">Use Multiprocessing</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 