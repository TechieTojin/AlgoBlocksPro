import { useState } from "react";
import { Check, X, ChevronDown, ChevronUp, ArrowRight, HelpCircle, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [showComparison, setShowComparison] = useState(false);
  
  const plans = [
    {
      name: "Free",
      description: "For individuals exploring algorithmic trading",
      price: { monthly: "$0", yearly: "$0" },
      priceDescription: "forever",
      features: [
        "Basic strategy building",
        "Limited backtesting (5 per day)",
        "Community forum access",
        "5 pre-built indicators",
        "Standard data resolution"
      ],
      limitations: [
        "No real-time data",
        "No API access",
        "No custom indicators"
      ],
      cta: "Get Started",
      popular: false,
      color: "bg-muted"
    },
    {
      name: "Pro",
      description: "For active traders and strategy developers",
      price: { monthly: "$49", yearly: "$39" },
      priceDescription: "per month",
      yearlyDiscount: "Save $120 yearly",
      features: [
        "Advanced strategy building",
        "Unlimited backtests",
        "Priority email support",
        "Real-time market data",
        "50+ technical indicators",
        "Custom indicators",
        "API access (100 calls/min)",
        "Export capabilities",
        "Strategy sharing"
      ],
      limitations: [],
      cta: "Start 14-day Trial",
      popular: true,
      color: "bg-primary"
    },
    {
      name: "Enterprise",
      description: "For professional trading firms and teams",
      price: { monthly: "$199", yearly: "$169" },
      priceDescription: "per month",
      yearlyDiscount: "Save $360 yearly",
      features: [
        "Everything in Pro, plus:",
        "Dedicated account manager",
        "Unlimited API access",
        "Multi-user access",
        "Advanced risk management",
        "White label solutions",
        "Custom integrations",
        "Institutional data feeds",
        "Offline mode",
        "SLA agreement"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      color: "bg-muted"
    },
  ];

  const faqs = [
    {
      question: "Can I switch plans at any time?",
      answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. If you downgrade or cancel, you'll continue to have access to your current plan until the end of your billing period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day money-back guarantee for our Pro plan. If you're not satisfied with our service, you can request a full refund within 14 days of your initial purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans. We do not currently accept cryptocurrency payments."
    },
    {
      question: "Is there a limit to how many strategies I can create?",
      answer: "There is no limit to the number of strategies you can create on any of our plans. However, the Free plan has a limit of 5 backtests per day."
    },
    {
      question: "Can I bring my own data sources?",
      answer: "Yes, Pro and Enterprise plans allow you to import your own data sources for backtesting and strategy development. Enterprise plans also support custom data integrations."
    },
    {
      question: "Do you offer discounts for startups or academic institutions?",
      answer: "Yes, we offer special pricing for startups, academic institutions, and non-profit organizations. Please contact our sales team for more information."
    },
  ];

  const featureComparison = {
    categories: [
      {
        name: "Core Platform",
        features: [
          "Strategy Building",
          "Backtesting Engine",
          "Technical Indicators",
          "Real-time Data",
          "Historical Data"
        ]
      },
      {
        name: "Advanced Features",
        features: [
          "Custom Indicators",
          "API Access",
          "Export Capabilities",
          "Strategy Sharing",
          "Risk Analysis"
        ]
      },
      {
        name: "Support",
        features: [
          "Community Support",
          "Email Support",
          "Priority Support",
          "Dedicated Manager",
          "Training Sessions"
        ]
      }
    ],
    plans: ["Free", "Pro", "Enterprise"],
    availability: {
      "Strategy Building": { Free: "Basic", Pro: "Advanced", Enterprise: "Advanced" },
      "Backtesting Engine": { Free: "Limited", Pro: "Unlimited", Enterprise: "Unlimited" },
      "Technical Indicators": { Free: "5 indicators", Pro: "50+ indicators", Enterprise: "All indicators" },
      "Real-time Data": { Free: false, Pro: true, Enterprise: true },
      "Historical Data": { Free: "Standard", Pro: "High resolution", Enterprise: "Premium" },
      "Custom Indicators": { Free: false, Pro: true, Enterprise: true },
      "API Access": { Free: false, Pro: "Limited", Enterprise: "Unlimited" },
      "Export Capabilities": { Free: false, Pro: true, Enterprise: true },
      "Strategy Sharing": { Free: false, Pro: true, Enterprise: true },
      "Risk Analysis": { Free: "Basic", Pro: "Advanced", Enterprise: "Enterprise-grade" },
      "Community Support": { Free: true, Pro: true, Enterprise: true },
      "Email Support": { Free: false, Pro: true, Enterprise: true },
      "Priority Support": { Free: false, Pro: true, Enterprise: true },
      "Dedicated Manager": { Free: false, Pro: false, Enterprise: true },
      "Training Sessions": { Free: false, Pro: false, Enterprise: true }
    } as Record<string, Record<string, string | boolean>>
  };

  const renderAvailability = (feature: string, plan: string) => {
    const availability = featureComparison.availability[feature][plan];
    
    if (availability === true) {
      return <Check className="h-5 w-5 text-green-500" />;
    } else if (availability === false) {
      return <X className="h-5 w-5 text-red-500" />;
    } else {
      return <span className="text-sm">{availability}</span>;
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Pricing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the plan that best fits your trading needs
          </p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}>
              Monthly
            </span>
            <div className="flex items-center">
              <Switch
                checked={billingCycle === "yearly"}
                onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
                id="billing-toggle"
              />
              <Label htmlFor="billing-toggle" className="sr-only">Toggle billing cycle</Label>
            </div>
            <span className={billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}>
              Yearly <Badge className="ml-1 bg-green-500/10 text-green-500 hover:bg-green-500/20">Save 20%</Badge>
            </span>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">Most Popular</Badge>
                </div>
              )}
              
              <Card className={`relative h-full flex flex-col overflow-hidden ${plan.popular ? 'border-primary shadow-md' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <div className={`absolute top-0 right-0 -mt-2 -mr-8 rotate-45 transform w-28 text-center py-1 ${plan.color} text-white text-xs font-semibold`}>
                      Popular
                    </div>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold">{plan.price[billingCycle]}</span>
                      <span className="text-muted-foreground ml-2">{plan.priceDescription}</span>
                    </div>
                    {plan.yearlyDiscount && billingCycle === "yearly" && (
                      <p className="text-green-500 text-sm mt-1">{plan.yearlyDiscount}</p>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <p className="font-medium">What's included:</p>
                    <ul className="space-y-2">
                {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations.length > 0 && (
                      <>
                        <p className="font-medium mt-6">Limitations:</p>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation) => (
                            <li key={limitation} className="flex items-start">
                              <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 shrink-0" />
                              <span className="text-sm">{limitation}</span>
                  </li>
                ))}
              </ul>
                      </>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-4 mt-auto">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Plan Comparison */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => setShowComparison(!showComparison)}
              className="gap-2"
            >
              {showComparison ? "Hide" : "Show"} Detailed Comparison
              {showComparison ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg border overflow-x-auto"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Feature</TableHead>
                    {featureComparison.plans.map(plan => (
                      <TableHead key={plan} className="text-center">{plan}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {featureComparison.categories.map(category => (
                    <>
                      <TableRow key={category.name} className="bg-muted/50">
                        <TableCell colSpan={4} className="font-medium py-2">
                          {category.name}
                        </TableCell>
                      </TableRow>
                      {category.features.map(feature => (
                        <TableRow key={feature}>
                          <TableCell className="font-medium">{feature}</TableCell>
                          {featureComparison.plans.map(plan => (
                            <TableCell key={plan} className="text-center">
                              {renderAvailability(feature, plan)}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          )}
        </div>
        
        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-2">Questions?</Badge>
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* CTA */}
        <div className="rounded-2xl bg-muted/30 p-8 md:p-12 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-8">
              Our team is ready to answer any questions you might have about our plans and help you choose the right one for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <CheckCircle className="h-5 w-5" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <HelpCircle className="h-5 w-5" />
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
