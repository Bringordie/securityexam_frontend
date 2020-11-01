const PROD = false;

export function LoginURLUser() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/login";
  }
  return "http://localhost:8080/sem4/api/login";
}

export function LoginURLAdmin() {
  if (PROD) {
    return "https://cphfb.codes/sem4/api/login/admin";
  }
  return "http://localhost:8080/sem4/api/login/admin";
}

export function UserRegistrationURL() {
  if (PROD) {
    //return "https://cphfb.codes/sem4/api/register/user";
  }
  return "http://localhost:8080/sem4/api/register/user";
}

export function ChangePWURL() {
  if (PROD) {
    //return "https://cphfb.codes/sem4/api/register/changepw";
  }
  return "http://localhost:8080/sem4/api/register/changepw";
}
