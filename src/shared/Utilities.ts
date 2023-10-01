export class Utilities {
  static fuzzyMatch(a: string, b: string): boolean {
    return a.toLowerCase().includes(b.toLowerCase()) || b.toLowerCase().includes(a.toLowerCase());
  }
}
