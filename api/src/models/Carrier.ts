
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

    @Column
    Active!:boolean

    @Column
    location!: string

    @Column
    photo!: string

    @Column
    Cuenta!: string


}