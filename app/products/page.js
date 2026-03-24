'use client'
import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CATEGORIES = ['All', 'Grocery', 'Snacks', 'Beverages', 'Dairy', 'Spices', 'Personal Care', 'Stationery', 'Electronics']
const MOCK_PRODUCTS = [
  { id: 1, name: 'Tata Salt 1kg', category: 'Grocery', price: 24, stock: 80, unit: 'pkt', sku: 'GRC-001', lowStockAt: 10 },
  { id: 2, name: 'Parle-G Biscuits', category: 'Snacks', price: 10, stock: 5, unit: 'pkt', sku: 'SNK-001', lowStockAt: 10 },
  { id: 3, name: 'Aashirvaad Atta 5kg', category: 'Grocery', price: 245, stock: 22, unit: 'bag', sku: 'GRC-002', lowStockAt: 5 },
  { id: 4, name: 'Maggi Noodles', category: 'Snacks', price: 14, stock: 3, unit: 'pkt', sku: 'SNK-002', lowStockAt: 10 },
  { id: 5, name: 'Amul Butter 500g', category: 'Dairy', price: 260, stock: 12, unit: 'pkt', sku: 'DRY-001', lowStockAt: 5 },
  { id: 6, name: 'Red Chilli Powder', category: 'Spices', price: 55, stock: 2, unit: 'pkt', sku: 'SPC-001', lowStockAt: 5 },
  { id: 7, name: 'Coca-Cola 750ml', category: 'Beverages', price: 40, stock: 48, unit: 'btl', sku: 'BVR-001', lowStockAt: 12 },
  { id: 8, name: 'Colgate Toothpaste', category: 'Personal Care', price: 99, stock: 18, unit: 'tube', sku: 'PRC-001', lowStockAt: 5 },
  { id: 9, name: 'Fevicol 50g', category: 'Stationery', price: 35, stock: 7, unit: 'tube', sku: 'STN-001', lowStockAt: 5 },
  { id: 10, name: 'Turmeric Powder', category: 'Spices', price: 48, stock: 14, unit: 'pkt', sku: 'SPC-002', lowStockAt: 5 },
  { id: 11, name: 'Amul Milk 1L', category: 'Dairy', price: 66, stock: 30, unit: 'pkt', sku: 'DRY-002', lowStockAt: 10 },
  { id: 12, name: 'Lays Classic 26g', category: 'Snacks', price: 20, stock: 0, unit: 'pkt', sku: 'SNK-003', lowStockAt: 10 },
]
const CAT_COLORS = { Grocery: '#00FF94', Snacks: '#FFB800', Beverages: '#38BDF8', Dairy: '#F472B6', Spices: '#FF6B6B', 'Personal Care': '#A3E635', Stationery: '#7C6FFF', Electronics: '#FB923C' }
const CAT_ICONS = { Grocery: '🌾', Snacks: '🍟', Beverages: '🥤', Dairy: '🥛', Spices: '🌶️', 'Personal Care': '🧴', Stationery: '✏️', Electronics: '⚡' }
const EMPTY_FORM = { name: '', category: 'Grocery', price: '', stock: '', unit: 'pkt', sku: '', lowStockAt: 10 }

function StockBar({ stock, lowStockAt }) {
  const max = Math.max(stock, 50)
  const pct = Math.min((stock / max) * 100, 100)
  const color = stock === 0 ? '#FF6B6B' : stock <= lowStockAt ? '#FFB800' : '#00FF94'
  return <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden', marginTop: '6px' }}><div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '4px' }} /></div>
}

