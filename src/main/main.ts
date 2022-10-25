import { app, BrowserWindow } from 'electron';

var mainWindow: BrowserWindow;


app.on('ready', () => {
    mainWindow = new BrowserWindow({
        title: 'demo',
        width: 800,
        height: 600,
        webPreferences: {
            javascript: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL('http://127.0.0.1:5173/');
    mainWindow.webContents.openDevTools();
});
app.on('window-all-closed', () => {

    if (mainWindow) {
        mainWindow.destroy();
    }

    app.exit(0);
});