export class AppSuccess {
  constructor(
    public code: string,
    public message: string,
    public status: number,
    public data: any = null
  ) {}
}
