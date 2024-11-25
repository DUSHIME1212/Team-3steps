import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Listings from "@/components/Listings";
import Navbar from "@/components/Navbar";
import Testinmonial from "@/components/Testinmonial";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  return (
    <main >
      <header>
        <Navbar />
      </header>
      <ToastContainer position="top-right" />
      <Hero />
      <About />
      <Listings />
      <Testinmonial />
      <Footer />
    </main>
  );
}
