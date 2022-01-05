
import {Model,Column,Table,CreatedAt,UpdatedAt} from 'sequelize-typescript'

@Table
export class Review extends Model<Review>{
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

