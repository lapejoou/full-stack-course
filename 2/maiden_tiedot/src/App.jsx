import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (filter) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const filteredCountries = response.data.filter(country =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
          );
          setCountries(filteredCountries);
          if (filteredCountries.length === 1) {
            setSelectedCountry(filteredCountries[0]);
          } else {
            setSelectedCountry(null);
          }
        })
        .catch(error => {
          console.error('Error fetching countries:', error);
        });
    }
  }, [filter]);

  const handleCountryChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <form>
        <div>
          find countries: 
          <input value={filter}
          onChange={handleCountryChange}
        />
        </div>
      </form>
      <Countries countries = {countries} selectedCountry = {selectedCountry} setSelectedCountry = {setSelectedCountry} />
    </div>
  )
}

export default App
