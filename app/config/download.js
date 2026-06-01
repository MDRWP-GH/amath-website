/**
 * การตั้งค่าดาวน์โหลด
 *
 * เมื่อมีไฟล์ .exe แล้ว:
 * 1. วางที่ public/downloads/AmateurMathematician.exe
 * 2. ตั้งใน .env.local: NEXT_PUBLIC_DOWNLOAD_AVAILABLE=true
 */
export const DOWNLOAD_FILENAME = 'AmateurMathematician.exe';

export const DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_DOWNLOAD_URL ?? `/downloads/${DOWNLOAD_FILENAME}`;

export const DOWNLOAD_LABEL = DOWNLOAD_FILENAME;

/** เปิดเป็น true เมื่อมีไฟล์ใน public/downloads/ แล้ว */
export const DOWNLOAD_AVAILABLE =
  process.env.NEXT_PUBLIC_DOWNLOAD_AVAILABLE === 'true';
