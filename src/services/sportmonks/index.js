const axios = require('axios');
const { API } = require('../../utils/api');
const { liveScoreData } = require('./sampleData.json');
const moment = require('moment')


class SportMonks {
    axiosInstance;
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: API.SPORTMONK_API
        });
        this.axiosInstance.interceptors.request.use((config) => {
            config.params = config.params || {};
            config.params['api_token'] = process.env.SPORTMONK_API_TOKEN;
            return config;
        });
    };

    async getLiveScores() {
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await this.axiosInstance.get(`/livescores?include=localteam,visitorteam,balls,runs,bowling,batting,scoreboards,firstumpire,secondumpire,manofseries,manofmatch,tosswon,venue,referee,batting.batsman,bowling.bowler,stage,season,league,lineup,balls.batsmantwo`);
                
                resolve({ status: true, data: data.data, message: "Processed Succesfully" });
            } catch (error) {
                // console.log(error?.response?.data || error);
                reject({ status: false, data: error?.response?.data || error, message: "Something went wrong" });
            }
        })
    };

    async getLeagues() {
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await this.axiosInstance.get(`/leagues`);
                resolve({ status: true, data: data.data, message: "Processed Succesfully" })
            } catch (error) {
                reject({ status: false, data: error?.response?.data || error, message: "Something went wrong" });
            }
        })
    }

    async getFinishedMatches() {
        let today = moment(new Date()).format('YYYY-MM-DD')
        let lastWeek = moment(today).subtract(7, 'days').format('YYYY-MM-DD')
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await this.axiosInstance.get(`/fixtures?api_token=${process.env.SPORTMONK_API_TOKEN_2}?include=runs,localTeam,visitorTeam,scoreboards,tosswon&filter[starts_between]=${lastWeek},${today}`);
                resolve({ status: true, data:data?.data, message: "Processed Succesfully" });
            } catch (error) {
                reject({ status: false, data: error?.response?.data || error, message: "Something went wrong" });
            }
        })
    }
    async getUpcomingMatches() {
        let today = moment(new Date()).format('YYYY-MM-DD')
        let nextWeek = moment(today).add(10, 'days').format('YYYY-MM-DD')
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await this.axiosInstance.get(`/fixtures?api_token=${process.env.SPORTMONK_API_TOKEN_2}?include=runs,localTeam,visitorTeam,scoreboards,tosswon&filter[starts_between]=${today},${nextWeek}`);
                resolve({ status: true, data:data?.data, message: "Processed Succesfully" });
            } catch (error) {
                reject({ status: false, data: error?.response?.data || error, message: "Something went wrong" });
            }
        })
    }
    async getTommorowsMatch() {
        let today = moment(new Date()).format('YYYY-MM-DD')
        let nextWeek = moment(today).add(1, 'days').format('YYYY-MM-DD')
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await this.axiosInstance.get(`/fixtures?api_token=${process.env.SPORTMONK_API_TOKEN_2}?include=runs,localTeam,visitorTeam,scoreboards,tosswon&filter[starts_between]=${today},${nextWeek}`);
                resolve({ status: true, data, message: "Processed Succesfully" });
            } catch (error) {
                reject({ status: false, data: error?.response?.data || error, message: "Something went wrong" });
            }
        })
    }

    async getRankings(){
        return new Promise(async(resolve,reject)=>{
            try {
                let { data } = await this.axiosInstance.get(`/team-rankings`);
                resolve({ status: true, data, message: "Processed Succesfully" });
            } catch (error) {
                reject({ status: false, data: error?.response?.data || error, message: "Something went wrong" });
            }
        })
    }

    async getContinents() {
        return await this.axiosInstance.get('/continents');
    }

    async getCountries() {
        return await this.axiosInstance.get('/countries');
    };

    async getLeagues() {
        return await this.axiosInstance.get('/leagues');
    }

    async getTeams() {
        return await this.axiosInstance.get('/teams');
    };

    async getPlayers() {
        return await this.axiosInstance.get('/players');
    }

    async matchDetails(matchId) {
        return await this.axiosInstance.get(`/fixtures/${matchId}?include=bowling,batting`);
    }

};


module.exports = {
    SportMonks
}