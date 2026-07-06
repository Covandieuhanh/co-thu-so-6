import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, Field, inputCls, btnPrimary, btnGhost } from "@/components/AuthShell";
import { normalizePhoneVN } from "@/lib/auth-context";

export const Route = createFileRoute("/dang-nhap")({
  head: () => ({ meta: [{ title: "Đăng nhập — Huyền Học Aha Sage" }] }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"password" | "otp">("password");
  const [step, setStep] = useState<"input" | "verify">("input");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const signInPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      const p = normalizePhoneVN(phone);
      const { error } = await supabase.auth.signInWithPassword({ phone: p, password });
      if (error) throw error;
      navigate({ to: "/ho-so" });
    } catch (e: any) { setErr(e?.message ?? "Đăng nhập thất bại."); }
    finally { setLoading(false); }
  };

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setMsg(null); setLoading(true);
    try {
      const p = normalizePhoneVN(phone);
      const { error } = await supabase.auth.signInWithOtp({ phone: p });
      if (error) throw error;
      setMsg("Đã gửi mã OTP tới số điện thoại của bạn.");
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
      navigate({ to: "/ho-so" });
    } catch (e: any) { setErr(e?.message ?? "OTP không hợp lệ."); }
    finally { setLoading(false); }
  };

  return (
    <AuthShell
      title="Đăng nhập"
      subtitle="Chào mừng trở lại với Huyền Học Aha Sage"
      footer={<>Chưa có tài khoản? <Link to="/dang-ky" className="text-primary hover:underline">Đăng ký</Link></>}
    >
      <div className="mb-5 grid grid-cols-2 gap-2 rounded-lg border border-border/60 bg-background/40 p-1">
        <button onClick={() => { setMode("password"); setStep("input"); setErr(null); setMsg(null); }}
          className={`rounded-md px-3 py-2 text-xs font-medium uppercase tracking-wider transition ${mode === "password" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
          Mật khẩu
        </button>
        <button onClick={() => { setMode("otp"); setStep("input"); setErr(null); setMsg(null); }}
          className={`rounded-md px-3 py-2 text-xs font-medium uppercase tracking-wider transition ${mode === "otp" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
          Mã OTP
        </button>
      </div>

      {err ? <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</div> : null}
      {msg ? <div className="mb-4 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">{msg}</div> : null}

      {mode === "password" ? (
        <form onSubmit={signInPassword} className="space-y-4">
          <Field label="Số điện thoại">
            <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} required inputMode="tel" placeholder="0912 345 678" />
          </Field>
          <Field label="Mật khẩu">
            <input type="password" className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>
          <button type="submit" className={btnPrimary} disabled={loading}>{loading ? "Đang đăng nhập..." : "Đăng nhập"}</button>
          <div className="text-right text-sm">
            <Link to="/quen-mat-khau" className="text-muted-foreground hover:text-primary">Quên mật khẩu?</Link>
          </div>
        </form>
      ) : step === "input" ? (
        <form onSubmit={sendOtp} className="space-y-4">
          <Field label="Số điện thoại" hint="Chúng tôi sẽ gửi mã 6 số qua SMS">
            <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} required inputMode="tel" placeholder="0912 345 678" />
          </Field>
          <button type="submit" className={btnPrimary} disabled={loading}>{loading ? "Đang gửi..." : "Gửi mã OTP"}</button>
        </form>
      ) : (
        <form onSubmit={verifyOtp} className="space-y-4">
          <Field label="Mã OTP">
            <input className={`${inputCls} tracking-[0.5em] text-center text-lg`} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} required inputMode="numeric" placeholder="••••••" />
          </Field>
          <button type="submit" className={btnPrimary} disabled={loading || otp.length !== 6}>{loading ? "Đang xác thực..." : "Xác thực & đăng nhập"}</button>
          <button type="button" onClick={() => setStep("input")} className={btnGhost}>← Đổi số điện thoại</button>
        </form>
      )}
    </AuthShell>
  );
}
