// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer, ipcMain } = require('electron')

const symptomData = {
    label: {
        type: "string"
    },
    maxvalue: {
        type: "number"
    },
    defaultvalue: {
        type: "number"
    },
    icon: {
        type: "string"
    }
}



const symptomSchema = {
    _id: {
        type: "string",
        editable: false
    },
    label: {
        type: "string",
        editable: true
    },
    maxvalue: {
        type: "number",
        editable: true,
        min: 1
    },
    value: {
        type: "number",
        editable: true,
        min: 0
    },
    icon: {
        type: "icon",
        editable: true
    }
};


contextBridge.exposeInMainWorld('api', {
    getSymptomSchema: () => {
        // return a COPY so renderer can’t mutate the original
        return structuredClone(symptomSchema);
    },
    getSymptomDataSchema: () => {
        // return a COPY so renderer can’t mutate the original
        return structuredClone(symptomData);
    },
    getToggleButtonSchema: () => {
        // return a copy of a thing
        return structuredClone(toggableButton);

    },

    sendUserData: (data) =>
        ipcRenderer.invoke("recieve-data", data),

    askForData: (data) =>
        ipcRenderer.send("sendme-data", data),
    

});

contextBridge.exposeInMainWorld('db', {
  getAll: () => ipcRenderer.invoke('db:getAll'),
  put: (doc) => ipcRenderer.invoke('db:put', doc),
  remove: (id, rev) => ipcRenderer.invoke('db:remove', id, rev),
  allDocs: (query) => ipcRenderer.invoke('db:allDocs', query),
    findByPrefix(prefix) {
    return ipcRenderer.invoke('db:findByPrefix', prefix);
  },
});