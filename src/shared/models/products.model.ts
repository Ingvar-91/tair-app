class Products {
  constructor(
    public title: string,
    public id: number,
    public images?: string[],
    public text?: string,
    public isDiscount?: boolean,
  ) {}
}
