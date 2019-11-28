import { Service } from 'egg'
import User from '../model/user.model';
import { Jscode2session } from '../model/jscode2session';
import Activity from '../model/activity.model';
import UserJoin from '../model/userJoin.model';
import { Op } from 'sequelize';

/**
 * DatebaseService
 */
export default class DatebaseService extends Service {

  async findUserByUserId(openId: string): Promise<User | null> {
    return await User.findByPk(openId)
  }

  async findUsersByUserIds(openIds: string[]): Promise<User[]> {
    return await User.findAll({
      where: {
        user_id: {
          [Op.in]: openIds
        }
      }
    })
  }

  async findAllUsers(pageNum: number, limit = 20): Promise<User[]> {
    return await User.findAll({
      limit: limit,
      offset: limit * pageNum
    })
  }

  async insertUser(user: User): Promise<User> {
    return await user.save()
  }

  async insertOrUpdateUserByJscode2session(jscode2session: Jscode2session): Promise<User> {
    const user = await this.findUserByUserId(jscode2session.openid)
    if (user) {
      user.session_key = jscode2session.session_key
      return await user.save()
    } else {
      return await User.build({
        wx_openid: jscode2session.openid,
        user_id: jscode2session.openid,
        session_key: jscode2session.session_key
      }).save()
    }
  }

  async updateUser(user: User): Promise<[number, User[]]> {
    return await User.update({
      user_name: user.user_name,
      phone: user.phone,
      user_img: user.user_img,
    },
      {
        where: {
          user_id: user.user_id
        }
      })

  }

  async insertActivity(activity: Activity): Promise<Activity> {
    return await activity.save();
  }

  async activityUpdate(activity: Activity): Promise<[number, Activity[]]> {
    return await Activity.update(activity, {
      where: {
        activity_id: activity.activity_id,
        owner: activity.owner,
      }
    })
  }

  async findActivityById(activityId: number): Promise<Activity | null> {
    return Activity.findByPk(activityId)
  }

  async findActivityByUserId(owner: string, pageNum = 0, limit = 100): Promise<Activity[]> {
    return await Activity.findAll({
      where: {
        owner: owner
      },
      order: [['update_time', 'desc']],
      offset: limit * pageNum,
      limit: limit
    })
  }

  async findActivitysByIds(activityIds: number[]): Promise<Activity[]> {
    return await Activity.findAll({
      where: {
        activity_id: {
          [Op.in]: activityIds
        }
      }
    })
  }

  async findAllActivitys(pageNum: number, limit = 20): Promise<Activity[]> {
    return await Activity.findAll({
      order: [['update_time', 'desc']],
      limit: limit,
      offset: limit * pageNum,
    })
  }

  async deleteActivity(activityId: number): Promise<number> {
    return await Activity.destroy({
      where: {
        activity_id: activityId
      }
    })
  }

  async findUserJoinActivityByUserId(user_id: string, pageNum = 0, limit = 100): Promise<UserJoin[]> {
    return await UserJoin.findAll({
      where: {
        user_id: user_id
      },
      offset: limit * pageNum,
      limit: limit
    })
  }

  async findJoinUserByActivityId(activityId: number): Promise<UserJoin[]> {
    return await UserJoin.findAll({
      where: {
        activity_id: activityId
      }
    })
  }

  async insertUserJoin(userJoin: UserJoin): Promise<UserJoin> {
    return userJoin.save();
  }

  async deleteUserJoin(activityId: number, userId: string): Promise<number> {
    return await UserJoin.destroy({
      where: {
        activity_id: activityId,
        user_id: userId,
      }
    })
  }
}