import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, Field, inputCls, btnPrimary, normalizePhoneVN } from "@/components/AuthShell";

export const Route = createFileRoute("/quen-mat-khau")({
  head: () => ({ meta: [{ title: "Quên mật khẩu — Huyền Học Aha Sage" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "verify" | "reset">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setMsg(null); setLoading(true);
    try {
      const p = normalizePhoneVN(phone);
      const { error } = await supabase.auth.signInWithOtp({ phone: p });
      if (error) throw error;
      setMsg("Đã gửi mã OTP để xác minh số điện thoại.");
      setStep("verify");
    } catch (e: any) { setErr(e?.message ?? "Không gửi được OTP."); }
    finally { setLoading(false); }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      const p = normalizePhoneVN(phone);
      const { error } = await supabase.auth.verifyOtp({ phone: p, token: otp, type: "sms" });
      if (error) throw error;
      setStep("reset");
    } catch (e: any) { setErr(e?.message ?? "OTP không hợp lệ."); }
    finally { setLoading(false); }
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      if (password.length < 6) throw new Error("Mật khẩu tối thiểu 6 ký tự.");
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      navigate({ to: "/ho-so" });
    } catch (e: any) { setErr(e?.message ?? "Đổi mật khẩu thất bại."); }
    finally { setLoading(false); }
  };

  const titleMap = { phone: "Quên mật khẩu", verify: "Xác thực OTP", reset: "Đặt mật khẩu mới" };

  return (
    <AuthShell
      title={titleMap[step]}
      subtitle={step === "phone" ? "Nhập số điện thoại để nhận mã OTP đặt lại mật khẩu" : step === "verify" ? `Mã 6 số đã gửi tới ${normalizePhoneVN(phone)}` : "Chọn mật khẩu mới cho tài khoản của bạn"}
      footer={<>Nhớ mật khẩu? <Link to="/dang-nhap" className="text-primary hover:underline">Đăng nhập</Link></>}
    >
      {err ? <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</div> : null}
      {msg ? <div className="mb-4 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">{msg}</div> : null}

      {step === "phone" ? (
        <form onSubmit={sendOtp} className="space-y-4">
          <Field label="Số điện thoại">
            <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} required inputMode="tel" placeholder="0912 345 678" />
          </Field>
          <button type="submit" className={btnPrimary} disabled={loading}>{loading ? "Đang gửi..." : "Gửi mã OTP"}</button>
        </form>
      ) : step === "verify" ? (
        <form onSubmit={verifyOtp} className="space-y-4">
          <Field label="Mã OTP">
            <input className={`${inputCls} tracking-[0.5em] text-center text-lg`} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} required inputMode="numeric" placeholder="••••••" />
          </Field>
          <button type="submit" className={btnPrimary} disabled={loading || otp.length !== 6}>{loading ? "Đang xác thực..." : "Xác thực"}</button>
        </form>
      ) : (
        <form onSubmit={resetPassword} className="space-y-4">
          <Field label="Mật khẩu mới" hint="Tối thiểu 6 ký tự">
            <input type="password" className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </Field>
          <button type="submit" className={btnPrimary} disabled={loading}>{loading ? "Đang lưu..." : "Cập nhật mật khẩu"}</button>
        </form>
      )}
    </AuthShell>
  );
}
