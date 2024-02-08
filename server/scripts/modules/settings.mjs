import Setting from './utils/setting.mjs';

document.addEventListener('DOMContentLoaded', () => {
	init();
});

const settings = {};

const init = () => {
	// create settings
	settings.wide = new Setting('wide', 'Widescreen', 'boolean', false, wideScreenChange);
	settings.hideBranding = new Setting('hideBranding', 'Hide Branding', 'boolean', false, hideBrandingChange);

	// generate checkboxes
	const checkboxes = Object.values(settings).map((d) => d.generateCheckbox());

	// write to page
	const settingsSection = document.querySelector('#settings');
	settingsSection.innerHTML = '';
	settingsSection.append(...checkboxes);
};

const wideScreenChange = (value) => {
	const container = document.querySelector('#divTwc');
	if (value) {
		container.classList.add('wide');
	} else {
		container.classList.remove('wide');
	}
};

function hideBrandingChange(value) {
	document.querySelectorAll('.logo').forEach((logo) => {
		logo.style.display = value ? 'none' : 'block';
	});
}

export default settings;
