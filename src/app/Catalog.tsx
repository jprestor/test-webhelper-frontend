'use client';

import Image from 'next/image';
import { sortedUniq, get } from 'lodash';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { Svg } from '@/ui';
import type { Region, Advert, SubjectPriority } from '@/api';
import { cn } from '../lib';

export function Catalog({
  regions,
  adverts,
  subjectPriorities,
}: {
  regions: Region[];
  adverts: Advert[] | undefined;
  subjectPriorities: SubjectPriority[] | undefined;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputParam = searchParams.get('input');
  const pageParam = searchParams.get('page') || 1;
  const regionParam = searchParams.get('region');
  const pagination = sortedUniq(adverts?.map((i) => i.page));
  const regionsByPage = adverts?.reduce<{ [key: string]: Advert[] }>(
    (acc, item) => {
      const key = String(item.page);
      const prev = get(acc, key, []);
      return { ...acc, [key]: [...prev, item] };
    },
    {},
  );
  const isNoResults = inputParam && !adverts;
  const isNoInput = !inputParam && !adverts;

  const handleRegionSelect = (regionId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('region', String(regionId));
    router.push(`${pathname}?${params}`, { scroll: false });
  };

  const handlePageChange = (num: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(num));
    router.push(`${pathname}?${params}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-[3fr_2fr] gap-5 items-start lg:grid-cols-1">
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2.5">
          {regions.map((i) => (
            <button
              className={cn(
                'rounded border border-[#DDDFE0] transition px-[10px] h-[35px] hover:bg-MainYellow/50',
                regionParam === String(i.id) &&
                  'bg-White border-none pointer-events-none',
              )}
              onClick={() => handleRegionSelect(i.id)}
              key={i.id}
            >
              {i.name}
            </button>
          ))}
        </div>
        <p className="">
          Est ipsum gravida sit non. Mi ac habitasse proin sollicitudin
          malesuada blandit. Arcu turpis cursus imperdiet diam tincidunt augue
          ut. Metus proin vel consectetur ipsum quis amet faucibus mus. Placerat
          cras ac amet dictum. Massa sed cursus dapibus morbi turpis velit id
          mauris at.
        </p>
        {isNoResults && (
          <p className="text-ErrorRed">По данному запросу ничего не найдено</p>
        )}
        {isNoInput && (
          <p className="italic">
            ...Введите название или артикул в поле поиска
          </p>
        )}
        {pageParam && regionsByPage && (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-ContentBlack bg-White rounded border-none">
                  <th className="font-normal text-[12px]">Место</th>
                  <th className="font-normal text-[12px]">Фото</th>
                  <th className="font-normal text-[12px]">Артикул</th>
                  <th className="font-normal text-[12px]">Позиция</th>
                  <th className="font-normal text-[12px]">Ставка</th>
                  <th className="font-normal text-[12px]">Категория</th>
                  <th className="font-normal text-[12px]">Доставка</th>
                </tr>
              </thead>
              <tbody>
                {regionsByPage[pageParam]?.map((i, idx) => (
                  <tr
                    className={cn(
                      'hover:bg-Grey/10 transition',
                      (idx + 1) % 2 === 0 && 'bg-White',
                    )}
                    key={i.advert_id}
                  >
                    <td>{i.position}</td>
                    <td>
                      <Image
                        src={i.image}
                        width={50}
                        height={65}
                        alt="advert photo"
                      />
                    </td>
                    <td>
                      <a className="flex items-center gap-[5px] cursor-pointer text-sm text-InfoBlue">
                        <Svg id="link" width={13} height={12} />
                        <span>{i.article}</span>
                        <Svg id="copy" width={13} height={12} />
                      </a>
                    </td>
                    <td>{i.position}</td>
                    <td>{i.cpm} ₽</td>
                    <td>{i.subject.name}</td>
                    <td>{i.delivery_time} ч</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex gap-5">
          {pagination.map((num) => (
            <button
              className={cn(
                'rounded-[10px] h-[55px] aspect-square border border-[#DDDFE0] hover:bg-MainYellow/50',
                pageParam === String(num) && 'bg-White',
              )}
              onClick={() => handlePageChange(num)}
              key={num}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {subjectPriorities && (
        <div className="flex flex-col gap-5 rounded-[10px] bg-White p-5">
          <h2 className="font-medium">Приоритет категорий</h2>
          <ul className="text-sm">
            {subjectPriorities.map((i, idx) => (
              <li
                className={cn(
                  'flex items-center gap-5 pl-1 min-h-[80px]',
                  (idx + 1) % 2 === 0 &&
                    'rounded-[10px] border border-[#F3F4F5]',
                )}
                key={i.id}
              >
                <span className="w-[50px] text-center">{i.position}</span>
                <span>{i.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
