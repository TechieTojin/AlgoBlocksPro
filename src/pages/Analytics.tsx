import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter, PieChart, TrendingUp, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
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
  Cell
} from 'recharts';

const Analytics = () => {
  // Mock data for charts
  const portfolioData = [
    { name: "Stocks", value: 55 },
    { name: "Bonds", value: 20 },
    { name: "Cash", value: 15 },
    { name: "Crypto", value: 10 }
  ];
  
  const performanceData = [
    { month: "Jan", portfolio: 3.2, benchmark: 2.8 },
    { month: "Feb", portfolio: 2.5, benchmark: 1.9 },
    { month: "Mar", portfolio: -1.5, benchmark: -2.1 },
    { month: "Apr", portfolio: 2.8, benchmark: 2.2 },
    { month: "May", portfolio: 4.2, benchmark: 3.0 },
    { month: "Jun", portfolio: 1.8, benchmark: 1.5 },
    { month: "Jul", portfolio: 3.6, benchmark: 3.1 },
    { month: "Aug", portfolio: 2.1, benchmark: 1.8 },
    { month: "Sep", portfolio: -0.8, benchmark: -1.2 },
    { month: "Oct", portfolio: 2.9, benchmark: 2.4 },
    { month: "Nov", portfolio: 3.5, benchmark: 2.7 },
    { month: "Dec", portfolio: 4.1, benchmark: 3.3 },
  ];
  
  const sectorData = [
    { name: "Technology", value: 35 },
    { name: "Healthcare", value: 20 },
    { name: "Financials", value: 15 },
    { name: "Consumer", value: 12 },
    { name: "Energy", value: 8 },
    { name: "Others", value: 10 }
  ];
  
  const strategyData = [
    { name: "Moving Avg", returns: 18 },
    { name: "RSI", returns: 14 },
    { name: "MACD", returns: 22 },
    { name: "Bollinger", returns: 26 },
    { name: "Mean Rev", returns: 12 },
    { name: "Momentum", returns: 16 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#8dd1e1'];
  
  const formatPercent = (value) => `${value}%`;
  
  // Portfolio metrics
  const portfolioMetrics = [
    { name: "Total Return", value: "32.6%", change: "+5.2%", status: "positive" },
    { name: "Annualized Return", value: "18.4%", change: "+2.7%", status: "positive" },
    { name: "Alpha", value: "3.8%", change: "+0.5%", status: "positive" },
    { name: "Beta", value: "0.85", change: "-0.05", status: "positive" },
    { name: "Sharpe Ratio", value: "1.92", change: "+0.21", status: "positive" },
    { name: "Sortino Ratio", value: "2.14", change: "+0.18", status: "positive" },
    { name: "Max Drawdown", value: "-12.5%", change: "+2.1%", status: "negative" },
    { name: "Volatility", value: "14.2%", change: "-1.8%", status: "negative" },
  ];

  return (
    <div>
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Portfolio Analytics</h1>
            <p className="text-muted-foreground mt-1">Comprehensive analysis and insights for your investments</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>YTD</span>
            </Button>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              <span>Export</span>
            </Button>
          </div>
        </div>
        
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Key Metrics */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key indicators of your portfolio's performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {portfolioMetrics.map((metric) => (
                  <div key={metric.name} className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className={`text-xs flex items-center ${
                      (metric.status === "positive" && metric.name !== "Max Drawdown" && metric.name !== "Volatility") || 
                      ((metric.name === "Max Drawdown" || metric.name === "Volatility") && metric.status === "negative") 
                        ? "text-green-500" 
                        : "text-red-500"
                    }`}>
                      {metric.status === "positive" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {metric.change}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Asset Allocation */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Asset Allocation</CardTitle>
              <CardDescription>Distribution of your investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={formatPercent} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <Tabs defaultValue="performance">
          <TabsList>
            <TabsTrigger value="performance" className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="sectors" className="flex items-center">
              <PieChart className="mr-2 h-4 w-4" />
              Sector Breakdown
            </TabsTrigger>
            <TabsTrigger value="strategies" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              Strategy Performance
            </TabsTrigger>
          </TabsList>
          
          <Card className="mt-4">
            <TabsContent value="performance" className="m-0">
              <CardHeader className="pb-2">
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Portfolio performance compared to benchmark</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={formatPercent} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Return']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="portfolio" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        name="Portfolio"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="benchmark" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                        name="Benchmark"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="sectors" className="m-0">
              <CardHeader className="pb-2">
                <CardTitle>Sector Allocation</CardTitle>
                <CardDescription>Breakdown of investments by sector</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={sectorData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={formatPercent} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="strategies" className="m-0">
              <CardHeader className="pb-2">
                <CardTitle>Strategy Performance</CardTitle>
                <CardDescription>Annualized returns by trading strategy</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={strategyData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={formatPercent} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Annualized Return']} />
                      <Bar dataKey="returns" fill="#8884d8">
                        {strategyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
