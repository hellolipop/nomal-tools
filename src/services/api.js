// import { get } from "core-js/core/dict";
import service from "./service";
export default {
 getData(params) {
  return service.Get('/get/list',params)
 },
 getUserList(params) {
  return service.Get('/get/user',params)
 }
};
