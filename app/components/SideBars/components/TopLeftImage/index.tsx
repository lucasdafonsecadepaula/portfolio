'use client'
import profilePic from '@/app/assets/imgs/me.png'
import Image from 'next/image'
import Link from 'next/link'

export function TopLeftImage() {
  return (
    <div>
      <div className="rounded-full border-[5px] border-primary-350 overflow-hidden h-16 w-16">
        <Link href={'/'}>
          <Image src={profilePic} width={68} height={68} alt="Image of Nandi" />
        </Link>
      </div>
    </div>
  )
}
