'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const FEATURES = [
  { icon: '📡', title: 'True Offline-First', desc: 'Runs entirely on Local LAN via Raspberry Pi. No internet? No problem. Your store never stops.', tag: 'Core', color: '#00FF94' },
  { icon: '📦', title: 'Vendor Dashboard', desc: 'Manage products, track inventory, view analytics — all from a sleek local web interface.', tag: 'Vendors', color: '#FFB800' },
  { icon: '🛒', title: 'Scan & Go', desc: 'Customers connect to your store\'s captive portal and add items themselves. Zero friction checkout.', tag: 'Customers', color: '#FF6B6B' },
  { icon: '🔍', title: 'OCR Receipt Scanner', desc: 'Point a camera at any receipt and our AI auto-fills the shopping cart instantly.', tag: 'AI', color: '#7C6FFF' },
  { icon: '📊', title: 'Local Analytics', desc: 'Sales trends, revenue insights, low-stock alerts — processed on-device, private by default.', tag: 'Insights', color: '#00FF94' },
  { icon: '⚡', title: 'Edge AI Models', desc: 'On-device quantized AI models for smart recommendations — no cloud bill, ever.', tag: 'Upcoming', color: '#FFB800' },
]

const STATS = [
  { value: '$800BN', label: 'Indian Retail Market' },
  { value: '12M+', label: 'Kirana Stores' },
  { value: '90%', label: 'Unorganized Retail' },
  { value: '₹19,800', label: 'Per Unit Cost' },
]

const TEAM = [
  { name: 'K.V. Chaitanya', role: 'Founder', skills: ['UI/UX', 'React', 'SQL', 'Networking'], initial: 'C', color: '#FFB800', achievement: 'Built & scaled club event management platform' },
  { name: 'Murali Aggipothu', role: 'Lead Developer', skills: ['Next.js', 'Node.js', 'DevOps', 'MongoDB'], initial: 'M', color: '#00FF94', achievement: 'Built bot serving 2.4k+ active student users' },
]

