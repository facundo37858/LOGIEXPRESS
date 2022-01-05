
import {Model,Column,Table,CreatedAt,UpdatedAt} from 'sequelize-typescript'

@Table
export class Vehicle extends Model<Vehicle>{
    @Column
    id!:number

    @Column
    brand!:string

    @Column
    patent!:string

    @Column
    model!:number

    @Column
    color!:string

    @Column
    capacity!:number

    @CreatedAt
    @Column
    createdAt!:Date
    
    @UpdatedAt
    @Column
    updatedAt!:Date


}