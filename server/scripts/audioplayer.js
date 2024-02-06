const audioPlayer = document.querySelector('#audioPlayer');

fetch('/audio-files')
	.then((response) => response.json())
	.then((files) => {
		let currentFileIndex = Math.floor(Math.random() * files.length);

		function playNextFile() {
			if (currentFileIndex < files.length) {
				audioPlayer.src = `/audio/${files[currentFileIndex]}`;
				audioPlayer.play();
				currentFileIndex += 1;
			}
		}

		audioPlayer.onended = playNextFile;
		playNextFile();
	})
	.catch((error) => console.error('Error:', error));

// Get a reference to the volume toggle button
const volumeToggle = document.querySelector('#ToggleVolume');

// Add an event listener to the volume toggle button
volumeToggle.addEventListener('click', () => {
	// If the audio player is currently muted, unmute it
	if (audioPlayer.muted) {
		audioPlayer.muted = false;
		volumeToggle.src = 'images/nav/ic_volume_up_white_24dp_2x.png'; // Change the icon to the volume on icon
	} else { // Move the else to the same line as the closing brace of the if block
		// Otherwise, mute the audio player
		audioPlayer.muted = true;
		volumeToggle.src = 'images/nav/ic_volume_off_white_24dp_2x.png'; // Change the icon to the volume off icon
	}
});
