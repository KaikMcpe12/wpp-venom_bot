import { randomInt } from 'crypto';
import { Contact, ContactProps } from '../../src/entities/contact/contact';

type Override = Partial<ContactProps>;

export function makeContact(override: Override = {}) {
  return new Contact({
    name: 'Teste',
    phonenumber: randomInt(1000000000, 9999999999).toString(10),
    ...override,
  });
}
