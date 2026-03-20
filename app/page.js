'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = ['Features', 'How It Works', 'Market', 'Team', 'Contact']

const FEATURES = [
  {
    icon: '📡',
    title: 'True Offline-First',
    desc: 'Runs entirely on Local LAN via Raspberry Pi. No internet? No problem. Your store never stops.',
    tag: 'Core',
    color: '#00FF94',
  },
  {
    icon: '📦',
    title: 'Vendor Dashboard',
    desc: 'Manage products, track inventory, view analytics — all from a sleek local web interface.',
    tag: 'Vendors',
    color: '#FFB800',
  },
  {
    icon: '🛒',
    title: 'Scan & Go',
    desc: 'Customers connect to your store\'s captive portal and add items themselves. Zero friction checkout.',
    tag: 'Customers',
    color: '#FF6B6B',
  },
  {
    icon: '🔍',
    title: 'OCR Receipt Scanner',
    desc: 'Point a camera at any receipt and our AI auto-fills the shopping cart instantly.',
    tag: 'AI',
    color: '#7C6FFF',
  },
  {
    icon: '📊',
    title: 'Local Analytics',
    desc: 'Sales trends, revenue insights, low-stock alerts — processed on-device, private by default.',
    tag: 'Insights',
    color: '#00FF94',
  },
  {
    icon: '⚡',
    title: 'Edge AI Models',
    desc: 'On-device quantized AI models for smart recommendations — no cloud bill, ever.',
    tag: 'Upcoming',
    color: '#FFB800',
  },
]

const STEPS = [
  { num: '01', title: 'Install the Edge Unit', desc: 'A Raspberry Pi 5 device is set up in your store in under 30 minutes.' },
  { num: '02', title: 'Connect Your Shop', desc: 'All devices in store connect to the local network — no SIM, no broadband needed.' },
  { num: '03', title: 'Go Live Instantly', desc: 'Start managing products, serving customers, and tracking sales from day one.' },
]

const STATS = [
  { value: '$800BN', label: 'Indian Retail Market', sub: 'Total addressable' },
  { value: '12M+', label: 'Kirana Stores', sub: 'In Tier 2 & 3 cities' },
  { value: '90%', label: 'Unorganized Retail', sub: 'Need modernization' },
  { value: '₹19,800', label: 'Per Unit Cost', sub: 'One-time hardware' },
]

const TEAM = [
  {
    name: 'K.V. Chaitanya',
    role: 'Founder',
    skills: ['UI/UX', 'React', 'SQL', 'Networking'],
    initial: 'C',
    color: '#FFB800',
    achievement: 'Built & scaled club event management platform',
  },
  {
    name: 'Murali Aggipothu',
    role: 'Lead Developer',
    skills: ['Next.js', 'Node.js', 'DevOps', 'MongoDB'],
    initial: 'M',
    color: '#00FF94',
    achievement: 'Built bot serving 2.4k+ active student users',
  },
]

