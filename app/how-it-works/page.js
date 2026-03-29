import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function HowItWorksPage() {
  return (
    <>
      <NavBar />
      <main className="page-shell">
        <section className="container narrow section">
          <div className="section-eyebrow">How it works</div>
          <h1 className="page-title">Curated product discovery flow</h1>
          <div className="steps">
            <div className="step card"><strong>1.</strong> Query enters smart search</div>
            <div className="step card"><strong>2.</strong> Typos are interpreted carefully</div>
            <div className="step card"><strong>3.</strong> Only Global items survive the filter</div>
            <div className="step card"><strong>4.</strong> Seller quality rules rank better results</div>
            <div className="step card"><strong>5.</strong> Admin controls content and visibility</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
