const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 400,
    frame: false,
    backgroundColor: "#FFFF",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../src/index.html"));
  }

  ipcMain.on("window-close", () => {
    win.close();
  });

  ipcMain.on("window-minimize", () => {
    win.minimize();
  });
};

app.whenReady().then(createWindow);
