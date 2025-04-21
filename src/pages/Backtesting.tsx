import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download, BarChart2, PieChart, Settings, Activity, Info } from "lucide-react";

const Backtesting = () => {
  const [activeTab, setActiveTab] = useState("strategy");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(2022, 0, 1));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(2023, 0, 1));
  const [isRunning, setIsRunning] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  
  // Run backtest and generate results
  const runBacktest = () => {
    setIsRunning(true);
    // Simulate backtest running
    setTimeout(() => {
      setIsRunning(false);
      setHasResults(true);
    }, 2000);
  };

  // Sample performance metrics
  const performanceMetrics = [
    { name: 'Total Return', value: '35.42%' },
    { name: 'Annualized Return', value: '28.36%' },
    { name: 'Sharpe Ratio', value: '1.86' },
    { name: 'Max Drawdown', value: '-15.23%' },
    { name: 'Win Rate', value: '68.5%' },
    { name: 'Profit Factor', value: '2.34' },
    { name: 'Alpha', value: '0.18' },
    { name: 'Beta', value: '0.72' }
  ];
  
  // Sample trades data
  const trades = [
    { id: 1, asset: 'BTC/USD', type: 'Long', entry: 42500, exit: 48600, profit: '14.35%', date: '2022-03-15' },
    { id: 2, asset: 'ETH/USD', type: 'Long', entry: 3250, exit: 3850, profit: '18.46%', date: '2022-04-22' },
    { id: 3, asset: 'SOL/USD', type: 'Short', entry: 120, exit: 95, profit: '20.83%', date: '2022-05-18' },
    { id: 4, asset: 'BTC/USD', type: 'Long', entry: 38700, exit: 36200, profit: '-6.46%', date: '2022-06-10' },
    { id: 5, asset: 'AAPL', type: 'Long', entry: 158.35, exit: 173.28, profit: '9.43%', date: '2022-07-05' },
  ];
  
  // Sample equity curve data
  const equityCurveData = [
    { date: 'Jan 2022', equity: 10000, benchmark: 10000 },
    { date: 'Feb 2022', equity: 10850, benchmark: 10250 },
    { date: 'Mar 2022', equity: 11650, benchmark: 10400 },
    { date: 'Apr 2022', equity: 11200, benchmark: 10100 },
    { date: 'May 2022', equity: 12300, benchmark: 10300 },
    { date: 'Jun 2022', equity: 11800, benchmark: 9800 },
    { date: 'Jul 2022', equity: 12600, benchmark: 10200 },
    { date: 'Aug 2022', equity: 13400, benchmark: 10500 },
    { date: 'Sep 2022', equity: 12900, benchmark: 10150 },
    { date: 'Oct 2022', equity: 13800, benchmark: 10350 },
    { date: 'Nov 2022', equity: 14500, benchmark: 10600 },
    { date: 'Dec 2022', equity: 15300, benchmark: 10900 },
  ];
  
  // Sample monthly returns data
  const monthlyReturnsData = [
    { month: 'Jan', return: 8.5 },
    { month: 'Feb', return: 7.4 },
    { month: 'Mar', return: -3.8 },
    { month: 'Apr', return: 9.8 },
    { month: 'May', return: -4.1 },
    { month: 'Jun', return: 6.8 },
    { month: 'Jul', return: 6.3 },
    { month: 'Aug', return: -3.7 },
    { month: 'Sep', return: 7.0 },
    { month: 'Oct', return: 5.1 },
    { month: 'Nov', return: 5.5 },
    { month: 'Dec', return: 5.5 },
  ];
  
  // Sample drawdown chart data
  const drawdownData = [
    { date: 'Jan 2022', drawdown: 0 },
    { date: 'Feb 2022', drawdown: -2.5 },
    { date: 'Mar 2022', drawdown: -5.8 },
    { date: 'Apr 2022', drawdown: -3.2 },
    { date: 'May 2022', drawdown: -1.5 },
    { date: 'Jun 2022', drawdown: -15.2 },
    { date: 'Jul 2022', drawdown: -8.5 },
    { date: 'Aug 2022', drawdown: -4.3 },
    { date: 'Sep 2022', drawdown: -7.8 },
    { date: 'Oct 2022', drawdown: -2.1 },
    { date: 'Nov 2022', drawdown: -1.2 },
    { date: 'Dec 2022', drawdown: 0 },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Backtesting</h1>
          <p className="text-muted-foreground">Test your trading strategies against historical data</p>
        </div>
        {hasResults && (
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export Results
          </Button>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="strategy">Strategy Setup</TabsTrigger>
          <TabsTrigger value="performance" disabled={!hasResults}>Performance</TabsTrigger>
          <TabsTrigger value="trades" disabled={!hasResults}>Trades</TabsTrigger>
          <TabsTrigger value="analysis" disabled={!hasResults}>Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="strategy" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Strategy Configuration</CardTitle>
                <CardDescription>Define your trading strategy parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="strategy-type">Strategy Type</Label>
                    <Select defaultValue="momentum">
                      <SelectTrigger>
                        <SelectValue placeholder="Select strategy type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="momentum">Momentum</SelectItem>
                        <SelectItem value="meanreversion">Mean Reversion</SelectItem>
                        <SelectItem value="breakout">Breakout</SelectItem>
                        <SelectItem value="trendfollowing">Trend Following</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="asset-class">Asset Class</Label>
                    <Select defaultValue="crypto">
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crypto">Cryptocurrencies</SelectItem>
                        <SelectItem value="stocks">Stocks</SelectItem>
                        <SelectItem value="forex">Forex</SelectItem>
                        <SelectItem value="commodities">Commodities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assets">Assets</Label>
                  <Select defaultValue="btc">
                    <SelectTrigger>
                      <SelectValue placeholder="Select trading assets" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="btc">Bitcoin (BTC/USD)</SelectItem>
                      <SelectItem value="eth">Ethereum (ETH/USD)</SelectItem>
                      <SelectItem value="sol">Solana (SOL/USD)</SelectItem>
                      <SelectItem value="aapl">Apple (AAPL)</SelectItem>
                      <SelectItem value="msft">Microsoft (MSFT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fast-ma">Fast Moving Average</Label>
                    <span className="text-sm text-muted-foreground">20</span>
                  </div>
                  <Slider defaultValue={[20]} max={50} step={1} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slow-ma">Slow Moving Average</Label>
                    <span className="text-sm text-muted-foreground">50</span>
                  </div>
                  <Slider defaultValue={[50]} max={200} step={1} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position-size">Position Size (%)</Label>
                    <Input type="number" id="position-size" defaultValue="10" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stop-loss">Stop Loss (%)</Label>
                    <Input type="number" id="stop-loss" defaultValue="5" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="take-profit">Take Profit (%)</Label>
                    <Input type="number" id="take-profit" defaultValue="15" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-open-trades">Max Open Trades</Label>
                    <Input type="number" id="max-open-trades" defaultValue="3" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="trailing-stop" />
                  <Label htmlFor="trailing-stop">Use Trailing Stop</Label>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Backtest Settings</CardTitle>
                <CardDescription>Configure test parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Initial Capital</Label>
                  <Input type="number" defaultValue="10000" />
                </div>
                
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "MMM d, yyyy") : "Start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "MMM d, yyyy") : "End date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Benchmark</Label>
                  <Select defaultValue="spy">
                    <SelectTrigger>
                      <SelectValue placeholder="Select benchmark" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spy">S&P 500 (SPY)</SelectItem>
                      <SelectItem value="qqq">NASDAQ (QQQ)</SelectItem>
                      <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="commission" />
                    <Label htmlFor="commission">Include Commission (0.1%)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="slippage" />
                    <Label htmlFor="slippage">Include Slippage (0.05%)</Label>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={runBacktest}
                  disabled={isRunning}
                >
                  {isRunning ? "Running..." : "Run Backtest"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Equity Curve</CardTitle>
                <CardDescription>Performance compared to benchmark</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={equityCurveData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="equity" 
                      stroke="#2563eb" 
                      fill="rgba(37, 99, 235, 0.2)" 
                      name="Strategy" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="benchmark" 
                      stroke="#9ca3af" 
                      fill="rgba(156, 163, 175, 0.2)" 
                      name="Benchmark" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">{metric.name}</span>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Returns (%)</CardTitle>
                <CardDescription>Performance by month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyReturnsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="return" 
                      fill={(entry) => (entry.return >= 0 ? "rgba(34, 197, 94, 0.8)" : "rgba(239, 68, 68, 0.8)")} 
                      name="Return %" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Drawdown Analysis</CardTitle>
                <CardDescription>Historical drawdowns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={drawdownData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="drawdown" 
                      stroke="#ef4444" 
                      fill="rgba(239, 68, 68, 0.3)" 
                      name="Drawdown %" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trades" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Trade History</CardTitle>
              <CardDescription>All executed trades in the backtest</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Entry Price</TableHead>
                    <TableHead>Exit Price</TableHead>
                    <TableHead>Profit/Loss</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trades.map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell>{trade.id}</TableCell>
                      <TableCell>{trade.asset}</TableCell>
                      <TableCell>
                        <span className={trade.type === 'Long' ? 'text-green-600' : 'text-red-600'}>
                          {trade.type}
                        </span>
                      </TableCell>
                      <TableCell>{trade.entry}</TableCell>
                      <TableCell>{trade.exit}</TableCell>
                      <TableCell>
                        <span className={parseFloat(trade.profit) >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {trade.profit}
                        </span>
                      </TableCell>
                      <TableCell>{trade.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Profit Distribution</CardTitle>
                <CardDescription>Analysis of trade outcomes</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Profit distribution chart will appear here</p>
                  <p className="text-xs text-muted-foreground mt-2">Available with AlgoBlocks Pro Plan</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Trade Duration</CardTitle>
                <CardDescription>Holding periods analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart2 className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Trade duration chart will appear here</p>
                  <p className="text-xs text-muted-foreground mt-2">Available with AlgoBlocks Pro Plan</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>Strategy risk profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Value at Risk (95%)</span>
                      <span className="font-medium">-3.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Expected Shortfall</span>
                      <span className="font-medium">-4.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Sortino Ratio</span>
                      <span className="font-medium">2.14</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Calmar Ratio</span>
                      <span className="font-medium">1.86</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Maximum Consecutive Losses</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Average Drawdown Duration</span>
                      <span className="font-medium">18 days</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Monte Carlo Simulation</CardTitle>
                <CardDescription>Probability projections</CardDescription>
              </CardHeader>
              <CardContent className="h-[280px] flex items-center justify-center">
                <div className="text-center">
                  <Activity className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Monte Carlo simulation will appear here</p>
                  <p className="text-xs text-muted-foreground mt-2">Available with AlgoBlocks Pro Plan</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Strategy Optimization</CardTitle>
              <CardDescription>Parameter sensitivity analysis</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <Settings className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Strategy optimization results will appear here</p>
                <p className="text-xs text-muted-foreground mt-2">Available with AlgoBlocks Pro Plan</p>
                <Button variant="outline" className="mt-4">Upgrade to Pro</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Backtesting; 