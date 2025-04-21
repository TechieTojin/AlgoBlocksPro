import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  AlertTriangle, 
  TrendingDown, 
  Percent, 
  DollarSign, 
  Clock, 
  Settings, 
  Save, 
  RefreshCcw, 
  Info,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ProgressBar } from "@/components/visualizations/Progress";

interface RiskSettings {
  positionSizing: number;
  stopLossType: "fixed" | "percentage";
  stopLossValue: number;
  takeProfitType: "fixed" | "percentage";
  takeProfitValue: number;
  maxDailyLoss: number;
  maxConsecutiveLosses: number;
  useTrailingStop: boolean;
  trailingStopDistance: number;
  trailingStopUnit: "percentage" | "ticks";
  accountRiskPercent: number;
  maxPositionSizePercent: number;
  defaultLeverage: number;
  useFixedStopLoss: boolean;
  stopLossPercent: number;
  stopLossATR: number;
  takeProfitRatio: number;
  trailingTakeProfit: boolean;
  trailingActivationPercent: number;
  maxOpenPositions: number;
  maxDailyDrawdown: number;
  maxCorrelatedAssets: number;
  defaultStopLossPercent: number;
  defaultTakeProfitPercent: number;
  maxDailyLossPercent: number;
  maxWeeklyLossPercent: number;
  enableAutomatedRiskReduction: boolean;
}

