import { getTranslations } from "next-intl/server";

type MarqueeItem = { text: string; badge?: string };

export default async function MarqueeTicker() {
  const t = await getTranslations("Marquee");
  const items = t.raw("items") as MarqueeItem[];

  return (
    <div className="w-full border-y border-brand-border bg-white py-4 overflow-hidden select-none">
      <div className="animate-marquee whitespace-nowrap items-center text-xs sm:text-sm font-mono tracking-widest uppercase text-brand-navy">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="inline-flex items-center">
            <span className="mx-6 flex items-center gap-2">
              {item.text}
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full bg-brand-lime font-bold text-[10px] text-brand-navy">
                  {item.badge}
                </span>
              )}
            </span>
            <span className="mx-6 text-brand-slate">—</span>
          </span>
        ))}
      </div>
    </div>
  );
}
