'use client';

import {
  DOWNLOAD_AVAILABLE,
  DOWNLOAD_URL,
  DOWNLOAD_LABEL,
} from '../config/download';
import { site } from '../content/th';

const WindowsIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    fill={size > 20 ? 'currentColor' : 'none'}
    stroke={size > 20 ? undefined : 'currentColor'}
    strokeWidth={size > 20 ? undefined : 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    {size > 20 ? (
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    ) : (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    )}
  </svg>
);

function scrollToDownloadSection() {
  document.querySelector('#download')?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * @param {'hero' | 'main' | 'nav'} variant
 */
export default function DownloadCta({ variant = 'main', className = '', id, onNavigate }) {
  const { hero, download } = site;

  if (DOWNLOAD_AVAILABLE) {
    const label =
      variant === 'hero' ? hero.downloadCta : variant === 'nav' ? site.nav.download : download.cta;

    return (
      <a
        href={DOWNLOAD_URL}
        className={className}
        id={id}
        download={DOWNLOAD_LABEL}
      >
        <WindowsIcon size={variant === 'main' ? 22 : 20} />
        <span>{label}</span>
      </a>
    );
  }

  if (variant === 'nav') {
    return (
      <a
        href="#download"
        className={className}
        id={id}
        onClick={(e) => {
          e.preventDefault();
          onNavigate?.();
          scrollToDownloadSection();
        }}
      >
        {site.nav.download}
      </a>
    );
  }

  if (variant === 'hero') {
    return (
      <a
        href="#download"
        className={className}
        id={id}
        onClick={(e) => {
          e.preventDefault();
          scrollToDownloadSection();
        }}
      >
        <WindowsIcon size={20} />
        <span>{hero.downloadCtaPending}</span>
      </a>
    );
  }

  return (
    <button type="button" className={`${className} btn-pending`} id={id} disabled>
      <WindowsIcon size={22} />
      {download.ctaPending}
    </button>
  );
}
