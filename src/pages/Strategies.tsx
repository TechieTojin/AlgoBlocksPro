import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PlusCircle, 
  Zap, 
  LineChart, 
  Eye, 
  Copy, 
  Trash2, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown,
  Check,
  Tag,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

const Strategies = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("lastModified");
  
  // Expanded strategies data with more realistic properties
  const allStrategies = [
    {
      id: 1,
      name: "Moving Average Crossover",
      description: "A strategy based on the crossover of fast and slow moving averages",
      performance: "+12.4%",
      lastModified: "3 days ago",
      modified: new Date(2024, 4, 2),
      status: "Active",
      trades: 48,
      winRate: 68.5,
      maxDrawdown: 5.2,
      tags: ["Technical", "Trend Following"]
    },
    {
      id: 2,
      name: "Relative Strength Index",
      description: "Uses RSI oscillator to identify overbought and oversold conditions",
      performance: "+8.7%",
      lastModified: "1 week ago",
      modified: new Date(2024, 3, 28),
      status: "Paused",
      trades: 32,
      winRate: 62.3,
      maxDrawdown: 4.8,
      tags: ["Technical", "Oscillator"]
    },
    {
      id: 3,
      name: "Bollinger Bands Breakout",
      description: "Identifies volatility breakouts using Bollinger Bands",
      performance: "+15.2%",
      lastModified: "2 weeks ago",
      modified: new Date(2024, 3, 20),
      status: "Backtesting",
      trades: 27,
      winRate: 71.4,
      maxDrawdown: 6.7,
      tags: ["Technical", "Volatility"]
    },
    {
      id: 4,
      name: "MACD Histogram",
      description: "Utilizes MACD histogram crossovers for entry and exit points",
      performance: "+5.9%",
      lastModified: "1 month ago",
      modified: new Date(2024, 3, 5),
      status: "Draft",
      trades: 18,
      winRate: 59.8,
      maxDrawdown: 3.9,
      tags: ["Technical", "Momentum"]
    },
    {
      id: 5,
      name: "Mean Reversion Strategy",
      description: "Trades price reversions to the mean with overbought/oversold indicators",
      performance: "+18.2%",
      lastModified: "5 days ago",
      modified: new Date(2024, 4, 1),
      status: "Active",
      trades: 56,
      winRate: 73.2,
      maxDrawdown: 7.5,
      tags: ["Mean Reversion", "Statistical"]
    },
    {
      id: 6,
      name: "Volume Profile Analysis",
      description: "Identifies support and resistance zones based on trading volume",
      performance: "-2.3%",
      lastModified: "2 days ago",
      modified: new Date(2024, 4, 3),
      status: "Paused",
      trades: 12,
      winRate: 41.7,
      maxDrawdown: 8.2,
      tags: ["Volume", "Price Action"]
    }
  ];
  
  // Apply filters and sorting
  const filteredStrategies = allStrategies
    .filter(strategy => 
      (statusFilter === "all" || strategy.status === statusFilter) &&
      (searchTerm === "" || 
        strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        strategy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        strategy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    )
    .sort((a, b) => {
      if (sortBy === "performance") {
        return parseFloat(b.performance) - parseFloat(a.performance);
      } else if (sortBy === "winRate") {
        return b.winRate - a.winRate;
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        // Default: sort by last modified (newest first)
        return b.modified.getTime() - a.modified.getTime();
      }
    });
  
  // Status badge styling
  const getStatusBadgeStyle = (status) => {
    switch(status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Backtesting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  // Performance style
  const getPerformanceStyle = (performance) => {
    const value = parseFloat(performance);
    return value >= 0 ? "text-green-500" : "text-red-500";
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('strategies.my_strategies')}</h1>
            <p className="text-muted-foreground mt-1">{t('strategies.manage_monitor')}</p>
          </div>
          <Button asChild>
            <Link to="/strategy-builder">
              <PlusCircle className="mr-2 h-4 w-4" />
              {t('strategies.create_strategy')}
            </Link>
          </Button>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t('strategies.search_strategies')} 
              className="pl-8" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select defaultValue="all" onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
                <SelectItem value="Backtesting">Backtesting</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="lastModified" onValueChange={setSortBy}>
              <SelectTrigger className="w-[130px]">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastModified">Latest</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="winRate">Win Rate</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStrategies.map((strategy) => (
            <Card key={strategy.id} className="transition-all hover:shadow-lg hover:border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="mr-2">{strategy.name}</CardTitle>
                  <div className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeStyle(strategy.status)}`}>
                    {strategy.status === "Active" && <Check className="inline h-3 w-3 mr-1" />}
                    {strategy.status}
                  </div>
                </div>
                <CardDescription>{strategy.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className={`text-2xl font-bold ${getPerformanceStyle(strategy.performance)}`}>
                      {strategy.performance}
                    </div>
                    <LineChart className={`ml-2 h-5 w-5 ${getPerformanceStyle(strategy.performance)}`} />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Trades</div>
                      <div className="font-medium">{strategy.trades}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Win Rate</div>
                      <div className="font-medium">{strategy.winRate}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Max DD</div>
                      <div className="font-medium">{strategy.maxDrawdown}%</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {strategy.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-3 border-t">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>Updated {strategy.lastModified}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View Strategy">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Run Strategy">
                    <Zap className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Clone Strategy">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10" title="Delete Strategy">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredStrategies.length === 0 && (
          <div className="p-12 text-center border rounded-lg">
            <div className="flex justify-center mb-4">
              <LineChart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No strategies found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" 
                ? "Try changing your search or filter criteria"
                : "Create your first trading strategy to get started"}
            </p>
            <Button asChild>
              <Link to="/strategy-builder">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Strategy
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Strategies;
