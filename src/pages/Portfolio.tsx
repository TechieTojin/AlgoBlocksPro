import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { HeatMapChart } from "@/components/visualizations/HeatMapChart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from 'recharts';
import {
  RefreshCw,
  BarChart2,
  PieChart as PieChartIcon,
  TrendingUp,
  TrendingDown,
  Send,
  Download,
  PlusCircle,
  MinusCircle,
  Zap,
  Bot,
  UserCircle,
  LineChart as LineChartIcon,
  Bell,
  Wallet,
  Briefcase,
  Settings2,
  CircleUser,
} from 'lucide-react';

const Portfolio = () => {
  // State for portfolio data
  const [portfolioValue, setPortfolioValue] = useState(124568.92);
  const [portfolioChange, setPortfolioChange] = useState(3.42);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', message: 'Hello Tojin! How can I help you analyze your portfolio today?' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const chatEndRef = useRef(null);
  
  // Sample data for charts with improved visualization
  const portfolioHistory = [
    { date: 'Jan', value: 85000, prev: 82000 },
    { date: 'Feb', value: 82000, prev: 80000 },
    { date: 'Mar', value: 89000, prev: 83000 },
    { date: 'Apr', value: 94000, prev: 86000 },
    { date: 'May', value: 91000, prev: 88000 },
    { date: 'Jun', value: 97000, prev: 90000 },
    { date: 'Jul', value: 103000, prev: 95000 },
    { date: 'Aug', value: 108000, prev: 100000 },
    { date: 'Sep', value: 105000, prev: 102000 },
    { date: 'Oct', value: 112000, prev: 104000 },
    { date: 'Nov', value: 118000, prev: 108000 },
    { date: 'Dec', value: 124500, prev: 114000 },
  ];
  
  const assetAllocation = [
    { name: 'Stocks', value: 65 },
    { name: 'Bonds', value: 15 },
    { name: 'Crypto', value: 10 },
    { name: 'Cash', value: 5 },
    { name: 'Real Estate', value: 5 },
  ];
  
  const portfolioAssets = [
    { id: 1, name: 'Apple Inc.', symbol: 'AAPL', price: 173.25, shares: 50, value: 8662.50, change: 2.1, category: 'Stocks' },
    { id: 2, name: 'Microsoft Corp.', symbol: 'MSFT', price: 338.11, shares: 25, value: 8452.75, change: 1.4, category: 'Stocks' },
    { id: 3, name: 'Amazon.com Inc.', symbol: 'AMZN', price: 131.79, shares: 40, value: 5271.60, change: -0.5, category: 'Stocks' },
    { id: 4, name: 'Tesla Inc.', symbol: 'TSLA', price: 237.49, shares: 20, value: 4749.80, change: 3.7, category: 'Stocks' },
    { id: 5, name: 'Bitcoin', symbol: 'BTC', price: 43250.78, shares: 0.5, value: 21625.39, change: 5.2, category: 'Crypto' },
    { id: 6, name: 'Ethereum', symbol: 'ETH', price: 2285.36, shares: 4, value: 9141.44, change: 4.3, category: 'Crypto' },
    { id: 7, name: 'US Treasury Bond', symbol: 'UST10Y', price: 98.25, shares: 50, value: 4912.50, change: -0.2, category: 'Bonds' },
    { id: 8, name: 'Corporate Bond ETF', symbol: 'LQD', price: 108.32, shares: 100, value: 10832.00, change: -0.1, category: 'Bonds' },
  ];
  
  // Correlation data for heatmap
  const correlationData = [
    { x: 'AAPL', y: 'AAPL', value: 1.0 },
    { x: 'AAPL', y: 'MSFT', value: 0.72 },
    { x: 'AAPL', y: 'AMZN', value: 0.65 },
    { x: 'AAPL', y: 'TSLA', value: 0.48 },
    { x: 'AAPL', y: 'BTC', value: 0.25 },
    
    { x: 'MSFT', y: 'AAPL', value: 0.72 },
    { x: 'MSFT', y: 'MSFT', value: 1.0 },
    { x: 'MSFT', y: 'AMZN', value: 0.78 },
    { x: 'MSFT', y: 'TSLA', value: 0.42 },
    { x: 'MSFT', y: 'BTC', value: 0.22 },
    
    { x: 'AMZN', y: 'AAPL', value: 0.65 },
    { x: 'AMZN', y: 'MSFT', value: 0.78 },
    { x: 'AMZN', y: 'AMZN', value: 1.0 },
    { x: 'AMZN', y: 'TSLA', value: 0.51 },
    { x: 'AMZN', y: 'BTC', value: 0.28 },
    
    { x: 'TSLA', y: 'AAPL', value: 0.48 },
    { x: 'TSLA', y: 'MSFT', value: 0.42 },
    { x: 'TSLA', y: 'AMZN', value: 0.51 },
    { x: 'TSLA', y: 'TSLA', value: 1.0 },
    { x: 'TSLA', y: 'BTC', value: 0.38 },
    
    { x: 'BTC', y: 'AAPL', value: 0.25 },
    { x: 'BTC', y: 'MSFT', value: 0.22 },
    { x: 'BTC', y: 'AMZN', value: 0.28 },
    { x: 'BTC', y: 'TSLA', value: 0.38 },
    { x: 'BTC', y: 'BTC', value: 1.0 },
  ];
  
  // Monthly performance data
  const monthlyPerformance = [
    { month: 'Jan', portfolio: 3.2, benchmark: 2.8 },
    { month: 'Feb', portfolio: -1.5, benchmark: -2.1 },
    { month: 'Mar', portfolio: 5.7, benchmark: 4.2 },
    { month: 'Apr', portfolio: 2.3, benchmark: 1.8 },
    { month: 'May', portfolio: -2.1, benchmark: -2.5 },
    { month: 'Jun', portfolio: 4.2, benchmark: 3.1 },
    { month: 'Jul', portfolio: 1.9, benchmark: 1.5 },
    { month: 'Aug', portfolio: 3.5, benchmark: 2.9 },
    { month: 'Sep', portfolio: -0.8, benchmark: -1.2 },
    { month: 'Oct', portfolio: 6.2, benchmark: 5.1 },
    { month: 'Nov', portfolio: 4.8, benchmark: 3.7 },
    { month: 'Dec', portfolio: 3.1, benchmark: 2.5 },
  ];
  
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];
  
  // Simulate refreshing data
  const refreshData = () => {
    setIsRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      // Update with slightly changed values
      setPortfolioValue(prev => +(prev * (1 + (Math.random() * 0.01 - 0.005))).toFixed(2));
      setPortfolioChange(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(2));
      setIsRefreshing(false);
    }, 1000);
  };
  
  // Handle sending a chat message
  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', message: currentMessage }]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your portfolio allocation, I'd recommend rebalancing to increase your bond exposure for better stability.",
        "Your tech exposure is quite high. Consider diversifying into other sectors to reduce concentration risk.",
        "Your portfolio has shown strong performance in the past quarter, Tojin. The tech stocks are driving most of your gains.",
        "I notice your cryptocurrency holdings have increased in value. Consider taking some profits if they exceed your target allocation.",
        "Market volatility is expected to increase next month. Your portfolio is well-positioned with your current cash reserves."
      ];
      
      const aiResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { sender: 'ai', message: aiResponse }]);
    }, 1000);
    
    // Clear input
    setCurrentMessage('');
  };
  
  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  
  // Set up regular data refresh (simulating real-time)
  useEffect(() => {
    const intervalId = setInterval(refreshData, 60000); // Refresh every minute
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header with user info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
            <AvatarFallback>TS</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Tojin's Portfolio</h1>
            <p className="text-muted-foreground">tojin@gmail.com</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refreshData} disabled={isRefreshing}>
            {isRefreshing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            <span className="ml-2">Refresh</span>
          </Button>
          
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Bell className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Settings2 className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Portfolio summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${portfolioValue.toLocaleString()}</div>
            <div className={`text-sm flex items-center mt-1 ${portfolioChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {portfolioChange >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {portfolioChange >= 0 ? '+' : ''}{portfolioChange}% past month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Annualized Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">11.8%</div>
            <div className="text-sm flex items-center mt-1 text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              +2.3% vs S&P 500
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$8,450.21</div>
            <div className="text-sm flex items-center mt-1 text-muted-foreground">
              <Wallet className="h-4 w-4 mr-1" />
              Available cash
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <div className="text-sm flex items-center mt-1 text-muted-foreground">
              <Briefcase className="h-4 w-4 mr-1" />
              Across 4 categories
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio and charts section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs for different views */}
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio History</CardTitle>
                  <CardDescription>12-month portfolio value</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={portfolioHistory}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                        <Area type="monotone" dataKey="prev" stroke="#82ca9d" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Asset Allocation</CardTitle>
                    <CardDescription>Distribution by asset class</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={assetAllocation}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {assetAllocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Holdings</CardTitle>
                    <CardDescription>Your largest investments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Asset</TableHead>
                          <TableHead className="text-right">Value</TableHead>
                          <TableHead className="text-right">Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {portfolioAssets.slice(0, 5).map((asset) => (
                          <TableRow key={asset.id}>
                            <TableCell className="font-medium">{asset.symbol}</TableCell>
                            <TableCell className="text-right">${asset.value.toLocaleString()}</TableCell>
                            <TableCell className={`text-right ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {asset.change >= 0 ? '+' : ''}{asset.change}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Comparison</CardTitle>
                  <CardDescription>Portfolio vs benchmark returns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyPerformance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Return']} />
                        <Legend />
                        <Bar dataKey="portfolio" name="Portfolio" fill="#8884d8" />
                        <Bar dataKey="benchmark" name="S&P 500" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Metrics</CardTitle>
                    <CardDescription>Performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Alpha</span>
                        <span className="text-sm font-bold">1.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Beta</span>
                        <span className="text-sm font-bold">0.85</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Sharpe Ratio</span>
                        <span className="text-sm font-bold">1.63</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Max Drawdown</span>
                        <span className="text-sm font-bold">-8.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Volatility</span>
                        <span className="text-sm font-bold">9.4%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Sortino Ratio</span>
                        <span className="text-sm font-bold">1.85</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Growth of $10,000</CardTitle>
                    <CardDescription>5-year performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                          data={[
                            { year: '2019', portfolio: 10000, benchmark: 10000 },
                            { year: '2020', portfolio: 11500, benchmark: 11200 },
                            { year: '2021', portfolio: 14300, benchmark: 13400 },
                            { year: '2022', portfolio: 13800, benchmark: 12100 },
                            { year: '2023', portfolio: 16100, benchmark: 14300 },
                            { year: '2024', portfolio: 18700, benchmark: 16200 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                          <XAxis dataKey="year" />
                          <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
                          <Legend />
                          <Line type="monotone" dataKey="portfolio" name="Your Portfolio" stroke="#8884d8" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="benchmark" name="S&P 500" stroke="#82ca9d" strokeDasharray="3 3" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Analysis Tab */}
            <TabsContent value="analysis" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Correlation</CardTitle>
                  <CardDescription>Relationship between your investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <HeatMapChart 
                      data={correlationData} 
                      title="Asset Correlation"
                      description="Correlation between portfolio assets"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Analysis</CardTitle>
                    <CardDescription>Portfolio risk indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Low Risk', value: 30 },
                              { name: 'Medium Risk', value: 45 },
                              { name: 'High Risk', value: 25 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            <Cell fill="#82ca9d" />
                            <Cell fill="#ffc658" />
                            <Cell fill="#ff8042" />
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Sector Exposure</CardTitle>
                    <CardDescription>Distribution by industry</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={[
                            { name: 'Technology', value: 42 },
                            { name: 'Financial', value: 18 },
                            { name: 'Consumer Goods', value: 15 },
                            { name: 'Healthcare', value: 12 },
                            { name: 'Energy', value: 8 },
                            { name: 'Other', value: 5 },
                          ]}
                          margin={{ left: 70 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                          <YAxis type="category" dataKey="name" width={70} />
                          <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Complete holdings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Complete Holdings</CardTitle>
                <CardDescription>All assets in your portfolio</CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="stocks">Stocks</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="bonds">Bonds</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                </SelectContent>
              </Select>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Holdings</TableHead>
                        <TableHead className="text-right">Value</TableHead>
                        <TableHead className="text-right">Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {portfolioAssets.map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                          </TableCell>
                      <TableCell>${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                      <TableCell>{asset.shares} {asset.category === 'Crypto' ? 'units' : 'shares'}</TableCell>
                          <TableCell className="text-right">${asset.value.toLocaleString()}</TableCell>
                          <TableCell className={`text-right ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {asset.change >= 0 ? '+' : ''}{asset.change}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  </CardContent>
                </Card>
                      </div>
                      
        {/* AI Chat Assistant section */}
        <div className="space-y-4">
          <Card className="flex flex-col h-[calc(100vh-12rem)]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                Portfolio AI Assistant
              </CardTitle>
              <CardDescription>Ask questions about your portfolio</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
              <ScrollArea className="h-[calc(100%-70px)] pr-4">
                  <div className="space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <Avatar className="h-8 w-8">
                            {msg.sender === 'ai' ? (
                            <AvatarImage src="/ai-avatar.png" />
                          ) : (
                            <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
                          )}
                          <AvatarFallback>{msg.sender === 'ai' ? 'AI' : 'TS'}</AvatarFallback>
                              </Avatar>
                        <div className={`rounded-lg px-3 py-2 ${
                              msg.sender === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                        }`}>
                          {msg.message}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <form 
                className="flex w-full items-center space-x-2" 
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                    <Input 
                  type="text"
                      placeholder="Ask about your portfolio..." 
                      value={currentMessage}
                  onChange={e => setCurrentMessage(e.target.value)}
                  className="flex-1"
                    />
                <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
              </form>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Suggested Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => {
                    setCurrentMessage("What are my most profitable assets?");
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  What are my most profitable assets?
                    </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => {
                    setCurrentMessage("How can I reduce portfolio risk?");
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                >
                  <MinusCircle className="h-4 w-4 mr-2" />
                  How can I reduce portfolio risk?
                    </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => {
                    setCurrentMessage("What should I invest in next?");
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  What should I invest in next?
                    </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio; 