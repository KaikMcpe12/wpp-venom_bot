export function sanitizePhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\s/g, '')
}
