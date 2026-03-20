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
  { title: 'AI Insights', desc: 'AI-powered business recommendations', icon: '🤖', tag: 'Beta' },
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
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [aiOpen, setAiOpen] = useState(false)
  const [aiInput, setAiInput] = useState('')
  const [aiMessages, setAiMessages] = useState([
    { from: 'ai', text: 'Namaste! 🙏 I\'m your Agent Seva AI. Ask me anything about your business — sales tips, inventory alerts, growth ideas!' }
  ])
  const [aiLoading, setAiLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }
    setName(localStorage.getItem('name') || 'User')
    setRole(localStorage.getItem('role') || 'vendor')

    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  function handleLogout() {
    localStorage.clear()
    router.push('/login')
  }

  async function sendAiMessage() {
    if (!aiInput.trim()) return
    const userMsg = aiInput.trim()
    setAiInput('')
    setAiMessages(prev => [...prev, { from: 'user', text: userMsg }])
    setAiLoading(true)
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, role, name })
      })
      const data = await res.json()
      setAiMessages(prev => [...prev, { from: 'ai', text: data.reply || 'I could not process that. Try again!' }])
    } catch {
      setAiMessages(prev => [...prev, { from: 'ai', text: 'Something went wrong. Please try again.' }])
    }
    setAiLoading(false)
  }

  const stats = role === 'admin' ? adminStats : vendorStats
  const actions = role === 'admin' ? adminActions : vendorActions

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good Morning'
    if (h < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div style={{ fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif" }} className="flex h-screen bg-[#080B10] text-white overflow-hidden">

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e2a1e; border-radius: 4px; }
        .stat-card:hover { transform: translateY(-3px); border-color: rgba(0,255,148,0.3) !important; }
        .action-card:hover { transform: translateY(-2px); background: rgba(255,255,255,0.05) !important; }
        .action-card:hover .action-icon { transform: scale(1.15); }
        .stat-card, .action-card { transition: all 0.25s ease; }
        .action-icon { transition: transform 0.2s ease; }
        .ai-btn-pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(0,255,148,0.4)} 50%{box-shadow:0 0 0 8px rgba(0,255,148,0)} }
        .sidebar-link:hover { background: rgba(0,255,148,0.08); color: #00FF94; }
        .sidebar-link { transition: all 0.2s ease; }
        .glow-text { text-shadow: 0 0 40px rgba(0,255,148,0.3); }
      `}</style>

      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '240px' : '68px',
        background: 'linear-gradient(180deg, #0C1110 0%, #080B10 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        transition: 'width 0.3s ease',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
              background: 'linear-gradient(135deg, #00FF94 0%, #00C96E 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', fontWeight: 800, color: '#080B10'
            }}>A</div>
            {sidebarOpen && (
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px', color: '#fff', letterSpacing: '-0.3px' }}>Agent Seva</div>
                <div style={{ fontSize: '11px', color: '#00FF94', opacity: 0.7 }}>Local Vendor Platform</div>
              </div>
            )}
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { icon: '🏠', label: 'Dashboard', active: true },
            { icon: '📦', label: role === 'admin' ? 'All Products' : 'My Products' },
            { icon: '🧾', label: 'Orders' },
            { icon: '📊', label: 'Analytics' },
            { icon: role === 'admin' ? '🏪' : '🏪', label: role === 'admin' ? 'Vendors' : 'My Store' },
            { icon: '🤖', label: 'AI Assistant' },
            { icon: '⚙️', label: 'Settings' },
          ].map((item, i) => (
            <div key={i} className="sidebar-link" style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 12px', borderRadius: '10px', cursor: 'pointer',
              background: item.active ? 'rgba(0,255,148,0.1)' : 'transparent',
              color: item.active ? '#00FF94' : '#6B7280',
              fontWeight: item.active ? 600 : 400, fontSize: '13.5px',
              whiteSpace: 'nowrap'
            }} onClick={() => item.label === 'AI Assistant' && setAiOpen(true)}>
              <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
              {sidebarOpen && item.active && (
                <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#00FF94' }} />
              )}
            </div>
          ))}
        </nav>

        {/* User info at bottom */}
        <div style={{ padding: '16px 8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
              background: role === 'admin' ? 'linear-gradient(135deg,#7C6FFF,#4F46E5)' : 'linear-gradient(135deg,#00FF94,#00C96E)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: 700, color: '#fff'
            }}>{name?.[0]?.toUpperCase() || 'U'}</div>
            {sidebarOpen && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
                <div style={{ fontSize: '11px', color: role === 'admin' ? '#7C6FFF' : '#00FF94', textTransform: 'capitalize' }}>{role}</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top Navbar */}
        <header style={{
          padding: '0 28px',
          height: '64px',
          background: 'rgba(8,11,16,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', borderRadius: '8px', padding: '7px 10px', cursor: 'pointer', fontSize: '14px' }}>
              {sidebarOpen ? '◀' : '▶'}
            </button>
            <div>
              <span style={{ color: '#6B7280', fontSize: '13px' }}>Dashboard</span>
              <span style={{ color: '#374151', margin: '0 6px' }}>/</span>
              <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>Overview</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '13px', color: '#6B7280', background: 'rgba(255,255,255,0.04)', padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              🕐 {time}
            </div>
            <div style={{
              background: role === 'admin' ? 'rgba(124,111,255,0.15)' : 'rgba(0,255,148,0.12)',
              color: role === 'admin' ? '#7C6FFF' : '#00FF94',
              border: `1px solid ${role === 'admin' ? 'rgba(124,111,255,0.3)' : 'rgba(0,255,148,0.3)'}`,
              borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: 600, textTransform: 'capitalize'
            }}>{role}</div>
            <button onClick={handleLogout} style={{ background: 'rgba(255,107,107,0.1)', color: '#FF6B6B', border: '1px solid rgba(255,107,107,0.2)', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
              Logout
            </button>
          </div>
        </header>

        {/* Scrollable body */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>

          {/* Greeting Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0,255,148,0.08) 0%, rgba(0,201,110,0.03) 50%, rgba(8,11,16,0) 100%)',
            border: '1px solid rgba(0,255,148,0.12)',
            borderRadius: '16px', padding: '24px 28px', marginBottom: '28px',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '80px', opacity: 0.06 }}>🏪</div>
            <div style={{ fontSize: '13px', color: '#00FF94', fontWeight: 500, marginBottom: '6px', opacity: 0.8 }}>{greeting()}, {time} IST</div>
            <h1 className="glow-text" style={{ fontSize: '26px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: '6px' }}>
              Welcome back, {name} 👋
            </h1>
            <p style={{ color: '#6B7280', fontSize: '14px' }}>
              {role === 'admin'
                ? 'Here\'s your platform overview. You have full administrative access.'
                : 'Here\'s what\'s happening with your store today.'}
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
            {stats.map((stat, i) => (
              <div key={i} className="stat-card" style={{
                background: stat.bg,
                border: `1px solid ${stat.color}22`,
                borderRadius: '14px', padding: '20px',
                cursor: 'default'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</span>
                  <span style={{ fontSize: '22px' }}>{stat.icon}</span>
                </div>
                <div style={{ fontSize: '30px', fontWeight: 800, color: stat.color, letterSpacing: '-1px', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions + Activity */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', marginBottom: '28px' }}>

            {/* Quick Actions */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#9CA3AF', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Actions</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {actions.map((item, i) => (
                  <div key={i} className="action-card" style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '14px', padding: '18px', cursor: 'pointer'
                  }} onClick={() => {
                    if (item.title === 'AI Assistant') setAiOpen(true)
                    if (item.title === 'Vendor Management') router.push('/vendor-management')
                    if (item.title === 'My Products') router.push('/products')
                    if (item.title === 'Manage Products') router.push('/products')
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <span className="action-icon" style={{ fontSize: '28px' }}>{item.icon}</span>
                      <span style={{
                        fontSize: '10px', fontWeight: 600, padding: '3px 8px', borderRadius: '20px',
                        background: item.tag === 'Beta' ? 'rgba(124,111,255,0.15)' : item.tag === 'Admin' ? 'rgba(255,107,107,0.12)' : 'rgba(0,255,148,0.1)',
                        color: item.tag === 'Beta' ? '#7C6FFF' : item.tag === 'Admin' ? '#FF6B6B' : '#00FF94',
                      }}>{item.tag}</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#fff', marginBottom: '5px' }}>{item.title}</div>
                    <div style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#9CA3AF', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recent Activity</div>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {recentActivity.map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: a.dot, marginTop: '5px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '13px', color: '#D1D5DB', lineHeight: 1.4 }}>{a.text}</div>
                      <div style={{ fontSize: '11px', color: '#4B5563', marginTop: '2px' }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Role Banner */}
          <div style={{
            background: role === 'admin' ? 'rgba(124,111,255,0.08)' : 'rgba(0,255,148,0.06)',
            border: `1px solid ${role === 'admin' ? 'rgba(124,111,255,0.2)' : 'rgba(0,255,148,0.15)'}`,
            borderRadius: '14px', padding: '18px 22px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: role === 'admin' ? '#7C6FFF' : '#00FF94', marginBottom: '4px' }}>
                {role === 'admin' ? '🛡️ Admin Access' : '🏪 Vendor Access'}
              </div>
              <div style={{ color: '#6B7280', fontSize: '13px' }}>
                {role === 'admin'
                  ? 'You have full access to all platform features including user management and analytics.'
                  : 'Manage your store, products, orders and track your sales performance.'}
              </div>
            </div>
            <button className="ai-btn-pulse" onClick={() => setAiOpen(true)} style={{
              background: 'linear-gradient(135deg, #00FF94, #00C96E)',
              color: '#080B10', border: 'none', borderRadius: '10px', padding: '10px 20px',
              fontWeight: 700, fontSize: '13px', cursor: 'pointer', flexShrink: 0
            }}>🤖 Ask AI</button>
          </div>
        </main>
      </div>

      {/* AI Chat Panel */}
      {aiOpen && (
        <div style={{
          position: 'fixed', right: '20px', bottom: '20px',
          width: '360px', height: '500px',
          background: '#0C1110', border: '1px solid rgba(0,255,148,0.2)',
          borderRadius: '20px', display: 'flex', flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)', zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* AI Header */}
          <div style={{ padding: '16px 20px', background: 'rgba(0,255,148,0.08)', borderBottom: '1px solid rgba(0,255,148,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#00FF94,#00C96E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🤖</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>Seva AI</div>
                <div style={{ fontSize: '11px', color: '#00FF94' }}>● Online</div>
              </div>
            </div>
            <button onClick={() => setAiOpen(false)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#9CA3AF', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontSize: '14px' }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {aiMessages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%', padding: '10px 14px', borderRadius: msg.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: msg.from === 'user' ? 'linear-gradient(135deg,#00FF94,#00C96E)' : 'rgba(255,255,255,0.06)',
                  color: msg.from === 'user' ? '#080B10' : '#D1D5DB',
                  fontSize: '13px', lineHeight: 1.5, fontWeight: msg.from === 'user' ? 500 : 400
                }}>{msg.text}</div>
              </div>
            ))}
            {aiLoading && (
              <div style={{ display: 'flex', gap: '6px', padding: '10px 14px', background: 'rgba(255,255,255,0.06)', borderRadius: '14px 14px 14px 4px', width: 'fit-content' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00FF94', animation: `bounce 1s ${i*0.2}s infinite` }} />
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '8px' }}>
            <input
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendAiMessage()}
              placeholder="Ask anything about your business..."
              style={{
                flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none'
              }}
            />
            <button onClick={sendAiMessage} style={{
              background: 'linear-gradient(135deg,#00FF94,#00C96E)', border: 'none', borderRadius: '10px',
              padding: '10px 14px', cursor: 'pointer', fontSize: '16px', color: '#080B10', fontWeight: 700
            }}>↑</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}