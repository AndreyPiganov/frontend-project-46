import { Command } from 'commander';

const getSynopsis = () => {
  const program = new Command();

  program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('');

  program.parse();
};
export default getSynopsis;

