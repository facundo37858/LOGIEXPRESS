import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, BelongsTo, PrimaryKey, ForeignKey, HasMany } from 'sequelize-typescript'
import { Travel } from './Travel'
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
    photo!: string

    @Column
    account!: string //Cuenta bancaria 

    @BelongsTo(()=>User_Reg)
    user_Reg!: string

    @ForeignKey(()=>User_Reg)
    idUserReg!:string

    @HasMany(()=>Travel)
    travel!:Travel


}