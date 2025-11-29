import { getCloudflareImage } from "@/lib/cdn-assets";

export interface EventPhoto {
  url: string
  caption?: string
}

export interface EventData {
  id: string
  date: string // ISO format: "2025-03-15"
  title: string
  description: string
  tags: string[] // e.g., ["community seva", "religious"]
  youtubeVideoId?: string // YouTube video ID (not full URL)
  photos: EventPhoto[] // Array of photo objects
}

// Helper function for tag colors - using warm orange/red/amber palette
export const tagColors: Record<string, { bg: string; text: string; border: string }> = {
  "community seva": { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300" },
  // "mandir event": { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300" },
  "religious": { bg: "bg-red-100", text: "text-red-700", border: "border-red-300" },
  "cultural": { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-400" },
  "youth event": { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-400" },
}

export const eventsData: EventData[] = [
  {
    id: "1",
    date: "2025-09-27",
    title: "New Jersey Turnpike 5K",
    description: "Members of Shree Swaminarayan Temple Secaucus, NJ participated in the NJ Turnpike 5K as part of the upcoming Celebrations of Shree Swaminarayan Mandir Secaucus, New Jersey Rajat Mahotsav",
    tags: ["community seva"],
    youtubeVideoId: "_sRpl5rM-M8",
    photos: [
      {
        url: getCloudflareImage("944138d2-cc15-45f5-6eec-f4a6a3e30800"),
      },
      {
        url: getCloudflareImage("6716efee-9276-49d0-5567-939256091b00"),
      },
      {
        url: getCloudflareImage("d831cbaa-7951-4e7b-7508-bb4ef78acb00"),
      },
      {
        url: getCloudflareImage("4308a0c3-a63c-40a2-6633-1b2b7a8cfe00"),
      },
      {
        url: getCloudflareImage("39e70434-dba2-4e6f-e23b-6f0d2bdf3500"),
      }
    ]
  },
    {
    id: "2",
    date: "2025-10-18",
    title: "Secaucus Temple Open House & Diwali Celebrations",
    description: "Members of Shree Swaminarayan Temple Secaucus, NJ celebrate Diwali and hold an Open House for the local community. This year's celebrations held many events targetted to our upcoming Rajat Mahotsav including a blood drive to support the community, a Diwali Raffle with all funds going towards helping the community, and the start of new prayer and relgious vows for the new year to help devotees grow spiritually throughout the 25th year anniversary.",
    tags: ["religious", "cultural", "community seva"],
    youtubeVideoId: "EOn8vbNr8MA",
    photos: [
      {
        url: getCloudflareImage("b06f092a-3c85-49dc-0882-3bfd3fa7b300"),
      },
      {
        url: getCloudflareImage("a333cd78-13f4-4db7-63fc-13d627204e00"),
      },
      {
        url: getCloudflareImage("1faf5711-0bd2-4d22-e8be-025cde36bd00"),
      },
      {
        url: getCloudflareImage("dc21bd58-eb3f-4101-3e68-50b23d76d300"),
      },
      {
        url: getCloudflareImage("1ca747bc-1aac-4e47-1211-e3bfd4f03e00"),
      },
      {
        url: getCloudflareImage("0dc5bd0d-ce06-4ce6-ffd9-6ce827a28d00"),
      },
      {
        url: getCloudflareImage("e80793ff-08e1-4d66-1817-cbfad98cdf00"),
      }
    ]
  },
  {
    id: "5",
    date: "2025-10-25",
    title: "CPR Training With Beat to Breathe",
    description: "Every 90 seconds, someone in the United States has a cardiac arrest. Shree Swaminarayan Temple - Secaucus, New Jersey partnered with Beat to Breathe to host a CPR workshop. Fifty volunteers gathered in Shree Muktajeevan Swamibapa Community Hall to learn life saving medical skills. Secaucus Temple looks forward to continuing to host a year of community events, in celebration of our upcoming Rajat Mahotsav • 25th Anniversary!",
    tags: ["youth event", "community seva"],
    youtubeVideoId: "eJPBUDgnb2A",
    photos: [
    ]
  },
  {
    id: "6",
    date: "2025-10-26",
    title: "New York Giants 5K Run",
    description: "Shree Swaminarayan Temple - Secaucus, New Jersey participates in the New York Giants 5k Charitable Walk at Metlife Stadium.",
    tags: ["youth event", "community seva"],
    youtubeVideoId: "n6i-uv-alXk",
    photos: [
      {
        url: getCloudflareImage("a7f8e40b-8ba0-4722-68c2-54bd227ab500"),
        caption: "5k group"
      }
    ]
  },
  {
    id: "7",
    date: "2025-11-01",
    title: "Community Food Bank NJ Volunteering",
    description: "Shree Swaminarayan Temple - Secaucus, New Jersey partnered with the Community Food Bank of NJ to help prepare and package supplies and food for the those in need.",
    tags: ["youth event", "community seva"],
    // youtubeVideoId: "eJPBUDgnb2A",
    photos: [
      {
        url: getCloudflareImage("f15a59ae-28ce-4268-5fe0-67715b18d600"),
      },
      {
        url: getCloudflareImage("edf59daf-b998-43a2-211d-7a88c78e7400"),
      },
      {
        url: getCloudflareImage("9c39145a-bf9d-4e05-04b3-cd2b9d886b00"),
      },
      {
        url: getCloudflareImage("3c5ee780-591e-4f99-f34e-453b459e4900"),
      },
      {
        url: getCloudflareImage("c1749495-1673-491a-f0c7-ae6b1a321800"),
      }
    ]
  },
]
