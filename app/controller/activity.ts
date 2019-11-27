//import Controller from '../core/BaseController';
import { Controller } from 'egg';
import { Activity } from '../model/activity';
import { UserJoin } from '../model/userJoin';

/**
 * 活动
 */
export default class ActivityController extends Controller {

    /**
     * 创建活动
     */
    async activityCreat() {
        const { ctx } = this;
        const { query } = ctx;

        // 创建活动（兼容以前写的小程序请求）
        const activity = new Activity()
        activity.owner = query.openid
        activity.activity_name = query.name
        activity.activity_content = query.content
        activity.start_time = query.startTime
        activity.end_time = query.endTime
        activity.address = query.address
        activity.latitude = query.latitude
        activity.longitude = query.longitud
        activity.form_id = query.formid
        activity.img_input = query.imgInput
        const dbResult = await this.service.datebase.insertActivity(activity)

        // 自动加入自己创建的活动（在小程序里可以手动退出）
        const userJoin = new UserJoin()
        userJoin.user_id = query.openid
        userJoin.activity_id = dbResult.activity_id
        userJoin.form_id = query.formid
        await this.service.datebase.insertUserJoin(userJoin)

        ctx.body = dbResult
    }

    /**
     * 更新活动
     */
    async activityUpdate() {
        const { ctx } = this;
        const { query } = ctx;

        const activity = new Activity()
        activity.activity_id = query.activityId
        activity.owner = query.openid
        activity.activity_name = query.name
        activity.activity_content = query.content
        activity.start_time = query.startTime
        activity.end_time = query.endTime
        activity.address = query.address
        activity.latitude = query.latitude
        activity.longitude = query.longitud
        activity.form_id = query.formid
        activity.img_input = query.imgInput
        ctx.body = await this.service.datebase.activityUpdate(activity)
    }

    /**
     * 根据id查找活动
     */
    async activityWithId() {
        const { ctx } = this;
        const { query } = ctx;
        ctx.body = await this.service.datebase.findActivityById(query.activityId)
    }

    /**
     * 查找用户创建的活动
     */
    async activityWithUserId() {
        const { ctx } = this;
        const { query } = ctx;
        ctx.body = await this.service.datebase.findActivityByUserId(query.openid)
    }

    /**
     * 删除活动
     */
    async activityDeleteWithId() {
        const { ctx } = this;
        const { query } = ctx;
        ctx.body = await this.service.datebase.deleteActivity(query.activityId)
    }

    /**
     * 加入活动
     */
    async joinActivity() {
        const { ctx, service } = this;
        const { query } = ctx;

        const userJoin = new UserJoin();
        userJoin.user_id = query.openid
        userJoin.activity_id = query.activityId
        userJoin.form_id = query.formid
        userJoin.join_num = query.joinNum
        ctx.body = await service.datebase.insertUserJoin(userJoin)

        service.wxMsg.joinMessage(query.openid, query.activityId, query.formid)
    }

    /**
     * 退出活动
     */
    async quitActivity() {
        const { ctx, service } = this;
        const { query } = ctx;
        ctx.body = await service.datebase.deleteUserJoin(query.activityId, query.openid)
        service.wxMsg.quitMessage(query.openid, query.activityId)
    }

    /**
     * 查找参加的活动
     */
    async findUserJoinActivityWithUserId() {
        const { ctx, service } = this;
        const { query } = ctx;
        const userJoins = await service.datebase.findUserJoinActivityByUserId(query.openid);
        const activityIds = new Array<number>()
        userJoins.forEach(userJoin => {
            activityIds.push(userJoin.activity_id)
        })
        // for (let j = dbResult.length - 1, len = 0; j >= 0; j--) {
        //     activityIds.push(dbResult[j].activity_id)
        // }
        if (activityIds.length > 0) {
            ctx.body = await service.datebase.findActivitysByIds(activityIds);
        } else {
            ctx.body = ""
        }
    }

    /**
     * 查找活动参加的人员
     */
    async findJoinUserWithActivityId() {
        const { ctx, service } = this;
        const { query } = ctx;
        const joinInfos = await service.datebase.findJoinUserByActivityId(query.activityId);
        const userIds = new Array<string>()
        joinInfos.forEach(joinInfo => {
            userIds.push(joinInfo.user_id)
        })
        // for (let j = 0, len = joinInfo.length; j < len; j++) {
        //     userIds.push(joinInfo[j].user_id)
        // }
        if (userIds.length == 0) {
            ctx.body = ""
            return
        }
        const users = await this.service.datebase.findUsersByUserIds(userIds);

        for (let i = 0, len = users.length; i < len; i++) {
            for (let j = 0, len = joinInfos.length; j < len; j++) {
                if (joinInfos[j].user_id === users[i].user_id && joinInfos[j].join_num > 0) {
                    users[i].user_name = users[i].user_name + "(" + joinInfos[j].join_num + "人)"
                    break
                }
            }
        }

        ctx.body = users
    }
}
