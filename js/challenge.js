document.addEventListener("DOMContentLoaded", () => {
  let counter = document.getElementById('counter');
  let count = 0;
  let intervalId;
  let isPaused = false;

  const minusButton = document.getElementById('minus');
  const plusButton = document.getElementById('plus');
  const heartButton = document.getElementById('heart');
  const pauseButton = document.getElementById('pause');
  const likesList = document.querySelector('.likes');
  const commentForm = document.getElementById('comment-form');
  const commentInput = document.getElementById('comment-input');
  const commentsList = document.getElementById('list');

  function startCounter() {
    intervalId = setInterval(() => {
      count++;
      counter.innerText = count;
    }, 1000);
  }

  function stopCounter() {
    clearInterval(intervalId);
  }

  startCounter();

  minusButton.addEventListener('click', () => {
    count--;
    counter.innerText = count;
  });

  plusButton.addEventListener('click', () => {
    count++;
    counter.innerText = count;
  });

  heartButton.addEventListener('click', () => {
    let existingLike = document.getElementById(`like-${count}`);
    if (existingLike) {
      let likeCount = parseInt(existingLike.dataset.likes, 10) + 1;
      existingLike.dataset.likes = likeCount;
      existingLike.innerText = `${count} has been liked ${likeCount} times`;
    } else {
      let likeItem = document.createElement('li');
      likeItem.id = `like-${count}`;
      likeItem.dataset.likes = 1;
      likeItem.innerText = `${count} has been liked 1 time`;
      likesList.appendChild(likeItem);
    }
  });

  pauseButton.addEventListener('click', () => {
    if (isPaused) {
      startCounter();
      pauseButton.innerText = 'pause';
      minusButton.disabled = false;
      plusButton.disabled = false;
      heartButton.disabled = false;
    } else {
      stopCounter();
      pauseButton.innerText = 'resume';
      minusButton.disabled = true;
      plusButton.disabled = true;
      heartButton.disabled = true;
    }
    isPaused = !isPaused;
  });

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let commentText = commentInput.value;
    if (commentText !== '') {
      let commentItem = document.createElement('p');
      commentItem.innerText = commentText;
      commentsList.appendChild(commentItem);
      commentInput.value = '';
    }
  });
});