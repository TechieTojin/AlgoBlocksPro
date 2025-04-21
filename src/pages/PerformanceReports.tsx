
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Download, 
  Share2, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Table as TableIcon, 
  ChevronDown 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
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

const PerformanceReports = () => {
  const [selectedStrategy, setSelectedStrategy] = useState("all");
  const [dateRange, setDateRange] = useState("ytd");
  
  // Mock data for charts
  const performanceData = [
    { date: "Jan", equity: 110000, benchmark: 105000 },
    { date: "Feb", equity: 115000, benchmark: 108000 },
    { date: "Mar", equity: 112000, benchmark: 106000 },
    { date: "Apr", equity: 118000, benchmark: 110000 },
    { date: "May", equity: 125000, benchmark: 112000 },
    { date: "Jun", equity: 132000, benchmark: 115000 },
    { date: "Jul", equity: 140000, benchmark: 118000 },
    { date: "Aug", equity: 138000, benchmark: 117000 },
    { date: "Sep", equity: 145000, benchmark: 120000 },
    { date: "Oct", equity: 155000, benchmark: 124000 },
    { date: "Nov", equity: 162000, benchmark: 128000 },
    { date: "Dec", equity: 172000, benchmark: 134000 },
  ];
  
  const monthlyReturnsData = [
    { date: "Jan", return: 4.5 },
    { date: "Feb", return: 5.2 },
    { date: "Mar", return: -2.3 },
    { date: "Apr", return: 5.8 },
    { date: "May", return: 6.2 },
    { date: "Jun", return: 5.9 },
    { date: "Jul", return: 6.7 },
    { date: "Aug", return: -1.4 },
    { date: "Sep", return: 5.3 },
    { date: "Oct", return: 7.1 },
    { date: "Nov", return: 4.8 },
    { date: "Dec", return: 6.3 },
  ];
  
  const assetAllocationData = [
    { name: "US Equities", value: 35 },
    { name: "Tech Stocks", value: 25 },
    { name: "ETFs", value: 20 },
    { name: "Commodities", value: 10 },
    { name: "Cash", value: 10 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Performance metrics data
  const metrics = [
    { name: "Total Return", value: "72.0%", change: "+12.4%", status: "positive" },
    { name: "Annualized Return", value: "24.3%", change: "+2.8%", status: "positive" },
    { name: "Sharpe Ratio", value: "2.14", change: "+0.32", status: "positive" },
    { name: "Sortino Ratio", value: "3.25", change: "+0.45", status: "positive" },
    { name: "Max Drawdown", value: "-5.8%", change: "-1.2%", status: "negative" },
    { name: "Win Rate", value: "72%", change: "+4%", status: "positive" },
  ];
  
  // Transaction history data
  const transactions = [
    {
      id: 1,
      date: "Dec 15, 2024",
      symbol: "AAPL",
      type: "Buy",
      quantity: 100,
      price: "$175.32",
      total: "$17,532.00",
      strategy: "Moving Average"
    },
    {
      id: 2,
      date: "Dec 10, 2024",
      symbol: "MSFT",
      type: "Sell",
      quantity: 50,
      price: "$315.45",
      total: "$15,772.50",
      strategy: "RSI Overbought"
    },
    {
      id: 3,
      date: "Dec 5, 2024",
      symbol: "GOOGL",
      type: "Buy",
      quantity: 25,
      price: "$2,105.26",
      total: "$52,631.50",
      strategy: "Bollinger Breakout"
    },
    {
      id: 4,
      date: "Nov 28, 2024",
      symbol: "TSLA",
      type: "Sell",
      quantity: 75,
      price: "$212.80",
      total: "$15,960.00",
      strategy: "MACD Crossover"
    },
    {
      id: 5,
      date: "Nov 22, 2024",
      symbol: "NVDA",
      type: "Buy",
      quantity: 40,
      price: "$485.25",
      total: "$19,410.00",
      strategy: "Moving Average"
    }
  ];
  
  const formatDollar = (value) => {
    return `$${Number(value).toLocaleString()}`;
  };
  
  const formatPercent = (value) => {
    return `${value}%`;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Performance Reports</h1>
              <p className="text-muted-foreground mt-1">Comprehensive analysis of your trading strategies</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Strategies</SelectItem>
                  <SelectItem value="ma">Moving Average</SelectItem>
                  <SelectItem value="rsi">RSI Strategy</SelectItem>
                  <SelectItem value="bb">Bollinger Bands</SelectItem>
                  <SelectItem value="macd">MACD Strategy</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">Last Month</SelectItem>
                  <SelectItem value="3m">Last 3 Months</SelectItem>
                  <SelectItem value="6m">Last 6 Months</SelectItem>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Custom Range
              </Button>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          
          {/* Portfolio Summary */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Portfolio Summary</CardTitle>
                  <CardDescription>Overall performance at a glance</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Current Value</p>
                  <p className="text-3xl font-bold">$172,500</p>
                  <div className="flex items-center justify-end text-green-500 text-sm">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span>+72.5% all time</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={formatDollar} />
                    <Tooltip formatter={(value) => [`${formatDollar(value)}`, 'Value']} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="equity"
                      stroke="#8884d8"
                      strokeWidth={2}
                      name="Portfolio Value"
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="benchmark" 
                      stroke="#82ca9d" 
                      name="Benchmark (S&P 500)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.name}>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  <p className={`text-xs flex items-center mt-1 ${
                    (metric.status === "positive" && metric.name !== "Max Drawdown") || 
                    (metric.name === "Max Drawdown" && metric.status === "negative") 
                      ? "text-green-500" 
                      : "text-red-500"
                  }`}>
                    {metric.status === "positive" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {metric.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Detailed Reports */}
          <Tabs defaultValue="returns" className="w-full">
            <TabsList>
              <TabsTrigger value="returns" className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Returns
              </TabsTrigger>
              <TabsTrigger value="allocation" className="flex items-center">
                <PieChart className="h-4 w-4 mr-2" />
                Allocation
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center">
                <TableIcon className="h-4 w-4 mr-2" />
                Transactions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="returns" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Returns</CardTitle>
                  <CardDescription>Performance breakdown by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyReturnsData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={formatPercent} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Return']} />
                        <Bar dataKey="return" name="Monthly Return">
                          {monthlyReturnsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.return >= 0 ? '#4CAF50' : '#F44336'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Best Month:</span>
                    <span className="font-medium ml-1">Oct (+7.1%)</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Worst Month:</span>
                    <span className="font-medium ml-1">Mar (-2.3%)</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Average Return:</span>
                    <span className="font-medium ml-1">+4.5%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Positive Months:</span>
                    <span className="font-medium ml-1">10/12 (83%)</span>
                  </div>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Strategy Contribution</CardTitle>
                    <CardDescription>Return contribution by strategy</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <div className="h-4 w-4 rounded-full bg-blue-500 mr-2"></div>
                            <span>Moving Average</span>
                          </div>
                          <div className="flex items-center text-green-500">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            <span>+28.4%</span>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '38%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                            <span>RSI Strategy</span>
                          </div>
                          <div className="flex items-center text-green-500">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            <span>+22.1%</span>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <div className="h-4 w-4 rounded-full bg-yellow-500 mr-2"></div>
                            <span>Bollinger Bands</span>
                          </div>
                          <div className="flex items-center text-green-500">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            <span>+16.8%</span>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <div className="h-4 w-4 rounded-full bg-purple-500 mr-2"></div>
                            <span>MACD Strategy</span>
                          </div>
                          <div className="flex items-center text-red-500">
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                            <span>-2.1%</span>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Metrics</CardTitle>
                    <CardDescription>Detailed risk analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Beta</span>
                        <span className="font-medium">0.85</span>
                      </div>
                      
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Alpha (annualized)</span>
                        <span className="font-medium">9.2%</span>
                      </div>
                      
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Standard Deviation</span>
                        <span className="font-medium">12.4%</span>
                      </div>
                      
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Max Drawdown</span>
                        <span className="font-medium">-5.8%</span>
                      </div>
                      
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Value at Risk (95%)</span>
                        <span className="font-medium">$8,625</span>
                      </div>
                      
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Information Ratio</span>
                        <span className="font-medium">1.75</span>
                      </div>
                      
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Tracking Error</span>
                        <span className="font-medium">4.2%</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Calmar Ratio</span>
                        <span className="font-medium">4.19</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="allocation" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Asset Allocation</CardTitle>
                    <CardDescription>Current distribution of your portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={assetAllocationData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {assetAllocationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Holdings</CardTitle>
                    <CardDescription>Largest positions in your portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold mr-2">A</div>
                            <span>AAPL</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-semibold">8.5%</span>
                            <ChevronDown className="h-4 w-4 ml-1 text-green-500" />
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '8.5%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-bold mr-2">M</div>
                            <span>MSFT</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-semibold">7.8%</span>
                            <ChevronDown className="h-4 w-4 ml-1 text-red-500" />
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '7.8%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center text-xs font-bold mr-2">G</div>
                            <span>GOOGL</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-semibold">6.4%</span>
                            <ChevronDown className="h-4 w-4 ml-1 text-green-500" />
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '6.4%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-red-100 text-red-800 flex items-center justify-center text-xs font-bold mr-2">T</div>
                            <span>TSLA</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-semibold">5.2%</span>
                            <ChevronDown className="h-4 w-4 ml-1 text-green-500" />
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '5.2%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold mr-2">N</div>
                            <span>NVDA</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-semibold">4.8%</span>
                            <ChevronDown className="h-4 w-4 ml-1 text-red-500" />
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '4.8%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                      Top 5 holdings represent 32.7% of portfolio
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Sector Exposure</CardTitle>
                    <CardDescription>Portfolio distribution by sector</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <div className="h-4 w-4 rounded-full bg-blue-500 mr-2"></div>
                              <span>Technology</span>
                            </div>
                            <span className="font-medium">35.2%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35.2%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                              <span>Financials</span>
                            </div>
                            <span className="font-medium">18.5%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '18.5%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <div className="h-4 w-4 rounded-full bg-yellow-500 mr-2"></div>
                              <span>Healthcare</span>
                            </div>
                            <span className="font-medium">14.3%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '14.3%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <div className="h-4 w-4 rounded-full bg-red-500 mr-2"></div>
                              <span>Consumer Discretionary</span>
                            </div>
                            <span className="font-medium">12.8%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '12.8%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <div className="h-4 w-4 rounded-full bg-purple-500 mr-2"></div>
                              <span>Communication Services</span>
                            </div>
                            <span className="font-medium">8.6%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '8.6%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <div className="h-4 w-4 rounded-full bg-indigo-500 mr-2"></div>
                              <span>Industrials</span>
                            </div>
                            <span className="font-medium">5.4%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '5.4%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <div className="h-4 w-4 rounded-full bg-pink-500 mr-2"></div>
                              <span>Energy</span>
                            </div>
                            <span className="font-medium">3.2%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-pink-500 h-2 rounded-full" style={{ width: '3.2%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <div className="h-4 w-4 rounded-full bg-gray-500 mr-2"></div>
                              <span>Other Sectors</span>
                            </div>
                            <span className="font-medium">2.0%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-gray-500 h-2 rounded-full" style={{ width: '2.0%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="transactions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest trading activity across all strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Date</th>
                          <th className="text-left py-3 px-4 font-medium">Symbol</th>
                          <th className="text-left py-3 px-4 font-medium">Type</th>
                          <th className="text-left py-3 px-4 font-medium">Quantity</th>
                          <th className="text-left py-3 px-4 font-medium">Price</th>
                          <th className="text-left py-3 px-4 font-medium">Total</th>
                          <th className="text-left py-3 px-4 font-medium">Strategy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">{transaction.date}</td>
                            <td className="py-3 px-4 font-medium">{transaction.symbol}</td>
                            <td className="py-3 px-4">
                              <Badge variant={transaction.type === "Buy" ? "default" : "destructive"}>
                                {transaction.type}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{transaction.quantity}</td>
                            <td className="py-3 px-4">{transaction.price}</td>
                            <td className="py-3 px-4">{transaction.total}</td>
                            <td className="py-3 px-4">{transaction.strategy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing 5 of 124 transactions
                  </div>
                  <Button variant="outline">View All Transactions</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            AlgoBlocks - Democratizing Algorithmic Trading
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 AlgoBlocks. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PerformanceReports;
