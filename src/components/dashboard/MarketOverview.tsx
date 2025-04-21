
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

// Sample market data - in a real app, this would come from an API
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

export function MarketOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
        <CardDescription>Major indices performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="grid-lines" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
                formatter={(value: any) => [value.toLocaleString(), ""]}
              />
              <Line type="monotone" dataKey="sp500" stroke="rgba(151, 127, 249, 0.8)" activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="nasdaq" stroke="rgba(51, 195, 240, 0.8)" activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="dow" stroke="rgba(16, 185, 129, 0.8)" activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4">
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
  );
}

interface MarketIndexCardProps {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}

function MarketIndexCard({ name, value, change, isPositive }: MarketIndexCardProps) {
  return (
    <div className="rounded-lg border p-3">
      <div className="text-sm font-medium">{name}</div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
      <div className={`mt-1 flex items-center text-sm ${isPositive ? 'text-algo-green-500' : 'text-algo-red-500'}`}>
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
