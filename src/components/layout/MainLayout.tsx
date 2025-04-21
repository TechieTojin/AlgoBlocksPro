import { NavigationDrawer } from "./NavigationDrawer";
import { Header } from "./Header";
import { Footer } from "@/components/common/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  
  // Scroll to top when changing routes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <NavigationDrawer />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <AnimatePresence mode="wait">
            <motion.main 
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 overflow-auto container mx-auto py-6 px-4 flex flex-col"
            >
              {children}
              <Footer />
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </SidebarProvider>
  );
}
