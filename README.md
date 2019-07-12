# Documentation

## Start
  1. Run ```npm start```

## Tasks
  - Fix time in console logging
    - trim it
  - Integrate ```-ll/--logLevel``` parameters in index.ts
    1. Use [argParse](<https://www.npmjs.com/package/argparse>) module
    2. Create ```feature/argParse_logLevel``` branch
    3. Example: ```ts-node src/index.ts -ll/--logLevel DEBUG``` then bot must logging in debug severity
  - Make code testable
    - Set returns for each public method
    - Use Logger
