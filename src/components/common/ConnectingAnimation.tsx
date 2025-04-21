import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Server, Cpu, Sparkles } from 'lucide-react';
import { ProgressBar } from '@/components/visualizations/Progress';
import { Badge } from '@/components/ui/badge';

interface ConnectingAnimationProps {
  onConnected: () => void;
  serviceName?: string;
}

const connectionStages = [
  { message: "Initializing connection", percentage: 0 },
  { message: "Establishing secure channel", percentage: 15 },
  { message: "Authenticating credentials", percentage: 30 },
  { message: "Connecting to Groq AI models", percentage: 45 },
  { message: "Loading model weights", percentage: 60 },
  { message: "Syncing with database", percentage: 75 },
  { message: "Preparing analytical environment", percentage: 90 },
  { message: "Connection established", percentage: 100 },
];

export function ConnectingAnimation({ onConnected, serviceName = "AI Services" }: ConnectingAnimationProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Total animation duration: 6000ms (6 seconds)
    const totalDuration = 6000;
    const stagesCount = connectionStages.length;
    const stageTime = totalDuration / stagesCount;
    
    // Advance through connection stages
    const timer = setInterval(() => {
      setCurrentStage(prevStage => {
        const nextStage = prevStage + 1;
        if (nextStage >= stagesCount) {
          clearInterval(timer);
          onConnected();
          return prevStage;
        }
        return nextStage;
      });
    }, stageTime);

    // Progress animation
    const progressStep = 100 / (totalDuration / 20); // Update every 20ms
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + progressStep;
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return newProgress;
      });
    }, 20);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [onConnected]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-[70vh] w-full max-w-xl mx-auto p-8"
    >
      <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-primary/10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="relative w-16 h-16"
        >
          <Server className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-primary" />
          <motion.div 
            className="absolute w-full h-full rounded-full border-t-2 border-primary"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
          <motion.div 
            className="absolute w-full h-full rounded-full border-b-2 border-primary/50"
            animate={{ rotate: -180 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
        </motion.div>
      </div>

      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-4 text-center"
      >
        <Badge className="mb-2 py-1 px-2">
          {progress < 100 ? "Connecting..." : "Connected!"}
        </Badge>
        <h2 className="text-2xl font-bold mb-1">Connecting to {serviceName}</h2>
        <p className="text-muted-foreground">Please wait while we establish a secure connection</p>
      </motion.div>

      <div className="w-full max-w-md space-y-6 mb-8">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Connection Progress</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <ProgressBar 
            value={progress} 
            max={100} 
            showValue={false} 
            className="h-3"
          />
        </div>

        <div className="space-y-3">
          {connectionStages.map((stage, index) => (
            <div 
              key={index} 
              className={`flex items-start ${index <= currentStage ? 'opacity-100' : 'opacity-40'}`}
            >
              <div className="flex items-center justify-center w-6 h-6 mt-0.5 mr-3">
                {index < currentStage ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center"
                  >
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </motion.div>
                ) : index === currentStage ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center"
                  >
                    {index === 3 ? (
                      <Sparkles className="w-4 h-4 text-primary" />
                    ) : index === 2 ? (
                      <Cpu className="w-4 h-4 text-primary" />
                    ) : (
                      <Server className="w-4 h-4 text-primary" />
                    )}
                  </motion.div>
                ) : (
                  <div className="w-2 h-2 mx-2 rounded-full bg-muted" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{stage.message}</div>
                {index === currentStage && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="h-[2px] bg-primary/30 mt-1"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 