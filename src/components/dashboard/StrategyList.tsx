
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Edit, BarChart3, Copy } from "lucide-react";

const sampleStrategies = [
  {
    id: 1,
    name: "SMA Crossover Strategy",
    description: "Uses 50 and 200 day moving average crossovers",
    performance: "+18.6%",
    status: "Active",
    lastRun: "2 hours ago",
  },
  {
    id: 2,
    name: "RSI Mean Reversion",
    description: "Buys oversold conditions, sells overbought",
    performance: "+12.3%",
    status: "Paused",
    lastRun: "3 days ago",
  },
  {
    id: 3,
    name: "Bollinger Band Breakout",
    description: "Trades breakouts from Bollinger Bands",
    performance: "+21.5%",
    status: "Testing",
    lastRun: "1 day ago",
  },
];

export function StrategyList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>My Strategies</CardTitle>
          <CardDescription>Your saved trading algorithms</CardDescription>
        </div>
        <Button size="sm">
          Create New
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sampleStrategies.map((strategy) => (
            <div key={strategy.id} className="flex items-start justify-between border-b pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{strategy.name}</h3>
                  <Badge
                    variant={
                      strategy.status === "Active"
                        ? "default"
                        : strategy.status === "Paused"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {strategy.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{strategy.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Performance: </span>
                    <span className="font-medium text-algo-green-500">{strategy.performance}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Last run: </span>
                    <span className="font-medium">{strategy.lastRun}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <Play className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <BarChart3 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
