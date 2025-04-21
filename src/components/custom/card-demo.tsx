import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CardDemoProps {
  title: string;
  description?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  badge?: string;
  className?: string;
}

export function CardDemo({
  title,
  description,
  content,
  footer,
  badge,
  className,
}: CardDemoProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {badge && <Badge>{badge}</Badge>}
        </div>
      </CardHeader>
      {content && <CardContent>{content}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
} 