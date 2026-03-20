'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const MOCK_VENDORS = [
  { id: 1, name: 'Ravi General Store', owner: 'Ravi Kumar', city: 'Warangal', phone: '9876543210', email: 'ravi@store.in', status: 'active', products: 84, revenue: '₹32,400', joined: '12 Jan 2025', category: 'General' },
  { id: 2, name: 'Priya Cloth House', owner: 'Priya Devi', city: 'Nizamabad', phone: '9845671230', email: 'priya@cloth.in', status: 'active', products: 142, revenue: '₹58,900', joined: '19 Jan 2025', category: 'Textiles' },
  { id: 3, name: 'Anand Medicals', owner: 'Anand Rao', city: 'Karimnagar', phone: '9700112233', email: 'anand@med.in', status: 'pending', products: 0, revenue: '₹0', joined: '02 Mar 2025', category: 'Pharmacy' },
  { id: 4, name: 'Lakshmi Fruits & Veg', owner: 'Lakshmi Bai', city: 'Khammam', phone: '9654321098', email: 'lakshmi@fruitveg.in', status: 'active', products: 56, revenue: '₹14,200', joined: '28 Jan 2025', category: 'Produce' },
  { id: 5, name: 'Sri Balaji Electronics', owner: 'Balaji Reddy', city: 'Adilabad', phone: '9512345678', email: 'balaji@elec.in', status: 'suspended', products: 33, revenue: '₹9,800', joined: '05 Feb 2025', category: 'Electronics' },
  { id: 6, name: 'Noor Bakery & Sweets', owner: 'Noor Ahmed', city: 'Nalgonda', phone: '9388776655', email: 'noor@bakery.in', status: 'active', products: 27, revenue: '₹21,600', joined: '14 Feb 2025', category: 'Food' },
  { id: 7, name: 'Chandra Stationery', owner: 'Chandra Sekhar', city: 'Mancherial', phone: '9244556677', email: 'chandra@stat.in', status: 'pending', products: 0, revenue: '₹0', joined: '08 Mar 2025', category: 'Stationery' },
  { id: 8, name: 'Vijay Hardware', owner: 'Vijay Singh', city: 'Suryapet', phone: '9133445566', email: 'vijay@hardware.in', status: 'active', products: 198, revenue: '₹47,300', joined: '22 Jan 2025', category: 'Hardware' },
]

const STATUS_CONFIG = {
  active:    { color: '#00FF94', bg: 'rgba(0,255,148,0.12)',    border: 'rgba(0,255,148,0.25)',    label: 'Active' },
  pending:   { color: '#FFB800', bg: 'rgba(255,184,0,0.12)',    border: 'rgba(255,184,0,0.25)',    label: 'Pending' },
  suspended: { color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)', border: 'rgba(255,107,107,0.25)', label: 'Suspended' },
}

const CATEGORY_COLORS = {
  General: '#00FF94', Textiles: '#7C6FFF', Pharmacy: '#FF6B6B',
  Produce: '#FFB800', Electronics: '#38BDF8', Food: '#F472B6',
  Stationery: '#A3E635', Hardware: '#FB923C',
}

