import { getProducts, getSiteContent } from "@/lib/data-store";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const site = getSiteContent();
  const products = getProducts()
    .filter((p) => p.visible !== false && p.region === "Global")
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .slice(0, 6);

  return (
    <>
      <NavBar />
      <main className="page-shell">
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="hero-badge">{site.hero.badge}</div>
              <h1 className="hero-title">{site.hero.title}</h1>
              <p className="hero-text">{site.hero.subtitle}</p>

              <form action="/search" className="search-bar card" role="search" aria-label="Search products">
                <input
                  type="text"
                  name="q"
                  placeholder="Search products, subscriptions, gift cards..."
                  className="search-input"
                />
                <button className="btn btn-primary" type="submit">Search</button>
              </form>

              <div className="hero-actions">
                <Link href="/search" className="btn btn-primary">{site.hero.primaryCta}</Link>
                <Link href="/admin/login" className="btn btn-secondary">Admin</Link>
              </div>
              <div className="hero-stats">
                <div className="stat"><strong>Global only</strong><span>Region-filtered catalog</span></div>
                <div className="stat"><strong>98%+ sellers</strong><span>Curated seller quality</span></div>
                <div className="stat"><strong>Fast sync</strong><span>Search-ready architecture</span></div>
              </div>
            </div>
            <div className="hero-panel card">
              <div className="hero-panel-glow"></div>
              <div className="hero-panel-head">Popular searches</div>
              <div className="chip-grid">
                {site.hero.quickSearches.map((item) => (
                  <Link key={item} href={`/search?q=${encodeURIComponent(item)}`} className="chip">
                    {item}
                  </Link>
                ))}
              </div>
              <div className="hero-feature card">
                <div className="hero-feature-title">Smart typo-aware search</div>
                <div className="hero-feature-text">
                  Search for <strong>chatgpt</strong>, <strong>chtgpt</strong>, <strong>netflx</strong> or <strong>canvaa</strong> and get better matching results.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container section">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Featured products</div>
              <h2>Curated global digital items</h2>
            </div>
            <Link href="/search" className="text-link">Browse all</Link>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="container section">
          <div className="promo card">
            <div>
              <div className="section-eyebrow">Why this layout works</div>
              <h2>Beautiful public storefront, powerful private control</h2>
              <p className="muted">The public sees a clean brand experience. You manage product quality, seller details, content, and publishing from the protected admin area.</p>
            </div>
            <Link href="/admin/login" className="btn btn-primary">Open admin</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