const RiskManagementSetup = () => {
  const [activeTab, setActiveTab] = useState("position-sizing");
  
  const [riskSettings, setRiskSettings] = useState<RiskSettings>({
    positionSizing: 2,
    stopLossType: "percentage",
    stopLossValue: 2,
    takeProfitType: "percentage",
    takeProfitValue: 6,
    maxDailyLoss: 5,
    maxConsecutiveLosses: 3,
    useTrailingStop: false,
    trailingStopDistance: 1.5,
    trailingStopUnit: "percentage",
    accountRiskPercent: 1.5,
    maxPositionSizePercent: 5,
    defaultLeverage: 1,
    useFixedStopLoss: true,
    stopLossPercent: 2,
    stopLossATR: 2.5,
    takeProfitRatio: 2,
    trailingTakeProfit: false,
    trailingActivationPercent: 75,
    maxOpenPositions: 5,
    maxDailyDrawdown: 5,
    maxCorrelatedAssets: 3,
    defaultStopLossPercent: 5,
    defaultTakeProfitPercent: 10,
    maxDailyLossPercent: 3,
    maxWeeklyLossPercent: 8,
    enableAutomatedRiskReduction: true
  });

  const [capitalAmount, setCapitalAmount] = useState<number>(10000);
  const [assetPrice, setAssetPrice] = useState<number>(150);
  
  const positionAmount = capitalAmount * (riskSettings.positionSizing / 100);
  const shares = Math.floor(positionAmount / assetPrice);
  const actualInvestment = shares * assetPrice;
  
  const stopLossAmount = riskSettings.stopLossType === "percentage" 
    ? actualInvestment * (riskSettings.stopLossValue / 100)
    : shares * riskSettings.stopLossValue;
    
  const takeProfitAmount = riskSettings.takeProfitType === "percentage"
    ? actualInvestment * (riskSettings.takeProfitValue / 100)
    : shares * riskSettings.takeProfitValue;
    
  const maxDailyLossAmount = capitalAmount * (riskSettings.maxDailyLoss / 100);

  const updateRiskSettings = (key: keyof RiskSettings, value: number | boolean | string) => {
    setRiskSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast.success(`${key} updated to ${value}`);
  };

  const saveSettings = () => {
    toast.success("Risk management settings saved successfully!", {
      description: "Your trading parameters have been updated.",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />
    });
  };

  const resetDefaults = () => {
    setRiskSettings({
      positionSizing: 2,
      stopLossType: "percentage",
      stopLossValue: 2,
      takeProfitType: "percentage",
      takeProfitValue: 6,
      maxDailyLoss: 5,
      maxConsecutiveLosses: 3,
      useTrailingStop: false,
      trailingStopDistance: 1.5,
      trailingStopUnit: "percentage",
      accountRiskPercent: 1.5,
      maxPositionSizePercent: 5,
      defaultLeverage: 1,
      useFixedStopLoss: true,
      stopLossPercent: 2,
      stopLossATR: 2.5,
      takeProfitRatio: 2,
      trailingTakeProfit: false,
      trailingActivationPercent: 75,
      maxOpenPositions: 5,
      maxDailyDrawdown: 5,
      maxCorrelatedAssets: 3,
      defaultStopLossPercent: 5,
      defaultTakeProfitPercent: 10,
      maxDailyLossPercent: 3,
      maxWeeklyLossPercent: 8,
      enableAutomatedRiskReduction: true
    });
    
    toast.info("Settings reset to default values");
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Management Setup</h1>
          <p className="text-muted-foreground">
            Configure risk parameters for your trading strategies
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetDefaults} size="sm">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={saveSettings} size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        {/* Trading Capital Preview Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Preview Settings</CardTitle>
            <CardDescription>Adjust values to see calculated risk metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tradingCapital">Trading Capital ($)</Label>
              <div className="flex">
                <div className="bg-muted p-2 rounded-l-md flex items-center">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input 
                  id="tradingCapital"
                  type="number" 
                  value={capitalAmount} 
                  onChange={(e) => setCapitalAmount(Number(e.target.value))}
                  className="rounded-l-none" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assetPrice">Asset Price ($)</Label>
              <div className="flex">
                <div className="bg-muted p-2 rounded-l-md flex items-center">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input 
                  id="assetPrice"
                  type="number" 
                  value={assetPrice} 
                  onChange={(e) => setAssetPrice(Number(e.target.value))}
                  className="rounded-l-none" 
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Position Size</span>
                  <span className="text-sm font-semibold">${positionAmount.toFixed(2)}</span>
                </div>
                <ProgressBar value={riskSettings.positionSizing} max={25} showValue={false} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Risk Amount</span>
                  <span className="text-sm font-semibold">${actualInvestment.toFixed(2)}</span>
                </div>
                <ProgressBar value={riskSettings.accountRiskPercent} max={5} showValue={false} />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted p-2 rounded-md">
                  <div className="text-xs text-muted-foreground">Units</div>
                  <div className="font-semibold">{shares.toFixed(2)}</div>
                </div>
                <div className="bg-muted p-2 rounded-md">
                  <div className="text-xs text-muted-foreground">Max Loss</div>
                  <div className="font-semibold text-destructive">${maxDailyLossAmount.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Position Sizing Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Position Sizing</CardTitle>
            <CardDescription>Configure how much capital to risk per trade</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="accountRiskPercent">Account Risk (%)</Label>
                <span className="text-sm font-medium">{riskSettings.accountRiskPercent}%</span>
              </div>
              <Slider 
                id="accountRiskPercent"
                value={[riskSettings.accountRiskPercent]} 
                min={0.1} 
                max={5} 
                step={0.1} 
                onValueChange={(value) => updateRiskSettings('accountRiskPercent', value[0])} 
              />
              <p className="text-xs text-muted-foreground">
                Maximum percentage of account to risk on any single trade
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="maxPositionSizePercent">Max Position Size (%)</Label>
                <span className="text-sm font-medium">{riskSettings.maxPositionSizePercent}%</span>
              </div>
              <Slider 
                id="maxPositionSizePercent"
                value={[riskSettings.maxPositionSizePercent]} 
                min={1} 
                max={25} 
                step={1} 
                onValueChange={(value) => updateRiskSettings('maxPositionSizePercent', value[0])} 
              />
              <p className="text-xs text-muted-foreground">
                Maximum percentage of account allocated to any position
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="defaultLeverage">Default Leverage</Label>
                <span className="text-sm font-medium">{riskSettings.defaultLeverage}x</span>
              </div>
              <Slider 
                id="defaultLeverage"
                value={[riskSettings.defaultLeverage]} 
                min={1} 
                max={10} 
                step={1} 
                onValueChange={(value) => updateRiskSettings('defaultLeverage', value[0])} 
              />
              <p className="text-xs text-muted-foreground">
                <span className={riskSettings.defaultLeverage > 3 ? "text-destructive" : ""}>
                  Default leverage multiplier for position sizing
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Stop Loss & Take Profit Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Stop Loss & Take Profit</CardTitle>
            <CardDescription>Set exit parameters for trades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Stop Loss Type</Label>
                <Toggle 
                  pressed={riskSettings.useFixedStopLoss}
                  onPressedChange={(value) => updateRiskSettings('useFixedStopLoss', value)}
                >
                  {riskSettings.useFixedStopLoss ? "Fixed %" : "ATR-Based"}
                </Toggle>
              </div>
              
              {riskSettings.useFixedStopLoss ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="stopLossPercent">Stop Loss (%)</Label>
                    <span className="text-sm font-medium">{riskSettings.stopLossPercent}%</span>
                  </div>
                  <Slider 
                    id="stopLossPercent"
                    value={[riskSettings.stopLossPercent]} 
                    min={0.5} 
                    max={10} 
                    step={0.5} 
                    onValueChange={(value) => updateRiskSettings('stopLossPercent', value[0])} 
                  />
                  <p className="text-xs text-muted-foreground">
                    Fixed percentage from entry for stop loss placement
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="stopLossATR">Stop Loss (ATR)</Label>
                    <span className="text-sm font-medium">{riskSettings.stopLossATR}x</span>
                  </div>
                  <Slider 
                    id="stopLossATR"
                    value={[riskSettings.stopLossATR]} 
                    min={0.5} 
                    max={5} 
                    step={0.5} 
                    onValueChange={(value) => updateRiskSettings('stopLossATR', value[0])} 
                  />
                  <p className="text-xs text-muted-foreground">
                    Multiple of ATR (Average True Range) for stop placement
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="takeProfitRatio">Risk-Reward Ratio</Label>
                <span className="text-sm font-medium">{riskSettings.takeProfitRatio}:1</span>
              </div>
              <Slider 
                id="takeProfitRatio"
                value={[riskSettings.takeProfitRatio]} 
                min={1} 
                max={5} 
                step={0.5} 
                onValueChange={(value) => updateRiskSettings('takeProfitRatio', value[0])} 
              />
              <p className="text-xs text-muted-foreground">
                Take profit distance as multiple of stop loss distance
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <Label>Trailing Take Profit</Label>
                <Toggle 
                  pressed={riskSettings.trailingTakeProfit}
                  onPressedChange={(value) => updateRiskSettings('trailingTakeProfit', value)}
                >
                  {riskSettings.trailingTakeProfit ? "Enabled" : "Disabled"}
                </Toggle>
              </div>
              
              {riskSettings.trailingTakeProfit && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="trailingActivationPercent">Activation Threshold</Label>
                    <span className="text-sm font-medium">{riskSettings.trailingActivationPercent}%</span>
                  </div>
                  <Slider 
                    id="trailingActivationPercent"
                    value={[riskSettings.trailingActivationPercent]} 
                    min={25} 
                    max={90} 
                    step={5} 
                    onValueChange={(value) => updateRiskSettings('trailingActivationPercent', value[0])} 
                  />
                  <p className="text-xs text-muted-foreground">
                    % of take profit target when trailing stop activates
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Risk Limits Card */}
        <Card className="col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Risk Limits</CardTitle>
            <CardDescription>Set portfolio-wide risk constraints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="maxOpenPositions">Max Open Positions</Label>
                  <span className="text-sm font-medium">{riskSettings.maxOpenPositions}</span>
                </div>
                <Slider 
                  id="maxOpenPositions"
                  value={[riskSettings.maxOpenPositions]} 
                  min={1} 
                  max={20} 
                  step={1} 
                  onValueChange={(value) => updateRiskSettings('maxOpenPositions', value[0])} 
                />
                <p className="text-xs text-muted-foreground">
                  Maximum number of positions open at one time
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="maxDailyDrawdown">Max Daily Drawdown (%)</Label>
                  <span className="text-sm font-medium">{riskSettings.maxDailyDrawdown}%</span>
                </div>
                <Slider 
                  id="maxDailyDrawdown"
                  value={[riskSettings.maxDailyDrawdown]} 
                  min={1} 
                  max={15} 
                  step={1} 
                  onValueChange={(value) => updateRiskSettings('maxDailyDrawdown', value[0])} 
                />
                <p className="text-xs text-muted-foreground">
                  Maximum allowed drawdown in a single day
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="maxCorrelatedAssets">Max Correlated Assets</Label>
                  <span className="text-sm font-medium">{riskSettings.maxCorrelatedAssets}</span>
                </div>
                <Slider 
                  id="maxCorrelatedAssets"
                  value={[riskSettings.maxCorrelatedAssets]} 
                  min={1} 
                  max={10} 
                  step={1} 
                  onValueChange={(value) => updateRiskSettings('maxCorrelatedAssets', value[0])} 
                />
                <p className="text-xs text-muted-foreground">
                  Maximum number of highly correlated assets in portfolio
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 flex flex-col items-start p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold">Risk Management Notes</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  These settings will be applied to all new strategies by default. Individual strategies can override these settings.
                  Proper risk management is crucial for long-term trading success. Ensure your settings align with your risk tolerance and capital preservation goals.
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RiskManagementSetup; 