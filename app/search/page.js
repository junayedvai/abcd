import { getProducts } from "@/lib/data-store";
import { searchProducts } from "@/lib/search";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function SearchPage({ searchParams }) {
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const products = getProducts();
  const { results, interpretedAs } = searchProducts(products, q);

  return (
    <>
      <NavBar />
      <main className="page-shell">
        <section className="container narrow section">
          <div className="section-eyebrow">Search marketplace</div>
          <h1 className="page-title">Find trusted global digital products</h1>
          <p className="muted">The search engine now keeps <strong>ChatGPT</strong> as <strong>ChatGPT</strong> instead of turning it into a generic AI result.</p>

          <form action="/search" className="search-bar card">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search products, subscriptions, gift cards..."
              className="search-input"
            />
            <button className="btn btn-primary" type="submit">Search</button>
          </form>

          {q ? (
            <div className="search-summary card">
              <span>Search:</span> <strong>{q}</strong>
              {interpretedAs ? (
                <>
                  <span className="summary-sep">Interpreted as:</span> <strong>{interpretedAs}</strong>
                </>
              ) : null}
              <span className="summary-sep">{results.length} result(s)</span>
            </div>
          ) : null}

          {results.length ? (
            <div className="product-grid">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty card">
              <h3>No results yet</h3>
              <p>Try a product name like ChatGPT, Netflix, Canva, Xbox, or Spotify.</p>
              <div className="chip-grid">
                {["chatgpt", "netflix", "canva", "spotify", "xbox"].map((item) => (
                  <Link href={`/search?q=${item}`} key={item} className="chip">{item}</Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
