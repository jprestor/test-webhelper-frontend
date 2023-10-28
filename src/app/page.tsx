import { Search } from './Search';
import { Catalog } from './Catalog';
import { fetchAdverts, fetchRegions } from '@/api';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const [adverts, regions] = await Promise.all([
    fetchAdverts(searchParams.input, searchParams.region),
    fetchRegions(),
  ]);

  return (
    <main className="py-10 md:py-4">
      <div className="container">
        <Search />
        <Catalog
          regions={regions}
          adverts={adverts?.bets}
          subjectPriorities={adverts?.subject_priorities}
        />
      </div>
    </main>
  );
}
