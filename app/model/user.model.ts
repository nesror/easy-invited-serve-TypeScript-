import { Column, Table} from 'sequelize-typescript';
import { BaseModel } from './baseModel';

/**
 * 用户信息
 */
@Table({ tableName: 'user' })
export default class User extends BaseModel<User>{
    /**
     * 用户id
     * TODO primaryKey建议改成自增id
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
}

