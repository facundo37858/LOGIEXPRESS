
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

    @IsEmail
    @Column
    eMail!: string

    @Column
    phone!: number

    @Column
    location!: string

    @Column
    CBU!: string

    @BelongsTo(() => User_Reg)
    user_Reg!: User_Reg

    @ForeignKey(() => User_Reg)
    idUserReg!: string

    @HasOne(() => Vehicle)
    vehicle!: Vehicle

    @HasMany(() => Travel)
    travel!: Travel




    @CreatedAt
    @Column
    createdAt!: Date

    @UpdatedAt
    @Column
    updatedAt!: Date


}