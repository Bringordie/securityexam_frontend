const PROD = true;

export function LoginURLUser() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/login/";
  }
  return "http://localhost:8080/sem4/api/login/";
}

export function UserRegistrationURL() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/register/user";
  }
  return "http://localhost:8080/sem4/api/register/user";
}

export function ChangePWURL() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/login/reset/password";
  }
  return "http://localhost:8080/sem4/api/login/reset/password";
}

//Post resource//
export function OwnPostsURL() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/post/own";
  }
  return "http://localhost:8080/sem4/api/post/own";
}

export function CreatePostURL() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/post/create";
  }
  return "http://localhost:8080/sem4/api/post/create";
}

export function FriendsPostsURL() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/post/friends";
  }
  return "http://localhost:8080/sem4/api/post/friends";
}

//Friends resource//
export function ViewFriendsURL() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/friend/friends";
  }
  return "http://localhost:8080/sem4/api/friend/friends";
}

export function ViewFriendRequestsURL() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/friend/requests";
  }
  return "http://localhost:8080/sem4/api/friend/requests";
}

export function AddFriendRequestURL() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/friend/add";
  }
  return "http://localhost:8080/sem4/api/friend/add";
}

export function SearchFriendURL() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/friend/search";
  }
  return "http://localhost:8080/sem4/api/friend/search";
}

export function RemoveFriendRequestURL() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/friend/remove/friendrequest";
  }
  return "http://localhost:8080/sem4/api/friend/remove/friendrequest";
}

export function AcceptFriendRequestURL() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/friend/accept";
  }
  return "http://localhost:8080/sem4/api/friend/accept";
}

export function RemoveFriendURL() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/friend/remove";
  }
  return "http://localhost:8080/sem4/api/friend/remove";
}

export function AddressURL() {
  return "https://api.ipify.org/?format=jsonp?callback=?";
}

// Admin

export function AdminLoginURL() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/login/admin";
  }
  return "http://localhost:8080/sem4/api/login/admin";
}

export function AdminGetUsersURL() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/admin/users";
  }
  return "http://localhost:8080/sem4/api/admin/users";
}

export function AdminGetPostsURL() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/admin/posts";
  }
  return "http://localhost:8080/sem4/api/admin/posts";
}
