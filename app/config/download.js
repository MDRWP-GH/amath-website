/**
 * การตั้งค่าดาวน์โหลด
 *
 * รุ่นปัจจุบันเสิร์ฟจาก public/downloads ของเว็บไซต์โดยตรง
 * ปิดปุ่มดาวน์โหลดได้ด้วย: NEXT_PUBLIC_DOWNLOAD_AVAILABLE=false
 *
 * สำหรับไฟล์ท้องถิ่นตอนพัฒนา (ไม่ใช้ใน production):
 * NEXT_PUBLIC_DOWNLOAD_URL=/downloads/A-Math-Setup-v1.3.2.exe
 */
export const DOWNLOAD_FILENAME = 'A-Math-Setup-v1.3.2.exe';

export const GAME_DOWNLOAD_URL = '/downloads/A-Math-Setup-v1.3.2.exe';

// Production must not silently serve an older installer from a stale Vercel
// environment variable. Keep the override only for local development.
export const DOWNLOAD_URL =
  process.env.NODE_ENV === 'production'
    ? GAME_DOWNLOAD_URL
    : (process.env.NEXT_PUBLIC_DOWNLOAD_URL ?? GAME_DOWNLOAD_URL);

export const DOWNLOAD_LABEL = DOWNLOAD_FILENAME;

/** เปิดเป็น true เมื่อมีไฟล์ติดตั้งพร้อมให้ดาวน์โหลดแล้ว */
export const DOWNLOAD_AVAILABLE =
  process.env.NEXT_PUBLIC_DOWNLOAD_AVAILABLE !== 'false';
