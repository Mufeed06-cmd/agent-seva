'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const adminStats = [
  { label: 'Total Vendors', value: '248', change: '+12 this week', icon: '🏪', color: '#00FF94', bg: 'rgba(0,255,148,0.08)' },
  { label: 'Active Orders', value: '1,340', change: '+89 today', icon: '🧾', color: '#FFB800', bg: 'rgba(255,184,0,0.08)' },
  { label: 'Platform Revenue', value: '₹2.4L', change: '+18% this month', icon: '💰', color: '#FF6B6B', bg: 'rgba(255,107,107,0.08)' },
  { label: 'New Users', value: '56', change: '+8 today', icon: '👥', color: '#7C6FFF', bg: 'rgba(124,111,255,0.08)' },
]

const vendorStats = [
  { label: 'My Products', value: '42', change: '+3 this week', icon: '📦', color: '#00FF94', bg: 'rgba(0,255,148,0.08)' },
  { label: 'Orders Today', value: '18', change: '5 pending', icon: '🧾', color: '#FFB800', bg: 'rgba(255,184,0,0.08)' },
  { label: "Today's Revenue", value: '₹4,200', change: '+₹800 vs yesterday', icon: '💸', color: '#FF6B6B', bg: 'rgba(255,107,107,0.08)' },
  { label: 'Low Stock', value: '7', change: 'Needs attention', icon: '⚠️', color: '#7C6FFF', bg: 'rgba(124,111,255,0.08)' },
]

const adminActions = [
  { title: 'Vendor Management', desc: 'Approve, suspend or manage all vendors', icon: '🏪', tag: 'Admin' },
  { title: 'User Roles', desc: 'Assign and manage platform roles', icon: '🔐', tag: 'Admin' },
  { title: 'Platform Analytics', desc: 'Full revenue and usage insights', icon: '📊', tag: 'Admin' },
  { title: 'Orders Overview', desc: 'Track all orders across vendors', icon: '🧾', tag: 'Live' },
  { title: 'Founder Details', desc: 'View and edit founder profile', icon: '👤', tag: 'Profile' },
  { title: 'AI Assistant', desc: 'AI-powered business recommendations', icon: '🤖', tag: 'Beta' },
]

const vendorActions = [
  { title: 'My Products', desc: 'Add, edit or remove your products', icon: '📦', tag: 'Store' },
  { title: 'My Orders', desc: 'Track and fulfil customer orders', icon: '🧾', tag: 'Live' },
  { title: 'Sales Analytics', desc: 'Revenue trends and insights', icon: '📊', tag: 'Insights' },
  { title: 'AI Assistant', desc: 'Get smart tips to grow your store', icon: '🤖', tag: 'Beta' },
  { title: 'Store Profile', desc: 'Update your shop details & logo', icon: '🏪', tag: 'Profile' },
  { title: 'Support', desc: 'Get help from Agent Seva team', icon: '💬', tag: 'Help' },
]

const recentActivity = [
  { text: 'New vendor Ravi Stores registered', time: '2 min ago', dot: '#00FF94' },
  { text: 'Order #1042 placed by Priya Cloth House', time: '9 min ago', dot: '#FFB800' },
  { text: 'Low stock alert: Red Chilli Powder', time: '22 min ago', dot: '#FF6B6B' },
  { text: 'Payment of ₹3,400 received', time: '1 hr ago', dot: '#7C6FFF' },
  { text: 'New user registered: Anand Textiles', time: '2 hr ago', dot: '#00FF94' },
]

