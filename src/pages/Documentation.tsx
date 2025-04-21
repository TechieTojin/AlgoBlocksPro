
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const Documentation = () => {
  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Documentation</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Learn the basics of algorithmic trading</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Start your journey into algorithmic trading with our comprehensive guides.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>Explore our API documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Detailed documentation of our API endpoints and integration guides.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
              <CardDescription>View example strategies and implementations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Browse through real-world examples and sample code.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Documentation;
