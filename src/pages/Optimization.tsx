import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  CartesianGrid, 
  LineChart, 
  Line, 
  Cell,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Scatter,
  ScatterChart,
  ZAxis,
  ReferenceLine,
  Legend
} from "recharts";
import { motion } from "framer-motion";
import { 
  Play, 
  Download, 
  Settings, 
  Layers, 
  Filter, 
  Sliders, 
  PlayCircle, 
  PauseCircle, 
  RefreshCw,
  Trash2,
  Edit,
  Save,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart4
} from "lucide-react";

export default function Optimization() {
  const [activeTab, setActiveTab] = useState("parameters");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [optimizationExperiments, setOptimizationExperiments] = useState([
    {
      id: "opt-1",
      name: "Moving Average Crossover Optimization",
      date: "2023-10-15",
      status: "completed",
      progress: 100,
      selected: true,
      metrics: {
        netProfit: 18750.42,
        sharpeRatio: 1.85,
        maxDrawdown: 12.3,
        winRate: 68.5
      },
      parameters: {
        "Fast MA Period": 12,
        "Slow MA Period": 26,
        "Position Size %": 5,
        "Stop Loss %": 2.5
      }
    },
    {
      id: "opt-2",
      name: "RSI Strategy Optimization",
      date: "2023-10-10",
      status: "completed",
      progress: 100,
      selected: false,
      metrics: {
        netProfit: 12350.18,
        sharpeRatio: 1.42,
        maxDrawdown: 15.7,
        winRate: 62.1
      },
      parameters: {
        "RSI Period": 14,
        "Overbought Level": 70,
        "Oversold Level": 30,
        "Position Size %": 4,
        "Stop Loss %": 3.0
      }
    }
  ]);

  // Sample data for parameter heatmap
  const scatterData = Array.from({ length: 50 }, (_, i) => ({
    x: 10 + Math.floor(i / 10) * 2,
    y: 20 + (i % 10) * 2,
    z: Math.round((Math.sin(i * 0.5) + 1) * 50) / 10
  }));

  // Performance comparison data
  const performanceData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2023, i, 1).toLocaleString('default', { month: 'short' });
    return {
      month,
      "Best Parameters": 2000 + Math.random() * 5000 * Math.sin(i * 0.5),
      "Second Best": 1500 + Math.random() * 4000 * Math.sin(i * 0.5),
      "Third Best": 1000 + Math.random() * 3000 * Math.sin(i * 0.5)
    };
  });

  const startOptimization = () => {
    setIsOptimizing(true);
    setProgress(0);
    
    // Simulate optimization progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsOptimizing(false);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const applySelectedParameters = () => {
    const selected = optimizationExperiments.find(exp => exp.selected);
    if (selected) {
      // In a real app, this would apply the parameters to your strategy
      alert(`Applied parameters from: ${selected.name}`);
    }
  };

  const exportResults = () => {
    // In a real app, this would export the optimization results
    alert("Exporting optimization results...");
  };

  const deleteExperiment = (id) => {
    setOptimizationExperiments(prev => 
      prev.filter(exp => exp.id !== id)
    );
  };

  const toggleOptimizationSelection = (id) => {
    setOptimizationExperiments(prev => 
      prev.map(exp => ({
        ...exp,
        selected: exp.id === id
      }))
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Strategy Optimization</h1>
            <p className="text-muted-foreground mt-1">
              Fine-tune your trading strategies by optimizing parameters
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={exportResults} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
            <Button onClick={startOptimization} disabled={isOptimizing} size="sm">
              <Play className="h-4 w-4 mr-2" />
              {isOptimizing ? "Optimizing..." : "Start Optimization"}
            </Button>
          </div>
        </div>

        {isOptimizing && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Optimization in progress...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {progress < 30 && "Testing different parameter combinations..."}
                  {progress >= 30 && progress < 60 && "Running backtests for each parameter set..."}
                  {progress >= 60 && progress < 90 && "Calculating performance metrics..."}
                  {progress >= 90 && "Finalizing and sorting results..."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Optimization Parameters
                </CardTitle>
                <CardDescription>
                  Configure the parameters and ranges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="strategy">Strategy</Label>
                    <Select defaultValue="ma-crossover">
                      <SelectTrigger id="strategy">
                        <SelectValue placeholder="Select strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ma-crossover">Moving Average Crossover</SelectItem>
                        <SelectItem value="rsi">RSI Strategy</SelectItem>
                        <SelectItem value="breakout">Breakout Strategy</SelectItem>
                        <SelectItem value="mean-reversion">Mean Reversion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="instrument">Instrument</Label>
                    <Select defaultValue="aapl">
                      <SelectTrigger id="instrument">
                        <SelectValue placeholder="Select instrument" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aapl">AAPL</SelectItem>
                        <SelectItem value="msft">MSFT</SelectItem>
                        <SelectItem value="googl">GOOGL</SelectItem>
                        <SelectItem value="amzn">AMZN</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="date-range">Date Range</Label>
                    <Select defaultValue="1y">
                      <SelectTrigger id="date-range">
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3m">3 Months</SelectItem>
                        <SelectItem value="6m">6 Months</SelectItem>
                        <SelectItem value="1y">1 Year</SelectItem>
                        <SelectItem value="3y">3 Years</SelectItem>
                        <SelectItem value="5y">5 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm font-medium">
                      Moving Average Parameters
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="fast-ma-min">Fast MA Period: Min</Label>
                          <span className="text-sm">5</span>
                        </div>
                        <Input id="fast-ma-min" type="number" min="2" max="50" defaultValue="5" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="fast-ma-max">Fast MA Period: Max</Label>
                          <span className="text-sm">20</span>
                        </div>
                        <Input id="fast-ma-max" type="number" min="5" max="50" defaultValue="20" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="slow-ma-min">Slow MA Period: Min</Label>
                          <span className="text-sm">20</span>
                        </div>
                        <Input id="slow-ma-min" type="number" min="10" max="200" defaultValue="20" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="slow-ma-max">Slow MA Period: Max</Label>
                          <span className="text-sm">50</span>
                        </div>
                        <Input id="slow-ma-max" type="number" min="20" max="200" defaultValue="50" />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-sm font-medium">
                      Position Sizing Parameters
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="position-size-min">Position Size %: Min</Label>
                          <span className="text-sm">1%</span>
                        </div>
                        <Input id="position-size-min" type="number" min="1" max="10" defaultValue="1" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="position-size-max">Position Size %: Max</Label>
                          <span className="text-sm">5%</span>
                        </div>
                        <Input id="position-size-max" type="number" min="1" max="20" defaultValue="5" />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-sm font-medium">
                      Risk Management Parameters
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="stop-loss-min">Stop Loss %: Min</Label>
                          <span className="text-sm">1%</span>
                        </div>
                        <Input id="stop-loss-min" type="number" min="0.5" max="5" step="0.5" defaultValue="1" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="stop-loss-max">Stop Loss %: Max</Label>
                          <span className="text-sm">3%</span>
                        </div>
                        <Input id="stop-loss-max" type="number" min="1" max="10" step="0.5" defaultValue="3" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="take-profit-min">Take Profit %: Min</Label>
                          <span className="text-sm">2%</span>
                        </div>
                        <Input id="take-profit-min" type="number" min="1" max="10" step="0.5" defaultValue="2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="take-profit-max">Take Profit %: Max</Label>
                          <span className="text-sm">6%</span>
                        </div>
                        <Input id="take-profit-max" type="number" min="2" max="20" step="0.5" defaultValue="6" />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="walk-forward">Walk-Forward Analysis</Label>
                      <p className="text-sm text-muted-foreground">Test on out-of-sample data</p>
                    </div>
                    <Switch id="walk-forward" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="monte-carlo">Monte Carlo Simulation</Label>
                      <p className="text-sm text-muted-foreground">Test robustness with random variations</p>
                    </div>
                    <Switch id="monte-carlo" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={startOptimization} disabled={isOptimizing}>
                  {isOptimizing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Start Optimization
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layers className="h-5 w-5 mr-2" />
                  Optimization History
                </CardTitle>
                <CardDescription>
                  Previous optimization experiments
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {optimizationExperiments.map((experiment) => (
                    <div 
                      key={experiment.id}
                      className={`px-6 py-4 cursor-pointer transition-colors ${
                        experiment.selected ? "bg-primary/5" : "hover:bg-secondary/50"
                      }`}
                      onClick={() => toggleOptimizationSelection(experiment.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium flex items-center">
                            {experiment.selected && <CheckCircle className="h-3 w-3 mr-1 text-primary" />}
                            {experiment.name}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {experiment.date}
                          </div>
                        </div>
                        <Badge variant={experiment.status === "completed" ? "default" : "outline"}>
                          {experiment.status}
                        </Badge>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                          ${experiment.metrics.netProfit.toLocaleString()}
                        </div>
                        <div>SR: {experiment.metrics.sharpeRatio}</div>
                        <div>DD: {experiment.metrics.maxDrawdown}%</div>
                        <div>Win: {experiment.metrics.winRate}%</div>
                      </div>
                      
                      {experiment.selected && (
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={applySelectedParameters}>
                            Apply
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs px-2" onClick={() => deleteExperiment(experiment.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <BarChart4 className="h-5 w-5 mr-2" />
                  Optimization Results
                </CardTitle>
                <CardDescription>
                  Analysis of parameter performance across different metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="scatter" className="px-6">
                  <TabsList className="mb-4">
                    <TabsTrigger value="scatter">Parameter Visualization</TabsTrigger>
                    <TabsTrigger value="performance">Performance Comparison</TabsTrigger>
                    <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="scatter" className="pt-0">
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                          margin={{ top: 20, right: 30, bottom: 40, left: 30 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            type="number"
                            dataKey="x"
                            name="Fast MA"
                            label={{ 
                              value: 'Fast MA Period', 
                              position: 'bottom', 
                              offset: 20 
                            }}
                          />
                          <YAxis 
                            type="number"
                            dataKey="y"
                            name="Slow MA"
                            label={{ 
                              value: 'Slow MA Period', 
                              angle: -90, 
                              position: 'insideLeft',
                              offset: -15
                            }}
                          />
                          <ZAxis 
                            type="number" 
                            dataKey="z" 
                            range={[50, 500]} 
                            name="Profit" 
                          />
                          <Tooltip 
                            cursor={{ strokeDasharray: '3 3' }}
                            formatter={(value: any, name: any) => {
                              if (name === 'Profit') return [`$${Number(value) * 1000}`, name];
                              return [value, name];
                            }}
                          />
                          <Scatter 
                            name="Parameters" 
                            data={scatterData} 
                            fill="#8884d8"
                          />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-sm text-muted-foreground pt-2 px-4 text-center">
                      Bubble size represents profit magnitude. Hover over points to see details.
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="performance" className="pt-0">
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={performanceData}
                          margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: any) => [`$${typeof value === 'number' ? value.toFixed(2) : value}`, 'Profit']} 
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="Best Parameters" 
                            stroke="#4ade80" 
                            strokeWidth={2}
                            dot={{ r: 4 }} 
                            activeDot={{ r: 6 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="Second Best" 
                            stroke="#60a5fa" 
                            strokeWidth={2}
                            dot={{ r: 4 }} 
                            activeDot={{ r: 6 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="Third Best" 
                            stroke="#f472b6" 
                            strokeWidth={2}
                            dot={{ r: 4 }} 
                            activeDot={{ r: 6 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-sm text-muted-foreground pt-2 px-4 text-center">
                      Comparison of the top three parameter sets over a 12-month period.
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="metrics" className="pt-0">
                    <div className="px-2">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Parameter Set</TableHead>
                            <TableHead>Net Profit</TableHead>
                            <TableHead>Sharpe Ratio</TableHead>
                            <TableHead>Max Drawdown</TableHead>
                            <TableHead>Win Rate</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {optimizationExperiments.map((experiment) => (
                            <TableRow key={experiment.id} className={experiment.selected ? "bg-primary/5" : ""}>
                              <TableCell className="font-medium">{experiment.name}</TableCell>
                              <TableCell className="text-green-600">
                                ${experiment.metrics.netProfit.toLocaleString()}
                              </TableCell>
                              <TableCell>{experiment.metrics.sharpeRatio}</TableCell>
                              <TableCell className="text-red-500">
                                {experiment.metrics.maxDrawdown}%
                              </TableCell>
                              <TableCell>{experiment.metrics.winRate}%</TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8" 
                                    onClick={() => toggleOptimizationSelection(experiment.id)}>
                                    {experiment.selected ? <CheckCircle className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8"
                                    onClick={() => deleteExperiment(experiment.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                <div className="text-sm text-muted-foreground">
                  {optimizationExperiments.length} optimization runs completed
                </div>
                <Button variant="outline" size="sm" onClick={exportResults}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </CardFooter>
            </Card>

            {optimizationExperiments.length > 0 && optimizationExperiments.some(exp => exp.selected) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sliders className="h-5 w-5 mr-2" />
                    Optimized Parameters
                  </CardTitle>
                  <CardDescription>
                    {optimizationExperiments.find(exp => exp.selected)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(optimizationExperiments.find(exp => exp.selected)?.parameters || {}).map(([key, value]) => (
                      <div key={key} className="bg-secondary/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">{key}</p>
                        <p className="text-2xl font-semibold">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={applySelectedParameters}>
                    Apply Parameters to Strategy
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 