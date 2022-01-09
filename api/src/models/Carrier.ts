
import { IsUUID,ForeignKey, Model, Column, Table, CreatedAt, UpdatedAt, IsEmail, BelongsTo } from 'sequelize-typescript'
import { User_Reg } from './User_Reg';

@Table
export class Carrier extends Model{

    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string;

    @Column
    documentID!: string                     //Documento de identidad 

    @Column
    license!: string

    @IsEmail
    @Column
    eMail!: string

    @Column
    phone!: number

    @Column
    location!: string

    @Column
    CBU!: string

    @BelongsTo(()=>User_Reg)
    user_Reg!: User_Reg

    @ForeignKey(()=>User_Reg)
    idUserReg!:string


    @CreatedAt
    @Column
    createdAt!: Date

    @UpdatedAt
    @Column
    updatedAt!: Date


}