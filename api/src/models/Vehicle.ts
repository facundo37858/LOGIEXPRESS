
import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, IsUUID, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Carrier } from '../models/Carrier';

@Table
export class Vehicle extends Model{

    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string

    @Column
    brand!: string

    @Column
    patent!: string

    @Column
    model!: string 

    @Column
    color!: string

    @Column
    capacity!: number
 
    @BelongsTo(()=>Carrier)
    carrier!:Carrier
   
   @ForeignKey(()=>Carrier)
   CarrierId!:string

}