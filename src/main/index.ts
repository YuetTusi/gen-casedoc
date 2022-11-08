import { join } from 'path';
import { app, BrowserWindow } from 'electron';
import { bindHandle } from './bind';

var mainWindow: BrowserWindow;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        title: '文档生成',
        width: 1280,
        height: 900,
        minHeight: 600,
        minWidth: 1280,
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
