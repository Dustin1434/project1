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

  let currentScene = 0;
  let bubbleInterval;

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
    startBubbles(3000);
    const displayStyle = (currentScene === 0) ? "none" : "inline-block";
    backBtns.forEach(btn => btn.style.display = displayStyle);
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
