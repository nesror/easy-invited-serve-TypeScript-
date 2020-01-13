import { Model, CreatedAt, UpdatedAt } from 'sequelize-typescript';

/**
 * BaseModel
 */
export class BaseModel<T> extends Model<T> {
    /**
     * 创建时间
     */
    @CreatedAt
    public create_time: Date;

    /**
     * 修改时间
     */
    @UpdatedAt
    public update_time: Date;

}
