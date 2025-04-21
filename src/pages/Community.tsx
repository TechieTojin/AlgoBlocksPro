
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageSquare, 
  Newspaper, 
  Calendar, 
  Search, 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Filter, 
  PlusCircle 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Community = () => {
  const [activeTab, setActiveTab] = useState("discussions");
  
  // Mock data for discussions
  const discussions = [
    {
      id: 1,
      title: "Best practices for Mean Reversion strategies in 2025",
      author: {
        name: "Sarah Johnson",
        avatar: "SJ",
        badge: "Top Contributor"
      },
      date: "2 hours ago",
      content: "I've been working on optimizing my mean reversion strategy for the current market conditions. Anyone else finding that traditional parameters need adjustment given the increased volatility?",
      replies: 12,
      likes: 28,
      tags: ["Strategy", "Mean Reversion", "Volatility"],
      isBookmarked: true
    },
    {
      id: 2,
      title: "Help debugging my RSI strategy in AlgoBlocks",
      author: {
        name: "Mike Chen",
        avatar: "MC"
      },
      date: "5 hours ago",
      content: "I'm trying to implement an RSI strategy but having trouble with the signal generation. Here's my current setup - the buy signal triggers correctly but I'm not seeing proper exits.",
      replies: 8,
      likes: 15,
      tags: ["RSI", "Debugging", "Help"],
      isBookmarked: false
    },
    {
      id: 3,
      title: "Introducing myself - new to algorithmic trading",
      author: {
        name: "Taylor Adams",
        avatar: "TA",
        badge: "New Member"
      },
      date: "Yesterday",
      content: "Hey everyone! Just joined the platform and excited to learn. I have experience in traditional trading but new to algorithmic approaches. Any beginner resources you'd recommend?",
      replies: 22,
      likes: 45,
      tags: ["Introduction", "Beginner"],
      isBookmarked: false
    }
  ];
  
  // Mock data for upcoming events
  const events = [
    {
      id: 1,
      title: "Algorithmic Trading Workshop",
      date: "Apr 22, 2025",
      time: "2:00 PM - 4:00 PM EDT",
      location: "Virtual",
      description: "Learn how to build and backtest algorithmic trading strategies with our expert traders.",
      attendees: 124
    },
    {
      id: 2,
      title: "Market Analysis Webinar",
      date: "Apr 25, 2025",
      time: "11:00 AM - 12:00 PM EDT",
      location: "Virtual",
      description: "Join us for a deep dive into current market conditions and how to adapt your strategies.",
      attendees: 87
    }
  ];
  
  // Mock data for forum members
  const topMembers = [
    {
      name: "David Kim",
      avatar: "DK",
      badge: "Expert",
      contributions: 285,
      joined: "2 years ago"
    },
    {
      name: "Lisa Wang",
      avatar: "LW",
      badge: "Moderator",
      contributions: 432,
      joined: "3 years ago"
    },
    {
      name: "Robert Chen",
      avatar: "RC",
      badge: "Top Contributor",
      contributions: 195,
      joined: "1 year ago"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Community</h1>
              <p className="text-muted-foreground mt-1">Connect with fellow algorithmic traders and share knowledge</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  className="pl-8 w-full sm:w-[250px]"
                />
              </div>
              <Button variant="default">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar */}
            <Card className="lg:col-span-1 h-fit">
              <CardHeader>
                <CardTitle>Forum Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Active Members</span>
                    </div>
                    <span className="font-semibold">12,458</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Discussions</span>
                    </div>
                    <span className="font-semibold">4,832</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Newspaper className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Articles</span>
                    </div>
                    <span className="font-semibold">726</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Events</span>
                    </div>
                    <span className="font-semibold">12</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Top Contributors</h3>
                  <div className="space-y-3">
                    {topMembers.map((member) => (
                      <div key={member.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>{member.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <Badge variant="outline" className="text-xs font-normal px-1.5 py-0">{member.badge}</Badge>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{member.contributions} posts</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Strategy</Badge>
                    <Badge variant="secondary">Backtest</Badge>
                    <Badge variant="secondary">Technical Analysis</Badge>
                    <Badge variant="secondary">Market Data</Badge>
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">Machine Learning</Badge>
                    <Badge variant="secondary">Optimization</Badge>
                    <Badge variant="secondary">Risk Management</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="discussions" onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="discussions" className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Discussions
                    </TabsTrigger>
                    <TabsTrigger value="events" className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Events
                    </TabsTrigger>
                    <TabsTrigger value="articles" className="flex items-center">
                      <Newspaper className="h-4 w-4 mr-2" />
                      Articles
                    </TabsTrigger>
                  </TabsList>
                  
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
                
                <TabsContent value="discussions" className="space-y-4">
                  {discussions.map((discussion) => (
                    <Card key={discussion.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-xl hover:text-primary cursor-pointer">{discussion.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <div className="flex items-center">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarFallback>{discussion.author.avatar}</AvatarFallback>
                                </Avatar>
                                <span>{discussion.author.name}</span>
                                {discussion.author.badge && (
                                  <Badge variant="outline" className="ml-2 text-xs px-1.5 py-0">{discussion.author.badge}</Badge>
                                )}
                              </div>
                              <span className="mx-2">•</span>
                              <span>{discussion.date}</span>
                            </CardDescription>
                          </div>
                          {discussion.isBookmarked && (
                            <Bookmark className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {discussion.content}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-between">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{discussion.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                            <MessageCircle className="h-4 w-4" />
                            <span>{discussion.replies}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm">
                          Read More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                  
                  <div className="flex justify-center">
                    <Button variant="outline">Load More</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="events" className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{event.date} • {event.time}</span>
                            </CardDescription>
                          </div>
                          <Badge>{event.location}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <p className="text-sm mt-2">{event.attendees} people attending</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">View Details</Button>
                        <Button>Register</Button>
                      </CardFooter>
                    </Card>
                  ))}
                  
                  <Card className="bg-muted/50 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">Host Your Own Event</h3>
                      <p className="text-sm text-muted-foreground text-center mt-1 mb-3">
                        Share your knowledge with the community by hosting a webinar or workshop
                      </p>
                      <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create Event
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="articles" className="space-y-4">
                  <Card className="bg-muted/50 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <Newspaper className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">Articles Coming Soon</h3>
                      <p className="text-sm text-muted-foreground text-center mt-1 mb-3">
                        We're working on bringing educational articles and tutorials to the community
                      </p>
                      <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Request Article
                      </Button>
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

export default Community;
