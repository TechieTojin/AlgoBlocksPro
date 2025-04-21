import React from "react";
import { CardDemo } from "@/components/custom/card-demo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, Book, FileText, Code, CheckCircle } from "lucide-react";

const TutorialsLearningHub: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tutorials & Learning Hub</h1>
        <div className="flex gap-2">
          <Button variant="outline">Bookmarks</Button>
          <Button>My Progress</Button>
        </div>
      </div>

      <Tabs defaultValue="video-tutorials" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="video-tutorials">Video Tutorials</TabsTrigger>
          <TabsTrigger value="guides">Written Guides</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="code-examples">Code Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="video-tutorials">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videoTutorials.map((tutorial, index) => (
              <TutorialCard 
                key={index}
                title={tutorial.title}
                description={tutorial.description}
                icon={<PlayCircle className="w-5 h-5 mr-2" />}
                category="Video Tutorial"
                duration={tutorial.duration}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.map((guide, index) => (
              <TutorialCard 
                key={index}
                title={guide.title}
                description={guide.description}
                icon={<Book className="w-5 h-5 mr-2" />}
                category="Written Guide"
                duration={guide.duration}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course, index) => (
              <CourseCard 
                key={index}
                title={course.title}
                description={course.description}
                lessons={course.lessons}
                progress={course.progress}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="code-examples">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {codeExamples.map((example, index) => (
              <TutorialCard 
                key={index}
                title={example.title}
                description={example.description}
                icon={<Code className="w-5 h-5 mr-2" />}
                category="Code Example"
                duration={example.duration}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TutorialCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  duration: string;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ title, description, icon, category, duration }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <div className="flex items-center text-sm text-muted-foreground">
            {icon} {category} • {duration}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">Save</Button>
        <Button size="sm">Start Learning</Button>
      </CardFooter>
    </Card>
  );
};

interface CourseCardProps {
  title: string;
  description: string;
  lessons: number;
  progress: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, lessons, progress }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <div className="flex items-center text-sm text-muted-foreground">
            <FileText className="w-5 h-5 mr-2" /> {lessons} lessons
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{description}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Progress: {progress}%</span>
          <span>{Math.round(lessons * progress / 100)}/{lessons} completed</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">Course Details</Button>
        <Button size="sm">Continue</Button>
      </CardFooter>
    </Card>
  );
};

// Sample data
const videoTutorials = [
  {
    title: "Getting Started with AlgoBlocks Pro",
    description: "Learn the basics of setting up your first algorithmic trading strategy using our platform.",
    duration: "15 min",
  },
  {
    title: "Risk Management Fundamentals",
    description: "Understand how to effectively manage risk in your trading strategies to protect your capital.",
    duration: "22 min",
  },
  {
    title: "Advanced Backtesting Techniques",
    description: "Master the art of backtesting to properly validate your trading strategies before going live.",
    duration: "28 min",
  },
  {
    title: "Technical Indicators Explained",
    description: "A comprehensive overview of popular technical indicators and how to incorporate them.",
    duration: "35 min",
  },
  {
    title: "Creating Custom Strategies",
    description: "Learn how to develop your own custom trading strategies using our drag-and-drop interface.",
    duration: "40 min",
  },
  {
    title: "Market Analysis Fundamentals",
    description: "Discover essential techniques for analyzing market conditions and identifying opportunities.",
    duration: "25 min",
  },
];

const guides = [
  {
    title: "Algorithmic Trading Fundamentals",
    description: "A comprehensive guide to understanding the basics of algorithmic trading and its components.",
    duration: "10 min read",
  },
  {
    title: "Data Analysis for Traders",
    description: "Learn how to interpret and analyze market data to make informed trading decisions.",
    duration: "15 min read",
  },
  {
    title: "Strategy Optimization Guide",
    description: "Step-by-step instructions for optimizing your trading strategies for maximum performance.",
    duration: "12 min read",
  },
  {
    title: "API Integration Manual",
    description: "Detailed instructions on integrating with various broker APIs and data providers.",
    duration: "20 min read",
  },
  {
    title: "Risk-to-Reward Ratio Explained",
    description: "Understanding the importance of proper risk-to-reward ratios in your trading plans.",
    duration: "8 min read",
  },
  {
    title: "Implementing Stop-Loss Strategies",
    description: "Best practices for implementing effective stop-loss mechanisms to protect your capital.",
    duration: "10 min read",
  },
];

const courses = [
  {
    title: "Algorithmic Trading Masterclass",
    description: "A complete course covering all aspects of algorithmic trading from basics to advanced concepts.",
    lessons: 12,
    progress: 35,
  },
  {
    title: "Technical Analysis for Algo Traders",
    description: "Learn how to incorporate technical analysis into your automated trading systems.",
    lessons: 8,
    progress: 50,
  },
  {
    title: "Python for Algorithmic Trading",
    description: "Master Python programming specifically tailored for developing trading algorithms and systems.",
    lessons: 15,
    progress: 20,
  },
  {
    title: "Risk Management Framework",
    description: "Build a comprehensive risk management framework to protect your trading capital.",
    lessons: 6,
    progress: 0,
  },
];

const codeExamples = [
  {
    title: "Moving Average Crossover Strategy",
    description: "Implementation of a simple yet effective moving average crossover strategy with position sizing.",
    duration: "5 min",
  },
  {
    title: "Mean Reversion Strategy",
    description: "Code example demonstrating a mean reversion strategy based on Bollinger Bands.",
    duration: "8 min",
  },
  {
    title: "RSI Overbought/Oversold Strategy",
    description: "Implementation of a trading strategy based on RSI indicator extremes.",
    duration: "6 min",
  },
  {
    title: "Volatility Breakout System",
    description: "A complete volatility breakout trading system with dynamic position sizing based on ATR.",
    duration: "10 min",
  },
  {
    title: "Multi-Timeframe Analysis",
    description: "Code showing how to implement analysis across multiple timeframes for better signal confirmation.",
    duration: "7 min",
  },
  {
    title: "Custom Indicator Development",
    description: "Example of how to create your own custom indicator based on price action patterns.",
    duration: "12 min",
  },
];

export default TutorialsLearningHub; 