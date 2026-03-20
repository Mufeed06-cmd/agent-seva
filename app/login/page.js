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
      if (!res.ok) { setError(data.message || 'Login failed'); setLoading(false); return }
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
    <div style={{ fontFamily: "'Sora', sans-serif", minHeight: '100vh', background: '#080B10', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');`}</style>

      {/* Background glow blobs */}
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,148,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,111,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Card */}
      <div style={{ width: '420px', background: 'rgba(12,17,16,0.9)', border: '1px solid rgba(0,255,148,0.12)', borderRadius: '24px', padding: '40px', backdropFilter: 'blur(20px)', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #00FF94, #00C96E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 800, color: '#080B10' }}>A</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '18px', color: '#fff', letterSpacing: '-0.5px' }}>Agent Seva</div>
            <div style={{ fontSize: '12px', color: '#00FF94', opacity: 0.7 }}>Local Vendor Platform</div>
          </div>
        </div>

        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: '6px' }}>Welcome back 👋</h1>
        <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '28px' }}>Sign in to manage your store or platform</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Email Address</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 16px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s' }}
              onFocus={e => e.target.style.borderColor = 'rgba(0,255,148,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Password</label>
            <input
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 16px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s' }}
              onFocus={e => e.target.style.borderColor = 'rgba(0,255,148,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          {error && (
            <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.2)', borderRadius: '10px', padding: '10px 14px', color: '#FF6B6B', fontSize: '13px' }}>
              ⚠️ {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            background: loading ? 'rgba(0,255,148,0.4)' : 'linear-gradient(135deg, #00FF94, #00C96E)',
            color: '#080B10', border: 'none', borderRadius: '12px', padding: '14px',
            fontWeight: 700, fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit', marginTop: '4px', transition: 'opacity 0.2s'
          }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        {/* Role hint */}
        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { role: 'Admin', desc: 'Full platform access', color: '#7C6FFF', icon: '🛡️' },
            { role: 'Vendor', desc: 'Manage your store', color: '#00FF94', icon: '🏪' }
          ].map((r, i) => (
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