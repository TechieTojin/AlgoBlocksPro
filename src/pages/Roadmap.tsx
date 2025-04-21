import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  Calendar, 
  Lightbulb, 
  Rocket, 
  BarChart4, 
  Smartphone, 
  Sparkles, 
  Cpu, 
  Lock, 
  Globe,
  Braces
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Roadmap = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const categories = [
    { id: "all", name: "All Features" },
    { id: "platform", name: "Platform" },
    { id: "analysis", name: "Analysis" },
    { id: "ai", name: "AI & ML" },
  ];
  
  const milestones = [
    {
      id: 1,
      quarter: "Q2 2024",
      title: "Platform Launch",
      category: "platform",
      description: "Initial release of the algorithmic trading platform with core functionality",
      features: [
        "Strategy building interface",
        "Basic backtesting",
        "Technical indicator library",
        "Community forum"
      ],
      completed: true,
      icon: Rocket,
    },
    {
      id: 2,
      quarter: "Q3 2024",
      title: "Advanced Analytics",
      category: "analysis",
      description: "Introduction of advanced analytics and reporting capabilities",
      features: [
        "Performance metrics dashboard",
        "Risk analysis tools",
        "Interactive equity curves",
        "Customizable reports"
      ],
      completed: false,
      icon: BarChart4,
    },
    {
      id: 3,
      quarter: "Q4 2024",
      title: "Mobile Experience",
      category: "platform",
      description: "Launch of mobile applications for iOS and Android platforms",
      features: [
        "Strategy monitoring",
        "Real-time alerts",
        "Portfolio tracking",
        "Biometric authentication"
      ],
      completed: false,
      icon: Smartphone,
    },
    {
      id: 4,
      quarter: "Q1 2025",
      title: "AI Integration",
      category: "ai",
      description: "Integration of AI-powered trading assistants and pattern recognition",
      features: [
        "Market sentiment analysis",
        "AI trading suggestions",
        "Automated strategy optimization",
        "Pattern detection"
      ],
      completed: false,
      icon: Sparkles,
    },
    {
      id: 5,
      quarter: "Q2 2025",
      title: "API & Integrations",
      category: "platform",
      description: "Expanded API access and third-party integrations",
      features: [
        "REST API for automated trading",
        "Webhook support",
        "Exchange integrations",
        "Data provider connections"
      ],
      completed: false,
      icon: Braces,
    },
    {
      id: 6,
      quarter: "Q3 2025",
      title: "Advanced ML Models",
      category: "ai",
      description: "Enhanced machine learning capabilities for strategy development",
      features: [
        "Custom ML model training",
        "Reinforcement learning strategies",
        "Alternative data processing",
        "Neural network builder"
      ],
      completed: false,
      icon: Cpu,
    },
  ];

  const filteredMilestones = 
    activeTab === "all" 
      ? milestones 
      : milestones.filter(milestone => milestone.category === activeTab);

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Development Plan</Badge>
          <h1 className="text-4xl font-bold mb-4">Product Roadmap</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our development roadmap outlines upcoming features and improvements planned for AlgoBlocks Pro. 
            We continuously update our plans based on user feedback and industry trends.
          </p>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <div className="flex justify-center">
            <TabsList>
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[15px] md:left-1/2 md:-ml-0.5 w-1 h-full bg-muted z-0" />
          
          <div className="space-y-12">
            {filteredMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline marker */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-background border-4 z-10 flex items-center justify-center">
                  {milestone.completed ? (
                    <div className="w-4 h-4 rounded-full bg-primary" />
                  ) : null}
                </div>
                
                {/* Content card */}
                <Card className={`w-full md:w-[calc(50%-2rem)] ml-12 md:ml-0 transition-all hover:shadow-lg ${
                  milestone.completed ? "border-primary/20" : ""
                }`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <Badge variant={milestone.completed ? "default" : "outline"} className="mb-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        {milestone.quarter}
                      </Badge>
                      
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10">
                        <milestone.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{milestone.title}</CardTitle>
                    <CardDescription>{milestone.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2">
                      {milestone.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <Badge variant="outline" className="mb-4">Have ideas?</Badge>
          <h2 className="text-2xl font-bold mb-4">We'd love to hear from you</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our roadmap is constantly evolving, and we value your input on which features to prioritize next.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium"
          >
            <Lightbulb className="w-4 h-4 mr-2 inline-block" />
            Submit Feature Request
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Roadmap;
