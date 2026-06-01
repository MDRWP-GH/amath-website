import './globals.css';
import { site } from './content/th';

export const metadata = {
  title: site.metadata.title,
  description: site.metadata.description,
  keywords: site.metadata.keywords,
  openGraph: {
    title: site.metadata.title,
    description: site.metadata.ogDescription,
    type: 'website',
    locale: 'th_TH',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
