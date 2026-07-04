import { useEffect } from "react";

/**
 * Watches for [data-reveal] elements and toggles data-visible=true when
 * they enter the viewport. Runs once per element (unobserved after reveal).
 * Also re-scans on route changes.
 */
export function ScrollRevealer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay;
            if (delay) el.style.transitionDelay = `${delay}ms`;
            el.dataset.visible = "true";
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.dataset.visible === "true") return;
        // instantly reveal items already above the fold on initial paint
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          const delay = el.dataset.revealDelay;
          if (delay) el.style.transitionDelay = `${delay}ms`;
          requestAnimationFrame(() => {
            el.dataset.visible = "true";
          });
          return;
        }
        io.observe(el);
      });

      document.querySelectorAll<HTMLImageElement>("img:not([data-loaded])").forEach((img) => {
        img.dataset.loaded = img.complete ? "true" : "false";
        if (!img.complete) {
          img.addEventListener(
            "load",
            () => {
              img.dataset.loaded = "true";
            },
            { once: true },
          );
          img.addEventListener(
            "error",
            () => {
              img.dataset.loaded = "true";
            },
            { once: true },
          );
        }
      });
    };

    scan();
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
