import { useLanguage } from "@/hooks/useLanguage";
import { Quote as QuoteIcon } from "lucide-react";

interface Quote {
  id: string;
  text_en: string;
  text_ml: string;
}

interface QuoteCardProps {
  quote: Quote;
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  const { lang, t } = useLanguage();
  const text = lang === "ml" ? quote.text_ml : quote.text_en;

  return (
    <article className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-card to-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/25 group">
      {/* Background stylized Quote Mark for depth */}
      <QuoteIcon className="absolute -right-4 -bottom-4 h-28 w-28 text-primary/5 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12 pointer-events-none" />
      
      <div className="flex gap-4 items-start relative z-10">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
          <QuoteIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary/80 block">
            {t("quoteOfTheDay")}
          </span>
          <blockquote className="text-base font-semibold italic text-foreground leading-relaxed">
            "{text}"
          </blockquote>
        </div>
      </div>
    </article>
  );
}
