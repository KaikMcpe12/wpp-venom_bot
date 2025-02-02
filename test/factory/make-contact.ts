import { Contact, ContactProps } from '../../src/entities/contact/contact';

type Override = Partial<ContactProps>;

export function makeContact(override: Override = {}) {
  return new Contact({
    name: 'Teste',
    phonenumber: '5511999999999',
    ...override,
  });
}
