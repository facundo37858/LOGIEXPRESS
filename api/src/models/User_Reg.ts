import { Model, Column, Table, IsUUID, HasOne, ForeignKey } from 'sequelize-typescript'

import { Carrier } from './Carrier'
import { User } from './User'


export interface IUser extends User_Reg {
    eMail: string,
    password: string
}


// @Table
// export class User extends Model {

//   @Column name!: string;
//   @HasMany(() => Post) posts: Post[];

// }


// @Table
// export class Post extends Model {

//   @Column text!: string;
//   @ForeignKey(() => User) @Column userId!: number;
//   @BelongsTo(() => User) user: User;
// }

// User_Reg.hasOne(Carrier)
// Carrier.belongsTo(User_Reg)

@Table
export class User_Reg extends Model {



    // @Column(DataType.UUIDV4)
    // @PrimaryKey                //no se si es correcto pq en realidad en una FK q proviene de User_Reg al determinar la realacion
    // id:string=uuid()
    // @PrimaryKey
    // @Column
    // id!:string
    // @ForeignKey(()=>Carrier)
    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string

    @HasOne(() => Carrier)
    carrier!: Carrier

    @HasOne(() => User)
    user!: User

    @Column
    name!: string

    @Column
    lastName!: string

    @Column
    phone!: string

    @Column
    eMail!: string

    @Column
    password!: string

    @Column
    terminosCondiciones!: boolean

    @Column
    role!: boolean



}

