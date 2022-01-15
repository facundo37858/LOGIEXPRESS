
import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, IsUUID } from 'sequelize-typescript'

@Table
export class Review extends Model<Review>{

    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string;

    @Column
    id_viaje!: number

    @Column
    User_raiting!: number

    @Column
    User_comment!: string

    @Column
    Carrrier_raiting!: number

    @Column
    Carrier_comment!: string


}

