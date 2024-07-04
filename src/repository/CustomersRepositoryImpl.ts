import axios from 'axios';
import { CustomersRepository } from './CustomersRepository';
import { Customer } from '../domain/Customer';

type RandomUser = {
  id: {
    value: string;
  };
  name: {
    first: string;

    last: string;
  };
};

export class CustomersRepositoryImpl implements CustomersRepository {
  async findByFilter(customer: Customer): Promise<Customer[]> {
    const result = await axios.get('https://randomuser.me/api/?results=100');
    if (!result.data.results) {
      return [];
    }

    return result.data.results
      .filter((item: RandomUser) => {
        let filterName = true
        let filterLast = true
        if (customer.name) {
          filterName = item.name.first.toLowerCase().includes(customer.name.toLowerCase())
        }
        if (customer.lastName) {
          filterLast = item.name.last.toLowerCase().includes(customer.lastName.toLowerCase())
        }
        return filterName && filterLast
      })
      .map(
        (item: RandomUser) =>
          new Customer({
            id: item.id.value,
            name: item.name.first,
            lastName: item.name.last,
            fullName: `${item.name.first} ${item.name.last}`
          })
      );
  }
}
