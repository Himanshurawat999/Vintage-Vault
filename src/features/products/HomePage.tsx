import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
import NavBar from "../../components/NavBar";
import FAQ from "./FAQ";
import BestSellers from "./BestSellers";

const HomePage = () => {
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
