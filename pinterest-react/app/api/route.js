import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PinterestApi {
  static token = "";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${PinterestApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API Routes __________________________________________________

  /** Create a new user */
  static async createNewUser(username, password, firstName, lastName, email) {
    let res = await this.request("auth/register",
      { username, password, firstName, lastName, email },
      "post");
    return res.token;
  }

  /** Login a user */
  static async login(username, password) {
    let res = await this.request("auth/token", { username, password }, "post");
    return res.token;
  }

  /**Update individual user information */
  static async updateUserInfo(username, firstName, lastName, email, profilePicture, about, website) {
    let res = await this.request(`users/${username}`,
      { firstName, lastName, email },
      "patch");
    return res.user;
  }

  // ________________________________________________________________________
  // all pins that exist
  static async getAllPins(){
    let res = await this.request(``);
    return res.pins;
  }

   //get COLLECTIONS then get pins
  static async getUserPins(user){
    let res = await this.request(``);
    return res.pins;
  }

  // all pins that user has created
  static async getUserCreatedPins(user){
    let res = await this.request(``);
    return res.pins;
  }



}