// Utilities for computing simplified readings across disciplines.

const digitSum = (n: number): number => {
  let s = 0;
  for (const c of String(n)) if (c >= "0" && c <= "9") s += Number(c);
  return s;
};

const reduceToDigit = (n: number, keepMaster = true): number => {
  let x = Math.abs(n);
  while (x > 9) {
    if (keepMaster && (x === 11 || x === 22 || x === 33)) return x;
    x = digitSum(x);
  }
  return x;
};

// Pythagorean letter values (A=1..Z=9 wrapping)
const letterValue = (ch: string): number => {
  const c = ch.toUpperCase();
  const map: Record<string, number> = {};
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < alpha.length; i++) map[alpha[i]] = (i % 9) + 1;
  return map[c] ?? 0;
};

const VOWELS = new Set(["A", "E", "I", "O", "U", "Y"]);

const normalizeVN = (s: string): string =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toUpperCase();

// ------------- Thần Số Học -------------
export type NumerologyResult = {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
  birthday: number;
  meanings: Record<number, string>;
};

const NUM_MEANING: Record<number, string> = {
  1: "Lãnh đạo, khởi xướng, độc lập.",
  2: "Kết nối, ngoại giao, nhạy cảm.",
  3: "Sáng tạo, biểu đạt, lạc quan.",
  4: "Xây dựng, kỷ luật, nền tảng vững.",
  5: "Tự do, thay đổi, phiêu lưu.",
  6: "Chăm sóc, trách nhiệm, gia đình.",
  7: "Nghiên cứu, chiêm nghiệm, tâm linh.",
  8: "Quyền lực, tài chính, tổ chức.",
  9: "Phụng sự, nhân đạo, hoàn tất.",
  11: "Master — Người truyền cảm hứng.",
  22: "Master — Kiến trúc sư bậc thầy.",
  33: "Master — Người thầy tâm linh.",
};

export function calcNumerology(name: string, dob: string): NumerologyResult {
  const [y, m, d] = dob.split("-").map(Number);
  const lifePath = reduceToDigit(digitSum(y) + digitSum(m) + digitSum(d));
  const clean = normalizeVN(name).replace(/[^A-Z ]/g, "");
  let expr = 0, soul = 0, pers = 0;
  for (const ch of clean) {
    if (ch === " ") continue;
    const v = letterValue(ch);
    expr += v;
    if (VOWELS.has(ch)) soul += v;
    else pers += v;
  }
  return {
    lifePath,
    expression: reduceToDigit(expr),
    soulUrge: reduceToDigit(soul),
    personality: reduceToDigit(pers),
    birthday: reduceToDigit(d, false),
    meanings: NUM_MEANING,
  };
}

// ------------- Bát Tự (simplified) -------------
const THIEN_CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const DIA_CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
const CAN_NGU_HANH = ["Mộc", "Mộc", "Hoả", "Hoả", "Thổ", "Thổ", "Kim", "Kim", "Thuỷ", "Thuỷ"];

export type BatTuResult = {
  year: string; month: string; day: string; hour: string;
  nhatChu: string; nguHanh: string;
};

export function calcBatTu(dob: string, time: string): BatTuResult {
  const [y, m, d] = dob.split("-").map(Number);
  const [hh] = time.split(":").map(Number);
  // Julian-ish day count for stable can/chi assignment
  const date = new Date(Date.UTC(y, m - 1, d));
  const jdn = Math.floor(date.getTime() / 86400000) + 2440588;
  const dayCan = (jdn + 9) % 10;
  const dayChi = (jdn + 1) % 12;
  const yearCan = (y - 4) % 10;
  const yearChi = (y - 4) % 12;
  const monthCan = (yearCan * 2 + m) % 10;
  const monthChi = (m + 1) % 12;
  const hourIdx = Math.floor(((hh + 1) % 24) / 2);
  const hourChi = hourIdx % 12;
  const hourCan = (dayCan * 2 + hourIdx) % 10;
  const norm = (n: number, mod: number) => ((n % mod) + mod) % mod;
  const p = (c: number, z: number) => `${THIEN_CAN[norm(c, 10)]} ${DIA_CHI[norm(z, 12)]}`;
  return {
    year: p(yearCan, yearChi),
    month: p(monthCan, monthChi),
    day: p(dayCan, dayChi),
    hour: p(hourCan, hourChi),
    nhatChu: THIEN_CAN[norm(dayCan, 10)],
    nguHanh: CAN_NGU_HANH[norm(dayCan, 10)],
  };
}

