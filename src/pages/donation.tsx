import DonorWall from "@/components/Donorwall";
import { useMemo, useState } from "react";

/** ---------- helpers ---------- */
const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Math.max(0, n || 0)
  );

const AMOUNTS_OPTIONS = [
  { value: 25, desc: "한 학생 1회 심방" },
  { value: 50, desc: "양육모임 1회 간식" },
  { value: 100, desc: "세미나 1회 행정비" },
  { value: 300, desc: "정기예배 1회 저녁식사" },
]; // USD
type Freq = "once" | "monthly";
type Method = "card" | "paypal" | "bank";

/** ---------- tiny UI bits ---------- */
function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 max-w-4xl mx-auto">
      <div className="flex items-end justify-between mb-2 text-sm md:text-base">
        <div className="font-semibold text-emerald-700">
          {fmt(raised)} raised
        </div>
        <div className="text-gray-600">{fmt(goal)} goal</div>
      </div>
      <div className="h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-emerald-500 transition-all"
          style={{ width: `${pct}%` }}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          role="progressbar"
        />
      </div>
      <p className="mt-2 text-xs text-gray-500">{pct}% of goal</p>
    </div>
  );
}

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`container mx-auto px-6 md:px-10 ${className}`}>
      {children}
    </section>
  );
}

