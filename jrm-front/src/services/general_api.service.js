import http from "../http-common";

const get_status =e=>{
    return http.get("/");
};

export default{
    get_status
}