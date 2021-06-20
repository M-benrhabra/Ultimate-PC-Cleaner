const electron = require("electron");
const url = require("url");
const path = require("path");
const os = require('os');
const crypto = require('crypto');

const tmp = require('temp');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function () {
    // Create new window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // Load html in window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);



})


// Create menu template
const mainMenuTemplate = [
    // Each object is a dropdown
    {
        label: '',

    }
];

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                role: 'reload'
            },
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
};

// const getSize = require('get-folder-size');

// const myFolder = "C:\\data";
// getSize(myFolder, (err, size) => {
//   if (err) { throw err; }

//   console.log(size + ' bytes');
//   console.log((size / 1024 / 1024).toFixed(2) + ' MB');
// });






// console.log(`The temp path is: ${app.getAppPath("temp")}`);