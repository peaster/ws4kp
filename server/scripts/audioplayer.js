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

const volumeToggle = document.querySelector('#ToggleVolume');

volumeToggle.addEventListener('click', () => {
	if (audioPlayer.muted) {
		audioPlayer.muted = false;
		volumeToggle.src = 'images/nav/ic_volume_up_white_24dp_2x.png';
	} else {
		audioPlayer.muted = true;
		volumeToggle.src = 'images/nav/ic_volume_off_white_24dp_2x.png';
	}
});
