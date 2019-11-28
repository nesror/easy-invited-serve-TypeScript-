//import Controller from '../core/BaseController';
import { Controller } from 'egg';
import { Jscode2session } from '../model/jscode2session';
import HttpClientProxy from '../base/httpClientProxy';
import User from '../model/user.model';

/**
 * 用户信息
 */
export default class UserController extends Controller {

    /**
     * 用户登陆
     */
    public async login() {
        const { ctx, config, logger, service } = this;
        const res = await new HttpClientProxy<Jscode2session>('https://api.weixin.qq.com/sns/jscode2session')
            .setData({
                appid: config.wx.appid,
                secret: config.wx.appsecret,
                js_code: ctx.query.code,
                grant_type: 'authorization_code'
            })
            .get(ctx)
        logger.info("login->" + JSON.stringify(res))
        ctx.body = await service.datebase.insertOrUpdateUserByJscode2session(res.data)
    }

    /**
     * 更新（完善）用户信息
     */
    async userUpdate() {
        const { ctx, service } = this;
        const { query } = ctx;
        const user = new User()
        user.user_id = query.openid
        user.user_name = query.name
        user.phone = query.phone
        user.user_img = query.img
        ctx.body = await service.datebase.updateUser(user)
    }

}