/** ---------- modal ---------- */
function PaymentModal({
  open,
  onClose,
  total,
  base,
  freq,
  method,
  setMethod,
  summary,
  onDonate,
  testMode = true,
}: {
  open: boolean;
  onClose: () => void;
  total: number;
  base: number;
  freq: Freq;
  method: Method;
  setMethod: (m: Method) => void;
  summary: React.ReactNode;
  onDonate: () => Promise<void>; // 페이지에서 넘겨주는 저장 함수
  testMode?: boolean; // true면 결제 없이 onDonate만 수행
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Complete Your Donation</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="grid gap-6 px-6 py-6 md:grid-cols-2">
          {/* left: method/select + fake forms */}
          <div>
            <div className="mb-3 text-sm font-medium">Payment method</div>
            <div className="mb-4 flex flex-wrap gap-2">
              {(["card", "paypal", "bank"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`h-10 rounded-full border px-4 text-sm capitalize ${
                    method === m
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                  aria-pressed={method === m}
                >
                  {m}
                </button>
              ))}
            </div>

            {method === "card" && (
              <div className="grid gap-3">
                <input
                  className="h-11 rounded-lg border border-gray-200 px-3 text-sm"
                  placeholder="Full name"
                />
                <input
                  className="h-11 rounded-lg border border-gray-200 px-3 text-sm"
                  placeholder="Email for receipt"
                  type="email"
                />
                <input
                  className="h-11 rounded-lg border border-gray-200 px-3 text-sm"
                  placeholder="Card number (connect Stripe later)"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="h-11 rounded-lg border border-gray-200 px-3 text-sm"
                    placeholder="MM/YY"
                  />
                  <input
                    className="h-11 rounded-lg border border-gray-200 px-3 text-sm"
                    placeholder="CVC"
                  />
                </div>
              </div>
            )}
            {method === "paypal" && (
              <div className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-600">
                PayPal button goes here after integration.
              </div>
            )}
            {method === "bank" && (
              <div className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-600 leading-7">
                Bank transfer instructions here.
                <br />
                After sending, email receipt request to donate@campers.org.
              </div>
            )}
          </div>

          {/* right: summary */}
          <div className="rounded-xl border border-gray-200 p-4">
            <h4 className="mb-2 text-sm font-semibold">Summary</h4>
            <div className="text-sm text-gray-700">{summary}</div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Amount</dt>
                <dd>{fmt(base)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Frequency</dt>
                <dd>{freq === "monthly" ? "Monthly" : "One-time"}</dd>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold">
                <dt>Total</dt>
                <dd>{fmt(total)}</dd>
              </div>
            </dl>

            {/* >>> 여기 버튼 교체됨 <<< */}
            <button
              className="mt-4 w-full h-11 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              onClick={async () => {
                if (testMode) {
                  // 결제 없이 저장 동작만 테스트
                  await new Promise((r) => setTimeout(r, 800));
                  await onDonate();
                } else {
                  // TODO: Stripe/PayPal 결제 처리 후 성공 시 onDonate() 호출
                  await onDonate();
                }
              }}
            >
              Donate {fmt(total)}
            </button>
            <p className="mt-2 text-xs text-gray-500">
              Your payment is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** ---------- page ---------- */
export default function DonationPage() {
  // mock campaign numbers
  const [raised] = useState(5732.75);
  const [goal] = useState(11750);
  const [donors] = useState(42);

  // comment & donor-wall
  const [writeComment, setWriteComment] = useState(false);
  const [comment, setComment] = useState("");
  const [displayOnWall, setDisplayOnWall] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [fullName, setFullName] = useState("");

  const [freq, setFreq] = useState<Freq>("monthly");
  const [amount, setAmount] = useState<number | "custom">(50);
  const [custom, setCustom] = useState("");
  const [coverFee, setCoverFee] = useState(true);

  // dedicate section
  const [dedicate, setDedicate] = useState(false);
  const [dedicationType, setDedicationType] = useState<"honor" | "memory">(
    "honor"
  );
  const [honoree, setHonoree] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");

  // modal
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState<Method>("card");

  const base = useMemo(() => {
    if (amount === "custom") {
      const v = Number(custom.replace(/[^\d.]/g, ""));
      return isNaN(v) ? 0 : v;
    }
    return amount;
  }, [amount, custom]);

  const fee = coverFee ? Math.round(base * 0.034 * 100) / 100 + 0.3 : 0; // sample fee model
  const total = Math.max(0, base + fee);

  /** 저장 동작: 테스트용으로 /api/donations에 POST */
  const handleDonate = async () => {
    try {
      await fetch("/api/donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: base,
          total,
          freq,
          coverFee,
          dedicate,
          dedicationType,
          honoree,
          recipientName,
          recipientEmail,
          message,
          // donor wall
          displayOnWall,
          anonymous,
          name: anonymous ? null : fullName || null,
          comment: writeComment ? comment : null,
          // meta
          method,
          createdAt: new Date().toISOString(),
        }),
      });
      setOpen(false);
      alert("Thank you! (saved in demo store)");
      // 필요하면 폼 리셋 로직 추가
    } catch (e) {
      console.error(e);
      alert("Failed to save (demo). Check console.");
    }
  };

  return (
    <main className="bg-gray-50">
      {/* Hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-700 opacity-90" />
        <div className="container mx-auto px-6 md:px-10 py-16 md:py-24 text-white">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            The Campers Ministry Fund
          </h1>
          <p className="mt-4 md:text-lg text-blue-100">
            Your gift fuels worship, education, and mission on campus.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-blue-100">
            <span className="rounded-full border border-white/30 px-3 py-1">
              501(c)(3) Tax‑deductible
            </span>
            <span className="rounded-full border border-white/30 px-3 py-1">
              SSL • PCI Compliant
            </span>
          </div>
        </div>
      </section>

      {/* Progress */}
      <Section className="py-10">
        <ProgressBar raised={raised} goal={goal} />
        <p className="mt-2 text-center text-xs text-gray-500">
          {donors} donations so far
        </p>
      </Section>

      {/* Form (Step 1) */}
      <Section className="py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* left: pickers */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-semibold">Choose your amount</h2>

              {/* preset amounts */}
              <div
                className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3"
                role="radiogroup"
                aria-label="Donation amount"
              >
                {AMOUNTS_OPTIONS.map(({ value, desc }) => {
                  const selected = amount !== "custom" && amount === value;
                  return (
                    <button
                      key={value}
                      onClick={() => setAmount(value)}
                      role="radio"
                      aria-checked={selected}
                      className={[
                        "w-full rounded-2xl border p-4 text-center transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-blue-600",
                        selected
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 bg-white hover:bg-gray-50",
                      ].join(" ")}
                    >
                      <div
                        className={
                          selected
                            ? "text-blue-700 font-semibold"
                            : "text-gray-900 font-semibold"
                        }
                      >
                        {fmt(value)}
                      </div>
                      <div className="mt-1 text-xs sm:text-sm text-gray-500">
                        {desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* custom input */}
              <div className="mt-3 flex items-center gap-2">
                <label className="text-sm">Custom:</label>
                <input
                  value={amount === "custom" ? custom : ""}
                  onChange={(e) => {
                    setAmount("custom");
                    setCustom(e.target.value);
                  }}
                  onFocus={() => setAmount("custom")}
                  placeholder="e.g. 75"
                  inputMode="decimal"
                  className="h-11 w-40 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* frequency */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setFreq("once")}
                  className={`h-10 px-4 rounded-full text-sm border ${
                    freq === "once"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                  aria-pressed={freq === "once"}
                >
                  One‑time
                </button>
                <button
                  onClick={() => setFreq("monthly")}
                  className={`h-10 px-4 rounded-full text-sm border ${
                    freq === "monthly"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                  aria-pressed={freq === "monthly"}
                >
                  Monthly
                </button>
                <label className="ml-auto flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={coverFee}
                    onChange={(e) => setCoverFee(e.target.checked)}
                    className="accent-blue-600"
                  />
                  Cover processing fees
                </label>
              </div>
            </div>

            {/* dedicate */}
            <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={dedicate}
                  onChange={(e) => setDedicate(e.target.checked)}
                  className="mt-1 accent-blue-600"
                />
                <span className="text-sm md:text-base text-gray-700">
                  Dedicate my donation in honor or memory of someone
                </span>
              </label>

              {dedicate && (
                <div className="mt-6 rounded-xl border border-gray-200 p-4">
                  <div className="flex gap-6 text-sm">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="dedication"
                        checked={dedicationType === "honor"}
                        onChange={() => setDedicationType("honor")}
                        className="accent-blue-600"
                      />
                      In honor of
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="dedication"
                        checked={dedicationType === "memory"}
                        onChange={() => setDedicationType("memory")}
                        className="accent-blue-600"
                      />
                      In memory of
                    </label>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <input
                      className="h-11 rounded-lg border border-gray-200 px-3 text-sm sm:col-span-2"
                      placeholder="Honoree name"
                      value={honoree}
                      onChange={(e) => setHonoree(e.target.value)}
                    />
                    <input
                      className="h-11 rounded-lg border border-gray-200 px-3 text-sm"
                      placeholder="Recipient name (to notify)"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                    />
                    <input
                      className="h-11 rounded-lg border border-gray-200 px-3 text-sm"
                      placeholder="Recipient email"
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                    />
                    <textarea
                      className="min-h-[90px] rounded-lg border border-gray-200 px-3 py-2 text-sm sm:col-span-2"
                      placeholder="Message for the recipient (optional)"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* comment + donor wall */}
            <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={writeComment}
                  onChange={(e) => setWriteComment(e.target.checked)}
                  className="accent-blue-600"
                />
                <span className="text-gray-700">Write us a comment</span>
              </label>

              {writeComment && (
                <>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Say something to the ministry (max 300 chars)"
                    maxLength={300}
                    className="w-full min-h-[100px] rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  />

                  <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={displayOnWall}
                        onChange={(e) => setDisplayOnWall(e.target.checked)}
                        className="accent-blue-600"
                      />
                      Display your donation & comment on the donor wall
                    </label>

                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={anonymous}
                        onChange={(e) => setAnonymous(e.target.checked)}
                        className="accent-blue-600"
                      />
                      Post as Anonymous
                    </label>
                  </div>

                  {!anonymous && (
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your name for the donor wall"
                      className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm"
                    />
                  )}
                </>
              )}
            </div>

            {/* next -> modal */}
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(true)}
                disabled={!base}
                className={`h-12 rounded-xl px-6 font-medium text-white ${
                  !base
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Next
              </button>
            </div>
          </div>

          {/* right: side info */}
          <aside className="space-y-8">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">
                Benefits for Monthly Donors
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>
                  🏕️ Quarterly email magazine <em>The Echo</em>
                </li>
                <li>🏕️ End‑of‑year thank‑you gift</li>
                <li>🏕️ Annual tax receipt</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">How your gift is used</h3>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="rounded-xl border p-3">
                  <div className="font-semibold">Worship</div>
                  <p className="mt-1 text-gray-600">
                    Campus services & conferences
                  </p>
                </div>
                <div className="rounded-xl border p-3">
                  <div className="font-semibold">Education</div>
                  <p className="mt-1 text-gray-600">Training & seminars</p>
                </div>
                <div className="rounded-xl border p-3">
                  <div className="font-semibold">Mission</div>
                  <p className="mt-1 text-gray-600">Local & campus outreach</p>
                </div>
                <div className="rounded-xl border p-3">
                  <div className="font-semibold">Administration</div>
                  <p className="mt-1 text-gray-600">Operations & staff care</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="pb-20">
        <h3 className="text-2xl font-semibold">FAQ</h3>
        <details className="mt-4 rounded-xl bg-white p-4 shadow-sm">
          <summary className="cursor-pointer font-medium">
            Will I get a tax receipt?
          </summary>
          <p className="mt-2 text-sm text-gray-600">
            Yes, we email tax receipts annually (and on request).
          </p>
        </details>
        <details className="mt-2 rounded-xl bg-white p-4 shadow-sm">
          <summary className="cursor-pointer font-medium">
            How can I cancel a monthly donation?
          </summary>
          <p className="mt-2 text-sm text-gray-600">
            Email us anytime and we’ll cancel immediately—no questions asked.
          </p>
        </details>
      </Section>
      <DonorWall />

      {/* Modal step 2 */}
      <PaymentModal
        open={open}
        onClose={() => setOpen(false)}
        total={total}
        base={base}
        freq={freq}
        method={method}
        setMethod={setMethod}
        summary={
          <ul className="list-disc pl-5">
            {dedicate && (
              <li>
                {dedicationType === "honor" ? "In honor of" : "In memory of"}{" "}
                <strong>{honoree || "(name)"}</strong>
              </li>
            )}
            {recipientEmail && (
              <li>
                Notify <strong>{recipientName || "recipient"}</strong> at{" "}
                {recipientEmail}
              </li>
            )}
            {message && <li>Message included</li>}
            {coverFee && <li>Including processing fee</li>}
            {writeComment && displayOnWall && (
              <li>
                Donor wall: {anonymous ? "Anonymous" : fullName || "(name)"} — “
                {comment.slice(0, 40)}
                {comment.length > 40 ? "…" : ""}”
              </li>
            )}
          </ul>
        }
        // 결제/저장 동작 주입
        onDonate={handleDonate}
        testMode={true}
      />
    </main>
  );
}
