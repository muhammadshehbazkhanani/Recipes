const Loader = () => {
    return (
      <div>
        <CutoutTextLoader
          background="white"
          // NOTE: Using GIFs for the background looks super cool :)
          imgUrl="/pizza.webp"
        />
      </div>
    );
  };
  
  const CutoutTextLoader = ({
    background,
    imgUrl,
  }: {
    background: string;
    imgUrl: string;
  }) => {
    return (
      <div className="relative h-screen" >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div
          style={{ background }}
          className="absolute inset-0 animate-pulse z-10"
        />
        <span
          className="font-black absolute inset-0 z-20 flex justify-center items-center text-center bg-clip-text text-transparent pointer-events-none"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            fontSize: "clamp(3rem, 12vw, 10rem)",
            lineHeight: "340px",
          }}
        >
          Loading...
        </span>
      </div>
    );
  };
  
  export default Loader;
  