import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Shield, 
  Percent, 
  BarChart3, 
  PieChart, 
  TrendingDown, 
  DollarSign, 
  Zap, 
  RefreshCw,
  Info,
  Wallet,
  Calculator,
  Check,
  X
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPane,
  Pie,
  Cell,
  ReferenceLine
} from 'recharts';
import { useTranslation } from "react-i18next";

const RiskManagement = () => {
  const { t } = useTranslation();
  const [calculatingVaR, setCalculatingVaR] = useState(false);
  const [maxRiskPerTrade, setMaxRiskPerTrade] = useState(2);
  const [accountValue, setAccountValue] = useState(10000);
  const [maxDrawdown, setMaxDrawdown] = useState(15);
  
  // Sample data for charts
  const riskAllocationData = [
    { name: t('stocks'), value: 45 },
    { name: t('crypto'), value: 15 },
    { name: t('forex'), value: 20 },
    { name: t('commodities'), value: 10 },
    { name: t('bonds'), value: 10 }
  ];
  
  const historicalDrawdownData = [
    { date: "Jan", drawdown: -2.5 },
    { date: "Feb", drawdown: -5.8 },
    { date: "Mar", drawdown: -12.4 },
    { date: "Apr", drawdown: -8.9 },
    { date: "May", drawdown: -3.2 },
    { date: "Jun", drawdown: -7.5 },
    { date: "Jul", drawdown: -15.3 },
    { date: "Aug", drawdown: -9.1 },
    { date: "Sep", drawdown: -4.7 },
    { date: "Oct", drawdown: -6.8 },
    { date: "Nov", drawdown: -3.9 },
    { date: "Dec", drawdown: -1.8 }
  ];
  
  const strategiesRiskData = [
    { strategy: "Moving Average Crossover", sharpe: 1.83, maxDD: 12.4, winRate: 65, riskScore: 6.5 },
    { strategy: "RSI Strategy", sharpe: 1.45, maxDD: 18.7, winRate: 58, riskScore: 7.8 },
    { strategy: "Bollinger Bands", sharpe: 2.12, maxDD: 9.8, winRate: 72, riskScore: 5.2 },
    { strategy: "MACD Strategy", sharpe: 1.67, maxDD: 15.3, winRate: 61, riskScore: 6.9 },
    { strategy: "Mean Reversion", sharpe: 2.31, maxDD: 8.5, winRate: 76, riskScore: 4.6 }
  ];
  
  const varResults = [
    { confidence: "95%", value: -1.64, dollarValue: 820 },
    { confidence: "99%", value: -2.33, dollarValue: 1165 },
    { confidence: "99.9%", value: -3.09, dollarValue: 1545 }
  ];

  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];
  
  const calculateVaR = () => {
    setCalculatingVaR(true);
    setTimeout(() => {
      setCalculatingVaR(false);
    }, 1500);
  };
  
  const positionSizeCalculator = (risk, account, stop) => {
    const riskAmount = (account * risk) / 100;
    const positionSize = parseFloat((riskAmount / stop).toFixed(2));
    return positionSize;
  };
  
  const [stopLossPercent, setStopLossPercent] = useState(2);
  const [entryPrice, setEntryPrice] = useState(100);
  
  const calculateStopLossPrice = () => {
    return (entryPrice * (1 - stopLossPercent / 100)).toFixed(2);
  };
  
  const calculatePositionSize = () => {
    const stopLossAmount = entryPrice * (stopLossPercent / 100);
    return positionSizeCalculator(maxRiskPerTrade, accountValue, stopLossAmount);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{t('risk_management')}</h1>
        <p className="text-muted-foreground mt-1">{t('risk_management_description')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Percent className="h-5 w-5 mr-2 text-yellow-500" />
              {t('max_risk_per_trade')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">{maxRiskPerTrade}%</span>
                <span className="text-sm text-muted-foreground">
                  ${(accountValue * maxRiskPerTrade / 100).toFixed(2)}
                </span>
              </div>
              <Slider 
                value={[maxRiskPerTrade]}
                min={0.5}
                max={5}
                step={0.5}
                onValueChange={(val) => setMaxRiskPerTrade(val[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{t('conservative')}</span>
                <span>{t('moderate')}</span>
                <span>{t('aggressive')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Wallet className="h-5 w-5 mr-2 text-blue-500" />
              {t('account_value')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <DollarSign className="h-6 w-6 text-muted-foreground" />
                <Input 
                  type="number" 
                  min={1000}
                  value={accountValue} 
                  onChange={(e) => setAccountValue(parseFloat(e.target.value))}
                  className="text-2xl font-bold border-0 px-1 focus-visible:ring-0" 
                />
              </div>
              <div className="flex text-sm gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setAccountValue(10000)}
                  className="flex-1"
                >
                  $10K
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setAccountValue(25000)}
                  className="flex-1"
                >
                  $25K
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setAccountValue(50000)}
                  className="flex-1"
                >
                  $50K
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setAccountValue(100000)}
                  className="flex-1"
                >
                  $100K
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
              {t('max_drawdown_limit')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">{maxDrawdown}%</span>
                <span className="text-sm text-muted-foreground">
                  ${(accountValue * maxDrawdown / 100).toFixed(2)}
                </span>
              </div>
              <Slider 
                value={[maxDrawdown]}
                min={5}
                max={30}
                step={1}
                onValueChange={(val) => setMaxDrawdown(val[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{t('conservative')}</span>
                <span>{t('moderate')}</span>
                <span>{t('aggressive')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="position-sizing">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="position-sizing">
            <Calculator className="h-4 w-4 mr-2" />
            {t('position_sizing')}
          </TabsTrigger>
          <TabsTrigger value="risk-allocation">
            <PieChart className="h-4 w-4 mr-2" />
            {t('risk_allocation')}
          </TabsTrigger>
          <TabsTrigger value="drawdown-analysis">
            <TrendingDown className="h-4 w-4 mr-2" />
            {t('drawdown_analysis')}
          </TabsTrigger>
          <TabsTrigger value="var-calculator">
            <AlertTriangle className="h-4 w-4 mr-2" />
            {t('var_calculator')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="position-sizing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('position_size_calculator')}</CardTitle>
                <CardDescription>
                  {t('position_size_calculator_description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="entry-price">{t('entry_price')}</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="entry-price"
                        type="number"
                        min={0.01}
                        step={0.01} 
                        value={entryPrice}
                        onChange={(e) => setEntryPrice(parseFloat(e.target.value))}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="stop-loss">{t('stop_loss')} (%)</Label>
                      <span className="text-sm text-muted-foreground">
                        {t('price')}: ${calculateStopLossPrice()}
                      </span>
                    </div>
                    <Slider 
                      id="stop-loss"
                      value={[stopLossPercent]}
                      min={0.5}
                      max={10}
                      step={0.5}
                      onValueChange={(val) => setStopLossPercent(val[0])}
                    />
                    <div className="text-sm">{stopLossPercent}%</div>
                  </div>
                  
                  <Separator />
                  
                  <div className="pt-2">
                    <div className="text-sm text-muted-foreground mb-1">
                      {t('risk_amount')}
                    </div>
                    <div className="text-xl">
                      ${(accountValue * maxRiskPerTrade / 100).toFixed(2)}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {t('recommended_position_size')}
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {calculatePositionSize()} {t('shares')}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {t('total_position_value')}
                    </div>
                    <div className="text-xl">
                      ${(calculatePositionSize() * entryPrice).toFixed(2)}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 flex justify-between text-sm">
                <div className="flex items-center">
                  <Info className="h-4 w-4 text-muted-foreground mr-2" />
                  {t('position_size_note')}
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('risk_rules')}</CardTitle>
                <CardDescription>
                  {t('risk_rules_description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      <Shield className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">{t('never_risk_title')}</h4>
                      <p className="text-sm text-muted-foreground">{t('never_risk_description')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      <Shield className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">{t('correlation_title')}</h4>
                      <p className="text-sm text-muted-foreground">{t('correlation_description')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      <Shield className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">{t('reduce_size_title')}</h4>
                      <p className="text-sm text-muted-foreground">{t('reduce_size_description')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      <Shield className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">{t('drawdown_title')}</h4>
                      <p className="text-sm text-muted-foreground">{t('drawdown_description')}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="pt-2">
                    <Label htmlFor="auto-risk-management" className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{t('auto_risk_management')}</h4>
                        <p className="text-sm text-muted-foreground">{t('auto_risk_management_description')}</p>
                      </div>
                      <Switch id="auto-risk-management" defaultChecked />
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="risk-allocation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('asset_class_allocation')}</CardTitle>
                <CardDescription>
                  {t('asset_class_allocation_description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPane>
                      <Pie
                        data={riskAllocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({name, value}) => `${name}: ${value}%`}
                        labelLine
                      >
                        {riskAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => `${value}%`}
                      />
                    </RechartsPane>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {riskAllocationData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('strategy_risk_scores')}</CardTitle>
                <CardDescription>
                  {t('strategy_risk_scores_description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">{t('strategy')}</th>
                        <th className="text-right p-4">{t('sharpe')}</th>
                        <th className="text-right p-4">{t('max_dd')} (%)</th>
                        <th className="text-right p-4">{t('win_rate')} (%)</th>
                        <th className="text-right p-4">{t('risk_score')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {strategiesRiskData.map((strategy, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-4">{strategy.strategy}</td>
                          <td className="text-right p-4">{strategy.sharpe}</td>
                          <td className="text-right p-4 text-red-500">-{strategy.maxDD}%</td>
                          <td className="text-right p-4">{strategy.winRate}%</td>
                          <td className="text-right p-4">
                            <div className="flex items-center justify-end">
                              <span className="mr-2">{strategy.riskScore}</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full" 
                                  style={{ 
                                    width: `${(strategy.riskScore / 10) * 100}%`,
                                    backgroundColor: strategy.riskScore < 6 ? "#4CAF50" : 
                                                    strategy.riskScore < 8 ? "#FB8C00" : "#F44336"
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="drawdown-analysis">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('historical_drawdowns')}</CardTitle>
                <CardDescription>
                  {t('historical_drawdowns_description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={historicalDrawdownData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FF5252" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#FF5252" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, t('drawdown')]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="drawdown" 
                        stroke="#FF5252" 
                        fillOpacity={1} 
                        fill="url(#colorDrawdown)"
                        animationDuration={1000}
                      />
                      <ReferenceLine 
                        y={-maxDrawdown} 
                        stroke="red" 
                        strokeDasharray="3 3" 
                        label={`Max (${maxDrawdown}%)`} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">{t('max_drawdown')}</div>
                    <div className="text-2xl font-bold text-red-500">-15.3%</div>
                    <div className="text-sm text-muted-foreground mt-1">{t('jul_2024')}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">{t('avg_drawdown')}</div>
                    <div className="text-2xl font-bold text-orange-500">-6.8%</div>
                    <div className="text-sm text-muted-foreground mt-1">{t('last_12_months')}</div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">{t('recovery_time')}</div>
                    <div className="text-2xl font-bold">42 {t('days')}</div>
                    <div className="text-sm text-muted-foreground mt-1">{t('average')}</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">{t('drawdown_protection_strategies')}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>{t('stop_trading_at')} {maxDrawdown}% {t('drawdown')}</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>{t('reduce_position_size_after_losses')}</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>{t('implement_portfolio_hedging')}</span>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <X className="h-5 w-5 text-red-500 mr-2" />
                        <span>{t('use_dynamic_stop_losses')}</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="var-calculator">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('value_at_risk_calculator')}</CardTitle>
                <CardDescription>
                  {t('var_calculator_description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="portfolio-value">{t('portfolio_value')}</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="portfolio-value"
                        type="number"
                        value={accountValue}
                        onChange={(e) => setAccountValue(parseFloat(e.target.value))}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="volatility">{t('daily_volatility')} (%)</Label>
                    <Select defaultValue="2.5">
                      <SelectTrigger id="volatility">
                        <SelectValue placeholder={t('select_volatility')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1.5">1.5% - {t('low')}</SelectItem>
                        <SelectItem value="2.5">2.5% - {t('medium')}</SelectItem>
                        <SelectItem value="3.5">3.5% - {t('high')}</SelectItem>
                        <SelectItem value="5.0">5.0% - {t('very_high')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time-horizon">{t('time_horizon')}</Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="time-horizon">
                        <SelectValue placeholder={t('select_time_horizon')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 {t('day')}</SelectItem>
                        <SelectItem value="5">5 {t('days')}</SelectItem>
                        <SelectItem value="10">10 {t('days')}</SelectItem>
                        <SelectItem value="20">20 {t('days')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={calculateVaR} 
                    disabled={calculatingVaR} 
                    className="w-full"
                  >
                    {calculatingVaR ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        {t('calculating')}...
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 h-4 w-4" />
                        {t('calculate_var')}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('var_results')}</CardTitle>
                <CardDescription>
                  {t('var_results_description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">{t('confidence_level')}</th>
                        <th className="text-center p-4">Z-{t('score')}</th>
                        <th className="text-right p-4">{t('var_amount')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {varResults.map((result, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-4 font-medium">{result.confidence}</td>
                          <td className="text-center p-4">{result.value}</td>
                          <td className="text-right p-4 text-red-500">
                            -${result.dollarValue.toString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 bg-muted/50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">{t('interpretation')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('var_interpretation')}
                  </p>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Info className="h-4 w-4 mr-2" />
                    {t('var_note')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskManagement;
