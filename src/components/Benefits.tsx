'use client';

import { SectionTransition } from "@zardo/ui-kit/animations";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const Benefits = () => {
  const { t } = useTranslation("benefits");

  const benefits = t("benefits", { returnObjects: true }) as string[];

  return (
    <section
      className="relative bg-brand-navy rounded-[20px] md:rounded-[40px] lg:rounded-[60px] py-20 md:py-32"
      id="benefits"
    >
      <div className="container mx-auto px-4">
        <header className="flex flex-col text-center md:text-left md:flex-row gap-8 mb-16 items-end justify-between">
          <SectionTransition direction="left">
            <h2 id="solutions-heading" className="section-heading text-brand-offwhite m-0">
              {t("title")}
            </h2>
          </SectionTransition>
          <SectionTransition direction="right">
            <p className="text-brand-lavender text-lg">{t("description")}</p>
          </SectionTransition>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-4 md:px-8">
          {benefits .map((benefit, idx) => (
            <SectionTransition key={idx} delay={idx * 100}>
              <div className="relative bg-slate-900 rounded-lg p-6 gap-2 shadow-lg border border-brand-offwhite/15 backdrop-blur-sm flex flex-col md:flex-row items-center md:items-start w-full max-w-md mx-auto md:max-w-none">
                <CheckCircle
                  className="mx-auto text-brand-purple mb-4"
                  size={32}
                />
                <p className="text-brand-offwhite text-lg">{benefit}</p>
              </div>
            </SectionTransition>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
