
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, LineChart, Line } from "recharts";
import { PerfMetrics } from "./PerfMetrics";

// Sample data - in a real app, this would come from the backtest engine
const samplePriceData = Array(100).fill(0).map((_, i) => {
  const base = 100 + 20 * Math.sin(i / 10) + i / 5;
  return {
    time: `2023-${String(Math.floor(i / 30) + 1).padStart(2, '0')}-${String((i % 30) + 1).padStart(2, '0')}`,
    price: base + Math.random() * 5 - 2.5,
    sma: base,
    signal: i % 25 === 0 ? (i % 50 === 0 ? 'buy' : 'sell') : null,
  };
});

const sampleReturnsData = Array(12).fill(0).map((_, i) => {
  return {
    month: `Month ${i + 1}`,
    returns: (Math.random() * 10 - 3).toFixed(2),
  };
});

const sampleMetrics = {
  totalReturn: "42.8%",
  annualizedReturn: "28.5%",
  maxDrawdown: "12.4%",
  sharpeRatio: "1.89",
  sortino: "2.34",
  winRate: "68%",
  profitFactor: "2.3",
};

export function BacktestResults() {
  const [timeframe, setTimeframe] = useState("1D");
  
  return (
    <Card className="h-full w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-2xl">Backtest Results</CardTitle>
          <CardDescription>
            Performance analysis of your strategy
          </CardDescription>
        </div>
        <div className="space-x-1">
          <Tabs value={timeframe} onValueChange={setTimeframe}>
            <TabsList>
              <TabsTrigger value="1H">1H</TabsTrigger>
              <TabsTrigger value="4H">4H</TabsTrigger>
              <TabsTrigger value="1D">1D</TabsTrigger>
              <TabsTrigger value="1W">1W</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="equity" className="h-full">
          <div className="border-b px-4">
            <TabsList className="w-full justify-start rounded-none border-b-0 px-0">
              <TabsTrigger value="equity">Equity Curve</TabsTrigger>
              <TabsTrigger value="trades">Trades</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="equity" className="h-[calc(100%-40px)] p-4 m-0">
            <div className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={samplePriceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(151, 127, 249)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="rgb(151, 127, 249)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} tickFormatter={(tick) => {
                    const date = new Date(tick);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }} />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{ fontSize: 10 }} />
                  <CartesianGrid strokeDasharray="3 3" className="grid-lines" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                    labelStyle={{ fontSize: 12 }}
                    formatter={(value: any) => [`$${parseFloat(value).toFixed(2)}`, "Equity"]}
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.toLocaleDateString()}`;
                    }}
                  />
                  <Area type="monotone" dataKey="price" stroke="rgb(151, 127, 249)" fillOpacity={1} fill="url(#colorEquity)" />
                  <Line type="monotone" dataKey="sma" stroke="rgba(51, 195, 240, 0.8)" dot={false} strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="trades" className="h-[calc(100%-40px)] p-4 m-0">
            <div className="font-mono text-xs grid grid-cols-5 gap-4 mb-4 font-medium">
              <div>Date</div>
              <div>Type</div>
              <div>Price</div>
              <div>Size</div>
              <div>P&L</div>
            </div>
            <div className="space-y-1">
              {samplePriceData.filter(d => d.signal).map((trade, i) => (
                <div key={i} className="font-mono text-xs grid grid-cols-5 gap-4 py-2 border-b">
                  <div>{new Date(trade.time).toLocaleDateString()}</div>
                  <div className={trade.signal === 'buy' ? 'text-algo-green-500' : 'text-algo-red-500'}>
                    {trade.signal?.toUpperCase()}
                  </div>
                  <div>${trade.price.toFixed(2)}</div>
                  <div>100 shares</div>
                  <div className={i % 3 === 0 ? 'text-algo-red-500' : 'text-algo-green-500'}>
                    {i % 3 === 0 ? '-' : '+'}${((Math.random() * 5) + 1).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="returns" className="h-[calc(100%-40px)] p-4 m-0">
            <div className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sampleReturnsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <CartesianGrid strokeDasharray="3 3" className="grid-lines" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                    formatter={(value: any) => [`${value}%`, "Monthly Return"]}
                  />
                  <Bar
                    dataKey="returns"
                    fill="currentColor"
                    className="text-primary"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="metrics" className="h-[calc(100%-40px)] p-4 m-0">
            <PerfMetrics metrics={sampleMetrics} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
