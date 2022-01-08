
import { IsUUID, Model, Column, Table, CreatedAt, UpdatedAt, IsEmail } from 'sequelize-typescript'

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
    email!: string

    @Column
    phone!: number

    @Column
    location!: string

    @Column
    CBU!: string

    @CreatedAt
    @Column
    createdAt!: Date

    @UpdatedAt
    @Column
    updatedAt!: Date


}