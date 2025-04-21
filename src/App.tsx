import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import ModernLanding from "./pages/ModernLanding";
import Learn from "./pages/Learn";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Strategies from "./pages/Strategies";
import MarketData from "./pages/MarketData";
import Backtest from "./pages/Backtest";
import BacktestingPage from "./pages/BacktestingPage";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Community from "./pages/Community";
import Education from "./pages/Education";
import PerformanceReports from "./pages/PerformanceReports";
import RiskManagement from "./pages/RiskManagement";
import Connect from "./pages/Connect";
import Auth from "./pages/Auth";
import Documentation from "./pages/Documentation";
import Resources from "./pages/Resources";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Support from "./pages/Support";
import About from "./pages/About";
import Contact from "./pages/Contact";
import News from "./pages/News";
import Team from "./pages/Team";
import Roadmap from "./pages/Roadmap";
import RiskManagementSetup from "./pages/RiskManagementSetup";
import TutorialsLearningHub from "./pages/TutorialsLearningHub";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import StrategyEditor from "./pages/StrategyEditor";
import Optimization from "./pages/Optimization";
import AutomationRules from "./pages/AutomationRules";
import Portfolio from "./pages/Portfolio";
import AIStrategySuggestions from "./pages/AIStrategySuggestions";
import BrokerConnections from "./pages/BrokerConnections";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth route without MainLayout */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Modern Landing page as the root route */}
          <Route path="/" element={<ModernLanding />} />
          
          {/* Old landing page moved to /old-landing */}
          <Route path="/old-landing" element={<Landing />} />
          
          {/* All other routes with MainLayout */}
          <Route
            path="/*"
            element={
              <MainLayout>
                <Routes>
                  {/* Main routes */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/home" element={<Navigate to="/" replace />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/index" element={<Navigate to="/" replace />} />
                  
                  {/* Strategy Building */}
                  <Route path="/strategies" element={<Strategies />} />
                  <Route path="/strategy-builder" element={<Index />} />
                  <Route path="/strategy-editor" element={<StrategyEditor />} />
                  <Route path="/optimization" element={<Optimization />} />
                  <Route path="/market-data" element={<MarketData />} />
                  <Route path="/backtest" element={<Backtest />} />
                  <Route path="/backtesting" element={<BacktestingPage />} />
                  <Route path="/automation-rules" element={<AutomationRules />} />
                  <Route path="/ai-strategy-suggestions" element={<AIStrategySuggestions />} />
                  
                  {/* Analysis */}
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/performance" element={<PerformanceReports />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/risk" element={<RiskManagement />} />
                  <Route path="/risk-management" element={<RiskManagementSetup />} />
                  <Route path="/reports-analytics" element={<ReportsAnalytics />} />
                  
                  {/* System */}
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/tutorials" element={<TutorialsLearningHub />} />
                  <Route path="/connect" element={<Connect />} />
                  <Route path="/broker-connections" element={<BrokerConnections />} />
                  
                  {/* Information */}
                  <Route path="/documentation" element={<Documentation />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/roadmap" element={<Roadmap />} />
                  
                  {/* Fallback route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
