import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, BelongsTo, PrimaryKey } from 'sequelize-typescript'
import { User_Reg } from './User_Reg'

@Table
export class User extends Model {
    @PrimaryKey
    @Column
    id!: string

    @Column
    identification!: number

    @Column 
    zone!: string

    @Column
    phone!: number
 
    @Column
    photo!: string

    @Column
    account!: string //Cuenta bancaria 


}