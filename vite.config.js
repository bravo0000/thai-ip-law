import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function savePillarDataPlugin() {
  return {
    name: 'save-pillar-data-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-pillar-data', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { categoryId, categoryData, allCategories } = JSON.parse(body);
              const dataDir = path.resolve(__dirname, 'src/data');

              const q1 = (allCategories && allCategories.find(c => c.id === 'q1')) || (categoryId === 'q1' ? categoryData : null);
              const q2 = (allCategories && allCategories.find(c => c.id === 'q2')) || (categoryId === 'q2' ? categoryData : null);
              const q3 = (allCategories && allCategories.find(c => c.id === 'q3')) || (categoryId === 'q3' ? categoryData : null);

              // Update trademarkData.js if q3 was updated or provided
              if (categoryId === 'q3' || categoryId === 'all') {
                const targetQ3 = categoryId === 'q3' ? categoryData : q3;
                if (targetQ3) {
                  const trademarkFilePath = path.join(dataDir, 'trademarkData.js');
                  const tmContent = `/**
 * ข้อมูลกฎหมายเครื่องหมายการค้าไทยสำหรับการเตรียมสอบ (พ.ร.บ. เครื่องหมายการค้า พ.ศ. 2534 แก้ไขเพิ่มเติม)
 * เฉพาะมาตราที่กำหนดสอบ 26 ก.ย. 69
 * ข้อ 3: เครื่องหมายการค้า (ม. 6, 7, 8, 13, 44, 46, 61, 67)
 */

export const trademarkCategory = ${JSON.stringify(targetQ3, null, 2)};
`;
                  fs.writeFileSync(trademarkFilePath, tmContent, 'utf-8');
                }
              }

              // Update patentData.js if q1 or q2 was updated
              if (categoryId === 'q1' || categoryId === 'q2' || categoryId === 'all') {
                if (q1 && q2) {
                  const patentFilePath = path.join(dataDir, 'patentData.js');
                  const ptContent = `/**
 * ข้อมูลกฎหมายสิทธิบัตรไทยสำหรับการเตรียมสอบ (พ.ร.บ. สิทธิบัตร พ.ศ. 2522 แก้ไขเพิ่มเติม)
 * เฉพาะมาตราที่กำหนดสอบ 26 ก.ย. 69
 * ข้อ 1: สิทธิบัตรการประดิษฐ์ (ม. 5, 6, 7, 8, 28, 31, 35 ทวิ, 36, 54)
 * ข้อ 2: สิทธิบัตรการออกแบบผลิตภัณฑ์ & สัญญาจ้าง (ม. 10, 11, 31, 56, 57, 58, 65)
 */

import { trademarkCategory } from './trademarkData';

export const patentCategories = [
  ${JSON.stringify(q1, null, 2)},
  ${JSON.stringify(q2, null, 2)},
  trademarkCategory
];
`;
                  fs.writeFileSync(patentFilePath, ptContent, 'utf-8');
                }
              }

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ 
                success: true, 
                message: 'บันทึกข้อมูลลงไฟล์โค้ดสำเร็จเรียบร้อยแล้ว' 
              }));
            } catch (err) {
              console.error('Save to file error:', err);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), savePillarDataPlugin()],
  base: './',
})