// ------------- Tử Vi (very simplified) -------------
const CUNG_MENH = [
  "Dần", "Sửu", "Tý", "Hợi", "Tuất", "Dậu",
  "Thân", "Mùi", "Ngọ", "Tị", "Thìn", "Mão",
];
export function calcTuVi(dob: string, time: string, gender: "nam" | "nu") {
  const [, m] = dob.split("-").map(Number);
  const [hh] = time.split(":").map(Number);
  const hourIdx = Math.floor(((hh + 1) % 24) / 2);
  const cung = CUNG_MENH[(m - 1 + hourIdx) % 12];
  const chinhTinh = ["Tử Vi", "Thiên Cơ", "Thái Dương", "Vũ Khúc", "Thiên Đồng", "Liêm Trinh",
    "Thiên Phủ", "Thái Âm", "Tham Lang", "Cự Môn", "Thiên Tướng", "Thiên Lương"][(m + hourIdx) % 12];
  return {
    cungMenh: cung,
    chinhTinh,
    gioiTinh: gender === "nam" ? "Nam" : "Nữ",
  };
}

// ------------- Chiêm Tinh -------------
const ZODIAC: [string, [number, number], [number, number]][] = [
  ["Ma Kết", [12, 22], [1, 19]],
  ["Bảo Bình", [1, 20], [2, 18]],
  ["Song Ngư", [2, 19], [3, 20]],
  ["Bạch Dương", [3, 21], [4, 19]],
  ["Kim Ngưu", [4, 20], [5, 20]],
  ["Song Tử", [5, 21], [6, 20]],
  ["Cự Giải", [6, 21], [7, 22]],
  ["Sư Tử", [7, 23], [8, 22]],
  ["Xử Nữ", [8, 23], [9, 22]],
  ["Thiên Bình", [9, 23], [10, 22]],
  ["Bọ Cạp", [10, 23], [11, 21]],
  ["Nhân Mã", [11, 22], [12, 21]],
];

export function calcChiemTinh(dob: string, time: string, place: string) {
  const [, m, d] = dob.split("-").map(Number);
  const sun = ZODIAC.find(([, [sm, sd], [em, ed]]) => {
    if (sm === em) return m === sm && d >= sd && d <= ed;
    return (m === sm && d >= sd) || (m === em && d <= ed);
  })?.[0] ?? "—";
  const [hh] = time.split(":").map(Number);
  const asc = ZODIAC[(Math.floor(hh / 2) + m) % 12][0];
  const moon = ZODIAC[(d + m) % 12][0];
  return { sun, moon, asc, place };
}

// ------------- Human Design -------------
const HD_TYPES = ["Generator", "Manifesting Generator", "Projector", "Manifestor", "Reflector"];
const HD_AUTH = ["Emotional", "Sacral", "Splenic", "Ego", "Self-projected", "Mental", "Lunar"];
const HD_STRAT: Record<string, string> = {
  "Generator": "Đợi và phản ứng bằng cảm giác bụng.",
  "Manifesting Generator": "Phản ứng rồi thông báo trước khi hành động.",
  "Projector": "Đợi được mời và công nhận.",
  "Manifestor": "Thông báo trước khi khởi xướng.",
  "Reflector": "Đợi trọn một chu kỳ Mặt Trăng (28 ngày).",
};

export function calcHumanDesign(dob: string, time: string, place: string) {
  const [y, m, d] = dob.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const seed = y + m * 31 + d * 12 + hh * 7 + (mm || 0);
  const type = HD_TYPES[seed % HD_TYPES.length];
  const authority = HD_AUTH[(seed * 3) % HD_AUTH.length];
  const profile = `${(seed % 6) + 1}/${((seed * 2) % 6) + 1}`;
  return { type, authority, profile, strategy: HD_STRAT[type], place };
}

