import Link from 'next/link'
import {
  DocumentTextIcon,
  CommandLineIcon,
  Cog8ToothIcon,
} from '@heroicons/react/24/outline'


export const DashboardNav = () => {
  return (
    <nav>
      <ul className="space-y-[6px]">
        <li>
          <Link
            href="/dashboard"
            className="py-2.5 px-4 w-full flex gap-2 items-center border border-[#d0d7de] rounded-md bg-white hover:bg-[#fafafa]"
          >
            <DocumentTextIcon className="w-[22px]" />
            <span className=" inline-block text-sm pb-[1px]">ノート</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/prompt"
            className="py-2.5 px-4 w-full flex gap-2 items-center border border-[#d0d7de] rounded-md bg-white hover:bg-[#fafafa]"
          >
            <CommandLineIcon className="w-[22px]" />
            <span className=" inline-block text-sm pb-[1px]">プロンプト</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard"
            className="py-2.5 px-4 w-full flex gap-2 items-center border border-[#d0d7de] rounded-md bg-white hover:bg-[#fafafa]"
          >
            <Cog8ToothIcon className="w-[22px]" />
            <span className=" inline-block text-sm pb-[1px]">設定</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
