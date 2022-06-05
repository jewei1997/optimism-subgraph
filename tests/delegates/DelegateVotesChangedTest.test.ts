import {
    test,
    newMockEvent,
    createMockedFunction,
    assert,
  } from 'matchstick-as/assembly/index';
  import { Address, ethereum, BigInt } from '@graphprotocol/graph-ts';
  import {
    OP,
    Transfer as TransferEvent,
    DelegateVotesChanged as DelegateVotesChangedEvent,
  } from '../../generated/OP/OP';
  import {
    handleDelegateChanged,
    handleDelegateVotesChanged,
  } from '../../src/mapping';
  import { Account } from '../../generated/schema';
  import { getAccount } from '../../src/helpers';
  
  const tokenAddress = '0x4200000000000000000000000000000000000042';
  // Addresses
  const zeroAddress = '0x0000000000000000000000000000000000000000';
  const delegator = '0x23c7453ec7ab89b098defb751c7301b5f6d8776a';
  const previousBalance = 32;
  const newBalance = 54;


  test('DelegateVoted - weights change', () => {
    // change the weights around
    let delegateVotesChangedEvent = createDelegateVotesChangedEvent(
        tokenAddress,
        delegator,
        previousBalance,
        newBalance
    );
    handleDelegateVotesChanged(delegateVotesChangedEvent);

    assert.fieldEquals("Account", delegator, "id", delegator);
    assert.fieldEquals("Account", delegator, "votingPower", (newBalance).toString());
  });
  
  export function createDelegateVotesChangedEvent(
    tokenAddress: string,
    delegate: string,
    previousBalance: i32,
    newBalance: i32,
  ): DelegateVotesChangedEvent {
    let mockEvent = newMockEvent();
    let newDelegateVotesChangedEvent = new DelegateVotesChangedEvent(
      Address.fromString(tokenAddress),
      mockEvent.logIndex,
      mockEvent.transactionLogIndex,
      mockEvent.logType,
      mockEvent.block,
      mockEvent.transaction,
      mockEvent.parameters,
    );
    newDelegateVotesChangedEvent.parameters = new Array();
    let delegateParam = new ethereum.EventParam(
      'delegate',
      ethereum.Value.fromAddress(Address.fromString(delegate)),
    );
    let previousBalanceParam = new ethereum.EventParam(
      'previousBalance',
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(previousBalance)),
    );
    let newBalanceParam = new ethereum.EventParam(
      'newBalance',
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(newBalance)),
    );
    newDelegateVotesChangedEvent.parameters.push(delegateParam);
    newDelegateVotesChangedEvent.parameters.push(previousBalanceParam);
    newDelegateVotesChangedEvent.parameters.push(newBalanceParam);
    return newDelegateVotesChangedEvent;
  }
  