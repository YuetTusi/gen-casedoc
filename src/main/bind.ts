import { app, BrowserWindow, dialog, ipcMain, IpcMainInvokeEvent } from "electron";

function bindHandle(mainWindow: BrowserWindow) {

    ipcMain.handle('show-save-dialog', async (event: IpcMainInvokeEvent, ...args: any[]) => {
        event.preventDefault();
        const [options] = args;
        try {
            const value = await dialog.showSaveDialog(mainWindow, options);
            return value;
        } catch (error) {
            console.log(error);
            return null;
        }
    });

    ipcMain.handle('show-open-dialog', async (event: IpcMainInvokeEvent, ...args: any[]) => {
        event.preventDefault();
        const [options] = args;

        console.log(options);
        try {
            const value = await dialog.showOpenDialog(mainWindow, options);
            return value;
        } catch (error) {
            console.log(error);
            return null;
        }
    });

    ipcMain.handle('get-path', (event: IpcMainInvokeEvent, ...args: any[]) => app.getPath(args[0]));
}

export { bindHandle };