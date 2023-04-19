import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '@supabase/auth-helpers-react'

export const HomeMv = () => {
  const user = useUser()

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div>
        <div className="text-center">
          <Image
            src="/logo.svg"
            alt="Prompt Note"
            width={300}
            height={70}
            className="inline-block"
          />
        </div>
        <p className="mt-6 text-center font-medium text-lg leading-6 ">
          もう手作りノートに悩まない！
          <span className="inline-block">
            PromptNoteで自分流のノートをスマートに作成！
          </span>
        </p>
        <div className="flex mt-12 justify-center gap-5">
          {user ? (
            <Link
              className="w-40 inline-block text-center py-4 px-2 text-sm bg-[#222] text-white rounded hover:bg-[#555]"
              href="/dashboard"
            >
              ダッシュボード
            </Link>
          ) : (
            <Link
              className="w-40 inline-block text-center py-4 px-2 text-sm bg-[#222] text-white rounded hover:bg-[#555]"
              href="/auth/signup"
            >
              サインアップ
            </Link>
          )}
          <Link
            className="w-40 inline-block text-center py-4 px-2 text-sm rounded border border-[#222] bg-white hover:bg-[#eee]"
            href="https://github.com/anji0114/prompt-note"
            target="_blank"
          >
            GitHub
          </Link>
        </div>
      </div>
    </div>
  )
}
