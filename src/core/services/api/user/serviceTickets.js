import ApiService from "@/core/services/api.service.js";
    const ServiceTickets = {
        getServiceTickets() {
            return new Promise((resolve, reject) => {
            ApiService.get(`service-tickets`)
                .then(function (response) {
                resolve(response.data.data);
                }).catch(function (error) {
                reject(error);
                });

            });
        },
        save(req) {
            return new Promise((resolve, reject) => {
                ApiService.post(`service-tickets`, req)
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
        getServiceTicketsById(id) {
            return new Promise((resolve, reject) => {
                ApiService.get(`service-tickets/${id}`)
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
                ApiService.put(`service-tickets/${req.id}`, req)
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
                ApiService.delete(`service-tickets/${id}`)
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
export default ServiceTickets;