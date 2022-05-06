// Require Node Dependencies.
const express = require('express');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const cors = require("cors");
const { promises: { readdir } } = require('fs')

const helpers = {}

helpers.getDirectories = async (source) => {
    
    return (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

}

helpers.copyFolders = (from, to) => {

    fse.copySync(from, to,{ overwrite: true }, (err) => {
        if (err) {                 
            console.error(err);     
        } else {
            console.log("success!");
        }
    });
} 



// Constants.
const expressServer = express();
const server = {};

// Express Metoder. De fungere som hjælpere til at håndtere http requests osv.
expressServer.use(express.json());
expressServer.use(cors());
expressServer.use(express.static(path.join(__dirname, '../vault')));
expressServer.use(express.static(path.join(__dirname, '../release')));
expressServer.use(express.static(path.join(__dirname, '../client')));
expressServer.use(express.urlencoded({

  extended: true

}));

expressServer.get('/', (req, res) => {

    res.sendFile(path.resolve(__dirname, '../client/index.html'));

});

// Vault
expressServer.get('/moments/generate', (req, res) => {

    let momentsData = [];

    let dir = './release';
    fs.mkdirSync('./release');
    fs.mkdirSync(dir + '/moments');
    fs.mkdirSync(dir + '/assets');
    fs.mkdirSync(dir + '/data');


    helpers.getDirectories('vault').then( (momentDirectory) => {





        console.log(momentDirectory);

        momentDirectory.forEach( (momentDir) => {

            fs.copyFile( './vault/' + momentDir + '/' + momentDir + '.html',  './release/moments/' + momentDir + '.html', (err) => {
            
                if (err) {
        
                    throw err
        
                }
    
            });

            helpers.copyFolders('./vault/' + momentDir + '/assets/' + momentDir, './release/assets/moments/' + momentDir)


            fs.readFile('./vault/' + momentDir + '/data/' + momentDir + '.json', 'utf8', (err, data) => {

            
                data = JSON.parse(data);
    
        
                momentsData.push(data);
                
                // Writing moments file -> moments.json
                fs.writeFile('./release/data/moments.json', JSON.stringify(momentsData), 'utf8', () => {
                    res.setHeader('content-type', 'application/json');
                    res.status(201).send('Generated');
                });
    
            });


        })
    })
});

 // Init metode til at starte serveren.
server.run = () => {

    // Port som vi lytter på.
    let port = 3002;

    // Starter HTTP server.
    expressServer.listen(port, () => {

        console.log('\x1b[31m%s\x1b[0m','\n-------\nVores Moment Create Server køre på http://localhost:' + port);

    });

};

// Exporting
module.exports = server;