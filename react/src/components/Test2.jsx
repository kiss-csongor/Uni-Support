import backgroundImage from '../assets/own/homeBg.jpg';

const Test2 = ({ circleSize, setCircleSize }) => {

  const handleWheel = (event) => {
    if (event.deltaY < 0) {
      if (circleSize < 115) {
        setCircleSize((prevSize) => Math.max(0, prevSize - 15));
      } else {
        setCircleSize((prevSize) => Math.max(0, prevSize - 50));
      }
    } else if(event.deltaY > 0) {
      if (circleSize < 115) {
        setCircleSize((prevSize) => prevSize + 15);
      } else {
        setCircleSize((prevSize) => prevSize + 50);
      }
    }
      console.log(circleSize)
  };

  return (
    <div className="fixed top-0 left-0 z-20 w-full h-screen max-md:hidden" onWheel={handleWheel}>
      
      <div
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center bg-black"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: `radial-gradient(circle, transparent ${circleSize}px, black ${circleSize + 1}px)`,
          WebkitMaskImage: `radial-gradient(circle, transparent ${circleSize}px, black ${circleSize + 1}px)`,
          maskComposite: "exclude",
          transition: 'width 0.3s ease, height 0.3s ease',
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default Test2;
