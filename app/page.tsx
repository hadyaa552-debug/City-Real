"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

// ─── Constants (غيّرهم لما يجهزوا) ─────────────────────────
const P = "01008900076";
const PD = "+201008900076";
const PI = "201008900076";
const WN = "201008900076";
const WK = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX";
const GA_ID = "AW-XXXXXXXXXX";
const CONV_FORM = "XXXXXXXXXXX";
const CONV_WA = "XXXXXXXXXXX";
const CONV_CALL = "XXXXXXXXXXX";

// ─── Tracking ──────────────────────────────────────────────
function trackCall() {
  if (typeof window !== "undefined" && (window as any).gtag)
    (window as any).gtag("event", "conversion", { send_to: `${GA_ID}/${CONV_CALL}` });
}
function trackWA() {
  if (typeof window !== "undefined" && (window as any).gtag)
    (window as any).gtag("event", "conversion", { send_to: `${GA_ID}/${CONV_WA}` });
}
function trackLead() {
  if (typeof window !== "undefined" && (window as any).gtag)
    (window as any).gtag("event", "conversion", { send_to: `${GA_ID}/${CONV_FORM}` });
}

// ─── Data ──────────────────────────────────────────────────
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
      "https://cityedgedevelopments.com/cityedgedevelopmentswordpress/wp-content/uploads/2025/07/Maz-Apt-2-1024x683.jpg",
    specs: [
      { value: "707", unit: "فدان", label: "المساحة الإجمالية" },
      { value: "من 141", unit: "م²", label: "مساحات الوحدات" },
      { value: "5%", unit: "", label: "مقدم" },
      { value: "12", unit: "سنة", label: "تقسيط" },
    ],
    price: "9,770,000",
    priceShort: "9.7M",
    unitTypes: "شاليهات — فلل — تاون هاوس — شقق",
    delivery: "2027",
    color: "#1a7ab5",
    badge: "ساحلي",
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
      "https://cityedgedevelopments.com/cityedgedevelopmentswordpress/wp-content/uploads/2025/07/R5_New_Capital_02lll-1024x683.jpg",
    specs: [
      { value: "من 76", unit: "م²", label: "مساحات الوحدات" },
      { value: "1–4", unit: "غرف", label: "غرف النوم" },
      { value: "5%", unit: "", label: "مقدم" },
      { value: "10", unit: "سنوات", label: "تقسيط" },
    ],
    price: "7,000,000",
    priceShort: "7M",
    unitTypes: "شقق سكنية — بنتهاوس",
    delivery: "2027",
    color: "#2d8a56",
    badge: "الأعلى طلباً",
  },
  {
    id: "almaqsad",
    name: "المقصد ريزيدنس",
    nameEn: "AlMaqsad Residences",
    location: "العاصمة الإدارية الجديدة",
    tagline: "تصميمات عالمية متنوعة بأسعار مناسبة",
    description:
      "مجتمع سكني متكامل بتصميمات كلاسيكية ومتوسطية وعصرية. منطقتين سكنيتين بحدائق داخلية وممرات مشاة. وحدات أنيقة وعملية بأسعار مناسبة.",
    image:
      "https://cityedgedevelopments.com/cityedgedevelopmentswordpress/wp-content/uploads/2025/07/Al_Maqsad_34-Copy-1-1024x597.jpg",
    specs: [
      { value: "من 90", unit: "م²", label: "مساحات الوحدات" },
      { value: "1–3", unit: "غرف", label: "غرف النوم" },
      { value: "10%", unit: "", label: "مقدم" },
      { value: "10", unit: "سنوات", label: "تقسيط" },
    ],
    price: "5,500,000",
    priceShort: "5.5M",
    unitTypes: "شقق — دوبلكس — بنتهاوس",
    delivery: "2026",
    color: "#8b6914",
    badge: "أقل سعر دخول",
  },
];

const stats = [
  { value: "6", label: "وجهات رئيسية" },
  { value: "30+", label: "مشروع متكامل" },
  { value: "15.1M", label: "م² مساحة مطورة" },
  { value: "+10,000", label: "عائلة سعيدة" },
];

