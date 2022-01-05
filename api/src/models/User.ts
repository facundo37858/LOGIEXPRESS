import {Model,Column,Table,CreatedAt,UpdatedAt,IsUUID, PrimaryKey} from 'sequelize-typescript'

@Table
export class User extends Model<User>{
    @PrimaryKey
    @Column
    id!:string

    @Column
    identification!:number

    @Column
    zone!:string

    @Column
    phone!:number

    @Column
    photo!:string

    @Column
    account!:string


}