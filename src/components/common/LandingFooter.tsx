import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function LandingFooter() {
  const { t } = useTranslation();
  
  return (
    <footer className="border-t bg-background py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-semibold mb-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">AB</span>
              </div>
              <span className="text-xl">{t("common.app_name")}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("common.democratizing_algorithmic_trading")} for retail investors through intuitive visual programming.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Strategy Builder</li>
              <li>Backtesting</li>
              <li>Paper Trading</li>
              <li>Analytics</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Documentation</li>
              <li>Tutorials</li>
              <li>Blog</li>
              <li>Community</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("common.app_name")}. {t("common.all_rights_reserved")}
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">Twitter</span>
            <span className="text-sm text-muted-foreground">GitHub</span>
            <span className="text-sm text-muted-foreground">Discord</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
} 