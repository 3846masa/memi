import inquirer from 'inquirer';
import cowsay from 'cowsay';

export default {
  async start() {
    const { text } = await inquirer.prompt([
      {
        name: 'text',
        message: "How's it going?",
      },
    ]);
    this.echo(text);
  },
  echo(text = 'Hello Memi!') {
    console.log(cowsay.say({ text }));
  },
};
