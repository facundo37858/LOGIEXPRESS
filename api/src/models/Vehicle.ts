
import {Model,Column,Table,CreatedAt,UpdatedAt, PrimaryKey} from 'sequelize-typescript'

@Table
export class Vehicle extends Model<Vehicle>{

    @PrimaryKey
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


}