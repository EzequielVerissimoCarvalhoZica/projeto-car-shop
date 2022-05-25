export default class HttpException extends Error {
  constructor(private _status: number, private _message: string) {
    super(_message);
  }

  get status() {
    return this._status;
  }

  get message() {
    return this._message;
  }
}
