import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Search, LineChart, BarChart3, CandlestickChart, Clock, Download, 
  RefreshCw, Filter, Zap, Calendar, ChevronDown, Sliders, Plus, ArrowUp, ArrowDown
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  ComposedChart,
  Line
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const MarketData = () => {
  const [activeSymbol, setActiveSymbol] = useState("AAPL");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeframe, setTimeframe] = useState("1D");
  const [isRealtime, setIsRealtime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState("default");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const wsRef = useRef<WebSocket | null>(null);
  
  // Mock data for charts
  const priceData = [
    { date: "Jan", AAPL: 150, MSFT: 210, GOOGL: 2100, volume: 1000 },
    { date: "Feb", AAPL: 155, MSFT: 220, GOOGL: 2150, volume: 1200 },
    { date: "Mar", AAPL: 160, MSFT: 215, GOOGL: 2200, volume: 900 },
    { date: "Apr", AAPL: 165, MSFT: 225, GOOGL: 2250, volume: 1100 },
    { date: "May", AAPL: 170, MSFT: 230, GOOGL: 2300, volume: 1300 },
    { date: "Jun", AAPL: 168, MSFT: 235, GOOGL: 2250, volume: 1400 },
    { date: "Jul", AAPL: 175, MSFT: 240, GOOGL: 2400, volume: 1200 },
    { date: "Aug", AAPL: 180, MSFT: 245, GOOGL: 2450, volume: 1500 },
    { date: "Sep", AAPL: 178, MSFT: 240, GOOGL: 2400, volume: 1600 },
    { date: "Oct", AAPL: 185, MSFT: 250, GOOGL: 2500, volume: 1400 },
    { date: "Nov", AAPL: 190, MSFT: 255, GOOGL: 2550, volume: 1700 },
    { date: "Dec", AAPL: 195, MSFT: 260, GOOGL: 2600, volume: 1800 },
  ];
  
  const candleData = [
    { date: "Jan", open: 145, high: 152, low: 143, close: 150 },
    { date: "Feb", open: 150, high: 158, low: 149, close: 155 },
    { date: "Mar", open: 155, high: 165, low: 154, close: 160 },
    { date: "Apr", open: 160, high: 168, low: 158, close: 165 },
    { date: "May", open: 165, high: 172, low: 164, close: 170 },
    { date: "Jun", open: 170, high: 172, low: 165, close: 168 },
    { date: "Jul", open: 168, high: 178, low: 167, close: 175 },
    { date: "Aug", open: 175, high: 184, low: 174, close: 180 },
    { date: "Sep", open: 180, high: 182, low: 175, close: 178 },
    { date: "Oct", open: 178, high: 187, low: 177, close: 185 },
    { date: "Nov", open: 185, high: 193, low: 184, close: 190 },
    { date: "Dec", open: 190, high: 198, low: 189, close: 195 },
  ];
  
  const popularSymbols = [
    { symbol: "AAPL", name: "Apple Inc.", price: 195.32, change: "+2.54%" },
    { symbol: "MSFT", name: "Microsoft Corporation", price: 260.41, change: "+1.87%" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 2612.50, change: "+3.12%" },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.75, change: "+1.65%" },
    { symbol: "TSLA", name: "Tesla, Inc.", price: 212.19, change: "-0.88%" },
    { symbol: "META", name: "Meta Platforms, Inc.", price: 335.24, change: "+2.11%" },
    { symbol: "NVDA", name: "NVIDIA Corporation", price: 124.36, change: "+4.33%" },
  ];

  const dataSources = [
    { id: "default", name: "Default (Simulated)" },
    { id: "alphavantage", name: "Alpha Vantage" },
    { id: "yahoofinance", name: "Yahoo Finance" },
    { id: "tradingview", name: "TradingView" },
    { id: "custom", name: "Custom API" }
  ];

  const timeframes = ["1D", "1W", "1M", "3M", "6M", "1Y", "5Y", "MAX"];

  // Filter symbols based on search query
  const filteredSymbols = popularSymbols.filter(item => 
    item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle WebSocket connection
  useEffect(() => {
    if (isRealtime) {
      // In a real implementation, you would connect to an actual WebSocket service
      // This is a mock implementation for demonstration
      wsRef.current = new WebSocket('wss://echo.websocket.org');
      
      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        toast({
          title: "Realtime data enabled",
          description: `Now streaming ${activeSymbol} market data in real-time`,
        });
      };
      
      wsRef.current.onmessage = (event) => {
        // In a real implementation, you would parse the message and update the state
        setLastUpdated(new Date());
      };
      
      // Simulate receiving data every 5 seconds
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 5000);
      
      return () => {
        clearInterval(interval);
        if (wsRef.current) {
          wsRef.current.close();
        }
      };
    }
  }, [isRealtime, activeSymbol]);

  // Handle fetching data
  const fetchMarketData = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
      toast({
        title: "Data refreshed",
        description: `${activeSymbol} market data has been updated`,
      });
    }, 1500);
  };

  // Handle downloading data
  const downloadData = () => {
    // In a real implementation, you would generate a CSV or JSON file
    toast({
      title: "Data export started",
      description: `Downloading ${activeSymbol} market data as CSV`,
    });
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleTimeString();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Market Data</h1>
        <p className="text-muted-foreground mt-1">Access and analyze historical and real-time market data</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar */}
        <div className="w-full md:w-72">
          <Card>
            <CardHeader>
              <CardTitle>Market Symbols</CardTitle>
              <CardDescription>Search and select market data</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search symbols..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-1">
                <p className="text-sm font-medium mb-2 px-2">Popular Symbols</p>
                {filteredSymbols.map((item) => (
                  <Button
                    key={item.symbol}
                    variant={item.symbol === activeSymbol ? "default" : "ghost"}
                    className="w-full justify-between text-sm"
                    onClick={() => setActiveSymbol(item.symbol)}
                  >
                    <div className="flex items-center">
                      <span className="font-medium">{item.symbol}</span>
                      <span className="text-xs text-muted-foreground ml-2">{item.name}</span>
                    </div>
                    <span className={item.change.startsWith('+') ? "text-green-500" : "text-red-500"}>
                      {item.change}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Select value={dataSource} onValueChange={setDataSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent>
                  {dataSources.map(source => (
                    <SelectItem key={source.id} value={source.id}>
                      {source.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Advanced Filters
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Advanced Data Filters</DialogTitle>
                    <DialogDescription>
                      Configure advanced filters for your market data
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Market Type</label>
                      <Select defaultValue="stocks">
                        <SelectTrigger>
                          <SelectValue placeholder="Select market type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stocks">Stocks</SelectItem>
                          <SelectItem value="forex">Forex</SelectItem>
                          <SelectItem value="crypto">Crypto</SelectItem>
                          <SelectItem value="commodities">Commodities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Adjustment</label>
                      <Select defaultValue="adjusted">
                        <SelectTrigger>
                          <SelectValue placeholder="Select adjustment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="adjusted">Adjusted Prices</SelectItem>
                          <SelectItem value="unadjusted">Unadjusted Prices</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Additional Data</label>
                      <div className="flex flex-col space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="form-checkbox" />
                          <span>Include After-Hours Data</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="form-checkbox" />
                          <span>Include Pre-Market Data</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="form-checkbox" />
                          <span>Include Technical Indicators</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Apply Filters</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <div>
            <h1 className="text-3xl font-bold tracking-tight">{activeSymbol}</h1>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-semibold mr-2">
                    {popularSymbols.find(s => s.symbol === activeSymbol)?.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })}
              </span>
                  <span className={`flex items-center ${
                    popularSymbols.find(s => s.symbol === activeSymbol)?.change.startsWith('+') 
                      ? "text-green-500" 
                      : "text-red-500"
                  }`}>
                    {popularSymbols.find(s => s.symbol === activeSymbol)?.change}
              </span>
              <span className="text-xs text-muted-foreground ml-2 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                    Last updated: {formatDate(lastUpdated)}
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-sm text-muted-foreground">
                    {popularSymbols.find(s => s.symbol === activeSymbol)?.name}
              </span>
                  {isRealtime && (
                    <Badge variant="outline" className="ml-2">
                      <Zap className="h-3 w-3 mr-1 text-amber-500" />
                      Live
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant={isRealtime ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setIsRealtime(!isRealtime)}
                >
                  <Zap className={`mr-2 h-4 w-4 ${isRealtime ? "text-amber-500" : ""}`} />
                  {isRealtime ? "Live" : "Enable Live Data"}
                </Button>
                <Button variant="outline" size="sm" onClick={fetchMarketData} disabled={isLoading}>
                  <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              {timeframes.map(tf => (
                <Button
                  key={tf}
                  variant={timeframe === tf ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </Button>
              ))}
            </div>
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Custom Range
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                  <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                  <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                  <DropdownMenuItem>Last 365 days</DropdownMenuItem>
                  <DropdownMenuItem>Custom range...</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" onClick={downloadData}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          {isLoading && <Progress value={45} className="mb-4" />}
          
          <Tabs defaultValue="price">
            <TabsList className="mb-4">
                <TabsTrigger value="price" className="flex items-center">
                  <LineChart className="mr-2 h-4 w-4" />
                  Price
                </TabsTrigger>
                <TabsTrigger value="volume" className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Volume
                </TabsTrigger>
                <TabsTrigger value="candles" className="flex items-center">
                  <CandlestickChart className="mr-2 h-4 w-4" />
                  Candles
                </TabsTrigger>
              <TabsTrigger value="combined" className="flex items-center">
                <BarChart3 className="mr-2 h-4 w-4" />
                Price & Volume
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center">
                <Sliders className="mr-2 h-4 w-4" />
                Analysis
              </TabsTrigger>
              </TabsList>
            
            <Card>
              <TabsContent value="price" className="m-0">
                <CardContent className="p-6">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={priceData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey={activeSymbol} 
                          stroke="#8884d8" 
                          fillOpacity={1} 
                          fill="url(#colorPrice)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="volume" className="m-0">
                <CardContent className="p-6">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={priceData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="volume" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="candles" className="m-0">
                <CardContent className="p-6">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={candleData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="high" fill="#22c55e" />
                        <Bar dataKey="low" fill="#ef4444" />
                        <Line type="monotone" dataKey="open" stroke="#3b82f6" />
                        <Line type="monotone" dataKey="close" stroke="#f97316" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="combined" className="m-0">
                <CardContent className="p-6">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={priceData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="volume" fill="#8884d8" yAxisId="right" />
                        <Line type="monotone" dataKey={activeSymbol} stroke="#ff7300" yAxisId="left" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="analysis" className="m-0">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Technical Analysis</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <ArrowUp className="h-4 w-4 text-green-500 mr-2" />
                          Bullish Indicators
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <ul className="space-y-1 text-sm">
                          <li className="flex justify-between">
                            <span>MACD</span>
                            <span className="text-green-500 font-medium">Buy</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Moving Average (20)</span>
                            <span className="text-green-500 font-medium">Buy</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Stochastic</span>
                            <span className="text-green-500 font-medium">Buy</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter className="py-3 text-xs text-muted-foreground">
                        7 of 15 indicators
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <ArrowDown className="h-4 w-4 text-red-500 mr-2" />
                          Bearish Indicators
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <ul className="space-y-1 text-sm">
                          <li className="flex justify-between">
                            <span>RSI (14)</span>
                            <span className="text-red-500 font-medium">Sell</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Bollinger Bands</span>
                            <span className="text-red-500 font-medium">Sell</span>
                          </li>
                          <li className="flex justify-between">
                            <span>CCI</span>
                            <span className="text-red-500 font-medium">Sell</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter className="py-3 text-xs text-muted-foreground">
                        3 of 15 indicators
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                            <div className="text-3xl font-bold text-green-500">BUY</div>
                            <div className="text-sm text-muted-foreground mt-1">Overall Signal</div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="py-3 text-xs text-center">
                        Based on {3 + 7} technical indicators
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div className="mt-6">
                    <div className="mb-3 flex justify-between items-center">
                      <h4 className="text-sm font-medium">Market Insights</h4>
                      <Badge variant="outline">AI Generated</Badge>
                    </div>
                    <Card className="bg-muted/40">
                      <CardContent className="p-4 text-sm">
                        <p className="mb-2">
                          <strong>Technical Outlook:</strong> {activeSymbol} is showing a bullish trend with price above the 20-day and 50-day moving averages. The RSI at 65 indicates strong momentum but is approaching overbought territory.
                        </p>
                        <p className="mb-2">
                          <strong>Key Levels:</strong> Support at ${(popularSymbols.find(s => s.symbol === activeSymbol)?.price || 0) * 0.95} and resistance at ${(popularSymbols.find(s => s.symbol === activeSymbol)?.price || 0) * 1.05}.
                        </p>
                        <p>
                          <strong>Signal Summary:</strong> 7 bullish indicators, 3 bearish indicators, and 2 neutral indicators. Overall bias is moderately bullish.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </TabsContent>
            </Card>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MarketData;
