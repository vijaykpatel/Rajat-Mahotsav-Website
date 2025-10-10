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

// Legacy path mapping (for easy migration)
export const ASSET_PATHS = {
  '/main_logo.png': CDN_ASSETS.mainLogo,
  '/main_logo_no_text.png': CDN_ASSETS.mainLogoNoText,
  '/maninagar_logo.png': CDN_ASSETS.maningarLogo,
  '/white_logo.png': CDN_ASSETS.whiteLogo,
  '/LinenLogo.png': CDN_ASSETS.linenLogo,
  '/Instagram_Glyph_Gradient.png': CDN_ASSETS.instagramIcon,
  '/youtube_red_icon.png': CDN_ASSETS.youtubeIcon,
  '/Tilak.png': CDN_ASSETS.tilak,
}