export default function VendorManagement() {
  const router = useRouter()
  const [role, setRole] = useState('')
  const [name, setName] = useState('')
  const [vendors, setVendors] = useState(MOCK_VENDORS)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [confirmAction, setConfirmAction] = useState(null)
  const [toast, setToast] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newVendor, setNewVendor] = useState({ name: '', owner: '', city: '', phone: '', email: '', category: 'General' })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const r = localStorage.getItem('role')
    if (!token || r !== 'admin') { router.push('/dashboard'); return }
    setRole(r)
    setName(localStorage.getItem('name') || 'Admin')
  }, [])

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  function changeStatus(id, newStatus) {
    setVendors(v => v.map(vd => vd.id === id ? { ...vd, status: newStatus } : vd))
    setSelectedVendor(prev => prev?.id === id ? { ...prev, status: newStatus } : prev)
    setConfirmAction(null)
    showToast(`Vendor ${newStatus === 'active' ? 'approved' : newStatus === 'suspended' ? 'suspended' : 'updated'} successfully.`)
  }

  function deleteVendor(id) {
    setVendors(v => v.filter(vd => vd.id !== id))
    setSelectedVendor(null)
    setConfirmAction(null)
    showToast('Vendor removed from platform.', 'error')
  }

  function addVendor() {
    if (!newVendor.name || !newVendor.owner || !newVendor.phone) return
    const created = {
      ...newVendor,
      id: vendors.length + 1,
      status: 'pending',
      products: 0,
      revenue: '₹0',
      joined: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    }
    setVendors(v => [created, ...v])
    setShowAddModal(false)
    setNewVendor({ name: '', owner: '', city: '', phone: '', email: '', category: 'General' })
    showToast('New vendor added & awaiting approval.')
  }

  const filtered = vendors.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.owner.toLowerCase().includes(search.toLowerCase()) ||
      v.city.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || v.status === filterStatus
    return matchSearch && matchStatus
  })

  const counts = {
    all: vendors.length,
    active: vendors.filter(v => v.status === 'active').length,
    pending: vendors.filter(v => v.status === 'pending').length,
    suspended: vendors.filter(v => v.status === 'suspended').length,
  }

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", background: '#080B10', minHeight: '100vh', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: #1e2a1e; border-radius: 4px; }
        .vrow:hover { background: rgba(255,255,255,0.04) !important; cursor: pointer; }
        .vrow { transition: background 0.15s; }
        .action-btn:hover { opacity: 0.85; transform: scale(1.03); }
        .action-btn { transition: all 0.2s; }
        .filter-tab:hover { color: #fff !important; }
        .filter-tab { transition: all 0.2s; }
        input::placeholder { color: #4B5563; }
        input:focus { outline: none; border-color: rgba(0,255,148,0.4) !important; }
        select:focus { outline: none; }
        @keyframes slide-in { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fade-in { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes toast-in { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .detail-panel { animation: slide-in 0.3s ease; }
        .modal-box { animation: fade-in 0.25s ease; }
        .toast { animation: toast-in 0.3s ease; }
      `}</style>

      {/* Navbar */}
      <nav style={{
        background: 'rgba(8,11,16,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 28px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg,#00FF94,#00C96E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', color: '#080B10' }}>A</div>
              <span style={{ fontWeight: 700, fontSize: '15px', color: '#fff' }}>Agent Seva</span>
            </div>
          </Link>
          <span style={{ color: '#374151' }}>›</span>
          <span style={{ fontSize: '14px', color: '#9CA3AF' }}>Vendor Management</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(124,111,255,0.15)', color: '#7C6FFF', border: '1px solid rgba(124,111,255,0.3)', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: 600 }}>Admin</div>
          <span style={{ fontSize: '13px', color: '#6B7280' }}>{name}</span>
        </div>
      </nav>

      <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>

        {/* Main Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>

          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: '4px' }}>Vendor Management</h1>
              <p style={{ fontSize: '14px', color: '#6B7280' }}>Approve, manage and monitor all registered Kirana vendors</p>
            </div>
            <button className="action-btn" onClick={() => setShowAddModal(true)} style={{
              background: 'linear-gradient(135deg,#00FF94,#00C96E)', color: '#080B10',
              border: 'none', borderRadius: '10px', padding: '10px 20px',
              fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}>+ Add Vendor</button>
          </div>

          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
            {[
              { label: 'Total Vendors', value: counts.all, color: '#fff', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)', icon: '🏪' },
              { label: 'Active', value: counts.active, color: '#00FF94', bg: 'rgba(0,255,148,0.07)', border: 'rgba(0,255,148,0.2)', icon: '✅' },
              { label: 'Pending Approval', value: counts.pending, color: '#FFB800', bg: 'rgba(255,184,0,0.07)', border: 'rgba(255,184,0,0.2)', icon: '⏳' },
              { label: 'Suspended', value: counts.suspended, color: '#FF6B6B', bg: 'rgba(255,107,107,0.07)', border: 'rgba(255,107,107,0.2)', icon: '🚫' },
            ].map((s, i) => (
              <div key={i} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: '14px', padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>{s.label}</span>
                  <span style={{ fontSize: '18px' }}>{s.icon}</span>
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Filter + Search bar */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Search */}
            <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#4B5563', fontSize: '14px' }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, owner, city..."
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '10px', padding: '10px 14px 10px 38px', color: '#fff', fontSize: '13px', fontFamily: 'inherit' }}
              />
            </div>
            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '4px' }}>
              {['all', 'active', 'pending', 'suspended'].map(s => (
                <button key={s} className="filter-tab" onClick={() => setFilterStatus(s)} style={{
                  background: filterStatus === s ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: 'none', borderRadius: '7px', padding: '7px 14px',
                  color: filterStatus === s ? '#fff' : '#6B7280',
                  fontWeight: filterStatus === s ? 600 : 400,
                  fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit',
                  textTransform: 'capitalize'
                }}>{s} {s !== 'all' && <span style={{ fontSize: '11px', opacity: 0.7 }}>({counts[s]})</span>}</button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', overflow: 'hidden' }}>
            {/* Table Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 0.8fr 0.8fr 0.9fr 1fr', gap: '0', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
              {['Vendor', 'Owner', 'City', 'Products', 'Revenue', 'Status', 'Joined'].map(h => (
                <div key={h} style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</div>
              ))}
            </div>

            {/* Table Rows */}
            {filtered.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>No vendors found.</div>
            ) : filtered.map(v => {
              const sc = STATUS_CONFIG[v.status]
              const cc = CATEGORY_COLORS[v.category] || '#9CA3AF'
              const isSelected = selectedVendor?.id === v.id
              return (
                <div key={v.id} className="vrow" onClick={() => setSelectedVendor(isSelected ? null : v)}
                  style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 0.8fr 0.8fr 0.9fr 1fr', gap: '0', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: isSelected ? 'rgba(0,255,148,0.04)' : 'transparent', borderLeft: isSelected ? '2px solid #00FF94' : '2px solid transparent' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: `${cc}18`, border: `1px solid ${cc}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: cc, flexShrink: 0 }}>
                      {v.name[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{v.name}</div>
                      <div style={{ fontSize: '11px', color: '#6B7280' }}>{v.category}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#D1D5DB', alignSelf: 'center' }}>{v.owner}</div>
                  <div style={{ fontSize: '13px', color: '#9CA3AF', alignSelf: 'center' }}>📍 {v.city}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', alignSelf: 'center' }}>{v.products}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#00FF94', alignSelf: 'center' }}>{v.revenue}</div>
                  <div style={{ alignSelf: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>{sc.label}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', alignSelf: 'center' }}>{v.joined}</div>
                </div>
              )
            })}
          </div>

          <div style={{ marginTop: '12px', fontSize: '12px', color: '#4B5563', textAlign: 'right' }}>
            Showing {filtered.length} of {vendors.length} vendors
          </div>
        </div>

        {/* Detail Side Panel */}
        {selectedVendor && (
          <div className="detail-panel" style={{
            width: '320px', borderLeft: '1px solid rgba(255,255,255,0.07)',
            background: '#0C1110', overflowY: 'auto', padding: '24px', flexShrink: 0
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Vendor Details</span>
              <button onClick={() => setSelectedVendor(null)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#9CA3AF', borderRadius: '6px', padding: '4px 9px', cursor: 'pointer', fontSize: '13px' }}>✕</button>
            </div>

            {/* Avatar & Name */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px', margin: '0 auto 12px',
                background: `${CATEGORY_COLORS[selectedVendor.category] || '#9CA3AF'}18`,
                border: `1px solid ${CATEGORY_COLORS[selectedVendor.category] || '#9CA3AF'}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '26px', fontWeight: 800, color: CATEGORY_COLORS[selectedVendor.category] || '#9CA3AF'
              }}>{selectedVendor.name[0]}</div>
              <div style={{ fontWeight: 700, fontSize: '16px', color: '#fff', marginBottom: '4px' }}>{selectedVendor.name}</div>
              <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '10px' }}>{selectedVendor.category}</div>
              <span style={{ fontSize: '12px', fontWeight: 700, padding: '5px 14px', borderRadius: '20px', background: STATUS_CONFIG[selectedVendor.status].bg, color: STATUS_CONFIG[selectedVendor.status].color, border: `1px solid ${STATUS_CONFIG[selectedVendor.status].border}` }}>
                {STATUS_CONFIG[selectedVendor.status].label}
              </span>
            </div>

            {/* Info rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {[
                { label: 'Owner', value: selectedVendor.owner },
                { label: 'City', value: selectedVendor.city },
                { label: 'Phone', value: selectedVendor.phone },
                { label: 'Email', value: selectedVendor.email },
                { label: 'Joined', value: selectedVendor.joined },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>{row.label}</span>
                  <span style={{ fontSize: '12px', color: '#D1D5DB', fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
              <div style={{ background: 'rgba(0,255,148,0.07)', border: '1px solid rgba(0,255,148,0.15)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#00FF94' }}>{selectedVendor.products}</div>
                <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>Products</div>
              </div>
              <div style={{ background: 'rgba(255,184,0,0.07)', border: '1px solid rgba(255,184,0,0.15)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFB800' }}>{selectedVendor.revenue}</div>
                <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>Revenue</div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedVendor.status === 'pending' && (
                <button className="action-btn" onClick={() => setConfirmAction({ type: 'approve', vendor: selectedVendor })}
                  style={{ background: 'linear-gradient(135deg,#00FF94,#00C96E)', color: '#080B10', border: 'none', borderRadius: '10px', padding: '11px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
                  ✅ Approve Vendor
                </button>
              )}
              {selectedVendor.status === 'active' && (
                <button className="action-btn" onClick={() => setConfirmAction({ type: 'suspend', vendor: selectedVendor })}
                  style={{ background: 'rgba(255,184,0,0.12)', color: '#FFB800', border: '1px solid rgba(255,184,0,0.25)', borderRadius: '10px', padding: '11px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
                  ⏸ Suspend Vendor
                </button>
              )}
              {selectedVendor.status === 'suspended' && (
                <button className="action-btn" onClick={() => setConfirmAction({ type: 'approve', vendor: selectedVendor })}
                  style={{ background: 'rgba(0,255,148,0.1)', color: '#00FF94', border: '1px solid rgba(0,255,148,0.2)', borderRadius: '10px', padding: '11px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
                  🔄 Reactivate Vendor
                </button>
              )}
              <button className="action-btn" onClick={() => setConfirmAction({ type: 'delete', vendor: selectedVendor })}
                style={{ background: 'rgba(255,107,107,0.1)', color: '#FF6B6B', border: '1px solid rgba(255,107,107,0.2)', borderRadius: '10px', padding: '11px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
                🗑 Remove from Platform
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── CONFIRM MODAL ── */}
      {confirmAction && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, backdropFilter: 'blur(4px)' }}>
          <div className="modal-box" style={{ background: '#0C1110', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '32px', width: '360px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>
              {confirmAction.type === 'approve' ? '✅' : confirmAction.type === 'suspend' ? '⏸' : '🗑'}
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
              {confirmAction.type === 'approve' ? 'Approve Vendor?' : confirmAction.type === 'suspend' ? 'Suspend Vendor?' : 'Remove Vendor?'}
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px', lineHeight: 1.6 }}>
              {confirmAction.type === 'approve' && `${confirmAction.vendor.name} will be activated and can start using the platform.`}
              {confirmAction.type === 'suspend' && `${confirmAction.vendor.name} will be suspended and lose platform access.`}
              {confirmAction.type === 'delete' && `${confirmAction.vendor.name} will be permanently removed. This cannot be undone.`}
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setConfirmAction(null)} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#9CA3AF', borderRadius: '10px', padding: '11px', cursor: 'pointer', fontSize: '13px', fontWeight: 500, fontFamily: 'inherit' }}>
                Cancel
              </button>
              <button className="action-btn" onClick={() => {
                if (confirmAction.type === 'delete') deleteVendor(confirmAction.vendor.id)
                else changeStatus(confirmAction.vendor.id, confirmAction.type === 'approve' ? 'active' : 'suspended')
              }} style={{
                flex: 1, border: 'none', borderRadius: '10px', padding: '11px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, fontFamily: 'inherit',
                background: confirmAction.type === 'approve' ? 'linear-gradient(135deg,#00FF94,#00C96E)' : confirmAction.type === 'suspend' ? 'rgba(255,184,0,0.2)' : 'rgba(255,107,107,0.2)',
                color: confirmAction.type === 'approve' ? '#080B10' : confirmAction.type === 'suspend' ? '#FFB800' : '#FF6B6B',
              }}>
                {confirmAction.type === 'approve' ? 'Approve' : confirmAction.type === 'suspend' ? 'Suspend' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD VENDOR MODAL ── */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, backdropFilter: 'blur(4px)' }}>
          <div className="modal-box" style={{ background: '#0C1110', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '32px', width: '420px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>Add New Vendor</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#9CA3AF', borderRadius: '6px', padding: '4px 9px', cursor: 'pointer', fontSize: '13px' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { key: 'name', placeholder: 'Store name', label: 'Store Name *' },
                { key: 'owner', placeholder: 'Owner full name', label: 'Owner Name *' },
                { key: 'city', placeholder: 'City / Town', label: 'City' },
                { key: 'phone', placeholder: '10-digit phone', label: 'Phone *' },
                { key: 'email', placeholder: 'email@example.com', label: 'Email' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#9CA3AF', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.label}</label>
                  <input value={newVendor[f.key]} onChange={e => setNewVendor(n => ({ ...n, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '13px', fontFamily: 'inherit' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#9CA3AF', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</label>
                <select value={newVendor.category} onChange={e => setNewVendor(n => ({ ...n, category: e.target.value }))}
                  style={{ width: '100%', background: '#0C1110', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '13px', fontFamily: 'inherit' }}>
                  {Object.keys(CATEGORY_COLORS).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setShowAddModal(false)} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#9CA3AF', borderRadius: '10px', padding: '11px', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit' }}>Cancel</button>
              <button className="action-btn" onClick={addVendor} style={{ flex: 1, background: 'linear-gradient(135deg,#00FF94,#00C96E)', color: '#080B10', border: 'none', borderRadius: '10px', padding: '11px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>Add Vendor</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className="toast" style={{
          position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
          background: toast.type === 'error' ? 'rgba(255,107,107,0.15)' : 'rgba(0,255,148,0.12)',
          border: `1px solid ${toast.type === 'error' ? 'rgba(255,107,107,0.3)' : 'rgba(0,255,148,0.3)'}`,
          color: toast.type === 'error' ? '#FF6B6B' : '#00FF94',
          borderRadius: '12px', padding: '12px 24px', fontSize: '13px', fontWeight: 600,
          backdropFilter: 'blur(10px)', zIndex: 300, whiteSpace: 'nowrap'
        }}>
          {toast.type === 'error' ? '🗑' : '✅'} {toast.msg}
        </div>
      )}
    </div>
  )
}