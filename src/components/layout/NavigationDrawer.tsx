import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  PackageSearch,
  Mail,
  Users,
  CalendarRange,
  Home,
  HelpCircle,
  MessagesSquare,
  Info,
  DollarSign,
  BarChart2,
  LineChart,
  TrendingUp,
  Blocks,
  Play,
  Database,
  Settings,
  Rocket,
  Server,
  Shield,
  GraduationCap,
  PieChart,
  GanttChartSquare,
  Workflow,
  Gem,
  Book,
  FilePieChart,
  Clock,
  Briefcase,
  Link2,
  Sparkles,
  Brain,
  Loader2,
  CheckCircle2,
  Zap,
  Command,
  LucideIcon,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Wallet,
  ExternalLink,
  MoveUpRight,
  Target,
  Languages,
  Globe,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Organized navigation items with clearer grouping and badges for new/updated items
const navigationItems = [
  {
    group: "Main",
    items: [
      { title: "Home", icon: Home, path: "/", badge: null },
      { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard", badge: null },
    ],
  },
  {
    group: "Strategy Building",
    items: [
      { title: "Strategy Editor", icon: LineChart, path: "/strategy-editor", badge: null },
      { title: "Optimization", icon: Gem, path: "/optimization", badge: "New" },
      { title: "Backtest", icon: Play, path: "/backtest", badge: null },
      { title: "Advanced Backtesting", icon: BarChart2, path: "/backtesting", badge: "Updated" },
      { title: "Automation Rules", icon: Clock, path: "/automation-rules", badge: null },
      { title: "AI Strategy Suggestions", icon: Sparkles, path: "/ai-strategy-suggestions", badge: "AI" },
      { title: "Reports & Analytics", icon: FilePieChart, path: "/reports-analytics", badge: null },
      { title: "Market Data", icon: Database, path: "/market-data", badge: null },
    ],
  },
  {
    group: "Analysis",
    items: [
      { title: "Portfolio", icon: Briefcase, path: "/portfolio", badge: null },
      { title: "Performance", icon: BarChart2, path: "/performance", badge: null },
      { title: "Analytics", icon: LineChart, path: "/analytics", badge: null },
      { title: "Risk Management", icon: Shield, path: "/risk", badge: null },
      { title: "Risk Management Setup", icon: Shield, path: "/risk-management", badge: null },
    ],
  },
  {
    group: "Learn",
    items: [
      { title: "Documentation", icon: FileText, path: "/documentation", badge: null },
      { title: "Education", icon: BookOpen, path: "/education", badge: null },
      { title: "Tutorials & Learning", icon: GraduationCap, path: "/tutorials", badge: null },
      { title: "Resources", icon: PackageSearch, path: "/resources", badge: null },
      { title: "Blog", icon: FileText, path: "/blog", badge: null },
    ],
  },
  {
    group: "Connect",
    items: [
      { title: "Community", icon: MessagesSquare, path: "/community", badge: null },
      { title: "Broker Connections", icon: Link2, path: "/broker-connections", badge: "New" },
      { title: "Connect APIs", icon: Server, path: "/connect", badge: null },
    ],
  },
  {
    group: "Company",
    items: [
      { title: "About", icon: Info, path: "/about", badge: null },
      { title: "Team", icon: Users, path: "/team", badge: null },
      { title: "Contact", icon: Mail, path: "/contact", badge: null },
      { title: "Support", icon: HelpCircle, path: "/support", badge: null },
    ],
  },
  {
    group: "Updates",
    items: [
      { title: "Roadmap", icon: Rocket, path: "/roadmap", badge: null },
      { title: "News", icon: CalendarRange, path: "/news", badge: null },
      { title: "Pricing", icon: DollarSign, path: "/pricing", badge: null },
    ],
  },
];

// Loading stages for connection animation
const connectionStages = [
  { message: "Establishing connection to Fluvio Server...", percentage: 20 },
  { message: "Authenticating credentials...", percentage: 40 },
  { message: "Loading market data...", percentage: 60 },
  { message: "Syncing account information...", percentage: 80 },
  { message: "Connection established", percentage: 100 },
];

// Language options with their native names
const languageOptions = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" }
];

