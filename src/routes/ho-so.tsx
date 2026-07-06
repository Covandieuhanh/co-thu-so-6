import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, Field, inputCls, btnPrimary, btnGhost } from "@/components/AuthShell";

export const Route = createFileRoute("/ho-so")({
  head: () => ({ meta: [{ title: "Hồ sơ tài khoản — Huyền Học Aha Sage" }] }),
  component: ProfilePage,
});

type Profile = {
  id: string;
  phone: string | null;
  display_name: string | null;
  date_of_birth: string | null;
  gender: string | null;
  avatar_url: string | null;
  bio: string | null;
};

function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate({ to: "/dang-nhap" }); return; }
      setEmail(user.email ?? user.phone ?? null);
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (error) setErr(error.message);
      setProfile(data ?? {
        id: user.id, phone: user.phone ?? null, display_name: "", date_of_birth: null,
        gender: null, avatar_url: null, bio: null,
      });
      setLoading(false);
    })();
  }, [navigate]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setErr(null); setMsg(null); setSaving(true);
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: profile.id,
        phone: profile.phone,
        display_name: profile.display_name,
        date_of_birth: profile.date_of_birth || null,
        gender: profile.gender,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
      });
      if (error) throw error;
      setMsg("Đã lưu hồ sơ.");
    } catch (e: any) { setErr(e?.message ?? "Lưu thất bại."); }
    finally { setSaving(false); }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/dang-nhap" });
  };

  if (loading) {
    return <AuthShell title="Hồ sơ"><div className="py-8 text-center text-sm text-muted-foreground">Đang tải...</div></AuthShell>;
  }

  return (
    <AuthShell
      title="Hồ sơ tài khoản"
      subtitle={profile?.phone ?? email ?? "Cập nhật thông tin cá nhân của bạn"}
      footer={<Link to="/" className="text-muted-foreground hover:text-primary">← Về trang chủ</Link>}
    >
      {err ? <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</div> : null}
      {msg ? <div className="mb-4 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">{msg}</div> : null}

      <form onSubmit={save} className="space-y-4">
        <Field label="Họ và tên">
          <input className={inputCls} value={profile?.display_name ?? ""} onChange={(e) => setProfile((p) => p && { ...p, display_name: e.target.value })} />
        </Field>
        <Field label="Số điện thoại">
          <input className={inputCls} value={profile?.phone ?? ""} readOnly />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Ngày sinh">
            <input type="date" className={inputCls} value={profile?.date_of_birth ?? ""} onChange={(e) => setProfile((p) => p && { ...p, date_of_birth: e.target.value })} />
          </Field>
          <Field label="Giới tính">
            <select className={inputCls} value={profile?.gender ?? ""} onChange={(e) => setProfile((p) => p && { ...p, gender: e.target.value })}>
              <option value="">— Chọn —</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </Field>
        </div>
        <Field label="Ảnh đại diện (URL)">
          <input className={inputCls} value={profile?.avatar_url ?? ""} onChange={(e) => setProfile((p) => p && { ...p, avatar_url: e.target.value })} placeholder="https://..." />
        </Field>
        <Field label="Giới thiệu">
          <textarea className={`${inputCls} min-h-[96px] resize-y`} value={profile?.bio ?? ""} onChange={(e) => setProfile((p) => p && { ...p, bio: e.target.value })} />
        </Field>

        <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
          <button type="submit" className={btnPrimary} disabled={saving}>{saving ? "Đang lưu..." : "Lưu thay đổi"}</button>
          <button type="button" onClick={signOut} className={btnGhost}>Đăng xuất</button>
        </div>
      </form>
    </AuthShell>
  );
}
