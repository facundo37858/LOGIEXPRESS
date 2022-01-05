
import { IsUUID, Model, Column, Table, IsEmail } from 'sequelize-typescript'

@Table
export class Carrier extends Model<Carrier>{

    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string;

    @Column
    documentID!: string                     //Documento de identidad 

    @Column
    license!: string

    @IsEmail
    @Column
    email!: string

    @Column
    phone!: number

    @Column
    location!: string

    @Column
    Cuenta!: string


}