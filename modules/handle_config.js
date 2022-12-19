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
        fs.writeFileSync(CONFIG_FILE, content, function (err) {
            if (err) {
                console.log(err);
            }
        })
    },

    saveSequence : function(sequence) {
        let configData = this.loadConfig();
        configData.sequence = sequence;
        this.saveConfig(configData);
    },

    registerSlide : function(func) {
        let configData = this.loadConfig();
        let reg = configData.sequence.length;
        reg++;
        configData.sequence.push(reg.toString());
        this.saveConfig(configData);
        func(reg);
    },

    moveSlides : function() {
        let dest = './public/slides/out/';
        fs.readdir(dest, (error, files) => {
            for (let i=1; i<files.length+1; i++) {
                this.registerSlide((reg) => {
                    let filename = "img"
                    if (i!=1) {
                        filename += "-" + i;
                    };
                    filename += '.jpg';
                    fs.rename(dest + filename, "./public/slides/" + reg + ".JPG", function() {})
                })
            }
        });
    }

}



