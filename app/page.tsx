import Image from 'next/image';

import { Hero, CustomFilter, SearchBar, CarCard } from '@/components';
import { fetchCars } from '@/utils';
import { fuels, yearsOfProduction } from '@/constants';

export default async function Home({ searchParams }) {

  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });
  
  const isDataEmpty = !Array.isArray(allCars) || allCars.length <1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore other cars you may like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filer-container">
            <CustomFilter title="fuel" options={fuels}/>
            <CustomFilter title="year" options={yearsOfProduction}/>
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car ={car} />
               ))}
            </div>
          </section>
          //CarCard component renders if there is data returned. Maps over the cars for each car show the carCard component and pass the car data to it.
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
          //Error container shows if data is empty on search
        )}

      </div>
    </main>
  )
}
