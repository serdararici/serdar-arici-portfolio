import { SiLinkedin, SiGithub, SiGmail, SiX } from "react-icons/si";

export default function Footer() {
    const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-800 bg-[#121212] py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 md:flex-row md:justify-between">
        <p className="text-sm text-gray-400">
            <span>© {year} Serdar Arıcı. All rights reserved.</span>
            
        </p>

        <div className="flex gap-4">
          <a href="https://github.com/serdararici" target="_blank">
            <SiGithub className="h-5 w-5 text-gray-400 hover:text-white transition" />
          </a>
          <a href="https://linkedin.com/in/serdar" target="_blank">
            <SiLinkedin className="h-5 w-5 text-gray-400 hover:text-white transition" />
          </a>
          <a href="mailto:serdararici3@gmail.com">
            <SiGmail className="h-5 w-5 text-gray-400 hover:text-white transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}
