export interface ITranslations {
  [key: string]: string | ITranslations | Array<string | ITranslations>;
}
