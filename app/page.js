'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

const PRODUCTS = [
  { name: 'StoreSync', desc: 'Offline-first inventory & billing', tag: 'Core', color: '#00FF94', icon: '🏪' },
  { name: 'VendorHub', desc: 'Multi-vendor management & analytics', tag: 'Vendors', color: '#FFB800', icon: '📦' },
  { name: 'EdgeMind', desc: 'On-device AI & OCR intelligence', tag: 'AI', color: '#7C6FFF', icon: '🧠' },
]

const FEATURES = [
  { icon: '📡', title: 'True Offline-First', desc: 'Runs entirely on Local LAN via Raspberry Pi. No internet? No problem. Your store never stops.', tag: 'Core', color: '#00FF94' },
  { icon: '📦', title: 'Vendor Dashboard', desc: 'Manage products, track inventory, view analytics — all from a sleek local web interface.', tag: 'Vendors', color: '#FFB800' },
  { icon: '🛒', title: 'Scan & Go', desc: "Customers connect to your store's captive portal and add items themselves. Zero friction checkout.", tag: 'Customers', color: '#FF6B6B' },
  { icon: '🔍', title: 'OCR Receipt Scanner', desc: 'Point a camera at any receipt and our AI auto-fills the shopping cart instantly.', tag: 'AI', color: '#7C6FFF' },
  { icon: '📊', title: 'Local Analytics', desc: 'Sales trends, low-stock alerts — processed on-device, private by default.', tag: 'Insights', color: '#00FF94' },
  { icon: '⚡', title: 'Edge AI Models', desc: 'On-device quantized AI models for smart recommendations — no cloud bill, ever.', tag: 'Upcoming', color: '#FFB800' },
]

const TEAM = [
  { name: 'K.V. Chaitanya', role: 'Founder', skills: ['UI/UX', 'React', 'SQL', 'Networking'], initial: 'C', color: '#FFB800', achievement: 'Built & scaled club event management platform' },
  { name: 'Murali Aggipothu', role: 'Lead Developer', skills: ['Next.js', 'Node.js', 'DevOps', 'MongoDB'], initial: 'M', color: '#00FF94', achievement: 'Built bot serving 2.4k+ active student users' },
]

const DEVELOPERS = [
  { name: 'Nakeeb Mufeed', role: 'Developer', initial: 'NM', color: '#00FF94', skills: ['React', 'Next.js', 'Python', 'Full Stack'] },
  { name: 'Amrutha Varshini', role: 'Developer', initial: 'AV', color: '#7C6FFF', skills: ['UI/UX', 'Frontend', 'Design'] },
]