export default function Products() {
  const router = useRouter()
  const [products, setProducts] = useState(MOCK_PRODUCTS)
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('All')
  const [filterStock, setFilterStock] = useState('all')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [toast, setToast] = useState(null)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }
    setUserName(localStorage.getItem('name') || 'User')
  }, [])

  function showToast(msg, type = 'success') { setToast({ msg, type }); setTimeout(() => setToast(null), 3000) }

  function saveProduct() {
    if (!form.name || !form.price || form.stock === '') return
    if (modal.type === 'add') {
      setProducts(p => [{ ...form, id: Date.now(), price: +form.price, stock: +form.stock, lowStockAt: +form.lowStockAt }, ...p])
      showToast(`"${form.name}" added.`)
    } else {
      setProducts(p => p.map(x => x.id === form.id ? { ...form, price: +form.price, stock: +form.stock, lowStockAt: +form.lowStockAt } : x))
      showToast(`"${form.name}" updated.`)
    }
    setModal(null)
  }

  function deleteProduct() { setProducts(p => p.filter(x => x.id !== modal.product.id)); setModal(null); showToast('Product removed.', 'error') }
  function updateStock(id, delta) { setProducts(p => p.map(x => x.id === id ? { ...x, stock: Math.max(0, x.stock + delta) } : x)) }

  const filtered = useMemo(() => {
    let list = [...products]
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()))
    if (filterCat !== 'All') list = list.filter(p => p.category === filterCat)
    if (filterStock === 'low') list = list.filter(p => p.stock > 0 && p.stock <= p.lowStockAt)
    if (filterStock === 'out') list = list.filter(p => p.stock === 0)
    if (filterStock === 'ok') list = list.filter(p => p.stock > p.lowStockAt)
    return list
  }, [products, search, filterCat, filterStock])

  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= p.lowStockAt).length
  const outCount = products.filter(p => p.stock === 0).length
  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0)

  const stockStatus = (p) => {
    if (p.stock === 0) return { label: 'Out', color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)', border: 'rgba(255,107,107,0.25)' }
    if (p.stock <= p.lowStockAt) return { label: 'Low', color: '#FFB800', bg: 'rgba(255,184,0,0.12)', border: 'rgba(255,184,0,0.25)' }
    return { label: 'OK', color: '#00FF94', bg: 'rgba(0,255,148,0.1)', border: 'rgba(0,255,148,0.2)' }
  }

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", background: '#080B10', minHeight: '100vh', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1e2a1e; border-radius: 4px; }
        .prod-card:hover { border-color: rgba(0,255,148,0.2) !important; transform: translateY(-2px); }
        .prod-card { transition: all 0.2s; }
        .btn-sm:hover { opacity: 0.8; }
        .btn-sm { transition: opacity 0.15s; }
        input:focus, select:focus { outline: none; border-color: rgba(0,255,148,0.4) !important; }
        input::placeholder { color: #4B5563; }
        @keyframes fade-in { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
        @keyframes toast-in { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        .modal-box { animation: fade-in 0.22s ease; }
        .toast { animation: toast-in 0.3s ease; }

        .summary-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap: 12px; }
        .controls-row { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }

        @media (max-width: 768px) {
          .summary-grid { grid-template-columns: repeat(2,1fr) !important; }
          .products-grid { grid-template-columns: repeat(2,1fr) !important; }
          .controls-row { flex-direction: column !important; align-items: stretch !important; }
          .controls-row > * { width: 100% !important; }
          .filter-tabs { overflow-x: auto; }
        }
        @media (max-width: 400px) {
          .products-grid { grid-template-columns: 1fr !important; }
          .summary-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ background: 'rgba(8,11,16,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 16px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg,#00FF94,#00C96E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', color: '#080B10', flexShrink: 0 }}>A</div>
            <span style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>Agent Seva</span>
          </Link>
          <span style={{ color: '#374151' }}>›</span>
          <span style={{ fontSize: '13px', color: '#9CA3AF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Products</span>
        </div>
        {(lowStockCount + outCount) > 0 && (
          <div style={{ background: 'rgba(255,184,0,0.12)', border: '1px solid rgba(255,184,0,0.25)', borderRadius: '20px', padding: '4px 10px', fontSize: '11px', color: '#FFB800', fontWeight: 600, flexShrink: 0 }}>⚠️ {lowStockCount + outCount}</div>
        )}
      </nav>

      <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '2px' }}>Products & Inventory</h1>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>Manage stock and get alerts</p>
          </div>
          <button onClick={() => { setForm(EMPTY_FORM); setModal({ type: 'add' }) }} style={{ background: 'linear-gradient(135deg,#00FF94,#00C96E)', color: '#080B10', border: 'none', borderRadius: '10px', padding: '9px 16px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>+ Add Product</button>
        </div>

        {/* Summary */}
        <div className="summary-grid" style={{ marginBottom: '16px' }}>
          {[
            { label: 'Total', value: products.length, color: '#fff', bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)', icon: '📦' },
            { label: 'Value', value: `₹${(totalValue/1000).toFixed(1)}k`, color: '#00FF94', bg: 'rgba(0,255,148,0.06)', border: 'rgba(0,255,148,0.15)', icon: '💰' },
            { label: 'Low Stock', value: lowStockCount, color: '#FFB800', bg: 'rgba(255,184,0,0.06)', border: 'rgba(255,184,0,0.15)', icon: '⚠️' },
            { label: 'Out', value: outCount, color: '#FF6B6B', bg: 'rgba(255,107,107,0.06)', border: 'rgba(255,107,107,0.15)', icon: '🚫' },
          ].map((s, i) => (
            <div key={i} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: '12px', padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: '#6B7280' }}>{s.label}</span>
                <span style={{ fontSize: '16px' }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: 'clamp(20px,4vw,26px)', fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Alert */}
        {(lowStockCount > 0 || outCount > 0) && (
          <div style={{ background: 'rgba(255,184,0,0.07)', border: '1px solid rgba(255,184,0,0.2)', borderRadius: '12px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '18px' }}>⚠️</span>
            <span style={{ fontSize: '13px', color: '#9CA3AF', flex: 1 }}><span style={{ color: '#FFB800', fontWeight: 600 }}>Stock Alert — </span>{outCount > 0 ? `${outCount} out of stock` : ''}{outCount > 0 && lowStockCount > 0 ? ', ' : ''}{lowStockCount > 0 ? `${lowStockCount} running low` : ''}</span>
            <button onClick={() => setFilterStock('low')} style={{ background: 'rgba(255,184,0,0.15)', color: '#FFB800', border: '1px solid rgba(255,184,0,0.25)', borderRadius: '8px', padding: '5px 12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>View</button>
          </div>
        )}

        {/* Controls */}
        <div className="controls-row" style={{ marginBottom: '16px' }}>
          <div style={{ flex: 1, minWidth: '150px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: '#4B5563', fontSize: '13px' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '10px', padding: '9px 12px 9px 32px', color: '#fff', fontSize: '13px', fontFamily: 'inherit' }} />
          </div>
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '10px', padding: '9px 12px', color: '#fff', fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}>
            {CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#0C1110' }}>{c}</option>)}
          </select>
          <div className="filter-tabs" style={{ display: 'flex', gap: '3px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '3px' }}>
            {[['all','All'],['ok','✅'],['low','⚠️'],['out','🚫']].map(([val, label]) => (
              <button key={val} onClick={() => setFilterStock(val)} style={{ background: filterStock === val ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', borderRadius: '7px', padding: '6px 12px', color: filterStock === val ? '#fff' : '#6B7280', fontWeight: filterStock === val ? 600 : 400, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>{label}</button>
            ))}
          </div>
        </div>

        <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '12px' }}>{filtered.length} of {products.length} products</div>

        {/* Grid */}
        <div className="products-grid">
          {filtered.map(p => {
            const cc = CAT_COLORS[p.category] || '#9CA3AF'
            const st = stockStatus(p)
            return (
              <div key={p.id} className="prod-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${cc}14`, border: `1px solid ${cc}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '10px' }}>{CAT_ICONS[p.category] || '📦'}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '3px', lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ fontSize: '10px', color: cc, marginBottom: '8px', fontWeight: 500 }}>{p.category} · {p.sku}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#00FF94' }}>₹{p.price}</span>
                  <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '20px', background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>{st.label}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '2px' }}>Stock: <span style={{ color: st.color, fontWeight: 600 }}>{p.stock}</span> {p.unit}</div>
                <StockBar stock={p.stock} lowStockAt={p.lowStockAt} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
                  <button className="btn-sm" onClick={() => updateStock(p.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(255,107,107,0.12)', color: '#FF6B6B', border: '1px solid rgba(255,107,107,0.2)', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                  <span style={{ flex: 1, textAlign: 'center', fontSize: '13px', fontWeight: 700 }}>{p.stock}</span>
                  <button className="btn-sm" onClick={() => updateStock(p.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(0,255,148,0.1)', color: '#00FF94', border: '1px solid rgba(0,255,148,0.2)', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  <button className="btn-sm" onClick={() => { setForm({ ...p }); setModal({ type: 'edit', product: p }) }} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#9CA3AF', borderRadius: '8px', padding: '6px', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>✏️ Edit</button>
                  <button className="btn-sm" onClick={() => setModal({ type: 'delete', product: p })} style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.15)', color: '#FF6B6B', borderRadius: '8px', padding: '6px 9px', fontSize: '12px', cursor: 'pointer' }}>🗑</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200, backdropFilter: 'blur(4px)', padding: '0' }}>
          <div className="modal-box" style={{ background: '#0C1110', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px 20px 0 0', padding: '24px 20px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>{modal.type === 'add' ? '+ Add Product' : '✏️ Edit Product'}</h3>
              <button onClick={() => setModal(null)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#9CA3AF', borderRadius: '6px', padding: '4px 9px', cursor: 'pointer', fontSize: '13px' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[{ key: 'name', label: 'Product Name *', placeholder: 'e.g. Tata Salt 1kg' }, { key: 'sku', label: 'SKU', placeholder: 'GRC-001' }, { key: 'price', label: 'Price (₹) *', placeholder: '0', type: 'number' }, { key: 'stock', label: 'Stock *', placeholder: '0', type: 'number' }, { key: 'unit', label: 'Unit', placeholder: 'pkt / kg / btl' }, { key: 'lowStockAt', label: 'Alert when below', placeholder: '10', type: 'number' }].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#9CA3AF', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.label}</label>
                  <input type={f.type || 'text'} value={form[f.key]} onChange={e => setForm(x => ({ ...x, [f.key]: e.target.value }))} placeholder={f.placeholder}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '13px', fontFamily: 'inherit' }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#9CA3AF', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</label>
                <select value={form.category} onChange={e => setForm(x => ({ ...x, category: e.target.value }))}
                  style={{ width: '100%', background: '#0C1110', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '13px', fontFamily: 'inherit' }}>
                  {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#9CA3AF', borderRadius: '10px', padding: '11px', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={saveProduct} style={{ flex: 1, background: 'linear-gradient(135deg,#00FF94,#00C96E)', color: '#080B10', border: 'none', borderRadius: '10px', padding: '11px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>{modal.type === 'add' ? 'Add' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {modal?.type === 'delete' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, backdropFilter: 'blur(4px)', padding: '16px' }}>
          <div className="modal-box" style={{ background: '#0C1110', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '340px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '14px' }}>🗑</div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Delete Product?</h3>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}><span style={{ color: '#fff', fontWeight: 600 }}>{modal.product.name}</span> will be permanently removed.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#9CA3AF', borderRadius: '10px', padding: '11px', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={deleteProduct} style={{ flex: 1, background: 'rgba(255,107,107,0.15)', color: '#FF6B6B', border: '1px solid rgba(255,107,107,0.25)', borderRadius: '10px', padding: '11px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>Delete</button>
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
