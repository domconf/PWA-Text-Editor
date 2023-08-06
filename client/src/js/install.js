const butInstall = document.getElementById('buttonInstall');
let deferredPrompt = null;

const showInstallButton = () => {
    butInstall.classList.remove('hidden');
};

const hideInstallButton = () => {
    butInstall.classList.add('hidden');
};

// TODO: Add an event listener for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    deferredPrompt = event;
    showInstallButton();
});

// TODO: Implement a click event handler for the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
        hideInstallButton();
    }
});

// TODO: Add an event listener for the `appinstalled` event
window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
});