export default function Landing() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#070A0E', color: '#fff', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1a2a1a; border-radius: 4px; }

        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .market-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .team-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 800px; margin: 0 auto; }
        .stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); }
        .nav-links { display: flex; gap: 28px; }
        .mobile-menu-btn { display: none; }
        .hero-mockup { display: block; }
        .cta-btn:hover { transform: scale(1.04); box-shadow: 0 0 30px rgba(0,255,148,0.35); }
        .cta-btn { transition: all 0.25s ease; }
        .feat-card:hover { border-color: rgba(0,255,148,0.25) !important; transform: translateY(-3px); }
        .feat-card { transition: all 0.25s ease; }
        .team-card:hover { transform: translateY(-4px); }
        .team-card { transition: transform 0.3s ease; }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .hero-mockup { display: none !important; }
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .market-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .team-grid { grid-template-columns: 1fr !important; }
          .stats-bar { grid-template-columns: repeat(2, 1fr) !important; }
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .hero-title { font-size: clamp(32px, 8vw, 52px) !important; }
          .section-title { font-size: clamp(26px, 6vw, 40px) !important; }
        }
        @media (max-width: 480px) {
          .features-grid { grid-template-columns: 1fr !important; }
          .stats-bar { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-btns { flex-direction: column !important; }
          .hero-btns a, .hero-btns button { width: 100% !important; text-align: center !important; }
          .cta-btns { flex-direction: column !important; align-items: center !important; }
          .footer-inner { flex-direction: column !important; gap: 16px !important; text-align: center !important; }
        }

        .mobile-nav { display: none; position: fixed; top: 68px; left: 0; right: 0; background: rgba(7,10,14,0.98); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 20px; flex-direction: column; gap: 16px; z-index: 99; backdrop-filter: blur(16px); }
        .mobile-nav.open { display: flex; }

        section { scroll-margin-top: 70px; }
        a { text-decoration: none; }
        .grid-bg { background-image: linear-gradient(rgba(0,255,148,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,148,0.03) 1px, transparent 1px); background-size: 60px 60px; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .float { animation: float 4s ease-in-out infinite; }
      `}</style>

      {/* Navbar */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 5%', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrolled ? 'rgba(7,10,14,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(16px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none', transition: 'all 0.4s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'linear-gradient(135deg,#00FF94,#00C96E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '15px', color: '#070A0E' }}>A</div>
          <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '19px' }}>Agent <span style={{ color: '#00FF94' }}>Seva</span></span>
        </div>

        <div className="nav-links">
          {['Features', 'How It Works', 'Market', 'Team'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(' ','-')}`} style={{ fontSize: '14px', color: '#9CA3AF', fontWeight: 500 }}>{l}</a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/login">
            <button className="cta-btn" style={{ background: 'linear-gradient(135deg,#00FF94,#00C96E)', color: '#070A0E', border: 'none', borderRadius: '9px', padding: '8px 18px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>Sign In →</button>
          </Link>
          <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '7px 10px', color: '#fff', cursor: 'pointer', fontSize: '16px' }}>☰</button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-nav ${mobileMenu ? 'open' : ''}`}>
        {['Features', 'How It Works', 'Market', 'Team'].map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(' ','-')}`} onClick={() => setMobileMenu(false)} style={{ fontSize: '15px', color: '#D1D5DB', fontWeight: 500, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{l}</a>
        ))}
        <Link href="/login" onClick={() => setMobileMenu(false)}>
          <button style={{ width: '100%', background: 'linear-gradient(135deg,#00FF94,#00C96E)', color: '#070A0E', border: 'none', borderRadius: '10px', padding: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>Sign In →</button>
        </Link>
      </div>

      {/* Hero */}
      <section className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: 'clamp(100px, 12vw, 130px) 5% 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,148,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div className="hero-grid">
            <div>
              <div className="float" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,255,148,0.08)', border: '1px solid rgba(0,255,148,0.2)', borderRadius: '30px', padding: '6px 14px', marginBottom: '24px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00FF94' }} />
                <span style={{ fontSize: '12px', color: '#00FF94', fontWeight: 500 }}>Now in Pilot — 5 Local Stores</span>
              </div>

              <h1 className="hero-title" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '20px' }}>
                The Offline-First<br />
                <span style={{ color: '#00FF94', fontStyle: 'italic' }}>Digital Store</span><br />
                for India's Kiranas
              </h1>

              <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: '#6B7280', lineHeight: 1.7, marginBottom: '28px', maxWidth: '480px' }}>
                Agent Seva brings powerful retail management to Tier-2 & Tier-3 cities — running entirely on a local network. No internet required, ever.
              </p>

              <div className="hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <Link href="/login">
                  <button className="cta-btn" style={{ background: 'linear-gradient(135deg,#00FF94,#00C96E)', color: '#070A0E', border: 'none', borderRadius: '12px', padding: '14px 26px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 0 40px rgba(0,255,148,0.2)' }}>Get Started Free</button>
                </Link>
                <a href="#how-it-works">
                  <button style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 24px', fontWeight: 500, fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit' }}>How It Works ↓</button>
                </a>
              </div>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {[['🔌','Works offline'],['🏪','Built for Kiranas'],['🤖','AI-powered']].map(([icon,text]) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px' }}>{icon}</span>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard mockup - hidden on mobile */}
            <div className="hero-mockup">
              <div style={{ background: 'rgba(12,17,16,0.9)', border: '1px solid rgba(0,255,148,0.15)', borderRadius: '20px', padding: '20px', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontWeight: 700, color: '#00FF94', fontSize: '13px' }}>Agent Seva</span>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />)}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px', marginBottom: '14px' }}>
                  {[['Products','124','#00FF94'],['Orders','38','#FFB800'],['Revenue','₹4,200','#FF6B6B'],['Low Stock','7','#7C6FFF']].map(([l,v,c]) => (
                    <div key={l} style={{ background: `${c}10`, border: `1px solid ${c}22`, borderRadius: '10px', padding: '10px' }}>
                      <div style={{ fontSize: '10px', color: '#6B7280', marginBottom: '4px' }}>{l}</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: c }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '10px' }}>
                  {[['Order #1042 placed','#00FF94'],['Low stock: Red Chilli','#FF6B6B'],['₹3,400 received','#FFB800']].map(([t,c]) => (
                    <div key={t} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '7px' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: c, flexShrink: 0 }} />
                      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '-16px', left: '-16px', background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.3)', borderRadius: '12px', padding: '10px 14px', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: '18px', marginBottom: '2px' }}>📡</div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#FFB800' }}>Offline Ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,255,148,0.02)', padding: '32px 5%' }}>
        <div className="stats-bar" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '16px 10px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 5vw, 40px)', color: '#00FF94', marginBottom: '4px' }}>{s.value}</div>
              <div style={{ fontSize: 'clamp(11px, 2vw, 14px)', color: '#9CA3AF' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section id="features" style={{ padding: 'clamp(60px, 8vw, 100px) 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="section-title" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 400, marginBottom: '14px' }}>
              Everything your store needs,<br /><span style={{ fontStyle: 'italic', color: '#00FF94' }}>without the internet</span>
            </h2>
            <p style={{ color: '#6B7280', fontSize: '15px', maxWidth: '420px', margin: '0 auto' }}>Purpose-built for Indian Kirana stores in areas with unreliable connectivity.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feat-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span style={{ fontSize: '28px' }}>{f.icon}</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 9px', borderRadius: '20px', background: `${f.color}15`, color: f.color }}>{f.tag}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#fff', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: 'clamp(60px, 8vw, 100px) 5%', background: 'rgba(0,255,148,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="section-title" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 400 }}>
              Up and running in <span style={{ fontStyle: 'italic', color: '#FFB800' }}>30 minutes</span>
            </h2>
          </div>
          <div className="steps-grid">
            {[
              { num: '01', title: 'Install the Edge Unit', desc: 'A Raspberry Pi 5 device is set up in your store in under 30 minutes.' },
              { num: '02', title: 'Connect Your Shop', desc: 'All devices in store connect to the local network — no SIM, no broadband needed.' },
              { num: '03', title: 'Go Live Instantly', desc: 'Start managing products, serving customers, and tracking sales from day one.' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '26px 22px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Serif Display, serif', fontSize: '18px', color: '#FFB800', marginBottom: '16px' }}>{s.num}</div>
                <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#fff', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market / Why We Win */}
      <section id="market" style={{ padding: 'clamp(60px, 8vw, 100px) 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="market-grid">
            <div>
              <h2 className="section-title" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 400, marginBottom: '16px' }}>
                Competitors need internet.<br /><span style={{ fontStyle: 'italic', color: '#7C6FFF' }}>We don't.</span>
              </h2>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.7, marginBottom: '24px' }}>Khatabook, DotPe, and every other solution fails the moment internet drops. Agent Seva runs on Local LAN — your store keeps running no matter what.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[{ label: 'Khatabook / DotPe', ok: false, cost: 'Monthly SaaS fee' }, { label: 'Agent Seva', ok: true, cost: '₹19,800 one-time' }].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: i === 1 ? 'rgba(0,255,148,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${i === 1 ? 'rgba(0,255,148,0.2)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '12px', padding: '12px 16px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: i === 1 ? '#00FF94' : '#9CA3AF' }}>{r.label}</span>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>{r.cost}</span>
                      <span>{r.ok ? '✅' : '❌'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'rgba(12,17,16,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '28px' }}>
              <div style={{ fontSize: '60px', textAlign: 'center', marginBottom: '14px' }}>🖥️</div>
              <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: '#fff', marginBottom: '16px', textAlign: 'center' }}>Edge Unit Hardware</h3>
              {[['Raspberry Pi 5 (8GB)','₹11,600'],['TP-Link Router','₹2,500'],['Power & Storage','₹3,200'],['Case & Battery','₹2,500']].map(([item,cost]) => (
                <div key={item} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{item}</span>
                  <span style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>{cost}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 12px', background: 'rgba(0,255,148,0.08)', borderRadius: '8px', border: '1px solid rgba(0,255,148,0.2)', marginTop: '4px' }}>
                <span style={{ fontSize: '13px', color: '#00FF94', fontWeight: 700 }}>TOTAL PER UNIT</span>
                <span style={{ fontSize: '13px', color: '#00FF94', fontWeight: 800 }}>₹19,800</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" style={{ padding: 'clamp(60px, 8vw, 100px) 5%', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="section-title" style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 400 }}>
              Built by <span style={{ fontStyle: 'italic', color: '#FF6B6B' }}>Executors</span>
            </h2>
          </div>
          <div className="team-grid">
            {TEAM.map((t, i) => (
              <div key={i} className="team-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: `linear-gradient(135deg,${t.color},${t.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: '#070A0E', fontFamily: 'DM Serif Display, serif', flexShrink: 0 }}>{t.initial}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: '#fff' }}>{t.name}</div>
                    <div style={{ fontSize: '13px', color: t.color, fontWeight: 500 }}>{t.role}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  {t.skills.map(s => <span key={s} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '3px 10px', fontSize: '11px', color: '#9CA3AF' }}>{s}</span>)}
                </div>
                <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6 }}>🏆 {t.achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 5%' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(0,255,148,0.08), rgba(0,255,148,0.02))', border: '1px solid rgba(0,255,148,0.15)', borderRadius: '24px', padding: 'clamp(36px, 6vw, 64px) clamp(24px, 5vw, 48px)', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 400, marginBottom: '14px' }}>
              Ready to modernize<br /><span style={{ fontStyle: 'italic', color: '#00FF94' }}>your Kirana store?</span>
            </h2>
            <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '32px', maxWidth: '420px', margin: '0 auto 32px' }}>Join the pilot program. Deploying in 5 local stores — looking for forward-thinking vendors.</p>
            <div className="cta-btns" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/login">
                <button className="cta-btn" style={{ background: 'linear-gradient(135deg,#00FF94,#00C96E)', color: '#070A0E', border: 'none', borderRadius: '12px', padding: '14px 28px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit' }}>Get Started →</button>
              </Link>
              <a href="mailto:venkatachaitanyakarnam@gmail.com">
                <button style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 24px', fontWeight: 500, fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit' }}>Contact Founders</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 5%' }}>
        <div className="footer-inner" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'linear-gradient(135deg,#00FF94,#00C96E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', color: '#070A0E' }}>A</div>
            <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '16px' }}>Agent Seva</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>📞 9491803089</span>
            <span style={{ fontSize: '13px', color: '#6B7280' }}>✉️ venkatachaitanyakarnam@gmail.com</span>
          </div>
          <span style={{ fontSize: '12px', color: '#374151' }}>© 2025 Agent Seva 🇮🇳</span>
        </div>
      </footer>
    </div>
  )
}