export default function Landing() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showProducts, setShowProducts] = useState(false)
  const [showRegModal, setShowRegModal] = useState(false)
  const [regForm, setRegForm]       = useState({ name: '', email: '', business: '' })
  const [regSubmitted, setRegSubmitted] = useState(false)
  const [theme, setTheme]           = useState('dark')
  const [mobileProducts, setMobileProducts] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const dropdownRef = useRef(null)

  // System theme detection + user override
  useEffect(() => {
    const saved = localStorage.getItem('as_theme')
    if (saved) { setTheme(saved); return }
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    setTheme(mq.matches ? 'light' : 'dark')
    const onChange = (e) => {
      if (!localStorage.getItem('as_theme')) setTheme(e.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('as_theme', next)
  }

  const isDark = theme === 'dark'

  // Theme tokens
  const T = {
    bg:          isDark ? '#070A0E'                  : '#F5F7FA',
    bgCard:      isDark ? 'rgba(255,255,255,0.02)'   : 'rgba(0,0,0,0.03)',
    bgCard2:     isDark ? 'rgba(12,17,16,0.9)'       : '#ffffff',
    bgCardHover: isDark ? 'rgba(255,255,255,0.05)'   : 'rgba(0,0,0,0.06)',
    bgNav:       isDark ? 'rgba(7,10,14,0.95)'       : 'rgba(245,247,250,0.95)',
    bgMobile:    isDark ? 'rgba(7,10,14,0.98)'       : 'rgba(245,247,250,0.98)',
    bgDropdown:  isDark ? '#0D1117'                  : '#ffffff',
    bgModal:     isDark ? '#0D1117'                  : '#ffffff',
    bgInput:     isDark ? 'rgba(255,255,255,0.04)'   : 'rgba(0,0,0,0.04)',
    bgSkill:     isDark ? 'rgba(255,255,255,0.06)'   : 'rgba(0,0,0,0.06)',
    bgGreenCard: isDark ? 'rgba(0,255,148,0.06)'     : 'rgba(0,180,100,0.06)',
    border:      isDark ? 'rgba(255,255,255,0.07)'   : 'rgba(0,0,0,0.08)',
    borderNav:   isDark ? 'rgba(255,255,255,0.06)'   : 'rgba(0,0,0,0.08)',
    borderInput: isDark ? 'rgba(255,255,255,0.1)'    : 'rgba(0,0,0,0.12)',
    borderSkill: isDark ? 'rgba(255,255,255,0.1)'    : 'rgba(0,0,0,0.1)',
    text:        isDark ? '#ffffff'                  : '#0D1117',
    textMuted:   isDark ? '#6B7280'                  : '#5B6877',
    textSub:     isDark ? '#9CA3AF'                  : '#64748B',
    navText:     isDark ? '#9CA3AF'                  : '#475569',
    shadow:      isDark ? '0 20px 40px rgba(0,0,0,0.5)' : '0 20px 40px rgba(0,0,0,0.12)',
    green:  '#00FF94', greenDark: '#00C96E',
    greenNav: isDark ? '#00FF94' : '#009B59',  // darker green for light mode contrast
    yellow: '#FFB800', purple: '#7C6FFF', red: '#FF6B6B',
  }

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-show registration popup once after 4s
  useEffect(() => {
    const shown = sessionStorage.getItem('reg_shown')
    if (!shown) {
      const t = setTimeout(() => {
        setShowRegModal(true)
        sessionStorage.setItem('reg_shown', '1')
      }, 4000)
      return () => clearTimeout(t)
    }
  }, [])

  // Welcome message — show once per session
  useEffect(() => {
    const welcomed = sessionStorage.getItem('ke_welcomed')
    if (!welcomed) {
      setShowWelcome(true)
      sessionStorage.setItem('ke_welcomed', '1')
    }
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handle = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowProducts(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const handleRegSubmit = (e) => {
    e.preventDefault()
    if (!regForm.name || !regForm.email || !regForm.business) return
    setRegSubmitted(true)
    setTimeout(() => {
      setShowRegModal(false)
      setRegSubmitted(false)
      setRegForm({ name: '', email: '', business: '' })
    }, 2500)
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: T.bg, color: T.text, overflowX: 'hidden', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${isDark ? '#1a2a1a' : '#ccc'}; border-radius: 4px; }
        .hero-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .steps-grid  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .market-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .team-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 800px; margin: 0 auto; }
        .dev-grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 680px; margin: 0 auto; }
        .edge-grid   { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .stats-bar   { display: grid; grid-template-columns: repeat(3, 1fr); }
        .nav-links   { display: flex; gap: 24px; align-items: center; }
        .mobile-menu-btn { display: none !important; }
        .desktop-only { display: flex !important; }
        .mobile-only  { display: none !important; }
        .desktop-only-inline { display: inline-flex !important; }
        .hero-mockup { display: block; }
        .cta-btn { transition: all 0.25s ease; cursor: pointer; }
        .cta-btn:hover { transform: scale(1.04); box-shadow: 0 0 30px rgba(0,255,148,0.35); }
        .feat-card { transition: all 0.25s ease; }
        .feat-card:hover { transform: translateY(-3px); }
        .team-card { transition: transform 0.3s ease; }
        .team-card:hover { transform: translateY(-4px); }
        .nav-item { transition: color 0.2s; }
        .nav-item:hover { color: ${T.text} !important; }
        .prod-item { transition: background 0.18s; border-radius: 10px; cursor: pointer; }
        .prod-item:hover { background: ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'} !important; }
        .theme-btn { transition: all 0.25s; }
        .theme-btn:hover { transform: scale(1.1); }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .float { animation: float 4s ease-in-out infinite; }
        @keyframes modalIn { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:scale(1)} }
        .modal-box { animation: modalIn 0.28s ease; }
        section { scroll-margin-top: 70px; }
        a { text-decoration: none; color: inherit; }
        .grid-bg { background-image: linear-gradient(rgba(0,255,148,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,148,0.03) 1px,transparent 1px); background-size: 60px 60px; }
        input, select, button { font-family: inherit; }
        input:focus, select:focus { border-color: rgba(0,255,148,0.5) !important; outline: none; }
        .mobile-nav { display: none; position: fixed; top: 68px; left: 0; right: 0;
          background: ${T.bgMobile}; border-bottom: 1px solid ${T.borderNav};
          padding: 20px; flex-direction: column; gap: 14px; z-index: 99;
          backdrop-filter: blur(16px); max-height: calc(100vh - 68px); overflow-y: auto; }
        .mobile-nav.open { display: flex; }
        @media (max-width: 900px) {
          .hero-grid    { grid-template-columns: 1fr !important; gap: 0 !important; }
          .hero-mockup  { display: none !important; }
          .features-grid{ grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid   { grid-template-columns: 1fr !important; gap: 12px !important; }
          .market-grid  { grid-template-columns: 1fr !important; gap: 24px !important; }
          .team-grid    { grid-template-columns: 1fr !important; }
          .dev-grid     { grid-template-columns: 1fr !important; }
          .edge-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-bar    { grid-template-columns: repeat(3, 1fr) !important; }
          .nav-links    { display: none !important; }
          .mobile-menu-btn { display: flex !important; align-items: center; justify-content: center; }
          .desktop-only { display: none !important; }
          .desktop-only-inline { display: none !important; }
          .mobile-only  { display: flex !important; }

        }
        @media (max-width: 600px) {
          .features-grid { grid-template-columns: 1fr !important; }
          .edge-grid     { grid-template-columns: 1fr !important; }
          .hero-btns     { flex-direction: column !important; }
          .hero-btns button, .hero-btns a button { width: 100% !important; }
          .cta-btns      { flex-direction: column !important; align-items: stretch !important; }
          .footer-inner  { flex-direction: column !important; gap: 14px !important; text-align: center !important; }
          .modal-box     { padding: 0 !important; border-radius: 16px !important; }
          .welcome-highlights { grid-template-columns: 1fr !important; }
          .dev-grid      { grid-template-columns: 1fr !important; }
          .market-grid   { grid-template-columns: 1fr !important; }
          .stats-bar     { grid-template-columns: repeat(3,1fr) !important; }
          section        { padding-left: 5% !important; padding-right: 5% !important; }
        }
        @media (max-width: 400px) {
          .features-grid { grid-template-columns: 1fr !important; }
          .steps-grid    { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── WELCOME MODAL ── */}
      {showWelcome && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(12px)' }}
          onClick={(e) => e.target === e.currentTarget && setShowWelcome(false)}>
          <div className="modal-box" style={{ background: T.bgModal, border: `1px solid ${T.greenNav}30`, borderRadius: '24px', padding: '0', width: '100%', maxWidth: '520px', overflow: 'hidden', boxShadow: T.shadow }}>
            {/* Top banner */}
            <div style={{ background: `linear-gradient(135deg, ${T.greenNav}15, ${T.purple}10)`, padding: '32px 36px 24px', borderBottom: `1px solid ${T.border}`, textAlign: 'center', position: 'relative' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: `linear-gradient(135deg,${T.greenNav},${T.greenDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '28px', color: '#070A0E', margin: '0 auto 16px' }}>K</div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', color: T.text, marginBottom: '6px', fontWeight: 400 }}>
                Welcome to <span style={{ color: T.greenNav, fontStyle: 'italic' }}>Kirana Edge</span>
              </h2>
              <p style={{ fontSize: '13px', color: T.textMuted, lineHeight: 1.5 }}>The offline-first digital store for India's Kiranas</p>
            </div>
            {/* Body */}
            <div style={{ padding: '24px 36px' }}>
              {/* Startup badge */}
              <div style={{ background: 'rgba(124,111,255,0.08)', border: '1px solid rgba(124,111,255,0.2)', borderRadius: '10px', padding: '10px 14px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>🏛️</span>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: T.purple, letterSpacing: '0.06em' }}>RATAN TATA INNOVATION HUB</div>
                  <div style={{ fontSize: '11px', color: T.textMuted }}>TRL5 · Under Approval Phase</div>
                </div>
              </div>
              {/* 3 highlights */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '24px' }}>
                {[['📡','Works 100% offline','No internet needed'],['🧠','Edge AI','On-device intelligence'],['🏪','Built for India','Tier-2 & Tier-3 cities']].map(([icon,title,sub]) => (
                  <div key={title} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: '12px', padding: '14px 12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '22px', marginBottom: '6px' }}>{icon}</div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: T.text, marginBottom: '2px' }}>{title}</div>
                    <div style={{ fontSize: '10px', color: T.textMuted }}>{sub}</div>
                  </div>
                ))}
              </div>
              {/* Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => { setShowWelcome(false); setShowRegModal(true) }}
                  className="cta-btn"
                  style={{ flex: 1, background: `linear-gradient(135deg,${T.greenNav},${T.greenDark})`, color: '#070A0E', border: 'none', borderRadius: '12px', padding: '13px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
                  Get Started Free →
                </button>
                <button onClick={() => setShowWelcome(false)}
                  style={{ background: T.bgSkill, color: T.textSub, border: `1px solid ${T.border}`, borderRadius: '12px', padding: '13px 18px', fontWeight: 500, fontSize: '14px', cursor: 'pointer' }}>
                  Explore First
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── REGISTRATION MODAL ── */}
      {showRegModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(8px)' }}
          onClick={(e) => e.target === e.currentTarget && setShowRegModal(false)}>
          <div className="modal-box" style={{ background: T.bgModal, border: '1px solid rgba(0,255,148,0.2)', borderRadius: '20px', padding: '36px', width: '100%', maxWidth: '420px', boxShadow: T.shadow }}>
            {regSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '52px', marginBottom: '16px' }}>🎉</div>
                <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: T.green, marginBottom: '10px' }}>You're registered!</h3>
                <p style={{ color: T.textMuted, fontSize: '14px' }}>Welcome to Kirana Edge, {regForm.name}. We'll be in touch soon.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: T.text, marginBottom: '4px' }}>Create your account</h3>
                    <p style={{ fontSize: '13px', color: T.textMuted }}>Join Kirana Edge as a vendor</p>
                  </div>
                  <button onClick={() => setShowRegModal(false)} style={{ background: T.bgSkill, border: `1px solid ${T.border}`, borderRadius: '8px', width: '32px', height: '32px', color: T.textSub, cursor: 'pointer', fontSize: '18px', lineHeight: 1, flexShrink: 0 }}>×</button>
                </div>
                <div style={{ background: 'rgba(124,111,255,0.08)', border: '1px solid rgba(124,111,255,0.2)', borderRadius: '10px', padding: '10px 14px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '18px' }}>🏛️</span>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: T.purple, letterSpacing: '0.06em' }}>RATAN TATA INNOVATION HUB</div>
                    <div style={{ fontSize: '11px', color: T.textMuted }}>TRL5 · Under Approval Phase</div>
                  </div>
                </div>
                <form onSubmit={handleRegSubmit}>
                  {[{ label: 'FULL NAME', key: 'name', type: 'text', placeholder: 'Your full name' },
                    { label: 'GMAIL ADDRESS', key: 'email', type: 'email', placeholder: 'you@gmail.com' }].map(({ label, key, type, placeholder }) => (
                    <div key={key} style={{ marginBottom: '14px' }}>
                      <label style={{ fontSize: '11px', color: T.textSub, fontWeight: 600, display: 'block', marginBottom: '6px', letterSpacing: '0.06em' }}>{label}</label>
                      <input value={regForm[key]} onChange={e => setRegForm({ ...regForm, [key]: e.target.value })}
                        type={type} placeholder={placeholder} required
                        style={{ width: '100%', background: T.bgInput, border: `1px solid ${T.borderInput}`, borderRadius: '10px', padding: '11px 14px', color: T.text, fontSize: '14px', transition: 'border 0.2s' }} />
                    </div>
                  ))}
                  <div style={{ marginBottom: '22px' }}>
                    <label style={{ fontSize: '11px', color: T.textSub, fontWeight: 600, display: 'block', marginBottom: '6px', letterSpacing: '0.06em' }}>BUSINESS TYPE</label>
                    <select value={regForm.business} onChange={e => setRegForm({ ...regForm, business: e.target.value })} required
                      style={{ width: '100%', background: T.bgModal, border: `1px solid ${T.borderInput}`, borderRadius: '10px', padding: '11px 14px', color: regForm.business ? T.text : T.textMuted, fontSize: '14px', cursor: 'pointer', transition: 'border 0.2s' }}>
                      <option value="">Select your business type</option>
                      <option value="kirana">Kirana / General Store</option>
                      <option value="grocery">Grocery Store</option>
                      <option value="pharmacy">Pharmacy</option>
                      <option value="electronics">Electronics Shop</option>
                      <option value="restaurant">Restaurant / Tiffin Center</option>
                      <option value="textile">Textile / Clothing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button type="submit" className="cta-btn"
                    style={{ width: '100%', background: `linear-gradient(135deg,${T.green},${T.greenDark})`, color: '#070A0E', border: 'none', borderRadius: '12px', padding: '13px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
                    Register as Vendor →
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '12px', color: T.textMuted, marginTop: '14px' }}>
                    Already have an account? <Link href="/login" style={{ color: T.green }}>Sign in</Link>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 5%', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrolled ? T.bgNav : 'transparent', backdropFilter: scrolled ? 'blur(16px)' : 'none', borderBottom: scrolled ? `1px solid ${T.borderNav}` : 'none', transition: 'all 0.4s ease' }}>

        {/* LEFT: Logo only */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: `linear-gradient(135deg,${T.green},${T.greenDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '15px', color: '#070A0E' }}>A</div>
          <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', color: T.text }}>Kirana <span style={{ color: T.greenNav }}>Edge</span></span>
        </div>

        {/* CENTER: Nav links WITH Products dropdown inline */}
        <div className="nav-links" ref={dropdownRef}>
          {/* Products — same style as other links */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowProducts(!showProducts)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '14px', color: showProducts ? T.greenNav : T.navText, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '3px', transition: 'color 0.2s' }}>
              Products <span style={{ fontSize: '9px' }}>{showProducts ? '▲' : '▾'}</span>
            </button>
            {showProducts && (
              <div style={{ position: 'absolute', top: 'calc(100% + 14px)', left: '50%', transform: 'translateX(-50%)', background: T.bgDropdown, border: `1px solid ${T.border}`, borderRadius: '16px', padding: '10px', width: '300px', zIndex: 200, boxShadow: T.shadow }}>
                <p style={{ fontSize: '9px', color: T.textMuted, fontWeight: 700, padding: '4px 12px 8px', letterSpacing: '0.12em' }}>PRODUCTS BY KIRANA EDGE</p>
                {PRODUCTS.map((p, i) => (
                  <div key={i} className="prod-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', marginBottom: '2px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: `${p.color}15`, border: `1px solid ${p.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{p.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: T.text }}>{p.name}</span>
                        <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '20px', background: `${p.color}18`, color: p.color }}>{p.tag}</span>
                      </div>
                      <p style={{ fontSize: '11px', color: T.textMuted, lineHeight: 1.4 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Other nav links — same style */}
          {['Features', 'How It Works', 'Market', 'Team', 'Developers'].map(l => (
            <a key={l} className="nav-item" href={`#${l.toLowerCase().replace(/ /g, '-')}`}
              style={{ fontSize: '14px', color: T.navText, fontWeight: 500 }}>{l}</a>
          ))}
        </div>

        {/* RIGHT: theme + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button onClick={toggleTheme} className="theme-btn"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{ width: '36px', height: '36px', borderRadius: '9px', background: T.bgSkill, border: `1px solid ${T.border}`, cursor: 'pointer', fontSize: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isDark ? '☀️' : '🌙'}
          </button>
          <button onClick={() => setShowRegModal(true)} className="cta-btn"
            style={{ background: `${T.greenNav}18`, color: T.greenNav, border: `1px solid ${T.greenNav}50`, borderRadius: '9px', padding: '8px 16px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
            Register
          </button>
          <Link href="/login">
            <button className="cta-btn" style={{ background: `linear-gradient(135deg,${T.green},${T.greenDark})`, color: '#070A0E', border: 'none', borderRadius: '9px', padding: '8px 18px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Sign In →</button>
          </Link>
          <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)}
            style={{ background: T.bgSkill, border: `1px solid ${T.border}`, borderRadius: '8px', padding: '7px 10px', color: T.text, cursor: 'pointer', fontSize: '18px', display: 'none', alignItems: 'center', justifyContent: 'center' }}>
            {mobileMenu ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* ── MOBILE NAV ── */}
      <div className={`mobile-nav ${mobileMenu ? 'open' : ''}`}>

        {/* Products expandable */}
        <div>
          <button onClick={() => setMobileProducts(!mobileProducts)}
            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontSize: '15px', color: T.text, fontWeight: 600 }}>Products</span>
            <span style={{ fontSize: '12px', color: T.textMuted }}>{mobileProducts ? '▲' : '▾'}</span>
          </button>
          {mobileProducts && (
            <div style={{ padding: '8px 0 4px' }}>
              {PRODUCTS.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 8px', borderRadius: '10px', marginBottom: '4px', background: T.bgCard }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: `${p.color}15`, border: `1px solid ${p.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{p.icon}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: T.text }}>{p.name}</span>
                      <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '20px', background: `${p.color}18`, color: p.color }}>{p.tag}</span>
                    </div>
                    <p style={{ fontSize: '11px', color: T.textMuted }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nav links */}
        {['Features', 'How It Works', 'Market', 'Team', 'Developers'].map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`}
            onClick={() => setMobileMenu(false)}
            style={{ fontSize: '15px', color: T.text, fontWeight: 500, padding: '10px 0', borderBottom: `1px solid ${T.border}`, display: 'block' }}>
            {l}
          </a>
        ))}

        {/* Bottom actions */}
        <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={toggleTheme}
              style={{ width: '44px', height: '44px', borderRadius: '10px', background: T.bgSkill, border: `1px solid ${T.border}`, cursor: 'pointer', fontSize: '20px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isDark ? '☀️' : '🌙'}
            </button>
            <button onClick={() => { setMobileMenu(false); setShowRegModal(true) }}
              style={{ flex: 1, background: `${T.greenNav}14`, color: T.greenNav, border: `1px solid ${T.greenNav}30`, borderRadius: '10px', padding: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
              Register
            </button>
          </div>
          <Link href="/login" onClick={() => setMobileMenu(false)}>
            <button style={{ width: '100%', background: `linear-gradient(135deg,${T.green},${T.greenDark})`, color: '#070A0E', border: 'none', borderRadius: '10px', padding: '13px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
              Sign In →
            </button>
          </Link>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: 'clamp(100px,12vw,130px) 5% 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,255,148,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div className="hero-grid">
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px', alignItems: 'center' }}>
                <div className="float" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,255,148,0.08)', border: '1px solid rgba(0,255,148,0.2)', borderRadius: '30px', padding: '5px 12px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: T.green, flexShrink: 0 }} />
                  <span style={{ fontSize: '11px', color: T.green, fontWeight: 500 }}>Now in Pilot — 5 Local Stores</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(124,111,255,0.08)', border: '1px solid rgba(124,111,255,0.2)', borderRadius: '30px', padding: '5px 12px' }}>
                  <span style={{ fontSize: '10px' }}>🏛️</span>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: T.purple }}>Ratan Tata Hub · TRL5</span>
                </div>
              </div>
              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '20px', color: T.text }}>
                The Offline-First<br />
                <span style={{ color: T.greenNav, fontStyle: 'italic' }}>Digital Store</span><br />
                for India's Kiranas
              </h1>
              <p style={{ fontSize: 'clamp(14px,2vw,17px)', color: T.textMuted, lineHeight: 1.7, marginBottom: '28px', maxWidth: '480px' }}>
                Kirana Edge brings powerful retail management to Tier-2 & Tier-3 cities — running entirely on a local network. No internet required, ever.
              </p>
              <div className="hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <button onClick={() => setShowRegModal(true)} className="cta-btn"
                  style={{ background: `linear-gradient(135deg,${T.green},${T.greenDark})`, color: '#070A0E', border: 'none', borderRadius: '12px', padding: '14px 26px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', boxShadow: '0 0 40px rgba(0,255,148,0.2)' }}>
                  Get Started Free
                </button>
                <a href="#how-it-works">
                  <button style={{ background: T.bgSkill, color: T.text, border: `1px solid ${T.border}`, borderRadius: '12px', padding: '14px 24px', fontWeight: 500, fontSize: '15px', cursor: 'pointer' }}>How It Works ↓</button>
                </a>
              </div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {[['📶','Works offline'],['🏪','Built for Kiranas'],['🤖','AI-powered']].map(([icon,text]) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px' }}>{icon}</span>
                    <span style={{ fontSize: '12px', color: T.textMuted }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Mockup */}
            <div className="hero-mockup" style={{ position: 'relative' }}>
              <div style={{ background: T.bgCard2, border: `1px solid rgba(0,255,148,0.15)`, borderRadius: '20px', padding: '20px', boxShadow: T.shadow }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontWeight: 700, color: T.green, fontSize: '13px' }}>Kirana Edge</span>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />)}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px', marginBottom: '14px' }}>
                  {[['Products','124','#00FF94'],['Orders','38','#FFB800'],['Customers','56','#7C6FFF'],['Low Stock','7','#FF6B6B']].map(([l,v,c]) => (
                    <div key={l} style={{ background: `${c}12`, border: `1px solid ${c}22`, borderRadius: '10px', padding: '10px' }}>
                      <div style={{ fontSize: '10px', color: T.textMuted, marginBottom: '4px' }}>{l}</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: c }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: '10px', padding: '10px' }}>
                  {[['Order #1042 placed','#00FF94'],['Low stock: Red Chilli','#FF6B6B'],['New customer registered','#FFB800']].map(([t,c]) => (
                    <div key={t} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '7px' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: c, flexShrink: 0 }} />
                      <span style={{ fontSize: '11px', color: T.textSub }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.3)', borderRadius: '12px', padding: '10px 16px', marginTop: '16px' }}>
                <span style={{ fontSize: '16px' }}>📡</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: T.yellow }}>Offline Ready</div>
                  <div style={{ fontSize: '9px', color: T.textMuted }}>Works without internet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, background: 'rgba(0,255,148,0.02)', padding: '32px 5%' }}>
        <div className="stats-bar" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {[{ value: '$800BN', label: 'Indian Retail Market' },{ value: '12M+', label: 'Kirana Stores' },{ value: '90%', label: 'Unorganized Retail' }].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '16px 10px', borderRight: i < 2 ? `1px solid ${T.border}` : 'none' }}>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(24px,5vw,40px)', color: T.green, marginBottom: '4px' }}>{s.value}</div>
              <div style={{ fontSize: 'clamp(11px,2vw,14px)', color: T.textSub }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: 'clamp(60px,8vw,100px) 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,5vw,44px)', fontWeight: 400, marginBottom: '14px', color: T.text }}>
              Everything your store needs,<br /><span style={{ fontStyle: 'italic', color: T.green }}>without the internet</span>
            </h2>
            <p style={{ color: T.textMuted, fontSize: '15px', maxWidth: '420px', margin: '0 auto' }}>Purpose-built for Indian Kirana stores in areas with unreliable connectivity.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feat-card" style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: '16px', padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span style={{ fontSize: '28px' }}>{f.icon}</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 9px', borderRadius: '20px', background: `${f.color}15`, color: f.color }}>{f.tag}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '15px', color: T.text, marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ fontSize: '13px', color: T.textMuted, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDGE AI ── */}
      <section id="edge-ai" style={{ padding: 'clamp(60px,8vw,100px) 5%', background: isDark ? 'rgba(124,111,255,0.03)' : 'rgba(124,111,255,0.04)', borderTop: '1px solid rgba(124,111,255,0.1)', borderBottom: '1px solid rgba(124,111,255,0.1)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124,111,255,0.1)', border: '1px solid rgba(124,111,255,0.25)', borderRadius: '30px', padding: '6px 16px', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', color: T.purple, fontWeight: 700 }}>⚡ EDGE COMPUTING AI</span>
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,5vw,44px)', fontWeight: 400, marginBottom: '14px', color: T.text }}>
              AI that runs <span style={{ fontStyle: 'italic', color: T.purple }}>on your device</span>
            </h2>
            <p style={{ color: T.textMuted, fontSize: '15px', maxWidth: '480px', margin: '0 auto' }}>Local-First architecture — faster processing, zero cloud dependency, intelligent AI-driven features.</p>
          </div>
          <div className="edge-grid">
            {[
              { icon: '🧠', title: 'On-Device Inference', desc: 'Quantized AI models run directly on Raspberry Pi. No API calls, no latency, no data leaks.', color: T.purple },
              { icon: '⚡', title: 'Faster Processing', desc: 'Edge computing reduces response time to milliseconds — decisions happen locally, instantly.', color: T.yellow },
              { icon: '🔒', title: 'Private by Default', desc: 'Your store data never leaves your network. Full privacy with zero cloud exposure.', color: T.green },
              { icon: '📷', title: 'OCR & Vision AI', desc: 'Camera-based receipt scanning and product recognition — runs fully offline on-device.', color: T.red },
              { icon: '📈', title: 'Smart Recommendations', desc: 'AI learns your store patterns locally and suggests restocking, pricing, and promotions.', color: T.purple },
              { icon: '🌐', title: 'Sync When Online', desc: 'Optional cloud sync when internet is available — seamless, non-blocking background updates.', color: T.green },
            ].map((item, i) => (
              <div key={i} className="feat-card" style={{ background: T.bgCard, border: `1px solid ${item.color}20`, borderRadius: '16px', padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '28px' }}>{item.icon}</span>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '14px', color: T.text, marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: T.textMuted, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: 'clamp(60px,8vw,100px) 5%', background: 'rgba(0,255,148,0.02)', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,5vw,44px)', fontWeight: 400, color: T.text }}>
              Up and running in <span style={{ fontStyle: 'italic', color: T.yellow }}>30 minutes</span>
            </h2>
          </div>
          <div className="steps-grid">
            {[
              { num: '01', title: 'Install the Edge Unit', desc: 'A Raspberry Pi 5 device is set up in your store in under 30 minutes.' },
              { num: '02', title: 'Connect Your Shop', desc: 'All devices in store connect to the local network — no SIM, no broadband needed.' },
              { num: '03', title: 'Go Live Instantly', desc: 'Start managing products, serving customers, and tracking sales from day one.' },
            ].map((s, i) => (
              <div key={i} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: '16px', padding: '26px 22px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Serif Display, serif', fontSize: '18px', color: T.yellow, marginBottom: '16px' }}>{s.num}</div>
                <h3 style={{ fontWeight: 700, fontSize: '16px', color: T.text, marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: T.textMuted, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKET ── */}
      <section id="market" style={{ padding: 'clamp(60px,8vw,100px) 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="market-grid">
            <div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(26px,4vw,42px)', fontWeight: 400, marginBottom: '16px', color: T.text }}>
                Cloud solutions fail.<br /><span style={{ fontStyle: 'italic', color: T.purple }}>We don't.</span>
              </h2>
              <p style={{ fontSize: '14px', color: T.textMuted, lineHeight: 1.7, marginBottom: '24px' }}>
                Every cloud-based platform fails the moment internet drops. Kirana Edge runs on Local LAN — your store keeps running no matter what.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: '12px', padding: '12px 16px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: T.textSub }}>Cloud-based platforms</span>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: T.textMuted }}>Monthly SaaS fee</span>
                    <span style={{ fontSize: '16px' }}>❌</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.bgGreenCard, border: '1px solid rgba(0,255,148,0.2)', borderRadius: '12px', padding: '12px 16px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: T.green }}>Kirana Edge</span>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: T.textMuted }}>₹19,800 one-time</span>
                    <span style={{ fontSize: '16px' }}>✅</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ background: T.bgCard2, border: `1px solid ${T.border}`, borderRadius: '20px', padding: '28px', boxShadow: T.shadow }}>
              <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '14px' }}>🖥️</div>
              <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: T.text, marginBottom: '16px', textAlign: 'center' }}>Edge Unit Hardware</h3>
              {[['Raspberry Pi 5 (8GB)','₹11,600'],['TP-Link Router','₹2,500'],['Power & Storage','₹3,200'],['Case & Battery','₹2,500']].map(([item,cost]) => (
                <div key={item} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 12px', background: T.bgCard, borderRadius: '8px', border: `1px solid ${T.border}`, marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: T.textSub }}>{item}</span>
                  <span style={{ fontSize: '13px', color: T.text, fontWeight: 600 }}>{cost}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 12px', background: 'rgba(0,255,148,0.08)', borderRadius: '8px', border: '1px solid rgba(0,255,148,0.2)', marginTop: '4px' }}>
                <span style={{ fontSize: '13px', color: T.green, fontWeight: 700 }}>TOTAL PER UNIT</span>
                <span style={{ fontSize: '13px', color: T.green, fontWeight: 800 }}>₹19,800</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" style={{ padding: 'clamp(60px,8vw,100px) 5%', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,5vw,44px)', fontWeight: 400, color: T.text }}>
              Built by <span style={{ fontStyle: 'italic', color: T.red }}>Executors</span>
            </h2>
          </div>
          <div className="team-grid">
            {TEAM.map((t, i) => (
              <div key={i} className="team-card" style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: '20px', padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: `linear-gradient(135deg,${t.color},${t.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: '#070A0E', flexShrink: 0 }}>{t.initial}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: T.text }}>{t.name}</div>
                    <div style={{ fontSize: '13px', color: t.color, fontWeight: 500 }}>{t.role}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  {t.skills.map(s => <span key={s} style={{ background: T.bgSkill, border: `1px solid ${T.borderSkill}`, borderRadius: '20px', padding: '3px 10px', fontSize: '11px', color: T.textSub }}>{s}</span>)}
                </div>
                <p style={{ fontSize: '13px', color: T.textMuted, lineHeight: 1.6 }}>🏆 {t.achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVELOPERS ── */}
      <section id="developers" style={{ padding: 'clamp(60px,8vw,100px) 5%', background: 'rgba(0,255,148,0.02)', borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,255,148,0.08)', border: '1px solid rgba(0,255,148,0.2)', borderRadius: '30px', padding: '6px 16px', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', color: T.green, fontWeight: 700 }}>💻 DEVELOPMENT TEAM</span>
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px,5vw,44px)', fontWeight: 400, color: T.text }}>
              The <span style={{ fontStyle: 'italic', color: T.green }}>Developers</span>
            </h2>
            <p style={{ color: T.textMuted, fontSize: '15px', marginTop: '12px' }}>Engineering the future of offline-first retail in India</p>
          </div>
          <div className="dev-grid">
            {DEVELOPERS.map((d, i) => (
              <div key={i} className="team-card" style={{ background: T.bgCard, border: `1px solid ${d.color}22`, borderRadius: '20px', padding: '32px', textAlign: 'center' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: `linear-gradient(135deg,${d.color},${d.color}66)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: '#070A0E', margin: '0 auto 18px', boxShadow: `0 0 24px ${d.color}30`, letterSpacing: '-1px' }}>{d.initial}</div>
                <div style={{ fontWeight: 700, fontSize: '18px', color: T.text, marginBottom: '4px' }}>{d.name}</div>
                <div style={{ fontSize: '13px', color: d.color, fontWeight: 500, marginBottom: '18px' }}>{d.role}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                  {d.skills.map(s => <span key={s} style={{ background: `${d.color}10`, border: `1px solid ${d.color}25`, borderRadius: '20px', padding: '4px 12px', fontSize: '11px', color: d.color }}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px', padding: '16px 24px', background: 'rgba(124,111,255,0.06)', border: '1px solid rgba(124,111,255,0.15)', borderRadius: '14px', maxWidth: '520px', margin: '32px auto 0' }}>
            <p style={{ fontSize: '13px', color: T.textSub }}>🏛️ Proposed at <span style={{ color: T.purple, fontWeight: 600 }}>Ratan Tata Hub Innovation Center</span></p>
            <p style={{ fontSize: '13px', color: T.textSub, marginTop: '4px' }}>TRL <span style={{ color: T.green, fontWeight: 700 }}>Level 5</span> · Status: <span style={{ color: T.yellow, fontWeight: 600 }}>Under Approval</span></p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 5%' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(135deg,rgba(0,255,148,0.08),rgba(0,255,148,0.02))', border: '1px solid rgba(0,255,148,0.15)', borderRadius: '24px', padding: 'clamp(36px,6vw,64px) clamp(24px,5vw,48px)', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(26px,5vw,44px)', fontWeight: 400, marginBottom: '14px', color: T.text }}>
              Ready to modernize<br /><span style={{ fontStyle: 'italic', color: T.green }}>your Kirana store?</span>
            </h2>
            <p style={{ fontSize: '15px', color: T.textMuted, maxWidth: '420px', margin: '0 auto 32px' }}>Join the pilot program. Deploying in 5 local stores — looking for forward-thinking vendors.</p>
            <div className="cta-btns" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setShowRegModal(true)} className="cta-btn"
                style={{ background: `linear-gradient(135deg,${T.green},${T.greenDark})`, color: '#070A0E', border: 'none', borderRadius: '12px', padding: '14px 28px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
                Get Started →
              </button>
              <a href="mailto:venkatachaitanyakarnam@gmail.com">
                <button style={{ background: T.bgSkill, color: T.text, border: `1px solid ${T.border}`, borderRadius: '12px', padding: '14px 24px', fontWeight: 500, fontSize: '15px', cursor: 'pointer' }}>Contact Founders</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${T.border}`, padding: '32px 5%' }}>
        <div className="footer-inner" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: `linear-gradient(135deg,${T.green},${T.greenDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', color: '#070A0E' }}>A</div>
            <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '16px', color: T.text }}>Kirana Edge</span>
            <span style={{ fontSize: '10px', color: T.textMuted, marginLeft: '4px' }}>· A product of Agent Seva</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '13px', color: T.textMuted }}>📞 9491803089</span>
            <span style={{ fontSize: '13px', color: T.textMuted }}>✉️ venkatachaitanyakarnam@gmail.com</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={toggleTheme} className="theme-btn"
              style={{ background: T.bgSkill, border: `1px solid ${T.border}`, borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontSize: '14px', color: T.textSub, display: 'flex', alignItems: 'center', gap: '6px' }}>
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
            <span style={{ fontSize: '12px', color: T.textMuted }}>© 2025 Kirana Edge 🇮🇳</span>
          </div>
        </div>
      </footer>
    </div>
  )
}