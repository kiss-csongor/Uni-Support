import ButtonGradient from './assets/svg/ButtonGradient';
import Button from './components/Button';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';

const App = () => {
  return (
    <>
    <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
      <Header />
      <Hero />
      <AboutUs />

    </div>
    <ButtonGradient />
    </>
  );
}
 
export default App;
