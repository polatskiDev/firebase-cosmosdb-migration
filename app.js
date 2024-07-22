const fs = require('fs');

const inputJson = require('./firebaseExportedDBFile.json');

for (const collectionName in inputJson) {
    const collectionData = inputJson[collectionName];
    const collectionArray = [];
  
    for (const key in collectionData) {
      if (key !== '__collections__') {
        const isPolling = (collectionName === 'polling');
        const item = isPolling ? 
            { id:key, job: collectionData[key]} :
            { id: key, ...collectionData[key] };
        delete item['__collections__'];
        collectionArray.push(item);
      }
    }
  
    const collectionJson = JSON.stringify(collectionArray, null, 2);
  
    fs.writeFileSync(`${collectionName}.json`, collectionJson);
}
