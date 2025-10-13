"use client";

import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
    {
        title: "How Swaminarayan Bhagwan's Example and Sacred Texts Guide Our Community Service",
        description: "For millions of followers, the life and teachings of Swaminarayan Bhagwan provide a profound blueprint for integrating spirituality and social service. His personal example of selfless service and specific injunctions recorded in sacred texts form the theological bedrock for humanitarian work within the Swaminarayan faith.",
        subtitle: "The Path of Service"
      },
      {
        description: "From a young age, Swaminarayan Bhagwan demonstrated a deep sense of compassion for the needy. During His seven-year pilgrimage as the young ascetic Nilkanth Varni, He encountered a sick sadhu named Sevakram in a remote forest. Despite His own intense austerities, which often left Him fasting, Nilkanth nursed the sadhu back to health for two months, carrying his belongings when he was too weak to walk. This incident, recorded in the Vachanamrut, exemplifies Swaminarayan Bhagwan's attitude of detached compassion—a worldly engagement in the service of others while remaining spiritually disengaged from personal comforts.",
        subtitle: "A Life Dedicated to the Suffering"
      },
      {
        description: "Later, as the leader of the Swaminarayan faith, He continued to prioritize helping those in distress. During the devastating famine of 1812–1813, Swaminarayan Bhagwan organized free food distribution centers across many villages. He personally participated in the relief efforts, and inspired His followers to donate their own grains to the hungry. A hymn written by Premanand Swami shortly after Swaminarayan Bhagwan withdrew His human form captures His compassionate nature:",
        quote: "The master's nature is extremely compassionate, He is deeply moved by the suffering of others",
        subtitle: "Compassion in Action"
      },
      {
        description: "Swaminarayan Bhagwan established a tradition of service through teachings and written commands found in scriptures (shastras) from His lifetime. The Shikshapatri, a code of conduct written by Swaminarayan Bhagwan in 1826, includes directives for community service such as being charitable to the poor (verse 83), serving the ailing (verse 139), establishing educational institutions (verse 132), and providing disaster relief (verse 119).\n\nThe Vachanamrut, a compilation of Swaminarayan Bhagwan's discourses from 1819 to 1829, explains that service for God and His devotees is a spiritual action that constitutes devotion and earns God's grace. The Bhaktachintamani by Nishkulanand Swami also highlights Swaminarayan Bhagwan's compassionate actions and humanitarian efforts.",
        subtitle: "A Scriptural Mandate for Community Service"
      },
      {
        description: "The Swaminarayan faith teaches that following these scriptural commands transforms good deeds into acts of devotion. Swaminarayan Bhagwan taught that meeting basic human needs is necessary for spiritual progress, making community service an essential part of spiritual life.\n\nSwaminarayan Bhagwan's legacy has been carried forward by his spiritual successors—Shree Gopalanand Swami, Shree Nirgundasji Swami, Shree Ishwarcharandasji Swami, Shree Muktajeevan Swamibapa, Shree Purushottampriyadasji Swami and Shree Jitendriyapriyadasji Swami. Today, Shree Jitendriyapriyadasji Swami, the Maninagar Shree Swaminarayan Gadi Sanstan, and its Mandirs across the globe, including Shree Swaminarayan Temple Secaucus, undertake numerous humanitarian projects. In the process, not only are we serving humanity but we are also helping our volunteers progress on their own spiritual journey.",
        subtitle: "Service as a Spiritual Partnership"
      }
];

export function PathOfServiceStory() {
  return (
    <div className="w-full mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <StickyScroll content={content} />
    </div>
  );
}