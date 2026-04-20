import { test as base, expect } from "@playwright/test"

export class Api {

    constructor(request) {
        this.request = request
        this.token = undefined
    }

    async setToken() {
        const response = await this.request.post('http://localhost:3333/sessions', {
            data: {
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        })

        expect(response.ok()).toBeTruthy()
        const body = JSON.parse(await response.text())
        this.token = `Bearer ${body.token}`
   
    }

    async postMovie(movie) {
        const response = await this.request.post('http://localhost:3333/movies', {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: '5cdb30fb-be33-4fd4-8297-1eb05bcadf44',
                release_year: String(movie.release_year),
                featured: String(movie.featured)
                //cover: movie.cover
            }
        })

        expect(response.ok()).toBeTruthy()
    }
}