const reasons = [
  {
    num: "01",
    title: "شراكة حكومية",
    desc: "شراكة بين هيئة المجتمعات العمرانية الجديدة وبنك التعمير والإسكان — ضمان وموثوقية.",
  },
  {
    num: "02",
    title: "6 وجهات استراتيجية",
    desc: "من العلمين الجديدة للعاصمة الإدارية — تنوع جغرافي يناسب كل احتياج.",
  },
  {
    num: "03",
    title: "أنظمة سداد مرنة",
    desc: "مقدم يبدأ من 5% وتقسيط حتى 12 سنة بدون فوائد.",
  },
  {
    num: "04",
    title: "تسليم ملتزم",
    desc: "سجل حافل في الالتزام بمواعيد التسليم مع تشطيب كامل.",
  },
  {
    num: "05",
    title: "+30 مشروع متكامل",
    desc: "محفظة مشاريع متنوعة تغطي سكني وساحلي وتجاري وفندقي.",
  },
  {
    num: "06",
    title: "15 مليون م² مطورة",
    desc: "من أكبر المطورين العقاريين في مصر من حيث المساحة المطورة.",
  },
];

// ═══════════════════════════════════════════════════════════
// FORM COMPONENT (reused top & bottom)
// ═══════════════════════════════════════════════════════════
function RegistrationForm({
  variant,
  selectedProject,
  setSelectedProject,
}: {
  variant: "hero" | "bottom";
  selectedProject: string;
  setSelectedProject: (v: string) => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        trackLead();
        setStatus("sent");
        if (variant === "hero") {
          // stay on page, show success
        } else {
          window.location.href = "/thank-you";
        }
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl text-green-600">✓</span>
        </div>
        <p className="font-bold text-lg" style={{ color: variant === "hero" ? "#fff" : "#1a2744" }}>
          تم استلام بياناتك بنجاح
        </p>
        <p className={variant === "hero" ? "text-white/60 text-sm mt-1" : "text-gray-500 text-sm mt-1"}>
          هيتواصل معاك فريقنا خلال دقائق بالأسعار الكاملة
        </p>
      </div>
    );
  }

  const inputBase =
    variant === "hero"
      ? "w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition"
      : "w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition";

  const selectBase =
    variant === "hero"
      ? "w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition appearance-none [&>option]:text-navy [&>option]:bg-white"
      : "w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition bg-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="hidden" name="access_key" value={WK} />
      <input type="hidden" name="subject" value="New Lead — City Edge Landing Page" />
      <input type="hidden" name="from_name" value="City Edge Landing" />
      {/* <input type="hidden" name="cc" value="YOUR_CC_EMAIL" /> */}
      <input type="checkbox" name="botcheck" className="hidden" />

      <input type="text" name="name" required placeholder="الاسم بالكامل" className={inputBase} />
      <input type="tel" name="phone" required placeholder="رقم الموبايل" className={inputBase} dir="ltr" />
      <select
        name="project"
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
        className={selectBase}
      >
        <option value="">المشروع المهتم بيه</option>
        {projects.map((p) => (
          <option key={p.id} value={`${p.name} — ${p.nameEn}`}>
            {p.name} | {p.location}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gold text-navy py-3.5 rounded-lg font-bold text-base hover:bg-gold-light transition disabled:opacity-60"
      >
        {status === "sending" ? "جاري الإرسال..." : "سجل الآن واعرف الأسعار ←"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-xs text-center">حصل خطأ، حاول تاني.</p>
      )}
      <p className={`text-xs text-center ${variant === "hero" ? "text-white/40" : "text-gray-400"}`}>
        🔒 بياناتك آمنة، وهنتواصل معاك بخصوص المشاريع بس
      </p>
    </form>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════
export default function CityEdgeLanding() {
  const [showCookie, setShowCookie] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const bottomFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_accepted");
    if (!accepted) setShowCookie(true);
  }, []);

  useEffect(() => {
    if (popupDismissed) return;
    const timer = setTimeout(() => {
      if (!popupDismissed) setShowPopup(true);
    }, 16000);
    const handleScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (pct > 57 && !popupDismissed) setShowPopup(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [popupDismissed]);

  function scrollToBottom() {
    bottomFormRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const waLink = `https://wa.me/${WN}?text=${encodeURIComponent("أهلاً، عايز أستفسر عن مشاريع سيتي إيدج")}`;

  return (
    <>
      {/* ═══ HEADER ═══ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded bg-gold flex items-center justify-center">
              <span className="text-navy font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>CE</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-none">سيتي إيدج</p>
              <p className="text-gold-light text-[10px]">City Edge Developments</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-[13px] text-white/80">
            <a href="#projects" className="hover:text-gold transition">المشاريع</a>
            <a href="#units" className="hover:text-gold transition">الوحدات</a>
            <a href="#payment" className="hover:text-gold transition">خطة السداد</a>
            <a href="#location" className="hover:text-gold transition">الموقع</a>
            <a href="#register" className="hover:text-gold transition">التسجيل</a>
            <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={trackWA}
              className="bg-[#25d366] text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-[#20bd5a] transition">
              واتساب
            </a>
          </nav>

          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-white p-2" aria-label="القائمة">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenu ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-navy border-t border-white/10 px-4 py-3 space-y-2 text-white text-sm">
            {["projects","units","payment","location","register"].map(s => (
              <a key={s} href={`#${s}`} onClick={() => setMobileMenu(false)} className="block py-1.5 hover:text-gold">
                {{projects:"المشاريع",units:"الوحدات",payment:"خطة السداد",location:"الموقع",register:"التسجيل"}[s]}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ═══ HERO + INLINE FORM ═══ */}
      <section className="relative pt-14 min-h-[100vh] md:min-h-[90vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://cityedgedevelopments.com/cityedgedevelopmentswordpress/wp-content/uploads/2025/07/Maz-Apt-1-1024x683.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-navy/95 via-navy/90 to-navy/75" />
        </div>
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-gold blur-[100px]" />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-gold blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Right: Content */}
          <div className="flex-1 pt-4">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-gold text-xs font-semibold">تسجيل مبكر · اعرف الأسعار</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
              مشاريع <span className="text-gold">سيتي إيدج</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg mb-6" style={{ fontFamily: "var(--font-display)" }}>
              City Edge Developments
            </p>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-lg">
              من ساحل العلمين الجديدة إلى العاصمة الإدارية — سجّل بياناتك ويتواصل معك فريقنا بالأسعار وخطط السداد الكاملة
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {projects.map((p) => (
                <a key={p.id} href={`#${p.id}`}
                  className="group bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:border-gold/30 hover:bg-gold/5 transition">
                  <p className="text-gold font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>{p.priceShort}</p>
                  <p className="text-white/80 text-xs mt-0.5">{p.name}</p>
                  <p className="text-white/40 text-[10px]">{p.location}</p>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1a7ab5]" /> ساحلي
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2d8a56]" /> العاصمة الإدارية
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8b6914]" /> أسعار مناسبة
              </span>
            </div>
          </div>

          {/* Left: Form */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white/[0.06] backdrop-blur border border-white/10 rounded-2xl p-6">
              <p className="text-white font-bold text-base mb-1 text-center">احجز اهتمامك الآن</p>
              <p className="text-white/50 text-xs mb-5 text-center">سجل بياناتك ويتواصل معك فريقنا بأسعار وخطط السداد الكاملة</p>
              <RegistrationForm variant="hero" selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DEVELOPER STRIP ═══ */}
      <section className="bg-cream py-4 border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted">
          <span className="flex items-center gap-1.5 font-semibold text-navy">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" /> سيتي إيدج
          </span>
          <span>مطور موثوق</span>
          <span>شراكة حكومية</span>
          <span>تسليم ملتزم</span>
          <span>تشطيب كامل</span>
          <span>أنظمة سداد مرنة</span>
        </div>
      </section>

      {/* ═══ ABOUT + STATS (بالأرقام) ═══ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-gold text-xs tracking-widest mb-2" style={{ fontFamily: "var(--font-display)" }}>CITY EDGE DEVELOPMENTS</p>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">سيتي إيدج للتطوير العقاري</h2>
            <p className="text-muted leading-relaxed">
              شركة رائدة تأسست بشراكة بين هيئة المجتمعات العمرانية الجديدة وبنك التعمير والإسكان.
              تمتلك محفظة مشاريع متنوعة تغطي 6 وجهات رئيسية بمساحة تتجاوز 15 مليون متر مربع.
            </p>
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-muted">سيتي إيدج بالأرقام</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-cream rounded-xl p-6 text-center">
                <p className="text-3xl md:text-4xl font-bold text-navy" style={{ fontFamily: "var(--font-display)" }}>{s.value}</p>
                <p className="text-muted text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS (المشاريع المتاحة) ═══ */}
      <section id="projects" className="py-16 bg-slate">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold text-xs tracking-widest mb-2" style={{ fontFamily: "var(--font-display)" }}>OUR PROJECTS</p>
            <h2 className="text-2xl md:text-3xl font-bold text-navy">المشاريع المتاحة</h2>
            <p className="text-muted text-sm mt-2">3 مشاريع متكاملة — من الساحل للعاصمة الإدارية</p>
          </div>

          <div className="space-y-20">
            {projects.map((project, idx) => (
              <div key={project.id} id={project.id}
                className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-stretch`}>
                
                {/* Image */}
                <div className="lg:w-1/2 w-full relative group">
                  <div className="overflow-hidden rounded-2xl h-full min-h-[280px] md:min-h-[400px] relative">
                    <img src={project.image} alt={project.name}
                      className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700" />
                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-navy/80 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                      {project.badge}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2 w-full flex flex-col justify-center">
                  <p className="text-xs text-gold tracking-widest mb-1" style={{ fontFamily: "var(--font-display)" }}>{project.nameEn}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-navy mb-1">{project.name}</h3>
                  <p className="text-muted text-sm mb-4 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: project.color }} />
                    {project.location}
                  </p>
                  <p className="text-text leading-relaxed mb-6">{project.description}</p>

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {project.specs.map((spec, si) => (
                      <div key={si} className="bg-white rounded-xl p-3 text-center shadow-sm">
                        <p className="text-lg font-bold text-navy">
                          {spec.value}<span className="text-xs text-muted mr-0.5">{spec.unit}</span>
                        </p>
                        <p className="text-[10px] text-muted mt-0.5">{spec.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="bg-navy rounded-xl px-5 py-3 inline-block">
                      <p className="text-[10px] text-white/50">يبدأ من*</p>
                      <p className="text-xl font-bold text-gold">{project.price} <span className="text-xs">ج.م</span></p>
                    </div>
                    <a href={`https://wa.me/${WN}?text=${encodeURIComponent(`أهلاً، عايز أستفسر عن ${project.name} — سيتي إيدج`)}`}
                      target="_blank" rel="noopener noreferrer" onClick={trackWA}
                      className="bg-[#25d366] text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-[#20bd5a] transition flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.31-.726-5.993-1.957l-.42-.306-2.647.887.887-2.647-.306-.42A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                      احجز عبر واتساب
                    </a>
                    <a href={`tel:${PD}`} onClick={trackCall}
                      className="border border-navy/20 text-navy px-4 py-3 rounded-xl text-sm hover:bg-navy hover:text-white transition">
                      اتصل الآن
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ UNITS COMPARISON (الوحدات المتاحة) ═══ */}
      <section id="units" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-gold text-xs tracking-widest mb-2" style={{ fontFamily: "var(--font-display)" }}>AVAILABLE UNITS</p>
            <h2 className="text-2xl md:text-3xl font-bold text-navy">الوحدات المتاحة</h2>
            <p className="text-muted text-sm mt-2">مقارنة سريعة بين مشاريع سيتي إيدج — الأسعار أقل سعر بداية لكل مشروع</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {projects.map((p) => (
              <div key={p.id} className="bg-cream rounded-2xl overflow-hidden border border-transparent hover:border-gold/30 transition group">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.image} alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 text-[10px] font-bold text-white px-2.5 py-1 rounded-full" style={{ background: p.color }}>
                    {p.badge}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-navy text-lg mb-0.5">{p.name}</h3>
                  <p className="text-muted text-xs mb-3">{p.location}</p>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted">الوحدات</span>
                      <span className="font-semibold text-navy">{p.unitTypes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">المساحات</span>
                      <span className="font-semibold text-navy">{p.specs[0].value} {p.specs[0].unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">مقدم</span>
                      <span className="font-semibold text-navy">{p.specs[2].value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">تقسيط</span>
                      <span className="font-semibold text-navy">{p.specs[3].value} {p.specs[3].unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">التسليم</span>
                      <span className="font-semibold text-navy">{p.delivery}</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-[10px] text-muted">يبدأ من*</p>
                    <p className="text-xl font-bold text-navy mb-3">{p.price} <span className="text-xs text-muted">ج.م</span></p>
                    <a href={`https://wa.me/${WN}?text=${encodeURIComponent(`أهلاً، عايز أستفسر عن ${p.name}`)}`}
                      target="_blank" rel="noopener noreferrer" onClick={trackWA}
                      className="block w-full bg-[#25d366] text-white text-center py-2.5 rounded-lg font-semibold text-sm hover:bg-[#20bd5a] transition">
                      احجز عبر واتساب
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted text-center mt-6 max-w-2xl mx-auto">
            الأسعار المعروضة هي أقل سعر بداية لكل مشروع وفقاً لقائمة الأسعار الرسمية من سيتي إيدج.
            الأسعار تختلف حسب المساحة الفعلية ونظام السداد، وتخضع للتوافر وقت الحجز.
          </p>
        </div>
      </section>

      {/* ═══ PAYMENT PLANS ═══ */}
      <section id="payment" className="py-16 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-gold text-xs tracking-widest mb-2" style={{ fontFamily: "var(--font-display)" }}>PAYMENT PLANS</p>
            <h2 className="text-2xl md:text-3xl font-bold">خطط السداد المتاحة</h2>
            <p className="text-white/50 text-sm mt-2">أنظمة سداد مرنة تناسب كل ميزانية</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-10">
            {projects.map((p) => (
              <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-gold/30 transition">
                <div className="w-3 h-3 rounded-full mx-auto mb-3" style={{ background: p.color }} />
                <h3 className="font-bold text-lg mb-1">{p.name}</h3>
                <p className="text-white/40 text-xs mb-5">{p.location}</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50">مقدم</span>
                    <span className="font-bold text-gold">{p.specs[2].value}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50">تقسيط حتى</span>
                    <span className="font-bold text-gold">{p.specs[3].value} {p.specs[3].unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">يبدأ من</span>
                    <span className="font-bold text-gold">{p.priceShort} ج.م</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={scrollToBottom}
              className="bg-gold text-navy px-8 py-3.5 rounded-lg font-bold hover:bg-gold-light transition">
              احصل على جدول السداد الكامل
            </button>
          </div>
        </div>
      </section>

      {/* ═══ LOCATION ═══ */}
      <section id="location" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-gold text-xs tracking-widest mb-2" style={{ fontFamily: "var(--font-display)" }}>LOCATIONS</p>
            <h2 className="text-2xl md:text-3xl font-bold text-navy">مواقع المشاريع</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mazarine Location */}
            <div className="bg-cream rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-[#1a7ab5]" />
                <h3 className="font-bold text-navy">مزارين — العلمين الجديدة</h3>
              </div>
              <div className="space-y-2 text-sm text-muted">
                <div className="flex justify-between"><span>مطار العلمين الدولي</span><span className="text-navy font-semibold">20 دقيقة</span></div>
                <div className="flex justify-between"><span>مدينة العلمين الجديدة</span><span className="text-navy font-semibold">10 دقائق</span></div>
                <div className="flex justify-between"><span>القاهرة</span><span className="text-navy font-semibold">2.5 ساعة</span></div>
                <div className="flex justify-between"><span>الإسكندرية</span><span className="text-navy font-semibold">1 ساعة</span></div>
              </div>
            </div>

            {/* NAC Location */}
            <div className="bg-cream rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-[#2d8a56]" />
                <h3 className="font-bold text-navy">جاردن سيتي والمقصد — العاصمة الإدارية</h3>
              </div>
              <div className="space-y-2 text-sm text-muted">
                <div className="flex justify-between"><span>الحي الحكومي</span><span className="text-navy font-semibold">10 دقائق</span></div>
                <div className="flex justify-between"><span>مطار القاهرة الدولي</span><span className="text-navy font-semibold">45 دقيقة</span></div>
                <div className="flex justify-between"><span>القاهرة الجديدة</span><span className="text-navy font-semibold">30 دقيقة</span></div>
                <div className="flex justify-between"><span>وسط القاهرة</span><span className="text-navy font-semibold">50 دقيقة</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY CITY EDGE (6 أسباب) ═══ */}
      <section className="py-16 bg-slate">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-gold text-xs tracking-widest mb-2" style={{ fontFamily: "var(--font-display)" }}>WHY CITY EDGE</p>
            <h2 className="text-2xl md:text-3xl font-bold text-navy">ليه سيتي إيدج</h2>
            <p className="text-muted text-sm mt-2">6 أسباب تجعل مشاريع سيتي إيدج أفضل استثمار</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reasons.map((r) => (
              <div key={r.num} className="bg-white rounded-2xl p-6 hover:shadow-md transition">
                <span className="text-3xl font-bold text-gold/20" style={{ fontFamily: "var(--font-display)" }}>{r.num}</span>
                <h3 className="font-bold text-navy text-base mt-2 mb-2">{r.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM REGISTRATION FORM ═══ */}
      <section id="register" ref={bottomFormRef} className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            {/* Text */}
            <div className="flex-1 text-center lg:text-right">
              <p className="text-gold text-xs tracking-widest mb-2" style={{ fontFamily: "var(--font-display)" }}>التسجيل مفتوح الآن</p>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">كن من الأوائل في مشاريع سيتي إيدج</h2>
              <p className="text-muted leading-relaxed mb-6">
                سجّل اليوم للحصول على قائمة الأسعار الكاملة ونظام السداد.
                شارك بياناتك وسيعاود أحد المستشارين الاتصال بك.
              </p>
              <div className="space-y-3 text-sm text-muted text-right">
                <div className="flex items-center gap-2">
                  <span className="text-gold">✓</span> قائمة الأسعار الكاملة ونظام السداد
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold">✓</span> أولوية اختيار الوحدة
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gold">✓</span> استشارة عقارية مجانية
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="w-full lg:w-[420px] shrink-0">
              <div className="bg-white rounded-2xl shadow-lg p-7">
                <p className="font-bold text-navy text-center mb-1">سجّل اهتمامك</p>
                <p className="text-muted text-xs text-center mb-5">مشاريع سيتي إيدج — من العلمين للعاصمة الإدارية</p>
                <RegistrationForm variant="bottom" selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-dark text-white/50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-3 text-xs">
            <p className="text-white/30">
              هذا المحتوى تسويقي مقدم من مستشار عقاري مستقل — الأسعار والمخططات مبدئية وتخضع لقائمة أسعار المطور الرسمية عند الحجز
            </p>
            <p>
              * الأسعار المذكورة أسعار استرشادية قابلة للتغيير. للحصول على الأسعار المحدثة يرجى التواصل معنا.
            </p>
            <p>
              هذه الصفحة تسويقية مقدمة من مستشار عقاري مستقل وليست موقعاً رسمياً لشركة سيتي إيدج للتطوير العقاري.
            </p>
            <p>
              للاستفسار: <a href={`tel:${PD}`} onClick={trackCall} className="text-gold hover:underline" dir="ltr">{P}</a>
            </p>
            <p>
              <button onClick={() => setShowPrivacy(true)} className="text-gold hover:underline">سياسة الخصوصية</button>
            </p>
            <p className="text-white/25 mt-4">© {new Date().getFullYear()} جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* ═══ WHATSAPP FLOAT ═══ */}
      <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={trackWA}
        className="fixed bottom-24 left-5 md:bottom-8 md:left-8 z-40 bg-[#25d366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="واتساب">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.24 0-4.31-.726-5.993-1.957l-.42-.306-2.647.887.887-2.647-.306-.42A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
      </a>

      {/* ═══ MOBILE BOTTOM BAR ═══ */}
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-navy z-50 border-t border-white/10 grid grid-cols-3 h-14">
        <a href={`tel:${PD}`} onClick={trackCall} className="flex flex-col items-center justify-center text-white gap-0.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          <span className="text-[10px]">اتصل</span>
        </a>
        <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={trackWA} className="flex flex-col items-center justify-center text-[#25d366] gap-0.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
          <span className="text-[10px]">واتساب</span>
        </a>
        <button onClick={scrollToBottom} className="flex flex-col items-center justify-center text-gold gap-0.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          <span className="text-[10px]">سجّل</span>
        </button>
      </div>

      {/* ═══ POPUP ═══ */}
      {showPopup && !popupDismissed && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-7 relative animate-fade-up">
            <button onClick={() => { setShowPopup(false); setPopupDismissed(true); }}
              className="absolute top-3 left-3 text-gray-400 hover:text-gray-600 text-xl">✕</button>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-lg font-bold text-navy mb-1">عروض حصرية على مشاريع سيتي إيدج</h3>
              <p className="text-muted text-sm mb-5">سجّل دلوقتي واحصل على أفضل سعر وأطول فترة سداد</p>
              <div className="flex flex-col gap-2.5">
                <button onClick={() => { setShowPopup(false); setPopupDismissed(true); scrollToBottom(); }}
                  className="bg-gold text-navy py-3 rounded-xl font-semibold hover:bg-gold-light transition">سجّل اهتمامك</button>
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  onClick={() => { trackWA(); setShowPopup(false); setPopupDismissed(true); }}
                  className="bg-[#25d366] text-white py-3 rounded-xl font-semibold hover:bg-[#20bd5a] transition text-center">تواصل واتساب</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ PRIVACY MODAL ═══ */}
      {showPrivacy && (
        <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-7 relative">
            <button onClick={() => setShowPrivacy(false)} className="absolute top-3 left-3 text-gray-400 hover:text-gray-600 text-xl">✕</button>
            <h3 className="text-lg font-bold text-navy mb-4">سياسة الخصوصية</h3>
            <div className="text-sm text-text space-y-3 leading-relaxed">
              <p>نلتزم بحماية خصوصية بياناتك الشخصية.</p>
              <p>البيانات التي نجمعها (الاسم، رقم الهاتف) تُستخدم فقط للتواصل معك بخصوص استفسارك العقاري.</p>
              <p>لا نشارك بياناتك مع أي طرف ثالث باستثناء المطور العقاري (سيتي إيدج) لغرض الرد على استفسارك.</p>
              <p>يمكنك طلب حذف بياناتك في أي وقت عبر التواصل معنا.</p>
              <p>نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وقياس أداء الحملات الإعلانية.</p>
              <p>هذا الموقع ليس الموقع الرسمي لشركة سيتي إيدج للتطوير العقاري.</p>
            </div>
          </div>
        </div>
      )}

      {/* ═══ COOKIE CONSENT ═══ */}
      {showCookie && (
        <div className="cookie-banner">
          <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك. بمتابعة التصفح فإنك توافق على ذلك.</p>
          <button onClick={() => { localStorage.setItem("cookie_accepted", "true"); setShowCookie(false); }}>موافق</button>
        </div>
      )}
    </>
  );
}
