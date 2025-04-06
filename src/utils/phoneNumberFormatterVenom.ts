export class PhoneFormatterVenom {
  public static format(numberPhone: string | number) {
    const phoneStr = String(numberPhone)

    if (!phoneStr.endsWith('@c.us')) {
      return `${phoneStr}@c.us`
    }

    return phoneStr
  }

  public static unformat(numberPhone: string) {
    if (numberPhone.endsWith('@c.us')) {
      return numberPhone.replace('@c.us', '')
    }

    return numberPhone
  }
}
