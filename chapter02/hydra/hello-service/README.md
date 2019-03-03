# hello-service

## Pre-installation

It's recommended that [NVM](https://github.com/creationix/nvm) be used to manage NodeJS versions.
The project includes an .nvmrc which specifies NodeJS 6.2.1

```bash
brew install redis
brew services start redis
sudo yarn global add yo generator-fwsp-hydra hydra-cli

yo fwsp-hydra
```

## Installation

```javascript
$ cd hello-service
$ nvm use
$ npm install
```

## Trial

```shell
$ npm start
```
