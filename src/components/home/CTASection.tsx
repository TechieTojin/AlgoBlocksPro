
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <div className="py-24">
      <div className="container">
        <div className="relative isolate overflow-hidden bg-primary rounded-3xl px-6 py-16 shadow-2xl sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24">
          <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
            <div
              className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-primary-foreground/30 to-accent-foreground/40 opacity-30"
              style={{
                clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
          
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-4 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to start building?
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary-foreground/90">
              Join thousands of traders who are already using AlgoBlocks to power their automated trading strategies.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link to="/">
                <Button size="lg" variant="secondary">
                  Start Building
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
