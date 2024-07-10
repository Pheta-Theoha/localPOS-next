// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// async function createWindow() {
//   const win = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//     },
//   });

//   if (app.isPackaged) {
//     const { default: serve } = await import('electron-serve');
//     const appServe = serve({ directory: path.join(__dirname, '../out/index.html') });
    
//     appServe(win).then(() => {
//       win.loadURL('app://-');
//     });
//   } else {
//     win.loadURL('http://localhost:3000');
//     win.webContents.openDevTools();
//     win.webContents.on('did-fail-load', (e, code, desc) => {
//       win.webContents.reloadIgnoringCache();
//     });
//   }
// }

// app.on('ready', createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// // const { app, BrowserWindow } = require('electron');
// // const path = require('path');

// // function createWindow() {
// //     const mainWindow = new BrowserWindow({
// //         width: 800,
// //         height: 600,
// //         webPreferences: {
// //             preload: path.join(__dirname, 'preload.js'),
// //             nodeIntegration: true,
// //             contextIsolation: false
// //         }
// //     });

// //     mainWindow.loadFile('../out');
// //     mainWindow.webContents.openDevTools();
// // }

// // app.on('ready', createWindow);

// // app.on('window-all-closed', () => {
// //     if (process.platform !== 'darwin') {
// //         app.quit();
// //     }
// // });

// // app.on('activate', () => {
// //     if (BrowserWindow.getAllWindows().length === 0) {
// //         createWindow();
// //     }
// // });

// // const { app, BrowserWindow } = require('electron');
// // const path = require('path');

// // async function createWindow() {
// //   const win = new BrowserWindow({
// //     width: 1200,
// //     height: 800,
// //     webPreferences: {
// //       preload: path.join(__dirname, 'preload.js'),
// //     },
// //   });

// //   if (app.isPackaged) {
// //     win.webContents.openDevTools();
// //     const { default: serve } = await import('electron-serve');
// //     const appServe = serve({ directory: path.join(__dirname, '../out') });

// //     try {
// //       await appServe(win);
// //       win.loadURL('app://-');
// //     } catch (error) {
// //       console.error('Failed to load URL in packaged app:', error);
// //       win.loadFile(path.join(`${__dirname}/../out/index.html`));
// //     }
// //   } else {
// //     win.loadURL('http://localhost:3000');
// //     win.webContents.openDevTools();

// //     win.webContents.on('did-fail-load', (e, code, desc) => {
// //       console.error('Page failed to load:', desc);
// //       win.webContents.reloadIgnoringCache();
// //     });
// //   }
// // }

// // app.on('ready', createWindow);

// // app.on('window-all-closed', () => {
// //   if (process.platform !== 'darwin') {
// //     app.quit();
// //   }
// // });

// // app.on('activate', () => {
// //   if (BrowserWindow.getAllWindows().length === 0) {
// //     createWindow();
// //   }
// // });

// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// async function createWindow() {
//   const win = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js')
//     },
//   });

//   if (app.isPackaged) {
//     try {
//       const { default: serve } = await import('electron-serve');
//       const appServe = serve({ directory: path.join(__dirname, '../out/') });
      
//       await appServe(win);
//       win.loadURL('app://-');
//     } catch (error) {
//       console.error('Failed to load URL in packaged app:', error);
//       // Fallback to loading index.html directly
//       win.loadFile(path.join(__dirname, '../out/index.html'));
//       console.log(__dirname);
//     }
//   } else {
//     win.loadURL('http://localhost:3000');
//     // win.webContents.openDevTools();

//     win.webContents.on('did-fail-load', (e, code, desc) => {
//       console.error('Page failed to load:', desc);
//       win.webContents.reloadIgnoringCache();
//     });
//   }
// }

// app.on('ready', createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// async function createWindow() {
//   const win = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js') // Ensure this path is correct
//     },
//   });

