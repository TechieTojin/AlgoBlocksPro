import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import {
  BarChart2, PieChart, Activity, Download, Calendar as CalendarIcon, RefreshCw,
  Filter, LineChart, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  ArrowRight, Circle, LayoutGrid, DollarSign
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { HeatMapChart } from "@/components/visualizations/HeatMapChart";

export default function ReportsAnalytics() {
  const [activeTab, setActiveTab] = useState("performance");
  const [dateRange, setDateRange] = useState({
    from: new Date(2023, 11, 1),
    to: new Date()
  });
  const [selectedStrategy, setSelectedStrategy] = useState("All Strategies");
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Sample performance metrics data
  const performanceMetrics = [
    { name: "Net Profit", value: "+$24,521.20", change: "+15.4%", status: "positive" },
    { name: "Win Rate", value: "63.8%", change: "+2.1%", status: "positive" },
    { name: "Sharpe Ratio", value: "1.92", change: "+0.38", status: "positive" },
    { name: "Max Drawdown", value: "-12.4%", change: "-2.8%", status: "positive" },
    { name: "Total Trades", value: "342", change: "+52", status: "neutral" },
    { name: "Profit Factor", value: "2.14", change: "+0.23", status: "positive" },
    { name: "Avg. Profit", value: "$145.22", change: "+$12.33", status: "positive" },
    { name: "Avg. Loss", value: "-$78.15", change: "-$4.27", status: "negative" }
  ];

  // Sample equity curve data
  const equityData = Array.from({ length: 30 }, (_, i) => ({
    date: format(new Date(2023, 11, i + 1), 'MMM dd'),
    equity: 10000 + Math.floor(i * 500 + Math.random() * 1000),
    benchmark: 10000 + Math.floor(i * 400 + Math.random() * 800),
  }));

  // Sample monthly returns data
  const monthlyReturns = [
    { month: 'Jan', return: 3.2 },
    { month: 'Feb', return: -1.5 },
    { month: 'Mar', return: 5.7 },
    { month: 'Apr', return: 2.3 },
    { month: 'May', return: -2.1 },
    { month: 'Jun', return: 4.2 },
    { month: 'Jul', return: 1.9 },
    { month: 'Aug', return: 3.5 },
    { month: 'Sep', return: -0.8 },
    { month: 'Oct', return: 6.2 },
    { month: 'Nov', return: 4.8 },
    { month: 'Dec', return: 3.1 },
  ];

  // Sample trades history
  const tradesHistory = Array.from({ length: 10 }, (_, i) => ({
    id: `TR-${1000 + i}`,
    instrument: ['EURUSD', 'BTCUSD', 'AAPL', 'MSFT', 'GOOGL'][Math.floor(Math.random() * 5)],
    type: Math.random() > 0.5 ? 'BUY' : 'SELL',
    entryPrice: (100 + Math.random() * 50).toFixed(2),
    exitPrice: (100 + Math.random() * 50).toFixed(2),
    pnl: ((Math.random() * 2 - 0.5) * 100).toFixed(2),
    date: format(new Date(2023, 11, 20 - i), 'MMM dd, yyyy'),
    status: Math.random() > 0.3 ? 'WIN' : 'LOSS'
  }));

  // Risk metrics data
  const riskData = {
    winLoss: [
      { name: 'Winning Trades', value: 217 },
      { name: 'Losing Trades', value: 125 },
    ],
    drawdownHistory: Array.from({ length: 6 }, (_, i) => ({
      start: format(new Date(2023, 8 + Math.floor(i/2), 15 * (i % 2) + 1), 'MMM dd'),
      end: format(new Date(2023, 8 + Math.floor(i/2), 15 * (i % 2) + 10), 'MMM dd'),
      depth: (3 + Math.random() * 8).toFixed(2),
      recovery: (5 + Math.random() * 15).toFixed(0),
    }))
  };

  // Colors for charts
  const COLORS = ['#4a86e8', '#63c5da', '#7bd39a', '#ffd166', '#f25757', '#9775fa'];
  
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  const exportData = () => {
    // This would handle exporting report data
    console.log("Exporting data...");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive analysis of your trading activity</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={toggleAutoRefresh}>
            {autoRefresh ? (
              <>Auto-refresh: ON</>
            ) : (
              <>Auto-refresh: OFF</>
            )}
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span className="ml-2">Refresh</span>
          </Button>
          
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Filters row */}
      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <div className="flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start w-full md:w-auto">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>
                  {format(dateRange.from, "MMM dd, yyyy")} - {format(dateRange.to, "MMM dd, yyyy")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => range && setDateRange({ from: range.from || dateRange.from, to: range.to || dateRange.to })}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Strategies">All Strategies</SelectItem>
              <SelectItem value="MA Crossover">MA Crossover</SelectItem>
              <SelectItem value="RSI Strategy">RSI Strategy</SelectItem>
              <SelectItem value="Bollinger Bands">Bollinger Bands</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trades">Trade History</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="instruments">Instrument Analysis</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>
        
        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {performanceMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className={`text-sm flex items-center mt-1 ${
                    metric.status === "positive" ? "text-green-500" : 
                    metric.status === "negative" ? "text-red-500" : 
                    "text-muted-foreground"
                  }`}>
                    {metric.status === "positive" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                     metric.status === "negative" ? <ArrowDownRight className="h-3 w-3 mr-1" /> : 
                     <Circle className="h-3 w-3 mr-1" />}
                    {metric.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Equity Curve */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Equity Curve</CardTitle>
                <CardDescription>Performance compared to market benchmark</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={equityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="equity" stroke="#4a86e8" name="Strategy" activeDot={{ r: 8 }} strokeWidth={2} />
                      <Line type="monotone" dataKey="benchmark" stroke="#888" name="Benchmark" strokeDasharray="5 5" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Monthly Returns */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Returns (%)</CardTitle>
                <CardDescription>Performance by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyReturns} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, 'Return']} />
                      <Bar dataKey="return" name="Return (%)">
                        {monthlyReturns.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.return >= 0 ? '#4a86e8' : '#f25757'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Win/Loss Ratio */}
            <Card>
              <CardHeader>
                <CardTitle>Win/Loss Distribution</CardTitle>
                <CardDescription>Ratio of winning to losing trades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={riskData.winLoss}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {riskData.winLoss.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#4a86e8' : '#f25757'} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [`${value} trades`, name]}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Trade History Tab */}
        <TabsContent value="trades" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Trade History</CardTitle>
                  <CardDescription>Recent trades and their outcomes</CardDescription>
                </div>
                <Input placeholder="Search trades..." className="max-w-xs" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Instrument</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Entry Price</TableHead>
                    <TableHead>Exit Price</TableHead>
                    <TableHead>P&L</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tradesHistory.map((trade, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{trade.id}</TableCell>
                      <TableCell>{trade.instrument}</TableCell>
                      <TableCell>{trade.type === 'BUY' ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">BUY</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-500/10 text-red-500">SELL</Badge>
                      )}</TableCell>
                      <TableCell>${trade.entryPrice}</TableCell>
                      <TableCell>${trade.exitPrice}</TableCell>
                      <TableCell className={parseFloat(trade.pnl) >= 0 ? "text-green-500" : "text-red-500"}>
                        {parseFloat(trade.pnl) >= 0 ? "+" : ""}{trade.pnl}
                      </TableCell>
                      <TableCell>{trade.date}</TableCell>
                      <TableCell>
                        {trade.status === 'WIN' ? (
                          <Badge className="bg-green-500/10 text-green-500">WIN</Badge>
                        ) : (
                          <Badge className="bg-red-500/10 text-red-500">LOSS</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Risk Analysis Tab */}
        <TabsContent value="risk" className="space-y-6">
          {/* Risk metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Max Drawdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">-12.4%</div>
                <div className="text-sm flex items-center mt-1 text-muted-foreground">
                  Peak to valley drop
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Time in Drawdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.3 days</div>
                <div className="text-sm flex items-center mt-1 text-muted-foreground">
                  Average recovery time
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Risk-Reward Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1:2.14</div>
                <div className="text-sm flex items-center mt-1 text-muted-foreground">
                  Average risk vs reward
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Drawdown history */}
          <Card>
            <CardHeader>
              <CardTitle>Drawdown History</CardTitle>
              <CardDescription>Major drawdown periods and recovery</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Depth (%)</TableHead>
                    <TableHead>Recovery (days)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {riskData.drawdownHistory.map((dd, index) => (
                    <TableRow key={index}>
                      <TableCell>{dd.start}</TableCell>
                      <TableCell>{dd.end}</TableCell>
                      <TableCell className="text-red-500">-{dd.depth}%</TableCell>
                      <TableCell>{dd.recovery} days</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Instrument Analysis */}
        <TabsContent value="instruments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Instrument Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Instrument Performance</CardTitle>
                <CardDescription>Performance metrics by trading instrument</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'EURUSD', profit: 3450, trades: 42 },
                        { name: 'BTCUSD', profit: 2840, trades: 35 },
                        { name: 'AAPL', profit: 1920, trades: 28 },
                        { name: 'MSFT', profit: 1540, trades: 22 },
                        { name: 'GOOGL', profit: -850, trades: 18 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#4a86e8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="profit" name="P&L ($)" fill="#4a86e8" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="right" dataKey="trades" name="# of Trades" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Instrument Correlation */}
            <HeatMapChart
              data={[
                { x: 'EURUSD', y: 'EURUSD', value: 1.0 },
                { x: 'EURUSD', y: 'BTCUSD', value: 0.12 },
                { x: 'EURUSD', y: 'AAPL', value: 0.28 },
                { x: 'EURUSD', y: 'MSFT', value: 0.32 },
                { x: 'EURUSD', y: 'GOOGL', value: 0.18 },
                
                { x: 'BTCUSD', y: 'EURUSD', value: 0.12 },
                { x: 'BTCUSD', y: 'BTCUSD', value: 1.0 },
                { x: 'BTCUSD', y: 'AAPL', value: 0.42 },
                { x: 'BTCUSD', y: 'MSFT', value: 0.39 },
                { x: 'BTCUSD', y: 'GOOGL', value: 0.45 },
                
                { x: 'AAPL', y: 'EURUSD', value: 0.28 },
                { x: 'AAPL', y: 'BTCUSD', value: 0.42 },
                { x: 'AAPL', y: 'AAPL', value: 1.0 },
                { x: 'AAPL', y: 'MSFT', value: 0.76 },
                { x: 'AAPL', y: 'GOOGL', value: 0.81 },
                
                { x: 'MSFT', y: 'EURUSD', value: 0.32 },
                { x: 'MSFT', y: 'BTCUSD', value: 0.39 },
                { x: 'MSFT', y: 'AAPL', value: 0.76 },
                { x: 'MSFT', y: 'MSFT', value: 1.0 },
                { x: 'MSFT', y: 'GOOGL', value: 0.85 },
                
                { x: 'GOOGL', y: 'EURUSD', value: 0.18 },
                { x: 'GOOGL', y: 'BTCUSD', value: 0.45 },
                { x: 'GOOGL', y: 'AAPL', value: 0.81 },
                { x: 'GOOGL', y: 'MSFT', value: 0.85 },
                { x: 'GOOGL', y: 'GOOGL', value: 1.0 }
              ]}
              title="Instrument Correlation"
              description="Correlation between different trading instruments"
              xAxisLabel="Instrument"
              yAxisLabel="Instrument"
              tooltipFormatter={(value) => `Correlation: ${value.toFixed(2)}`}
              colorRange={['#f3f4f6', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151']}
            />
            
            {/* Market Exposure */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Market Exposure Over Time</CardTitle>
                <CardDescription>How your exposure to different instruments has changed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={Array.from({ length: 12 }, (_, i) => {
                        const month = format(new Date(2023, i, 1), 'MMM');
                        return {
                          month,
                          EURUSD: Math.floor(Math.random() * 40) + 10,
                          BTCUSD: Math.floor(Math.random() * 30) + 5,
                          AAPL: Math.floor(Math.random() * 25) + 15,
                          MSFT: Math.floor(Math.random() * 20) + 10,
                          GOOGL: Math.floor(Math.random() * 15) + 5,
                        };
                      })}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="EURUSD" stroke="#4a86e8" />
                      <Line type="monotone" dataKey="BTCUSD" stroke="#f25757" />
                      <Line type="monotone" dataKey="AAPL" stroke="#7bd39a" />
                      <Line type="monotone" dataKey="MSFT" stroke="#ffd166" />
                      <Line type="monotone" dataKey="GOOGL" stroke="#9775fa" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Custom Reports */}
        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                Custom reports will allow you to build your own analytics dashboards with the metrics that matter most to you.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center p-12">
              <LayoutGrid className="h-16 w-16 text-muted-foreground" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 