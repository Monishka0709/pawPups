// const mobile = document.getElementById('mobile-input').value 
// const password = document.getElementById('password-input').value
// const departmentId = document.getElementById('departmentId-input').value


// const login = async () => {
//     try {
//         console.log("login");
//         console.log(mobile,password,departmentId);
//         const response = await fetch('https://digihand.co.in/arun1/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 mobile,
//                 password,
//                 departmentId
//             })
//         });
//         const data = await response.json();
//         alert(data);
//     } catch (error) {
//         console.error(error);
//     }
// }

const formAddUser = document.forms.userLogin;
const btnSubmit = formAddUser.querySelector("button");
const login = (e) => {
  e.preventDefault();

  const formData = new FormData(formAddUser);

  fetch
    .post("https://digihand.co.in/arun1/api/login", formData)
    .then((response) => {
      const data = response.data;

      console.log(data);
      alert(
        `Hey ${data.mobileInput}, we're glad to have you as "${data.passwordInput}" here!`
      );
    })
    .catch((error) => {
      console.error(error);
    });
};

btnSubmit.addEventListener("click", login);