export class Customer {
  id: string;

  name: string;

  lastName: string;

  fullName: string;

  email: string;

  constructor(data?: Partial<Customer>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
