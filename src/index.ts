import Logger, { LogLevel } from './logger';
import NudeBot from './NudeBot';
import { ArgumentParser } from 'argparse';
import { version } from '../package.json';
import {config} from 'dotenv';
config();

const parser = new ArgumentParser({ 
    version,
    addHelp: true,
    description: 'Parser for logger\'s level'
});

parser.addArgument([ '-ll', '--logLevel' ],  // expected arguments
    {   
        defaultValue: LogLevel.ERROR,
        help: "type: \"-ll\" or \"--logLevel\" " +
        "then type one of the keys: 1=ERROR 2=WARN 3=INFO 4=DEBUG. Default value is 1=ERROR."
    }
);
const args = parser.parseArgs(); // gonna give us arguments object

Logger.init(args.logLevel);
const nudeBot = new NudeBot();
nudeBot.commands();
nudeBot.launch();
