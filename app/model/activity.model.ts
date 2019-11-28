import { Column, Model, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';

/**
 * 活动信息
 */
@Table({ tableName: 'activity' })
export default class Activity extends Model<Activity>{
    /**
     * 活动id
     */
    @Column({
        primaryKey: true,
        comment: '活动id',
    })
    activity_id: number;

    @Column({
        comment: '创建者',
    })
    owner: string;

    @Column({
        comment: '活动名称',
    })
    activity_name: string;

    @Column({
        comment: '活动内容',
    })
    activity_content: string;

    @Column({
        comment: '扩展字段',
    })
    activity_ext: string;

    @Column({
        comment: '开始时间',
    })
    start_time: Date;

    @Column({
        comment: '结束时间',
    })
    end_time: Date;

    @Column({
        comment: '地点',
    })
    address: string;

    @Column({
        comment: '纬度',
    })
    latitude: number;

    @Column({
        comment: '经度',
    })
    longitude: number;

    @Column({
        comment: '0：正常，1：关闭',
    })
    state: number;

    @Column({
        comment: 'form_id',
    })
    form_id: string;

    @Column({
        comment: 'img',
    })
    img_input: string;

    @Column({
        comment: 'after_join',
    })
    after_join: string;

    @CreatedAt
    create_time: Date;

    @UpdatedAt
    update_time: Date;
}

