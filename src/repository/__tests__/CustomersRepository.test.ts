import axios from 'axios';
import { CustomersRepositoryImpl } from '../CustomersRepositoryImpl';
import { Customer } from '../../domain/Customer';
import { customers } from './customers';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CustomersRepositoryImpl', () => {
  describe('findByFilter', () => {
    it('should return customers from random user', async () => {
      const repository = new CustomersRepositoryImpl();

      mockedAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: customers,
        })
      );

      const response = await repository.findByFilter(
        new Customer({
          name: 'B',
        })
      );

      expect(response).toEqual([
        {
          id: '0390511T',
          name: 'brad',
          lastName: 'gibson',
          fullName: 'brad gibson',
        },
      ]);
    });

    it('should return customers from random user with lastname filter', async () => {
      const repository = new CustomersRepositoryImpl();

      mockedAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: customers
        })
      );

      const response = await repository.findByFilter(
        new Customer({
          lastName: 'ucr'
        })
      );

      expect(response).toEqual([
        {
          id: '0390512T',
          name: 'carlos',
          lastName: 'yucra',
          fullName: 'carlos yucra',
        },
      ]);
    });

    it('should return empty array', async () => {
      const repository = new CustomersRepositoryImpl();

      mockedAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: customers
        })
      );

      const response = await repository.findByFilter(
        new Customer({
          lastName: 'johns'
        })
      );

      expect(response).toEqual([]);
    });

    it('should return a customer filtered by name & lastName', async () => {
      const repository = new CustomersRepositoryImpl();

      mockedAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: customers
        })
      );

      const response = await repository.findByFilter(
        new Customer({
          name: 'ar',
          lastName: 'ucr'
        })
      );

      expect(response).toEqual([
        {
          id: '0390512T',
          name: 'carlos',
          lastName: 'yucra',
          fullName: 'carlos yucra',
        }
      ]);
    });
  });
});
