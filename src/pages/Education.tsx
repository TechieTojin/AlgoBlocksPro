
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  GraduationCap, 
  Search, 
  Library, 
  BookText, 
  Play, 
  PlayCircle, 
  ArrowRight, 
  Clock, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  Star, 
  Filter
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Education = () => {
  const [activeTab, setActiveTab] = useState("courses");
  
  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: "Algorithmic Trading Fundamentals",
      description: "Learn the basics of algorithmic trading, from strategy development to implementation",
      level: "Beginner",
      modules: 8,
      duration: "6 hours",
      enrolled: 1245,
      progress: 0,
      instructor: "Dr. Sarah Chen",
      tags: ["Fundamentals", "Strategies", "Beginners"],
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400"
    },
    {
      id: 2,
      title: "Quantitative Analysis for Trading",
      description: "Dive deep into the mathematics and statistics behind successful trading strategies",
      level: "Intermediate",
      modules: 12,
      duration: "10 hours",
      enrolled: 856,
      progress: 45,
      instructor: "Prof. Michael Johnson",
      tags: ["Quantitative", "Statistics", "Analysis"],
      image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=400"
    },
    {
      id: 3,
      title: "Advanced Backtesting Techniques",
      description: "Master advanced methods for testing and validating your trading strategies",
      level: "Advanced",
      modules: 10,
      duration: "8 hours",
      enrolled: 632,
      progress: 0,
      instructor: "Dr. Robert Zhang",
      tags: ["Backtesting", "Validation", "Advanced"],
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=400"
    }
  ];
  
  // Mock data for tutorials
  const tutorials = [
    {
      id: 1,
      title: "Building Your First Moving Average Strategy",
      description: "Step-by-step guide to creating a simple but effective moving average crossover strategy",
      duration: "45 minutes",
      views: 5280,
      category: "Strategy Building",
      author: "Jessica Miller",
      date: "Mar 15, 2025"
    },
    {
      id: 2,
      title: "Using RSI for Market Entry and Exit",
      description: "Learn how to use Relative Strength Index for optimal trade timing",
      duration: "35 minutes",
      views: 3755,
      category: "Technical Indicators",
      author: "David Kim",
      date: "Apr 2, 2025"
    },
    {
      id: 3,
      title: "Optimizing Your Strategy Parameters",
      description: "Techniques for finding the optimal parameters for your trading strategies",
      duration: "50 minutes",
      views: 2920,
      category: "Optimization",
      author: "Alex Thompson",
      date: "Apr 10, 2025"
    }
  ];
  
  // Mock data for glossary terms
  const glossaryTerms = [
    {
      term: "Algorithm",
      definition: "A set of rules or instructions given to a computer to complete a specific task. In trading, algorithms are used to execute trades based on predefined conditions."
    },
    {
      term: "Backtesting",
      definition: "The process of testing a trading strategy on historical data to determine how it would have performed in the past."
    },
    {
      term: "Drawdown",
      definition: "The peak-to-trough decline during a specific period for an investment or trading account. It is typically quoted as a percentage."
    },
    {
      term: "Execution",
      definition: "The process of completing a buy or sell order in the market. Execution quality refers to speed and price at which orders are completed."
    },
    {
      term: "Latency",
      definition: "The time delay between when a signal is sent and when it is received. In trading, low latency is critical for high-frequency strategies."
    }
  ];
  
  // Featured courses for the sidebar
  const featuredCourses = [
    {
      title: "Machine Learning for Trading",
      students: 2145,
      rating: 4.8
    },
    {
      title: "Risk Management Essentials",
      students: 1873,
      rating: 4.7
    },
    {
      title: "Technical Analysis Masterclass",
      students: 3251,
      rating: 4.9
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center">
                <GraduationCap className="h-8 w-8 mr-2 text-primary" />
                Learning Center
              </h1>
              <p className="text-muted-foreground mt-1">Master algorithmic trading with our comprehensive resources</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  className="pl-8 w-full md:w-[250px]"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <Card className="lg:col-span-1 h-fit">
              <CardHeader>
                <CardTitle>Learning Paths</CardTitle>
                <CardDescription>Structured paths to develop your skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        <Library className="h-4 w-4" />
                      </div>
                      <span className="group-hover:text-primary">Algorithmic Trading Fundamentals</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                  
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                        <BookText className="h-4 w-4" />
                      </div>
                      <span className="group-hover:text-primary">Technical Analysis Mastery</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                  
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <span className="group-hover:text-primary">Advanced Strategy Development</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Featured Courses</h3>
                  <div className="space-y-3">
                    {featuredCourses.map((course, index) => (
                      <div key={index} className="flex items-start group cursor-pointer">
                        <div className="h-10 w-10 bg-muted rounded flex items-center justify-center mr-3 text-muted-foreground">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium group-hover:text-primary">{course.title}</p>
                          <div className="flex items-center mt-1">
                            <div className="flex items-center mr-3">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span className="text-xs">{course.rating}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{course.students} students</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="rounded-lg border p-4 bg-muted/50">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-medium">AlgoBlocks Academy</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Get certified as an Algorithmic Trading Professional with our comprehensive program.
                  </p>
                  <Button className="w-full mt-3" variant="outline">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              <Tabs defaultValue="courses" onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="courses" className="flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Courses
                  </TabsTrigger>
                  <TabsTrigger value="tutorials" className="flex items-center justify-center">
                    <Play className="h-4 w-4 mr-2" />
                    Tutorials
                  </TabsTrigger>
                  <TabsTrigger value="glossary" className="flex items-center justify-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Glossary
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="courses" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <Card key={course.id} className="overflow-hidden flex flex-col">
                        <div className="relative h-40 w-full overflow-hidden">
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            className="object-cover w-full h-full transition-transform hover:scale-105"
                          />
                          <Badge className="absolute top-2 right-2">{course.level}</Badge>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2 flex-grow">
                          <div className="flex justify-between text-sm mb-2">
                            <div className="flex items-center">
                              <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{course.modules} modules</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{course.duration}</span>
                            </div>
                          </div>
                          
                          {course.progress > 0 ? (
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>
                          ) : (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Instructor: {course.instructor}</span>
                              <span className="text-muted-foreground">{course.enrolled} enrolled</span>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="pt-2 border-t mt-auto">
                          <Button className="w-full" variant={course.progress > 0 ? "default" : "outline"}>
                            {course.progress > 0 ? "Continue Learning" : "Enroll Now"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="outline">
                      View All Courses
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="tutorials" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutorials.map((tutorial) => (
                      <Card key={tutorial.id} className="overflow-hidden flex flex-col h-full">
                        <CardHeader className="pb-2">
                          <Badge className="w-fit mb-2">{tutorial.category}</Badge>
                          <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{tutorial.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2 flex-grow">
                          <div className="flex justify-between text-sm mb-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{tutorial.duration}</span>
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{tutorial.views.toLocaleString()} views</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">By: {tutorial.author}</span>
                            <span className="text-muted-foreground">{tutorial.date}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2 border-t mt-auto">
                          <Button className="w-full" variant="outline">
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Watch Tutorial
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="outline">
                      View All Tutorials
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="glossary" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Algorithmic Trading Glossary</CardTitle>
                      <CardDescription>Key terms and definitions for algorithmic traders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {glossaryTerms.map((item, index) => (
                          <div key={index}>
                            <h3 className="text-lg font-semibold flex items-center">
                              <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                              {item.term}
                            </h3>
                            <p className="mt-1 text-muted-foreground ml-7">{item.definition}</p>
                            {index < glossaryTerms.length - 1 && <Separator className="mt-4" />}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Showing 5 of 124 terms
                      </div>
                      <Button variant="outline">
                        View Full Glossary
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Suggested Reading</CardTitle>
                      <CardDescription>Recommended books and articles</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <div className="h-16 w-12 bg-muted rounded flex items-center justify-center">
                            <BookText className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Algorithmic Trading: Winning Strategies</h4>
                            <p className="text-xs text-muted-foreground mt-1">By Ernest P. Chan</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="h-16 w-12 bg-muted rounded flex items-center justify-center">
                            <BookText className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Quantitative Trading: How to Build Your Own System</h4>
                            <p className="text-xs text-muted-foreground mt-1">By Ernest P. Chan</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="h-16 w-12 bg-muted rounded flex items-center justify-center">
                            <BookText className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Building Reliable Trading Systems</h4>
                            <p className="text-xs text-muted-foreground mt-1">By Keith Fitschen</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="h-16 w-12 bg-muted rounded flex items-center justify-center">
                            <BookText className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Inside the Black Box: The Simple Truth About Quantitative Trading</h4>
                            <p className="text-xs text-muted-foreground mt-1">By Rishi K. Narang</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
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

export default Education;
