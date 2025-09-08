const HeroSection = () => {
  return (
    <div id="HeroSection" className="pt-16 w-full">
      <div className="w-full relative">
        <video
          src="/Video/HeroVid.mp4"
          autoPlay
          loop
          muted
          className="w-full h-[550px] lg:h-full object-cover"
        ></video>
        <div className="w-full h-full bg-black/35 absolute top-0"></div>
        <div className="text-zinc-100 absolute bottom-20 md:bottom-32 lg:bottom-40 left-10 w-[70%] sm:w-[80%]">
          <h1 className="text-xl md:text-4xl lg:text-7xl font-fraunces font-extralight">
            Understated Luxury, Unforgettable Presence
          </h1>
          <p className="text-xs md:text-base lg:text-xl mt-2 sm:mt-6 lg:mt-10">
            Where luxury meets personalization—each piece is meticulously
            crafted for your distinctive style, offering elegance that feels
            unmistakably you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
