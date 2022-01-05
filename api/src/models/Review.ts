
import {Model,Column,Table,CreatedAt,UpdatedAt, PrimaryKey} from 'sequelize-typescript'

@Table
export class Review extends Model<Review>{
    @PrimaryKey
    @Column
    id!:number

    @Column
    id_viaje!:number

    @Column
    User_raiting!:number

    @Column
    User_comment!:string

    @Column
    Carrrier_raiting!:number

    @Column
    Carrier_comment!:string


}

