import { Service } from 'egg';
import HttpClientProxy from '../base/httpClientProxy';

/**
 * 处理微信消息
 */
export default class WxMsgService extends Service {

    /**
     * 加入活动通知
     * @param openid 
     * @param activityId 
     * @param formid 
     */
    public async joinMessage(openid: string, activityId: number, formid: string) {
        const { ctx, config } = this;

        const access_token = await this.getAccessToken(config, ctx)
        const user = await this.service.datebase.findUserByUserId(openid)
        if (!user) {
            return
        }
        const activity = await this.service.datebase.findActivityById(activityId)
        if (!activity) {
            return
        }
        const owner = await this.service.datebase.findUserByUserId(activity.owner)
        if (!owner) {
            return
        }
        let data = JSON.stringify({
            touser: activity.owner,
            form_id: activity.form_id,
            page: '/pages/activity/detail/index?activityid=' + activity.activity_id,
            data: {
                "keyword1": {
                    "value": activity.activity_name
                },
                "keyword2": {
                    "value": user.user_name
                },
                "keyword3": {
                    "value": activity.start_time
                },
            },
            template_id: "zYrUVL24tk9YMhJ7jMbaSrZdNE5aQfqbFTKDH6yAvd0",
        });
        await new HttpClientProxy<any>('https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send')
            .setUrlParam({ access_token: access_token })
            .setData({ data: data })
            .post(ctx)

        data = JSON.stringify({
            touser: openid,
            form_id: formid,
            page: '/pages/activity/detail/index?activityid=' + activity.activity_id,
            data: {
                "keyword1": {
                    "value": activity.activity_name
                },
                "keyword2": {
                    "value": owner.user_name
                },
                "keyword3": {
                    "value": activity.start_time
                },
                "keyword4": {
                    "value": activity.address
                },
            },
            template_id: "CqbQi_FlwKv9FZ44Vdq7bhHMccNb2VrQBP_bRRSKMi0",
        });
        await new HttpClientProxy<any>('https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send')
            .setUrlParam({ access_token: access_token })
            .setData({ data: data })
            .post(ctx)
    }

    /**
     * 退出活动通知
     * @param openid 
     * @param activityId 
     */
    public async quitMessage(openid: string, activityId: number) {
        const { ctx, config } = this;

        const access_token = await this.getAccessToken(config, ctx)

        const user = await this.service.mysql.login({
            openid: openid
        })
        const activity = await this.service.mysql.findActivityWithId({
            activityId: activityId
        })
        const data = JSON.stringify({
            touser: activity.owner,
            form_id: activity.formid,
            page: '/pages/activity/detail/index?activityid=' + activity.activity_id,
            data: {
                "keyword1": {
                    "value": activity.activity_name
                },
                "keyword2": {
                    "value": user.user_name
                },
                "keyword3": {
                    "value": activity.start_time
                },
            },
            template_id: "zYrUVL24tk9YMhJ7jMbaSrZdNE5aQfqbFTKDH6yAvd0",
        });
        await new HttpClientProxy<any>('https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send')
            .setUrlParam({ access_token: access_token })
            .setData({ data: data })
            .post(ctx)

    }


    private async getAccessToken(config, ctx): Promise<string> {
        let result = await new HttpClientProxy<any>('https://api.weixin.qq.com/cgi-bin/token')
            .setData({
                appid: config.wx.appid,
                secret: config.wx.appsecret,
                grant_type: 'client_credential'
            })
            .get(ctx);
        return result.data.access_token
    }

}


