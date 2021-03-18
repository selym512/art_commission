import http from "../http-common";

const create = data =>{
    return http.post("/user/create_user", data);
}

const login = data =>{
    return http.post("/user/login_user", data);
}

const get_data_by_session_id = data =>{
    return http.post("/user/data_by_session_id", data);
}

const verify_user = data =>{
    return http.post("/user/verify_user", data);
}

const set_account_type = data =>{
    return http.post("/user/set_account_type", data);
}

export default {
    create,
    login,
    get_data_by_session_id,
    verify_user,
    set_account_type,
};