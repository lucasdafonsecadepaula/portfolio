/* eslint-disable camelcase */
import { unstable_setRequestLocale } from 'next-intl/server'
import article1Img from '@/src/assets/imgs/article-01.jpg'
import article2Img from '@/src/assets/imgs/article-02.jpg'
import Image from 'next/image'
import { Link } from '@/src/i18n/routing'

type Props = {
  params: { locale: string }
}

const articles = [
  {
    path: '/' as const,
    title: 'Leetcode',
    description: 'solving leetcode problems',
    img: article1Img,
  },
  {
    path: '/articles/flash-cards-dsa' as const,
    title: 'Flashcards Datastructure e Algorithms',
    description: 'solving leetcode problems',
    img: article2Img,
  },
]

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale)

  return (
    <div className="w-full flex flex-col">
      <div className="2xl:px-[8vw] text-primary-900 mb-16">
        <h1 className="text-3xl font-bold py-8 pl-4">Articles</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art) => (
            <Link key={art.title} href={art.path}>
              <div className="hover:scale-105 h-full transition-all duration-500 flex flex-col rounded-xl bg-primary-100 text-card-foreground shadow">
                <div className="flex flex-col">
                  <Image
                    src={art.img}
                    alt="banner"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                <div className="flex-grow p-6 pt-4">
                  <p className="text-xl mb-4 font-semibold tracking-tight leading-1">
                    {art.title}
                  </p>
                  <p className="text-muted-foreground text-sm text-muted-foreground">
                    {art.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
