import type { NextApiRequest, NextApiResponse } from "next";

type Donation = {
  id: string;
  createdAt: number;
  amount: number;
  frequency: "once" | "monthly";
  comment?: string;
  displayOnWall?: boolean;
  anonymous?: boolean;
  name?: string | null;
  dedication?: {
    type: "honor" | "memory";
    honoree: string;
    notifyName?: string;
    notifyEmail?: string;
    message?: string;
  } | null;
};

// 데모: 서버 메모리 저장(재시작 시 초기화)
const DB: Donation[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body as Partial<Donation>;
    const entry: Donation = {
      id: Math.random().toString(36).slice(2),
      createdAt: Date.now(),
      amount: Number(data.amount || 0),
      frequency: (data.frequency as any) || "once",
      comment: data.comment || "",
      displayOnWall: !!data.displayOnWall,
      anonymous: !!data.anonymous,
      name: data.anonymous ? null : data.name || null,
      dedication: data.dedication || null,
    };
    DB.unshift(entry);
    return res.status(201).json({ ok: true, id: entry.id });
  }

  if (req.method === "GET") {
    // Donor wall: 공개 동의한 항목만
    const publicItems = DB.filter(
      (d) => d.displayOnWall && (d.comment || d.name)
    );
    return res.status(200).json({ items: publicItems });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
