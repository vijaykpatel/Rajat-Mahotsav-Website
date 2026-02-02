export function VideoSchema() {
  const videos = [
    {
      videoId: "6rvGcN4wQCU",
      title: "Rajat Mahotsav Trailer #1",
      description: "Watch the first official trailer for the NJ Rajat Mahotsav 2026 celebration at Shree Swaminarayan Temple Secaucus.",
      uploadDate: "2025-01-01",
    },
    {
      videoId: "d0vT6cSVeCY",
      title: "Rajat Mahotsav Trailer #2",
      description: "Watch the second official trailer for the NJ Rajat Mahotsav 2026 Silver Jubilee celebration.",
      uploadDate: "2025-01-15",
    },
    {
      videoId: "Jq_mvCRivaE",
      title: "Secaucus Temple Drone Footage",
      description: "Aerial drone footage showcasing the beautiful Shree Swaminarayan Temple in Secaucus, New Jersey.",
      uploadDate: "2024-12-15",
    },
  ]

  const videoSchemas = videos.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description,
    "thumbnailUrl": `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`,
    "uploadDate": video.uploadDate,
    "contentUrl": `https://www.youtube.com/watch?v=${video.videoId}`,
    "embedUrl": `https://www.youtube.com/embed/${video.videoId}`,
    "duration": "PT3M",
    "publisher": {
      "@type": "Organization",
      "name": "Shree Swaminarayan Temple Secaucus",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cdn.njrajatmahotsav.com/main_logo.png"
      }
    }
  }))

  return (
    <>
      {videoSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
