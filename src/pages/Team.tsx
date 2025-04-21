import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ExternalLink, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Team = () => {
  const team = [
    {
      name: "Tojin Varkey Simson",
      role: "Co-Founder & CEO",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=tojin",
      bio: "Visionary leader with expertise in algorithmic trading and financial markets",
      skills: ["Trading Algorithms", "Financial Markets", "Leadership"],
      linkedin: "https://linkedin.com/in/tojinvarkeysimon",
      github: "https://github.com/tojinvarkeysimon",
      email: "tojin@algoblocks.com"
    },
    {
      name: "Jaiby Mariya Joseph",
      role: "Co-Founder & CTO",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=jaiby",
      bio: "Technical expert specializing in platform architecture and software development",
      skills: ["Software Architecture", "AI/ML", "Cloud Infrastructure"],
      linkedin: "https://linkedin.com/in/jaibymariyajoseph",
      github: "https://github.com/jaibymariyajoseph",
      email: "jaiby@algoblocks.com"
    }
  ];

  return (
    <div className="container max-w-6xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-2">Our Team</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet the Founders</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The visionaries behind AlgoBlocks Pro, building the future of algorithmic trading
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <CardHeader className="pb-0">
                  <div className="flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/30 p-0.5">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover bg-background"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-2">
                        <User className="h-4 w-4" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold mb-1">{member.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-primary font-medium">
                        <Briefcase className="h-4 w-4" />
                        {member.role}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {member.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="font-normal">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 flex-grow">
                  <div className="bg-muted/50 p-4 rounded-lg border border-muted mb-4">
                    <p className="text-muted-foreground italic">"{member.bio}"</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4 text-primary" />
                      <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">
                        {member.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" asChild>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href={member.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href={`mailto:${member.email}`}>
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <a href="#contact">
                        Connect <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="p-8 rounded-lg border bg-muted/30">
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're constantly looking for talented individuals who are passionate about algorithmic trading and financial technology.
            </p>
            <Button size="lg">
              View Open Positions
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Team;
