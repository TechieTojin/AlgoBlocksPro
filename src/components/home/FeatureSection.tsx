
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Cpu, LineChart, ShieldCheck, Zap, ArrowUpRight } from "lucide-react";

export function FeatureSection() {
  return (
    <div className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Key Features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            AlgoBlocks provides everything you need to create, test, and optimize your trading strategies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Zap}
            title="Drag-and-Drop Builder"
            description="Create complex trading algorithms without writing a single line of code using our intuitive block-based interface."
          />
          <FeatureCard
            icon={BarChart}
            title="Robust Backtesting"
            description="Test your strategies against historical market data to evaluate performance before risking real capital."
          />
          <FeatureCard
            icon={LineChart}
            title="Technical Indicators"
            description="Access a comprehensive library of technical indicators including moving averages, RSI, MACD, and more."
          />
          <FeatureCard
            icon={Cpu}
            title="Strategy Optimization"
            description="Fine-tune your algorithms with parameter optimization to maximize performance."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Risk Management"
            description="Implement robust risk management rules to protect your capital during adverse market conditions."
          />
          <FeatureCard
            icon={ArrowUpRight}
            title="Performance Analytics"
            description="Gain insights into your strategy's performance with detailed metrics and visualizations."
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-2">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
