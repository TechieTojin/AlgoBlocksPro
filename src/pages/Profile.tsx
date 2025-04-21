
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, Bell, Shield, CreditCard, LogOut } from "lucide-react";

const Profile = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    trades: true,
    news: false,
  });
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="container max-w-4xl">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/3">
              <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="text-xl">JD</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-sm text-muted-foreground mb-4">john.doe@example.com</p>
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Pro Member since April 2025
                </p>
                <div className="w-full mt-2 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    View Public Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
                  <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
                  <TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
                  <TabsTrigger value="billing" className="flex-1">Billing</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Settings className="mr-2 h-5 w-5" />
                        Account Settings
                      </CardTitle>
                      <CardDescription>
                        Manage your account information and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="johndoe" />
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Preferences</h3>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="dark-mode">Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">
                              Use dark theme across the application
                            </p>
                          </div>
                          <Switch id="dark-mode" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="auto-save">Auto Save</Label>
                            <p className="text-sm text-muted-foreground">
                              Automatically save strategy changes
                            </p>
                          </div>
                          <Switch id="auto-save" defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bell className="mr-2 h-5 w-5" />
                        Notification Preferences
                      </CardTitle>
                      <CardDescription>
                        Manage how and when you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Notification Channels</h3>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications via email
                            </p>
                          </div>
                          <Switch 
                            id="email-notifications" 
                            checked={notifications.email}
                            onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications in your browser
                            </p>
                          </div>
                          <Switch 
                            id="push-notifications" 
                            checked={notifications.push}
                            onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                          />
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Notification Types</h3>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="trade-notifications">Trade Events</Label>
                            <p className="text-sm text-muted-foreground">
                              Notifications about your strategy trades
                            </p>
                          </div>
                          <Switch 
                            id="trade-notifications" 
                            checked={notifications.trades}
                            onCheckedChange={(checked) => setNotifications({...notifications, trades: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="news-notifications">News & Updates</Label>
                            <p className="text-sm text-muted-foreground">
                              Product updates and educational content
                            </p>
                          </div>
                          <Switch 
                            id="news-notifications" 
                            checked={notifications.news}
                            onCheckedChange={(checked) => setNotifications({...notifications, news: checked})}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Preferences</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="mr-2 h-5 w-5" />
                        Security Settings
                      </CardTitle>
                      <CardDescription>
                        Manage your account security and access
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Security Features</h3>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch id="two-factor" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="session-timeout">Session Timeout</Label>
                            <p className="text-sm text-muted-foreground">
                              Automatically log out after period of inactivity
                            </p>
                          </div>
                          <Switch id="session-timeout" defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Update Security Settings</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="billing">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Billing & Subscription
                      </CardTitle>
                      <CardDescription>
                        Manage your subscription and payment methods
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">Current Plan</h3>
                          <span className="text-sm font-medium bg-primary/20 text-primary px-2 py-1 rounded">Active</span>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-2xl font-bold">Pro Plan</p>
                            <p className="text-sm text-muted-foreground">Billed annually</p>
                          </div>
                          <p className="text-lg font-bold">$29.99/month</p>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          Your next payment of $359.88 will be processed on May 15, 2025
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Payment Method</h3>
                        <div className="flex items-center justify-between bg-card p-4 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-6 bg-primary/20 rounded mr-3 flex items-center justify-center text-xs font-bold">
                              VISA
                            </div>
                            <div>
                              <p className="font-medium">Visa ending in 4242</p>
                              <p className="text-sm text-muted-foreground">Expires 05/2028</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Change
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Billing History</h3>
                        <div className="space-y-2">
                          {[
                            { date: "Apr 15, 2025", amount: "$29.99", status: "Paid" },
                            { date: "Mar 15, 2025", amount: "$29.99", status: "Paid" },
                            { date: "Feb 15, 2025", amount: "$29.99", status: "Paid" }
                          ].map((invoice, index) => (
                            <div key={index} className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
                              <p className="text-sm">{invoice.date}</p>
                              <p className="text-sm font-medium">{invoice.amount}</p>
                              <span className="text-xs bg-green-100 text-algo-green-500 dark:bg-green-900/30 px-2 py-1 rounded">
                                {invoice.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">View All Invoices</Button>
                      <Button variant="destructive">Cancel Subscription</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            AlgoBlocks - Democratizing Algorithmic Trading
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 AlgoBlocks. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
