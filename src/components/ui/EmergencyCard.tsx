import { useLanguage } from "@/hooks/useLanguage";
import { Phone, Shield, HeartPulse, Flame, UserCheck, Smile } from "lucide-react";

interface EmergencyContact {
  id: string;
  name_en: string;
  name_ml: string;
  number: string;
  description_en: string;
  description_ml: string;
  icon: string;
}

interface EmergencyCardProps {
  contact: EmergencyContact;
}

function getIcon(name: string) {
  switch (name) {
    case "Shield":
      return Shield;
    case "HeartPulse":
      return HeartPulse;
    case "Flame":
      return Flame;
    case "UserCheck":
      return UserCheck;
    case "Smile":
      return Smile;
    default:
      return Phone;
  }
}

export default function EmergencyCard({ contact }: EmergencyCardProps) {
  const { lang, t } = useLanguage();
  const Icon = getIcon(contact.icon);

  const name = lang === "ml" ? contact.name_ml : contact.name_en;
  const description = lang === "ml" ? contact.description_ml : contact.description_en;

  return (
    <article className="flex flex-col justify-between gap-4 rounded-2xl border border-destructive/20 bg-card p-5 shadow-sm transition-all hover:shadow-md dark:border-destructive/30">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive dark:bg-destructive/25">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-foreground text-lg leading-snug">{name}</h3>
          <p className="text-2xl font-black tracking-tight text-destructive">
            {contact.number}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>

      <a
        href={`tel:${contact.number}`}
        className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-destructive px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-destructive/90 active:scale-[0.98]"
      >
        <Phone className="h-4 w-4" />
        <span>{t("call")} {contact.number}</span>
      </a>
    </article>
  );
}
