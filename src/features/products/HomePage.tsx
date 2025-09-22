import Footer from "../../components/userComponent/Footer";
import HeroSection from "../../components/userComponent/HeroSection";
import NavBar from "../../components/userComponent/NavBar";
import FAQ from "./FAQ";
import BestSellers from "./BestSellers";

const HomePage = () => {
  document.title = `Vintage Vault | Home`
  return (
    <div className="text-zinc-800 w-full">
      <NavBar />
      <HeroSection />
      <BestSellers />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
