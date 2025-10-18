export default function MarqueeDemo() {
  return (
    <main className="relative h-screen overflow-hidden">
      
      <div className="fixed bottom-4 right-4 z-10 text-right sm:bottom-8 sm:right-8">
        <div className="font-instrument-serif leading-tight">
          <h1 className="leading-wide text-3xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl">
            Shree
          </h1>
          <h2 className="leading-tight text-3xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl">
            Ghanshyam Maharaj
          </h2>
          <h3 className="leading-tight text-3xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl">
            Rajat Pratishta Mahotsav
          </h3>
          <p className="mt-2 text-3xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl">
            Shree Swaminarayan Temple
          </p>
          <p className="mt-2 text-3xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl">
            Secaucus, NJ celebrates 25 years
          </p>

        </div>
      </div>
    </main>
  );
}
