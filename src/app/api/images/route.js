import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const captainsDir = path.resolve('./public/captains');
  const playersDir = path.resolve('./public/players');

  try {
    // Read captain images from "captains" directory
    const captainImages = fs.readdirSync(captainsDir)
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)); // Filter by image file types

    // Read player images from "players" directory
    const playerImages = fs.readdirSync(playersDir)
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)); // Filter by image file types

    // Return both captain and player images
    return NextResponse.json({ captains: captainImages, players: playerImages });
  } catch (error) {
    console.error('Error reading image directories:', error);
    return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
  }
}
