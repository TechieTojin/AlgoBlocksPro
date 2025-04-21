
import { useState } from "react";
import { BlockLibrary } from "@/components/blocks/BlockLibrary";
import { StrategyBuilder } from "@/components/workspace/StrategyBuilder";
import { BacktestResults } from "@/components/backtesting/BacktestResults";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Save, Download } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const [activeTab, setActiveTab] = useState("build");

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full gap-4"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Strategy Builder</h1>
          <p className="text-muted-foreground">Build, test, and deploy your trading algorithms</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button size="sm">
            <Zap className="h-4 w-4 mr-2" /> Deploy
          </Button>
        </div>
      </div>

      <Tabs defaultValue="build" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="build">Build Strategy</TabsTrigger>
          <TabsTrigger value="backtest">Backtest</TabsTrigger>
          <TabsTrigger value="analyze">Analyze Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="build" className="w-full mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-15rem)]">
            <div className="h-full">
              <BlockLibrary />
            </div>
            <div className="col-span-2 h-full">
              <StrategyBuilder />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="backtest" className="mt-4">
          <div className="grid grid-cols-1 gap-4 h-[calc(100vh-15rem)]">
            <Card>
              <CardHeader>
                <CardTitle>Backtest Configuration</CardTitle>
                <CardDescription>Configure parameters for your backtest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Configure your backtest parameters and run simulations
                  </p>
                  <Button onClick={() => setActiveTab("analyze")}>
                    Run Backtest <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analyze" className="mt-4">
          <div className="grid grid-cols-1 gap-4 h-[calc(100vh-15rem)]">
            <BacktestResults />
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Index;
