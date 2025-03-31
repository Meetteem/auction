// File: src/app/api/images/route.js

import fs from 'fs';
import path from 'path';

export async function GET() {
  const imagesDir = path.join(process.cwd(), 'public/images');
  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter(file =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );
  return new Response(JSON.stringify(imageFiles), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
