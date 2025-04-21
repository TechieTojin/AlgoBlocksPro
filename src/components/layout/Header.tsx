import { Github, User, BookOpen, LayoutDashboard, Home, LineChart, Settings, BookText, TrendingUp, BarChart3, Shield, Link as LinkIcon, Users, GraduationCap, Menu, LogIn, UserPlus, LogOut as LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Link, useLocation } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  
  // Simulate authentication state
  const isAuthenticated = false;
  
  // Simplified main navigation items that don't duplicate sidebar
  const routes = [
    { path: "/home", label: t("nav.home"), icon: Home },
    { path: "/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
    { path: "/strategy-builder", label: t("nav.strategy_builder"), icon: LineChart },
    { path: "/strategies", label: t("nav.my_strategies"), icon: BarChart3 }
  ];
  
  const mainNavItems = routes;
  
  const learnNavItems = [
    { path: "/learn?tab=tutorials", label: "Tutorials", description: "Step-by-step guides to get you started with algorithmic trading" },
    { path: "/learn?tab=guides", label: "Strategy Guides", description: "Detailed guides for specific trading strategies" },
    { path: "/learn?tab=courses", label: "Courses", description: "Comprehensive courses to master algorithmic trading" },
    { path: "/learn?tab=glossary", label: "Glossary", description: "Key terms and definitions for algorithmic traders" },
    { path: "/education", label: "Education Center", description: "Full learning platform with interactive content" },
  ];
  
  // Updated mobile menu items
  const mobileMenuItems = routes;
  const mobileSecondaryItems = [
    { path: "/learn", label: t("nav.learn"), icon: BookOpen },
    { path: "/settings", label: t("nav.settings"), icon: Settings },
  ];
  
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 lg:px-6">
        <SidebarTrigger className="mr-2" />
        <Link to="/" className="flex items-center gap-2 font-semibold mr-6">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">AB</span>
          </div>
          <span className="text-xl hidden sm:inline-block">{t("common.app_name")}</span>
        </Link>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {isAuthenticated && mainNavItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <Link to={item.path}>
                  <NavigationMenuLink 
                    className={cn(navigationMenuTriggerStyle(), location.pathname === item.path ? "bg-accent text-accent-foreground" : "")}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <BookText className="w-4 h-4 mr-2" />
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                  {learnNavItems.map((item) => (
                    <Link key={item.path} to={item.path} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">{item.label}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="ml-auto flex items-center gap-3">
          <LanguageSwitcher />
          
          <Button variant="ghost" size="icon" className="hidden lg:flex" asChild>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          
          <ModeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOutIcon className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/auth">
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  {t("auth.login")}
                </Button>
              </Link>
              <Link to="/auth?tab=register">
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  {t("auth.register")}
                </Button>
              </Link>
            </div>
          )}
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center gap-2 font-semibold">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground text-sm font-bold">AB</span>
                    </div>
                    <span className="text-xl">{t("common.app_name")}</span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="py-6">
                {!isAuthenticated && (
                  <div className="flex flex-col gap-2 mb-6">
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">
                        <LogIn className="h-4 w-4 mr-2" />
                        {t("auth.login")}
                      </Button>
                    </Link>
                    <Link to="/auth?tab=register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full justify-start">
                        <UserPlus className="h-4 w-4 mr-2" />
                        {t("auth.register")}
                      </Button>
                    </Link>
                  </div>
                )}
                
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground px-2 mb-2">Main Navigation</h3>
                  {mobileMenuItems.map((item) => (
                    <Button
                      key={item.path}
                      variant={location.pathname === item.path ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                      asChild
                    >
                      <Link to={item.path}>
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </div>
                
                <div className="mt-6 space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground px-2 mb-2">More Options</h3>
                  {mobileSecondaryItems.map((item) => (
                    <Button
                      key={item.path}
                      variant={location.pathname === item.path ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                      asChild
                    >
                      <Link to={item.path}>
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t">
        <div className="grid grid-cols-4 h-14">
          <Link to="/home" className="flex flex-col items-center justify-center text-xs gap-0.5">
            <Home className={cn("h-5 w-5", location.pathname === "/home" ? "text-primary" : "text-muted-foreground")} />
            <span className={cn(location.pathname === "/home" ? "text-foreground" : "text-muted-foreground")}>{t("nav.home")}</span>
          </Link>
          <Link to="/dashboard" className="flex flex-col items-center justify-center text-xs gap-0.5">
            <LayoutDashboard className={cn("h-5 w-5", location.pathname === "/dashboard" ? "text-primary" : "text-muted-foreground")} />
            <span className={cn(location.pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground")}>{t("nav.dashboard")}</span>
          </Link>
          <Link to="/strategy-builder" className="flex flex-col items-center justify-center text-xs gap-0.5">
            <LineChart className={cn("h-5 w-5", location.pathname === "/strategy-builder" ? "text-primary" : "text-muted-foreground")} />
            <span className={cn(location.pathname === "/strategy-builder" ? "text-foreground" : "text-muted-foreground")}>{t("nav.strategy_builder")}</span>
          </Link>
          <Link to="/learn" className="flex flex-col items-center justify-center text-xs gap-0.5">
            <BookOpen className={cn("h-5 w-5", location.pathname === "/learn" ? "text-primary" : "text-muted-foreground")} />
            <span className={cn(location.pathname === "/learn" ? "text-foreground" : "text-muted-foreground")}>{t("nav.learn")}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
