import Image from 'next/image';
import NextLink from 'next/link';

import { Svg } from '@/ui';
import { cn } from '@/lib';

const menu = [
  { name: 'Продавцы', link: '/' },
  {
    name: 'Мои кампании',
    link: '/',
    children: [
      { name: 'Ссылка 1', link: '/' },
      { name: 'Ссылка 2', link: '/' },
    ],
  },
  { name: 'Актуальные ставки', link: '/' },
  {
    name: 'Возможности',
    link: '/',
    children: [{ name: 'Ссылка 1', link: '/' }],
  },
];

export function Header() {
  return (
    <header className="container flex gap-7.5 items-center h-[100px] sm:h-[80px] text-Grey text-sm">
      <NextLink className="hover:opacity-70" href="/">
        <Image src="/logo.svg" width={244} height={28} alt="logo" />
      </NextLink>

      <ul className="flex items-center gap-7.5 xl:hidden">
        {menu.map((item) => (
          <li
            className={cn(item.children && 'dropdown dropdown-hover')}
            key={item.name}
          >
            <NextLink
              className="link-underline flex items-center"
              href={item.link}
            >
              {item.name}
              {item.children && <Svg id="dropdown" width={24} height={24} />}
            </NextLink>
            {item.children && (
              <ul className="dropdown-content pt-3">
                <div className="menu bg-White rounded-md shadow p-2   w-52">
                  {item.children?.map((subItem) => (
                    <li key={subItem.name}>
                      <NextLink href={subItem.link}>{subItem.name}</NextLink>
                    </li>
                  ))}
                </div>
              </ul>
            )}
          </li>
        ))}
      </ul>

      <ul className="flex items-center gap-7.5 ml-auto">
        <li className="sm:hidden">
          <NextLink className="link-underline" href="/">
            Поддержка
          </NextLink>
        </li>
        <li className="sm:hidden">
          <NextLink className="link-underline" href="/">
            Тарифы
          </NextLink>
        </li>
        <li>
          <NextLink href="/">
            <Svg id="bell" width={24} height={24} />
          </NextLink>
        </li>
        <li>
          <NextLink className="flex items-center hover:opacity-75" href="/">
            <Image
              src="/user-avatar.png"
              width={50}
              height={50}
              alt="user avatar"
              priority
            />
            <Svg id="dropdown" width={24} height={24} />
          </NextLink>
        </li>
      </ul>
    </header>
  );
}
