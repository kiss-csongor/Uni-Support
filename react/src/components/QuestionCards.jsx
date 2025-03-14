import { faq } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { Link } from 'react-router-dom';

const QuestionCards = () => {
  return (
    <Section>
        <div className="container relative z-2">

            <Heading className="md:max-w-md lg:max-w-2xl" title="Oldalunkon leggyakrabban ismételt kérdések" />

            <div className="flex flex-wrap gap-10 mb-10 justify-center">
                {faq.map((item) => (
                <div key={item.id} className="group block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]" style={{backgroundImage: `url(${item.backgroundUrl})`}}>
                    <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none max-md:max-w-[352px]">
                        <h5 className="h5 mb-5">{item.title}</h5>
                        <p className="body-1 mb-6 text-n-3">{item.text}</p>
                        <div className="flex items-center mt-auto">
                            <img src={item.iconUrl} width={48} height={48} alt={item.title} />
                            <a className="ml-auto font-code text-xs font-bold text-n-2 uppercase tracking-wider pointer-events-auto cursor-pointer hover:text-n-1">
                                <Link to={'/signup'}>Fedezd fel</Link>
                            </a>
                            <Arrow />
                        </div>
                    </div>

                    {item.light && <GradientLight/ >}
                    
                    <div className="absolute inset-0.5 bg-n-8/70" style={{clipPath: "url(#benefits)"}}>

                    </div>
                    <ClipPath />
                </div>
            ))}
            </div> 
       </div>
    </Section>
  );
};

export default QuestionCards