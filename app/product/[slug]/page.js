import { getProducts } from "@/lib/data-store";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default function ProductDetailPage({ params }) {
  const product = getProducts().find((p) => p.slug === params.slug && p.visible !== false);
  if (!product) return notFound();

  return (
    <>
      <NavBar />
      <main className="page-shell">
        <section className="container section">
          <Link href="/search" className="text-link">← Back to search</Link>
          <div className="detail-grid">
            <div className="detail-art card" style={{ background: product.artGradient }}>
              <span className="badge">Global</span>
              <div className="detail-word">{product.heroWord || product.title.split(" ")[0]}</div>
            </div>

            <div className="detail-copy">
              <div className="eyebrow">{product.category}</div>
              <h1 className="page-title">{product.title}</h1>
              <p className="muted detail-desc">{product.description}</p>

              <div className="detail-price card">
                <div>
                  <div className="price-label">Starting price</div>
                  <div className="big-price">৳{product.price.toFixed(2)}</div>
                </div>
                <button className="btn btn-primary">Request checkout flow</button>
              </div>

              <div className="info-grid">
                <div className="info-card card">
                  <div className="info-title">Seller quality</div>
                  <div className="info-line">Rating: {product.seller.rating}%</div>
                  <div className="info-line">Reviews: {Intl.NumberFormat().format(product.seller.reviews)}</div>
                  <div className="info-line">Sold: {Intl.NumberFormat().format(product.seller.soldCount)}</div>
                </div>
                <div className="info-card card">
                  <div className="info-title">Item meta</div>
                  <div className="info-line">Region: {product.region}</div>
                  <div className="info-line">Delivery: {product.seller.deliveryTime}</div>
                  <div className="info-line">Tags: {(product.tags || []).join(", ")}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
