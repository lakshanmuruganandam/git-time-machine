#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';
import pc from 'picocolors';
import { Command } from 'commander';
import boxen from 'boxen';

const program = new Command();

program
  .name('git-time-machine')
  .description('Interactively travel between your recent Git branches with a beautiful UI.')
  .version('1.0.0')
  .parse(process.argv);

const banner = `
    ██████╗ ██╗████████╗    ████████╗██╗███╗   ███╗███████╗    ███╗   ███╗ █████╗  ██████╗ ██╗  ██╗██╗███╗   ██╗███████╗
    ██╔════╝ ██║╚══██╔══╝    ╚══██╔══╝██║████╗ ████║██╔════╝    ████╗ ████║██╔══██╗██╔════╝ ██║  ██║██║████╗  ██║██╔════╝
    ██║  ███╗██║   ██║          ██║   ██║██╔████╔██║█████╗      ██╔████╔██║███████║██║      ███████║██║██╔██╗ ██║█████╗  
    ██║   ██║██║   ██║          ██║   ██║██║╚██╔╝██║██╔══╝      ██║╚██╔╝██║██╔══██║██║      ██╔══██║██║██║╚██╗██║██╔══╝  
    ╚██████╔╝██║   ██║          ██║   ██║██║ ╚═╝ ██║███████╗    ██║ ╚═╝ ██║██║  ██║╚██████╗ ██║  ██║██║██║ ╚████║███████╗
     ╚═════╝ ╚═╝   ╚═╝          ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝
`;

console.log(pc.magenta(banner));
console.log(pc.gray('    Where are we going today?'));
console.log(pc.dim('    Architected by @lakshanmuruganandam\n'));

try {
  // Check if we are in a git repo
  execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
} catch (e) {
  console.log(pc.red('❌ You are not inside a Git repository. Exiting.'));
  process.exit(1);
}

try {
  const currentBranch = execSync('git branch --show-current').toString().trim();
  const rawBranches = execSync('git for-each-ref --sort=-committerdate refs/heads/ --format="%(refname:short)|%(committerdate:relative)|%(authorname)|%(subject)"').toString().trim();
  
  if (!rawBranches) {
    console.log(pc.green('✨ Your repository is completely empty. No branches found.'));
    process.exit(0);
  }

  const branches = rawBranches.split('\n').map(line => {
    const [name, date, author, subject] = line.split('|');
    return { name: name?.trim(), date: date?.trim(), author: author?.trim(), subject: subject?.trim() };
  }).filter(b => b.name && b.name !== currentBranch);

  if (branches.length === 0) {
    console.log(pc.green(`✨ You only have the current branch (${currentBranch}). Nowhere to travel to.`));
    process.exit(0);
  }

  const choices = branches.map(b => {
    let dateColored = pc.gray(b.date);
    if (b.date.includes('minutes') || b.date.includes('hours')) {
      dateColored = pc.green(b.date);
    } else if (b.date.includes('days')) {
      dateColored = pc.yellow(b.date);
    }

    // Truncate subject if too long
    let shortSubject = b.subject || '';
    if (shortSubject.length > 40) shortSubject = shortSubject.substring(0, 37) + '...';

    return {
      name: `${b.name.padEnd(25)} 🕒 ${dateColored.padEnd(25)} 📝 ${pc.gray(shortSubject)}`,
      value: b.name,
      short: b.name
    };
  });

  const { selected } = await inquirer.prompt([{
    type: 'list',
    name: 'selected',
    message: `Select a timeline to travel to (Current: ${pc.cyan(currentBranch)}):`,
    choices: choices,
    pageSize: 12,
    loop: false
  }]);

  console.log();
  try {
    const output = execSync(`git checkout ${selected}`, { encoding: 'utf-8', stdio: 'pipe' });
    console.log(
      boxen(
        pc.green(`Time jump successful. 🌌\n`) + pc.white(`You are now in: ${pc.bold(selected)}`),
        { padding: 1, margin: { top: 1 }, borderStyle: 'round', borderColor: 'green' }
      )
    );
  } catch (e) {
    console.log(pc.red(`❌ Failed to travel to timeline: `) + pc.white(selected));
    if (e.stderr) console.log(pc.gray(e.stderr.toString()));
  }

} catch (error) {
  console.error(pc.red('\nAn unexpected error occurred:'), error.message);
  process.exit(1);
}
