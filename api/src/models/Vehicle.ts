
import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, IsUUID } from 'sequelize-typescript'

@Table
export class Vehicle extends Model<Vehicle>{

    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string

    @Column
    brand!: string

    @Column
    patent!: string

    @Column
    model!: number

    @Column
    color!: string

    @Column
    capacity!: number


}