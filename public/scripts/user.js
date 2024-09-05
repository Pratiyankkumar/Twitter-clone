console.log('Script Loaded')
let token;

document.addEventListener('DOMContentLoaded', async () => {
  token = JSON.parse(localStorage.getItem('token'))

  const userRequest = await fetch('https://twitter-clone-tsn3.onrender.com/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  const user = await userRequest.json()

  console.log(user)

  document.querySelector('#js-create-button').addEventListener('click', async () => {

    const name = document.getElementById('js-name-input').value || user.name;
    const age = document.getElementById('js-age-input').value || user.age;
    const password = document.getElementById('js-password-input').value || user.password;

    try {
      const request = await fetch('https://twitter-clone-tsn3.onrender.com/users/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          age,
          password
        })
      })
  
      const response = await request.json()

      console.log(response)

      window.location.href = '/profile'

    } catch (error) {
      console.log('An error occured')
    }

  })
})