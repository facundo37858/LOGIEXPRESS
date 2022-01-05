
import { RandomUUIDOptions } from 'crypto'
import {Model,Column,Table,CreatedAt,UpdatedAt} from 'sequelize-typescript'

@Table
export class Vehicle extends Model<Vehicle>{
    
    @Column
    brand !:string //Marca

    @Column
     patent!:string

    @Column
    model!:string
    
    @Column
    color!:string

    @Column
    capacity!:string

    @Column
    safety!:number

    @CreatedAt
    @Column
    createdAt!:Date
    
    @UpdatedAt
    @Column
    updatedAt!:Date


}