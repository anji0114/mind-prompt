import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'
import { useRouter } from 'next/router'
import { useStore } from '@/store'

type Props = {
  handleUpdate: () => void
  handleReset: () => void
  prevLink: string
}

export const EditorHeader: FC<Props> = ({
  handleUpdate,
  handleReset,
  prevLink,
}) => {
  const router = useRouter()

  const handleBackButton = async (link: string) => {
    await router.push(link)
    handleReset()
  }

  return (
    <header className="py-5 border-b border-[#d0d7de]">
      <div className="max-w-[1140px] w-full mx-auto px-7">
        <div className="flex items-center justify-between">
          <button
            // href={prevLink}
            onClick={() => handleBackButton(prevLink)}
            className="flex items-center gap-1 hover:opacity-75"
          >
            <ChevronLeftIcon className="w-5" />
            <span className="text-sm font-medium pb-[1px]">前に戻る</span>
          </button>
          <button
            className="py-2 px-8 text-sm font-medium rounded bg-[#222] text-white hover:bg-[#555]"
            onClick={handleUpdate}
          >
            保存する
          </button>
        </div>
      </div>
    </header>
  )
}
