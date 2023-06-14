export async function fetchCars() {
    const headers = {
        'X-RapidAPI-Key': '4141ed5209msh1145f191b8d0fadp15624ejsncf2c4f938822',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response = await fetch("https://cars-by-api-ninjas.p.rapidapi.com/v1/cars", {
        headers: headers,
    });

    const result = await response.json();

    return result;
}
// Utility function to parse & return all the cars from "Cars by API-Ninjas" API