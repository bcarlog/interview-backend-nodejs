import { CustomersServiceImpl } from '../CustomersServiceImpl';
import { Customer } from '../../domain/Customer';
import { CustomersRepository } from '../../repository/CustomersRepository';

describe('CustomersServiceImpl', () => {
  describe('findByFilter', () => {
    it('should return customers', async () => {
      // Prepare
      const repository = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              fullName: 'fullName',
            },
          ])
        ),
      } as unknown as CustomersRepository;

      const service = new CustomersServiceImpl(repository);

      // Execute
      const response = await service.findByFilter(new Customer({ name: 'A', lastName: 'L' }));

      // Validate
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          fullName: 'fullName',
          email: 'nlastName@ihfintech.com.pe',
        },
      ]);
      expect(repository.findByFilter).toBeCalledWith({
        name: 'A',
        lastName: 'L',
      });
    });
  });
});
