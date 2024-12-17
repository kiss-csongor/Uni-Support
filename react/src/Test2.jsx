const Test2 = ({ circleSize, setCircleSize }) => {

  const handleWheel = (event) => {
      if (event.deltaY < 0) {
        setCircleSize((prevSize) => Math.max(50, prevSize - 50));
      } else if (event.deltaY > 0) {
        setCircleSize((prevSize) => prevSize + 50);
      }
      console.log(circleSize)
  };

  return (
    <div className={`fixed top-0 left-0 z-20 w-full h-screen`} onWheel={handleWheel}>
      <div
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center bg-black"
        style={{
          backgroundImage: "url('./assets/parallax/teszt.png')", // Háttérkép
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: `radial-gradient(circle, transparent ${circleSize}px, black ${circleSize + 10}px)`, // Maszkolás
          WebkitMaskImage: `radial-gradient(circle, transparent ${circleSize}px, black ${circleSize + 10}px)`,
          maskComposite: "exclude",
          transition: 'width 0.3s ease, height 0.3s ease', // Animáció
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default Test2;
