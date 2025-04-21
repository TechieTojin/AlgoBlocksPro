import { useEffect } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureSection } from "@/components/home/FeatureSection";
import { CTASection } from "@/components/home/CTASection";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Blocks, LineChart, BarChart2, Play, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { LandingFooter } from "@/components/common/LandingFooter";

const Landing = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="py-20 bg-background"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                How AlgoBlocks Works
              </h2>
              <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                Build sophisticated trading algorithms without writing code. Our drag-and-drop interface makes algorithmic trading accessible to everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                {...fadeIn}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                      <Blocks className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">1. Build</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your strategy using our intuitive drag-and-drop interface. Combine technical indicators, entry/exit rules, and risk management.
                    </p>
                    <Link to="/strategy-builder">
                      <Button variant="link" className="p-0 h-auto">
                        Start Building <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div 
                {...fadeIn}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-500/10 mb-4">
                      <Play className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">2. Test</h3>
                    <p className="text-muted-foreground mb-4">
                      Backtest your strategy against historical market data. Analyze performance metrics and refine your approach.
                    </p>
                    <Link to="/backtest">
                      <Button variant="link" className="p-0 h-auto">
                        Try Backtesting <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div 
                {...fadeIn}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="rounded-full w-12 h-12 flex items-center justify-center bg-green-500/10 mb-4">
                      <TrendingUp className="h-6 w-6 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">3. Deploy</h3>
                    <p className="text-muted-foreground mb-4">
                      Deploy your strategy to live markets or paper trading. Monitor performance and make adjustments in real-time.
                    </p>
                    <Link to="/strategies">
                      <Button variant="link" className="p-0 h-auto">
                        View Strategies <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="py-20 bg-muted/30"
        >
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Powerful Features for Traders
              </h2>
              <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                AlgoBlocks provides all the tools you need to create, test, and deploy professional-grade trading algorithms.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Visual Strategy Builder",
                  description: "Drag-and-drop interface to create sophisticated trading algorithms without coding",
                  icon: Blocks,
                  color: "primary"
                },
                {
                  title: "Advanced Backtesting",
                  description: "Test strategies against historical data with detailed performance metrics",
                  icon: Play,
                  color: "blue-500"
                },
                {
                  title: "Performance Analytics",
                  description: "Comprehensive analytics to measure and improve your strategy performance",
                  icon: BarChart2,
                  color: "green-500"
                },
                {
                  title: "Technical Indicators",
                  description: "Over 100+ technical indicators and chart patterns to choose from",
                  icon: LineChart,
                  color: "orange-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className={`rounded-full w-12 h-12 flex items-center justify-center bg-${feature.color}/10 mb-4`}>
                        <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <CTASection />
        </motion.div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default Landing;
