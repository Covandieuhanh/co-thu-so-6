import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-[88rem] flex-col px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-5">
          <Link to="/" className="font-serif text-lg tracking-wide text-primary">
            Huyền Học Aha Sage
          </Link>
          <Link to="/" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            ← Trang chủ
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-md">
            <div className="mb-6 text-center">
              <h1 className="font-serif text-3xl text-foreground sm:text-4xl">{title}</h1>
              {subtitle ? (
                <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
              ) : null}
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/60 p-6 shadow-lg backdrop-blur sm:p-8">
              {children}
            </div>

            {footer ? (
              <div className="mt-5 text-center text-sm text-muted-foreground">{footer}</div>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted-foreground/80">{hint}</span> : null}
    </label>
  );
}

export const inputCls =
  "w-full rounded-md border border-border/70 bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/70 focus:ring-2 focus:ring-primary/20";

export const btnPrimary =
  "inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60";

export const btnGhost =
  "inline-flex w-full items-center justify-center rounded-md border border-border/70 bg-background/60 px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent/60 disabled:opacity-60";
