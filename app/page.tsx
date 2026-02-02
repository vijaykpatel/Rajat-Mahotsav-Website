import VideoSection from "@/components/organisms/video-section"
import TitleSection from "@/components/organisms/landing-page"
import TitleSectionMobile from "@/components/organisms/landing-page-mobile"
import GuruCard from "@/components/molecules/guru-card"
import { getCloudflareImageBiggest } from "@/lib/cdn-assets"
import "@/styles/registration-theme.css"

import PratisthaStory from "@/components/organisms/pratishta-story"
import AashirwadSection from "@/components/organisms/aashirwad-section"
import VideoBackgroundSection from "@/components/organisms/video-background-section"

const gurus = [
  {
    imageId: "dc885005-1573-4b68-9b7d-8d21f2ae8b00",
    name: "Jeevanpran Shree Muktajeevan Swamibapa"
  },
  {
    imageId: "b148858a-2ce9-4ac7-71e9-5bd5e076de00",
    name: "Acharya Shree Purushottampriyadasji Swamishree Maharaj"
  },
  {
    imageId: "e2881864-b5d1-4e12-d289-63add00d1400",
    name: "Acharya Shree Jitendriyapriyadasji Swamiji Maharaj"
  }
]

export default function ShaderShowcase() {
  const targetDate = '2026-08-02T00:00:00';

  const backgroundImageUrl = `${getCloudflareImageBiggest("5aeb6c7e-f6ea-45b1-da4a-823279172400")}&width=2560`

  return (
    <>
      {/* Title section - Scrollable overlay */}
      <div className="relative z-10 bg-slate-900 min-h-screen block">
        <div className="hidden md:block">
          <TitleSection targetDate={targetDate} />
        </div>
        <div className="md:hidden min-h-screen">
          <TitleSectionMobile targetDate={targetDate} />
        </div>
      </div>

      {/* Video background - Fixed underneath */}
      <div className="z-0 block">
        <VideoBackgroundSection />
      </div>

      {/* Title section - Scrollable overlay */}
      {/* <div className="relative z-10 bg-title-section-bg" style={{ minHeight: '100vh' }}>
            <TitleSection />
          </div>
           */}
      {/* Video reveal spacer */}
      {/* <div className="relative z-10" style={{ minHeight: '125vh' }} /> */}

      <div className="relative z-10 bg-slate-900" style={{ pointerEvents: 'auto' }}>

        {/* Full background Sihasan image section with fade transition */}
        <div data-section="sihasan" className="w-screen relative overflow-hidden flex flex-col bg-slate-900" style={{ minHeight: '100vh' }}>
          {/* Top gradient overlay for smooth transition from title */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-700/40 to-transparent z-10 pointer-events-none" style={{ height: '40%' }} />

          {/* Bottom gradient overlay for smooth transition to next section */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-700/40 to-transparent z-10 pointer-events-none" style={{ height: '40%', top: 'auto', bottom: 0 }} />

          {/* Static background image */}
          <img
            src={backgroundImageUrl}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover brightness-115"
            loading="lazy"
            decoding="async"
          />

          {/* Glassmorphic Feature Card */}
          {/* <div className="flex items-end md:items-center justify-center w-full mt-auto relative z-20" style={{ paddingBottom: 'calc(clamp(2.5rem, 8vh, 4rem) + env(safe-area-inset-bottom))' }}>
              <div className="px-4 text-center">
                <h3 className="font-bold leading-[1.4] relative z-10" style={{ color: 'var(--title-section-bg)', fontSize: 'clamp(3rem, 14vw, 12rem)', fontFamily: 'var(--font-gujarati)' }}>સુવર્ણ યુગ નો રજત મહોત્સવ</h3>
              </div>
            </div> */}
        </div>

        {/* Text Sections */}
        <PratisthaStory />


        <div className="bg-main-page-bg">

          {/* Aashirwad Section */}
          <AashirwadSection />

          {/* Staggered Guru Cards */}
          <div className="min-h-screen w-full pb-40 px-4 flex flex-col items-center justify-center">
            <h2 className="section-title">
              Our Beloved Gurus
            </h2>

            {/* Desktop: Staggered layout */}
            <div className="hidden md:flex gap-16 items-end">
              <div className="translate-y-0">
                <GuruCard imageId={gurus[0].imageId} name={gurus[0].name} />
              </div>
              <div className="translate-y-16">
                <GuruCard imageId={gurus[1].imageId} name={gurus[1].name} />
              </div>
              <div className="translate-y-32">
                <GuruCard imageId={gurus[2].imageId} name={gurus[2].name} />
              </div>
            </div>

            {/* Mobile: Stacked list */}
            <div className="md:hidden w-full flex flex-col items-center gap-10 mt-8">
              {gurus.map((guru) => (
                <GuruCard key={guru.name} imageId={guru.imageId} name={guru.name} />
              ))}
            </div>
          </div>

          {/* Video section */}
          <VideoSection />
        </div>
      </div>
    </>
  )
}
