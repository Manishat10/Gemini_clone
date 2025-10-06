const BASE_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,idd';

export const fetchCountries = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    
    // Transform the data to extract country codes
    const countries = data.map(country => {
      // Extract country code from idd object
      let countryCode = '';
      if (country.idd && country.idd.root) {
        const suffixes = country.idd.suffixes || [''];
        countryCode = country.idd.root + (suffixes[0] || '');
      }
      
      return {
        name: country.name.common,
        flag: country.flags?.svg || country.flags?.png || '',
        code: countryCode,
      };
    }).filter(country => country.code); // Filter out countries without codes
    
    // Sort alphabetically by country name
    countries.sort((a, b) => a.name.localeCompare(b.name));
    
    return countries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};