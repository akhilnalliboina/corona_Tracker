import React, {useState,useEffect} from 'react';
import {MenuItem,FormControl,Select,Card,CardContent} from "@material-ui/core"
import InfoBox from "./InfoBox"
import Map from "./Map"
import './App.css';

function App() {

  const [countries,setCountries]=useState([])
  const [country,setCountry]=useState(["worldwide"])

  useEffect(()=>{
    const getCountriesData= async() =>{
      await fetch("https://disease.sh/v3/covid-19/countries").then((response)=>response.json())
      .then((data)=>{
        const countries= data.map((country)=>({
          name:country.country,
          value:country.countryInfo.iso2
        }));
        setCountries(countries)
      })
    }
getCountriesData()
  },[])

  const selectCountry= async(event)=>{
    const countryCode=event.target.value
    setCountry(countryCode)
  }
  return (
    <div className="App">
      <div className="app_left">
      <div className="app_header">
      <h1>Covid-19 Tracker</h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined" value={country} onChange={selectCountry}>
        <MenuItem value="worldwide">Worldwide</MenuItem>))
          {
            countries.map((country)=>(
              <MenuItem value={country.value}>{country.name}</MenuItem>))
          }
          </Select>
          </FormControl>
      </div>
      <div className="app_stats">
        <InfoBox title="Coronavirus cases" cases={200} total={30} />
        <InfoBox title="Recovered" cases={23} total={523} />
        <InfoBox title= "Deaths" cases={213} total={1234} />
      </div>
      <Map/>
      </div>
      <Card className="app_right">
        <CardContent>
        <h1> Live cases</h1>
        <h1> Chart</h1>

        </CardContent>
      </Card>
      </div>
      
  );
}

export default App;
