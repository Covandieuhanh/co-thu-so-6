import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DisciplinePage, FormField, inputCls, btnCls, ResultRow } from "@/components/DisciplinePage";
import { calcBatTu, type BatTuResult } from "@/lib/huyen-hoc";

export const Route = createFileRoute("/bat-tu")({
  head: () => ({
    meta: [
      { title: "Bát Tự Tứ Trụ — Huyền Học Aha Sage" },
      { name: "description", content: "Nhập ngày giờ sinh để lấy tám chữ can chi và xác định Nhật Chủ." },
    ],
  }),
  component: Page,
});

function Page() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [gender, setGender] = useState<"nam" | "nu">("nam");
  const [r, setR] = useState<BatTuResult | null>(null);

  const reading = (
    <div className="space-y-6">
      <form
        onSubmit={(e) => { e.preventDefault(); if (dob && time) setR(calcBatTu(dob, time)); }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <FormField label="Họ và tên"><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Nguyễn Văn A" /></FormField>
        <FormField label="Giới tính">
          <select className={inputCls} value={gender} onChange={(e) => setGender(e.target.value as "nam" | "nu")}>
            <option value="nam">Nam</option><option value="nu">Nữ</option>
          </select>
        </FormField>
        <FormField label="Ngày sinh (dương lịch)"><input type="date" className={inputCls} value={dob} onChange={(e) => setDob(e.target.value)} required /></FormField>
        <FormField label="Giờ sinh"><input type="time" className={inputCls} value={time} onChange={(e) => setTime(e.target.value)} required /></FormField>
        <div className="md:col-span-2 flex justify-end"><button className={btnCls}>Lập tứ trụ</button></div>
      </form>
      {r && (
        <div className="border-t border-border pt-6 space-y-1">
          {name && <ResultRow label="Đương số" value={`${name} — ${gender === "nam" ? "Nam" : "Nữ"}`} />}
          <ResultRow label="Trụ Năm" value={r.year} />
          <ResultRow label="Trụ Tháng" value={r.month} />
          <ResultRow label="Trụ Ngày (Nhật Chủ)" value={r.day} />
          <ResultRow label="Trụ Giờ" value={r.hour} />
          <ResultRow label="Nhật Chủ" value={`${r.nhatChu} (hành ${r.nguHanh})`} />
        </div>
      )}
    </div>
  );

  return (
    <DisciplinePage
      no="03" tag="BÁT TỰ" title="Tứ Trụ Mệnh Lý"
      tagline="Tám chữ can chi vẽ nên cấu trúc ngũ hành trọn đời."
      intro="Bát Tự dùng bốn cặp thiên can – địa chi của năm, tháng, ngày, giờ sinh để dựng mô hình ngũ hành, xác định Nhật Chủ và tìm dụng thần."
      reading={reading}
      sections={[
        { heading: "Cấu trúc tám chữ", body: <p>Bốn trụ × (thiên can + địa chi) = tám chữ. Can ngày là Nhật Chủ — đại diện cho bản thân.</p> },
        { heading: "Ngũ hành sinh khắc", body: <p>Kim sinh Thuỷ, Thuỷ sinh Mộc, Mộc sinh Hoả, Hoả sinh Thổ, Thổ sinh Kim.</p> },
        { heading: "Thập thần", body: <p>Mười quan hệ giữa các can khác so với Nhật Chủ: Tỉ Kiên, Kiếp Tài, Thực Thần, Thương Quan, Chính/Thiên Tài, Chính Quan, Thất Sát, Chính/Thiên Ấn.</p> },
      ]}
      keyConcepts={[
        { term: "Nhật Chủ", meaning: "Can ngày — đại diện bản thân." },
        { term: "Dụng thần", meaning: "Hành cần bổ sung để cân bằng." },
        { term: "Hỷ thần", meaning: "Hành hỗ trợ dụng thần." },
        { term: "Kỵ thần", meaning: "Hành làm mất cân bằng." },
      ]}
      practice={["Đổi giờ sinh sang can chi.", "Xác định Nhật Chủ và mùa sinh.", "Đếm ngũ hành trong tám chữ.", "Tìm dụng thần cân bằng lá số."]}
      quote="Trời đất không thiên vị ai — chỉ có kẻ biết mùa của mình mới đúng lúc gieo hạt."
      related={[
        { to: "/bat-cuc-linh-so", no: "01", tag: "BÁT CỰC", title: "Mật Mã Số Học" },
        { to: "/tu-truong-so", no: "02", tag: "TỪ TRƯỜNG SỐ", title: "Rung Động Năng Lượng" },
      ]}
    />
  );
}
