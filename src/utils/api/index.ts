import axios from "axios";
import {
    IBeeHives,
    IBees, IHives, INewBee, INewBeeHive, INewHive
} from "./types";

let baseApi = axios.create({
    baseURL: 'http://localhost:8080/api',
})

export let beeAPI = {
    getBees() {
        return baseApi.get('/bee/').then(res => res.data)
    },
    getBee(id: string | undefined) {
        return baseApi.get(`/bee/${id}`).then(res => res.data)
    },
    updateBee(data: IBees) {
        return baseApi.put<IBees>('/bee', data).then(res => res.data)
    },
    deleteBee(id: string | undefined) {
        return baseApi.delete(`/bee/${id}`).then(res => res.data)
    },
    addBee(data: INewBee) {
        return baseApi.post(`/bee`, data).then(res => res.data)
    }
}

export let hiveAPI = {
    getHives() {
        return baseApi.get('/hive/').then(res => res.data)
    },
    getHive(id: string | undefined) {
        return baseApi.get(`/hive/${id}`).then(res => res.data)
    },
    updateHive(data: IHives) {
        return baseApi.put<IHives>('/hive', data).then(res => res.data)
    },
    deleteHive(id: string | undefined) {
        return baseApi.delete(`/hive/${id}`).then(res => res.data)
    },
    addHive(data: INewHive) {
        return baseApi.post(`/hive`, data).then(res => res.data)
    }
}

export let beeHiveAPI = {
    getBeeHives() {
        return baseApi.get('/bee_hive/').then(res => res.data)
    },
    getBeeHive(id: string | undefined) {
        return baseApi.get(`/bee_hive/${id}`).then(res => res.data)
    },
    updateBeeHive(data: IBeeHives) {
        return baseApi.put<IBeeHives>('/bee_hive', data).then(res => res.data)
    },
    deleteBeeHive(id: string | undefined) {
        return baseApi.delete(`/bee_hive/${id}`).then(res => res.data)
    },
    addBeeHive(data: INewBeeHive) {
        return baseApi.post(`/bee_hive`, data).then(res => res.data)
    }
}