import http from "../http-common";

const create = data =>{
    return http.post("/user/create_user", data);
}

const login = data =>{
    return http.post("/user/login_user", data);
}

export default {
    create,
    login
};