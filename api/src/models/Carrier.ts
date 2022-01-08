
import { IsUUID, Model, Column, Table, IsEmail } from 'sequelize-typescript'

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
    Cuenta!: string


}