var inquirer = require('inquirer');
var cowsay = require('cowsay');

module.exports = {
  start: async function() {
    const { text } = await inquirer.prompt([
      {
        name: 'text',
        message: "How's it going?",
      },
    ]);
    this.echo(text);
  },
  echo: function(text = 'Hello Memi!') {
    console.log(cowsay.say({ text }));
  },
};
