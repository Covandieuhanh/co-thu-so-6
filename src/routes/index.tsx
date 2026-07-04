import { createFileRoute, Link } from "@tanstack/react-router";
import celestialMap from "@/assets/celestial-map.jpg";
import calligraphy from "@/assets/calligraphy.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cổ Thư Số — Giải mã mật mã của Định Mệnh" },
      {
        name: "description",
        content:
          "Bát Cực Linh Số, Từ Trường Số và Bát Tự — ba bộ môn huyền học trong một thư viện hiện đại.",
      },
      { property: "og:title", content: "Cổ Thư Số — Giải mã mật mã của Định Mệnh" },
      {
        property: "og:description",
        content: "Giao thoa giữa trí tuệ cổ xưa và toán học hiện đại.",
      },
      { property: "og:image", content: celestialMap },
      { name: "twitter:image", content: celestialMap },
    ],
  }),
  component: Index,
});

type Discipline = {
  no: string;
  tag: string;
  title: string;
  glyph: string;
  desc: string;
  to: string;
};

const disciplines: Discipline[] = [
  {
    no: "01",
    tag: "BÁT CỰC LINH SỐ",
    title: "Mật Mã Số Học",
    glyph: "八",
    desc: "Phân tích sự tương tác của các con số gắn liền với cuộc đời — số điện thoại, căn cước, biển số xe — qua tám quẻ cát hung.",
    to: "/bat-cuc-linh-so",
  },
  {
    no: "02",
    tag: "TỪ TRƯỜNG SỐ",
    title: "Rung Động Năng Lượng",
    glyph: "數",
    desc: "Khám phá con số chủ đạo và sứ mệnh linh hồn thông qua tên gọi và ngày tháng năm sinh.",
    to: "/tu-truong-so",
  },
  {
    no: "03",
    tag: "BÁT TỰ",
    title: "Tứ Trụ Mệnh Lý",
    glyph: "命",
    desc: "Cân bằng ngũ hành theo năm – tháng – ngày – giờ, tìm dụng thần và hỷ thần cho vận trình.",
    to: "/bat-tu",
  },
];

