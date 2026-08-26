'use client';

import Anime from './Anime';
import DownloadCta from './DownloadCta';
import { site } from '../content/th';
import { DOWNLOAD_AVAILABLE, DOWNLOAD_LABEL } from '../config/download';

const { download: copy } = site;

export default function Download() {
  return (
    <section className="download" id="download">
      <div className="container">
        <Anime
          as="div"
          className="download-card"
          preset="fadeIn"
          trigger="inView"
          threshold={0.2}
        >
          <span className="section-label">{copy.label}</span>
          <h2 className="section-title">
            {copy.titleBefore}{' '}
            <span className="gradient-text">{copy.titleHighlight}</span>
          </h2>
          <p className="section-subtitle">
            {DOWNLOAD_AVAILABLE ? copy.subtitle : copy.subtitlePending}
          </p>

          {!DOWNLOAD_AVAILABLE && (
            <p className="download-notice" role="status">
              {copy.unavailableNotice}
            </p>
          )}

          <div className="download-actions">
            <DownloadCta variant="main" className="btn btn-primary download-btn-main" id="download-btn-windows" />
            <p className="download-filename">
              {DOWNLOAD_AVAILABLE ? copy.fileHint : copy.fileHintPending}{' '}
              <code>{DOWNLOAD_LABEL}</code>
            </p>
          </div>

          {DOWNLOAD_AVAILABLE && (
            <div className="download-steps">
              <p className="download-steps-title">{copy.installTitle}</p>
              <ol>
                {copy.installSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {DOWNLOAD_AVAILABLE && (
            <p className="download-smartscreen">{copy.smartScreenNote}</p>
          )}

          <div className="download-meta">
            <div className="download-meta-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="4" />
                <path d="M16 2v4a2 2 0 0 0 2 2h4" />
              </svg>
              {copy.meta.platform}
            </div>
            <div className="download-meta-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {copy.meta.modes}
            </div>
            <div className="download-meta-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {copy.meta.safe}
            </div>
          </div>

          <p className="system-req-title">{copy.requirementsTitle}</p>
          <div className="system-req">
            <div className="req-item">
              <div className="req-label">{copy.requirements.os.label}</div>
              <div className="req-value">{copy.requirements.os.value}</div>
            </div>
            <div className="req-item">
              <div className="req-label">{copy.requirements.cpu.label}</div>
              <div className="req-value">{copy.requirements.cpu.value}</div>
            </div>
            <div className="req-item">
              <div className="req-label">{copy.requirements.ram.label}</div>
              <div className="req-value">{copy.requirements.ram.value}</div>
            </div>
            <div className="req-item">
              <div className="req-label">{copy.requirements.network.label}</div>
              <div className="req-value">{copy.requirements.network.value}</div>
            </div>
          </div>
        </Anime>
      </div>
    </section>
  );
}
