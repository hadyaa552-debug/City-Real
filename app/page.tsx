"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

// ─── Constants (غيّرهم لما يجهزوا) ─────────────────────────
const P = "01008900076";         // رقم التليفون
const PD = "+201008900076";      // رقم الاتصال المباشر
const PI = "201008900076";       // رقم الواتساب
const WN = "201008900076";       // واتساب بدون +
const WK = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"; // Web3Forms Key
const GA_ID = "AW-XXXXXXXXXX";   // Google Ads ID
const CONV_FORM = "XXXXXXXXXXX"; // Form conversion label
const CONV_WA = "XXXXXXXXXXX";   // WhatsApp conversion label
const CONV_CALL = "XXXXXXXXXXX"; // Call conversion label

// ─── Tracking ─────────────────────────────────────────────
function trackCall() {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "conversion", {
      send_to: `${GA_ID}/${CONV_CALL}`,
    });
  }
}
function trackWA() {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "conversion", {
      send_to: `${GA_ID}/${CONV_WA}`,
    });
  }
}
function trackLead() {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "conversion", {
      send_to: `${GA_ID}/${CONV_FORM}`,
    });
  }
}

// ─── Project Data ─────────────────────────────────────────
const projects = [
  {
    id: "mazarine",
    name: "مزارين",
    nameEn: "Mazarine",
    location: "العلمين الجديدة",
    tagline: "أول مجتمع ساحلي متكامل في العلمين الجديدة",
    description:
      "مشروع سكني ساحلي فاخر على مساحة 707 فدان بإطلالة مباشرة على اللاجون وشاطئ البحر المتوسط. شاليهات وفلل وتاون هاوس بتصميم عصري وتشطيب كامل.",
    image:
      "https://cityedgedevelopments.com/cityedgedevelopmentswordpress/wp-content/uploads/2025/07/Maz-Apt-2-scaled.jpg",
    specs: [
      { value: "707", label: "فدان" },
      { value: "من 141 م²", label: "المساحات" },
      { value: "5%", label: "مقدم" },
      { value: "12 سنة", label: "تقسيط" },
    ],
    price: "9,770,000",
    unitTypes: "شاليهات — فلل — تاون هاوس — شقق",
    color: "#1a7ab5",
  },
  {
    id: "garden-city",
    name: "جاردن سيتي هايتس",
    nameEn: "Garden City Heights",
    location: "العاصمة الإدارية الجديدة",
    tagline: "حياة راقية في قلب العاصمة الإدارية",
    description:
      "شقق سكنية راقية بإطلالة مرتفعة مميزة. كل مبنى بطابقين بدروم للجراج. حدائق داخلية وأفنية لكل المباني بتصميم عصري متكامل.",
    image:
      "https://cityedgedevelopments.com/cityedgedevelopmentswordpress/wp-content/uploads/2025/07/R5_New_Capital_02lll-scaled.jpg",
    specs: [
      { value: "من 76 م²", label: "المساحات" },
      { value: "1-4", label: "غرف نوم" },
      { value: "5%", label: "مقدم" },
      { value: "10 سنوات", label: "تقسيط" },
    ],
    price: "7,000,000",
    unitTypes: "شقق سكنية — بنتهاوس",
    color: "#2d8a56",
  },
  {
    id: "almaqsad",
    name: "المقصد ريزيدنس",
    nameEn: "AlMaqsad Residences",
    location: "العاصمة الإدارية الجديدة",
    tagline: "مجتمع سكني بتصميمات عالمية متنوعة",
    description:
      "مجتمع سكني متكامل بتصميمات كلاسيكية ومتوسطية وعصرية. منطقتين سكنيتين بحدائق داخلية وممرات مشاة. وحدات أنيقة وعملية بأسعار مناسبة.",
    image:
      "https://cityedgedevelopments.com/cityedgedevelopmentswordpress/wp-content/uploads/2025/07/AlMaqsad-New-Capital-scaled.jpg",
    specs: [
      { value: "من 90 م²", label: "المساحات" },
      { value: "1-3", label: "غرف نوم" },
      { value: "10%", label: "مقدم" },
      { value: "10 سنوات", label: "تقسيط" },
    ],
    price: "5,500,000",
    unitTypes: "شقق — دوبلكس — بنتهاوس",
    color: "#8b6914",
  },
];

