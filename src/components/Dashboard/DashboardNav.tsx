import Link from 'next/link'
import {
  DocumentTextIcon,
  CommandLineIcon,
  Cog8ToothIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'

const NAV_ITEM = [
  {
    title: 'ノート',
    href: '/dashboard',
    icon: <DocumentTextIcon className="w-[22px]" />,
  },
  {
    title: 'テンプレート',
    href: '/dashboard/template',
    icon: <SquaresPlusIcon className="w-[22px]" />,
  },
  {
    title: 'プロンプト',
    href: '/dashboard/prompt',
    icon: <CommandLineIcon className="w-[22px]" />,
  },
]

export const DashboardNav = () => {
  return (
    <nav>
      <ul className="space-y-[6px]">
        {NAV_ITEM.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className="py-2.5 px-4 w-full flex gap-2 items-center border border-[#d0d7de] rounded-md bg-white hover:bg-[#fafafa]"
            >
              {item.icon}
              <span className=" inline-block text-sm pb-[1px]">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
