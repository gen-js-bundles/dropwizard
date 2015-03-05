var
  inquirer = require("inquirer"),
  fs = require('fs'),
  path = require('path'),
  exec = require('child_process').exec;

module.exports = {
  do: function(data, callback) {
    // Start
    var questions = [
      {
        type: 'confirm',
        name: 'start',
        message: 'Start the application ?',
        default: true
      }
    ];
    inquirer.prompt(questions, function( answers ) {

      if(answers.start) {
        var outPath = path.join(process.cwd(),data.Genjsfile.config.outDir);
        try {
          var projectName = data.Genjsfile.global.project.name;
        } catch(e) {
          var projectName = 'app';
        }
        data.cli.exec('mvn package -Djar.finalName='+projectName, {cwd: outPath})
          .then(function() {
            return data.cli.exec('java -jar target/'+projectName+'.jar server example.yml', {cwd: outPath})
          })
          .then(function() {
            if(callback) {
              callback();
            }
          })
      }

    });
  }
};
