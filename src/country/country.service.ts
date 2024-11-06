import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CountryService {
  async getCountryInfo(name: string) {
    try {
      // Realiza la solicitud a la API pública de países
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
      const countryData = response.data[0];

      // Extrae los datos necesarios (capital, población, región)
      return {
        name: countryData.name.common,
        capital: countryData.capital[0] || 'No disponible',
        population: countryData.population,
        region: countryData.region,
      };
    } catch (error) {
      throw new HttpException('Country not found', HttpStatus.NOT_FOUND);
    }
  }
}