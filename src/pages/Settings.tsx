import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  LineChart as LineChartIcon, 
  BarChart3 as BarChart3Icon, 
  Bell, 
  Save, 
  Globe, 
  Shield, 
  User, 
  Key, 
  CreditCard, 
  Smartphone, 
  Mail,
  Webhook,
  Zap,
  Check,
  RefreshCw,
  Wallet,
  UserPlus,
  LogOut,
  Lock
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [language, setLanguage] = useState(i18n.language || 'en');
  
  const saveSettings = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1500);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{t('settings')}</h1>
        <p className="text-muted-foreground mt-1">{t('settings_description')}</p>
      </div>
      
      <Tabs defaultValue="general">
        <div className="flex flex-col md:flex-row gap-6">
          <Card className="md:w-64 flex-shrink-0">
            <CardContent className="p-4">
              <TabsList className="flex flex-col items-start h-auto p-0 bg-transparent">
                <TabsTrigger value="general" className="w-full justify-start py-2 px-3">
                  <LineChartIcon className="h-4 w-4 mr-2" />
                  {t('general')}
                </TabsTrigger>
                <TabsTrigger value="notifications" className="w-full justify-start py-2 px-3">
                  <Bell className="h-4 w-4 mr-2" />
                  {t('notifications')}
                </TabsTrigger>
                <TabsTrigger value="appearance" className="w-full justify-start py-2 px-3">
                  <BarChart3Icon className="h-4 w-4 mr-2" />
                  {t('appearance')}
                </TabsTrigger>
                <TabsTrigger value="language" className="w-full justify-start py-2 px-3">
                  <Globe className="h-4 w-4 mr-2" />
                  {t('language')}
                </TabsTrigger>
                <TabsTrigger value="connections" className="w-full justify-start py-2 px-3">
                  <Webhook className="h-4 w-4 mr-2" />
                  {t('connections')}
                </TabsTrigger>
                <TabsTrigger value="security" className="w-full justify-start py-2 px-3">
                  <Shield className="h-4 w-4 mr-2" />
                  {t('security')}
                </TabsTrigger>
                <TabsTrigger value="account" className="w-full justify-start py-2 px-3">
                  <User className="h-4 w-4 mr-2" />
                  {t('account')}
                </TabsTrigger>
                <TabsTrigger value="billing" className="w-full justify-start py-2 px-3">
                  <CreditCard className="h-4 w-4 mr-2" />
                  {t('billing')}
                </TabsTrigger>
              </TabsList>
              
              <Separator className="my-4" />
              
              <div className="px-3 py-2">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
                    <span className="text-primary-foreground font-semibold">JD</span>
                  </div>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-muted-foreground">Pro Plan</div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('log_out')}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex-1">
            <TabsContent value="general" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>{t('general_settings')}</CardTitle>
                  <CardDescription>
                    {t('general_settings_description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">{t('username')}</Label>
                    <Input id="username" defaultValue="johndoe" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">{t('timezone')}</Label>
                    <Select defaultValue="UTC-5">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder={t('select_timezone')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-8">UTC-8 (Pacific Time)</SelectItem>
                        <SelectItem value="UTC-7">UTC-7 (Mountain Time)</SelectItem>
                        <SelectItem value="UTC-6">UTC-6 (Central Time)</SelectItem>
                        <SelectItem value="UTC-5">UTC-5 (Eastern Time)</SelectItem>
                        <SelectItem value="UTC">UTC (Greenwich Mean Time)</SelectItem>
                        <SelectItem value="UTC+1">UTC+1 (Central European Time)</SelectItem>
                        <SelectItem value="UTC+5.5">UTC+5:30 (Indian Standard Time)</SelectItem>
                        <SelectItem value="UTC+8">UTC+8 (China Standard Time)</SelectItem>
                        <SelectItem value="UTC+9">UTC+9 (Japan Standard Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date-format">{t('date_format')}</Label>
                    <Select defaultValue="MM/DD/YYYY">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder={t('select_date_format')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="data-refresh">{t('data_refresh_interval')}</Label>
                    <Select defaultValue="5">
                      <SelectTrigger id="data-refresh">
                        <SelectValue placeholder={t('select_refresh_interval')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 {t('minute')}</SelectItem>
                        <SelectItem value="5">5 {t('minutes')}</SelectItem>
                        <SelectItem value="15">15 {t('minutes')}</SelectItem>
                        <SelectItem value="30">30 {t('minutes')}</SelectItem>
                        <SelectItem value="60">1 {t('hour')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={saveSettings} disabled={saving}>
                    {saving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        {t('saving')}...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {t('save_changes')}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>{t('notification_settings')}</CardTitle>
                  <CardDescription>
                    {t('notification_settings_description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">{t('email_notifications')}</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-trades">{t('trade_notifications')}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t('trade_notifications_description')}
                        </p>
                      </div>
                      <Switch id="email-trades" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-performance">{t('performance_reports')}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t('performance_reports_description')}
                        </p>
                      </div>
                      <Switch id="email-performance" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-alerts">{t('price_alerts')}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t('price_alerts_description')}
                        </p>
                      </div>
                      <Switch id="email-alerts" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-marketing">{t('marketing_emails')}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t('marketing_emails_description')}
                        </p>
                      </div>
                      <Switch id="email-marketing" />
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">{t('push_notifications')}</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-trades">{t('trade_notifications')}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t('trade_push_notifications_description')}
                        </p>
                      </div>
                      <Switch id="push-trades" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-alerts">{t('price_alerts')}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t('price_push_alerts_description')}
                        </p>
                      </div>
                      <Switch id="push-alerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-news">{t('market_news')}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t('market_news_description')}
                        </p>
                      </div>
                      <Switch id="push-news" />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex items-center">
                      <Smartphone className="h-5 w-5 text-muted-foreground mr-2" />
                      <p className="text-sm text-muted-foreground">
                        {t('push_notification_note')}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={saveSettings} disabled={saving}>
                    {saving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        {t('saving')}...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {t('save_changes')}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>{t('appearance_settings')}</CardTitle>
                  <CardDescription>
                    {t('appearance_settings_description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chart-style">{t('chart_style')}</Label>
                    <Select defaultValue="candles">
                      <SelectTrigger id="chart-style">
                        <SelectValue placeholder={t('select_chart_style')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="candles">{t('candlestick')}</SelectItem>
                        <SelectItem value="line">{t('line')}</SelectItem>
                        <SelectItem value="bars">{t('bars')}</SelectItem>
                        <SelectItem value="area">{t('area')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-view">{t('default_view')}</Label>
                    <Select defaultValue="strategy-builder">
                      <SelectTrigger id="default-view">
                        <SelectValue placeholder={t('select_default_view')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dashboard">{t('dashboard')}</SelectItem>
                        <SelectItem value="strategy-builder">{t('strategy_builder')}</SelectItem>
                        <SelectItem value="market-data">{t('market_data')}</SelectItem>
                        <SelectItem value="performance">{t('performance')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-view">{t('compact_view')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('compact_view_description')}
                      </p>
                    </div>
                    <Switch id="compact-view" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="trader-tooltips">{t('trader_tooltips')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('trader_tooltips_description')}
                      </p>
                    </div>
                    <Switch id="trader-tooltips" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="animations">{t('animations')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('animations_description')}
                      </p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={saveSettings} disabled={saving}>
                    {saving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        {t('saving')}...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {t('save_changes')}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="language" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>{t('language')}</CardTitle>
                  <CardDescription>
                    Choose your preferred language for the application interface
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
                      { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
                      { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
                      { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
                      { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
                      { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
                    ].map((lang) => (
                      <div 
                        key={lang.code}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          language === lang.code 
                            ? "border-primary bg-primary/5" 
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => {
                          changeLanguage(lang.code);
                          
                          // Show success message
                          // This would be handled by a toast component in a real app
                          setTimeout(() => {
                            window.location.reload();
                          }, 500);
                        }}
                      >
                        <div className="text-2xl mr-3">{lang.flag}</div>
                        <div className="flex-1">
                          <div className="font-medium">{lang.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {lang.nativeName}
                          </div>
                        </div>
                        {language === lang.code && (
                          <div className="ml-auto h-5 w-5 text-primary">
                            <Check className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="font-medium mb-2">Language preferences</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Changing the language will translate the entire application interface including menus, buttons, and messages.
                      All content will be displayed in your selected language.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-detect" />
                      <Label htmlFor="auto-detect">Auto-detect language from browser</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="connections" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>{t('api_connections')}</CardTitle>
                  <CardDescription>
                    {t('api_connections_description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">{t('api_key')}</Label>
                    <div className="relative">
                      <Input 
                        id="api-key" 
                        type={apiKeyVisible ? "text" : "password"} 
                        value="api_3fb7aa92c8e6b3e245c8f9f6bd3d8e9a" 
                        readOnly
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setApiKeyVisible(!apiKeyVisible)}
                      >
                        {apiKeyVisible ? t('hide') : t('show')}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="api-secret">{t('api_secret')}</Label>
                      <span className="text-sm text-muted-foreground">
                        {t('last_regenerated')}: 30 {t('days_ago')}
                      </span>
                    </div>
                    <div className="relative">
                      <Input 
                        id="api-secret" 
                        type="password" 
                        value="sk_d9a8f9e2c7b6a5d4e3f2c1b0a9f8e7d6" 
                        readOnly 
                      />
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-destructive hover:text-destructive"
                      >
                        {t('regenerate')}
                      </Button>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">{t('connected_brokers')}</h3>
                    
                    <div className="grid gap-4">
                      <Card>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-muted rounded flex items-center justify-center mr-4">
                              <Wallet className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium">Alpaca</div>
                              <div className="text-sm text-muted-foreground">
                                {t('connected')} · {t('last_synced')}: 2 {t('hours_ago')}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">{t('disconnect')}</Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-muted rounded flex items-center justify-center mr-4">
                              <Wallet className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium">Interactive Brokers</div>
                              <div className="text-sm text-muted-foreground">{t('not_connected')}</div>
                            </div>
                          </div>
                          <Button size="sm">{t('connect')}</Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-muted rounded flex items-center justify-center mr-4">
                              <Wallet className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium">TD Ameritrade</div>
                              <div className="text-sm text-muted-foreground">{t('not_connected')}</div>
                            </div>
                          </div>
                          <Button size="sm">{t('connect')}</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={saveSettings} disabled={saving}>
                    {saving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        {t('saving')}...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {t('save_changes')}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>{t('security_settings')}</CardTitle>
                  <CardDescription>
                    {t('security_settings_description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">{t('current_password')}</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">{t('new_password')}</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t('confirm_password')}</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">{t('two_factor_authentication')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('two_factor_description')}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Lock className="mr-2 h-4 w-4" />
                      {t('enable')}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ip-restriction">{t('ip_restriction')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('ip_restriction_description')}
                      </p>
                    </div>
                    <Switch id="ip-restriction" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="session-timeout">{t('session_timeout')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('session_timeout_description')}
                      </p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger id="session-timeout" className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 {t('minutes')}</SelectItem>
                        <SelectItem value="30">30 {t('minutes')}</SelectItem>
                        <SelectItem value="60">1 {t('hour')}</SelectItem>
                        <SelectItem value="240">4 {t('hours')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={saveSettings} disabled={saving}>
                    {saving ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        {t('saving')}...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {t('save_changes')}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>{t('account_settings')}</CardTitle>
                  <CardDescription>
                    {t('account_settings_description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t('account_type')}</Label>
                      <div className="text-sm font-medium">Pro</div>
                    </div>
                    <Button variant="outline" size="sm">{t('upgrade')}</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t('account_status')}</Label>
                      <div className="text-sm font-medium text-green-500">{t('active')}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t('member_since')}</Label>
                      <div className="text-sm font-medium">May 12, 2023</div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="export-data">{t('export_account_data')}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t('export_account_data_description')}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">{t('export')}</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="delete-account" className="text-destructive">{t('delete_account')}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t('delete_account_description')}
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">{t('delete')}</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>{t('billing_settings')}</CardTitle>
                  <CardDescription>
                    {t('billing_settings_description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t('current_plan')}</Label>
                      <div className="text-sm font-medium">Pro Plan - $39.99/{t('month')}</div>
                    </div>
                    <Button variant="outline" size="sm">{t('change_plan')}</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t('billing_cycle')}</Label>
                      <div className="text-sm font-medium">{t('monthly')} - {t('next_billing')}: Jun 12, 2025</div>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">{t('payment_method')}</h3>
                    
                    <Card>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-3" />
                          <div>
                            <div className="font-medium">•••• •••• •••• 4242</div>
                            <div className="text-xs text-muted-foreground">{t('expires')}: 05/28</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">{t('edit')}</Button>
                      </CardContent>
                    </Card>
                    
                    <Button variant="outline" className="w-full mt-2" size="sm">{t('add_payment_method')}</Button>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">{t('billing_history')}</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-4">{t('date')}</th>
                            <th className="text-left py-2 px-4">{t('description')}</th>
                            <th className="text-right py-2 px-4">{t('amount')}</th>
                            <th className="text-right py-2 px-4"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 px-4">May 12, 2025</td>
                            <td className="py-2 px-4">Pro Plan - {t('monthly_subscription')}</td>
                            <td className="py-2 px-4 text-right">$39.99</td>
                            <td className="py-2 px-4 text-right">
                              <Button variant="ghost" size="sm">{t('invoice')}</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">Apr 12, 2025</td>
                            <td className="py-2 px-4">Pro Plan - {t('monthly_subscription')}</td>
                            <td className="py-2 px-4 text-right">$39.99</td>
                            <td className="py-2 px-4 text-right">
                              <Button variant="ghost" size="sm">{t('invoice')}</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">Mar 12, 2025</td>
                            <td className="py-2 px-4">Pro Plan - {t('monthly_subscription')}</td>
                            <td className="py-2 px-4 text-right">$39.99</td>
                            <td className="py-2 px-4 text-right">
                              <Button variant="ghost" size="sm">{t('invoice')}</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
