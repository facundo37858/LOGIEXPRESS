
import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, HasOne, BelongsTo, ForeignKey} from 'sequelize-typescript'
import { Carrier } from './Carrier';
import { Review } from './Review';
import { User } from './User';

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

    @HasOne(()=>Review)
    rewiew!:Review

    @CreatedAt
    @Column
    createdAt!: Date

    @UpdatedAt
    @Column
    updatedAt!: Date

    @BelongsTo(()=>User)
    user!:User

    @ForeignKey(()=>User)
    userId!:User

    @BelongsTo(()=>Carrier)
    carrier!:Carrier

    @ForeignKey(()=>Carrier)
    carrierId!:string



}