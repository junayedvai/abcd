import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.slug}`} className="card product-card">
      <div className="product-art" style={{ background: product.artGradient || "linear-gradient(135deg,#1d4ed8,#0f172a)" }}>
        <span className="badge">Global</span>
        <div className="art-word">{product.heroWord || product.title.split(" ")[0]}</div>
      </div>
      <div className="product-body">
        <div className="eyebrow">{product.category}</div>
        <div className="product-title">{product.title}</div>
        <div className="product-desc">{product.shortDescription}</div>
        <div className="product-row">
          <div className="price-wrap">
            <span className="price-label">From</span>
            <span className="price">৳{product.price.toFixed(2)}</span>
          </div>
          <div className="seller-mini">
            {product.seller?.rating}% seller • {Intl.NumberFormat().format(product.seller?.soldCount || 0)} sold
          </div>
        </div>
      </div>
    </Link>
  );
}
