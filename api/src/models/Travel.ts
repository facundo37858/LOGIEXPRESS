
import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID } from 'sequelize-typescript'

@Table
export class Travel extends Model<Travel>{

    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string;

    @Column
    orig !: string

    @Column
    destination!: string

    @Column
    price!: string

    @Column
    description!: string

    @Column
    comments!: string

    @Column
    score!: number

    @CreatedAt
    @Column
    createdAt!: Date

    @UpdatedAt
    @Column
    updatedAt!: Date


}