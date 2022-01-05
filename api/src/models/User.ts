import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, BelongsTo } from 'sequelize-typescript'
import { User_Reg } from './User_Reg'

@Table
export class User extends Model<User>{

    @IsUUID(4)
    @Column({ primaryKey: true })
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