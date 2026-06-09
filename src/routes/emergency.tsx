import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import EmergencyCard from "@/components/ui/EmergencyCard";
import LoadingState from "@/components/ui/LoadingState";
import { useLanguage } from "@/hooks/useLanguage";
import { PhoneCall, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency Helpline Contacts Kerala — SafeDrive Kerala" },
      {
        name: "description",
        content: "Quick click-to-call emergency helpline numbers in Kerala: Police, Ambulance, Fire Force, Women, and Child safety.",
      },
    ],
    links: [{ rel: "canonical", href: "/emergency" }],
  }),
  component: EmergencyPage,
});

interface EmergencyContact {
  id: string;
  name_en: string;
  name_ml: string;
  number: string;
  description_en: string;
  description_ml: string;
  icon: string;
}

function EmergencyPage() {
  const { t, lang } = useLanguage();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/emergency.json")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load emergency contacts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col pb-8">
      <PageHeader subtitle={t("emergencyContacts")} />

      <div className="mx-auto w-full max-w-xl flex-1 px-4 py-4 space-y-4">
        {/* Title Block on Desktop */}
        <div className="hidden md:flex items-center gap-2.5 border-b border-border pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
            <PhoneCall className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-foreground">{t("emergencyContacts")}</h1>
            <p className="text-xs text-muted-foreground">
              {t("heroDescription")}
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="rounded-2xl border border-destructive/15 bg-destructive/5 p-4 text-xs text-muted-foreground shadow-sm">
          <p className="font-bold text-foreground mb-1.5 flex items-center gap-1.5 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            {lang === "ml" ? "അടിയന്തര സാഹചര്യങ്ങൾക്കായി" : "Emergency Assistance"}
          </p>
          <p className="leading-relaxed">
            {lang === "ml"
              ? "റോഡുകളിലെ അപകടങ്ങൾ, ഗതാഗത തടസ്സങ്ങൾ അല്ലെങ്കിൽ മറ്റ് അടിയന്തര സാഹചര്യങ്ങളിൽ താഴെ നൽകിയിരിക്കുന്ന ഹെൽപ്പ് ലൈൻ നമ്പറുകളിൽ ഉടൻ വിളിക്കുക. മൊബൈൽ ഉപയോക്താക്കൾക്ക് ഓരോ ബട്ടണിലും അമർത്തി നേരിട്ട് വിളിക്കാം."
              : "For immediate assistance during accidents, break-downs, or highway emergencies, dial any helpline below. Mobile users can tap the red buttons to call directly."}
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="pt-2">
            <LoadingState type="list" count={4} />
          </div>
        ) : (
          <div className="grid gap-4">
            {contacts.map((contact) => (
              <EmergencyCard key={contact.id} contact={contact} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
