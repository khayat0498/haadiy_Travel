import { Header } from "@/components/safar/Header";
import { Hero } from "@/components/safar/Hero";
import { CitiesShowcase } from "@/components/safar/CitiesShowcase";
import { FeaturesGrid } from "@/components/safar/FeaturesGrid";
import { Footer } from "@/components/safar/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <CitiesShowcase />
        <FeaturesGrid />
      </main>
      <Footer />
    </>
  );
}
