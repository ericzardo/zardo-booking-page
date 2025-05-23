'use client';

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@zardo/ui-kit";
import { SectionTransition } from "@zardo/ui-kit/animations";
import lottie from 'lottie-web';
import bookingIllustration from "../../public/animations/booking.json";
import { useScrollToSection } from "@/hooks/useScrollToSection";

const CTA = () => {
  const scrollToSection = useScrollToSection();
  const { t } = useTranslation("cta");
  const animationContainer = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    if (!animationContainer.current) return;

    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: bookingIllustration,
    });

    anim.setSpeed(0.6);

    return () => anim.destroy();
  }, []);

  return (
    <section className="relative min-h-[70vh] py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[2fr_2fr] items-center gap-12 md:gap-16">

          {/* Coluna esquerda - Conteúdo */}
          <div className="space-y-6 text-center md:text-left flex flex-col justify-center">
            <SectionTransition delay={150}  direction="left">
              <h2 className="section-heading text-gradient max-w-2xl text-left mx-auto md:mx-0">
                {t("title")}
              </h2>
            </SectionTransition>

            <SectionTransition delay={300} direction="left">
              <p className="text-lg md:text-xl text-brand-navy/80 max-w-lg">
                {t("description")}
              </p>
            </SectionTransition>

            <SectionTransition delay={300} direction="left">
              <Button
                className="mx-auto md:mx-0"
                onClick={() => scrollToSection({ 
                  sectionId: "booking", 
                  offset: 80,
                  duration: 800
                })}
              >
                {t("button")}
              </Button>
            </SectionTransition>
          </div>

          {/* Coluna direita - Animação */}
          <div className="flex justify-center md:justify-center items-center">
            {/* Limitador para evitar overflow no layout */}
            <div className="overflow-hidden">
              {/* Transição visível, sem clipping */}
              <SectionTransition direction="right" delay={200}>
                <div
                  ref={animationContainer}
                  className="w-full max-w-[320px] aspect-square scale-125"
                />
              </SectionTransition>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
