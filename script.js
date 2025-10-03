document.addEventListener('DOMContentLoaded', () => {
  const startDayBtn = document.getElementById('startDayBtn');
  const sleepBtn = document.getElementById('sleepBtn');
  const wakeUpBtn = document.getElementById('wakeUpBtn');
  const dimOverlay = document.getElementById('dimOverlay');
  const bgMusic = document.getElementById('bgMusic');
  const bubbleSound = document.getElementById('bubbleSound');
  const spongebobVoice = document.getElementById('spongebobVoice');
  const spongebobLaugh = document.getElementById('spongebobLaugh');
  const spongebobSleep = document.getElementById('spongebobSleep');
  const nextBtns = document.querySelectorAll('.nextBtn');
  const scenes = document.querySelectorAll('.scene');
  const bubbleContainer = document.getElementById('bubbleContainer');
  const homeBtn = document.getElementById('homeBtn');
  const backBtns = document.querySelectorAll('.backBtn');
  const clickSound = document.getElementById('clickSound');
  const resetDayBtn = document.getElementById('resetDayBtn'); 

  // Select the todo list items properly
  const todoItems = document.querySelectorAll('.todo-list li');

  let currentScene = 0;
  let bubbleInterval;

  // Update todo list based on current scene
  function updateTodoList(index) {
    todoItems.forEach((item, idx) =>{ 
      if (idx < index) {
        if (!item.classList.contains('completed')) {
          item.classList.add('completed');
          // GSAP bounce animation practice
          //gsap.fromTo(item, { scale: 0.5 }, { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1, ease: "bounce.out" });
          document.getElementsByClassName('check')[idx].textContent = '✅';
        }
      } else {
        item.classList.remove('completed');
      }
    });
  }

  //switching scenes
  function showScene(index) {
    if (index < 0 || index >= scenes.length) return;

    scenes.forEach((s, i) => {
      s.classList.toggle('active', i === index);
      s.classList.remove('dimmed');
    });

    currentScene = index;

    const heading = scenes[index].querySelector('h2');
    if (heading && window.gsap) {
      gsap.fromTo(heading, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
    }

    startBubbles(5000);

    // Show back buttons only if not first scene
    backBtns.forEach(btn => btn.style.display = (currentScene === 0 ? "none" : "inline-block"));

    // Update todo list
    updateTodoList(currentScene);
  }

  function createBubble() {
    if (!bubbleContainer) return;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = `${Math.random() * 90}%`;
    const size = Math.random() * 15 + 8;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubbleContainer.appendChild(bubble);
    setTimeout(() => bubble.remove(), 3000);
  }

  function startBubbles(duration = 2000) {
    if (bubbleInterval) clearInterval(bubbleInterval);
    bubbleInterval = setInterval(createBubble, 150);
    setTimeout(() => clearInterval(bubbleInterval), duration);
  }

  startDayBtn.addEventListener('click', () => {
    if (spongebobVoice) {
      spongebobVoice.currentTime = 0;
      spongebobVoice.play();
      spongebobVoice.onended = () => showScene(1);
    }
    if (bgMusic) bgMusic.play();
  });

  homeBtn.addEventListener("click", () => showScene(0));

  backBtns.forEach(btn => {
    btn.addEventListener("click", () => showScene(Math.max(currentScene - 1, 0)));
  });

  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => showScene((currentScene + 1) % scenes.length));
  });

  sleepBtn.addEventListener('click', () => {
    dimOverlay.style.opacity = 1;
    dimOverlay.style.pointerEvents = 'auto';
    wakeUpBtn.style.display = 'block';
    scenes[0].classList.add('dimmed');
    if (bgMusic) bgMusic.pause();
    if (spongebobSleep) {
      spongebobSleep.currentTime = 0;
      spongebobSleep.play();
    }
  });

  wakeUpBtn.addEventListener('click', () => {
    dimOverlay.style.opacity = 0;
    dimOverlay.style.pointerEvents = 'none';
    wakeUpBtn.style.display = 'none';
    if (bgMusic) bgMusic.play();
    if (spongebobLaugh) {
      spongebobLaugh.currentTime = 0;
      spongebobLaugh.play();
    }
    scenes[0].classList.remove('dimmed');
  });

  if (resetDayBtn) {
    resetDayBtn.addEventListener('click', () => {
      showScene(0);
      if (bgMusic) bgMusic.currentTime = 0;
      const checks = document.getElementsByClassName('check');
      checks.forEach(check => check.textContent = '');
      todoItems.forEach(item => item.classList.remove('completed'));
    });
  }

  // Play bubble and click sounds on button click
  document.addEventListener('click', (e) => {
    if (bubbleSound && e.target.tagName === 'BUTTON') {
      bubbleSound.currentTime = 0;
      bubbleSound.play();
    }
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  });

  showScene(currentScene);
});
