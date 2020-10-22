# ETHOnline-2020

Online demo: https://eldoradoio.github.io/ethonline-2020/
Savings Contract (ROPSTEN): 0xD86637c69e1a207869062E954504cED0F17D6bFF
mStable provider and Dorado token (ROPSTEN): 0xe8a98da25b3890c34ce80e88a32b70cb5a10dc2a

## What we built:
During EthOnline we’ve developed a Proof of Concept of a savings accounts smart-contract with a stable-coin initial implementation.  

Our submission consists of several parts, the most important one being the design around the savings accounts contract and protocol interfaces. 

Many saving-providers (as we call them) can be implemented for any protocol in the defi ecosystem.  

Our first provider implementation uses mStable. By Using this protocol, our users will achieve financial gain without getting into the risks of more exotic tokens or platforms whilst getting a fantastic APY. 

One interesting effect of the mStable protocol is that we had to keep the “savings credit” balance of each user, which we used to create an interest bearing token. 


## Contents
- Contracts and related scripts can be found under /src
- Dapp demo is on /demo-dapp

## Development environment
This repo contains a .devcontainer so you only need VSCode and the remote extension pack: ms-vscode-remote.vscode-remote-extensionpack

Contracts:
```bash
cd src
yarn install && yarn build
yarn run generate:types
``` 

Dapp
```
cd demo-dapp
yarn install
yarn start
```

