import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LandingFooter } from "@/components/common/LandingFooter";
import {
  ArrowRight,
  BarChart2,
  LineChart,
  TrendingUp,
  Play,
  Blocks,
  Zap,
  ShieldCheck,
  Sparkles,
  Users,
  Globe,
  MoveRight,
  CircleUser,
  BarChart3,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  LogIn,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Youtube
} from "lucide-react";

const BLUE_GRADIENT = "bg-gradient-to-r from-blue-600 to-indigo-600";

const ModernLanding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-blue-100 dark:border-blue-900/40">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <div className={`h-8 w-8 rounded-full ${BLUE_GRADIENT} flex items-center justify-center shadow-lg shadow-blue-500/20`}>
              <span className="text-white text-sm font-bold">AB</span>
            </div>
            <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 font-bold">AlgoBlocks</span>
          </div>
          
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <Link to="#features" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link>
            <Link to="#pricing" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</Link>
            <Link to="#about" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
            <Link to="#contact" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
            <Link to="/auth?tab=register">
              <Button size="sm" className={`flex items-center gap-1 ${BLUE_GRADIENT} text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all border-0`}>
                <UserPlus className="h-4 w-4" />
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features */}
        <FeaturesSection />
        
        {/* How It Works */}
        <HowItWorksSection />
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* Testimonials */}
        <TestimonialsSection />
        
        {/* Pricing */}
        <PricingSection />
        
        {/* CTA */}
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 -right-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-blue-500/5 blur-[120px]" />
        
        <div className="absolute h-screen w-full">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/[0.15] via-transparent to-transparent opacity-60"></div>
        </div>
        
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[linear-gradient(to_right,_#4a88ff0a_1px,_transparent_1px),_linear-gradient(to_bottom,_#4a88ff0a_1px,_transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
          <motion.div 
            className="flex flex-col space-y-8 md:max-w-[600px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-blue-200/40 bg-blue-50/30 dark:bg-blue-900/20 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-300">
                <span className="mr-1 text-blue-500">✨</span> Algorithmic trading for everyone
              </div>
            </div>
          
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Empowering the Future of <span className="text-blue-600 dark:text-blue-400 relative">
                Algorithmic Trading
                <svg className="absolute -bottom-2 w-full h-3 opacity-40" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,0 Q50,12 100,0" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>
          
            <p className="text-xl md:text-2xl text-muted-foreground">
              Build, test, and deploy trading strategies with zero coding.
            </p>
          
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/strategy-builder">
                <Button size="lg" className="rounded-full h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/learn">
                <Button size="lg" variant="outline" className="rounded-full h-12 px-8 border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                  Watch Demo
                </Button>
              </Link>
            </div>
          
            <div className="pt-6 flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-1">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium">No coding required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-1">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium">Backtest with historical data</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/50 p-1">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium">Advanced analytics</span>
              </div>
            </div>
          </motion.div>
        
          <motion.div
            className="flex-1 min-w-[300px]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* 3D Effect Container */}
              <div className="relative z-10 rounded-xl overflow-hidden border border-blue-200/50 dark:border-blue-800/50 shadow-2xl transform perspective-1200 rotateY-3 hover:rotateY-0 transition-transform duration-700">
                <div className="relative w-full h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur">
                  {/* Interface mockup */}
                  <div className="absolute top-0 left-0 right-0 h-10 bg-gray-100/80 dark:bg-gray-800/80 flex items-center gap-2 px-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">AlgoBlocks Strategy Builder</div>
                  </div>
                  <div className="p-4 pt-12 h-[320px]">
                    <div className="flex h-full">
                      <div className="w-1/4 border-r border-gray-200 dark:border-gray-700/50 p-2">
                        <div className="space-y-2">
                          <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded"></div>
                          <div className="bg-gray-100 dark:bg-gray-800 h-24 rounded"></div>
                          <div className="bg-gray-100 dark:bg-gray-800 h-24 rounded"></div>
                          <div className="bg-gray-100 dark:bg-gray-800 h-24 rounded"></div>
                        </div>
                      </div>
                      <div className="flex-1 p-2">
                        <div className="h-full bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700/50 p-4 flex items-center justify-center">
                          <div className="text-center">
                            <Blocks className="h-16 w-16 text-blue-500/40 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">Drag blocks here to build your strategy</p>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/4 border-l border-gray-200 dark:border-gray-700/50 p-2">
                        <div className="space-y-2">
                          <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded"></div>
                          <div className="bg-blue-100 dark:bg-blue-900/30 h-32 rounded"></div>
                          <div className="bg-gray-100 dark:bg-gray-800 h-16 rounded"></div>
                          <div className="h-8"></div>
                          <div className="bg-blue-200 dark:bg-blue-800/50 h-10 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
              
              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-6 -left-6 p-4 bg-white dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-blue-800/50 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <LineChart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">MACD Crossover</div>
                    <div className="text-xs text-muted-foreground">Indicator</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 p-4 bg-white dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-blue-800/50 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">+24.7%</div>
                    <div className="text-xs text-muted-foreground">Performance</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-4 h-4 rounded-full bg-blue-400 dark:bg-blue-600 opacity-70"></div>
      <div className="absolute top-40 right-20 w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-600 opacity-50"></div>
      <div className="absolute bottom-32 left-12 w-6 h-6 rounded-full bg-indigo-400 dark:bg-indigo-600 opacity-60"></div>
      <div className="absolute bottom-20 left-40 w-3 h-3 rounded-full bg-blue-400 dark:bg-blue-600 opacity-40"></div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Blocks,
      title: "Visual Block Building",
      description: "Drag and drop modular blocks to create complex trading algorithms without writing code."
    },
    {
      icon: LineChart,
      title: "Technical Indicators",
      description: "Access 100+ technical indicators including RSI, MACD, Bollinger Bands, and moving averages."
    },
    {
      icon: Play,
      title: "Backtesting Engine",
      description: "Test your strategies against historical data to see how they would have performed."
    },
    {
      icon: ShieldCheck,
      title: "Risk Management",
      description: "Implement position sizing, stop-loss, take-profit, and max drawdown protection rules."
    },
    {
      icon: BarChart2,
      title: "Performance Analytics",
      description: "Visualize performance metrics including P/L, Sharpe ratio, win rate, and drawdowns."
    },
    {
      icon: Zap,
      title: "Paper Trading",
      description: "Simulate trades in real market conditions without risking real money."
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center rounded-full border border-blue-200/40 bg-blue-50/30 dark:bg-blue-900/20 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-300 mb-4">
            <span className="mr-1">🔧</span> Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Build, test, and deploy trading algorithms with our comprehensive toolkit
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 relative z-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white dark:bg-gray-900 border border-blue-100 dark:border-blue-900/40 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                {/* 3D Floating Icon */}
                <div className="w-14 h-14 rounded-xl mb-5 relative flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/30 shadow-inner">
                  <feature.icon className="h-7 w-7 text-blue-600 dark:text-blue-400 transform hover:scale-110 transition-transform duration-300" />
                  {/* Decorative dots */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-400 opacity-70"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-indigo-400 opacity-70"></div>
              </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                
                {/* Learn More Link */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link to="/learn" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                    Learn more 
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Extra visual elements */}
        <div className="hidden lg:block absolute top-1/4 left-0 w-32 h-32 rounded-full bg-blue-200/20 blur-2xl"></div>
        <div className="hidden lg:block absolute bottom-1/4 right-0 w-32 h-32 rounded-full bg-indigo-200/20 blur-2xl"></div>
        
        {/* Feature highlight */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white shadow-xl shadow-blue-500/20 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,_#ffffff1a_1px,_transparent_1px),_linear-gradient(to_bottom,_#ffffff1a_1px,_transparent_1px)] bg-[size:24px_24px]"></div>
          </div>
          
          <div className="relative md:flex items-center justify-between gap-8">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to revolutionize your trading strategy?</h3>
              <p className="text-white/90 mb-6">
                Join thousands of traders already using AlgoBlocks to create and deploy sophisticated algorithms without coding.
              </p>
              <Link to="/strategy-builder">
                <Button size="lg" className="font-medium rounded-full px-6 bg-white text-blue-600 hover:bg-blue-50 shadow-lg shadow-blue-600/20">
                  Start Building Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 flex items-center justify-center">
                <Blocks className="w-20 h-20 text-white/80" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Sign Up",
      description: "Create your account in seconds and get access to all the tools you need to start your algorithmic trading journey.",
      icon: UserPlus,
      color: "primary"
    },
    {
      number: "02",
      title: "Design",
      description: "Use our intuitive drag-and-drop interface to create your trading strategy with technical indicators and custom logic.",
      icon: Blocks,
      color: "blue-500"
    },
    {
      number: "03",
      title: "Backtest",
      description: "Test your strategy against historical market data to validate its performance before risking real capital.",
      icon: Play,
      color: "blue-500"
    },
    {
      number: "04",
      title: "Deploy",
      description: "Launch your strategy to paper trading or live markets and monitor its performance in real-time.",
      icon: TrendingUp,
      color: "green-500"
    }
  ];

  return (
    <section id="about" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About AlgoBlocks</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A revolutionary platform that makes algorithmic trading accessible to everyone
          </p>
        </div>
        
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Hidden on Mobile) */}
            <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-primary/20"></div>
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative z-10"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-6 shadow-md">
                    <span className="text-2xl font-bold">{step.number}</span>
                  </div>
                  <step.icon className={`h-10 w-10 text-${step.color} mb-4`} />
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-semibold mb-4">Why AlgoBlocks?</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">No Coding Required</h4>
                  <p className="text-muted-foreground">Our visual interface allows you to build sophisticated trading algorithms without writing a single line of code.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Powerful Analytics</h4>
                  <p className="text-muted-foreground">Track and analyze your strategy performance with comprehensive metrics and visualizations.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Risk Management</h4>
                  <p className="text-muted-foreground">Built-in risk management tools to help protect your capital during volatile market conditions.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Educational Resources</h4>
                  <p className="text-muted-foreground">Access comprehensive learning materials to enhance your trading knowledge and skills.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border/60 shadow-xl">
              <img 
                src="/images/dashboard-mockup.jpg" 
                alt="AlgoBlocks Dashboard" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/800x600/5271ff/ffffff?text=AlgoBlocks+Dashboard";
                }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-background p-4 rounded-lg border border-border/60 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">25,000+</div>
                  <div className="text-xs text-muted-foreground">Active Users</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { label: "Active Users", value: "10,000+" },
    { label: "Strategies Created", value: "50,000+" },
    { label: "Success Rate", value: "73%" },
    { label: "Avg. Return", value: "+18.4%" }
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-primary-foreground/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "AlgoBlocks has completely transformed how I approach trading. The visual interface makes it so easy to create strategies that would have taken me days to code.",
      author: "Sarah J.",
      role: "Retail Investor"
    },
    {
      quote: "I've tried several algorithmic trading platforms, but AlgoBlocks stands out with its intuitive design and powerful backtesting capabilities. A game-changer for non-programmers.",
      author: "Michael T.",
      role: "Financial Advisor"
    },
    {
      quote: "As someone with no coding experience, I never thought I could create trading algorithms. AlgoBlocks has made it possible and the results have been incredible.",
      author: "David R.",
      role: "Day Trader"
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of traders who are already using AlgoBlocks
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 text-4xl">"</div>
                  <p className="flex-grow italic text-muted-foreground mb-6">{testimonial.quote}</p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for beginners to explore algorithmic trading",
      features: [
        "Basic strategy building blocks",
        "Limited backtesting",
        "1 active strategy",
        "Community support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For serious traders who want to level up",
      features: [
        "100+ advanced blocks",
        "Unlimited backtesting",
        "10 active strategies",
        "Priority support",
        "Real-time alerts",
        "Advanced analytics"
      ],
      cta: "Try Free for 14 Days",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For professional traders and institutions",
      features: [
        "All Pro features",
        "Unlimited strategies",
        "API access",
        "Custom blocks",
        "Dedicated support",
        "White-label options"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your trading needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <Card className={`h-full ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-center justify-center">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${plan.popular ? '' : 'variant-outline'}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary">
          <div className="absolute inset-0 -z-10">
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary-foreground/10 to-transparent"></div>
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-foreground/10 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary-foreground/10 blur-3xl"></div>
          </div>
          
          <div className="px-6 py-16 sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-4 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to revolutionize your trading?
              </h2>
              <p className="mt-6 text-lg leading-8 text-primary-foreground/90">
                Join thousands of traders who are already using AlgoBlocks to build sophisticated trading algorithms without writing code.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Link to="/auth?tab=register">
                  <Button size="lg" variant="secondary" className="rounded-full">
                    Get Started For Free
                  </Button>
                </Link>
                <Link to="/learn" className="flex items-center text-primary-foreground hover:underline">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="h-full flex items-center">
                <Blocks className="h-48 w-48 text-primary-foreground/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-white dark:bg-gray-900 border-t border-blue-100 dark:border-blue-900/40 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_#4a88ff0a_1px,_transparent_1px),_linear-gradient(to_bottom,_#4a88ff0a_1px,_transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      <div className="container px-4 md:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-semibold mb-4">
              <div className={`h-8 w-8 rounded-full ${BLUE_GRADIENT} flex items-center justify-center shadow-lg shadow-blue-500/20`}>
                <span className="text-white text-sm font-bold">AB</span>
              </div>
              <span className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 font-bold">AlgoBlocks</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Empowering the future of algorithmic trading through intuitive visual programming.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-500" />
                <a href="mailto:contact@algoblocks.com" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  contact@algoblocks.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-blue-500" />
                <a href="tel:+11234567890" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  +1 (123) 456-7890
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  New York, NY 10001, USA
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-gray-900 dark:text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#careers" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-gray-900 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/docs" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  API
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-gray-900 dark:text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/securities" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                  Securities Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-blue-100 dark:border-blue-900/40 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} AlgoBlocks. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="transform hover:scale-110 transition-transform">
              <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors">
                <Twitter className="h-5 w-5" />
              </div>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transform hover:scale-110 transition-transform">
              <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors">
                <Linkedin className="h-5 w-5" />
              </div>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transform hover:scale-110 transition-transform">
              <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors">
                <Github className="h-5 w-5" />
              </div>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transform hover:scale-110 transition-transform">
              <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors">
                <Youtube className="h-5 w-5" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernLanding; 