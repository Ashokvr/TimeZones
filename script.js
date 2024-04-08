document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('timezone-select').addEventListener('change', function(event) {
    event.preventDefault();
    localStorage.setItem('selectedTimeZone', this.value);
    clearInterval(window.timeInterval);
    updateCurrentTime(this.value);
  });
});

function initializeTimeDisplay() {
  const savedTimeZone = localStorage.getItem('selectedTimeZone') || document.getElementById('timezone-select').value;
  document.getElementById('timezone-select').value = savedTimeZone; // Set the dropdown to the saved value
  
  updateCurrentTime(savedTimeZone);
}
function updateCurrentTime(timeZone) {
  const currentTimeElement = document.getElementById('current-time');
  let lastTime = '';

  const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZone: timeZone
      });
      const timeString = formatter.format(now);
     
      // Update the time display only if it has changed
      if (lastTime !== timeString) {
          currentTimeElement.textContent =  timeString;
          lastTime = timeString;
          // updateBackground(hour,amPm);
      }
  };
  updateTime();
  window.timeInterval = setInterval(updateTime, 1000);
}
function updateBackground(hour) {
  const containerElement = document.querySelector('.container');
  console.log(hour,amPm)
  if (hour >= 6 && hour < 18) {
      containerElement.classList.add('day');
      containerElement.classList.remove('night');
  } else {
      containerElement.classList.add('night');
      containerElement.classList.remove('day');
  }
}
// Initialize the time display with the first time zone in the dropdown
updateCurrentTime(document.getElementById('timezone-select').value);
