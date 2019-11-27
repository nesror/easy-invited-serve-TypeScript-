import { Column, Model, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';

/**
 * 用户信息
 */
@Table({ tableName: 'user' })
export class User extends Model<User>{
    /**
     * 用户id
     */
    @Column({
        primaryKey: true,
        comment: '用户id',
    })
    user_id: string;

    @Column
    user_name: string;

    @Column
    user_password: string;

    @Column
    session_key: string;

    @Column
    wx_openid: string;

    @Column
    user_img: string;

    @Column
    phone: string;

    @CreatedAt
    create_time: Date;

    @UpdatedAt
    update_time: Date;
}

