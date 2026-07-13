"use client";

import { useEffect } from "react";

const GA_ID = "AW-XXXXXXXXXX";
const CONV_FORM = "XXXXXXXXXXX";

export default function ThankYou() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: `${GA_ID}/${CONV_FORM}`,
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✓</span>
        </div>
        <h1 className="text-2xl font-bold text-navy mb-3">شكراً لتواصلك معنا!</h1>
        <p className="text-muted leading-relaxed mb-8">
          تم استلام استفسارك بنجاح. سيتواصل معك أحد مستشارينا العقاريين خلال 24 ساعة.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="/"
            className="bg-gold text-navy py-3 rounded-xl font-semibold hover:bg-gold-light transition"
          >
            العودة للصفحة الرئيسية
          </a>
          <a
            href="https://wa.me/201001050018?text=أهلاً، سجلت استفساري وعايز أتكلم مباشرة"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25d366] text-white py-3 rounded-xl font-semibold hover:bg-[#20bd5a] transition"
          >
            تواصل واتساب فوراً
          </a>
        </div>
      </div>
    </div>
  );
}
