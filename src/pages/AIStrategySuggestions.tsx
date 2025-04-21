import React, { useState, useEffect, ErrorInfo } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, 
  TrendingUp, 
  Zap, 
  ChevronRight, 
  Clock, 
  Check, 
  Calendar, 
  Brain, 
  RefreshCw, 
  Star, 
  Bookmark,
  ArrowRight,
  LineChart,
  BarChart2,
  Share2,
  ExternalLink,
  Download,
  Copy,
  Lightbulb,
  AlertTriangle
} from "lucide-react";
import { HeatMapChart } from "@/components/visualizations/HeatMapChart";

// Error boundary component to catch rendering errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode }, 
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error in component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Interface for AI strategy suggestion
interface StrategySuggestion {
  id: string;
  title: string;
  description: string;
  tags: string[];
  expectedReturn: number;
  riskLevel: "Low" | "Medium" | "High";
  timeFrame: string;
  confidence: number;
  instruments: string[];
  type: string;
  matchScore: number;
  createdAt: string;
  indicators: { name: string; value: string }[];
  performanceMetrics: { name: string; value: number }[];
}

// Interface for portfolio metrics
interface PortfolioMetric {
  name: string;
  value: number | string;
  change?: number;
  changeType?: "positive" | "negative" | "neutral";
}

