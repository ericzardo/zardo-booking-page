'use client';

import { useState, useRef, useEffect } from 'react';
import { Bolt } from 'lucide-react';
import switchLanguage from '@/lib/translate/service/switch';
import { SectionTransition } from '@zardo/ui-kit/animations';

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detecta clique fora do menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Delay para permitir animação de saída
  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 250); // mesmo valor da transição de saída
  }

  const isActive = open || isClosing;

  return (
    <div
      ref={dropdownRef}
      className="fixed left-5 bottom-0 top-10/12 flex items-center justify-center z-50"
    >
      <button
        onClick={() => {
          if (open) {
            handleClose();
          } else {
            setOpen(true);
          }
        }}
        className={`
          relative p-2 rounded-full transition-all duration-200  ease-out cursor-pointer
          ${isActive ? 'bg-brand-lavender text-brand-purpleDark scale-95' : 'bg-brand-purpleDark text-brand-lavender'}
          hover:bg-brand-lavender hover:text-brand-purpleDark hover:scale-90
        `}
      >
        <Bolt className="size-6 transition-all duration-200" />
      </button>

      {(open || isClosing) && (
        <div
          className={`
            flex flex-col gap-2 ml-4
            transition-all duration-200 ease-out
            ${isClosing ? 'opacity-0 translate-x-[-8px]' : 'opacity-100 translate-x-0'}
          `}
        >
          <SectionTransition direction="left" delay={0.200}>
            <button
              onClick={() => {
                switchLanguage('pt');
                handleClose();
              }}
              className="flex items-center gap-2 px-3 py-2 hover:scale-95 transition cursor-pointer"
            >
              🇧🇷 <span>Português</span>
            </button>
          </SectionTransition>

          <SectionTransition direction="left" delay={0.400}>
            <button
              onClick={() => {
                switchLanguage('en');
                handleClose();
              }}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:scale-95 transition"
            >
              🇺🇸 <span>English</span>
            </button>
          </SectionTransition>
        </div>
      )}
    </div>
  );
}
