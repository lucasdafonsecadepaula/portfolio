'use client'
import Image, { type StaticImageData } from 'next/image'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export function AnimatedGrid({
  rows,
}: {
  rows: { src: StaticImageData; id: number; className: string }[][]
}) {
  const [expandedIndex, setExpandedIndex] = useState({
    col: null as null | number,
    row: null as null | number,
  })

  const handleMouseEnter = (rowIndex: number, colIndex: number) => () => {
    setExpandedIndex({
      col: colIndex,
      row: rowIndex,
    })
  }

  const handleMouseLeave = () => {
    setExpandedIndex({
      col: null,
      row: null,
    })
  }

  function getSpan(rowIndex: number, colIndex: number) {
    if (expandedIndex.col === null && expandedIndex.row === null) {
      return 'w-[calc(50%)] h-[calc(50%)]'
    }

    if (expandedIndex.row !== rowIndex) {
      return 'w-[calc(50%)] h-[calc(25%)]'
    }

    if (expandedIndex.row === rowIndex && expandedIndex.col !== colIndex) {
      return 'w-[calc(25%)] h-[calc(75%)]'
    }

    return 'w-[calc(75%)] h-[calc(75%)]'
  }

  return (
    <div>
      <div
        className={twMerge(
          'flex flex-wrap transition-all duration-1000 ease-in-out',
          rows.length === 1
            ? 'h-[10rem] md:h-[13rem] lg:h-[15rem]'
            : 'h-[20rem] md:h-[25rem] lg:h-[30rem]',
        )}
      >
        {rows.map((cols, rowIndex) => {
          return cols.map((item, colIndex) => (
            <>
              <div
                key={item.id}
                className={twMerge(
                  'p-2 h-full w-full transition-all duration-300 ease-in-out',
                  item.className,
                  getSpan(rowIndex, colIndex),
                )}
              >
                <div className="relative rounded-lg h-full w-full transition-all duration-300 ease-in-out">
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    className={twMerge(
                      'rounded-lg h-full w-full transition-all duration-300 ease-in-out',
                      item.className,
                      getSpan(rowIndex, colIndex),
                    )}
                    onMouseEnter={handleMouseEnter(rowIndex, colIndex)}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
              </div>
            </>
          ))
        })}
      </div>
    </div>
  )
}
