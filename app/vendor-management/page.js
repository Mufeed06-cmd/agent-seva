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
const CAT_COLORS = { General: '#00FF94', Textiles: '#7C6FFF', Pharmacy: '#FF6B6B', Produce: '#FFB800', Electronics: '#38BDF8', Food: '#F472B6', Stationery: '#A3E635', Hardware: '#FB923C' }
const EMPTY_VENDOR = { name: '', owner: '', city: '', phone: '', email: '', category: 'General' }

export default function VendorManagement() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [vendors, setVendors] = useState(MOCK_VENDORS)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [confirmAction, setConfirmAction] = useState(null)
  const [toast, setToast] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newVendor, setNewVendor] = useState(EMPTY_VENDOR)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const r = localStorage.getItem('role')
    if (!token || r !== 'admin') { router.push('/dashboard'); return }
    setName(localStorage.getItem('name') || 'Admin')
  }, [])

  function showToast(msg, type = 'success') { setToast({ msg, type }); setTimeout(() => setToast(null), 3000) }

  function changeStatus(id, newStatus) {
    setVendors(v => v.map(vd => vd.id === id ? { ...vd, status: newStatus } : vd))
    setSelectedVendor(prev => prev?.id === id ? { ...prev, status: newStatus } : prev)
    setConfirmAction(null)
    showToast(`Vendor ${newStatus === 'active' ? 'approved' : 'suspended'} successfully.`)
  }

  function deleteVendor(id) {
    setVendors(v => v.filter(vd => vd.id !== id))
    setSelectedVendor(null); setConfirmAction(null)
    showToast('Vendor removed.', 'error')
  }

  function addVendor() {
    if (!newVendor.name || !newVendor.owner || !newVendor.phone) return
    setVendors(v => [{ ...newVendor, id: Date.now(), status: 'pending', products: 0, revenue: '₹0', joined: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) }, ...v])
    setShowAddModal(false); setNewVendor(EMPTY_VENDOR)
    showToast('Vendor added & pending approval.')
  }

  const filtered = vendors.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.owner.toLowerCase().includes(search.toLowerCase()) || v.city.toLowerCase().includes(search.toLowerCase())
    return matchSearch && (filterStatus === 'all' || v.status === filterStatus)
  })

  const counts = { all: vendors.length, active: vendors.filter(v => v.status === 'active').length, pending: vendors.filter(v => v.status === 'pending').length, suspended: vendors.filter(v => v.status === 'suspended').length }

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", background: '#080B10', minHeight: '100vh', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1e2a1e; border-radius: 4px; }
        .vcard:hover { border-color: rgba(0,255,148,0.2) !important; }
        .vcard { transition: border-color 0.2s; cursor: pointer; }
        .action-btn:hover { opacity: 0.85; }
        .action-btn { transition: opacity 0.2s; }
        input:focus, select:focus { outline: none; border-color: rgba(0,255,148,0.4) !important; }
        input::placeholder { color: #4B5563; }
        @keyframes slide-up { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes fade-in { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
        @keyframes toast-in { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        .slide-panel { animation: slide-up 0.3s ease; }
        .modal-box { animation: fade-in 0.22s ease; }
        .toast { animation: toast-in 0.3s ease; }

        .summary-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
        .vendors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 12px; }

        @media (max-width: 768px) {
          .summary-grid { grid-template-columns: repeat(2,1fr) !important; }
          .vendors-grid { grid-template-columns: 1fr !important; }
          .filter-row { flex-direction: column !important; }
          .filter-row > * { width: 100% !important; }
          .filter-tabs { overflow-x: auto; white-space: nowrap; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ background: 'rgba(8,11,16,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 16px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
          <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg,#00FF94,#00C96E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', color: '#080B10', flexShrink: 0 }}>A</div>
            <span style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>Agent Seva</span>
          </Link>
          <span style={{ color: '#374151' }}>›</span>
          <span style={{ fontSize: '13px', color: '#9CA3AF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Vendors</span>
        </div>
        <div style={{ background: 'rgba(124,111,255,0.15)', color: '#7C6FFF', border: '1px solid rgba(124,111,255,0.3)', borderRadius: '20px', padding: '4px 10px', fontSize: '11px', fontWeight: 600, flexShrink: 0 }}>Admin</div>
      </nav>

      <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(18px,4vw,24px)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '2px' }}>Vendor Management</h1>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>Approve, manage and monitor all vendors</p>
          </div>
          <button className="action-btn" onClick={() => setShowAddModal(true)} style={{ background: 'linear-gradient(135deg,#00FF94,#00C96E)', color: '#080B10', border: 'none', borderRadius: '10px', padding: '9px 16px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>+ Add Vendor</button>
        </div>

        {/* Summary */}
        <div className="summary-grid" style={{ marginBottom: '16px' }}>
          {[
            { label: 'Total', value: counts.all, color: '#fff', bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)', icon: '🏪' },
            { label: 'Active', value: counts.active, color: '#00FF94', bg: 'rgba(0,255,148,0.07)', border: 'rgba(0,255,148,0.2)', icon: '✅' },
            { label: 'Pending', value: counts.pending, color: '#FFB800', bg: 'rgba(255,184,0,0.07)', border: 'rgba(255,184,0,0.2)', icon: '⏳' },
            { label: 'Suspended', value: counts.suspended, color: '#FF6B6B', bg: 'rgba(255,107,107,0.07)', border: 'rgba(255,107,107,0.2)', icon: '🚫' },
          ].map((s, i) => (
            <div key={i} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: '12px', padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: '#6B7280' }}>{s.label}</span>
                <span style={{ fontSize: '16px' }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: 'clamp(22px,4vw,28px)', fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="filter-row" style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '150px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: '#4B5563', fontSize: '13px' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search vendors..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '10px', padding: '9px 12px 9px 32px', color: '#fff', fontSize: '13px', fontFamily: 'inherit' }} />
          </div>
          <div className="filter-tabs" style={{ display: 'flex', gap: '3px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '3px' }}>
            {['all','active','pending','suspended'].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} style={{ background: filterStatus === s ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', borderRadius: '7px', padding: '6px 12px', color: filterStatus === s ? '#fff' : '#6B7280', fontWeight: filterStatus === s ? 600 : 400, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
                {s} {s !== 'all' && `(${counts[s]})`}
              </button>
            ))}
          </div>
        </div>

        <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '12px' }}>{filtered.length} of {vendors.length} vendors</div>

        {/* Vendor Cards Grid (mobile friendly) */}
        <div className="vendors-grid">
          {filtered.map(v => {
            const sc = STATUS_CONFIG[v.status]
            const cc = CAT_COLORS[v.category] || '#9CA3AF'
            const isSelected = selectedVendor?.id === v.id
            return (
              <div key={v.id} className="vcard" onClick={() => setSelectedVendor(isSelected ? null : v)}
                style={{ background: isSelected ? 'rgba(0,255,148,0.04)' : 'rgba(255,255,255,0.02)', border: `1px solid ${isSelected ? 'rgba(0,255,148,0.25)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '14px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: `${cc}18`, border: `1px solid ${cc}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: cc, flexShrink: 0 }}>{v.name[0]}</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{v.name}</div>
                      <div style={{ fontSize: '11px', color: '#6B7280' }}>{v.category} · {v.city}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '20px', background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, flexShrink: 0 }}>{sc.label}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ background: 'rgba(0,255,148,0.06)', border: '1px solid rgba(0,255,148,0.12)', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#00FF94' }}>{v.products}</div>
                    <div style={{ fontSize: '10px', color: '#6B7280' }}>Products</div>
                  </div>
                  <div style={{ background: 'rgba(255,184,0,0.06)', border: '1px solid rgba(255,184,0,0.12)', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFB800' }}>{v.revenue}</div>
                    <div style={{ fontSize: '10px', color: '#6B7280' }}>Revenue</div>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '12px' }}>👤 {v.owner} · 📞 {v.phone}</div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {v.status === 'pending' && (
                    <button className="action-btn" onClick={e => { e.stopPropagation(); setConfirmAction({ type: 'approve', vendor: v }) }}
                      style={{ flex: 1, background: 'rgba(0,255,148,0.12)', color: '#00FF94', border: '1px solid rgba(0,255,148,0.25)', borderRadius: '8px', padding: '8px', fontWeight: 600, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>✅ Approve</button>
                  )}
                  {v.status === 'active' && (
                    <button className="action-btn" onClick={e => { e.stopPropagation(); setConfirmAction({ type: 'suspend', vendor: v }) }}
                      style={{ flex: 1, background: 'rgba(255,184,0,0.1)', color: '#FFB800', border: '1px solid rgba(255,184,0,0.2)', borderRadius: '8px', padding: '8px', fontWeight: 600, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>⏸ Suspend</button>
                  )}
                  {v.status === 'suspended' && (
                    <button className="action-btn" onClick={e => { e.stopPropagation(); setConfirmAction({ type: 'approve', vendor: v }) }}
                      style={{ flex: 1, background: 'rgba(0,255,148,0.1)', color: '#00FF94', border: '1px solid rgba(0,255,148,0.2)', borderRadius: '8px', padding: '8px', fontWeight: 600, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>🔄 Reactivate</button>
                  )}
                  <button className="action-btn" onClick={e => { e.stopPropagation(); setConfirmAction({ type: 'delete', vendor: v }) }}
                    style={{ background: 'rgba(255,107,107,0.1)', color: '#FF6B6B', border: '1px solid rgba(255,107,107,0.2)', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', cursor: 'pointer' }}>🗑</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Confirm Modal */}
      {confirmAction && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, backdropFilter: 'blur(4px)', padding: '16px' }}>
          <div className="modal-box" style={{ background: '#0C1110', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '340px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '14px' }}>{confirmAction.type === 'approve' ? '✅' : confirmAction.type === 'suspend' ? '⏸' : '🗑'}</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{confirmAction.type === 'approve' ? 'Approve' : confirmAction.type === 'suspend' ? 'Suspend' : 'Remove'} Vendor?</h3>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px', lineHeight: 1.6 }}>
              {confirmAction.type === 'approve' && `${confirmAction.vendor.name} will be activated.`}
              {confirmAction.type === 'suspend' && `${confirmAction.vendor.name} will lose platform access.`}
              {confirmAction.type === 'delete' && `${confirmAction.vendor.name} will be permanently removed.`}
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setConfirmAction(null)} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#9CA3AF', borderRadius: '10px', padding: '11px', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit' }}>Cancel</button>
              <button className="action-btn" onClick={() => confirmAction.type === 'delete' ? deleteVendor(confirmAction.vendor.id) : changeStatus(confirmAction.vendor.id, confirmAction.type === 'approve' ? 'active' : 'suspended')}
                style={{ flex: 1, border: 'none', borderRadius: '10px', padding: '11px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, fontFamily: 'inherit', background: confirmAction.type === 'approve' ? 'linear-gradient(135deg,#00FF94,#00C96E)' : confirmAction.type === 'suspend' ? 'rgba(255,184,0,0.2)' : 'rgba(255,107,107,0.2)', color: confirmAction.type === 'approve' ? '#080B10' : confirmAction.type === 'suspend' ? '#FFB800' : '#FF6B6B' }}>
                {confirmAction.type === 'approve' ? 'Approve' : confirmAction.type === 'suspend' ? 'Suspend' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vendor Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200, backdropFilter: 'blur(4px)' }}>
          <div className="modal-box" style={{ background: '#0C1110', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px 20px 0 0', padding: '24px 20px', width: '100%', maxWidth: '480px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Add New Vendor</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#9CA3AF', borderRadius: '6px', padding: '4px 9px', cursor: 'pointer', fontSize: '13px' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[{ key: 'name', label: 'Store Name *', placeholder: 'Store name' }, { key: 'owner', label: 'Owner Name *', placeholder: 'Full name' }, { key: 'city', label: 'City', placeholder: 'City / Town' }, { key: 'phone', label: 'Phone *', placeholder: '10-digit phone' }, { key: 'email', label: 'Email', placeholder: 'email@example.com' }].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#9CA3AF', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.label}</label>
                  <input value={newVendor[f.key]} onChange={e => setNewVendor(n => ({ ...n, [f.key]: e.target.value }))} placeholder={f.placeholder}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '13px', fontFamily: 'inherit' }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#9CA3AF', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</label>
                <select value={newVendor.category} onChange={e => setNewVendor(n => ({ ...n, category: e.target.value }))}
                  style={{ width: '100%', background: '#0C1110', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '13px', fontFamily: 'inherit' }}>
                  {Object.keys(CAT_COLORS).map(c => <option key={c} value={c}>{c}</option>)}
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

      {toast && (
        <div className="toast" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: toast.type === 'error' ? 'rgba(255,107,107,0.15)' : 'rgba(0,255,148,0.12)', border: `1px solid ${toast.type === 'error' ? 'rgba(255,107,107,0.3)' : 'rgba(0,255,148,0.3)'}`, color: toast.type === 'error' ? '#FF6B6B' : '#00FF94', borderRadius: '12px', padding: '11px 20px', fontSize: '13px', fontWeight: 600, backdropFilter: 'blur(10px)', zIndex: 300, whiteSpace: 'nowrap' }}>
          {toast.type === 'error' ? '🗑' : '✅'} {toast.msg}
        </div>
      )}
    </div>
  )
}