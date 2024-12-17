import { useState, useEffect } from "react";
import ButtonGradient from './assets/svg/ButtonGradient';
import Button from './components/Button';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import Test2 from './Test2';

const Home = () => {
  const [circleSize, setCircleSize] = useState(50);

  const handleWheel = (event) => {
    if (circleSize >= 1000) {
      // Ha a kör mérete >= 1000, akkor változtathatjuk a méretét
      if (event.deltaY > 0) {
        setCircleSize((prevSize) => Math.max(50, prevSize - 10)); // Csökkentés
      } else if(event.deltaY > 0) {
        setCircleSize((prevSize) => prevSize + 10); // Növelés
      }
    } else {
      // Ha a kör mérete < 1000, akkor letiltjuk az oldal görgetését
      event.preventDefault();
    }
  };

  // A görgetés letiltása az egész oldalra, ha a kör mérete < 1000
  useEffect(() => {
    if (circleSize < 1000) {
      // Az oldal görgetésének letiltása
      window.addEventListener("wheel", handleWheel, { passive: false });
    } else {
      // Az oldal görgetésének engedélyezése, ha a kör >= 1000
      window.removeEventListener("wheel", handleWheel);
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [circleSize]); // A kör méretét figyeljük

  return (
    <>
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
        <Header />
        <Test2 circleSize={circleSize} setCircleSize={setCircleSize} /> {/* Átadjuk a circleSize-t és setCircleSize-t a Test2-nek */}
        <Hero />
        <AboutUs />
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default Home;
