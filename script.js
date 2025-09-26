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

  let currentScene = 0;

  function showScene(index) {
    scenes.forEach((s, i) => s.classList.toggle('active', i === index));
    scenes.forEach(s => s.classList.remove('dimmed'));
    currentScene = index;

    const text = scenes[index].querySelector('h2');
    if (text && window.gsap) {
      gsap.fromTo(text, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
    }
    createBubblesContinuous(2500);

    if (currentScene === 0) {
      backBtn.style.display = "none";   
    } else {
      backBtn.style.display = "inline-block";
    }
  }

  function createBubble() {
    if (!bubbleContainer) return;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = `${Math.random() * 90}%`;
    bubble.style.width = `${Math.random() * 15 + 8}px`;
    bubble.style.height = bubble.style.width;
    bubbleContainer.appendChild(bubble);
    setTimeout(() => bubble.remove(), 3000);
  }

  function createBubblesContinuous(duration = 2000) {
    const interval = setInterval(createBubble, 150);
    setTimeout(() => clearInterval(interval), duration);
  }

  startDayBtn.addEventListener('click', () => {
    if (spongebobVoice) {
      spongebobVoice.currentTime = 0;
      spongebobVoice.play();
      spongebobVoice.onended = () => {
        showScene(1);
      };
    }
    if (bgMusic) bgMusic.play();
  });


  homeBtn.addEventListener("click", () => {
  showScene(0);
});


  backBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentScene > 0) {
      showScene(currentScene - 1);
    } else {
      showScene(0);
    }
  });
});

  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentScene + 1 < scenes.length) {
        showScene(currentScene + 1);
      } else {
        showScene(0);
      }
    });
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

  document.addEventListener('click', (e) => {
    if (bubbleSound && e.target.tagName === 'BUTTON') {
      bubbleSound.currentTime = 0;
      bubbleSound.play();
    }
  });

  showScene(currentScene);
});

document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  document.addEventListener('click', () => {
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  });
});

