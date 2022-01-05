

import {Model,Column,Table, PrimaryKey} from 'sequelize-typescript'


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
    ducumentoIdentidad!:number

    @Column
    eMail!:string

    
    @Column
    ubicacion!:string

    @Column
    cel!:number

    @Column
    tel!:number

    @Column
    fotoPerfil!:string

    @Column
    medioPago!:string

    @Column
    name!:string

    @Column
    lastName!:string

    @Column
    paswword!:string

    @Column
    terminosCondiciones!:boolean

   


}

