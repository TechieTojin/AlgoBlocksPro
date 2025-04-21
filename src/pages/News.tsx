import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Tag, ChevronRight, Search, Filter, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const News = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All News" },
    { id: "platform", name: "Platform Updates" },
    { id: "market", name: "Market Analysis" },
    { id: "technology", name: "Technology" },
    { id: "education", name: "Education" },
  ];

  const featuredNews = {
    title: "Major Platform Update: Enhanced Backtesting Engine",
    date: "May 2, 2024",
    category: "Platform Updates",
    tags: ["Backtesting", "Performance", "New Feature"],
    image: "https://images.unsplash.com/photo-1642964847079-3fa3c526fb30?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    content: "We're excited to announce the release of our completely revamped backtesting engine with real-time data processing capabilities, enhanced visualization tools, and AI-powered performance insights. Our new system processes historical data up to 5x faster than before while providing more detailed analytics.",
    readTime: "5 min read"
  };

  const newsItems = [
    {
      id: 1,
      title: "New AI-Powered Trading Algorithm Shows Remarkable Performance",
      date: "April 28, 2024",
      category: "Technology",
      tags: ["AI", "Machine Learning", "Trading"],
      content: "Our research team has developed a new machine learning-based trading algorithm that has shown remarkable results in recent tests, outperforming traditional strategies by up to 27% in volatile market conditions...",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Market Analysis: Q2 2024 Outlook",
      date: "April 22, 2024",
      category: "Market Analysis",
      tags: ["Analysis", "Trends", "Forecast"],
      content: "Our quarterly market analysis reveals interesting trends in algorithmic trading patterns across various asset classes. Small-cap stocks show particular promise for momentum strategies, while fixed income markets continue to respond well to mean-reversion approaches...",
      readTime: "12 min read"
    },
    {
      id: 3,
      title: "Platform Update: New Features Released",
      date: "April 16, 2024",
      category: "Platform Updates",
      tags: ["Update", "Features", "UI"],
      content: "We're excited to announce new features including improved backtesting capabilities, expanded technical indicators library, and a completely redesigned dashboard interface for better analytics visualization...",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "Educational Series: Understanding Risk Management",
      date: "April 12, 2024",
      category: "Education",
      tags: ["Education", "Risk", "Trading"],
      content: "Our new educational series kicks off with an in-depth look at algorithmic risk management. Learn essential techniques for position sizing, drawdown management, and portfolio-level risk controls...",
      readTime: "10 min read"
    },
    {
      id: 5,
      title: "Data Provider Partnerships Expanded",
      date: "April 8, 2024",
      category: "Platform Updates",
      tags: ["Data", "Partnerships", "Integration"],
      content: "We're expanding our data provider partnerships to include three additional high-quality sources for alternative data, enabling strategies built on social sentiment, satellite imagery, and supply chain insights...",
      readTime: "6 min read"
    },
    {
      id: 6,
      title: "New Optimized Execution Algorithms Available",
      date: "April 2, 2024",
      category: "Technology",
      tags: ["Execution", "Algorithms", "Performance"],
      content: "Our platform now includes a suite of optimized execution algorithms designed to minimize market impact for larger trades, with specialized variants for different asset classes and market conditions...",
      readTime: "7 min read"
    },
  ];

  // Filter news items by category and search query
  const filteredNews = newsItems.filter(item => {
    const matchesCategory = activeTab === "all" || item.category.toLowerCase().replace(/\s+/g, "") === activeTab;
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Latest Updates</Badge>
          <h1 className="text-4xl font-bold mb-4">AlgoBlocks News</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay up to date with the latest developments, market insights, and platform updates
          </p>
        </div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-60 md:h-auto md:min-h-[320px] bg-muted overflow-hidden">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary">{featuredNews.category}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {featuredNews.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                    {featuredNews.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {featuredNews.content}
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredNews.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {featuredNews.date}
                    </span>
                    <Button variant="ghost" size="sm" className="gap-1 hover:gap-2 transition-all">
                      Read article <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Filters and search */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="h-9 w-full md:w-auto overflow-auto scrollbar-none">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search articles..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.length > 0 ? (
            filteredNews.map((item, index) => (
            <motion.div
                key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.readTime}
                      </span>
                  </div>
                    <CardTitle className="text-xl line-clamp-2 hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                </CardHeader>
                  <CardContent className="py-0">
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {item.content}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-4">
                      {item.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                </CardContent>
                  <CardFooter className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {item.date}
                    </span>
                    <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-primary">
                      Read more
                    </Button>
                  </CardFooter>
              </Card>
            </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Load more button */}
        {filteredNews.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load more articles
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default News;
