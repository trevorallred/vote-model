# votesha-model

This is a package meant for use only on the Votesha client and server.

## Install

Note: Please don't use unless you're doing development for Votesha.

```
yarn add votesha-model
```

## Development

```
nvm use 12
npm install
npm login
```

## Deployment

```
npm install
npm version patch
or
npm version minor
npm version major

git push
npm publish
```

Then on the source projects, run
```
yarn upgrade votesha-model
```