export default function Dashboard() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [time, setTime] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [aiInput, setAiInput] = useState('')
  const [aiMessages, setAiMessages] = useState([
    { from: 'ai', text: 'Namaste! 🙏 I\'m your Agent Seva AI. Ask me anything about your business!' }
  ])
  const [aiLoading, setAiLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }
    setName(localStorage.getItem('name') || 'User')
    setRole(localStorage.getItem('role') || 'vendor')
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }))
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  function handleLogout() { localStorage.clear(); router.push('/login') }

  async function sendAiMessage() {
    if (!aiInput.trim()) return
    const userMsg = aiInput.trim()
    setAiInput('')
    setAiMessages(prev => [...prev, { from: 'user', text: userMsg }])
    setAiLoading(true)
    try {
      const res = await fetch('/api/ai-chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: userMsg, role, name }) })
      const data = await res.json()
      setAiMessages(prev => [...prev, { from: 'ai', text: data.reply || 'Try again!' }])
    } catch {
      setAiMessages(prev => [...prev, { from: 'ai', text: 'Something went wrong.' }])
    }
    setAiLoading(false)
  }

  const stats = role === 'admin' ? adminStats : vendorStats
  const actions = role === 'admin' ? adminActions : vendorActions
  const greeting = () => { const h = new Date().getHours(); return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening' }

  function handleAction(item) {
    if (item.title === 'AI Assistant') setAiOpen(true)
    if (item.title === 'Vendor Management') router.push('/vendor-management')
    if (item.title === 'My Products' || item.title === 'Manage Products') router.push('/products')
  }

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", background: '#080B10', minHeight: '100vh', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1e2a1e; border-radius: 4px; }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .actions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .main-layout { display: grid; grid-template-columns: 1fr 280px; gap: 20px; }
        .action-card:hover { transform: translateY(-2px); background: rgba(255,255,255,0.05) !important; }
        .action-card { transition: all 0.25s; }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .actions-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .main-layout { grid-template-columns: 1fr !important; }
          .activity-panel { display: none !important; }
          .greeting-text { font-size: 20px !important; }
          .page-padding { padding: 16px !important; }
          .nav-time { display: none !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .actions-grid { grid-template-columns: 1fr 1fr !important; }
          .stat-value { font-size: 22px !important; }
        }

        .ai-panel { position: fixed; right: 16px; bottom: 16px; width: calc(100vw - 32px); max-width: 360px; }
        @media (min-width: 480px) { .ai-panel { width: 360px; } }

        input::placeholder { color: #4B5563; }
        input:focus { outline: none; border-color: rgba(0,255,148,0.4) !important; }

        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(0,255,148,0.4)} 50%{box-shadow:0 0 0 8px rgba(0,255,148,0)} }
        .ai-pulse { animation: pulse 2s infinite; }
      `}</style>

      {/* Navbar */}
      <nav style={{ background: 'rgba(8,11,16,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 16px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg,#00FF94,#00C96E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', color: '#080B10' }}>A</div>
          <span style={{ fontWeight: 700, fontSize: '15px' }}>Agent Seva</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="nav-time" style={{ fontSize: '12px', color: '#6B7280', background: 'rgba(255,255,255,0.04)', padding: '5px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>🕐 {time}</span>
          <div style={{ background: role === 'admin' ? 'rgba(124,111,255,0.15)' : 'rgba(0,255,148,0.12)', color: role === 'admin' ? '#7C6FFF' : '#00FF94', border: `1px solid ${role === 'admin' ? 'rgba(124,111,255,0.3)' : 'rgba(0,255,148,0.3)'}`, borderRadius: '20px', padding: '4px 10px', fontSize: '11px', fontWeight: 600, textTransform: 'capitalize' }}>{role}</div>
          <button onClick={handleLogout} style={{ background: 'rgba(255,107,107,0.1)', color: '#FF6B6B', border: '1px solid rgba(255,107,107,0.2)', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '12px', fontWeight: 500, fontFamily: 'inherit' }}>Logout</button>
        </div>
      </nav>

      {/* Body */}
      <div className="page-padding" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Greeting */}
        <div style={{ background: 'linear-gradient(135deg, rgba(0,255,148,0.08), rgba(0,255,148,0.02))', border: '1px solid rgba(0,255,148,0.12)', borderRadius: '16px', padding: '20px 22px', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '60px', opacity: 0.06 }}>🏪</div>
          <div style={{ fontSize: '12px', color: '#00FF94', marginBottom: '4px', opacity: 0.8 }}>{greeting()}, {time} IST</div>
          <h1 className="greeting-text" style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>Welcome back, {name} 👋</h1>
          <p style={{ color: '#6B7280', fontSize: '13px' }}>{role === 'admin' ? 'Full administrative access enabled.' : 'Here\'s your store overview.'}</p>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: '20px' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ background: stat.bg, border: `1px solid ${stat.color}22`, borderRadius: '14px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>{stat.label}</span>
                <span style={{ fontSize: '18px' }}>{stat.icon}</span>
              </div>
              <div className="stat-value" style={{ fontSize: '26px', fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '6px' }}>{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Actions + Activity */}
        <div className="main-layout" style={{ marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Actions</div>
            <div className="actions-grid">
              {actions.map((item, i) => (
                <div key={i} className="action-card" onClick={() => handleAction(item)}
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '16px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{item.icon}</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 7px', borderRadius: '20px', background: item.tag === 'Beta' ? 'rgba(124,111,255,0.15)' : item.tag === 'Admin' ? 'rgba(255,107,107,0.12)' : 'rgba(0,255,148,0.1)', color: item.tag === 'Beta' ? '#7C6FFF' : item.tag === 'Admin' ? '#FF6B6B' : '#00FF94' }}>{item.tag}</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#fff', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontSize: '11px', color: '#6B7280', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity - hidden on mobile via CSS */}
          <div className="activity-panel">
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recent Activity</div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentActivity.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: a.dot, marginTop: '5px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#D1D5DB', lineHeight: 1.4 }}>{a.text}</div>
                    <div style={{ fontSize: '11px', color: '#4B5563', marginTop: '2px' }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Role Banner */}
        <div style={{ background: role === 'admin' ? 'rgba(124,111,255,0.08)' : 'rgba(0,255,148,0.06)', border: `1px solid ${role === 'admin' ? 'rgba(124,111,255,0.2)' : 'rgba(0,255,148,0.15)'}`, borderRadius: '14px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px', color: role === 'admin' ? '#7C6FFF' : '#00FF94', marginBottom: '4px' }}>{role === 'admin' ? '🛡️ Admin Access' : '🏪 Vendor Access'}</div>
            <div style={{ color: '#6B7280', fontSize: '12px' }}>{role === 'admin' ? 'Full platform control including user management.' : 'Manage your store, products and orders.'}</div>
          </div>
          <button className="ai-pulse" onClick={() => setAiOpen(true)} style={{ background: 'linear-gradient(135deg,#00FF94,#00C96E)', color: '#080B10', border: 'none', borderRadius: '10px', padding: '10px 18px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit' }}>🤖 Ask AI</button>
        </div>
      </div>

      {/* AI Chat Panel */}
      {aiOpen && (
        <div className="ai-panel" style={{ height: '480px', background: '#0C1110', border: '1px solid rgba(0,255,148,0.2)', borderRadius: '20px', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.6)', zIndex: 100, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', background: 'rgba(0,255,148,0.08)', borderBottom: '1px solid rgba(0,255,148,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg,#00FF94,#00C96E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>🤖</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '13px' }}>Seva AI</div>
                <div style={{ fontSize: '10px', color: '#00FF94' }}>● Online</div>
              </div>
            </div>
            <button onClick={() => setAiOpen(false)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#9CA3AF', borderRadius: '8px', padding: '5px 9px', cursor: 'pointer', fontSize: '13px' }}>✕</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {aiMessages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '80%', padding: '9px 13px', borderRadius: msg.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', background: msg.from === 'user' ? 'linear-gradient(135deg,#00FF94,#00C96E)' : 'rgba(255,255,255,0.06)', color: msg.from === 'user' ? '#080B10' : '#D1D5DB', fontSize: '13px', lineHeight: 1.5, fontWeight: msg.from === 'user' ? 500 : 400 }}>{msg.text}</div>
              </div>
            ))}
            {aiLoading && (
              <div style={{ display: 'flex', gap: '5px', padding: '9px 13px', background: 'rgba(255,255,255,0.06)', borderRadius: '14px 14px 14px 4px', width: 'fit-content' }}>
                {[0,1,2].map(i => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00FF94', animation: `bounce 1s ${i*0.2}s infinite` }} />)}
              </div>
            )}
          </div>

          <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '8px' }}>
            <input value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendAiMessage()} placeholder="Ask about your business..."
              style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '9px 12px', color: '#fff', fontSize: '13px', fontFamily: 'inherit' }} />
            <button onClick={sendAiMessage} style={{ background: 'linear-gradient(135deg,#00FF94,#00C96E)', border: 'none', borderRadius: '10px', padding: '9px 13px', cursor: 'pointer', fontSize: '16px', color: '#080B10', fontWeight: 700 }}>↑</button>
          </div>
        </div>
      )}
    </div>
  )
}