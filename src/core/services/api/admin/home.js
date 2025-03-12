import ApiService from "@/core/services/api.service.js";
const Home = {
    getVechicles() {
        return new Promise((resolve, reject) => {
            ApiService.get(`vehicles`)
                .then(function (response) {
                    if (response.data) {
                        resolve(response.data.data);
                    } else {
                        resolve(" ");
                    }
                }).catch(function (error) {
                    reject(error);
                });

        });
    },
    getUsers() {
        return new Promise((resolve, reject) => {
            ApiService.get(`auth/users`)
                .then(function (response) {
                    if (response.data) {
                        resolve(response.data.data);
                    } else {
                        resolve(" ");
                    }
                }).catch(function (error) {
                    reject(error);
                });

        });
    },
    getCarById(plateNo) {
        return new Promise((resolve, reject) => {
            ApiService.get(`vehicles/${plateNo}`)
                .then(function (response) {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        resolve(" ");
                    }
                }).catch(function (error) {
                    reject(error);
                });

        });
    },
    getMonthlyRecords() {
        return new Promise((resolve, reject) => {
            ApiService.get(`service-tickets/monthlyReport`)
                .then(function (response) {
                    if (response.data) {
                        resolve(response.data.data);
                    } else {
                        resolve(" ");
                    }
                }).catch(function (error) {
                    reject(error);
                });

        });
    },
    save(req) {
        return new Promise((resolve, reject) => {
            ApiService.post(`vehicles`, req)
                .then(function (response) {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        resolve(" ");
                    }
                }).catch(function (error) {
                    reject(error);
                });

        });
    },

    update(req) {
        return new Promise((resolve, reject) => {
            ApiService.put(`vehicles/${req.id}`, req)
                .then(function (response) {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        resolve(" ");
                    }
                }).catch(function (error) {
                    reject(error);
                });

        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            ApiService.delete(`vehicles/${id}`)
                .then(function (response) {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        resolve(" ");
                    }
                }).catch(function (error) {
                    reject(error);
                });

        });
    }
}
export default Home;