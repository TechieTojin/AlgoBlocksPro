
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { 
  Link, 
  Power, 
  Key, 
  Check, 
  X, 
  HelpCircle, 
  Server, 
  Database, 
  LogIn, 
  FileKey, 
  ArrowRight, 
  ExternalLink 
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

const Connect = () => {
  const [activeTab, setActiveTab] = useState("brokers");
  const [connecting, setConnecting] = useState(false);
  
  // Mock data for connected services
  const connectedBrokers = [
    {
      name: "Alpaca",
      status: "Connected",
      lastSync: "2 minutes ago",
      logo: "https://site-assets.plasmic.app/db029e0a7a8cb27c6aefe913e5ae6746.svg"
    }
  ];
  
  const availableBrokers = [
    {
      name: "Interactive Brokers",
      description: "Comprehensive API for global markets",
      logo: "https://site-assets.plasmic.app/5a5a0b8bbeae7a45d1ebee1f46d76837.svg"
    },
    {
      name: "TD Ameritrade",
      description: "US equities and options trading",
      logo: "https://site-assets.plasmic.app/a7f5bdd4a44fcd4d86ee95dce8ba7b3e.svg"
    },
    {
      name: "Coinbase",
      description: "Cryptocurrency exchange API",
      logo: "https://site-assets.plasmic.app/a7b99774a80315486fbb60a93704e1ce.svg"
    }
  ];
  
  const dataProviders = [
    {
      name: "Alpha Vantage",
      description: "Real-time and historical market data",
      connected: true,
      logo: "https://site-assets.plasmic.app/5aae4516c7d91de744a9c8d6b43f33bf.svg"
    },
    {
      name: "IEX Cloud",
      description: "Financial data infrastructure",
      connected: false,
      logo: "https://site-assets.plasmic.app/9c3a9656b02e7cb049df61d759d20e1c.svg"
    },
    {
      name: "Finnhub",
      description: "Real-time RESTful APIs",
      connected: false,
      logo: "https://site-assets.plasmic.app/82b3ca6c3a2380d4b61553c0c7f969ff.svg"
    },
    {
      name: "Polygon.io",
      description: "Financial market data API",
      connected: false,
      logo: "https://site-assets.plasmic.app/5acacbb2ab7271f8e3c5b73379e11c3d.svg"
    }
  ];
  
  const handleConnect = (service) => {
    setConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      setConnecting(false);
      toast({
        title: "Connection successful",
        description: `Successfully connected to ${service}.`,
      });
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col space-y-6">
          {/* Header Section */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <Link className="h-7 w-7 mr-2 text-primary" />
              Connections
            </h1>
            <p className="text-muted-foreground mt-1">Connect your trading accounts and data services</p>
          </div>
          
          {/* Main Content */}
          <Tabs defaultValue="brokers" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="brokers">
                <Server className="h-4 w-4 mr-2" />
                Brokers
              </TabsTrigger>
              <TabsTrigger value="data">
                <Database className="h-4 w-4 mr-2" />
                Data Providers
              </TabsTrigger>
              <TabsTrigger value="api">
                <Key className="h-4 w-4 mr-2" />
                API Keys
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="brokers" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Brokers</CardTitle>
                  <CardDescription>Manage your existing broker connections</CardDescription>
                </CardHeader>
                <CardContent>
                  {connectedBrokers.length > 0 ? (
                    <div className="space-y-4">
                      {connectedBrokers.map((broker) => (
                        <div key={broker.name} className="flex items-center justify-between border p-4 rounded-lg">
                          <div className="flex items-center">
                            <div className="h-12 w-12 rounded-md bg-background flex items-center justify-center mr-4 overflow-hidden">
                              <img src={broker.logo} alt={broker.name} className="h-10 w-10 object-contain" />
                            </div>
                            <div>
                              <h3 className="font-medium">{broker.name}</h3>
                              <div className="flex items-center mt-1">
                                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                                <p className="text-sm text-muted-foreground">{broker.status} • Last sync: {broker.lastSync}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">Sync</Button>
                            <Button variant="outline" size="sm">Settings</Button>
                            <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">Disconnect</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Server className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No brokers connected</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-6">
                        Connect a broker to start trading with your algorithms
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Available Brokers</CardTitle>
                  <CardDescription>Connect to a trading platform to execute your strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableBrokers.map((broker) => (
                      <Card key={broker.name} className="border bg-background">
                        <CardHeader className="pb-2">
                          <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                            <img src={broker.logo} alt={broker.name} className="h-10 w-10 object-contain" />
                          </div>
                          <CardTitle className="text-lg mt-2">{broker.name}</CardTitle>
                          <CardDescription>{broker.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-2">
                          <Button 
                            onClick={() => handleConnect(broker.name)} 
                            disabled={connecting}
                            className="w-full"
                          >
                            {connecting ? "Connecting..." : "Connect"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                    
                    <Card className="border bg-background border-dashed">
                      <CardHeader className="pb-2">
                        <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                          <HelpCircle className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-lg mt-2">Don't see your broker?</CardTitle>
                        <CardDescription>Request integration with your preferred platform</CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full">Request Broker</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Paper Trading</CardTitle>
                  <CardDescription>Simulate trades without using real money</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Paper Trading</Label>
                      <p className="text-sm text-muted-foreground">All trades will be simulated with virtual money</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Paper Trading Balance</Label>
                      <div className="flex items-center">
                        <span className="absolute ml-3 text-muted-foreground">$</span>
                        <Input 
                          type="number" 
                          defaultValue="100000" 
                          className="pl-7" 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Simulated Slippage (%)</Label>
                        <Input type="number" defaultValue="0.1" min="0" step="0.01" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Simulated Commission ($)</Label>
                        <Input type="number" defaultValue="0.005" min="0" step="0.001" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Paper Trading Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="data" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Market Data Providers</CardTitle>
                  <CardDescription>Connect to data sources for real-time and historical market data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {dataProviders.map((provider) => (
                      <div 
                        key={provider.name} 
                        className={`flex items-center justify-between border p-4 rounded-lg ${provider.connected ? 'border-primary bg-primary/5' : ''}`}
                      >
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-md bg-background flex items-center justify-center mr-4 overflow-hidden">
                            <img src={provider.logo} alt={provider.name} className="h-10 w-10 object-contain" />
                          </div>
                          <div>
                            <h3 className="font-medium">{provider.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{provider.description}</p>
                          </div>
                        </div>
                        <div>
                          {provider.connected ? (
                            <div className="flex items-center">
                              <span className="flex items-center text-green-600 text-sm font-medium mr-3">
                                <Check className="h-4 w-4 mr-1" />
                                Connected
                              </span>
                              <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                                <X className="h-4 w-4 mr-1" />
                                Disconnect
                              </Button>
                            </div>
                          ) : (
                            <Button onClick={() => handleConnect(provider.name)}>Connect</Button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex items-center justify-between border border-dashed p-4 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center mr-4">
                          <HelpCircle className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium">Custom Data Source</h3>
                          <p className="text-sm text-muted-foreground mt-1">Connect to your own data source via API</p>
                        </div>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Data Settings</CardTitle>
                  <CardDescription>Configure data synchronization preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-Sync Market Data</Label>
                        <p className="text-sm text-muted-foreground">Automatically update market data at regular intervals</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Sync Frequency</Label>
                      <Select defaultValue="1h">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5m">Every 5 minutes</SelectItem>
                          <SelectItem value="15m">Every 15 minutes</SelectItem>
                          <SelectItem value="30m">Every 30 minutes</SelectItem>
                          <SelectItem value="1h">Every hour</SelectItem>
                          <SelectItem value="4h">Every 4 hours</SelectItem>
                          <SelectItem value="1d">Daily</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Cache Historical Data</Label>
                        <p className="text-sm text-muted-foreground">Store historical data locally for faster access</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Cache Duration</Label>
                      <Select defaultValue="30d">
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">7 days</SelectItem>
                          <SelectItem value="14d">14 days</SelectItem>
                          <SelectItem value="30d">30 days</SelectItem>
                          <SelectItem value="90d">90 days</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Data Settings</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Manual Data Import</CardTitle>
                  <CardDescription>Import historical data from external sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border bg-background">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">CSV Import</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Import historical market data from CSV files
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full">Import CSV</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border bg-background">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">JSON Import</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Import data from JSON format files
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full">Import JSON</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border bg-background">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Database Import</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Connect to external database sources
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full">Configure</Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">Supported formats:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>OHLC data (date, open, high, low, close, volume)</li>
                      <li>Tick data (timestamp, price, volume)</li>
                      <li>Fundamental data (company financials, ratios)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>AlgoBlocks API Keys</CardTitle>
                  <CardDescription>Manage API keys for accessing the AlgoBlocks platform programmatically</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Primary API Key</h3>
                        <p className="text-sm text-muted-foreground mt-1">Created on Apr 2, 2025 • Last used 14 minutes ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">Revoke</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Development API Key</h3>
                        <p className="text-sm text-muted-foreground mt-1">Created on Mar 15, 2025 • Last used 2 days ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">Revoke</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button>
                    <Key className="h-4 w-4 mr-2" />
                    Generate New API Key
                  </Button>
                  
                  <div className="rounded-md border p-4 bg-muted/50">
                    <div className="flex items-center">
                      <HelpCircle className="h-5 w-5 text-muted-foreground mr-2" />
                      <p className="font-medium">API Key Security</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Keep your API keys secure. They provide full access to your AlgoBlocks account and should never be shared publicly or committed to source code repositories.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Authentication Methods</CardTitle>
                  <CardDescription>Configure how you authenticate with the AlgoBlocks API</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>API Key Authentication</Label>
                        <p className="text-sm text-muted-foreground">Authenticate using your API key in request headers</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>OAuth 2.0</Label>
                        <p className="text-sm text-muted-foreground">Authenticate using OAuth 2.0 flow for third-party applications</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>JWT Authentication</Label>
                        <p className="text-sm text-muted-foreground">Use JSON Web Tokens for authentication</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>API Documentation</CardTitle>
                  <CardDescription>Learn how to use the AlgoBlocks API</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border bg-background">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <FileKey className="h-5 w-5 mr-2" />
                          Getting Started
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Learn the basics of using the AlgoBlocks API, including authentication and rate limits.
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full flex items-center">
                          Read Guide
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border bg-background">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Server className="h-5 w-5 mr-2" />
                          API Reference
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Complete API reference documentation with endpoints, parameters, and examples.
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full flex items-center">
                          View Reference
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border bg-background">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <LogIn className="h-5 w-5 mr-2" />
                          Code Examples
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Sample code in Python, JavaScript, and other languages to help you get started.
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full flex items-center">
                          View Examples
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            AlgoBlocks - Democratizing Algorithmic Trading
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 AlgoBlocks. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Connect;
