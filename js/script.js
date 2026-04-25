document.addEventListener("DOMContentLoaded", function () {
  initCountdown();
  initStartScreen();
  initBackgroundMusic();
  initSmoothScroll();
});

function initCountdown() {
  const deadline = new Date("2026-09-12T16:00:00+05:00");

  const daysEl =
    document.querySelector(".cd-days .tn-atom") ||
    document.querySelector(".cd-days");
  const daysTextEl =
    document.querySelector(".cd-days-text .tn-atom") ||
    document.querySelector(".cd-days-text");

  const hoursEl =
    document.querySelector(".cd-hours .tn-atom") ||
    document.querySelector(".cd-hours");
  const hoursTextEl =
    document.querySelector(".cd-hours-text .tn-atom") ||
    document.querySelector(".cd-hours-text");

  const minutesEl =
    document.querySelector(".cd-minutes .tn-atom") ||
    document.querySelector(".cd-minutes");
  const minutesTextEl =
    document.querySelector(".cd-minutes-text .tn-atom") ||
    document.querySelector(".cd-minutes-text");

  const secondsEl =
    document.querySelector(".cd-seconds .tn-atom") ||
    document.querySelector(".cd-seconds");
  const secondsTextEl =
    document.querySelector(".cd-seconds-text .tn-atom") ||
    document.querySelector(".cd-seconds-text");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
    return;
  }

  function declOfNum(number, words) {
    return words[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][Math.min(number % 10, 5)]
    ];
  }

  function setTextSafe(element, text) {
    if (!element) return;

    if (element.firstChild && element.firstChild.nodeType === Node.TEXT_NODE) {
      element.firstChild.nodeValue = text;
    } else {
      element.textContent = text;
    }
  }

  function updateTimer() {
    const now = new Date();
    let timeLeft = Math.floor((deadline - now) / 1000);

    if (timeLeft < 0) {
      timeLeft = 0;
    }

    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    setTextSafe(daysEl, String(days).padStart(2, "0"));
    setTextSafe(daysTextEl, declOfNum(days, ["день", "дня", "дней"]));

    setTextSafe(hoursEl, String(hours).padStart(2, "0"));
    setTextSafe(hoursTextEl, declOfNum(hours, ["час", "часа", "часов"]));

    setTextSafe(minutesEl, String(minutes).padStart(2, "0"));
    setTextSafe(minutesTextEl, declOfNum(minutes, ["минута", "минуты", "минут"]));

    setTextSafe(secondsEl, String(seconds).padStart(2, "0"));
    setTextSafe(secondsTextEl, declOfNum(seconds, ["секунда", "секунды", "секунд"]));
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

function initStartScreen() {
  const body = document.body;
  const screen = body.querySelector(".uc-abr-startscreen");

  if (!screen) return;

  const button = screen.querySelector(".abr-startbutton");
  if (!button) return;

  body.style.overflow = "hidden";

  button.addEventListener("click", function () {
    screen.classList.add("opacity");
    button.classList.add("opacity");
    body.style.overflow = "auto";
    window.scrollTo(0, 0);

    const playButton = document.querySelector(".playbgmusic");
    if (playButton) {
      playButton.click();
    }
  });
}

function initBackgroundMusic() {
  const audio = document.getElementById("bg-sound");
  const playButton = document.querySelector(".playbgmusic");
  const stopButton = document.querySelector(".stopbgmusic");

  if (!audio) {
    console.warn("Музыка: элемент #bg-sound не найден.");
    return;
  }

  if (!playButton) {
    console.warn("Музыка: кнопка .playbgmusic не найдена.");
    return;
  }

  if (!stopButton) {
    console.warn("Музыка: кнопка .stopbgmusic не найдена.");
    return;
  }

  audio.volume = 0.4;

  let wasPlaying = false;

  stopButton.style.display = "none";

  function showPlayButton() {
    playButton.style.display = "";
    stopButton.style.display = "none";
  }

  function showStopButton() {
    playButton.style.display = "none";
    stopButton.style.display = "";
  }

  playButton.addEventListener("click", function () {
    audio
      .play()
      .then(function () {
        wasPlaying = true;
        showStopButton();
      })
      .catch(function (error) {
        console.warn("Музыка не запустилась:", error);
        showPlayButton();
      });
  });

  stopButton.addEventListener("click", function (event) {
    event.preventDefault();

    audio.pause();
    wasPlaying = false;
    showPlayButton();
  });

  audio.addEventListener("ended", function () {
    wasPlaying = false;
    showPlayButton();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      audio.pause();
    } else if (wasPlaying) {
      audio.play().catch(function (error) {
        console.warn("Музыка не возобновилась:", error);
      });
    }
  });
}

function initSmoothScroll() {
  if (typeof SmoothScroll !== "function") return;

  SmoothScroll({
    animationTime: 800,
    stepSize: 75,
    accelerationDelta: 30,
    accelerationMax: 2,
    keyboardSupport: true,
    arrowScroll: 50,
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,
    touchpadSupport: true,
  });
}