
import {Model,Column,Table,CreatedAt,UpdatedAt} from 'sequelize-typescript'
import {v4 as uuid} from 'uuid'

@Table
export class User extends Model<User>{
    @Column
    name!:string

    @Column
    lastName!:string

    @Column
    paswword!:string

   


}

