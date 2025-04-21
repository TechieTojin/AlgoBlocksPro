
import { motion } from "framer-motion";
import { Book, Video, FileText, Download } from "lucide-react";

const Resources = () => {
  const resources = [
    { title: "E-Books", icon: Book, description: "Comprehensive trading guides" },
    { title: "Video Tutorials", icon: Video, description: "Step-by-step video lessons" },
    { title: "Whitepapers", icon: FileText, description: "Research and analysis" },
    { title: "Downloads", icon: Download, description: "Tools and templates" },
  ];

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Resources</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-lg bg-card border hover:shadow-lg transition-shadow"
            >
              <resource.icon className="w-8 h-8 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
              <p className="text-muted-foreground">{resource.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Resources;
