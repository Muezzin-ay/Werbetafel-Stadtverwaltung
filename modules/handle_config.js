const fs = require('fs');

const CONFIG_FILE = './config.json'
const RAW_CONFIGURATION = '{"sequence":[],"hidden":[]}'

module.exports = {
    loadConfig : function () {
        if (!(fs.existsSync(CONFIG_FILE))) {
            fs.writeFile(CONFIG_FILE, RAW_CONFIGURATION, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("[API] Created Configuration file, because it did not exists")
            })
        }

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
        let fileId = configData.sequence.length;
        fileId++;
        
        // Look up available Ids
        for (let i=1; i<fileId; i++) {
            if (!(configData.sequence.includes(i.toString()))) {
                fileId = i;
                break;
            }
        }

        configData.sequence.push(fileId.toString());
        this.saveConfig(configData);
        func(fileId);
    },

    moveSlides : function() {
        let dest = './public/slides/out/';
        fs.readdir(dest, (error, files) => {
            for (let i=1; i<files.length+1; i++) {
                this.registerSlide((fileId) => {
                    let filename = "img"
                    if (i!=1) {
                        filename += "-" + i;
                    };
                    filename += '.jpg';
                    fs.rename(dest + filename, "./public/slides/" + fileId + ".JPG", function() {})
                })
            }
        });
    },

    deleteSlide : function(id, func) {
        let configData = this.loadConfig();
        configData.sequence = configData.sequence.filter((item) => { //filter out (delete) from sequence
            return item !== id;
        });
        configData.hidden = configData.hidden.filter((item) => { //filter out (delete) from hidden
            return item !== id;
        });
        this.saveConfig(configData);
        fs.unlink(`./public/slides/${id}.JPG`, func);
    },

    setVisible : function(id) {
        let configData = this.loadConfig();
        configData.hidden = configData.hidden.filter((item) => { //filter out (delete) from sequence
            return item !== id;
        })
        this.saveConfig(configData); 
    },
    setHidden : function(id) {
        let configData = this.loadConfig();
        configData.hidden.push(id);
        this.saveConfig(configData);
    }

}