const stats = [
  { value: "6", label: "وجهات رئيسية" },
  { value: "30+", label: "مشروع متكامل" },
  { value: "15.1M", label: "م² مساحة مطورة" },
  { value: "+10,000", label: "عائلة سعيدة" },
];

// ═══════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════
export default function CityEdgeLanding() {
  const [showCookie, setShowCookie] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [selectedProject, setSelectedProject] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  // ── Cookie consent ──
  useEffect(() => {
    const accepted = localStorage.getItem("cookie_accepted");
    if (!accepted) setShowCookie(true);
  }, []);

  // ── Scroll/Timer popup ──
  useEffect(() => {
    if (popupDismissed) return;

    const timer = setTimeout(() => {
      if (!popupDismissed) setShowPopup(true);
    }, 16000);

    const handleScroll = () => {
      const scrollPct =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPct > 57 && !popupDismissed) setShowPopup(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [popupDismissed]);

  // ── Form submit ──
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        trackLead();
        setFormStatus("sent");
        window.location.href = "/thank-you";
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* ═══ HEADER ═══ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-gold flex items-center justify-center">
              <span className="text-navy font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>CE</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">سيتي إيدج</p>
              <p className="text-gold-light text-[10px]">City Edge Developments</p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#projects" className="hover:text-gold transition">المشاريع</a>
            <a href="#developer" className="hover:text-gold transition">المطور</a>
            <a href="#contact" className="hover:text-gold transition">تواصل معنا</a>
            <a
              href={`tel:${PD}`}
              onClick={trackCall}
              className="bg-gold text-navy px-4 py-2 rounded font-semibold hover:bg-gold-light transition"
            >
              اتصل الآن
            </a>
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-white p-2"
            aria-label="القائمة"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenu ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-navy border-t border-white/10 px-4 py-4 space-y-3 text-white">
            <a href="#projects" onClick={() => setMobileMenu(false)} className="block py-2 hover:text-gold">المشاريع</a>
            <a href="#developer" onClick={() => setMobileMenu(false)} className="block py-2 hover:text-gold">المطور</a>
            <a href="#contact" onClick={() => setMobileMenu(false)} className="block py-2 hover:text-gold">تواصل معنا</a>
          </div>
        )}
      </header>

      {/* ═══ HERO ═══ */}
      <section className="relative pt-16 min-h-[90vh] flex items-center bg-navy overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-gold blur-[100px]" />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-gold blur-[120px]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(201,169,110,0.08),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-3xl">
            <p className="text-gold text-sm tracking-widest mb-4 uppercase" style={{ fontFamily: "var(--font-display)" }}>
              City Edge Developments
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              اختر وجهتك مع
              <br />
              <span className="text-gold">سيتي إيدج</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              من ساحل العلمين الجديدة إلى قلب العاصمة الإدارية — مشاريع سكنية متكاملة بأنظمة سداد مرنة تبدأ من 5% مقدم وتقسيط حتى 12 سنة.
            </p>

            {/* Project quick links */}
            <div className="flex flex-wrap gap-3 mb-10">
              {projects.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="group flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3 hover:bg-gold/10 hover:border-gold/40 transition"
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  <span className="text-white text-sm">{p.name}</span>
                  <span className="text-white/40 text-xs">— من {p.price} ج.م</span>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToForm}
                className="bg-gold text-navy px-8 py-3.5 rounded-lg font-semibold text-lg hover:bg-gold-light transition shadow-lg shadow-gold/20"
              >
                احجز وحدتك الآن
              </button>
              <a
                href={`https://wa.me/${WN}?text=${encodeURIComponent("أهلاً، عايز أستفسر عن مشاريع سيتي إيدج")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWA}
                className="flex items-center gap-2 bg-[#25d366] text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-[#20bd5a] transition"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.31-.726-5.993-1.957l-.42-.306-2.647.887.887-2.647-.306-.42A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
                واتساب
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="bg-cream py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-navy" style={{ fontFamily: "var(--font-display)" }}>
                  {s.value}
                </p>
                <p className="text-muted text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-gold text-sm tracking-widest mb-3" style={{ fontFamily: "var(--font-display)" }}>
              OUR DESTINATIONS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy">مشاريعنا</h2>
            <div className="gold-line max-w-xs mx-auto mt-6" />
          </div>

          <div className="space-y-24">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                id={project.id}
                className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 items-center`}
              >
                {/* Image */}
                <div className="lg:w-1/2 w-full relative group">
                  <div className="overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-[300px] md:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div
                    className="absolute -bottom-3 right-6 bg-white rounded-xl shadow-lg px-5 py-3 flex items-center gap-2"
                  >
                    <span className="w-3 h-3 rounded-full" style={{ background: project.color }} />
                    <span className="text-sm font-semibold text-navy">{project.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2 w-full">
                  <p className="text-xs text-gold tracking-widest mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {project.nameEn}
                  </p>
                  <h3 className="text-3xl font-bold text-navy mb-2">{project.name}</h3>
                  <p className="text-muted text-sm mb-4">{project.tagline}</p>
                  <p className="text-text leading-relaxed mb-6">{project.description}</p>

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {project.specs.map((spec, si) => (
                      <div key={si} className="bg-slate rounded-xl p-4 text-center">
                        <p className="text-lg font-bold text-navy">{spec.value}</p>
                        <p className="text-xs text-muted mt-1">{spec.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-sm text-muted">أنواع الوحدات:</span>
                    <span className="text-sm font-semibold text-navy">{project.unitTypes}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="bg-navy rounded-xl px-6 py-3">
                      <p className="text-[10px] text-white/60">الأسعار تبدأ من*</p>
                      <p className="text-xl font-bold text-gold">{project.price} <span className="text-sm">ج.م</span></p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProject(`${project.name} — ${project.nameEn}`);
                        scrollToForm();
                      }}
                      className="bg-gold text-navy px-6 py-3 rounded-xl font-semibold hover:bg-gold-light transition"
                    >
                      استفسر عن {project.name}
                    </button>
                    <a
                      href={`tel:${PD}`}
                      onClick={trackCall}
                      className="flex items-center gap-2 border border-navy/20 rounded-xl px-5 py-3 text-navy hover:bg-navy hover:text-white transition"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                      اتصل
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DEVELOPER ═══ */}
      <section id="developer" className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold text-sm tracking-widest mb-3" style={{ fontFamily: "var(--font-display)" }}>
              THE DEVELOPER
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">سيتي إيدج للتطوير العقاري</h2>
            <div className="gold-line max-w-xs mx-auto mb-8" />
            <p className="text-white/70 leading-relaxed text-lg mb-8">
              سيتي إيدج للتطوير العقاري — شركة رائدة في التطوير العقاري المصري تأسست بشراكة بين هيئة المجتمعات العمرانية الجديدة وبنك التعمير والإسكان.
              تمتلك الشركة محفظة مشاريع متنوعة تغطي 6 وجهات رئيسية بإجمالي مساحة مطورة تتجاوز 15 مليون متر مربع.
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
              <div>
                <p className="text-2xl font-bold text-gold" style={{ fontFamily: "var(--font-display)" }}>6</p>
                <p className="text-xs text-white/50">وجهات</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gold" style={{ fontFamily: "var(--font-display)" }}>30+</p>
                <p className="text-xs text-white/50">مشروع</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gold" style={{ fontFamily: "var(--font-display)" }}>15.1M م²</p>
                <p className="text-xs text-white/50">مساحة مطورة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT FORM ═══ */}
      <section id="contact" ref={formRef} className="py-20 bg-cream">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-gold text-sm tracking-widest mb-3" style={{ fontFamily: "var(--font-display)" }}>
              GET IN TOUCH
            </p>
            <h2 className="text-3xl font-bold text-navy">سجّل اهتمامك</h2>
            <p className="text-muted mt-3">سيتواصل معك أحد مستشارينا خلال 24 ساعة</p>
            <div className="gold-line max-w-xs mx-auto mt-6" />
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-5">
            <input type="hidden" name="access_key" value={WK} />
            <input type="hidden" name="subject" value="New Lead — City Edge Landing Page" />
            <input type="hidden" name="from_name" value="City Edge Landing" />
            <input type="hidden" name="cc" value="leads@grandeur-spaces.com" />
            <input type="checkbox" name="botcheck" className="hidden" />

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">الاسم الكامل</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
                placeholder="محمد أحمد"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">رقم الموبايل</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
                placeholder="01xxxxxxxxx"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">المشروع المهتم بيه</label>
              <select
                name="project"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition bg-white"
              >
                <option value="">كل المشاريع</option>
                {projects.map((p) => (
                  <option key={p.id} value={`${p.name} — ${p.nameEn}`}>
                    {p.name} | {p.location} | من {p.price} ج.م
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1">ملاحظات (اختياري)</label>
              <textarea
                name="message"
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition resize-none"
                placeholder="مساحة معينة، ميزانية، أي تفاصيل..."
              />
            </div>

            <button
              type="submit"
              disabled={formStatus === "sending"}
              className="w-full bg-gold text-navy py-4 rounded-xl font-bold text-lg hover:bg-gold-light transition disabled:opacity-60"
            >
              {formStatus === "sending" ? "جاري الإرسال..." : "أرسل استفساري"}
            </button>
            {formStatus === "error" && (
              <p className="text-red-600 text-sm text-center">حصل خطأ، حاول تاني أو اتصل بينا مباشرة.</p>
            )}
          </form>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-dark text-white/60 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded bg-gold flex items-center justify-center">
                  <span className="text-navy font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>CE</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">سيتي إيدج للتطوير العقاري</p>
                  <p className="text-gold-light text-[10px]">City Edge Developments</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                شراكة بين هيئة المجتمعات العمرانية وبنك التعمير والإسكان.
                أكثر من 30 مشروع عقاري في 6 وجهات رئيسية.
              </p>
            </div>

            {/* Projects */}
            <div>
              <h4 className="text-white font-semibold mb-4">المشاريع</h4>
              <div className="space-y-2 text-sm">
                {projects.map((p) => (
                  <a key={p.id} href={`#${p.id}`} className="block hover:text-gold transition">
                    {p.name} — {p.location}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">تواصل معنا</h4>
              <div className="space-y-3 text-sm">
                <a href={`tel:${PD}`} onClick={trackCall} className="block hover:text-gold transition" dir="ltr">
                  {P}
                </a>
                <a
                  href={`https://wa.me/${WN}?text=${encodeURIComponent("أهلاً، عايز أستفسر عن مشاريع سيتي إيدج")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWA}
                  className="block hover:text-gold transition"
                >
                  واتساب
                </a>
                <a href="mailto:apkzoz85@gmail.com" className="block hover:text-gold transition" dir="ltr">
                  apkzoz85@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="gold-line mb-6" />

          {/* Disclaimers */}
          <div className="space-y-3 text-xs text-white/40 text-center">
            <p>
              * الأسعار المذكورة أسعار استرشادية قابلة للتغيير وفقاً لسياسة المطور. للحصول على الأسعار المحدثة يرجى التواصل معنا.
            </p>
            <p>
              هذه الصفحة مقدمة من{" "}
              <a href="https://grandeur-spaces.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                Grandeur Spaces
              </a>{" "}
              كوكيل معتمد لـ سيتي إيدج للتطوير العقاري. Grandeur Spaces ليست المطور العقاري.
            </p>
            <p>
              <button onClick={() => setShowPrivacy(true)} className="text-gold hover:underline">
                سياسة الخصوصية
              </button>
            </p>
            <p className="mt-4">© {new Date().getFullYear()} Grandeur Spaces. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* ═══ WHATSAPP FLOAT ═══ */}
      <a
        href={`https://wa.me/${WN}?text=${encodeURIComponent("أهلاً، عايز أستفسر عن مشاريع سيتي إيدج")}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackWA}
        className="fixed bottom-24 left-5 md:bottom-8 md:left-8 z-40 bg-[#25d366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="واتساب"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.31-.726-5.993-1.957l-.42-.306-2.647.887.887-2.647-.306-.42A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
        </svg>
      </a>

      {/* ═══ MOBILE BOTTOM BAR ═══ */}
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-navy z-50 border-t border-white/10 grid grid-cols-3 h-16">
        <a
          href={`tel:${PD}`}
          onClick={trackCall}
          className="flex flex-col items-center justify-center text-white gap-0.5"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          <span className="text-[10px]">اتصل</span>
        </a>
        <a
          href={`https://wa.me/${WN}?text=${encodeURIComponent("أهلاً، عايز أستفسر عن مشاريع سيتي إيدج")}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWA}
          className="flex flex-col items-center justify-center text-[#25d366] gap-0.5"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
          </svg>
          <span className="text-[10px]">واتساب</span>
        </a>
        <button
          onClick={scrollToForm}
          className="flex flex-col items-center justify-center text-gold gap-0.5"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <span className="text-[10px]">استفسار</span>
        </button>
      </div>

      {/* ═══ POPUP ═══ */}
      {showPopup && !popupDismissed && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-fade-up">
            <button
              onClick={() => { setShowPopup(false); setPopupDismissed(true); }}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">عروض حصرية على مشاريع سيتي إيدج</h3>
              <p className="text-muted text-sm mb-6">سجّل بياناتك دلوقتي واحصل على أفضل سعر وأطول فترة سداد</p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { setShowPopup(false); setPopupDismissed(true); scrollToForm(); }}
                  className="bg-gold text-navy py-3 rounded-xl font-semibold hover:bg-gold-light transition"
                >
                  سجّل اهتمامك
                </button>
                <a
                  href={`https://wa.me/${WN}?text=${encodeURIComponent("أهلاً، عايز أستفسر عن عروض سيتي إيدج")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { trackWA(); setShowPopup(false); setPopupDismissed(true); }}
                  className="bg-[#25d366] text-white py-3 rounded-xl font-semibold hover:bg-[#20bd5a] transition"
                >
                  تواصل واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ PRIVACY MODAL ═══ */}
      {showPrivacy && (
        <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-8 relative">
            <button
              onClick={() => setShowPrivacy(false)}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-navy mb-4">سياسة الخصوصية</h3>
            <div className="text-sm text-text space-y-3 leading-relaxed">
              <p>تلتزم Grandeur Spaces بحماية خصوصية بياناتك الشخصية.</p>
              <p>البيانات التي نجمعها (الاسم، رقم الهاتف، البريد الإلكتروني) تُستخدم فقط للتواصل معك بخصوص استفسارك العقاري.</p>
              <p>لا نشارك بياناتك مع أي طرف ثالث باستثناء المطور العقاري (سيتي إيدج للتطوير العقاري) لغرض الرد على استفسارك.</p>
              <p>يمكنك طلب حذف بياناتك في أي وقت عبر التواصل معنا على البريد الإلكتروني.</p>
              <p>نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربة التصفح وقياس أداء الحملات الإعلانية.</p>
              <p>هذا الموقع ليس الموقع الرسمي لشركة سيتي إيدج للتطوير العقاري. Grandeur Spaces وكيل معتمد للمبيعات.</p>
            </div>
          </div>
        </div>
      )}

      {/* ═══ COOKIE CONSENT ═══ */}
      {showCookie && (
        <div className="cookie-banner">
          <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك. بمتابعة التصفح فإنك توافق على ذلك.</p>
          <button
            onClick={() => {
              localStorage.setItem("cookie_accepted", "true");
              setShowCookie(false);
            }}
          >
            موافق
          </button>
        </div>
      )}
    </>
  );
}
