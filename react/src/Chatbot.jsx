import ButtonGradient from './assets/svg/ButtonGradient';
import Button from './components/Button';
import Header from './components/Header';
import Chat from './components/Chat';
import Footer from './components/Footer'

const Chatbot = () => {
  return (
    <>
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
        <Header />
        <Chat />
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
}
 
export default Chatbot;
