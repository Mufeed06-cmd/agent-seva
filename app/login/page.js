'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.message || data.error || 'Login failed'); setLoading(false); return }
      localStorage.setItem('token', data.token)
      localStorage.setItem('name', data.name)
      localStorage.setItem('role', data.role)
      router.push('/dashboard')
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", minHeight: '100vh', background: '#080B10', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        input:focus { outline: none; border-color: rgba(0,255,148,0.4) !important; }
        input::placeholder { color: #4B5563; }
      `}</style>

      <div style={{ position: 'fixed', top: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,148,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,111,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '420px', background: 'rgba(12,17,16,0.9)', border: '1px solid rgba(0,255,148,0.12)', borderRadius: '24px', padding: 'clamp(24px, 5vw, 40px)', backdropFilter: 'blur(20px)', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #00FF94, #00C96E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: '#080B10', flexShrink: 0 }}>A</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '17px', color: '#fff' }}>Agent Seva</div>
            <div style={{ fontSize: '11px', color: '#00FF94', opacity: 0.8 }}>Local Vendor Platform</div>
          </div>
        </div>

        <h1 style={{ fontSize: 'clamp(20px, 5vw, 24px)', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>Welcome back 👋</h1>
        <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>Sign in to manage your store or platform</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '7px' }}>Email Address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 14px', color: '#fff', fontSize: '14px', fontFamily: 'inherit' }} />
          </div>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '7px' }}>Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 14px', color: '#fff', fontSize: '14px', fontFamily: 'inherit' }} />
          </div>

          {error && <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.2)', borderRadius: '10px', padding: '10px 14px', color: '#FF6B6B', fontSize: '13px' }}>⚠️ {error}</div>}

          <button type="submit" disabled={loading} style={{ background: loading ? 'rgba(0,255,148,0.4)' : 'linear-gradient(135deg, #00FF94, #00C96E)', color: '#080B10', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 700, fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', marginTop: '4px' }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[{ role: 'Admin', desc: 'Full platform access', color: '#7C6FFF', icon: '🛡️' }, { role: 'Vendor', desc: 'Manage your store', color: '#00FF94', icon: '🏪' }].map((r, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', marginBottom: '4px' }}>{r.icon}</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: r.color }}>{r.role}</div>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}