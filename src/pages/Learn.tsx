import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Play, BookOpen, Lightbulb, ArrowRight, GraduationCap } from "lucide-react";

const Learn = () => {
  // Sample data for the learning sections
  const tutorials = [
    {
      title: "Getting Started with AlgoBlocks",
      desc: "Learn the basics of building your first trading strategy",
      level: "Beginner",
      duration: "15 min",
    },
    {
      title: "Technical Indicators 101",
      desc: "Understanding and using common technical indicators",
      level: "Beginner",
      duration: "20 min",
    },
    {
      title: "Backtesting Strategies",
      desc: "How to backtest your trading strategies effectively",
      level: "Intermediate",
      duration: "25 min",
    },
  ];
  
  const guides = [
    {
      title: "Moving Average Crossover Strategy",
      desc: "A complete guide to implementing a moving average crossover strategy",
      readTime: "10 min",
    },
    {
      title: "RSI Oscillator Strategy",
      desc: "Using the Relative Strength Index for buy and sell signals",
      readTime: "12 min",
    },
    {
      title: "Bollinger Bands Trading",
      desc: "Learn to trade with Bollinger Bands for volatility breakouts",
      readTime: "15 min",
    },
  ];
  
  const courses = [
    {
      title: "Algorithmic Trading Fundamentals",
      desc: "A comprehensive introduction to the world of algorithmic trading",
      duration: "4 weeks",
      modules: 12,
      level: "Beginner",
    },
    {
      title: "Advanced Technical Analysis",
      desc: "Master advanced technical indicators and chart patterns",
      duration: "6 weeks",
      modules: 18,
      level: "Intermediate",
    },
  ];
  
  const glossary = [
    {
      term: "Algorithm",
      definition: "A specific set of clearly defined instructions aimed to carry out a task or process."
    },
    {
      term: "Backtesting",
      definition: "The process of testing a trading strategy on historical data to determine its viability."
    },
    {
      term: "Execution",
      definition: "The process of completing a buy or sell order in the market."
    },
    {
      term: "Slippage",
      definition: "The difference between the expected price of a trade and the price at which the trade is executed."
    },
    {
      term: "Technical Indicator",
      definition: "A mathematical calculation based on price, volume, or open interest of a security or contract."
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learn Algorithmic Trading</h1>
        <p className="text-muted-foreground text-lg">
          Master the art and science of algorithmic trading with our comprehensive resources
        </p>
      </div>
      
      <Tabs defaultValue="tutorials" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="guides">Strategy Guides</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="glossary">Trading Glossary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tutorials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-algo-purple-300 to-algo-blue-300 flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{tutorial.title}</CardTitle>
                  <CardDescription>{tutorial.desc}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="h-4 w-4" />
                    <span>Level: {tutorial.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{tutorial.duration}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Start Tutorial
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button>
              View All Tutorials
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="guides" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-algo-blue-300 to-algo-blue-700 flex items-center justify-center">
                  <Lightbulb className="h-12 w-12 text-white" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription>{guide.desc}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{guide.readTime} read</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Guide
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button>
              View All Guides
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-gradient-to-br from-algo-purple-500 to-algo-purple-900 flex items-center justify-center p-6">
                    <GraduationCap className="h-16 w-16 text-white" />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader className="pb-2">
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.desc}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Duration:</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Modules:</span>
                        <span>{course.modules} modules</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Level:</span>
                        <span>{course.level}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        Enroll Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="glossary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Algorithmic Trading Glossary</CardTitle>
              <CardDescription>Essential terms and definitions for algorithmic traders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {glossary.map((item, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <h3 className="font-bold text-lg">{item.term}</h3>
                    <p className="text-muted-foreground">{item.definition}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Full Glossary
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Learn;

