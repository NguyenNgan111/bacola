const userApi =
  "https://6283e66938279cef71dde27c.mockapi.io/users?fbclid=IwAR1VgUT0lsjo9G8w2Gq9jpr4GpXXm2rX8vUukcBNWoruETXm7YqjL3aH-q4";
export function loginHandler() {
  registerHandler();
  signInHandler();
}
function registerHandler() {
  $(".register button").click((e) => {
    e.preventDefault();
    getFormRegister();
  });
}

function signInHandler() {
  $(".login button").click((e) => {
    e.preventDefault();
    getFormLogin();
  });
}
function pageLoad() {
  window.location.assign("http://127.0.0.1:5500/index.html");
}
function getFormLogin(change) {
  $.getJSON(userApi, (list) => {
    const formData = new FormData(login);
    const data = [...formData.entries()];
    const hasEmailIdx = list.findIndex((user) => user.mail == data[0][1]);
    if (hasEmailIdx >= 0) {
      const hasPass = list[hasEmailIdx].pass == data[1][1];
      if (hasPass) {
        alert("Successfully!");
        alert("Please, waiting 3s");
        setTimeout(pageLoad(), 3000);
      } else {
        alert("Email or Password is not correct!");
      }
    } else {
      alert("Email or Password is not correct!");
    }
  });
}
function getFormRegister() {
  $.getJSON(userApi, (list) => {
    const formData = new FormData(register);
    const data = [...formData.entries()];
    if (checkEmail(data[0][1]) && checkPassWord(data[1][1])) {
      if (!checkEmailExist(list, data[0][1])) {
        let user = {
          id: list.length + 1,
          name: "",
          address: "",
          phone: "",
          mail: data[0][1],
          pass: data[1][1],
          cart: [],
          enjoyList: [],
        };
        createAccount(user);
        alert("Congrats!\nYour account is created");
      } else {
        alert("Email already exists");
      }
    }
  });
}
function checkEmail(email) {
  var filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!filter.test(email)) {
    alert("The mail is not correct!\nExample@gmail.com");
    return false;
  } else {
    return true;
  }
}
function checkPassWord(pass) {
  const len = pass.length;
  if (len < 6) {
    alert("Passwords must be at least 6 characters");
    return false;
  } else {
    return true;
  }
}
function checkEmailExist(listUser, email) {
  const test = listUser.findIndex((user) => user.mail == email);
  if (test >= 0) {
    return true;
  } else {
    return false;
  }
}
function createAccount(data) {
  let options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(userApi, options)
    .then((response) => response.json())
    .then(data);
}
// function handleCreateCourse() {
//   const createBtn = document.querySelector("#create");
//   createBtn.onclick = () => {
//     let name = document.querySelector("input[name='name']").value;
//     let description = document.querySelector("input[name='description']").value;
//     let dataForm = {
//       name: name,
//       description: description,
//     };
//     createCourses(dataForm);
//   };
// }
