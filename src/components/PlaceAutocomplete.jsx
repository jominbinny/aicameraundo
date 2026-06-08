// Place input with debounced OpenStreetMap (Nominatim) suggestions.
import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { suggestPlaces } from "@/services/routeService";

export default function PlaceAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder,
  ariaLabel,
  iconClassName = "text-primary",
}) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);
  const skipRef = useRef(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (skipRef.current) {
      skipRef.current = false;
      return;
    }
    const q = value?.trim() || "";
    if (q.length < 3) {
      setItems([]);
      setOpen(false);
      return;
    }
    let active = true;
    setLoading(true);
    const handle = setTimeout(async () => {
      try {
        const res = await suggestPlaces(q);
        if (active) {
          setItems(res);
          setOpen(res.length > 0);
          setActive(-1);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }, 350);
    return () => {
      active = false;
      clearTimeout(handle);
    };
  }, [value]);

  // Close on outside click.
  useEffect(() => {
    function onDoc(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const choose = (item) => {
    skipRef.current = true;
    onChange(item.short);
    onSelect?.(item);
    setItems([]);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (!open || !items.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      choose(items[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={boxRef} className="relative">
      <MapPin
        className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${iconClassName}`}
        aria-hidden="true"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => items.length && setOpen(true)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        className="w-full rounded-full border border-border bg-card py-2.5 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
      />
      {open && (
        <ul
          role="listbox"
          className="absolute z-[1000] mt-1 max-h-60 w-full overflow-auto rounded-2xl border border-border bg-popover py-1 text-popover-foreground shadow-lg"
        >
          {loading && (
            <li className="px-3 py-2 text-xs text-muted-foreground">…</li>
          )}
          {items.map((item, i) => (
            <li key={`${item.lat}-${item.lng}-${i}`} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(item)}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full items-start gap-2 px-3 py-2 text-left text-sm ${
                  i === active ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="line-clamp-2">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
