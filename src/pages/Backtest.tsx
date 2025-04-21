import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { ArrowRight, PlayCircle, RefreshCw, Calendar, BarChart3, Download, ClipboardList, FileText, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const Backtest = () => {
  const { t } = useTranslation();
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  
  // Mock data
  const results = {
    summary: {
      totalTrades: 48,
      winRate: 68.75,
      profitFactor: 2.62,
      sharpeRatio: 1.83,
      maxDrawdown: 8.42,
      annualReturn: 22.6,
      volatility: 12.4,
      startingCapital: 10000,
      endingCapital: 15268,
      netProfit: 5268,
      netProfitPercent: 52.68
    },
    equity: [
      { date: "2024-01-01", value: 10000 },
      { date: "2024-01-15", value: 10450 },
      { date: "2024-02-01", value: 11200 },
      { date: "2024-02-15", value: 10900 },
      { date: "2024-03-01", value: 11500 },
      { date: "2024-03-15", value: 12300 },
      { date: "2024-04-01", value: 13100 },
      { date: "2024-04-15", value: 12800 },
      { date: "2024-05-01", value: 13600 },
      { date: "2024-05-15", value: 14200 },
      { date: "2024-06-01", value: 15268 },
    ],
    trades: [
      { id: 1, date: "2024-01-05", symbol: "AAPL", type: "BUY", price: 178.42, quantity: 10, pnl: 352.80, pnlPercent: 3.21 },
      { id: 2, date: "2024-01-20", symbol: "AAPL", type: "SELL", price: 186.86, quantity: 10, pnl: -125.40, pnlPercent: -1.12 },
      { id: 3, date: "2024-02-10", symbol: "AAPL", type: "BUY", price: 182.52, quantity: 12, pnl: 481.20, pnlPercent: 4.24 },
      { id: 4, date: "2024-02-28", symbol: "AAPL", type: "BUY", price: 178.36, quantity: 15, pnl: 602.25, pnlPercent: 5.56 },
      { id: 5, date: "2024-03-15", symbol: "AAPL", type: "SELL", price: 173.69, quantity: 8, pnl: -98.16, pnlPercent: -0.85 },
    ],
    monthly: [
      { month: "Jan", return: 4.5 },
      { month: "Feb", return: 4.2 },
      { month: "Mar", return: 12.8 },
      { month: "Apr", return: -2.3 },
      { month: "May", return: 6.2 },
      { month: "Jun", return: 7.5 }
    ],
    drawdowns: [
      { start: "2024-01-20", end: "2024-02-05", depth: 4.2, recovery: 16 },
      { start: "2024-02-20", end: "2024-03-01", depth: 2.7, recovery: 9 },
      { start: "2024-04-10", end: "2024-04-30", depth: 8.4, recovery: 20 },
    ]
  };
  
  // Run backtest simulation
  const runBacktest = () => {
    setIsRunning(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight">{t('backtest.run_backtest')}</h1>
      <p className="text-muted-foreground">{t('backtest.description')}</p>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('backtest_configuration')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="strategy">{t('strategy')}</Label>
                  <Select defaultValue="moving-average-crossover">
                    <SelectTrigger id="strategy">
                      <SelectValue placeholder={t('select_strategy')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moving-average-crossover">{t('moving_average_crossover')}</SelectItem>
                      <SelectItem value="rsi-strategy">{t('rsi_strategy')}</SelectItem>
                      <SelectItem value="bollinger-bands">{t('bollinger_bands')}</SelectItem>
                      <SelectItem value="macd">{t('macd')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="symbol">{t('symbol')}</Label>
                  <Select 
                    defaultValue="AAPL" 
                    onValueChange={setSelectedSymbol}
                  >
                    <SelectTrigger id="symbol">
                      <SelectValue placeholder={t('select_symbol')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AAPL">AAPL</SelectItem>
                      <SelectItem value="MSFT">MSFT</SelectItem>
                      <SelectItem value="GOOGL">GOOGL</SelectItem>
                      <SelectItem value="AMZN">AMZN</SelectItem>
                      <SelectItem value="TSLA">TSLA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">{t('start_date')}</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="start-date" type="date" defaultValue="2024-01-01" className="pl-8" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end-date">{t('end_date')}</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="end-date" type="date" defaultValue="2024-06-01" className="pl-8" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="initial-capital">{t('initial_capital')}</Label>
                  <Input id="initial-capital" type="number" defaultValue="10000" min="1000" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position-size">{t('position_size')} (%)</Label>
                  <Input id="position-size" type="number" defaultValue="10" min="1" max="100" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button onClick={runBacktest} disabled={isRunning} className="w-full md:w-auto">
                {isRunning ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    {t('running')}... {progress}%
                  </>
                ) : (
                  <>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    {t('run_backtest')}
                  </>
                )}
              </Button>
            </div>
            
            {isRunning && (
              <div className="mt-4">
                <Progress value={progress} />
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {t('processing_data')} {selectedSymbol}...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {progress === 100 && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>{t('backtest_results')}</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {t('export_results')}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-muted-foreground text-sm mb-1">{t('net_profit')}</div>
                      <div className="text-2xl font-bold text-green-500">
                        ${results.summary.netProfit.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-500">+{results.summary.netProfitPercent}%</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-muted-foreground text-sm mb-1">{t('win_rate')}</div>
                      <div className="text-2xl font-bold">{results.summary.winRate}%</div>
                      <div className="text-sm text-muted-foreground">{results.summary.totalTrades} {t('total_trades')}</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-muted-foreground text-sm mb-1">{t('profit_factor')}</div>
                      <div className="text-2xl font-bold">{results.summary.profitFactor}</div>
                      <div className="text-sm text-muted-foreground">{t('profit_factor_description')}</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-muted-foreground text-sm mb-1">{t('max_drawdown')}</div>
                      <div className="text-2xl font-bold text-red-500">-{results.summary.maxDrawdown}%</div>
                      <div className="text-sm text-muted-foreground">{t('max_drawdown_description')}</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">{t('equity_curve')}</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={results.equity}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={['dataMin - 500', 'dataMax + 500']} />
                        <Tooltip 
                          formatter={(value) => [`$${value}`, t('portfolio_value')]}
                          labelFormatter={(label) => new Date(label).toLocaleDateString()}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#8884d8" 
                          fillOpacity={1} 
                          fill="url(#colorValue)"
                          animationDuration={1000}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="monthly">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
                <TabsTrigger value="monthly" className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {t('monthly_returns')}
                </TabsTrigger>
                <TabsTrigger value="trades" className="flex items-center">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  {t('trades')}
                </TabsTrigger>
                <TabsTrigger value="drawdowns" className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  {t('drawdowns')}
                </TabsTrigger>
                <TabsTrigger value="report" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  {t('full_report')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="monthly">
                <Card>
                  <CardContent className="p-6">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={results.monthly}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[-15, 15]} />
                          <Tooltip 
                            formatter={(value) => [`${value}%`, t('monthly_return')]}
                          />
                          <Bar 
                            dataKey="return" 
                            fill="#4CAF50"
                            animationDuration={1000}
                            isAnimationActive={true}
                            shape={(props) => {
                              const { x, y, width, height, value } = props;
                              return (
                                <rect 
                                  x={x} 
                                  y={y} 
                                  width={width} 
                                  height={height} 
                                  fill={value >= 0 ? "#4CAF50" : "#F44336"}
                                  radius={2}
                                />
                              );
                            }}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="trades">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4">{t('date')}</th>
                            <th className="text-left p-4">{t('symbol')}</th>
                            <th className="text-left p-4">{t('type')}</th>
                            <th className="text-right p-4">{t('price')}</th>
                            <th className="text-right p-4">{t('quantity')}</th>
                            <th className="text-right p-4">{t('pnl')}</th>
                            <th className="text-right p-4">%</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.trades.map((trade) => (
                            <tr key={trade.id} className="border-b hover:bg-muted/50">
                              <td className="p-4">{new Date(trade.date).toLocaleDateString()}</td>
                              <td className="p-4">{trade.symbol}</td>
                              <td className="p-4">
                                <span className={trade.type === "BUY" ? "text-green-500" : "text-red-500"}>
                                  {trade.type}
                                </span>
                              </td>
                              <td className="text-right p-4">${trade.price}</td>
                              <td className="text-right p-4">{trade.quantity}</td>
                              <td className={`text-right p-4 ${trade.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                                ${trade.pnl.toFixed(2)}
                              </td>
                              <td className={`text-right p-4 ${trade.pnlPercent >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {trade.pnlPercent >= 0 ? "+" : ""}{trade.pnlPercent.toFixed(2)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="drawdowns">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4">{t('start_date')}</th>
                            <th className="text-left p-4">{t('end_date')}</th>
                            <th className="text-right p-4">{t('depth')} (%)</th>
                            <th className="text-right p-4">{t('recovery')} ({t('days')})</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.drawdowns.map((dd, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50">
                              <td className="p-4">{new Date(dd.start).toLocaleDateString()}</td>
                              <td className="p-4">{new Date(dd.end).toLocaleDateString()}</td>
                              <td className="text-right p-4 text-red-500">-{dd.depth.toFixed(2)}%</td>
                              <td className="text-right p-4">{dd.recovery}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="report">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-10">
                      <Zap className="h-16 w-16 mx-auto text-primary" />
                      <h3 className="text-2xl font-medium mt-4">{t('premium_feature')}</h3>
                      <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                        {t('premium_feature_description')}
                      </p>
                      <Button className="mt-6">{t('upgrade_to_premium')}</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Backtest;
