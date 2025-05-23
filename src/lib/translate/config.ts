'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import homeEN from '../../../public/locales/en/home.json';
import homePT from '../../../public/locales/pt/home.json';

import bookingEN from '../../../public/locales/en/booking.json';
import bookingPT from '../../../public/locales/pt/booking.json';

import confirmationPT from '../../../public/locales/pt/confirmation.json';
import confirmationEN from '../../../public/locales/en/confirmation.json';

import aboutPT from '../../../public/locales/pt/about.json';
import aboutEN from '../../../public/locales/en/about.json';

import benefitsPT from '../../../public/locales/pt/benefits.json';
import benefitsEN from '../../../public/locales/en/benefits.json';

import faqPT from '../../../public/locales/pt/faq.json';
import faqEN from '../../../public/locales/en/faq.json';

import ctaPT from '../../../public/locales/pt/cta.json';
import ctaEN from '../../../public/locales/en/cta.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        home: homeEN,
        booking: bookingEN,
        confirmation: confirmationEN,
        about: aboutEN,
        benefits: benefitsEN,
        faq: faqEN,
        cta: ctaEN,
      },
      pt: {
        home: homePT,
        booking: bookingPT,
        confirmation: confirmationPT,
        about: aboutPT,
        benefits: benefitsPT,
        faq: faqPT,
        cta: ctaPT,
      },
    },
    lng: 'pt',
    fallbackLng: 'pt',
    ns: ['home'],
    defaultNS: 'home',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
