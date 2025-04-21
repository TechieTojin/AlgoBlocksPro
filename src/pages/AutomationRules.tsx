import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Clock, 
  Calendar as CalendarIcon, 
  Plus, 
  Play, 
  Pause, 
  Trash2, 
  Edit, 
  Server, 
  Check, 
  AlertTriangle,
  MoreHorizontal,
  Zap,
  Activity,
  Loader2,
  AlertCircle,
  PlusCircle,
  RefreshCw,
  Database
} from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";

interface Rule {
  id: string;
  name: string;
  description: string;
  condition: string;
  action: string;
  status: 'active' | 'paused' | 'draft';
  lastTriggered: string | null;
  priority: number;
}

const AutomationRules = () => {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [rules, setRules] = useState<Rule[]>([
    {
      id: 'rule-001',
      name: 'Stop Loss Protection',
      description: 'Automatically close position if drawdown exceeds 2%',
      condition: 'position.drawdown > 2%',
      action: 'closePosition(position.id)',
      status: 'active',
      lastTriggered: '2023-12-01 09:45:22',
      priority: 1
    },
    {
      id: 'rule-002',
      name: 'Take Profit',
      description: 'Lock in profits when position gains 5%',
      condition: 'position.profit > 5%',
      action: 'closePosition(position.id)',
      status: 'active',
      lastTriggered: '2023-12-02 14:32:10',
      priority: 2
    },
    {
      id: 'rule-003',
      name: 'Daily Loss Limit',
      description: 'Stop trading for the day if daily loss exceeds 3%',
      condition: 'account.dailyLoss > 3%',
      action: 'disableTrading()',
      status: 'active',
      lastTriggered: null,
      priority: 1
    },
    {
      id: 'rule-004',
      name: 'Volatility Filter',
      description: 'Only trade when market volatility is within range',
      condition: 'market.volatility > 0.5 && market.volatility < 2.0',
      action: 'setTradingEnabled(true)',
      status: 'paused',
      lastTriggered: '2023-11-28 11:20:45',
      priority: 3
    },
    {
      id: 'rule-005',
      name: 'Correlation Protection',
      description: 'Limit exposure to correlated assets',
      condition: 'portfolio.correlationExposure > 60%',
      action: 'reduceExposure(portfolio.highestCorrelatedPairs)',
      status: 'draft',
      lastTriggered: null,
      priority: 2
    }
  ]);

  const connectToBase = () => {
    setConnecting(true);
    // Simulate API connection
    setTimeout(() => {
      setConnected(true);
      setConnecting(false);
    }, 1500);
  };

  const toggleRuleStatus = (ruleId: string) => {
    setRules(prevRules => 
      prevRules.map(rule => {
        if (rule.id === ruleId) {
          const newStatus = rule.status === 'active' ? 'paused' : 'active';
          return { ...rule, status: newStatus };
        }
        return rule;
      })
    );
  };

  const fetchRules = () => {
    // This would be an API call in a real implementation
    console.log("Fetching rules...");
  };

  const filteredRules = rules.filter(rule => {
    const matchesTab = activeTab === "all" || rule.status === activeTab;
    const matchesSearch = searchQuery === "" || 
      rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-500">Active</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-500/10 text-yellow-500">Paused</Badge>;
      case 'draft':
        return <Badge className="bg-gray-500/10 text-gray-500">Draft</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Automation Rules</h1>
          <p className="text-muted-foreground">Create and manage rules to automate your trading strategies</p>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={fetchRules} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Rule
          </Button>
        </div>
      </div>
      
      {!connected ? (
        <Card>
          <CardHeader>
            <CardTitle>Connect to Trading Engine</CardTitle>
            <CardDescription>Connect to your trading account to enable automation rules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-6 space-y-4">
              <Database className="h-16 w-16 text-muted-foreground mb-4" />
              <p>Automation rules require an active connection to your trading account</p>
              <Button onClick={connectToBase} disabled={connecting}>
                {connecting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4 mr-2" />
                    Connect to Trading Account
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All Rules</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="paused">Paused</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="w-full md:w-auto">
              <Input 
                placeholder="Search rules..." 
                className="max-w-xs" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Automation Rules</CardTitle>
              <CardDescription>Rules are processed in order of priority</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Triggered</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRules.length > 0 ? (
                    filteredRules.map(rule => (
                      <TableRow key={rule.id}>
                        <TableCell className="font-medium">{rule.name}</TableCell>
                        <TableCell>{rule.description}</TableCell>
                        <TableCell>{getStatusBadge(rule.status)}</TableCell>
                        <TableCell>{rule.lastTriggered || "Never"}</TableCell>
                        <TableCell>{rule.priority}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => toggleRuleStatus(rule.id)}>
                              {rule.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        <div className="flex flex-col items-center">
                          <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground mb-2">No automation rules found</p>
                          <Button size="sm">Create your first rule</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Rule Testing Sandbox</CardTitle>
              <CardDescription>Test your automation rules before activating them</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Rule Condition</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Condition Type</label>
                      <Select defaultValue="position">
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="position">Position</SelectItem>
                          <SelectItem value="account">Account</SelectItem>
                          <SelectItem value="market">Market</SelectItem>
                          <SelectItem value="portfolio">Portfolio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Condition Expression</label>
                      <Input placeholder="e.g. position.drawdown > 2%" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Rule Action</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Action Type</label>
                      <Select defaultValue="closePosition">
                        <SelectTrigger>
                          <SelectValue placeholder="Select action type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="closePosition">Close Position</SelectItem>
                          <SelectItem value="disableTrading">Disable Trading</SelectItem>
                          <SelectItem value="setTradingEnabled">Set Trading Enabled</SelectItem>
                          <SelectItem value="reduceExposure">Reduce Exposure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Action Parameters</label>
                      <Input placeholder="e.g. position.id" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button>
                  <Play className="h-4 w-4 mr-2" />
                  Test Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AutomationRules; 