import { Model, Column, Table, IsUUID } from 'sequelize-typescript'

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
    phone!: number

    @Column
<<<<<<< HEAD
    paswword!: string

    @Column
    rol!: boolean

=======
    eMail!:string

    @Column
    password!:string

    @Column
    role!:boolean
>>>>>>> dbc0fbd3ca9a83c724d4cfad8a61852719b38e7e


}

