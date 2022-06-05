# optimism-subgraph

Implemented for Graph Hack 2022. Subgraph deployed [here](https://thegraph.com/hosted-service/subgraph/jewei1997/op-token).

## Overview

Subgraph that tracks to $OP token. Includes "low-level" entities that track individual events and "high-level" entities that tracks account balances and on-chain governance (voting and delegation). Includes matchstick tests for transfers, voting, and delegation.

## Tests

Run `yarn test` to run tests.

## Deployment

1. Run `graph auth` to authenticate with your deploy key.

2. Type `cd op-token` to enter the subgraph.

3. Run `yarn full-deploy` to deploy the subgraph.
