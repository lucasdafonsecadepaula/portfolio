import profilePic from '@/src/assets/imgs/me.png'
import Image, { type ImageProps } from 'next/image'

export function MyImage({ ...rest }: Omit<ImageProps, 'src' | 'alt'>) {
  return (
    <Image
      {...rest}
      src={profilePic}
      alt="Foto de Lucas de Paula"
      sizes="100%"
      style={{ objectFit: 'cover', borderRadius: '10px' }}
    />
  )
}
