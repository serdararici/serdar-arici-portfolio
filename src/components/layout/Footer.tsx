import { SiLinkedin, SiGithub, SiGmail } from "react-icons/si";
import { useTranslations } from "next-intl";

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-border bg-surface py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 md:flex-row md:justify-between">
        <p className="text-sm text-muted">
          {/* JSON'dan çekiyoruz */}
          <span>© {year} Serdar Arıcı. {t('rights')}</span>
        </p>

        <div className="flex gap-4">
          <a href="https://github.com/serdararici" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <SiGithub className="h-5 w-5 text-muted hover:text-foreground transition" />
          </a>
          <a href="https://linkedin.com/in/serdararici" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <SiLinkedin className="h-5 w-5 text-muted hover:text-foreground transition" />
          </a>
          <a href="mailto:serdararici3@gmail.com" aria-label="Email">
            <SiGmail className="h-5 w-5 text-muted hover:text-foreground transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}