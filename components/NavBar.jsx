import Link from "next/link";

export default function NavBar() {
  return (
    <header className="nav-shell">
      <div className="container nav">
        <Link href="/" className="brand">
          <div className="brand-mark">◉</div>
          <div>
            <div className="brand-title">GlobalDock</div>
            <div className="brand-sub">Trusted global digital products</div>
          </div>
        </Link>

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/how-it-works">How it works</Link>
        </nav>

        <div className="nav-pill">98%+ trusted sellers</div>
      </div>
    </header>
  );
}
