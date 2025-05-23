'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

import { PatternBackground } from '@zardo/ui-kit/layout';
import { SectionTransition } from '@zardo/ui-kit/animations';
import { LoadingScreen } from '@zardo/ui-kit/feedback';

import confirmationIllustration from '../../../public/animations/confirmation.json';

const Client = () => {
  const [isReady, setIsReady] = useState(false);
  const animationContainer = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation('confirmation');

  const [name, setName] = useState<string | null>(null);
  const [event, setEvent] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);

  const locale = i18n.language === 'pt' ? ptBR : enUS;

  useEffect(() => {
    const n = searchParams.get('name');
    const e = searchParams.get('event');
    const s = searchParams.get('start_time');

    setName(n);
    setEvent(e);
    setStartTime(s);
    setIsReady(true);
  }, [searchParams]);

  const formattedDate = startTime
    ? format(parseISO(startTime), "eeee, dd 'de' MMMM 'às' HH:mm", { locale })
    : null;

  useEffect(() => {
  if (!isReady || !animationContainer.current) return;

  const anim = lottie.loadAnimation({
    container: animationContainer.current,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: confirmationIllustration,
  });

  anim.setSpeed(0.6);

  return () => anim.destroy();
}, [isReady]);

  if (!isReady) return <LoadingScreen />;

  return (
    <div className="min-h-screen px-6 py-20 flex items-center justify-center bg-brand-lavender relative overflow-hidden">
      <PatternBackground variant="corner-blobs" />

      <div className="bg-brand-navy rounded-2xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
        {/* Texto */}
        <div className="flex-1 p-8 flex flex-col justify-between gap-y-8 text-left">
          <div className="flex flex-col gap-y-4">
            <SectionTransition direction="right" delay={100}>
              <h1 className="text-brand-offwhite text-3xl md:text-4xl font-bold">
                {t('title')}
              </h1>
            </SectionTransition>

            <SectionTransition direction="right" delay={200}>
              <p className="text-lg text-brand-lavender/90">
                {t('description', { name, event })}
              </p>
            </SectionTransition>
          </div>

          {formattedDate && (
            <SectionTransition direction="right" delay={300}>
              <p className="text-brand-offwhite font-medium">
                📅 {t('dateLabel')} {formattedDate}
              </p>
            </SectionTransition>
          )}

          <div className="flex flex-col gap-y-2">
            <SectionTransition direction="right" delay={400}>
              <p className="text-sm text-brand-purple">{t('note')}</p>
            </SectionTransition>
          </div>
        </div>

        <div className="flex justify-center items-center md:w-1/2 p-6">
          <div ref={animationContainer} className="w-64 h-64 md:w-80 md:h-80" />
        </div>
      </div>
    </div>
  );
};

export default Client;
