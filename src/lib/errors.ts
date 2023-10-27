export class ApiError extends Error {
  constructor(message: string, public info: any, public status: number) {
    super(message);
    this.info = info;
    this.status = status;
  }
}
