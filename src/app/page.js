import CartPopup from "@/components/CartPopup";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";

export default function Home() {
  return (
    <>
      <CartPopup />
      <Hero />
      {/* <Gallery /> */}
      <Collections />
      <Footer />
    </>
  );
}
