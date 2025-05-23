"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { SectionTransition } from "@zardo/ui-kit/animations";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem = ({ question, answer, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonId = `faq-button-${index}`;
  const contentId = `faq-content-${index}`;

  return (
    <div className="border-b border-brand-lavender/30 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={contentId}
        id={buttonId}
      >
        <h3 className="text-lg font-medium text-brand-navy">{question}</h3>
        <span
          className={`ml-6 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          <ChevronDown className="h-5 w-5 text-brand-purple" />
        </span>
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
        hidden={!isOpen}
      >
        <p className="text-brand-navy/70">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const { t } = useTranslation("faq");

  const faqItems = t("items", { returnObjects: true }) as {
    question: string;
    answer: string;
  }[];

  return (
    <section className="relative py-16 bg-brand-offwhite" id="faq">
      <div className="container mx-auto px-4">
        <SectionTransition direction="up">
          <div className="text-center mb-12">
            <h2 className="section-heading text-gradient">{t("title")}</h2>
          </div>
        </SectionTransition>

        <SectionTransition direction="up" delay={300}>
          <div 
            className="max-w-3xl mx-auto bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-md border border-white/30"
            role="list"
            aria-label={t("title")}
          >
            {faqItems.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} index={index} />
            ))}
          </div>
        </SectionTransition>
      </div>
    </section>
  );
};

export default FAQ;
