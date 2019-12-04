import { Service } from 'egg';
import HttpClientProxy from '../base/httpClientProxy';
import { access_token } from '../schedule/accessTokenCache';

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
        const { ctx } = this;

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
            .setData(data)
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
            .setData(data)
            .post(ctx)
    }

    /**
     * 退出活动通知
     * @param openid 
     * @param activityId 
     */
    public async quitMessage(openid: string, activityId: number) {
        const { ctx } = this;

        const user = await this.service.datebase.findUserByUserId(openid)
        if (!user) {
            return
        }
        const activity = await this.service.datebase.findActivityById(activityId)
        if (!activity) {
            return
        }
        const data = JSON.stringify({
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
            .setData(data)
            .post(ctx)

    }

}


