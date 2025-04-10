export class PhoneFormatterVenom {
  public static format(phoneNumber: string | number) {
    const phoneStr = String(phoneNumber)

    if (!phoneStr.endsWith('@c.us')) {
      return `${phoneStr}@c.us`
    }

    return phoneStr
  }

  public static unformat(phoneNumber: string) {
    if (phoneNumber.endsWith('@c.us')) {
      return phoneNumber.replace('@c.us', '')
    }

    return phoneNumber
  }
}
