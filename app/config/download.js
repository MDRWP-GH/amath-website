/**
 * การตั้งค่าดาวน์โหลด
 *
 * ค่าเริ่มต้นชี้ไปที่ GitHub Releases (v1.0 / Setup.exe)
 * ปิดปุ่มดาวน์โหลดได้ด้วย: NEXT_PUBLIC_DOWNLOAD_AVAILABLE=false
 *
 * สำหรับไฟล์ท้องถิ่นตอนพัฒนา:
 * NEXT_PUBLIC_DOWNLOAD_URL=/downloads/Setup.exe
 */
export const DOWNLOAD_FILENAME = 'Setup.exe';

export const GITHUB_RELEASE_DOWNLOAD_URL =
  'https://github.com/MDRWP-GH/amath-website/releases/download/v1.0/Setup.exe';

export const DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_DOWNLOAD_URL ?? GITHUB_RELEASE_DOWNLOAD_URL;

export const DOWNLOAD_LABEL = DOWNLOAD_FILENAME;

/** เปิดเป็น true เมื่อมีไฟล์ติดตั้งพร้อมให้ดาวน์โหลดแล้ว */
export const DOWNLOAD_AVAILABLE =
  process.env.NEXT_PUBLIC_DOWNLOAD_AVAILABLE !== 'false';
