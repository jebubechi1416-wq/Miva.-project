document.addEventListener('DOMContentLoaded', function () {
  var playlist = ['audio/song1.mp3', 'audio/song2.mp3'];
  var audio = document.getElementById('bg-audio');
  var source = document.getElementById('bg-audio-source');
  var label = document.getElementById('player-track-label');

  if (!audio) return;

  var STORAGE_KEY = 'homebase_player_state';
  var saved = null;
  try {
    saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  } catch (e) {}

  var current = saved && typeof saved.track === 'number' ? saved.track : 0;
  var resumeTime = saved && typeof saved.time === 'number' ? saved.time : 0;

  function loadTrack(index, startTime) {
    current = index % playlist.length;
    source.src = playlist[current];
    label.textContent = 'Now Playing · Track ' + (current + 1);
    audio.load();

    audio.addEventListener('loadedmetadata', function once() {
      audio.currentTime = startTime || 0;
      audio.removeEventListener('loadedmetadata', once);
    });

    audio.play().catch(function () {
      document.addEventListener('click', function onceClick() {
        audio.play();
        document.removeEventListener('click', onceClick);
      }, { once: true });
    });
  }

  audio.addEventListener('ended', function () {
    loadTrack(current + 1, 0);
  });

  // Save exact position continuously (covers link clicks, tab close, etc.)
  setInterval(function () {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        track: current,
        time: audio.currentTime
      }));
    } catch (e) {}
  }, 1000);

  window.addEventListener('beforeunload', function () {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        track: current,
        time: audio.currentTime
      }));
    } catch (e) {}
  });

  loadTrack(current, resumeTime);
});