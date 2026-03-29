"use client";

import { useMemo, useState } from "react";

function Field({ label, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

export default function AdminClient({ initialProducts, initialSite }) {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState(initialProducts);
  const [site, setSite] = useState(initialSite);
  const [selectedId, setSelectedId] = useState(initialProducts[0]?.id);
  const [status, setStatus] = useState("");

  const selected = useMemo(() => {
    return products.find((item) => item.id === selectedId) || products[0];
  }, [products, selectedId]);

  function updateProductField(key, value) {
    setProducts((prev) =>
      prev.map((item) => (item.id === selected.id ? { ...item, [key]: value } : item))
    );
  }

  function updateSellerField(key, value) {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === selected.id
          ? { ...item, seller: { ...(item.seller || {}), [key]: value } }
          : item
      )
    );
  }

  async function saveProducts() {
    setStatus("Saving products...");
    const res = await fetch("/api/admin/save-products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products })
    });
    const data = await res.json();
    setStatus(res.ok ? `Products saved${data.commitUrl ? ` • GitHub: ${data.commitUrl}` : ""}` : data.error || "Save failed");
  }

  async function saveSite() {
    setStatus("Saving site content...");
    const res = await fetch("/api/admin/save-site", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site })
    });
    const data = await res.json();
    setStatus(res.ok ? `Site content saved${data.commitUrl ? ` • GitHub: ${data.commitUrl}` : ""}` : data.error || "Save failed");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">GlobalDock Admin</div>
        <button className={`admin-nav ${tab === "products" ? "active" : ""}`} onClick={() => setTab("products")}>Products</button>
        <button className={`admin-nav ${tab === "content" ? "active" : ""}`} onClick={() => setTab("content")}>Homepage content</button>
        <button className={`admin-nav ${tab === "help" ? "active" : ""}`} onClick={() => setTab("help")}>Publishing help</button>
        <button className="admin-nav logout" onClick={logout}>Logout</button>
      </aside>

      <section className="admin-main">
        <div className="admin-topbar">
          <div>
            <div className="section-eyebrow">Protected workspace</div>
            <h1 className="page-title">Manage products, seller data, and content</h1>
          </div>
          <div className="status-pill">{status || "Ready"}</div>
        </div>

        {tab === "products" ? (
          <div className="admin-grid">
            <div className="admin-list card">
              <div className="panel-title">Products</div>
              {products.map((item) => (
                <button
                  key={item.id}
                  className={`list-row ${selectedId === item.id ? "selected" : ""}`}
                  onClick={() => setSelectedId(item.id)}
                >
                  <div className="list-title">{item.title}</div>
                  <div className="list-meta">{item.category} • ৳{item.price.toFixed(2)}</div>
                </button>
              ))}
              <button className="btn btn-primary full" onClick={saveProducts}>Save all product changes</button>
            </div>

            {selected ? (
              <div className="editor-wrap">
                <div className="editor-section card">
                  <div className="panel-title">Product editor</div>
                  <div className="form-grid">
                    <Field label="Title"><input value={selected.title} onChange={(e) => updateProductField("title", e.target.value)} /></Field>
                    <Field label="Slug"><input value={selected.slug} onChange={(e) => updateProductField("slug", e.target.value)} /></Field>
                    <Field label="Category"><input value={selected.category} onChange={(e) => updateProductField("category", e.target.value)} /></Field>
                    <Field label="Price (BDT)"><input type="number" step="0.01" value={selected.price} onChange={(e) => updateProductField("price", Number(e.target.value))} /></Field>
                    <Field label="Region"><input value={selected.region} onChange={(e) => updateProductField("region", e.target.value)} /></Field>
                    <Field label="Visible">
                      <select value={String(selected.visible !== false)} onChange={(e) => updateProductField("visible", e.target.value === "true")}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                    </Field>
                    <Field label="Hero word"><input value={selected.heroWord || ""} onChange={(e) => updateProductField("heroWord", e.target.value)} /></Field>
                    <Field label="Gradient"><input value={selected.artGradient || ""} onChange={(e) => updateProductField("artGradient", e.target.value)} /></Field>
                    <Field label="Short description"><textarea value={selected.shortDescription || ""} onChange={(e) => updateProductField("shortDescription", e.target.value)} /></Field>
                    <Field label="Description"><textarea value={selected.description || ""} onChange={(e) => updateProductField("description", e.target.value)} /></Field>
                    <Field label="Tags (comma separated)">
                      <input value={(selected.tags || []).join(", ")} onChange={(e) => updateProductField("tags", e.target.value.split(",").map((x) => x.trim()).filter(Boolean))} />
                    </Field>
                    <Field label="Aliases (comma separated)">
                      <input value={(selected.aliases || []).join(", ")} onChange={(e) => updateProductField("aliases", e.target.value.split(",").map((x) => x.trim()).filter(Boolean))} />
                    </Field>
                  </div>
                </div>

                <div className="editor-section card">
                  <div className="panel-title">Seller details</div>
                  <div className="form-grid">
                    <Field label="Seller name"><input value={selected.seller?.name || ""} onChange={(e) => updateSellerField("name", e.target.value)} /></Field>
                    <Field label="Seller rating %"><input type="number" value={selected.seller?.rating || 98} onChange={(e) => updateSellerField("rating", Number(e.target.value))} /></Field>
                    <Field label="Reviews"><input type="number" value={selected.seller?.reviews || 0} onChange={(e) => updateSellerField("reviews", Number(e.target.value))} /></Field>
                    <Field label="Sold count"><input type="number" value={selected.seller?.soldCount || 0} onChange={(e) => updateSellerField("soldCount", Number(e.target.value))} /></Field>
                    <Field label="Delivery time"><input value={selected.seller?.deliveryTime || ""} onChange={(e) => updateSellerField("deliveryTime", e.target.value)} /></Field>
                    <Field label="Country"><input value={selected.seller?.country || ""} onChange={(e) => updateSellerField("country", e.target.value)} /></Field>
                    <Field label="Review note"><input value={selected.seller?.reviewNote || ""} onChange={(e) => updateSellerField("reviewNote", e.target.value)} /></Field>
                    <Field label="Collected from seller"><input value={selected.seller?.sourceSeller || ""} onChange={(e) => updateSellerField("sourceSeller", e.target.value)} /></Field>
                    <Field label="Source reference"><input value={selected.seller?.sourceRef || ""} onChange={(e) => updateSellerField("sourceRef", e.target.value)} /></Field>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {tab === "content" ? (
          <div className="editor-section card">
            <div className="panel-title">Homepage content editor</div>
            <div className="form-grid">
              <Field label="Hero badge"><input value={site.hero.badge} onChange={(e) => setSite((prev) => ({ ...prev, hero: { ...prev.hero, badge: e.target.value } }))} /></Field>
              <Field label="Hero title"><textarea value={site.hero.title} onChange={(e) => setSite((prev) => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))} /></Field>
              <Field label="Hero subtitle"><textarea value={site.hero.subtitle} onChange={(e) => setSite((prev) => ({ ...prev, hero: { ...prev.hero, subtitle: e.target.value } }))} /></Field>
              <Field label="Primary CTA"><input value={site.hero.primaryCta} onChange={(e) => setSite((prev) => ({ ...prev, hero: { ...prev.hero, primaryCta: e.target.value } }))} /></Field>
              <Field label="Quick searches">
                <input value={site.hero.quickSearches.join(", ")} onChange={(e) => setSite((prev) => ({ ...prev, hero: { ...prev.hero, quickSearches: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } }))} />
              </Field>
            </div>
            <button className="btn btn-primary" onClick={saveSite}>Save homepage content</button>
          </div>
        ) : null}

        {tab === "help" ? (
          <div className="editor-section card">
            <div className="panel-title">Publishing and security notes</div>
            <ul className="help-list">
              <li>Admin is protected with middleware and a signed cookie session.</li>
              <li>Public visitors cannot directly open the admin area without a valid session.</li>
              <li>Saving locally updates the JSON files for local development.</li>
              <li>If GitHub sync is enabled, each save can commit updated JSON into your repo.</li>
              <li>Once GitHub receives the commit, Vercel can redeploy automatically from that repository.</li>
              <li>For full Elementor-like drag-and-drop editing, use a richer page-builder or headless CMS later. This demo gives you a WordPress-like editable content workflow without the heavy complexity.</li>
            </ul>
          </div>
        ) : null}
      </section>
    </main>
  );
}
