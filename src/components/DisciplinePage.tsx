import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export type DisciplineSection = { heading: string; body: ReactNode };
export type RelatedLink = { to: string; no: string; tag: string; title: string };

type Props = {
  no: string;
  tag: string;
  title: string;
  tagline: string;
  intro: string;
  reading?: ReactNode;
  sections: DisciplineSection[];
  keyConcepts: { term: string; meaning: string }[];
  practice: string[];
  quote?: string;
  related: RelatedLink[];
};

export function DisciplinePage({
  no, tag, title, tagline, intro, reading, sections, keyConcepts, practice, quote, related,
}: Props) {
  return (
    <div className="min-h-screen text-foreground font-sans overflow-x-hidden">
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
            <Link to="/" className="hover:text-accent transition-colors">Trang Chủ</Link>
            <Link to="/bat-cuc-linh-so" className="hover:text-accent transition-colors">Bát Cực</Link>
            <Link to="/tu-truong-so" className="hover:text-accent transition-colors">Từ Trường</Link>
            <Link to="/bat-tu" className="hover:text-accent transition-colors">Bát Tự</Link>
          </div>
        </div>
      </nav>

      {/* Hero + Reading (side by side on lg) */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(42_65%_58%/0.08),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 pt-14 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 lg:gap-14 items-start">
          <header className="min-w-0">
            <div className="inline-flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.4em] text-gold mb-5">
              <span className="h-px w-6 bg-gold/60" />
              {no} · {tag}
            </div>
            <h1 className="animate-fade-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display italic leading-[1.05] mb-5 text-balance">
              <span className="text-gold-gradient">{title}</span>
            </h1>
            <p className="animate-fade-up [animation-delay:150ms] text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed italic font-display">
              {tagline}
            </p>
            <p className="animate-fade-up [animation-delay:300ms] mt-6 text-sm md:text-base leading-relaxed text-pretty max-w-2xl text-foreground/85">
              {intro}
            </p>
            <div className="mt-8 flex items-center gap-4 opacity-70">
              <span className="hairline-gold w-24" />
              <span className="text-gold text-sm">✦</span>
            </div>
          </header>

          {reading && (
            <div className="min-w-0 lg:sticky lg:top-24">
              <div className="panel-luxury rounded-lg p-5 sm:p-8 md:p-10 shadow-luxury relative">
                <div className="absolute inset-3 border border-gold/15 rounded pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.35em] text-gold mb-6">
                    <span className="h-px w-6 bg-gold/60" />
                    Luận giải cho bạn
                  </div>
                  {reading}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sections — multi-column on wide */}
      <section className="px-5 sm:px-8 max-w-[88rem] mx-auto pb-14 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 border-t border-border/60 pt-10">
          {sections.map((s, i) => (
            <div key={s.heading} className="min-w-0">
              <div className="text-[10px] font-mono text-gold tracking-[0.3em] mb-3">
                §{String(i + 1).padStart(2, "0")}
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-[1.7rem] font-display italic mb-4">
                {s.heading}
              </h2>
              <div className="text-sm md:text-[0.95rem] text-muted-foreground leading-relaxed space-y-3">
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Key concepts */}
      <section className="px-5 sm:px-8 py-20 sm:py-24 border-t border-border/60 bg-[radial-gradient(ellipse_at_center,hsl(42_65%_58%/0.04),transparent_70%)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <div className="text-[10px] font-mono text-gold tracking-[0.35em] mb-3">
                四 · Tứ trụ tri thức
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display italic">
                Khái niệm cốt lõi
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {keyConcepts.map((k) => (
              <div
                key={k.term}
                className="panel-luxury rounded-lg p-6 sm:p-8 group hover:shadow-gold-glow transition-all"
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold mb-3 group-hover:tracking-[0.35em] transition-all">
                  {k.term}
                </div>
                <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">
                  {k.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice */}
      <section className="px-5 sm:px-8 py-20 sm:py-24 border-t border-border/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-[10px] font-mono text-gold tracking-[0.35em] mb-3">
            實 · Ứng dụng
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display italic mb-10">
            Thực hành từng bước
          </h2>
          <ol className="space-y-6">
            {practice.map((p, i) => (
              <li
                key={i}
                className="grid grid-cols-[auto_1fr] gap-5 sm:gap-8 items-start pb-6 border-b border-border/40 last:border-0"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/40 text-gold font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 text-sm sm:text-base text-foreground/85 leading-relaxed pt-1.5">
                  {p}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Quote */}
      {quote && (
        <section className="px-5 sm:px-8 py-24 sm:py-32 border-t border-border/60 bg-[radial-gradient(ellipse_at_center,hsl(42_65%_58%/0.06),transparent_70%)]">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-gold text-2xl mb-6">❝</div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-display italic leading-relaxed text-balance text-gold-gradient">
              {quote}
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 opacity-70">
              <span className="hairline-gold w-16" />
              <span className="text-gold">✦</span>
              <span className="hairline-gold w-16" />
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      <section className="px-5 sm:px-8 py-20 sm:py-24 border-t border-border/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-gold mb-8">
            Bộ môn liên quan
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {related.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="group panel-luxury rounded-lg p-8 block hover:-translate-y-1 hover:shadow-luxury transition-all duration-500"
              >
                <div className="text-xs font-mono text-gold mb-4 tracking-[0.3em]">
                  {r.no} · {r.tag}
                </div>
                <div className="text-2xl sm:text-3xl font-display italic mb-8">{r.title}</div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-gold">
                  Khám phá
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 sm:py-16 px-5 sm:px-8 border-t border-border/60">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em]">
            © 2026 CỔ THƯ SỐ · ALL RIGHTS RESERVED
          </div>
          <Link
            to="/"
            className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-soft hover:text-gold transition-colors"
          >
            ← Trở về trang chủ
          </Link>
        </div>
      </footer>
    </div>
  );
}

// Shared form primitives
export function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-mono uppercase tracking-[0.3em] text-gold-soft mb-2.5">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputCls =
  "w-full bg-background/50 border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all";

export const btnCls =
  "inline-flex items-center gap-2 bg-[image:var(--gradient-gold)] text-primary-foreground px-8 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] shadow-gold-glow hover:brightness-110 active:scale-[0.98] transition-all";

export function ResultRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] sm:flex sm:justify-between sm:items-baseline gap-3 border-b border-border/40 py-4">
      <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground min-w-0 truncate">
        {label}
      </span>
      <span className="text-sm md:text-base text-gold-soft font-display italic text-right">
        {value}
      </span>
    </div>
  );
}
