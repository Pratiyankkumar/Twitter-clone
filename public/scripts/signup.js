
document.addEventListener('DOMContentLoaded', () => {
  console.log('Script loaded')
  document.querySelector('#js-create-button').addEventListener('click', async () => {

    const name = document.getElementById('js-name-input').value;
    const age = document.getElementById('js-age-input').value;
    const email = document.getElementById('js-email-input').value;
    const password = document.getElementById('js-password-input').value;

    try {
      const request = await fetch('https://twitter-clone-tsn3.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          age,
          email,
          password
        })
      })
  
      const response = await request.json()
      console.log(response)
      localStorage.setItem('token', JSON.stringify(response.token))
      
      if (request.status >= 400) {
        throw new Error("An error occured");
      } else { 
        window.location.href = '/home'
      }
    } catch (error) {
      console.log('An error occured')
    }

  })
})