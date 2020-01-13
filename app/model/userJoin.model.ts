import { Column, Table, ForeignKey } from 'sequelize-typescript';
import User from './user.model';
import Activity from './activity.model';
import { BaseModel } from './baseModel';

/**
 * 用户活动信息
 */
@Table({ tableName: 'user_join' })
export default class UserJoin extends BaseModel<UserJoin>{

    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    name: string;

    /**
     * 用户id
     */
    @ForeignKey(() => User)
    @Column
    user_id: string;

    /**
     * 活动id
     */
    @ForeignKey(() => Activity)
    @Column
    activity_id: number;

    @Column
    form_id: string;

    @Column({
        comment: '备注信息',
    })
    remark: string;

    @Column({
        comment: '参加人数',
    })
    join_num: number;
}

