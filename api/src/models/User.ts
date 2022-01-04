
import {Model,Column,Table,CreatedAt,UpdatedAt} from 'sequelize-typescript'
import {v4 as uuid} from 'uuid'

@Table
export class User extends Model<User>{
    // @Column(DataType.UUIDV4)
    // @PrimaryKey                //no se si es correcto pq en realidad en una FK q proviene de User_Reg al determinar la realacion
    // id:string=uuid()
    @PrimaryKey
    @Column
    id:string=uuid()
    @Column
    name!:string

    @Column
    lastName!:string

    @Column
    paswword!:string

   


}

