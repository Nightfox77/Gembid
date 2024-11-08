import { load } from "../constants/constants.js";
import { loadProfile } from "../Api/getUserProfile.js";


export async function insertUserData() {
    const profileData = await loadProfile();
  const userName = document.getElementById('userName');
  const userAvatar = document.getElementById('userImage'); 
  userName.innerHTML = load("name");
  userAvatar.setAttribute("src", profileData.avatar.url);
  if(!profileData.avatar) {
    userAvatar.setAttribute("src", "/assets/images/gembid-default-pic.jpg");
  } 
  const userBalance = document.getElementById('creditBalance');
  userBalance.innerHTML += profileData.credits; 
} 