import { useEffect, useState } from "react";

type Item = {
  id: string;
  createdAt: number;
  amount: number;
  frequency: "once" | "monthly";
  comment?: string;
  name?: string | null;
};

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Math.max(0, n || 0)
  );

export default function DonorWall() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/donation");
        const data = await res.json();
        setItems(data.items || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="animate-pulse text-sm text-gray-500">
          Loading donor wall…
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="text-sm text-gray-500">
          Be the first to leave a message! 💬
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">Donor Wall</h3>
      <ul className="mt-4 space-y-4">
        {items.map((it) => (
          <li key={it.id} className="rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="font-medium">{it.name ?? "Anonymous"}</div>
              <div>
                {fmt(it.amount)} ·{" "}
                {it.frequency === "monthly" ? "Monthly" : "One‑time"}
              </div>
            </div>
            {it.comment && <p className="mt-2 text-gray-800">{it.comment}</p>}
            <div className="mt-1 text-xs text-gray-400">
              {new Date(it.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
