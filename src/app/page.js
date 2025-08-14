import Carousel from "@/components/Carousel";
import ThemeButton from "@/components/ThemeButton";
import LangButton from "@/components/LangButton";
import { tr, getData } from "@/lib/translations";
import Link from "next/link";

export default async function Page({ searchParams }) {
  // ⬇️ searchParams giờ là async -> phải await
  const sp = await searchParams;

  // Giá trị có thể là string hoặc string[] -> lấy phần tử đầu nếu là mảng
  const langRaw = Array.isArray(sp?.lang) ? sp.lang[0] : sp?.lang;
  const sentRaw = Array.isArray(sp?.sent) ? sp.sent[0] : sp?.sent;

  const lang = (langRaw === "en" || langRaw === "vi") ? langRaw : "vi";
  const sent = sentRaw;

  const L = (k) => tr(lang, k);
  const { PROFILE, AVATARS, PROJECTS, SKILLS, EXPERIENCE, CERTS } = getData(lang);

  return (
    <>
      {/* AppBar */}
      <header className="appbar">
        <nav className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PROFILE.avatar} alt={PROFILE.name} className="h-8 w-8 rounded-full object-cover" />
            <span className="font-semibold">{PROFILE.name}</span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#du-an" className="navlink">{L('nav_projects')}</a><span className="nav-sep"></span>
            <a href="#ki-nang" className="navlink">{L('nav_skills')}</a><span className="nav-sep"></span>
            <a href="#kinh-nghiem" className="navlink">{L('nav_exp')}</a><span className="nav-sep"></span>
            <a href="#lien-he" className="navlink">{L('nav_contact')}</a>
          </div>

          <div className="flex items-center gap-2">
            <Link className="btn-soft" href={PROFILE.cvUrl} target="_blank">CV</Link>
            <LangButton current={lang} />
            <ThemeButton />
          </div>
        </nav>
      </header>

      <div className="h-16"></div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-[1fr,1.3fr] gap-8 md:gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">{PROFILE.name}</h1>
            <p className="text-sm md:text-base mt-3 text-white/70">{PROFILE.role}</p>
            <p className="mt-5 leading-relaxed text-white/80">{L('hero_text')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#du-an" className="btn-primary">{L('view_projects')}</a>
              <Link href={PROFILE.linkedin} target="_blank" className="btn-soft">LinkedIn</Link>
              <Link href={PROFILE.github}   target="_blank" className="btn-soft">GitHub</Link>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-white/70">
              <span>📧 {PROFILE.email}</span>
              <span>📞 {PROFILE.phone}</span>
            </div>
          </div>
          <Carousel images={AVATARS} />
        </div>
      </section>

      {/* Projects */}
      <section id="du-an" className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-6 md:mb-8 flex items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold whitespace-nowrap flex-shrink-0">{L('projects_title')}</h2>
          <div className="hidden md:block flex-1 h-px bg-white/20 theme-light:bg-black/10"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <div key={i} className="rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition-all p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{p.title}</h3>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">{L('featured')}</span>
              </div>
              <p className="text-white/70 mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((tg, j) => <span key={j} className="text-xs border border-white/20 rounded px-2 py-1">{tg}</span>)}
              </div>
              <div className="flex gap-2">
                <Link href={p.demo} className="btn-soft text-sm">{L('demo')}</Link>
                <Link href={p.repo} className="btn-primary text-sm">{L('source')}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="ki-nang" className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-6 md:mb-8 flex items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold whitespace-nowrap flex-shrink-0">{L('skills_title')}</h2>
          <div className="hidden md:block flex-1 h-px bg-white/20 theme-light:bg-black/10"></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s, i) => <span key={i} className="border border-white/20 px-3 py-1 rounded text-sm">{s}</span>)}
        </div>
      </section>

      {/* Experience */}
      <section id="kinh-nghiem" className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-6 md:mb-8 flex items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold whitespace-nowrap flex-shrink-0">{L('exp_title')}</h2>
          <div className="hidden md:block flex-1 h-px bg-white/20 theme-light:bg-black/10"></div>
        </div>
        <div className="relative">
          <div className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-white/10 theme-light:bg-black/10"></div>
          <div className="space-y-8">
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="pl-10 md:pl-12 relative">
                <div className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500"></div>
                <h3 className="font-medium">{e.time}</h3>
                <p className="text-white/80 mt-1">{e.title}</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-white/70">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-6 md:mb-8 flex items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold whitespace-nowrap flex-shrink-0">{L('certs_title')}</h2>
          <div className="hidden md:block flex-1 h-px bg-white/20 theme-light:bg-black/10"></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {CERTS.map((c, i) => <span key={i} className="bg-white/10 px-3 py-1 rounded">{c}</span>)}
        </div>
      </section>

      {/* Contact */}
      <section id="lien-he" className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-6 md:mb-8 flex items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold whitespace-nowrap flex-shrink-0">{L('contact_title')}</h2>
          <div className="hidden md:block flex-1 h-px bg-white/20 theme-light:bg-black/10"></div>
        </div>

        {sent === "1" && (
          <div className="mb-6 p-4 rounded bg-green-600/20 border border-green-400/40">{L('sent_ok')}</div>
        )}
        {sent === "0" && (
          <div className="mb-6 p-4 rounded bg-red-600/20 border border-red-400/40">{L('sent_fail')}</div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <form method="POST" action={`/api/contact?lang=${lang}`} className="space-y-4">
            <input className="w-full bg-white/10 border border-white/20 rounded px-3 py-2" type="text"  name="name"    placeholder={L('name')} required />
            <input className="w-full bg-white/10 border border-white/20 rounded px-3 py-2" type="email" name="email"   placeholder={L('email')} required />
            <textarea className="w-full bg-white/10 border border-white/20 rounded px-3 py-2" name="message" rows={6} placeholder={L('message')} required />
            <button className="w-full btn-primary" type="submit">{L('send')}</button>
          </form>

          <div className="space-y-4 text-sm">
            <div>📧 {PROFILE.email}</div>
            <div>📞 {PROFILE.phone}</div>
            <div>🔗 <Link className="underline" href={PROFILE.linkedin} target="_blank">LinkedIn</Link></div>
            <div>💻 <Link className="underline" href={PROFILE.github} target="_blank">GitHub</Link></div>
            <div>📍 {PROFILE.location}</div>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 text-center text-white/50 theme-light:text-slate-500">
        © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
      </footer>
    </>
  );
}
