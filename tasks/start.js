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
        var command = 'mvn package';
        console.log('=>',command,' in ',outPath);
        data.cli.exec(command, {cwd: outPath})
          .then(function() {
            if(callback) {
              callback();
            }
          })
      }

    });
  }
};
