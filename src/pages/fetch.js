const data = {
    name: "김용민",
    email: "dydals3440@gmail.com",
    age: "24",
    username: "dydals3440",
    password: "Smu123!!",
    passwordCheck: "Smu123!!"
  };
  
  fetch(' http://localhost:8080/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.status === 201) {
      return response.json();
    } else if (response.status === 409) {
      throw new Error("username already exists");
    } else if (response.status === 400) {
      throw new Error("Passwords do not match");
    } else {
      throw new Error("Unknown error occurred");
    }
  })
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
export default  data;