const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center relative">
        <h1 className="font-fraunces -mt-20 px-16 py-18 text-6xl sm:text-7xl bg-orange-400 text-orange-400 rounded-full z-0 animate-ping">VV</h1>
        <h1 className="font-fraunces -mt-20 px-14 py-18 shadow-2xl text-8xl sm:text-9xl bg-zinc-100 rounded-full absolute ">V V</h1>
    </div>
  )
}

export default LoadingScreen