export function NavigationDrawer() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [isConnecting, setIsConnecting] = useState(true);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Handle window resize events
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      // Auto-collapse on mobile if not explicitly opened
      if (isMobileView && !isMobileOpen) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileOpen]);

  // Close mobile drawer when navigating to a new page
  useEffect(() => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Simulate the connection animation on initial load
  useEffect(() => {
    if (isConnecting) {
      const interval = setInterval(() => {
        setConnectionProgress((prev) => {
          if (prev < 100) {
            // Move to next stage when reaching stage percentage
            if (
              prev >=
              connectionStages[currentStage].percentage
            ) {
              setCurrentStage((prev) =>
                prev < connectionStages.length - 1 ? prev + 1 : prev
              );
            }
            return prev + 2; // Increment by 2% each time
          }
          clearInterval(interval);
          setShowCheckmark(true);
          setTimeout(() => setIsConnecting(false), 1000); // Show checkmark for 1 second
          return 100;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isConnecting, currentStage]);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
    // When on mobile, treat toggling as opening/closing
    if (isMobile) {
      setIsMobileOpen(!isCollapsed);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
    // When opening mobile menu, make sure drawer is expanded
    if (!isMobileOpen) {
      setIsCollapsed(false);
    }
  };

  // Function to handle language change
  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem("language", languageCode);
    // Reload window to apply translations across the application
    window.location.reload();
  };

  return (
    <>
      {/* Mobile Menu Toggle Button - Always visible on mobile */}
      {isMobile && (
        <Button
          onClick={toggleMobileMenu}
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      )}

      <AnimatePresence mode="wait">
        {/* Mobile overlay */}
        {isMobile && isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {isConnecting ? (
          <motion.div
            key="connecting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen flex items-center justify-center bg-background border-r"
            style={{ width: "280px" }}
          >
            <div className="w-64 flex flex-col items-center justify-center space-y-6 p-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                {showCheckmark ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </motion.div>
                ) : (
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                )}
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">
                  {connectionStages[currentStage].message}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Please wait while we establish a secure connection
                </p>
              </div>
              
              <div className="w-full space-y-2">
                <Progress value={connectionProgress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Connecting to Fluvio Server</span>
                  <span>{Math.round(connectionProgress)}%</span>
                </div>
              </div>
              
              <div className="flex items-center text-xs text-muted-foreground">
                <Server className="h-3 w-3 mr-1" />
                <span>api.fluvio.trading</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="sidebar"
            initial={isMobile ? { x: -280 } : { opacity: 0, x: -20 }}
            animate={
              isMobile 
                ? isMobileOpen 
                  ? { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } } 
                  : { x: -280, transition: { type: "spring", stiffness: 300, damping: 30 } }
                : { opacity: 1, x: 0, transition: { duration: 0.3 } }
            }
            exit={isMobile ? { x: -280 } : { opacity: 0, x: -20 }}
            className={`fixed top-0 left-0 h-screen z-40 md:relative ${isMobile ? "" : "relative"}`}
          >
            <button
              onClick={toggleCollapsed}
              className={`absolute -right-3 top-20 z-10 bg-background border shadow-sm rounded-full p-1.5 transform transition-transform hover:scale-110 ${
                isMobile ? "hidden" : "flex"
              }`}
            >
              {isCollapsed ? (
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              ) : (
                <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </button>
            
            <Sidebar 
              className={`transition-all duration-300 h-screen ${
                isCollapsed ? 'w-[70px]' : 'w-64'
              } border-r bg-background shadow-sm`}
            >
              <SidebarContent className="scrollbar-none overflow-y-auto max-h-screen pb-10">
                <div className={`p-4 mb-2 flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
                  <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground text-sm font-bold">AB</span>
                  </div>
                  {!isCollapsed && (
                    <motion.span 
                      className="text-xl ml-2 font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {t("common.app_name")}
                    </motion.span>
                  )}
                </div>

                {navigationItems.map((group) => (
                  <SidebarGroup key={group.group} className="mb-1">
                    {!isCollapsed && (
                      <SidebarGroupLabel className="text-xs font-medium px-4">
                        {group.group}
                      </SidebarGroupLabel>
                    )}
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {group.items.map((item) => (
                          <SidebarMenuItem key={item.path}>
                            <TooltipProvider delayDuration={0}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === item.path}
                                    tooltip={isCollapsed ? item.title : undefined}
                                    onMouseEnter={() => setHoveredItem(item.path)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className={`group transition-all duration-200 ${
                                      isCollapsed ? 'justify-center px-2' : ''
                                    }`}
                                  >
                                    <Link 
                                      to={item.path} 
                                      className="transition-colors relative"
                                    >
                                      <motion.div 
                                        className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}
                                        initial={false}
                                        animate={{ 
                                          x: isCollapsed ? 0 : 0,
                                        }}
                                      >
                                        <item.icon className={`${
                                          isCollapsed ? 'h-5 w-5' : 'h-4 w-4'
                                        } ${
                                          location.pathname === item.path 
                                            ? 'text-primary' 
                                            : 'text-muted-foreground group-hover:text-foreground'
                                        }`} />
                                        
                                        {!isCollapsed && (
                                          <motion.span
                                            initial={{ opacity: isCollapsed ? 0 : 1 }}
                                            animate={{ opacity: isCollapsed ? 0 : 1 }}
                                            className="ml-2 text-sm"
                                          >
                                            {item.title}
                                          </motion.span>
                                        )}
                                        
                                        {!isCollapsed && item.badge && (
                                          <Badge 
                                            variant={item.badge === "New" ? "default" : "outline"} 
                                            className={`ml-auto text-[0.65rem] h-4 ${item.badge === "AI" ? "bg-blue-500 hover:bg-blue-500/80" : ""}`}
                                          >
                                            {item.badge}
                                          </Badge>
                                        )}
                                      </motion.div>
                                      
                                      {/* Active indicator */}
                                      {location.pathname === item.path && (
                                        <motion.div
                                          layoutId="activeIndicator"
                                          className="absolute left-0 w-1 h-full rounded-r-sm bg-primary"
                                          style={{ top: 0 }}
                                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                      )}
                                      
                                      {/* Dot indicator for collapsed badges */}
                                      {isCollapsed && item.badge && (
                                        <div className={`absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full ${
                                          item.badge === "New" ? "bg-primary" : 
                                          item.badge === "AI" ? "bg-blue-500" :
                                          "bg-orange-500"
                                        }`} />
                                      )}
                                    </Link>
                                  </SidebarMenuButton>
                                </TooltipTrigger>
                                {isCollapsed && (
                                  <TooltipContent side="right" className="flex items-center">
                                    {item.title}
                                    {item.badge && (
                                      <Badge 
                                        variant={item.badge === "New" ? "default" : "outline"} 
                                        className={`ml-2 text-[0.65rem] h-4 ${item.badge === "AI" ? "bg-blue-500 hover:bg-blue-500/80" : ""}`}
                                      >
                                        {item.badge}
                                      </Badge>
                                    )}
                                  </TooltipContent>
                                )}
                              </Tooltip>
                            </TooltipProvider>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))}
                
                {/* Language Switcher */}
                <div className={`px-4 mt-auto pt-4 ${isCollapsed ? 'text-center' : ''}`}>
                  {!isCollapsed ? (
                    <div className="mb-4">
                      <h4 className="text-xs font-medium mb-2 text-muted-foreground">Language</h4>
                      <Select 
                        defaultValue={i18n.language} 
                        onValueChange={handleLanguageChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languageOptions.map(lang => (
                            <SelectItem key={lang.code} value={lang.code}>
                              <div className="flex items-center">
                                <span className="mr-2">{lang.flag}</span>
                                <span>{lang.nativeName}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="flex justify-center mb-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                // On collapsed view, clicking the language button expands the drawer
                                setIsCollapsed(false);
                                setIsMobileOpen(true);
                              }}
                            >
                              <Globe className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            Switch Language
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
                
                {/* Connection status indicator */}
                <div className={`p-4 opacity-70 ${isCollapsed ? 'text-center' : ''}`}>
                  <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} text-xs text-muted-foreground`}>
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5" />
                    {!isCollapsed && <span>Connected to Fluvio</span>}
                  </div>
                </div>
              </SidebarContent>
            </Sidebar>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
