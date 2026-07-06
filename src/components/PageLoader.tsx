import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Top progress bar + subtle overlay that appears while the router is loading
 * (pending navigations, loader fetches). Provides a smooth "loading" cue so
 * transitions between pages never feel frozen.
 */
export function RouteLoader() {
  const status = useRouterState({ select: (s) => s.status });
  const isPending = status === "pending";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isPending) {
      setVisible(true);
      return;
    }
    // let the bar finish before hiding
    const t = setTimeout(() => setVisible(false), 400);
    return () => clearTimeout(t);
  }, [isPending]);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[2px] overflow-hidden"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 300ms ease" }}
      >
        <div
          className="h-full w-full origin-left"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(42 65% 58% / 0.9), hsl(42 80% 70%), hsl(42 65% 58% / 0.9), transparent)",
            animation: isPending
              ? "route-bar 1.2s ease-in-out infinite"
              : "route-bar-finish 400ms ease-out forwards",
          }}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[99]"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 300ms ease",
          background:
            "radial-gradient(ellipse at center, hsl(220 30% 4% / 0.15), transparent 60%)",
        }}
      />
    </>
  );
}

/**
 * Initial splash shown until fonts + first paint are ready. Fades out
 * gracefully so the landing page never pops in abruptly.
 */
export function InitialSplash() {
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = async () => {
      try {
        // wait for webfonts so headings don't reflow after paint
        const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
        if (fonts?.ready) await fonts.ready;
      } catch {
        /* noop */
      }
      // ensure at least one paint frame
      await new Promise((r) => requestAnimationFrame(() => r(null)));
      if (cancelled) return;
      setFading(true);
      setTimeout(() => !cancelled && setGone(true), 650);
    };
    start();
    return () => {
      cancelled = true;
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at top, hsl(220 25% 10%) 0%, hsl(220 30% 4%) 70%)",
        opacity: fading ? 0 : 1,
        transition: "opacity 600ms ease",
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-20 w-20">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid hsl(42 40% 60% / 0.2)",
              animation: "slow-spin 8s linear infinite",
            }}
          />
          <div
            className="absolute inset-2 rounded-full"
            style={{
              border: "1px solid hsl(42 65% 58% / 0.6)",
              borderTopColor: "transparent",
              borderRightColor: "transparent",
              animation: "slow-spin 1.6s linear infinite reverse",
            }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center font-serif text-2xl"
            style={{
              color: "hsl(42 70% 70%)",
              textShadow: "0 0 20px hsl(42 65% 58% / 0.6)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          >
            數
          </div>
        </div>
        <div
          className="font-serif tracking-[0.4em] text-sm uppercase"
          style={{ color: "hsl(42 60% 70% / 0.8)" }}
        >
          Huyền Học Aha Sage
        </div>
      </div>
    </div>
  );
}
