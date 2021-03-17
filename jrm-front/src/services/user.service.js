import http from "../http-common";

const create = data =>{
    return http.post("/user/create_user", data);
}

const login = data =>{
    return http.post("/user/login_user", data);
}

const get_data_by_session_id = data =>{
    return http.post("/user/data_s_id", data);
}

export default {
    create,
    login,
    get_data_by_session_id,
};