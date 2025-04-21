import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ChevronDown, 
  LifeBuoy, 
  Bookmark, 
  FileText, 
  MessageSquare, 
  Mail, 
  Video, 
  HelpCircle,
  Search,
  MessageCircle,
  BookOpen,
  GraduationCap,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqs = [
    {
      question: "How do I integrate my broker with AlgoBlocks Pro?",
      answer: "AlgoBlocks Pro supports integration with major brokers through our API connectors. Navigate to Settings > Broker Connections and select your broker from the dropdown. Follow the authentication steps to complete the integration. For detailed instructions, check our dedicated integration guide in the documentation section."
    },
    {
      question: "What data sources are available for backtesting?",
      answer: "AlgoBlocks Pro provides multiple data sources for backtesting, including premium market data from major exchanges, historical price data going back 20+ years, and the ability to import your own custom datasets in CSV format. Premium data subscriptions can be managed in the Account > Subscriptions section."
    },
    {
      question: "How accurate are the backtesting results?",
      answer: "Our backtesting engine accounts for factors like slippage, commission, and market impact to provide highly accurate results. However, remember that past performance is not indicative of future results. We recommend forward testing strategies in a paper trading environment before deploying with real capital."
    },
    {
      question: "Can I automate my trading strategies?",
      answer: "Yes, AlgoBlocks Pro offers full automation capabilities. Once you've built and tested your strategy, navigate to the Deployment section, configure your execution parameters, and choose between scheduled execution or real-time market monitoring for automatic trade execution."
    },
    {
      question: "How do I customize risk management parameters?",
      answer: "Risk management settings can be customized under the Risk Management section. You can set position sizing rules, stop-loss levels, maximum drawdown limits, and correlation filters. These settings can be applied globally or customized for individual strategies."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, AlgoBlocks Pro is optimized for desktop use. However, we offer a responsive web design that works on tablets and smartphones. A dedicated mobile app is on our roadmap for future development."
    }
  ];
  
  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="container mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-2">Customer Support</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help & Support</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get the assistance you need with AlgoBlocks Pro. Find answers to common questions or reach out to our support team.
          </p>
        </div>
        
        {/* Search Section */}
        <div className="relative mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              className="pl-10 h-12" 
              placeholder="Search for answers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="absolute right-3 top-3 flex space-x-2">
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSearchQuery("")}
                className="h-6 text-xs"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
        
        {/* Support Options */}
        <Tabs defaultValue="self-help" className="mb-16">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="self-help">Self-Help Resources</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          
          <TabsContent value="self-help">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    Documentation
                  </CardTitle>
                  <CardDescription>Comprehensive guides and references</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Explore our detailed documentation, including API references, strategy building guides, and platform tutorials.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/documentation">
                      Browse Documentation <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Knowledge Base
                  </CardTitle>
                  <CardDescription>Articles and troubleshooting guides</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Find solutions to common issues, setup instructions, and best practices for algorithmic trading.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/knowledge-base">
                      Visit Knowledge Base <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                    Learning Center
                  </CardTitle>
                  <CardDescription>Educational resources and courses</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Access our curated learning paths, from beginner to advanced, covering algorithmic trading fundamentals and strategies.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/learning">
                      Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Live Chat
                  </CardTitle>
                  <CardDescription>Instant support during business hours</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Connect with our support team for real-time assistance. Available Monday to Friday, 9am to 6pm EST.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Start Chat <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-primary" />
                    Email Support
                  </CardTitle>
                  <CardDescription>Response within 24 hours</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Send us a detailed description of your issue or question. Our team will respond within one business day.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="mailto:support@algoblocks.com">
                      Email Us <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <Video className="mr-2 h-5 w-5 text-primary" />
                    Schedule a Call
                  </CardTitle>
                  <CardDescription>One-on-one expert assistance</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Book a video call with one of our technical specialists for personalized guidance on complex issues.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/schedule-call">
                      Book Appointment <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tutorials">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>Platform basics and onboarding</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Video className="mr-2 h-4 w-4 text-primary" />
                      <a href="#" className="hover:underline">Platform Overview</a>
                    </li>
                    <li className="flex items-center">
                      <Video className="mr-2 h-4 w-4 text-primary" />
                      <a href="#" className="hover:underline">Setting Up Your Account</a>
                    </li>
                    <li className="flex items-center">
                      <Video className="mr-2 h-4 w-4 text-primary" />
                      <a href="#" className="hover:underline">Broker Integration Guide</a>
                    </li>
                    <li className="flex items-center">
                      <Video className="mr-2 h-4 w-4 text-primary" />
                      <a href="#" className="hover:underline">Navigating the Interface</a>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/tutorials/getting-started">
                      View All <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Strategy Building</CardTitle>
                  <CardDescription>Create and optimize trading strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Video className="mr-2 h-4 w-4 text-primary" />
                      <a href="#" className="hover:underline">Building Your First Strategy</a>
                    </li>
                    <li className="flex items-center">
                      <Video className="mr-2 h-4 w-4 text-primary" />
                      <a href="#" className="hover:underline">Technical Indicators Explained</a>
                    </li>
                    <li className="flex items-center">
                      <Video className="mr-2 h-4 w-4 text-primary" />
                      <a href="#" className="hover:underline">Strategy Optimization Techniques</a>
                    </li>
                    <li className="flex items-center">
                      <Video className="mr-2 h-4 w-4 text-primary" />
                      <a href="#" className="hover:underline">Risk Management Setup</a>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/tutorials/strategy-building">
                      View All <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Advanced Features</CardTitle>
                  <CardDescription>Master pro-level capabilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Video className="mr-2 h-4 w-4 text-primary" />
                      <a href="#" className="hover:underline">Advanced Backtesting Techniques</a>
                    </li>
                    <li className="flex items-center">
                      <Video className="mr-2 h-4 w-4 text-primary" />
                      <a href="#" className="hover:underline">Custom Indicator Development</a>
                    </li>
                    <li className="flex items-center">
                      <Video className="mr-2 h-4 w-4 text-primary" />
                      <a href="#" className="hover:underline">Portfolio Optimization</a>
                    </li>
                    <li className="flex items-center">
                      <Video className="mr-2 h-4 w-4 text-primary" />
                      <a href="#" className="hover:underline">API Integration & Automation</a>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/tutorials/advanced-features">
                      View All <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="community">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Community Forum
                  </CardTitle>
                  <CardDescription>Exchange ideas with fellow traders</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Join discussions on trading strategies, share your experiences, and learn from other AlgoBlocks Pro users.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/community/forum">
                      Visit Forum <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <Bookmark className="mr-2 h-5 w-5 text-primary" />
                    Strategy Marketplace
                  </CardTitle>
                  <CardDescription>Discover and share trading strategies</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Browse community-contributed strategies, customize them for your needs, or share your own creations.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/community/marketplace">
                      Explore Marketplace <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center">
                    <LifeBuoy className="mr-2 h-5 w-5 text-primary" />
                    User Groups
                  </CardTitle>
                  <CardDescription>Connect with local trading communities</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Find local and virtual user groups where you can network with other algorithmic traders in your area.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/community/user-groups">
                      Find Groups <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-2">FAQ</Badge>
            <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about AlgoBlocks Pro
            </p>
          </div>
          
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-start">
                      <HelpCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-7 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">No results found for "{searchQuery}"</p>
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </div>
          )}
            </motion.div>
        
        {/* Still Need Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-primary/5 rounded-2xl p-8 text-center"
        >
          <LifeBuoy className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Our support team is ready to assist you with any questions or technical issues you may have.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <a href="/contact">
                Contact Support
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:support@algoblocks.com">
                Email Us
              </a>
            </Button>
        </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Support;
