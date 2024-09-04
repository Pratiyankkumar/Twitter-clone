console.log('script loaded')
let token

document.querySelector('.js-home-button').addEventListener('click', () => {
  window.location = '/home'
})

document.addEventListener('DOMContentLoaded', async () => {
  token = JSON.parse(localStorage.getItem('token'));

  const request = await fetch('http://localhost:3000/posts', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  const posts = await request.json()

  let feedHTML = `
    <div class="w-full fixed top-0 md:left-1/4 left-0 right-0 h-16 backdrop-blur-sm bg-black/30">
      <p class="md:ml-16 ml-8 font-bold text-xl mt-4">Pratiyank</p>
    </div>
    <div class="flex flex-col w-full mt-16">
      <div class="bg-coverArt w-full md:h-64 h-32"></div>
      <div class="flex flex-row w-full relative">
        <div class="flex absolute md:left-10 left-5 md:-top-20 -top-16 text-6xl js-user-icon1 items-center justify-center bg-gray-500 rounded-full md:size-40 size-32 border-black border-4">
          P
        </div>
        <button class="px-4 py-2 border-1 border-gray-300 rounded-full bg-transparent absolute right-10 mt-2 ">Edit Profile</button>
      </div>
      <p class="text-2xl font-bold md:mt-24 mt-20 md:ml-16 ml-8">Pratiyank</p>
      <div class="flex flex-row md:ml-16 ml-8 mt-4 items-center">
        <svg class="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
        </svg>
        <p class="ml-3 font-light text-primary">Joined January 2024</p>
      </div>
      <div class="border-b-1 border-gray-600 w-full mt-8"></div>
    </div>

    <p class="text-3xl font-bold mt-8">Posts</p>
    <div class="w-72 md:h-16 h-14 bg-red-500 shadow-red-400 shadow-sm fixed right-16 top-10 flex flex-row items-center rounded-full js-error-message hidden">
      <svg class="ml-4 size-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
      <p class="ml-3">Please go to home page to like and comment on post</p>      
    </div>
    
    
  `

  for (const post of posts) {
    const userName = await getUserProfile()
    feedHTML += `
      
      <div class="font-sans px-5 py-4 md:w-108 w-96 mt-10">
        <div class="flex items-center">
          <div class="flex items-center justify-center bg-gray-500 rounded-full size-8 py-3">
            ${userName[0].toUpperCase()}
          </div>
          <div class="flex flex-col ml-4">
            
            <span class="text-grey">${userName}</span>
          </div>
          <div class="flex flex-row items-center ml-40">
            <svg class="md:size-6 size-4 mr-6 js-update-post" data-post-id="${post._id}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            
            <svg class="md:size-6 size-4 js-delete-post" data-post-id="${post._id}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>

          </div>
        </div>
        <div class="mt-3 mb-1 leading-normal text-lg">
          ${post.text}
        </div>
        <div class="text-grey mb-3 text-sm">
          ${convertTimestamp(post.createdAt)}
        </div>
        <div class="flex text-grey">
          <div class="flex items-center mr-4">
            <svg class="mr-2 cursor-pointer js-comment-button" width="24" height="24" viewBox="0 0 24 24">
              <path class="fill-current" d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.045.286.12.403.143.225.385.347.633.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
            </svg>
            <span>${post.comments.length}</span>
          </div>
          <div class="flex items-center">
            <div class="js-like-button">
              <svg class="mr-2 cursor-pointer" width="24" height="24" viewBox="0 0 24 24">
                <path class="fill-current" d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.813-1.148 2.353-2.73 4.644-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.375-7.454 13.11-10.037 13.156H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.035 11.596 8.55 11.658 1.52-.062 8.55-5.917 8.55-11.658 0-2.267-1.822-4.255-3.902-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.015-.03-1.426-2.965-3.955-2.965z"></path>
              </svg>
            </div>
            <span>${post.likes.length}</span>
          </div>
        </div>
      </div>
    `
  }

  document.querySelector('.js-pc-feed').innerHTML = feedHTML

  document.querySelectorAll('.js-delete-post').forEach((deleteButton) => {
    deleteButton.addEventListener('click', async () => {
      const id = deleteButton.dataset.postId
      const request = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const response = await request.json()

      console.log(response)
      window.location.reload()
    })
  })

  document.querySelectorAll('.js-update-post').forEach((updateButton) => {
    updateButton.addEventListener('click', () => {
      const id = updateButton.dataset.postId

      document.querySelector('.js-pc-feed').innerHTML = `
        <div class="w-3/4 h-3/4 mt-20 rounded-md flex flex-col items-center justify-center shadow-md bg-back p-4 js-update-post-div">
          <textarea class="w-4/5 h-3/4 rounded-md border-1 js-input-text border-gray-500 bg-transparent pl-4 pt-2 text-xl" name="" placeholder="Enter text to update" id=""></textarea>

          <button class="px-4 py-2 mt-4 js-update-button bg-button rounded-full">Update</button>

          <svg class="fixed size-6 right-3 top-2 cursor-pointer js-close-button" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          
        </div>

        <div class="w-72 md:h-16 h-14 bg-green-500 shadow-green-400 shadow-sm fixed right-16 top-10 flex flex-row items-center rounded-full js-success-message hidden">
          <svg class="ml-4 size-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <p class="ml-3">Post Updated Successfully!</p>      
        </div>

        <div class="w-72 md:h-16 h-14 bg-red-500 shadow-red-400 shadow-sm fixed right-16 top-10 flex flex-row items-center rounded-full js-error-message2 hidden">
          <svg class="ml-4 size-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <p class="ml-3">An error occured!</p>      
        </div>
      `

      document.querySelector('.js-update-button').addEventListener('click', async () => {
        const text = document.querySelector('.js-input-text').value
        const request = await fetch(`http://localhost:3000/posts/${id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            text
          })
        })

        const response = await request.json()

        if (request.status === 200) {
          document.querySelector('.js-success-message').classList.remove('hidden')
          setTimeout(() => {
            document.querySelector('.js-success-message').classList.add('hidden')
          }, 2000);
        } else {
          document.querySelector('.js-error-message2').classList.remove('hidden')
          setTimeout(() => {
            document.querySelector('.js-error-message2').classList.add('hidden')
          }, 2000);
        }

        console.log(response)
      })

      document.querySelector('.js-close-button').addEventListener('click', () => {
        document.querySelector('.js-pc-feed').innerHTML = feedHTML
        window.location.reload()
      })
    })
  })

  document.querySelectorAll('.js-comment-button').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelector('.js-error-message').classList.remove('hidden')
      setTimeout(() => {
        document.querySelector('.js-error-message').classList.add('hidden')
      }, 2000);
    })
  })

  document.querySelectorAll('.js-like-button').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelector('.js-error-message').classList.remove('hidden')
      setTimeout(() => {
        document.querySelector('.js-error-message').classList.add('hidden')
      }, 2000);
    })
  })
})

async function getUserProfile() {
  const url = 'http://localhost:3000/users/me'; // Replace with your actual server URL

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Add the token to the request headers
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userData = await response.json();
    return userData['name'] // Handle the user data as needed
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
}

async function findUser(userId) {
  const request = await fetch(`http://localhost:3000/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const user = await request.json()
  
  const userName = await user['name']

  return userName
}

function convertTimestamp(timestamp) {
  const date = new Date(timestamp);

  // Convert to local date and time
  const localDate = date.toLocaleDateString();
  const localTime = date.toLocaleTimeString();

  return `Date: ${localDate}, Time: ${localTime}`;
}

document.querySelector('.js-logout-button').addEventListener('click', async () => {
  try {
    const request = await fetch('http://localhost:3000/users/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'text/plain'
      }
    })

    const response = await request.json()

    if (request.status >= 400) {
      console.log('An error occured')
    } else {
      window.location.href = '/login' 
    }
  } catch (error) {
    console.log(error)
  }
})

document.querySelector('.js-mob-logout-button').addEventListener('click', async () => {
  try {
    const request = await fetch('http://localhost:3000/users/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'text/plain'
      }
    })

    const response = await request.json()

    if (request.status >= 400) {
      console.log('An error occured')
    } else {
      window.location.href = '/login' 
    }
  } catch (error) {
    console.log(error)
  }
})