
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              We're on a mission to democratize algorithmic trading by providing accessible,
              powerful tools for traders of all levels.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-muted-foreground">
              We envision a future where sophisticated trading strategies are accessible to everyone,
              powered by intuitive tools and comprehensive education.
            </p>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                Continuously pushing the boundaries of what's possible in algorithmic trading.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <p className="text-muted-foreground">
                Committed to helping traders learn and grow through comprehensive resources.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                Building a supportive community of traders sharing knowledge and experiences.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
