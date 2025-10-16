declare module "opencc-js" {
  type ConverterOptions = { from: string; to: string };
  interface Converter {
    (text: string): string;
    convert: (text: string) => string;
    convertPromise?: (text: string) => Promise<string>;
  }

  export function Converter(options: ConverterOptions): Converter;
  const OpenCC: { Converter: typeof Converter };
  export default OpenCC;
}
