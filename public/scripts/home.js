console.log('Script Loaded')
let token;

document.addEventListener('DOMContentLoaded', async () => {
  token = JSON.parse(localStorage.getItem('token'))

  const feedRequest = await fetch('http://localhost:3000/feed', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  const feed = await feedRequest.json()
  console.log(feed)

  async function generatePcFeed() {
    let feedHtml  = `
      <p class=" text-xl font-bold mt-3 md:flex hidden">Posts</p>

      <div class="w-full mt-8 py-6 border-b-1 border-t-1 border-gray-600 md:flex hidden items-center justify-center ">
        <div class="w-4/6 flex flex-col items-center justify-center">
          <div class="flex flex-row items-center w-full ">
            <div class="flex items-center justify-center bg-gray-500 rounded-full size-10">
              P
            </div>
            <input type="text" class="w-full h-20 bg-transparent outline-none text-xl pl-5" placeholder="What's Happening?!">
          </div>

          <div class="w-full">
            <button class="px-4 font-bold py-2 rounded-full bg-button">Post</button>
          </div>
        </div>
      </div>

      <div class="p-4 md:hidden rounded-full fixed right-4 bottom-24 flex items-center justify-center bg-button">
        <img src="Images/res-tweet.svg" alt="">
      </div>

      <img src="Images/x-social-media-white-icon.svg" class="size-8 md:hidden mt-4" alt="">

      <div class="w-72 md:h-16 h-14 bg-red-500 shadow-red-400 shadow-sm fixed right-16 top-10 flex flex-row items-center rounded-full js-error-message hidden">
        <svg class="ml-4 size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
        <p class="ml-3">You have already liked the post!</p>      
      </div>
    `;

    for (const post of feed) {
      const userName = await findUser(post.owner)
      feedHtml +=  `
        <div class="md:w-108 w-100 border-b-1 md:mt-0  border-gray-600 flex items-center justify-center mt-8">
          <div class="font-sans px-10 py-4 w-full mt-0">
            <div class="flex items-center">
              <div class="flex items-center justify-center bg-gray-500 rounded-full size-8">
                ${userName[0].toUpperCase()}
              </div>
              <div class="flex flex-col ml-4">
                
                <span class="text-grey">${userName}</span>
              </div>
              <svg class=" ml-40 size-6 cursor-pointer " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>
            <div class="mt-3 mb-1 leading-normal text-lg">
              ${post.text}
            </div>
            <div class="text-grey mb-3 text-sm">
              ${convertTimestamp(post.createdAt)}
            </div>
            <div class="flex text-grey">
              <div class="flex items-center mr-4">
                <svg data-id="${post._id}" data-owner-id="${post.owner}" class="mr-2 cursor-pointer js-comment-button" width="24" height="24" viewBox="0 0 24 24">
                  <path class="fill-current" d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.045.286.12.403.143.225.385.347.633.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                </svg>
                <span>${post.comments.length}</span>
              </div>
              <div class="flex items-center">
                <div class="js-like-button" data-id="${post._id}">
                  <svg class="mr-2 cursor-pointer" width="24" height="24" viewBox="0 0 24 24">
                    <path class="fill-current" d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.813-1.148 2.353-2.73 4.644-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.375-7.454 13.11-10.037 13.156H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.035 11.596 8.55 11.658 1.52-.062 8.55-5.917 8.55-11.658 0-2.267-1.822-4.255-3.902-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.015-.03-1.426-2.965-3.955-2.965z"></path>
                  </svg>
                </div>
                <span>${post.likes.length}</span>
              </div>
            </div>
          </div>
        </div>
      `
    };


    document.querySelector('.js-pc-feed').innerHTML = feedHtml;

    document.querySelectorAll('.js-like-button').forEach((likeButton) => {
      likeButton.addEventListener('click', async () => {
        try {
          const id = likeButton.dataset.id
        
          const request = await fetch(`http://localhost:3000/posts/${id}/like`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
  
          const response = await request.json()
  
          if (request.status === 200) {
            console.log(response)
            const updatedLikes = response.likes.length;
  
            // Find the like count span and update its value
            const likeCountSpan = likeButton.nextElementSibling; // Assuming the span is the next sibling
            likeCountSpan.textContent = updatedLikes;
          } else {
            document.querySelector('.js-error-message').classList.remove('hidden')
            setTimeout(() => {
              document.querySelector('.js-error-message').classList.add('hidden')
            }, 2000);

          }
        } catch (error) {
          console.log(error)
        }
      })
    })

    document.querySelectorAll('.js-comment-button').forEach((button) => {
      button.addEventListener('click', async () => {
        const id = button.dataset.id;
        const user = await getUserProfile();
        console.log(user)
        document.querySelector('.js-pc-feed').innerHTML = `
          <div class="w-3/4 h-3/4 mt-20 rounded-md flex flex-col items-start justify-start shadow-md bg-back p-4">
            <svg class="fixed size-6 right-3 top-2 cursor-pointer js-close-button" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            
            <div class="flex flex-col h-5/6 w-full js-comment-section overflow-auto">
              
            </div>
    
            <div class="w-full h-1/6 flex flex-col">
              <div class="flex flex-row items-center">
                <div class="flex items-center justify-center bg-gray-500 rounded-full size-10">
                  ${user[0].toUpperCase()}
                </div>
    
                <input type="text" class="w-3/4 h-12 text-xl pl-4 bg-transparent outline-none js-comment-input" placeholder="Post your comment">
              </div>
    
              <button class="bg-button font-bold w-20 py-2 mt-3 rounded-full js-comment-post-button">Post</button>
            </div>
          </div>
        `;

        const postRequest = await fetch(`http://localhost:3000/posts/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        const post = await postRequest.json()

        let commentHTML = '';

        for (const comment of post.comments) {
          const commentOwner = await findUser(comment.user)
          commentHTML += `
            <div class="flex flex-row items-center mt-3">
              <div class="flex items-center justify-center bg-gray-500 rounded-full size-10">
                ${commentOwner[0].toUpperCase()}
              </div>
              <div class="px-4 py-2 bg-gray-600 rounded-full ml-3">
                <p>${comment.comment}</p>
              </div>
            </div>
          `;
        }

        document.querySelector('.js-comment-section').innerHTML = commentHTML
        
        document.querySelector('.js-comment-post-button').addEventListener('click', async () => {
          let comment = document.querySelector('.js-comment-input').value
          
          const request = await fetch(`http://localhost:3000/posts/${id}/comment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              comment
            })
          })

          const response = await request.json()
          
          window.location.reload()
        })
        // Re-attach the event listener for the close button
        document.querySelector('.js-close-button').addEventListener('click', () => {
          generatePcFeed()
          document.querySelector('.js-pc-feed').innerHTML = feedHtml;
        });
      });
    });    
  }

  generatePcFeed()
  

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
      console.log(response)

      if (request.status >= 400) {
        console.log('An error occured')
      } else {
        window.location.href = '/login' 
      }
    } catch (error) {
      console.log(error)
    }
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