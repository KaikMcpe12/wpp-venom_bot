export class PhoneFormatterVenom {
  public static format(numberPhone: string) {
    if (!numberPhone.endsWith('@c.us')) {
      return `${numberPhone}@c.us`
    }

    return numberPhone
  }

  public static unformat(numberPhone: string) {
    if (numberPhone.endsWith('@c.us')) {
      return numberPhone.replace('@c.us', '')
    }

    return numberPhone
  }
}
