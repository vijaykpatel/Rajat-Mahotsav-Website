// Cloudflare R2 CDN URLs
// Replace YOUR_R2_URL with your actual R2 public URL (e.g., https://pub-xxxxx.r2.dev)
const CDN_BASE_URL = 'https://cdn.njrajatmahotsav.com'

export const CDN_ASSETS = {
  // Logos
  mainLogo: `${CDN_BASE_URL}/main_logo.png`,
  mainLogoNoText: `${CDN_BASE_URL}/main_logo_no_text.png`,
  maningarLogo: `${CDN_BASE_URL}/maninagar_logo.png`,
  whiteLogo: `${CDN_BASE_URL}/white_logo.png`,
  linenLogo: `${CDN_BASE_URL}/LinenLogo.png`,
  
  // Icons
  instagramIcon: `${CDN_BASE_URL}/Instagram_Glyph_Gradient.png`,
  youtubeIcon: `${CDN_BASE_URL}/youtube_red_icon.png`,
  tilak: `${CDN_BASE_URL}/Tilak.png`,
}

const CLOUDFLARE_IMAGES_BASE = 'https://imagedelivery.net/vdFY6FzpM3Q9zi31qlYmGA/'

export const getCommunityServiceImage = (filename: string) => 
  `${CDN_BASE_URL}/community_service/${filename}`

export const getCloudflareImage = (imageId: string) => 
  `${CLOUDFLARE_IMAGES_BASE}${imageId}/bigger?format=auto&quality=90`

export const getCloudflareImageBiggest = (imageId: string) => 
  `${CLOUDFLARE_IMAGES_BASE}${imageId}/biggest?format=auto&quality=100`
