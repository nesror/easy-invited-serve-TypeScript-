import { Controller } from 'egg';
export default class BaseController extends Controller {
  success(data: any) {
    this.ctx.body = {
      success: true,
      data,
    };
  }

  notFound(msg: any) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}