"use client";

import { useEffect, useState } from 'react';
import { Hero, CustomFilter, SearchBar, CarCard, ShowMore } from '@/components';
import { fetchCars } from '@/utils';
import { fuels, yearsOfProduction } from '@/constants';
import Image from 'next/image';

export default function Home() {

  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  //search states
  const [manufacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState("");

  //filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(202);

  //pagination states
  const [limit, setLimit] = useState(10);

  const getCars = async () => {

    setLoading(true);

    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });

      setAllCars(result);
    } catch (error) {
     console.log(error);
    } finally {
      setLoading(false);
    }
    
  }

  //calls if any change to fuel, year, limit, manufacturer, model
  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model])
  
  
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
          <SearchBar setManufacturer={setManuFacturer} setModel={setModel}/>

          <div className="home__filer-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel}/>
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear}/>
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car ={car} />
               ))}
            </div>

            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image
                  src="/loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                >
                </Image>
              </div>
            )}
            
            <ShowMore 
              pageNumber={limit /10}
              isNext={limit> allCars.length}
              setLimit={setLimit}
            />
          </section>
          //CarCard component renders if there is data returned. Maps over the cars for each car show the carCard component and pass the car data to it.
        ): (
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
