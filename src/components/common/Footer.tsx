import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="mt-auto pt-6 pb-4 border-t">
      <div className="container">
        <div className="flex flex-col items-center justify-center text-sm text-muted-foreground">
          <p className="mb-1">{t("common.app_name")} - {t("common.democratizing_algorithmic_trading")}</p>
          <p>&copy; {new Date().getFullYear()} {t("common.app_name")}. {t("common.all_rights_reserved")}</p>
        </div>
      </div>
    </footer>
  );
} 