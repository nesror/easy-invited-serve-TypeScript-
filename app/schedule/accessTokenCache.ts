import { Subscription } from 'egg';
import HttpClientProxy from '../base/httpClientProxy';

export var access_token: string
/**
 * 保存，更新access_token
 */
export default class AccessTokenCache extends Subscription {
  public static get schedule() {
    return {
      interval: '110m',
      type: 'worker',
      immediate: true
    };
  }
  public async subscribe() {
    const { config, app, ctx } = this;
    const { logger } = app;
    const res = await new HttpClientProxy<{ access_token: string, errcode: any }>('https://api.weixin.qq.com/cgi-bin/token')
      .setData({
        appid: config.wx.appid,
        secret: config.wx.appsecret,
        grant_type: 'client_credential'
      })
      .get(ctx)

    if (res.data.errcode) {
      logger.error('access_token_err->', JSON.stringify(res));
    } else {
      app.messenger.sendToApp("access_token", res.data.access_token)
      app.messenger.on("access_token", (data: string) => {
        logger.debug('access_token->', data);
        access_token = data
      });
    }
  }
}