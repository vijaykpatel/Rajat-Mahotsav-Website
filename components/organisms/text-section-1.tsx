"use client"

import { StickyScroll } from "@/components/organisms/sticky-scroll-reveal"
import { getR2Image } from "@/lib/cdn-assets"

const content = [
  {
    title: "In August 2001",
    description:
      "History was made and forever forged in gold. During the installation of the divine murtis of Lord Shree Swaminarayan, Jeevanpran Shree Abji Bapashree, and Jeevanpran Shree Muktajeevan Swamibapa at Shree Swaminarayan Temple in Secaucus, New Jersey, the first shikhar-bandh mandir of Maninagar Shree Swaminarayan Gadi Sansthan in North America.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src={getR2Image("/main/gold_tula_hugging.JPG")}
          className="h-full w-full object-cover rounded-2xl"
          alt="Gold Tula Ceremony"
        />
      </div>
    ),
  },
  {
    title: "750 Kilograms of Pure Gold",
    description:
      "Our beloved Prem Murti Acharya Shree Purushottampriya Swamishree Maharaj weighed all three divine idols with 750 kilograms of pure gold. This Suvarna Tula during the Murti Pratishtha Mahotsav of Shree Swaminarayan Temple - Secaucus, New Jersey, was a magnificent ceremony witnessed by thousands.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src={getR2Image("/main/golden_tula_sants.JPG")}
          className="h-full w-full object-cover rounded-2xl"
          alt="Golden Tula with Sants"
        />
      </div>
    ),
  },
  {
    title: "A Historic Moment",
    description:
      "This was the first time such a magnificent ceremony was ever done, and it was the last time such a magnificent ceremony would ever be witnessed. The Suvarna Tula remains a testament to the devotion and dedication of our beloved Acharya Swamishree Maharaj and the entire Swaminarayan community.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src={getR2Image("/main/gold_tula_placing.JPG")}
          className="h-full w-full object-cover rounded-2xl"
          alt="Gold Tula Placing"
        />
      </div>
    ),
  },
]

export default function TextSection1() {
  return (
    <div className="w-full">
      <StickyScroll content={content} />
    </div>
  )
}
