import { Model, Column, Table, IsUUID } from 'sequelize-typescript'
import { User } from './User'

@Table
export class User_Reg extends Model {


    // @Column(DataType.UUIDV4)
    // @PrimaryKey                //no se si es correcto pq en realidad en una FK q proviene de User_Reg al determinar la realacion
    // id:string=uuid()
    // @PrimaryKey
    // @Column
    // id!:string
    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string

    @Column
    name!: string

    @Column
    lastName!: string

    @Column
    phone!: string

    @Column
    eMail!:string

    @Column
    password!:string

    @Column
    terminosCondiciones!: boolean

    @Column
    role!:boolean


}

