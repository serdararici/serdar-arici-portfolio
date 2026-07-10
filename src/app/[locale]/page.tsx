import React from 'react'
import HeroSection from '@/components/home/HeroSection'
import { getProfileContent } from '@/lib/queries'

export default async function Home() {
  const profileContent = await getProfileContent();

  return (
    <div>
      <HeroSection profileContent={profileContent} />
    </div>
  );
}
