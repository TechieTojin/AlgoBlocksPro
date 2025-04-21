
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, LineChart, Shield, Sparkles, Blocks, TrendingUp } from "lucide-react";

export function HeroSection() {
  const { t } = useTranslation();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const chartAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.8, 
        delay: 0.4,
        ease: "easeOut" 
      } 
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-secondary/5 py-20 md:py-32">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      
      <div className="container px-4 md:px-6">
        <motion.div 
          className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                {t("common.app_name")} <span className="text-primary">Pro</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Democratizing algorithmic trading for everyone. Build, test, and deploy trading algorithms without writing code.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/strategy-builder">
                <Button size="lg" className="gap-1.5">
                  Build a Strategy <Blocks className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link to="/learn">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Blocks className="h-4 w-4 text-primary" />
                <span>No-Code Building</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span>Backtesting</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4 text-green-500" />
                <span>Analytics</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="flex items-center justify-center"
            variants={chartAnimation}
          >
            <div className="relative w-full max-w-[500px] overflow-hidden rounded-lg border bg-card/30 backdrop-blur-sm p-2 md:p-6 shadow-xl">
              <div className="absolute top-0 right-0 p-3 text-xs font-medium">
                <span className="text-green-500">+23.54%</span>
              </div>
              <div className="h-64 md:h-80">
                <TradingChartPlaceholder />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Strategy Performance</span>
                  <span className="text-lg font-medium">Moving Average Crossover</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-primary/20 p-2">
                    <LineChart className="h-4 w-4 text-primary" />
                  </div>
                  <div className="rounded-full bg-green-500/20 p-2">
                    <BarChart2 className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TradingChartPlaceholder() {
  // Realistic trading chart with candlesticks and moving averages
  return (
    <svg className="h-full w-full" viewBox="0 0 500 240">
      <defs>
        <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Grid lines */}
      <g className="opacity-20">
        <line x1="0" y1="40" x2="500" y2="40" strokeWidth="1" stroke="hsl(var(--muted-foreground))" />
        <line x1="0" y1="80" x2="500" y2="80" strokeWidth="1" stroke="hsl(var(--muted-foreground))" />
        <line x1="0" y1="120" x2="500" y2="120" strokeWidth="1" stroke="hsl(var(--muted-foreground))" />
        <line x1="0" y1="160" x2="500" y2="160" strokeWidth="1" stroke="hsl(var(--muted-foreground))" />
        <line x1="0" y1="200" x2="500" y2="200" strokeWidth="1" stroke="hsl(var(--muted-foreground))" />
        
        <line x1="50" y1="0" x2="50" y2="240" strokeWidth="1" stroke="hsl(var(--muted-foreground))" />
        <line x1="100" y1="0" x2="100" y2="240" strokeWidth="1" stroke="hsl(var(--muted-foreground))" />
        <line x1="150" y1="0" x2="150" y2="240" strokeWidth="1" stroke="hsl(var(--muted-foreground))" />
        <line x1="200" y1="0" x2="200" y2="240" strokeWidth="1" stroke="hsl(var(--muted-foreground))" />
        <line x1="250" y1="0" x2="250" y2="240" strokeWidth="1" stroke="hsl(var(--muted-foreground))" />
        <line x1="300" y1="0" x2="300" y2="240" strokeWidth="1" stroke="hsl(var(--muted-foreground))" />
        <line x1="350" y1="0" x2="350" y2="240" strokeWidth="1" stroke="hsl(var(--muted-foreground))" />
        <line x1="400" y1="0" x2="400" y2="240" strokeWidth="1" stroke="hsl(var(--muted-foreground))" />
        <line x1="450" y1="0" x2="450" y2="240" strokeWidth="1" stroke="hsl(var(--muted-foreground))" />
      </g>
      
      {/* Price area */}
      <path
        d="M0,180 L0,120 C25,140 50,80 75,100 C100,120 125,60 150,80 C175,100 200,40 225,60 C250,80 275,20 300,40 C325,60 350,20 375,40 C400,60 425,20 450,40 C475,60 500,30 500,30 L500,240 Z"
        fill="url(#chart-gradient)"
        className="opacity-75"
      />
      
      {/* Price line */}
      <path
        d="M0,120 C25,140 50,80 75,100 C100,120 125,60 150,80 C175,100 200,40 225,60 C250,80 275,20 300,40 C325,60 350,20 375,40 C400,60 425,20 450,40 C475,60 500,30 500,30"
        fill="none"
        strokeWidth="2"
        stroke="hsl(var(--primary))"
        className="opacity-75"
      />
      
      {/* Moving Average 1 */}
      <path
        d="M0,140 C25,145 50,120 75,115 C100,110 125,105 150,100 C175,90 200,80 225,75 C250,70 275,60 300,55 C325,50 350,45 375,50 C400,55 425,45 450,50 C475,55 500,45 500,45"
        fill="none"
        strokeWidth="2"
        stroke="#22CAFD"
        strokeDasharray="2,0"
        className="opacity-70"
      />
      
      {/* Moving Average 2 */}
      <path
        d="M0,155 C25,150 50,140 75,130 C100,120 125,115 150,110 C175,105 200,95 225,90 C250,85 275,75 300,70 C325,70 350,65 375,75 C400,85 425,75 450,70 C475,65 500,60 500,60"
        fill="none"
        strokeWidth="2"
        stroke="#FF6B6B"
        strokeDasharray="2,0"
        className="opacity-70"
      />
      
      {/* Buy signals */}
      <circle cx="75" cy="100" r="4" fill="#4CAF50" />
      <circle cx="200" cy="40" r="4" fill="#4CAF50" />
      <circle cx="350" cy="20" r="4" fill="#4CAF50" />
      
      {/* Sell signals */}
      <circle cx="125" cy="60" r="4" fill="#F44336" />
      <circle cx="275" cy="20" r="4" fill="#F44336" />
      <circle cx="425" cy="20" r="4" fill="#F44336" />
      
      {/* Candlesticks */}
      <g className="candlesticks">
        {Array.from({ length: 20 }).map((_, i) => {
          const x = i * 25 + 12.5;
          const isUp = Math.random() > 0.4;
          const height = Math.random() * 20 + 10;
          const wickHeight = height + Math.random() * 10;
          const y = Math.random() * 120 + 40;
          
          return (
            <g key={i}>
              {/* Wick */}
              <line 
                x1={x} 
                y1={y - wickHeight/2} 
                x2={x} 
                y2={y + wickHeight/2} 
                stroke={isUp ? "#4CAF50" : "#F44336"} 
                strokeWidth="1" 
              />
              {/* Body */}
              <rect 
                x={x - 5} 
                y={isUp ? y : y - height/2} 
                width="10" 
                height={height} 
                fill={isUp ? "#4CAF50" : "#F44336"} 
                fillOpacity="0.7" 
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
