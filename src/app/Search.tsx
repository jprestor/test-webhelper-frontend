'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { Button, Svg } from '@/ui';

export function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputParam = searchParams.get('input');
  const [term, setTerm] = useState(inputParam || '');

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set('input', term);
    router.push(`${pathname}?${params}`);
  };

  return (
    <div className="rounded-[20px] bg-White p-5 mb-5">
      <h2 className="mb-[10px] text-2xl font-medium">Актуальные ставки</h2>
      <div className="flex gap-5 items-center md:flex-col">
        <select
          className="select bg-[#ECF1F7] h-[55px] w-full max-w-[224px] rounded md:max-w-full"
          defaultValue="Поиск"
        >
          <option>Поиск</option>
        </select>
        <label className="relative grow md:w-full">
          <input
            className="flex items-center w-full h-[55px] pl-2.5 pr-10 border-b border-Grey bg-White focus:border-MainYellow bg-white placeholder:text-Grey placeholder:text-base outline-none"
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Поиск по названию или артикулу"
          />
          <Svg
            className="absolute top-1/2 -translate-y-1/2 right-2.5"
            id="search"
            width={24}
            height={24}
          />
        </label>
        <Button
          className="w-full max-w-[224px] md:max-w-full"
          onClick={handleSearch}
        >
          Найти
        </Button>
      </div>
    </div>
  );
}
