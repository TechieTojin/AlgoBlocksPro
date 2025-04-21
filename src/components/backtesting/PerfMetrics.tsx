
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Percent, BarChart3 } from "lucide-react";

interface Metrics {
  totalReturn: string;
  annualizedReturn: string;
  maxDrawdown: string;
  sharpeRatio: string;
  sortino: string;
  winRate: string;
  profitFactor: string;
}

interface PerfMetricsProps {
  metrics: Metrics;
}

export function PerfMetrics({ metrics }: PerfMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full p-2 bg-primary/20">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Total Return</p>
              <p className="text-2xl font-bold">{metrics.totalReturn}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full p-2 bg-primary/20">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Annualized Return</p>
              <p className="text-2xl font-bold">{metrics.annualizedReturn}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full p-2 bg-algo-red-500/20">
              <TrendingDown className="h-4 w-4 text-algo-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Max Drawdown</p>
              <p className="text-2xl font-bold">{metrics.maxDrawdown}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full p-2 bg-algo-blue-500/20">
              <BarChart3 className="h-4 w-4 text-algo-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Sharpe Ratio</p>
              <p className="text-2xl font-bold">{metrics.sharpeRatio}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full p-2 bg-algo-blue-500/20">
              <BarChart3 className="h-4 w-4 text-algo-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Sortino Ratio</p>
              <p className="text-2xl font-bold">{metrics.sortino}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full p-2 bg-algo-green-500/20">
              <Percent className="h-4 w-4 text-algo-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">Win Rate</p>
              <p className="text-2xl font-bold">{metrics.winRate}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
