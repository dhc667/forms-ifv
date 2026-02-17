import { LOGO_SVG } from './Logo';

export const faviconDataUri = `data:image/svg+xml;base64,${btoa(LOGO_SVG)}`;

// Favicon link configurations
export const faviconLinks = [
  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: faviconDataUri,
  },
];
