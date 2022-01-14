import { Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, HasOne, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Carrier } from './Carrier';
import { Review } from './Review';
import { User } from './User';
import { Travel } from './Travel';

@Table
export class ServiceAlert extends Model {

    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string;


    @CreatedAt
    @Column
    createdAt!: Date

    @UpdatedAt
    @Column
    updatedAt!: Date

    @BelongsTo(() => Travel)
    travel!: Travel

    @ForeignKey(() => Travel)
    travelId!: string

    @BelongsTo(() => Carrier)
    carrier!: Carrier

    @ForeignKey(() => Carrier)
    carrierId!: string



}