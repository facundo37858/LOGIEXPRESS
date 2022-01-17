import {AutoIncrement, Model, Column, Table, CreatedAt, UpdatedAt, IsUUID, HasOne, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Carrier } from './Carrier';
import { Review } from './Review';
import { User } from './User';
import { Travel } from './Travel';

@Table
export class ServiceAlert extends Model {

    @AutoIncrement
    @Column({ primaryKey: true })
    id!: number;


    @CreatedAt
    @Column
    createdAt!: Date

    @UpdatedAt
    @Column
    updatedAt!: Date

    @BelongsTo(() => Travel)
    travel!: Travel

    @ForeignKey(() => Travel)
    TravelId!: string

    @BelongsTo(() => Carrier)
    carrier!: Carrier

    @ForeignKey(() => Carrier)
    CarrierId!: string



}