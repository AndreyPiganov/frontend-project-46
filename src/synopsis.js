import { Command } from 'commander';

const getSynopsis = () => {
  const program = new Command();

  program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('')
  .option('-f ,--format <type>', 'output format')
  .argument('<filepath1> <filepath2>')

  program.parse();
};
export default getSynopsis;

