import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Award, 
  Cpu, 
  Wallet, 
  DollarSign,
  Sparkles 
} from "lucide-react";

// Sample portfolio value data
const portfolioData = [
  { date: "Jan", value: 25000 },
  { date: "Feb", value: 27500 },
  { date: "Mar", value: 26800 },
  { date: "Apr", value: 28900 },
  { date: "May", value: 29700 },
  { date: "Jun", value: 32100 },
  { date: "Jul", value: 31500 },
  { date: "Aug", value: 33800 },
  { date: "Sep", value: 35400 },
  { date: "Oct", value: 37200 },
  { date: "Nov", value: 36800 },
  { date: "Dec", value: 39500 },
];

// Sample market data
const marketData = [
  { name: "Jan", sp500: 3800, nasdaq: 13000, dow: 30900 },
  { name: "Feb", sp500: 3850, nasdaq: 13200, dow: 31100 },
  { name: "Mar", sp500: 3900, nasdaq: 13100, dow: 32000 },
  { name: "Apr", sp500: 4000, nasdaq: 13400, dow: 32200 },
  { name: "May", sp500: 4050, nasdaq: 13600, dow: 32500 },
  { name: "Jun", sp500: 4200, nasdaq: 14100, dow: 33000 },
  { name: "Jul", sp500: 4250, nasdaq: 14300, dow: 33500 },
  { name: "Aug", sp500: 4300, nasdaq: 14500, dow: 34000 },
  { name: "Sep", sp500: 4280, nasdaq: 14400, dow: 33800 },
  { name: "Oct", sp500: 4350, nasdaq: 14700, dow: 34200 },
  { name: "Nov", sp500: 4400, nasdaq: 15000, dow: 34500 },
  { name: "Dec", sp500: 4500, nasdaq: 15200, dow: 35000 },
];

// Sample win/loss data
const winLossData = [
  { name: "Winning Trades", value: 68 },
  { name: "Losing Trades", value: 32 },
];

// Helper component for market indices
function MarketIndexCard({ name, value, change, isPositive }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="text-sm font-medium">{name}</div>
      <div className="mt-2 text-sm font-semibold">{value}</div>
      <div className={`mt-1 flex items-center text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? (
          <TrendingUp className="mr-1 h-3 w-3" />
        ) : (
          <TrendingDown className="mr-1 h-3 w-3" />
        )}
        {change}
      </div>
    </div>
  );
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Trader</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your portfolio today
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>
            <Zap className="mr-2 h-4 w-4" />
            New Strategy
          </Button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Portfolio Value
                </p>
                <div className="flex items-end gap-2">
                  <p className="text-2xl font-bold">$39,500</p>
                  <div className="flex items-center text-sm text-green-500">
                    <ArrowUpRight className="h-4 w-4" />
                    12.5%
                  </div>
                </div>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Strategies
                </p>
                <div className="flex items-end gap-2">
                  <p className="text-2xl font-bold">7</p>
                  <div className="flex items-center text-sm text-green-500">
                    <ArrowUpRight className="h-4 w-4" />
                    2 new
                  </div>
                </div>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Cpu className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Win Rate
                </p>
                <div className="flex items-end gap-2">
                  <p className="text-2xl font-bold">68.5%</p>
                  <div className="flex items-center text-sm text-green-500">
                    <ArrowUpRight className="h-4 w-4" />
                    3.2%
                  </div>
                </div>
              </div>
              <div className="p-2 bg-green-500/10 rounded-full">
                <Award className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total P&L
                </p>
                <div className="flex items-end gap-2">
                  <p className="text-2xl font-bold">$12,430</p>
                  <div className="flex items-center text-sm text-red-500">
                    <ArrowDownRight className="h-4 w-4" />
                    2.1%
                  </div>
                </div>
              </div>
              <div className="p-2 bg-orange-500/10 rounded-full">
                <DollarSign className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Dashboard Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="trades">Trades</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Portfolio Chart */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Portfolio Value</CardTitle>
                  <CardDescription>
                    Your portfolio performance over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={portfolioData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis
                          tickFormatter={(value) => `$${value/1000}k`}
                          tick={{ fontSize: 12 }}
                        />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Tooltip
                          formatter={(value) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
                          contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          fillOpacity={1}
                          fill="url(#portfolioGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Win/Loss Ratio */}
              <Card>
                <CardHeader>
                  <CardTitle>Trade Performance</CardTitle>
                  <CardDescription>Win/loss ratio analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[220px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={winLossData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="hsl(var(--primary))" />
                          <Cell fill="hsl(var(--muted))" />
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, ""]}
                          contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                      <div className="text-sm">Winning (68%)</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-muted mr-2"></div>
                      <div className="text-sm">Losing (32%)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Market Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Market Overview</CardTitle>
                <CardDescription>Major indices performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={marketData}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                        formatter={(value) => [value.toLocaleString(), ""]}
                      />
                      <Line
                        type="monotone"
                        dataKey="sp500"
                        stroke="#8884d8"
                        activeDot={{ r: 6 }}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="nasdaq"
                        stroke="#82ca9d"
                        activeDot={{ r: 6 }}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="dow"
                        stroke="#ffc658"
                        activeDot={{ r: 6 }}
                        strokeWidth={2}
                      />
                      <Legend />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <MarketIndexCard
                    name="S&P 500"
                    value="4,500.21"
                    change="+1.2%"
                    isPositive={true}
                  />
                  <MarketIndexCard
                    name="NASDAQ"
                    value="15,234.56"
                    change="+0.9%"
                    isPositive={true}
                  />
                  <MarketIndexCard
                    name="DOW JONES"
                    value="35,023.89"
                    change="-0.3%"
                    isPositive={false}
                  />
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">AI Market Insight</h3>
                    <p className="text-muted-foreground">
                      Based on current market conditions and your portfolio, consider increasing allocation to technology sector. 
                      Recent earnings reports show strong growth potential in AI-related stocks, which aligns with your preferred 
                      momentum strategies.
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      View Recommendations
                    </Button>
                  </div>
      </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tabs would go here */}
          <TabsContent value="strategies">
            <Card>
              <CardHeader>
                <CardTitle>My Strategies</CardTitle>
                <CardDescription>Manage your trading algorithms</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Your strategies will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trades">
            <Card>
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
                <CardDescription>History of your latest transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Your trade history will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Dashboard;