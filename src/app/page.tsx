'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { LoadingScreen } from '@zardo/ui-kit/feedback';
import { Linkedin, Instagram } from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import switchLanguage from '@/lib/translate/service/switch';

const Calendar = dynamic(() => import('@/components/Calendar'), { ssr: false });
const About = dynamic(() => import('@/components/About'), { ssr: false });
const Benefits = dynamic(() => import('@/components/Benefits'), { ssr: false });
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: false });
const CTA = dynamic(() => import('@/components/CTA'), { ssr: false });
const Slogan = dynamic(() => import('@zardo/ui-kit/layout').then(mod => mod.Slogan), { ssr: false });
const Footer = dynamic(() => import('@zardo/ui-kit/layout').then(mod => mod.Footer), { ssr: false });

const iconMap = {
  instagram: <Instagram strokeWidth={2} className="size-6 text-white/60" />,
  linkedin: <Linkedin strokeWidth={2} className="size-6 text-white/60" />,
};

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  const { t, i18n } = useTranslation('home');
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage");

    if (storedLang && storedLang !== i18n.language) {
      switchLanguage(storedLang as "en" | "pt");
    }
  }, [i18n.language]);

  const SOCIAL_LINKS = (t('social', { returnObjects: true }) as { platform: keyof typeof iconMap; url: string; label: string }[] || [])
    .map((item) => ({ ...item, icon: iconMap[item.platform] }));

return (
  <div className="overflow-hidden bg-brand-offwhite relative">
    {!isClient && (<LoadingScreen />)}
    {isClient && (
      <>
        <LanguageSwitcher />
        <Slogan
          title={t('header.title')}
          description={t('header.description')}
          borderRadius="bottom"
          transitionDirection="up"
        />
        <Calendar setIsClient={setIsClient} />
        <Benefits />
        <About />
        <FAQ />
        <CTA />
        <Slogan
          title={t('slogan.title')}
          description={t('slogan.description')}
        />
        <Footer
          email="contact@zardo.dev"
          socialLinks={SOCIAL_LINKS}
          onScrollToTop={() =>
            scrollToSection({ sectionId: 'hero', offset: 80, duration: 800 })
          }
          backToTopLabel={t('footer.backToTop')}
        />
      </>
    )}
  </div>
)}