const AIStrategySuggestions = () => {
  const [activeTab, setActiveTab] = useState("personalized");
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [heatMapData, setHeatMapData] = useState<any[]>([]);
  const [heatMapError, setHeatMapError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Generate random data for heat map
  const generateHeatMapData = () => {
    try {
      const data = [];
      const instruments = ["AAPL", "MSFT", "GOOGL", "AMZN", "META"];
      const timeframes = ["1H", "4H", "1D", "1W", "1M"];
      
      for (const instrument of instruments) {
        for (const timeframe of timeframes) {
          data.push({
            x: instrument,
            y: timeframe,
            value: Math.random() * 100
          });
        }
      }
      return data;
    } catch (error) {
      console.error("Error generating heat map data:", error);
      setHeatMapError(true);
      return [];
    }
  };

  // Initialize heat map data and simulate loading
  useEffect(() => {
    try {
      setHeatMapData(generateHeatMapData());
      
      // Simulate loading time
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error in useEffect for heat map:", error);
      setHeatMapError(true);
      setLoading(false);
    }
  }, []);
  
  // Sample strategy suggestions
  const strategySuggestions: StrategySuggestion[] = [
    {
      id: "strat-001",
      title: "Momentum Breakout Strategy",
      description: "A momentum-based strategy that identifies breakout patterns above key resistance levels with volume confirmation.",
      tags: ["Momentum", "Breakout", "Volume"],
      expectedReturn: 18.5,
      riskLevel: "Medium",
      timeFrame: "Daily",
      confidence: 87,
      instruments: ["AAPL", "MSFT", "GOOGL"],
      type: "Trend Following",
      matchScore: 92,
      createdAt: "2024-05-01",
      indicators: [
        { name: "RSI", value: "> 60" },
        { name: "Moving Average", value: "20/50 Crossover" },
        { name: "Volume", value: "Above 20D Avg" }
      ],
      performanceMetrics: [
        { name: "Win Rate", value: 68 },
        { name: "Profit Factor", value: 2.3 },
        { name: "Max Drawdown", value: 12 }
      ]
    },
    {
      id: "strat-002",
      title: "Mean Reversion with Volatility Filter",
      description: "Captures price reversions to the mean during extreme oversold conditions with volatility-based position sizing.",
      tags: ["Mean Reversion", "Volatility", "Oversold"],
      expectedReturn: 15.2,
      riskLevel: "Medium",
      timeFrame: "4-Hour",
      confidence: 82,
      instruments: ["AMZN", "NFLX", "META"],
      type: "Counter-Trend",
      matchScore: 88,
      createdAt: "2024-05-02",
      indicators: [
        { name: "Bollinger Bands", value: "Below Lower Band" },
        { name: "RSI", value: "< 30" },
        { name: "ATR", value: "Position Sizing" }
      ],
      performanceMetrics: [
        { name: "Win Rate", value: 72 },
        { name: "Profit Factor", value: 1.9 },
        { name: "Max Drawdown", value: 9 }
      ]
    },
    {
      id: "strat-003",
      title: "Multi-Timeframe Trend Strategy",
      description: "Aligns trade direction with the higher timeframe trend while timing entries with lower timeframe momentum signals.",
      tags: ["Multi-Timeframe", "Trend", "Momentum"],
      expectedReturn: 22.1,
      riskLevel: "High",
      timeFrame: "Multi",
      confidence: 79,
      instruments: ["TSLA", "NVDA", "AMD"],
      type: "Trend Following",
      matchScore: 85,
      createdAt: "2024-05-03",
      indicators: [
        { name: "MACD", value: "Signal Line Crossover" },
        { name: "ADX", value: "> 25" },
        { name: "Fibonacci", value: "Retracement Levels" }
      ],
      performanceMetrics: [
        { name: "Win Rate", value: 59 },
        { name: "Profit Factor", value: 2.7 },
        { name: "Max Drawdown", value: 18 }
      ]
    }
  ];
  
  // Sample portfolio metrics
  const portfolioMetrics: PortfolioMetric[] = [
    { name: "Active Strategies", value: 5, change: 1, changeType: "positive" },
    { name: "Win Rate", value: "62%", change: 4, changeType: "positive" },
    { name: "Avg. Return", value: "16.8%", change: 2.3, changeType: "positive" },
    { name: "Risk Score", value: "Medium", changeType: "neutral" }
  ];

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      try {
        setHeatMapData(generateHeatMapData());
        setHeatMapError(false);
      } catch (error) {
        console.error("Error refreshing heat map data:", error);
        setHeatMapError(true);
      }
      setRefreshing(false);
    }, 1500);
  };

  // Render strategy card
  const renderStrategyCard = (strategy: StrategySuggestion) => (
    <Card key={strategy.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl">{strategy.title}</CardTitle>
            <div className="flex flex-wrap gap-1">
              {strategy.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <Badge className="bg-primary/10 text-primary whitespace-nowrap">
            {strategy.matchScore}% Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <p className="text-muted-foreground text-sm mb-4">
          {strategy.description}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Expected Return</p>
            <p className="font-medium text-green-500">{strategy.expectedReturn}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Risk Level</p>
            <p className="font-medium">{strategy.riskLevel}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Time Frame</p>
            <p className="font-medium">{strategy.timeFrame}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">AI Confidence</p>
            <div className="flex items-center gap-1">
              <Progress value={strategy.confidence} className="h-2 w-16" />
              <span className="text-sm font-medium">{strategy.confidence}%</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-3" />
        
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Key Indicators</h4>
            <ul className="space-y-1">
              {strategy.indicators.map((indicator, i) => (
                <li key={i} className="text-xs flex items-start gap-1">
                  <ChevronRight className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                  <span className="font-medium">{indicator.name}:</span> {indicator.value}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Performance</h4>
            <ul className="space-y-1">
              {strategy.performanceMetrics.map((metric, i) => (
                <li key={i} className="text-xs flex items-start gap-1">
                  <ChevronRight className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                  <span className="font-medium">{metric.name}:</span> {metric.value}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-3">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          Generated on {strategy.createdAt}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button size="sm">
            <Zap className="h-4 w-4 mr-1" />
            Apply
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  // Fallback component for heatmap errors
  const HeatMapFallback = () => (
    <div className="bg-muted rounded-lg p-6 flex flex-col items-center justify-center h-[280px]">
      <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
      <h3 className="text-sm font-medium mb-1">Unable to display opportunity map</h3>
      <p className="text-xs text-muted-foreground text-center max-w-xs mb-4">
        There was an issue loading the opportunity map visualization
      </p>
      <Button variant="outline" size="sm" onClick={() => {
        try {
          setHeatMapData(generateHeatMapData());
          setHeatMapError(false);
        } catch (error) {
          console.error("Error regenerating heat map:", error);
        }
      }}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Retry
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <div className="mb-4">
            <Sparkles className="h-10 w-10 text-primary animate-pulse" />
          </div>
          <h3 className="text-lg font-medium mb-2">Loading AI Strategy Suggestions...</h3>
          <p className="text-sm text-muted-foreground">Analyzing your portfolio and market data</p>
        </div>
      ) : (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">AI Strategy Suggestions</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              Personalized trading strategies tailored to your trading style and market conditions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Switch
                id="auto-refresh"
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
              />
              <Label htmlFor="auto-refresh" className="text-sm">Auto-refresh</Label>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Portfolio Insights */}
        <Card className="mb-8 bg-muted/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Portfolio Insights
            </CardTitle>
            <CardDescription>
              Generated trading insights based on your portfolio performance and market conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {portfolioMetrics.map((metric, i) => (
                    <div key={i} className="bg-background rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">{metric.name}</p>
                      <div className="flex items-end gap-2">
                        <p className="text-2xl font-semibold">{metric.value}</p>
                        {metric.change !== undefined && (
                          <div className={`text-xs flex items-center ${
                            metric.changeType === 'positive' ? 'text-green-500' : 
                            metric.changeType === 'negative' ? 'text-red-500' : ''
                          }`}>
                            {metric.changeType === 'positive' && '+'}
                            {metric.change}%
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-background rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3">AI Recommendations</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Consider diversifying into momentum strategies to complement your current mean-reversion approach</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Your win rate has increased, but reward-to-risk ratio has decreased. Consider adjusting take profit levels</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>Technology sector exposure is high (68%). Consider adding strategies in other sectors</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-3">AI Strategy Opportunity Map</h3>
                <ErrorBoundary fallback={<HeatMapFallback />}>
                  {heatMapError ? <HeatMapFallback /> : (
                    <HeatMapChart 
                      data={heatMapData} 
                      height={280}
                      title="Strategy Opportunity Heat Map"
                      description="AI-detected opportunities across instruments and timeframes"
                      xAxisLabel="Instruments"
                      yAxisLabel="Timeframes"
                      tooltipFormatter={(value) => `Opportunity Score: ${value.toFixed(1)}`}
                      colorRange={['#f3f4f6', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8']}
                    />
                  )}
                </ErrorBoundary>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Strategy Suggestions */}
        <Tabs defaultValue="personalized" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="personalized" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              Personalized
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              New
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personalized" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategySuggestions.map(strategy => renderStrategyCard(strategy))}
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12">
              <TrendingUp className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Trending Strategies</h3>
              <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
                See what strategies are popular among traders with similar profiles
              </p>
              <Button>
                <Zap className="h-4 w-4 mr-2" />
                Unlock Premium Feature
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12">
              <Clock className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Recent AI Strategies</h3>
              <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
                Discover the latest AI-generated strategies based on current market conditions
              </p>
              <Button>
                <Zap className="h-4 w-4 mr-2" />
                Unlock Premium Feature
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* AI Learning Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Improve Your AI Suggestions
            </CardTitle>
            <CardDescription>
              The more data you provide, the better your AI strategy suggestions will be
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-start gap-3 p-4 border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Share2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Connect Brokers</h3>
                <p className="text-sm text-muted-foreground">
                  Connect your trading accounts to analyze your past trades and generate more accurate suggestions.
                </p>
                <Button variant="outline" size="sm" className="mt-auto gap-1">
                  Connect Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-col items-start gap-3 p-4 border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Set Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  Define your risk tolerance, preferred markets, and trading style to receive more targeted suggestions.
                </p>
                <Button variant="outline" size="sm" className="mt-auto gap-1">
                  Update Preferences
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-col items-start gap-3 p-4 border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <LineChart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Rate Suggestions</h3>
                <p className="text-sm text-muted-foreground">
                  Provide feedback on AI suggestions to help the system learn your preferences over time.
                </p>
                <Button variant="outline" size="sm" className="mt-auto gap-1">
                  Start Rating
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      )}
    </div>
  );
};

export default AIStrategySuggestions; 