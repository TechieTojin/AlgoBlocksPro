import React, { useState, useEffect } from "react";
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Link2, 
  Server, 
  Globe, 
  Shield, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  PlusCircle, 
  Settings, 
  Search, 
  KeyRound, 
  ExternalLink, 
  Trash2, 
  Clock, 
  Zap, 
  DollarSign, 
  Bitcoin
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ProgressBar } from "@/components/visualizations/Progress";

// Interfaces
interface Broker {
  id: string;
  name: string;
  logo: string;
  region: string[];
  type: "stocks" | "crypto" | "forex" | "multiple";
  description: string;
  popularityScore: number;
  connected?: boolean;
  status?: "connected" | "disconnected" | "error" | "syncing";
  lastSync?: string;
  features: string[];
}

interface ConnectedBroker extends Broker {
  accountId: string;
  status: "connected" | "error" | "syncing";
  lastSync: string;
  balance: number;
  autoSync: boolean;
  apiKeyStatus: "valid" | "expired" | "warning";
  apiKeyExpiry?: string;
}

// Add a function to handle image loading errors
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.src = "https://via.placeholder.com/32?text=?";
  target.onerror = null; // Prevent infinite loop
};

const BrokerConnections: React.FC = () => {
  const [activeTab, setActiveTab] = useState("connected");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [connectingBroker, setConnectingBroker] = useState<Broker | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mock broker data
  const brokers: Broker[] = [
    {
      id: "zerodha",
      name: "Zerodha",
      logo: "/brokers/zerodha.svg",
      region: ["India"],
      type: "stocks",
      description: "India's largest stock broker offering the lowest, flat-fee pricing",
      popularityScore: 95,
      features: ["Equity", "F&O", "Commodity", "Mutual Funds"]
    },
    {
      id: "alpaca",
      name: "Alpaca",
      logo: "/brokers/alpaca.svg",
      region: ["United States", "Global"],
      type: "stocks",
      description: "Commission-free stock trading API for algorithmic trading",
      popularityScore: 92,
      features: ["Stocks", "ETFs", "API Access", "Paper Trading"]
    },
    {
      id: "interactivebrokers",
      name: "Interactive Brokers",
      logo: "/brokers/ib.svg",
      region: ["Global"],
      type: "multiple",
      description: "Global investment platform for sophisticated investors",
      popularityScore: 88,
      features: ["Stocks", "Options", "Futures", "Forex", "Bonds"]
    },
    {
      id: "binance",
      name: "Binance",
      logo: "/brokers/binance.svg",
      region: ["Global"],
      type: "crypto",
      description: "World's largest cryptocurrency exchange by trading volume",
      popularityScore: 97,
      features: ["Spot", "Futures", "Options", "Margin Trading"]
    },
    {
      id: "coinbase",
      name: "Coinbase",
      logo: "/brokers/coinbase.svg",
      region: ["United States", "Europe", "Global"],
      type: "crypto",
      description: "Secure platform for buying, selling, and storing cryptocurrency",
      popularityScore: 94,
      features: ["Spot Trading", "Staking", "Wallet Services"]
    },
    {
      id: "oanda",
      name: "Oanda",
      logo: "/brokers/oanda.svg",
      region: ["Global"],
      type: "forex",
      description: "Award-winning forex trading platform with competitive spreads",
      popularityScore: 86,
      features: ["Forex", "CFDs", "Commodities", "Indices"]
    },
    {
      id: "tradier",
      name: "Tradier",
      logo: "/brokers/tradier.svg",
      region: ["United States"],
      type: "stocks",
      description: "Brokerage API for developers and platforms",
      popularityScore: 80,
      features: ["Stocks", "Options", "API Services"]
    },
    {
      id: "fxcm",
      name: "FXCM",
      logo: "/brokers/fxcm.svg",
      region: ["Global"],
      type: "forex",
      description: "Leading provider of online foreign exchange trading",
      popularityScore: 83,
      features: ["Forex", "CFDs", "Spread Betting"]
    }
  ];
  
  // Mock connected brokers
  const connectedBrokers: ConnectedBroker[] = [
    {
      ...brokers.find(b => b.id === "alpaca") as Broker,
      accountId: "AAPL123456",
      status: "connected",
      lastSync: "2 minutes ago",
      balance: 25786.42,
      autoSync: true,
      apiKeyStatus: "valid",
      connected: true
    },
    {
      ...brokers.find(b => b.id === "binance") as Broker,
      accountId: "BNB987654",
      status: "connected",
      lastSync: "15 minutes ago",
      balance: 8324.91,
      autoSync: true,
      apiKeyStatus: "warning",
      apiKeyExpiry: "7 days",
      connected: true
    }
  ];
  
  // Filter brokers based on search query, region, and type
  const filteredBrokers = brokers.filter(broker => {
    const matchesSearch = 
      searchQuery === "" || 
      broker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      broker.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = 
      filterRegion === "all" || 
      broker.region.some(r => r.toLowerCase() === filterRegion.toLowerCase() || 
                         filterRegion === "global" && r.toLowerCase() === "global");
    
    const matchesType = 
      filterType === "all" || 
      broker.type === filterType || 
      (filterType === "multiple" && broker.type === "multiple");
    
    // Exclude already connected brokers from the available list
    const isNotConnected = !connectedBrokers.some(cb => cb.id === broker.id);
    
    return matchesSearch && matchesRegion && matchesType && isNotConnected;
  });

  // Handle connect broker
  const handleConnectBroker = (broker: Broker) => {
    setConnectingBroker(broker);
    setConnectDialogOpen(true);
  };

  // Handle submit connection
  const handleSubmitConnection = () => {
    if (!connectingBroker) return;
    
    setConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setConnecting(false);
      setConnectDialogOpen(false);
      
      toast.success(`Successfully connected to ${connectingBroker.name}`, {
        description: "Your account has been linked successfully."
      });
      
      // Would add to connectedBrokers in a real app
    }, 2000);
  };
  
  // Handle disconnect broker
  const handleDisconnectBroker = (broker: ConnectedBroker) => {
    toast.success(`Disconnected from ${broker.name}`, {
      description: "Your account has been unlinked successfully."
    });
    
    // Would remove from connectedBrokers in a real app
  };
  
  // Handle refresh broker data
  const handleRefreshBroker = (broker: ConnectedBroker) => {
    toast.success(`Refreshing data from ${broker.name}`, {
      description: "This may take a moment."
    });
    
    // Would update broker data in a real app
  };
  
  // Get icon for broker type
  const getBrokerTypeIcon = (type: string) => {
    switch(type) {
      case "stocks":
        return <DollarSign className="h-4 w-4" />;
      case "crypto":
        return <Bitcoin className="h-4 w-4" />;
      case "forex":
        return <Globe className="h-4 w-4" />;
      default:
        return <Server className="h-4 w-4" />;
    }
  };
  
  // Render the connection form for a broker
  const renderConnectionForm = () => {
    if (!connectingBroker) return null;
    
    return (
      <div className="space-y-4 py-2">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-background rounded-md flex items-center justify-center">
            <img 
              src={connectingBroker.logo} 
              alt={connectingBroker.name} 
              className="w-8 h-8"
              onError={handleImageError}
            />
          </div>
          <div>
            <h3 className="font-medium">{connectingBroker.name}</h3>
            <p className="text-sm text-muted-foreground">Enter your API credentials</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="api-key">API Key</Label>
            <Input id="api-key" placeholder="Enter your API key" />
          </div>
          
          <div>
            <Label htmlFor="api-secret">API Secret</Label>
            <Input id="api-secret" type="password" placeholder="Enter your API secret" />
          </div>
          
          {connectingBroker.type === "forex" && (
            <div>
              <Label htmlFor="account-id">Account ID</Label>
              <Input id="account-id" placeholder="Enter your account ID" />
            </div>
          )}
          
          <div className="flex items-center space-x-2 pt-2">
            <Switch id="auto-sync" defaultChecked />
            <Label htmlFor="auto-sync">Enable auto-sync (every 15 minutes)</Label>
          </div>
        </div>
        
        <div className="bg-muted/50 p-3 rounded-md text-sm flex gap-2 items-start">
          <Shield className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-muted-foreground">
            Your API credentials are encrypted and securely stored. We use read-only access when possible for added security.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <div className="mb-4">
            <RefreshCw className="h-10 w-10 text-primary animate-spin" />
          </div>
          <h3 className="text-lg font-medium mb-2">Loading broker connections...</h3>
          <p className="text-sm text-muted-foreground">This will only take a moment</p>
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
                <Link2 className="h-6 w-6 text-primary" />
                <h1 className="text-3xl font-bold">Broker Connections</h1>
              </div>
              <p className="text-muted-foreground mt-1">
                Connect to your trading accounts to automate your strategies
              </p>
            </div>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Broker
            </Button>
          </div>
          
          <Tabs defaultValue="connected" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              <TabsTrigger value="connected" className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                Connected ({connectedBrokers.length})
              </TabsTrigger>
              <TabsTrigger value="available" className="flex items-center gap-1">
                <Server className="h-4 w-4" />
                Available Brokers
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="connected" className="mt-6 space-y-6">
              {connectedBrokers.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {connectedBrokers.map((broker) => (
                    <Card key={broker.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-background rounded-md flex items-center justify-center">
                              <img 
                                src={broker.logo} 
                                alt={broker.name} 
                                className="w-8 h-8"
                                onError={handleImageError}
                              />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{broker.name}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge 
                                  variant="outline" 
                                  className={
                                    broker.status === "connected" ? "bg-green-500/10 text-green-500 border-green-200" : 
                                    broker.status === "error" ? "bg-red-500/10 text-red-500 border-red-200" :
                                    "bg-amber-500/10 text-amber-500 border-amber-200"
                                  }
                                >
                                  {broker.status === "connected" ? "Connected" : 
                                   broker.status === "error" ? "Error" : "Syncing"}
                                </Badge>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Last sync: {broker.lastSync}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex">
                            <Button variant="ghost" size="icon" onClick={() => handleRefreshBroker(broker)}>
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pb-3">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Account ID</p>
                            <p className="font-medium">{broker.accountId}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Balance</p>
                            <p className="font-medium">${broker.balance.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <p className="text-sm text-muted-foreground">API Key Status</p>
                              <div className="flex items-center gap-1 text-xs">
                                {broker.apiKeyStatus === "valid" ? (
                                  <span className="text-green-500 flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" /> Valid
                                  </span>
                                ) : broker.apiKeyStatus === "expired" ? (
                                  <span className="text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" /> Expired
                                  </span>
                                ) : (
                                  <span className="text-amber-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" /> Expires in {broker.apiKeyExpiry}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {broker.apiKeyStatus === "warning" && (
                              <ProgressBar 
                                value={70} 
                                max={100} 
                                showValue={false} 
                                className="h-1"
                                progressClassName="bg-amber-500"
                              />
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                              <Switch 
                                id={`auto-sync-${broker.id}`} 
                                checked={broker.autoSync} 
                              />
                              <Label htmlFor={`auto-sync-${broker.id}`} className="text-sm">Auto-sync</Label>
                            </div>
                            
                            <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDisconnectBroker(broker)}>
                              Disconnect
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Server className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No brokers connected</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Connect your brokerage accounts to enable automated trading and performance tracking
                  </p>
                  <Button onClick={() => setActiveTab("available")}>
                    Browse Available Brokers
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="available" className="mt-6 space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search brokers..." 
                    className="pl-8" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select 
                    value={filterRegion} 
                    onValueChange={setFilterRegion}
                  >
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="united states">United States</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="global">Global</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={filterType} 
                    onValueChange={setFilterType}
                  >
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="crypto">Crypto</SelectItem>
                      <SelectItem value="forex">Forex</SelectItem>
                      <SelectItem value="multiple">Multiple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBrokers.map((broker) => (
                  <Card key={broker.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-background rounded-md flex items-center justify-center">
                            <img 
                              src={broker.logo} 
                              alt={broker.name} 
                              className="w-8 h-8"
                              onError={handleImageError}
                            />
                          </div>
                          <CardTitle>{broker.name}</CardTitle>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getBrokerTypeIcon(broker.type)}
                          {broker.type.charAt(0).toUpperCase() + broker.type.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      <p className="text-sm text-muted-foreground mb-3">
                        {broker.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {broker.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {broker.region.join(", ")}
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Popularity:</span>
                          <span className="font-medium">{broker.popularityScore}%</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <Button 
                        className="w-full"
                        onClick={() => handleConnectBroker(broker)}
                      >
                        Connect
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredBrokers.length === 0 && (
                <div className="text-center py-10">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No brokers found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Try adjusting your search filters or contact us to request a specific broker integration
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('');
                    setFilterRegion('all');
                    setFilterType('all');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Secure Broker Connections
              </CardTitle>
              <CardDescription>
                How we protect your trading account data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <div className="bg-background p-4 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <KeyRound className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">Encrypted API Keys</h3>
                    <p className="text-sm text-muted-foreground">
                      All API keys are encrypted at rest with AES-256 and in transit with TLS 1.3
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="bg-background p-4 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">Read-Only By Default</h3>
                    <p className="text-sm text-muted-foreground">
                      We use read-only API access whenever possible to protect your funds
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="bg-background p-4 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">Verified Integrations</h3>
                    <p className="text-sm text-muted-foreground">
                      All brokers are officially vetted and connections use official APIs
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Connect Broker Dialog */}
      <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect to {connectingBroker?.name}</DialogTitle>
            <DialogDescription>
              Enter your API credentials to securely connect your account
            </DialogDescription>
          </DialogHeader>
          
          {renderConnectionForm()}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConnectDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitConnection} 
              disabled={connecting}
            >
              {connecting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BrokerConnections; 