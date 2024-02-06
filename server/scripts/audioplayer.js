const audioPlayer = document.querySelector('#audioPlayer');

let wasAutoplayBlocked = false;

fetch('/audio-files')
	.then((response) => response.json())
	.then((files) => {
		let currentFileIndex = Math.floor(Math.random() * files.length);

		function playNextFile() {
			if (currentFileIndex >= files.length) {
				currentFileIndex = 0;
			}

			audioPlayer.src = `/audio/${files[currentFileIndex]}`;
			audioPlayer.play().catch(() => {
				audioPlayer.muted = true;
				wasAutoplayBlocked = true;
			});

			currentFileIndex += 1;
		}

		audioPlayer.onended = playNextFile;

		playNextFile();
	})
	.catch((error) => console.error('Error:', error));

const volumeToggle = document.querySelector('#ToggleVolume');

audioPlayer.addEventListener('volumechange', () => {
	volumeToggle.src = audioPlayer.muted ? 'images/nav/ic_volume_off_white_24dp_2x.png' : 'images/nav/ic_volume_up_white_24dp_2x.png';
});

// const volumeSlider = document.querySelector('#VolumeSlider');

volumeToggle.addEventListener('click', () => {
	if (audioPlayer.muted) {
		audioPlayer.muted = false;
		// volumeSlider.style.display = 'block';
		if (wasAutoplayBlocked) {
			audioPlayer.play();
			wasAutoplayBlocked = false;
		}
	} else {
		audioPlayer.muted = true;
		// volumeSlider.style.display = 'none';
	}
});

// volumeSlider.addEventListener('input', () => {
// 	audioPlayer.volume = volumeSlider.value;
// });
