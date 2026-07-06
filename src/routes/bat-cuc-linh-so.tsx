import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DisciplinePage, FormField, inputCls, btnCls } from "@/components/DisciplinePage";
import { calcBatCuc } from "@/lib/huyen-hoc";

export const Route = createFileRoute("/bat-cuc-linh-so")({
  head: () => ({
    meta: [
      { title: "Bát Cực Linh Số — Huyền Học Aha Sage" },
      { name: "description", content: "Nhập số điện thoại, CCCD, biển số xe để giải mã tám quẻ cát hung." },
    ],
  }),
  component: Page,
});

function Page() {
  const [name, setName] = useState("");
  const [kind, setKind] = useState("Số điện thoại");
  const [digits, setDigits] = useState("");
  const [r, setR] = useState<ReturnType<typeof calcBatCuc> | null>(null);

  const reading = (
    <div className="space-y-6">
      <form onSubmit={(e) => { e.preventDefault(); if (digits) setR(calcBatCuc(digits)); }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Họ và tên (tuỳ chọn)"><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Nguyễn Văn A" /></FormField>
        <FormField label="Loại số">
          <select className={inputCls} value={kind} onChange={(e) => setKind(e.target.value)}>
            <option>Số điện thoại</option><option>Căn cước công dân</option><option>Biển số xe</option><option>Số nhà</option>
          </select>
        </FormField>
        <div className="md:col-span-2">
          <FormField label={`Nhập ${kind.toLowerCase()}`}>
            <input inputMode="numeric" className={`${inputCls} font-mono tracking-widest text-lg`} value={digits} onChange={(e) => setDigits(e.target.value)} placeholder="0912345678" required />
          </FormField>
        </div>
        <div className="md:col-span-2 flex justify-end"><button className={btnCls}>Giải mã Bát Cực</button></div>
      </form>
      {r && (
        <div className="border-t border-border pt-6">
          {name && <div className="text-sm text-muted-foreground mb-4">Chủ số: <span className="text-foreground font-display italic">{name}</span> · {kind}</div>}
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-4">
            Tổng kết: Cát {r.totals.cat} · Hung {r.totals.hung} · Trung tính {r.totals.trung}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {r.pairs.map((p, i) => (
              <div key={i} className={`border rounded-sm p-3 ${p.nature === "cát" ? "border-accent/60" : p.nature === "hung" ? "border-destructive/40" : "border-border"}`}>
                <div className="font-mono text-accent">{p.pair} — {p.que}</div>
                <div className="text-muted-foreground mt-1">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <DisciplinePage
      no="01" tag="BÁT CỰC LINH SỐ" title="Mật Mã Số Học"
      tagline="Tám quẻ cát hung ẩn trong mỗi dãy số bạn mang theo mỗi ngày."
      intro="Bát Cực Linh Số luận đoán năng lượng của các cặp số kề nhau — mỗi cặp ứng một quẻ hậu thiên. Số điện thoại, CCCD, biển số xe, số nhà đều tạo chuỗi rung động ảnh hưởng đến sức khoẻ, tài lộc, tình cảm."
      reading={reading}
      sections={[
        { heading: "Cách đọc dãy số", body: <p>Chia dãy số thành các cặp hai chữ số liên tiếp. Tra bảng Bát Trạch để lấy quẻ. Bốn số cuối phản ánh vận trình hiện tại rõ nhất.</p> },
        { heading: "Tám quẻ", body: <p>Sinh Khí, Thiên Y, Diên Niên, Phục Vị (cát) — Tuyệt Mệnh, Ngũ Quỷ, Lục Sát, Hoạ Hại (hung). Số 0 và 5 là điểm dừng năng lượng.</p> },
      ]}
      keyConcepts={[
        { term: "Sinh Khí", meaning: "Cát — may mắn, quý nhân." },
        { term: "Thiên Y", meaning: "Cát — sức khoẻ, tài lộc." },
        { term: "Tuyệt Mệnh", meaning: "Hung — mất mát lớn." },
        { term: "Ngũ Quỷ", meaning: "Hung — hao tài, tiểu nhân." },
      ]}
      practice={["Chia dãy số thành các cặp kề nhau.", "Tra bảng Bát Trạch.", "Ưu tiên bốn số cuối.", "Chọn số hợp mục đích: kinh doanh, sức khoẻ, tình cảm."]}
      quote="Số không tự nói — người mang số mới làm nên vận."
      related={[
        { to: "/tu-truong-so", no: "02", tag: "TỪ TRƯỜNG SỐ", title: "Rung Động Năng Lượng" },
        { to: "/bat-tu", no: "03", tag: "BÁT TỰ", title: "Tứ Trụ Mệnh Lý" },
      ]}
    />
  );
}