function Index() {
  return (
    <div className="min-h-screen text-foreground font-sans overflow-x-hidden">
      {/* Vertical typographic rails */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col gap-10 opacity-30 pointer-events-none">
        <span className="text-[10px] tracking-[0.5em] [writing-mode:vertical-rl] font-mono text-gold-soft">
          TRẬT TỰ · VŨ TRỤ
        </span>
      </div>
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col gap-10 opacity-30 pointer-events-none">
        <span className="text-[10px] tracking-[0.5em] [writing-mode:vertical-rl] font-mono text-gold-soft">
          乾 · 坤 · 震 · 巽 · 坎 · 離 · 艮 · 兌
        </span>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold text-gold font-display italic text-lg shadow-gold-glow">
              古
            </span>
            <span className="truncate text-lg sm:text-xl font-display italic tracking-tight">
              Cổ Thư Số
            </span>
          </Link>
          <div className="hidden md:flex gap-8 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            <a href="#disciplines" className="hover:text-accent transition-colors">
              Khám Phá
            </a>
            <a href="#philosophy" className="hover:text-accent transition-colors">
              Triết Lý
            </a>
            <Link to="/bat-cuc-linh-so" className="hover:text-accent transition-colors">
              Luận Giải
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* Celestial backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={celestialMap}
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] max-w-none opacity-[0.18] mix-blend-screen animate-slow-spin"
            width={1536}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>

        <header className="relative pt-24 sm:pt-32 pb-20 sm:pb-28 px-5 sm:px-8 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.4em] text-gold-soft mb-8">
            <span className="h-px w-8 bg-gold/60" />
            Ba bộ môn · Một thư viện
            <span className="h-px w-8 bg-gold/60" />
          </div>
          <h1 className="animate-fade-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic text-balance leading-[1.05] mb-8">
            Giải mã mật mã của{" "}
            <span className="text-gold-gradient animate-shimmer inline-block">Định Mệnh</span>
          </h1>
          <p className="animate-fade-up [animation-delay:200ms] text-muted-foreground max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-pretty">
            Sự giao thoa giữa trí tuệ cổ xưa và toán học hiện đại. Chọn một bộ môn để nhập
            thông tin và nhận luận giải chi tiết.
          </p>
          <div className="animate-fade-up [animation-delay:400ms] mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/bat-cuc-linh-so"
              className="group relative inline-flex items-center gap-2 bg-[image:var(--gradient-gold)] text-primary-foreground px-7 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] shadow-gold-glow hover:brightness-110 transition-all"
            >
              Bắt đầu với Bát Cực
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <a
              href="#disciplines"
              className="inline-flex items-center gap-2 border border-gold/40 px-7 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] text-gold-soft hover:border-gold hover:text-gold transition-colors"
            >
              Khám phá bộ môn
            </a>
          </div>

          {/* Ornament divider */}
          <div className="mt-16 flex items-center justify-center gap-4 opacity-70">
            <span className="hairline-gold w-24 sm:w-40" />
            <span className="text-gold text-lg">✦</span>
            <span className="hairline-gold w-24 sm:w-40" />
          </div>
        </header>
      </div>

      {/* Disciplines */}
      <section id="disciplines" className="px-5 sm:px-8 py-20 sm:py-28 max-w-7xl mx-auto">
        <div className="text-center mb-14 sm:mb-20">
          <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-gold mb-4">
            三 · Ba Bộ Môn
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic">
            Chọn con đường của bạn
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {disciplines.map((d, i) => (
            <Link
              key={d.no}
              to={d.to}
              className="group panel-luxury rounded-lg p-8 sm:p-10 block relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Glyph watermark */}
              <span
                aria-hidden="true"
                className="absolute -right-4 -bottom-8 text-[10rem] font-display text-gold/[0.06] leading-none select-none pointer-events-none group-hover:text-gold/[0.12] transition-colors duration-700"
              >
                {d.glyph}
              </span>

              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono text-gold tracking-[0.3em]">{d.no}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-gold font-display text-lg group-hover:border-gold group-hover:shadow-gold-glow transition-all">
                    {d.glyph}
                  </span>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  {d.tag}
                </div>
                <h3 className="text-2xl sm:text-3xl font-display italic mb-5">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-10">{d.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-gold">
                  Khám phá
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="relative py-24 sm:py-32 px-5 sm:px-8 border-t border-border/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(42_65%_58%/0.05),transparent_70%)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden panel-luxury shadow-luxury">
            <img
              src={calligraphy}
              alt="Thư pháp cổ trên giấy dó"
              width={1024}
              height={1280}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute inset-4 border border-gold/30 rounded pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-[9px] font-mono uppercase tracking-[0.4em] text-gold mb-2">
                Thư pháp · 書法
              </div>
              <div className="text-sm font-display italic text-foreground/90">
                Nét mực nghìn năm — âm thanh của Đạo.
              </div>
            </div>
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-gold mb-4">
              Triết Lý
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic mb-8 leading-[1.15]">
              Trí tuệ ngàn năm, <br className="hidden sm:block" />
              tinh gọn trong mã số.
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base">
              Chúng tôi tin rằng mỗi con số, mỗi vì sao đều là một nút thắt trong mạng lưới nhân
              quả rộng lớn. Không phải mê tín — đây là bộ môn quan sát các quy luật lặp lại của
              vũ trụ, được số hoá và tra cứu tức thời.
            </p>
            <div className="hairline-gold w-24 my-8" />
            <p className="text-muted-foreground leading-relaxed italic font-display text-lg sm:text-xl text-balance">
              "Trời không nói, nhưng bốn mùa vận hành, vạn vật nảy nở. Người không thấy, nhưng
              mệnh vận luân hồi trong từng nhịp thở."
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 sm:py-20 px-5 sm:px-8 border-t border-border/60 bg-gradient-to-b from-transparent to-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-gold text-gold font-display italic text-lg">
                古
              </span>
              <div className="text-2xl font-display italic">Cổ Thư Số</div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Khai mở tuệ giác thông qua các môn huyền học Á Đông và Phương Tây hiện đại — tính
              toán chính xác, giao diện tinh tế.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                Dịch vụ
              </h4>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2.5">
                <li className="hover:text-foreground transition-colors">
                  <Link to="/bat-cuc-linh-so">Tra cứu Bát Cực</Link>
                </li>
                <li className="hover:text-foreground transition-colors">
                  <Link to="/bat-tu">Lập tứ trụ Bát Tự</Link>
                </li>
                <li className="hover:text-foreground transition-colors">
                  <Link to="/tu-truong-so">Luận Từ Trường Số</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                Kết nối
              </h4>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2.5">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Email</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.25em]">
            © 2026 CỔ THƯ SỐ · ALL RIGHTS RESERVED
          </div>
          <div className="text-[9px] font-mono text-gold/70 tracking-[0.2em]">
            福生富貴 · 心生相
          </div>
        </div>
      </footer>
    </div>
  );
}