//   if (app.isPackaged) {
//     try {
//       const { default: serve } = await import('electron-serve');
//       const appServe = serve({ directory: path.join(__dirname, '../out/') });
      
//       await appServe(win);
//       win.loadURL('app://-');
//     } catch (error) {
//       console.error('Failed to load URL in packaged app:', error);
//       // Fallback to loading index.html directly
//       win.loadFile(path.join(__dirname, '../out/index.html'));
//     }
//   } else {
//     win.loadURL('http://localhost:3000');

//     win.webContents.on('did-fail-load', (e, code, desc) => {
//       console.error('Page failed to load:', desc);
//       win.webContents.reloadIgnoringCache();
//     });
//   }
// }

// app.on('ready', createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// function createWindow() {
//   const preloadPath = app.isPackaged
//     ? path.join(__dirname, 'preload.js')
//     : path.join(__dirname, '../main/preload.js');

//   const win = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       preload: preloadPath
//     },
//   });

//   if (app.isPackaged) {
//     try {
//       const { default: serve } = require('electron-serve');
//       const appServe = serve({ directory: path.join(__dirname, '../out/') });
      
//       appServe(win);
//       win.loadURL('app://-');
//       console.log('Preload script path:', preloadPath);
//     } catch (error) {
//       console.error('Failed to load URL in packaged app:', error);
//       win.loadFile(path.join(__dirname, '../out/index.html'));
//       console.log('Preload script path:', preloadPath);
//     }
//   } else {
//     win.loadURL('http://localhost:3000');

//     win.webContents.on('did-fail-load', (e, code, desc) => {
//       console.error('Page failed to load:', desc);
//       win.webContents.reloadIgnoringCache();
//     });
//   }
// }

// app.on('ready', createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// const { app, BrowserWindow } = require('electron');
// const path = require('path');



// async function createWindow() {
//   const preloadPath = app.isPackaged
//     ? path.join(__dirname, 'preload.js')
//     : path.join(__dirname, '../main/preload.js');

//   const win = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       preload: preloadPath,
//       nodeIntegration: true
//     },
//   });

//   console.log('Preload script path:', preloadPath);
//   console.log('App is packaged:', app.isPackaged);

//   if (app.isPackaged) {
//     try {
//       const { default: serve } = require('electron-serve');
//       const appServe = serve({ directory: path.join(__dirname, '../out/') });
      
//       await appServe(win);
//       win.loadURL('app://-');
//     } catch (error) {
//       console.error('Failed to load URL in packaged app:', error);
//       // Fallback to loading index.html directly
//       win.loadFile(path.join(__dirname, '../out/index.html'));
//     }
//   } else {
//     win.loadURL('http://localhost:3000');

//     win.webContents.on('did-fail-load', (e, code, desc) => {
//       console.error('Page failed to load:', desc);
//       win.webContents.reloadIgnoringCache();
//     });
//   }
// }

// app.on('ready', createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

const { app, BrowserWindow } = require('electron');
const path = require('path');

async function createWindow() {
  const preloadPath = app.isPackaged
    ? path.join(__dirname, 'preload.js')
    : path.join(__dirname, '../main/preload.js');

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      webSecurity: false,
      preload: preloadPath
    },
  });

  console.log('Preload script path:', preloadPath);
  console.log('App is packaged:', app.isPackaged);

  if (app.isPackaged) {
    try {
      const { default: serve } = require('electron-serve');
      const appServe = serve({ directory: path.join(__dirname, '../out/') });

      await appServe(win);
      // win.loadURL('app://-');
      win.loadFile('../out/index.html');
    } catch (error) {
      console.error('Failed to load URL in packaged app:', error);
      // Fallback to loading index.html directly
      win.loadFile('../out/index.html');
    }
  } else {
    win.loadURL('http://localhost:3000');

    win.webContents.on('did-fail-load', (e, code, desc) => {
      console.error('Page failed to load:', desc);
      win.webContents.reloadIgnoringCache();
    });
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

