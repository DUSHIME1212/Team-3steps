import About from "@/components/About";
import Hero from "@/components/Hero";
import Listings from "@/components/Listings";
import Testinmonial from "@/components/Testinmonial";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  return (
    <main >
      <ToastContainer position="top-right" />
      <Hero />
      <About />
      <Listings />
      <Testinmonial />
    </main>
  );
}
