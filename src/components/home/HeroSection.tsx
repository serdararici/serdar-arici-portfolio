import Image from 'next/image';
import Link from 'next/link';
// Sizin tercih ettiğiniz ikonlar:
import { BsPerson } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';
import { SiLinkedin, SiGithub, SiGmail } from "react-icons/si"; 

// CV dosyanızın public klasöründeki adı:
const CV_HREF = "/Serdar_Arici_Resume.pdf"; 


// Tasarımdaki arka planı simgeleyen bileşen (Custom Tailwind Renkleri Kullanıldı)
const BackgroundEffect = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    {/* Tasarımdaki soyut parlama/ışık efektini simgeler */}
    <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full mix-blend-lighten filter blur-3xl opacity-50 animate-pulse"></div>
    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/10 rounded-full mix-blend-lighten filter blur-3xl opacity-50 animate-pulse delay-1000"></div>
  </div>
);

const HeroSection = () => {
  const name = "Serdar Arıcı";
  const title = "Computer Engineer | Full-Stack Developer";

  const shortDescription = "Sakarya Üniversitesi Bilgisayar Mühendisliği mezunuyum. Backend (Java, Kotlin, Golang) ve Frontend (React) teknolojilerinde üretime odaklanmış, çözüm odaklı bir yazılım geliştiricisiyim.";

  // Sosyal medya bağlantıları Sizin Si ikonlarınızla güncellendi
  const socialLinks = [
    { icon: SiGithub, href: "https://github.com/serdararici", label: "GitHub" },
    { icon: SiLinkedin, href: "https://linkedin.com/in/serdararici", label: "LinkedIn" },
    { icon: SiGmail, href: "mailto:serdararici3@gmail.com", label: "Email" },
  ];

  return (
    <section 
      className="relative flex flex-col items-center justify-center h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] text-foreground px-6 py-6"
    >
      {/* 1. Arka Plan Efektleri */}
      <BackgroundEffect />

      {/* 2. Ana İçerik Konteyneri */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        
        {/* 3. Profil Fotoğrafı */}
        <div className="mb-4 relative mx-auto w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl transition-all duration-500 hover:scale-105">
          <Image
            src="/profile_ai.png"
            alt="Serdar Arıcı - Profesyonel Profil Fotoğrafı"
            layout="fill" 
            objectFit="cover"
            priority 
          />
        </div>

        {/* 4. İsim ve Unvan */}
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-2 bg-clip-text text-foreground">
          {name}
        </h1>
        <p className="text-lg sm:text-2xl text-gray-400 mb-4 font-light tracking-wide">
          {title}
        </p>

        {/* 5. Kısa Açıklama */}
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
          {shortDescription}
        </p>

        {/* 6. CTA Butonları (Yan Yana) */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
          
          {/* About Me Butonu */}
          <Link
            href="#about"
            className="flex items-center justify-center gap-2 px-6 py-2 text-sm sm:text-base font-semibold rounded-full bg-[var(--color-card)] border border-[var(--color-primary)] text-[var(--color-foreground)] hover:bg-[var(--color-primary)] hover:text-[var(--color-foreground)] transition duration-300 transform hover:scale-[1.06] shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
          >
            <BsPerson className="text-xl" /> Hakkımda
          </Link>

          {/* Download CV Butonu */}
          <a 
            href={CV_HREF} 
            download 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2 px-6 py-2 text-sm sm:text-base font-semibold rounded-full bg-[var(--color-card)] border border-[var(--color-primary)] text-[var(--color-foreground)] hover:bg-[var(--color-primary)] hover:text-[var(--color-foreground)] transition duration-300 transform hover:scale-[1.06] shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
          >
            <FiDownload className="text-xl" /> CV İndir
          </a>
        </div>

        {/* 7. Sosyal Medya İkonları */}
        <div className="flex justify-center gap-4 mt-2">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.label}
              className="p-2 border border-primary/40 rounded-full text-gray-400 hover:bg-primary/20 transition duration-200 
              hover:scale-110"
            >
              <item.icon className="text-lg sm:text-xl" />
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;