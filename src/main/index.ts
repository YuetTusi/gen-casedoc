import { join } from 'path';
import { app, BrowserWindow } from 'electron';
import { bindHandle } from './bind';

var mainWindow: BrowserWindow;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        title: 'demo',
        width: 1200,
        height: 900,
        show: true,
        webPreferences: {
            javascript: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    if (process.env['NODE_ENV'] === 'development') {
        mainWindow.loadURL('http://127.0.0.1:4000/');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(join(__dirname, 'index.html'));
    }

    // mainWindow.setMenu(null);

    bindHandle(mainWindow);
});
app.on('window-all-closed', () => {

    if (mainWindow) {
        mainWindow.destroy();
    }

    app.exit(0);
});
