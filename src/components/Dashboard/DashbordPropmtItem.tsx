import { FC, useState } from 'react'
import Link from 'next/link'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { ListBulletIcon } from '@heroicons/react/24/solid'

type Props = {
  id: string
  title: string
  content: string
}

export const PromptItem: FC<Props> = ({ id, title, content }) => {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleDeleteNote = async (id: string) => {
    const { error } = await supabase.from('prompts').delete().eq('id', id)
    if (error) {
      alert(error.message)
      return
    }
    router.reload()
  }

  return (
    <li className="dashboard-item02 flex gap-5 justify-between items-start py-5 px-7 bg-white border border-[#d0d7de]">
      <div className="w-full">
        <p className="text-[#555] text-[12px]">2022.01.01</p>
        <p className="mt-2">
          <Link
            href={`/prompt/${id}`}
            className="text-[#4e6bb4] text-sm font-medium underline-offset-2  hover:underline"
          >
            {title}
          </Link>
        </p>
        <p className="mt-2 text-[12px] text-[#444]">
          インスピレーションを磨く、アイデアを育てるためのノートです。
        </p>
      </div>
      <div className="w-[40px] relative">
        <button
          className={`w-full inline-block text-center h-[30px] pb-1 border border-[#d0d7de] rounded-md hover:bg-[#f7fafd] ${
            menuOpen ? 'bg-[#f7fafd]' : 'bg-white'
          }`}
          onClick={() => setMenuOpen((prevState) => !prevState)}
        >
          <ListBulletIcon className=" inline-block w-5" />
        </button>
        <ul className={`menu-ist ${menuOpen ? 'is--open' : 'is--close'}`}>
          <li className="w-full text-center border-t border-[#ebeef2]">
            <Link
              href={`/prompt/${id}`}
              className="inline-block w-full p-2.5 text-[12px] font-medium hover:bg-[#f7f7f7]"
            >
              編集する
            </Link>
          </li>
          <li className="w-full text-center border-t border-[#ebeef2]">
            <button
              className="inline-block w-full p-2.5 text-[12px] font-medium text-[#de6868] hover:bg-[#fff4f4]"
              onClick={() => handleDeleteNote(id)}
            >
              削除する
            </button>
          </li>
        </ul>
      </div>
    </li>
  )
}
