'use client';

import { useEffect, useRef, useState } from 'react';
import i18n from '@/lib/translate/config';

import { PatternBackground } from '@zardo/ui-kit/layout';

interface CalendarProps {
  setIsClient: (val: boolean) => void;
}

const Calendar = ({ setIsClient }: CalendarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    setLang(i18n.language);
    const handleLangChange = (lng: string) => setLang(lng);
    i18n.on('languageChanged', handleLangChange);
    return () => i18n.off('languageChanged', handleLangChange);
  }, []);

  useEffect(() => {
    if (!lang || !ref.current) return;

    ref.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    ref.current.appendChild(script);

    const eventSlug = lang === 'pt' ? 'consultoria-gratuita' : 'free-booking';

    const calendlyDiv = document.createElement('div');
    calendlyDiv.className = 'calendly-inline-widget';
    calendlyDiv.setAttribute(
      'data-url',
      `https://calendly.com/eric-zardo/${eventSlug}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=f8f8ff&text_color=0a122a&primary_color=620079`
    );
    calendlyDiv.setAttribute('style', 'min-width:320px;height:890px;');
    ref.current.appendChild(calendlyDiv);
    document.body.appendChild(script);

    setIsClient(true);
  }, [lang, setIsClient]);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      <PatternBackground/>
      <div className="container mx-auto px-4 py-12 md:py-20" id='booking'>
        <div className="flex flex-col items-center text-center max-w-7xl mx-auto">
          <div
            className="w-full max-w-4xl min-h-[890px] mx-auto overflow-hidden"
            ref={ref}
          />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
