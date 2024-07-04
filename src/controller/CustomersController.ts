import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersService } from '../service/CustomersService';
import { Customer } from '../domain/Customer';

export class CustomersController {
  constructor(private service: CustomersService) {}

  async findByFilter(event: APIGatewayProxyEvent) {
    const name = event.queryStringParameters?.name;
    const lastName = event.queryStringParameters?.lastName;

    return this.apiResponseOk(
      await this.service.findByFilter(new Customer({ name, lastName }))
    );
  }

  apiResponseOk(customers: Customer[]) {
    return {
      statusCode: 200,
      isBase64Encoded: false,
      body: JSON.stringify(customers),
    };
  }
}