// ------------- Phong Thuỷ (Bát Trạch quái mệnh) -------------
const QUE_NAM = ["Khảm", "Ly", "Cấn", "Đoài", "Càn", "Khôn", "Tốn", "Chấn", "Khôn"];
const QUE_NU = ["Cấn", "Càn", "Đoài", "Cấn", "Ly", "Khảm", "Khôn", "Chấn", "Tốn"];
const DONG = new Set(["Khảm", "Ly", "Chấn", "Tốn"]);

export function calcPhongThuy(dob: string, gender: "nam" | "nu") {
  const [y] = dob.split("-").map(Number);
  const s = digitSum(y) > 9 ? reduceToDigit(digitSum(y), false) : digitSum(y);
  const idx = ((gender === "nam" ? 10 - s : s + 5) % 9 + 9) % 9;
  const que = gender === "nam" ? QUE_NAM[idx] : QUE_NU[idx];
  const menh = DONG.has(que) ? "Đông Tứ Mệnh" : "Tây Tứ Mệnh";
  const huongTot = DONG.has(que)
    ? ["Bắc", "Nam", "Đông", "Đông Nam"]
    : ["Tây", "Tây Bắc", "Đông Bắc", "Tây Nam"];
  const huongXau = DONG.has(que)
    ? ["Tây", "Tây Bắc", "Đông Bắc", "Tây Nam"]
    : ["Bắc", "Nam", "Đông", "Đông Nam"];
  return { que, menh, huongTot, huongXau };
}

// ------------- Bát Cực Linh Số -------------
const QUE_MAP: Record<string, { name: string; nature: "cát" | "hung"; desc: string }> = {
  "13": { name: "Diên Niên", nature: "cát", desc: "Tình cảm bền lâu, hoà hợp." },
  "14": { name: "Sinh Khí", nature: "cát", desc: "May mắn, thăng tiến, quý nhân." },
  "18": { name: "Thiên Y", nature: "cát", desc: "Sức khoẻ, tài lộc ổn định." },
  "19": { name: "Phục Vị", nature: "cát", desc: "Ổn định, nội tâm vững vàng." },
  "12": { name: "Tuyệt Mệnh", nature: "hung", desc: "Bất ổn, mất mát, tổn thất lớn." },
  "16": { name: "Hoạ Hại", nature: "hung", desc: "Thị phi, kiện tụng, nhỏ nhặt." },
  "17": { name: "Lục Sát", nature: "hung", desc: "Xung đột, tranh cãi, chia rẽ." },
  "27": { name: "Ngũ Quỷ", nature: "hung", desc: "Hao tài, tiểu nhân, phiền toái." },
};

export function calcBatCuc(digits: string) {
  const cleaned = digits.replace(/\D/g, "");
  const pairs: { pair: string; que: string; nature: string; desc: string }[] = [];
  for (let i = 0; i < cleaned.length - 1; i++) {
    const a = cleaned[i];
    const b = cleaned[i + 1];
    if (a === "0" || b === "0" || a === "5" || b === "5") {
      pairs.push({ pair: a + b, que: "—", nature: "trung tính", desc: "Số 0 / 5 làm gián đoạn năng lượng." });
      continue;
    }
    const key = [a, b].sort().join("");
    const q = QUE_MAP[key];
    if (q) pairs.push({ pair: a + b, que: q.name, nature: q.nature, desc: q.desc });
    else pairs.push({ pair: a + b, que: "Tương hoà", nature: "trung tính", desc: "Cặp số trung tính, không rõ cát hung." });
  }
  const totals = pairs.reduce(
    (acc, p) => {
      if (p.nature === "cát") acc.cat++;
      else if (p.nature === "hung") acc.hung++;
      else acc.trung++;
      return acc;
    },
    { cat: 0, hung: 0, trung: 0 },
  );
  return { pairs, totals };
}
