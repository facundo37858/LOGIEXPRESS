import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, BelongsTo, PrimaryKey } from 'sequelize-typescript'
import { User_Reg } from './User_Reg'

@Table
export class User extends Model<User>{
    @PrimaryKey
    @Column
    id!: string

    @BelongsTo(() => User_Reg)
    id_user!: User_Reg


    @Column
    identification!: number

    @Column
    zone!: string

    @Column
    phone!: number

    @Column
    photo!: string

    @Column
    account!: string


}