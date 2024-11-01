 const Base = `https://v2.api.noroff.dev`;
 const Auth = `/auth`;
 const Login =  `/login`;
 const Register = `/register`;
 const Auction = `/auction`;
 const Listings = `/listings`;
 const Profiles = `/profiles`;
 const Search = `/search`;
 const Key = '/create-api-key';

export const API_Signup = Base + Auth + Register;
export const API_Login = Base + Auth + Login;
export const API_Listings = Base + Auction + Listings;
export const API_Profiles = Base  + Auction + Profiles;
export const API_Search = Base + Auction + Listings + Search;
export const API_GetKey = Base + Auth + Key;
export const API_PostBid = Base + Auction + Listings;


export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function load(key) {
    try {
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    }
    catch {
        return null;
    }
  }

export function remove(key) {
    localStorage.removeItem(key)
}

