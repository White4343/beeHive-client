import exp from "constants";

export interface IBees {
    bees_id: number
    queen: boolean
    bees_size: number
}

export interface INewBee {
    queen: boolean
    bees_size: number
}

export interface IHives {
    hive_id: number
    hive_size: number
    honey_capacity: number
}

export interface INewHive {
    hive_size: number
    honey_capacity: number
}

export interface IBeeHives {
    bees_hive_id: number
    bees_id: number
    hive_id: number
    bee_appointment: boolean
    honey: number
}

export interface INewBeeHive {
    bees_id: number
    hive_id: number
    bee_appointment: boolean
    honey: number
}