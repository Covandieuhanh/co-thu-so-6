import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, Field, inputCls, btnPrimary } from "@/components/AuthShell";
import { normalizePhoneVN } from "@/lib/auth-context";

export const Route = createFileRoute("/dang-ky")({
  head: () => ({ meta: [{ title: "Đăng ký — Huyền Học Aha Sage" }] }),
  component: SignUpPage,
});

function SignUpPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [phone, setPhone] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setMsg(null); setLoading(true);
    try {
      if (password.length < 6) throw new Error("Mật khẩu tối thiểu 6 ký tự.");
      const p = normalizePhoneVN(phone);
      const { error } = await supabase.auth.signUp({
        phone: p,
        password,
        options: { data: { display_name: displayName } },
      });
      if (error) throw error;
      setMsg("Mã OTP đã được gửi tới số điện thoại của bạn.");
      setStep("otp");
    } catch (e: any) {
      setErr(e?.message ?? "Đăng ký thất bại.");
    } finally { setLoading(false); }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      const p = normalizePhoneVN(phone);
      const { error } = await supabase.auth.verifyOtp({ phone: p, token: otp, type: "sms" });
      if (error) throw error;
      navigate({ to: "/ho-so" });
    } catch (e: any) {
      setErr(e?.message ?? "Xác thực OTP thất bại.");
    } finally { setLoading(false); }
  };

  const resend = async () => {
    setErr(null); setMsg(null); setLoading(true);
    try {
      const p = normalizePhoneVN(phone);
      const { error } = await supabase.auth.resend({ type: "sms", phone: p });
      if (error) throw error;
      setMsg("Đã gửi lại mã OTP.");
    } catch (e: any) { setErr(e?.message ?? "Không gửi lại được OTP."); }
    finally { setLoading(false); }
  };

  return (
    <AuthShell
      title={step === "form" ? "Tạo tài khoản" : "Xác thực OTP"}
      subtitle={step === "form" ? "Đăng ký bằng số điện thoại Việt Nam" : `Nhập mã 6 số gửi tới ${normalizePhoneVN(phone)}`}
      footer={
        step === "form" ? (
          <>Đã có tài khoản? <Link to="/dang-nhap" className="text-primary hover:underline">Đăng nhập</Link></>
        ) : (
          <button onClick={resend} className="text-primary hover:underline" disabled={loading}>Gửi lại mã OTP</button>
        )
      }
    >
      {err ? <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</div> : null}
      {msg ? <div className="mb-4 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">{msg}</div> : null}

      {step === "form" ? (
        <form onSubmit={submit} className="space-y-4">
          <Field label="Họ và tên">
            <input className={inputCls} value={displayName} onChange={(e) => setDisplayName(e.target.value)} required placeholder="Nguyễn Văn A" />
          </Field>
          <Field label="Số điện thoại" hint="Định dạng: 0912345678 hoặc +84912345678">
            <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} required inputMode="tel" placeholder="0912 345 678" />
          </Field>
          <Field label="Mật khẩu" hint="Tối thiểu 6 ký tự">
            <input type="password" className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </Field>
          <button type="submit" className={btnPrimary} disabled={loading}>
            {loading ? "Đang gửi..." : "Đăng ký & nhận OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={verify} className="space-y-4">
          <Field label="Mã OTP">
            <input className={`${inputCls} tracking-[0.5em] text-center text-lg`} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} required inputMode="numeric" placeholder="••••••" />
          </Field>
          <button type="submit" className={btnPrimary} disabled={loading || otp.length !== 6}>
            {loading ? "Đang xác thực..." : "Xác thực & hoàn tất"}
          </button>
          <button type="button" onClick={() => setStep("form")} className="w-full text-center text-xs text-muted-foreground hover:text-foreground">← Sửa thông tin</button>
        </form>
      )}
    </AuthShell>
  );
}
