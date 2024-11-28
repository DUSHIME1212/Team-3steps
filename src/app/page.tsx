import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HeroTeam from "@/components/HeroTeam";
import Listings from "@/components/Listings";
import Navbar from "@/components/Navbar";
import Testinmonial from "@/components/Testinmonial";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <main >
      <ToastContainer position="top-right" />

      <header>
        <Navbar />
      </header>
      <Hero />
      <About />
      <Listings />
      <Testinmonial />
      <HeroTeam/>
      <Footer />
    </main>
  );
}
