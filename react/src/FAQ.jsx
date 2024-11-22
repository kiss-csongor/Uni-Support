import ButtonGradient from './assets/svg/ButtonGradient';
import Button from './components/Button';
import Header from './components/Header';
import QuestionCards from './components/QuestionCards';

const FAQ = () => {
  return (
    <>
      <div className='pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden'>
        <Header />
        <QuestionCards />
      </div>
      <ButtonGradient />
    </>
  );
}
 
export default FAQ;
