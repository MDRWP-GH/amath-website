/**
 * การตั้งค่าดาวน์โหลด
 *
 * เมื่อมีไฟล์แล้ว:
 * 1. วาง Setup.exe ที่ public/downloads/Setup.exe
 * 2. สร้าง .env.local แล้วตั้ง NEXT_PUBLIC_DOWNLOAD_AVAILABLE=true
 *
 * ถ้าไฟล์ใหญ่เกินลิมิตโฮสต์ (เช่น GitHub 100MB / Vercel)
 * อัปโหลดไป GitHub Releases แล้วตั้ง:
 * NEXT_PUBLIC_DOWNLOAD_URL=https://github.com/<user>/<repo>/releases/download/v1.0/Setup.exe
 */
export const DOWNLOAD_FILENAME = 'Setup.exe';

export const DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_DOWNLOAD_URL ?? `/downloads/${DOWNLOAD_FILENAME}`;

export const DOWNLOAD_LABEL = DOWNLOAD_FILENAME;

/** เปิดเป็น true เมื่อมีไฟล์ติดตั้งพร้อมให้ดาวน์โหลดแล้ว */
export const DOWNLOAD_AVAILABLE =
  process.env.NEXT_PUBLIC_DOWNLOAD_AVAILABLE === 'true';
