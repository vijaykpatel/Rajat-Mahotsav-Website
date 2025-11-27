

export default function MarqueeDemo() {
  return (
    <main className="relative h-screen overflow-hidden">
      <div className="fixed bottom-4 right-4 z-10 text-right sm:bottom-8 sm:right-8">
        <div className="font-instrument-serif leading-tight">
          <h1 className="mt-2 leading-wide text-3xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl">
            Shree
          </h1>
          <h2 className="mt-2 leading-tight text-3xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl">
            Ghanshyam Maharaj
          </h2>
          <h3 className="mt-2 leading-tight text-3xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl">
            Rajat Pratishtha Mahotsav
          </h3>
          <p className="mt-2 text-3xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl">
            Shree Swaminarayan Temple
          </p>
          <p className="mt-2 text-3xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl">
            Secaucus, NJ celebrates 25 years
          </p>
          <p className="mt-2 text-4xl font-semibold italic text-white drop-shadow-lg sm:text-7xl lg:text-8xl xl:text-9xl">
            07.25.26 - 08.02.26
          </p>
        </div>
      </div>
    </main>
  );
}
