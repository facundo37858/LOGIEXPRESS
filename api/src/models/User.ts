<<<<<<< HEAD

import { Model, Column, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript'

@Table
export class User extends Model<User>{


    @Column
    name!: string

    @Column
    lastName!: string

    @Column
    paswword!: string
=======
import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, BelongsTo, PrimaryKey } from 'sequelize-typescript'
import { User_Reg } from './User_Reg'

@Table
export class User extends Model{
    @PrimaryKey
    @Column
    id!:string

    @Column
    identification!: number

    @Column
    zone!: string

    @Column
    phone!: number
>>>>>>> master

    @Column
<<<<<<< HEAD
    createdAt!: Date

    @UpdatedAt
    @Column
    updatedAt!: Date
=======
    photo!: string

    @Column
    account!: string //Cuenta bancaria 
>>>>>>> master


}