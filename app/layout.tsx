import type { Metadata } from "next";
import "./globals.css";

// ─── Google Ads ID (غيّره لما يجهز) ───
const GA_ID = "AW-XXXXXXXXXX";

export const metadata: Metadata = {
  title: "سيتي إيدج للتطوير العقاري | مزارين • جاردن سيتي • المقصد",
  description:
    "اكتشف مشاريع سيتي إيدج: مزارين العلمين الجديدة، جاردن سيتي هايتس العاصمة الإدارية، المقصد ريزيدنس. أسعار تبدأ من 7 مليون جنيه وتقسيط حتى 12 سنة.",
  keywords:
    "سيتي إيدج, مزارين, جاردن سيتي, المقصد, العلمين الجديدة, العاصمة الإدارية, شقق, فلل, شاليهات",
  openGraph: {
    title: "سيتي إيدج للتطوير العقاري",
    description: "مزارين • جاردن سيتي هايتس • المقصد ريزيدنس",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Google Ads gtag */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
