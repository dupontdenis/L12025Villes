import villes from "./data.js";

// Function to find all unique regions in the villes array
function findUniqueRegions(villes) {
  let regions = [];
  for (const { region } of villes) {
    let exists = false;
    for (const existingRegion of regions) {
      if (existingRegion === region) {
        exists = true;
        break;
      }
    }
    if (!exists) regions.push(region);
  }
  return regions;
}

// Function to find the city with the most habitants in each region
function findMostPopulousPerRegion(villes) {
  let regions = findUniqueRegions(villes);
  let mostPopulous = [];
  for (const region of regions) {
    let maxVille = null;
    for (const ville of villes) {
      if (
        ville.region === region &&
        (!maxVille || ville.habitants > maxVille.habitants)
      ) {
        maxVille = ville;
      }
    }
    if (maxVille) mostPopulous.push(maxVille);
  }
  return mostPopulous;
}

// Example usage: Find the most populous cities in each region
const mostPopulousCities = findMostPopulousPerRegion(villes);
console.log(mostPopulousCities);

// Function to add an attribute to the most populous cities
function markMostPopulousCities(villes, mostPopulousCities) {
  for (const ville of mostPopulousCities) {
    ville.isMostPopulous = true;
  }
}

// Example usage: Mark the most populous cities
markMostPopulousCities(villes, mostPopulousCities);

/**
 * This function transforms the villes array into a new format.
 * It extracts the `name`, `region`, and `isMostPopulous` properties from each city in the array.
 *
 * @param {Array} villes - The array of cities to transform.
 * @returns {Array} - The transformed array with only the specified properties.
 */
function transformVilles(villes) {
  const transformedArray = [];
  for (const { name, region, isMostPopulous } of villes) {
    transformedArray.push({ name, region, isMostPopulous });
  }
  return transformedArray;
}

// Call the function and log the transformed villes
const transformedVilles = transformVilles(villes);
console.log(transformedVilles);

function createRegionHeaders(villes) {
  let headers = "";
  const regions = [...new Set(villes.map((ville) => ville.region))]; // Get unique regions

  for (const region of regions) {
    headers += `<li class="region-header">${region}</li>`;
  }

  return headers;
}

function createCityList(villes) {
  let list = "";
  for (const ville of villes) {
    const isPopulous = ville.isMostPopulous ? "populous" : "";
    list += `<li data-region="${ville.region}" class="${isPopulous}">${ville.name}</li>`;
  }
  return list;
}

// Populate the region headers
const regionHeaders = document.querySelector(".region-headers");
regionHeaders.innerHTML = createRegionHeaders(villes);

// Populate the city list
const cityList = document.querySelector(".city-list");
cityList.innerHTML = createCityList(transformedVilles);
