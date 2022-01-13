
import { IsUUID, ForeignKey, Model, Column, Table, CreatedAt, UpdatedAt, IsEmail, BelongsTo, HasOne, HasMany } from 'sequelize-typescript'
import { Travel } from './Travel';
import { User_Reg } from './User_Reg';
import { Vehicle } from './Vehicle';

@Table
export class Carrier extends Model {


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

    @HasMany(() => Travel)
    travel!: Travel




    @CreatedAt
    @Column
    createdAt!: Date

    @UpdatedAt
    @Column
    updatedAt!: Date


}