export default function Landing() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState({})
  const sectionRefs = useRef({})

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.id]: true }))
      }),
      { threshold: 0.12 }
    )
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const ref = (id) => (el) => { sectionRefs.current[id] = el }

  return (
    <div style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif", background: '#070A0E', color: '#fff', overflowX: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1a2a1a; border-radius: 4px; }

        .fade-up {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-up.d1 { transition-delay: 0.1s; }
        .fade-up.d2 { transition-delay: 0.2s; }
        .fade-up.d3 { transition-delay: 0.3s; }
        .fade-up.d4 { transition-delay: 0.4s; }
        .fade-up.d5 { transition-delay: 0.5s; }
        .fade-up.d6 { transition-delay: 0.6s; }

        .feat-card:hover {
          border-color: rgba(0,255,148,0.25) !important;
          transform: translateY(-4px);
          background: rgba(255,255,255,0.04) !important;
        }
        .feat-card { transition: all 0.3s ease; }

        .step-card:hover { border-color: rgba(255,184,0,0.3) !important; }
        .step-card { transition: border-color 0.3s; }

        .team-card:hover { transform: translateY(-6px); }
        .team-card { transition: transform 0.3s ease; }

        .cta-btn:hover { transform: scale(1.04); box-shadow: 0 0 30px rgba(0,255,148,0.35) !important; }
        .cta-btn { transition: all 0.25s ease; }

        .nav-link:hover { color: #00FF94 !important; }
        .nav-link { transition: color 0.2s; }

        .grid-bg {
          background-image: linear-gradient(rgba(0,255,148,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,255,148,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .hero-badge { animation: float 4s ease-in-out infinite; }
        .glow-orb { animation: glow-pulse 3s ease-in-out infinite; }

        .skill-tag {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 4px 10px;
          font-size: 11px;
          color: #9CA3AF;
          font-family: 'DM Sans', sans-serif;
        }

        section { scroll-margin-top: 80px; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 5%',
        height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(7,10,14,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #00FF94, #00C96E)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: '16px', color: '#070A0E',
            fontFamily: 'DM Sans, sans-serif'
          }}>A</div>
          <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', fontWeight: 400, letterSpacing: '-0.3px' }}>
            Agent <span style={{ color: '#00FF94' }}>Seva</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '32px' }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="nav-link"
              style={{ fontSize: '14px', color: '#9CA3AF', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>
              {l}
            </a>
          ))}
        </div>

        <Link href="/login">
          <button className="cta-btn" style={{
            background: 'linear-gradient(135deg, #00FF94, #00C96E)',
            color: '#070A0E', border: 'none', borderRadius: '10px',
            padding: '9px 20px', fontWeight: 700, fontSize: '13px',
            cursor: 'pointer', fontFamily: 'DM Sans, sans-serif'
          }}>Sign In →</button>
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section id="features" className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 5% 80px', position: 'relative', overflow: 'hidden' }}>

        {/* Glow orbs */}
        <div className="glow-orb" style={{ position: 'absolute', top: '10%', left: '20%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,148,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="glow-orb" style={{ position: 'absolute', bottom: '0%', right: '5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,184,0,0.05) 0%, transparent 70%)', pointerEvents: 'none', animationDelay: '1.5s' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

          {/* Left */}
          <div>
            <div className="hero-badge" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(0,255,148,0.08)', border: '1px solid rgba(0,255,148,0.2)',
              borderRadius: '30px', padding: '6px 16px', marginBottom: '28px'
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00FF94' }} />
              <span style={{ fontSize: '13px', color: '#00FF94', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>Now in Pilot — 5 Local Stores</span>
            </div>

            <h1 style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-1px',
              marginBottom: '24px',
              color: '#fff'
            }}>
              The Offline-First<br />
              <span style={{ color: '#00FF94', fontStyle: 'italic' }}>Digital Store</span><br />
              for India's Kiranas
            </h1>

            <p style={{ fontSize: '17px', color: '#6B7280', lineHeight: 1.7, marginBottom: '36px', maxWidth: '460px', fontFamily: 'DM Sans, sans-serif', fontWeight: 400 }}>
              Agent Seva brings powerful retail management to Tier-2 & Tier-3 cities — running entirely on a local network. No internet required, ever.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/login">
                <button className="cta-btn" style={{
                  background: 'linear-gradient(135deg, #00FF94, #00C96E)',
                  color: '#070A0E', border: 'none', borderRadius: '12px',
                  padding: '14px 28px', fontWeight: 700, fontSize: '15px',
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                  boxShadow: '0 0 40px rgba(0,255,148,0.2)'
                }}>Get Started Free</button>
              </Link>
              <a href="#how-it-works" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'rgba(255,255,255,0.05)', color: '#fff',
                  border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px',
                  padding: '14px 28px', fontWeight: 500, fontSize: '15px',
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif'
                }}>See How It Works ↓</button>
              </a>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: '24px', marginTop: '40px', flexWrap: 'wrap' }}>
              {[
                { icon: '🔌', text: 'Works without internet' },
                { icon: '🏪', text: 'Built for Kiranas' },
                { icon: '🤖', text: 'AI-powered' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>{b.icon}</span>
                  <span style={{ fontSize: '13px', color: '#6B7280', fontFamily: 'DM Sans, sans-serif' }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual Dashboard Mockup */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: 'rgba(12,17,16,0.9)',
              border: '1px solid rgba(0,255,148,0.15)',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,255,148,0.05)',
            }}>
              {/* Mock navbar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, color: '#00FF94', fontSize: '14px' }}>Agent Seva</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
                </div>
              </div>
              {/* Mock stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '16px' }}>
                {[
                  { l: 'Products', v: '124', c: '#00FF94' },
                  { l: 'Orders', v: '38', c: '#FFB800' },
                  { l: 'Revenue', v: '₹4,200', c: '#FF6B6B' },
                  { l: 'Low Stock', v: '7', c: '#7C6FFF' },
                ].map((s, i) => (
                  <div key={i} style={{ background: `${s.c}10`, border: `1px solid ${s.c}22`, borderRadius: '10px', padding: '12px' }}>
                    <div style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'DM Sans, sans-serif', marginBottom: '4px' }}>{s.l}</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: s.c, fontFamily: 'DM Sans, sans-serif' }}>{s.v}</div>
                  </div>
                ))}
              </div>
              {/* Mock activity */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px' }}>
                <div style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'DM Sans, sans-serif', marginBottom: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recent Activity</div>
                {[
                  { t: 'Order #1042 placed', c: '#00FF94' },
                  { t: 'Low stock: Red Chilli', c: '#FF6B6B' },
                  { t: 'Payment ₹3,400 received', c: '#FFB800' },
                ].map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: a.c, flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: '#9CA3AF', fontFamily: 'DM Sans, sans-serif' }}>{a.t}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating badge */}
            <div style={{
              position: 'absolute', bottom: '-20px', left: '-20px',
              background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.3)',
              borderRadius: '14px', padding: '12px 16px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '20px', marginBottom: '2px' }}>📡</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#FFB800', fontFamily: 'DM Sans, sans-serif' }}>Offline Ready</div>
              <div style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'DM Sans, sans-serif' }}>No internet needed</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS MARQUEE ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,255,148,0.03)', padding: '40px 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '0 20px',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none'
            }}>
              <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '42px', color: '#00FF94', marginBottom: '4px' }}>{s.value}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', fontFamily: 'DM Sans, sans-serif', marginBottom: '2px' }}>{s.label}</div>
              <div style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'DM Sans, sans-serif' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            ref={ref('features')} data-id="features"
            className={`fade-up ${visible['features'] ? 'visible' : ''}`}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <div style={{ display: 'inline-block', background: 'rgba(0,255,148,0.08)', border: '1px solid rgba(0,255,148,0.18)', borderRadius: '20px', padding: '5px 14px', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', color: '#00FF94', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Features</span>
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-0.5px', marginBottom: '16px' }}>
              Everything your store needs,<br />
              <span style={{ fontStyle: 'italic', color: '#00FF94' }}>without the internet</span>
            </h2>
            <p style={{ fontSize: '16px', color: '#6B7280', fontFamily: 'DM Sans, sans-serif', maxWidth: '480px', margin: '0 auto' }}>
              Purpose-built for Indian Kirana stores in areas with unreliable connectivity.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {FEATURES.map((f, i) => (
              <div
                key={i}
                ref={ref(`feat${i}`)} data-id={`feat${i}`}
                className={`feat-card fade-up d${i + 1} ${visible[`feat${i}`] ? 'visible' : ''}`}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px', padding: '28px',
                  cursor: 'default'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span style={{ fontSize: '32px' }}>{f.icon}</span>
                  <span style={{
                    fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px',
                    background: `${f.color}15`, color: f.color, fontFamily: 'DM Sans, sans-serif',
                    letterSpacing: '0.3px'
                  }}>{f.tag}</span>
                </div>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff', marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6, fontFamily: 'DM Sans, sans-serif' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: '100px 5%', background: 'rgba(0,255,148,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div ref={ref('how')} data-id="how" className={`fade-up ${visible['how'] ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(255,184,0,0.08)', border: '1px solid rgba(255,184,0,0.18)', borderRadius: '20px', padding: '5px 14px', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', color: '#FFB800', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>How It Works</span>
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-0.5px' }}>
              Up and running in<br /><span style={{ fontStyle: 'italic', color: '#FFB800' }}>under 30 minutes</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', position: 'relative' }}>
            {/* Connector line */}
            <div style={{ position: 'absolute', top: '52px', left: '16.66%', right: '16.66%', height: '1px', background: 'linear-gradient(90deg, rgba(255,184,0,0.3), rgba(255,184,0,0.1), rgba(255,184,0,0.3))', pointerEvents: 'none' }} />

            {STEPS.map((s, i) => (
              <div key={i} ref={ref(`step${i}`)} data-id={`step${i}`}
                className={`step-card fade-up d${i + 1} ${visible[`step${i}`] ? 'visible' : ''}`}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '32px 28px' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%', marginBottom: '20px',
                  background: 'rgba(255,184,0,0.1)', border: '1px solid rgba(255,184,0,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'DM Serif Display, serif', fontSize: '20px', color: '#FFB800'
                }}>{s.num}</div>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '17px', color: '#fff', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6, fontFamily: 'DM Sans, sans-serif' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKET / WHY WE WIN ── */}
      <section id="market" style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div ref={ref('mkt')} data-id="mkt" className={`fade-up ${visible['mkt'] ? 'visible' : ''}`}>
            <div style={{ display: 'inline-block', background: 'rgba(124,111,255,0.08)', border: '1px solid rgba(124,111,255,0.2)', borderRadius: '20px', padding: '5px 14px', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', color: '#7C6FFF', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Why We Win</span>
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 400, letterSpacing: '-0.5px', marginBottom: '20px' }}>
              Competitors need internet.<br />
              <span style={{ fontStyle: 'italic', color: '#7C6FFF' }}>We don't.</span>
            </h2>
            <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.7, marginBottom: '28px', fontFamily: 'DM Sans, sans-serif' }}>
              Khatabook, DotPe, and every other solution fails the moment internet drops. In Tier-2 and Tier-3 India, that's multiple times a day. Agent Seva was built from day one to work on a local LAN — your store keeps running no matter what.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Khatabook / DotPe', offline: false, cost: 'Monthly SaaS fee' },
                { label: 'Agent Seva', offline: true, cost: '₹19,800 one-time' },
              ].map((r, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: i === 1 ? 'rgba(0,255,148,0.06)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${i === 1 ? 'rgba(0,255,148,0.2)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '12px', padding: '14px 18px'
                }}>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '14px', color: i === 1 ? '#00FF94' : '#9CA3AF' }}>{r.label}</span>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'DM Sans, sans-serif' }}>{r.cost}</span>
                    <span style={{ fontSize: '18px' }}>{r.offline ? '✅' : '❌'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hardware visual */}
          <div ref={ref('hw')} data-id="hw" className={`fade-up d2 ${visible['hw'] ? 'visible' : ''}`}>
            <div style={{
              background: 'rgba(12,17,16,0.8)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px', padding: '32px', textAlign: 'center'
            }}>
              <div style={{ fontSize: '80px', marginBottom: '16px' }}>🖥️</div>
              <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: '#fff', marginBottom: '20px' }}>Edge Unit Hardware</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { item: 'Raspberry Pi 5 (8GB)', cost: '₹11,600' },
                  { item: 'TP-Link Router (Archer C6)', cost: '₹2,500' },
                  { item: 'Power, Cooling & Storage', cost: '₹3,200' },
                  { item: 'Case, Cables & Battery', cost: '₹2,500' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize: '13px', color: '#9CA3AF', fontFamily: 'DM Sans, sans-serif' }}>{r.item}</span>
                    <span style={{ fontSize: '13px', color: '#fff', fontWeight: 600, fontFamily: 'DM Sans, sans-serif' }}>{r.cost}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: 'rgba(0,255,148,0.08)', borderRadius: '10px', border: '1px solid rgba(0,255,148,0.2)', marginTop: '4px' }}>
                  <span style={{ fontSize: '14px', color: '#00FF94', fontWeight: 700, fontFamily: 'DM Sans, sans-serif' }}>TOTAL PER UNIT</span>
                  <span style={{ fontSize: '14px', color: '#00FF94', fontWeight: 800, fontFamily: 'DM Sans, sans-serif' }}>₹19,800</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" style={{ padding: '100px 5%', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div ref={ref('team')} data-id="team" className={`fade-up ${visible['team'] ? 'visible' : ''}`} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.18)', borderRadius: '20px', padding: '5px 14px', marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', color: '#FF6B6B', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Team</span>
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-0.5px' }}>
              Built by <span style={{ fontStyle: 'italic', color: '#FF6B6B' }}>Executors</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
            {TEAM.map((t, i) => (
              <div key={i} ref={ref(`team${i}`)} data-id={`team${i}`}
                className={`team-card fade-up d${i + 1} ${visible[`team${i}`] ? 'visible' : ''}`}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', fontWeight: 800, color: '#070A0E',
                    fontFamily: 'DM Serif Display, serif', flexShrink: 0
                  }}>{t.initial}</div>
                  <div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff' }}>{t.name}</div>
                    <div style={{ fontSize: '13px', color: t.color, fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>{t.role}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {t.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
                <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6, fontFamily: 'DM Sans, sans-serif' }}>
                  🏆 {t.achievement}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div ref={ref('cta')} data-id="cta" className={`fade-up ${visible['cta'] ? 'visible' : ''}`}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(0,255,148,0.08), rgba(0,255,148,0.03))',
              border: '1px solid rgba(0,255,148,0.15)', borderRadius: '24px',
              padding: '64px 48px',
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,148,0.08), transparent 70%)', pointerEvents: 'none' }} />
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-0.5px', marginBottom: '16px' }}>
                Ready to modernize<br /><span style={{ fontStyle: 'italic', color: '#00FF94' }}>your Kirana store?</span>
              </h2>
              <p style={{ fontSize: '16px', color: '#6B7280', fontFamily: 'DM Sans, sans-serif', marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px' }}>
                Join the pilot program. We're deploying in 5 local stores and looking for forward-thinking vendors.
              </p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/login">
                  <button className="cta-btn" style={{
                    background: 'linear-gradient(135deg, #00FF94, #00C96E)',
                    color: '#070A0E', border: 'none', borderRadius: '12px',
                    padding: '14px 32px', fontWeight: 700, fontSize: '15px',
                    cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                    boxShadow: '0 0 40px rgba(0,255,148,0.25)'
                  }}>Get Started →</button>
                </Link>
                <a href="mailto:venkatachaitanyakarnam@gmail.com" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'rgba(255,255,255,0.05)', color: '#fff',
                    border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px',
                    padding: '14px 28px', fontWeight: 500, fontSize: '15px',
                    cursor: 'pointer', fontFamily: 'DM Sans, sans-serif'
                  }}>Contact Founders</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg, #00FF94, #00C96E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', color: '#070A0E' }}>A</div>
            <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '17px', color: '#fff' }}>Agent Seva</span>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: '#6B7280', fontFamily: 'DM Sans, sans-serif' }}>📞 9491803089</span>
            <span style={{ fontSize: '13px', color: '#6B7280', fontFamily: 'DM Sans, sans-serif' }}>✉️ venkatachaitanyakarnam@gmail.com</span>
          </div>
          <span style={{ fontSize: '12px', color: '#374151', fontFamily: 'DM Sans, sans-serif' }}>© 2025 Agent Seva. Built in India 🇮🇳</span>
        </div>
      </footer>

    </div>
  )
}