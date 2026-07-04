import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DisciplinePage, FormField, inputCls, btnCls, ResultRow } from "@/components/DisciplinePage";
import { calcNumerology, type NumerologyResult } from "@/lib/huyen-hoc";

export const Route = createFileRoute("/tu-truong-so")({
  head: () => ({
    meta: [
      { title: "Từ Trường Số — Cổ Thư Số" },
      { name: "description", content: "Nhập họ tên và ngày sinh để nhận con số chủ đạo, sứ mệnh, linh hồn và nhân cách." },
      { property: "og:title", content: "Từ Trường Số — Rung Động Năng Lượng" },
      { property: "og:description", content: "Con số chủ đạo và sứ mệnh linh hồn qua ngày sinh và tên gọi." },
    ],
  }),
  component: Page,
});

function Page() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [r, setR] = useState<NumerologyResult | null>(null);

  const reading = (
    <div className="space-y-6">
      <form
        onSubmit={(e) => { e.preventDefault(); if (name && dob) setR(calcNumerology(name, dob)); }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <FormField label="Họ và tên khai sinh">
          <input className={inputCls} placeholder="Nguyễn Văn A" value={name} onChange={(e) => setName(e.target.value)} required />
        </FormField>
        <FormField label="Ngày tháng năm sinh">
          <input type="date" className={inputCls} value={dob} onChange={(e) => setDob(e.target.value)} required />
        </FormField>
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className={btnCls}>Luận giải</button>
        </div>
      </form>
      {r && (
        <div className="border-t border-border pt-6 space-y-1">
          <ResultRow label="Con số chủ đạo (Life Path)" value={`${r.lifePath} — ${r.meanings[r.lifePath] ?? ""}`} />
          <ResultRow label="Số sứ mệnh (Expression)" value={`${r.expression} — ${r.meanings[r.expression] ?? ""}`} />
          <ResultRow label="Số linh hồn (Soul Urge)" value={`${r.soulUrge} — ${r.meanings[r.soulUrge] ?? ""}`} />
          <ResultRow label="Số nhân cách (Personality)" value={`${r.personality} — ${r.meanings[r.personality] ?? ""}`} />
          <ResultRow label="Số ngày sinh (Birthday)" value={r.birthday} />
        </div>
      )}
    </div>
  );

  return (
    <DisciplinePage
      no="02"
      tag="TỪ TRƯỜNG SỐ"
      title="Rung Động Năng Lượng"
      tagline="Mỗi chữ cái, mỗi con số là một rung động riêng trong từ trường số mệnh."
      intro="Từ Trường Số khởi nguồn từ Pythagoras — từ ngày sinh và tên khai sinh, ta rút ra bộ chỉ số cốt lõi mô tả sứ mệnh, tính cách và nhu cầu nội tâm."
      reading={reading}
      sections={[
        { heading: "Cách rút gọn số", body: <p>Cộng dồn từng chữ số cho tới khi còn một chữ số (1–9), trừ Master 11, 22, 33.</p> },
        { heading: "Sáu chỉ số cốt lõi", body: <p>Life Path, Expression, Soul Urge, Personality, Birthday, Maturity — sáu góc nhìn tạo nên chân dung số học của một người.</p> },
        { heading: "Ý nghĩa 1–9 và Master", body: <p>1 Lãnh đạo · 2 Kết nối · 3 Sáng tạo · 4 Xây dựng · 5 Tự do · 6 Chăm sóc · 7 Nghiên cứu · 8 Quyền lực · 9 Phụng sự. 11/22/33 là Master.</p> },
      ]}
      keyConcepts={[
        { term: "Master Number", meaning: "11, 22, 33 — không rút gọn." },
        { term: "Karmic debt", meaning: "13, 14, 16, 19 — nghiệp cần trả." },
        { term: "Personal Year", meaning: "Chu kỳ 9 năm cá nhân." },
        { term: "Pinnacle", meaning: "Bốn giai đoạn đỉnh của đời." },
      ]}
      practice={[
        "Cộng dồn ngày, tháng, năm sinh để tìm Life Path.",
        "Quy đổi từng chữ cái theo bảng Pythagoras để có Expression.",
        "Tách nguyên âm và phụ âm để tính Soul Urge và Personality.",
      ]}
      quote="Vạn vật đều là con số — Pythagoras."
      related={[
        { to: "/bat-cuc-linh-so", no: "01", tag: "BÁT CỰC", title: "Mật Mã Số Học" },
        { to: "/bat-tu", no: "03", tag: "BÁT TỰ", title: "Tứ Trụ Mệnh Lý" },
      ]}
    />
  );
}
