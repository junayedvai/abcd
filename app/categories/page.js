import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CategoriesPage() {
  const items = [
    { name: "AI & Software", query: "chatgpt" },
    { name: "Streaming", query: "netflix" },
    { name: "Design Tools", query: "canva" },
    { name: "Gaming", query: "xbox" },
    { name: "Music", query: "spotify" }
  ];

  return (
    <>
      <NavBar />
      <main className="page-shell">
        <section className="container narrow section">
          <div className="section-eyebrow">Categories</div>
          <h1 className="page-title">Browse by category</h1>
          <div className="category-grid">
            {items.map((item) => (
              <Link className="category-card card" href={`/search?q=${encodeURIComponent(item.query)}`} key={item.name}>
                <div className="category-title">{item.name}</div>
                <div className="muted">Explore matching products</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
