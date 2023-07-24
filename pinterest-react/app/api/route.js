import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PinterestApi {
  static token = null;
  // FIXME: the token does not save?
  // static async request(endpoint, data = {}, method = "get") {
  //   console.debug("API Call:", endpoint, data, method);

  //   const url = `${BASE_URL}/${endpoint}`;
  //   const headers = { Authorization: `Bearer ${PinterestApi.token}` };
  //   const params = (method === "get")
  //     ? data
  //     : {};

  //   try {
  //     return (await axios({ url, method, data, params, headers })).data;
  //   } catch (err) {
  //     console.error("API Error:", err.response);
  //     let message = err.response.data.error.message;
  //     throw Array.isArray(message) ? message : [message];
  //   }
  // }

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      'Content-Type': 'application/json', // Set the Content-Type header to JSON
    };

    try {
      const response = await axios({
        method,
        url,
        data: method !== 'get' ? data : null,
        params: method === 'get' ? data : null,
        headers,
        withCredentials: true, // Include credentials (cookies) with the request
      });

      return response.data;
    } catch (err) {
      console.error('API Error:', err.response);
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

  /** Get User Info by Id*/
  // FIXME: this should be get, but idk
  static async getUserInfo(id) {
    let res = await this.request("/user-info",
      { id },
      "post");
    return res.user;
  }

  // Get User Info by Username
  static async getUserProfile(username) {
    let res = await this.request(`${username}`);
    return res.user;
  }

  /** Login a user */
  static async login(username, password) {
    let res = await this.request("login", { username, password }, "post");
    return res;
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
    let res = await this.request(`/pin`);
    return res.pins;
  }

  // get one pin
  static async getAPin(id){
    let res = await this.request(`pin/${id}`);
    return res;
  }

  // get pins created by a user
  static async getUserPins(username){
    let res = await this.request(`/${username}/created`);
    return res.pins;
  }

  // create pin
  static async createPin(title, description, picture, link_to_original_pic){
    let res = await this.request(`/pin/create`,
    { title, description, picture, link_to_original_pic },
    "post")
    return res.pin
  }

  // delete pin
  static async deletePin(id){
    let res = await this.request(`/delete-pin`,
    { id },
    "post")
    return res.pin
  }

  // Collections ____________________________________________________________________
  // a users collections
  static async getUserCollections(username){
    let res = await this.request(`/${username}/saved`);
    return res.collections;
  }

  // create a collection
  static async createCollection(title, description){
    let res = await this.request(`/createBoard`,
    { title, description },
    "post")
    return res.collection
  }

  // delete a collection
  static async deleteCollection(id){
    let res = await this.request(`/deleteBoard`,
    { id },
    "post")
    return res.collection
  }


  // Collections and Pins ____________________________________________________________________

  // get pins in collection
  static async getPinsInCollection(username, title, id){
    let res = await this.request(`${username}/${title}/${id}`)
    return res.pins
  }
}

export default PinterestApi;