const fs = require('fs');

const CONFIG_FILE = './config.json'

module.exports = {
    loadConfig : function () {
        let data = fs.readFileSync(CONFIG_FILE), 
        config;
        config = JSON.parse(data);
        return config
    },


    saveConfig : function (data) {
        let content = JSON.stringify(data);
        fs.writeFile(CONFIG_FILE, content, function (err) {
            if (err) {
                console.log(err);
            }
        })
    },

    saveSequence : function(sequence) {
        let configData = this.loadConfig();
        configData.sequence = sequence;
        this.saveConfig(configData);
    }

}



