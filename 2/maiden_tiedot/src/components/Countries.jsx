const Countries = ({ countries, selectedCountry }) => {
  console.log(countries);
  console.log(selectedCountry);

  if (selectedCountry) {
    const languages = Object.values(selectedCountry.languages);

    return (
      <div>
        <h1>{selectedCountry.name.common}</h1>
        <div>Capital: {selectedCountry.capital[0]}</div>
        <div>Area: {selectedCountry.area}</div>
        <h4>Languages</h4>
        <ul>
          {languages.map((language, index) => (
            <li key={index}>
              {language}
            </li>
          ))}
        </ul>
        <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} />
      </div>
    );
  }

  if (countries.length < 11) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.name.common}>
            {country.name.common}
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    );
  }
}

export default Countries;
