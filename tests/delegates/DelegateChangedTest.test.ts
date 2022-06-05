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
  DelegateChanged as DelegateChangedEvent,
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
const fromDelegate = '0x34b8362ed6ba98c132defb351c7902b4f5c2946b';
const toDelegate = '0x45b6453ec7ab89b098defb721c7301b4f6d8986b';


test('Delegates - handle delegate changed', () => {
  let contractAddress = Address.fromString(tokenAddress);
  let delegatorBalance = 10;
  let fromDelegateBalance = 5;
  let toDelegateBalance = 20;

  // set delegator's balance
  createMockedFunction(contractAddress, 'balanceOf', 'balanceOf(address):(uint256)')
  .withArgs([ethereum.Value.fromAddress(Address.fromString(delegator))])
  .returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(delegatorBalance))]);

  // set fromDelegator's balance
  createMockedFunction(contractAddress, 'balanceOf', 'balanceOf(address):(uint256)')
  .withArgs([ethereum.Value.fromAddress(Address.fromString(fromDelegate))])
  .returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fromDelegateBalance))]);

  // set toDelegator's balance
  createMockedFunction(contractAddress, 'balanceOf', 'balanceOf(address):(uint256)')
  .withArgs([ethereum.Value.fromAddress(Address.fromString(toDelegate))])
  .returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(toDelegateBalance))]);

  // current state:
  // no delegation yet

  // delegator initially delegates to fromDelegate
  let delegateChangedEvent = createDelegateChanged(
    tokenAddress,
    delegator,
    zeroAddress,
    fromDelegate 
  );
  handleDelegateChanged(delegateChangedEvent);

  assert.fieldEquals("Account", delegator, "id", delegator);
  assert.fieldEquals("Account", delegator, "votingPower", (0).toString());
  assert.fieldEquals("Account", delegator, "delegatedTo", fromDelegate);
  assert.fieldEquals("Account", fromDelegate, "id", fromDelegate);
  assert.fieldEquals("Account", fromDelegate, "votingPower", (delegatorBalance).toString());
  assert.fieldEquals("Account", fromDelegate, "delegatedTo", '');

  // delegator delegates from fromDelegate to toDelegate
  let delegateChangedEvent2 = createDelegateChanged(
    tokenAddress,
    delegator,
    fromDelegate,
    toDelegate 
  );
  handleDelegateChanged(delegateChangedEvent2);
  assert.fieldEquals("Account", delegator, "votingPower", (0).toString());
  assert.fieldEquals("Account", delegator, "delegatedTo", toDelegate);
  assert.fieldEquals("Account", fromDelegate, "votingPower", (0).toString());
  assert.fieldEquals("Account", toDelegate, "votingPower", (delegatorBalance).toString());
});

test('Delegates - delegate to yourself', () => {
  let contractAddress = Address.fromString(tokenAddress);
  let delegatorBalance = 10;
  let toDelegateBalance = 20;

  // set delegator's balance
  createMockedFunction(contractAddress, 'balanceOf', 'balanceOf(address):(uint256)')
  .withArgs([ethereum.Value.fromAddress(Address.fromString(delegator))])
  .returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(delegatorBalance))]);

  createMockedFunction(contractAddress, 'balanceOf', 'balanceOf(address):(uint256)')
  .withArgs([ethereum.Value.fromAddress(Address.fromString(toDelegate))])
  .returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(toDelegateBalance))]);

  // delegator initially delegates to itself
  let delegateChangedEvent = createDelegateChanged(
    tokenAddress,
    delegator,
    zeroAddress,
    delegator 
  );
  handleDelegateChanged(delegateChangedEvent);
  assert.fieldEquals("Account", delegator, "id", delegator);
  assert.fieldEquals("Account", delegator, "votingPower", (delegatorBalance).toString());
  assert.fieldEquals("Account", delegator, "delegatedTo", delegator);

  // delegate from yourself to yourself
  let delegateChangedEvent2 = createDelegateChanged(
    tokenAddress,
    delegator,
    delegator,
    delegator 
  );
  handleDelegateChanged(delegateChangedEvent2);

  assert.fieldEquals("Account", delegator, "id", delegator);
  assert.fieldEquals("Account", delegator, "votingPower", (delegatorBalance).toString());
  assert.fieldEquals("Account", delegator, "delegatedTo", delegator);

  // delegate some to toDelegate
  let delegateChangedEvent4 = createDelegateChanged(
    tokenAddress,
    toDelegate,
    zeroAddress,
    toDelegate
  );
  handleDelegateChanged(delegateChangedEvent4);
  assert.fieldEquals("Account", toDelegate, "id", toDelegate);
  assert.fieldEquals("Account", toDelegate, "votingPower", toDelegateBalance.toString());
  assert.fieldEquals("Account", toDelegate, "delegatedTo", toDelegate);

  // delegate from yourself to toDelegate 
  let delegateChangedEvent3 = createDelegateChanged(
    tokenAddress,
    delegator,
    delegator,
    toDelegate
  );
  handleDelegateChanged(delegateChangedEvent3);
  assert.fieldEquals("Account", delegator, "id", delegator);
  assert.fieldEquals("Account", delegator, "votingPower", (0).toString());
  assert.fieldEquals("Account", toDelegate, "votingPower", (toDelegateBalance + delegatorBalance).toString());
  assert.fieldEquals("Account", delegator, "delegatedTo", toDelegate);
});


export function createDelegateChanged(
  tokenAddress: string,
  delegate: string,
  fromDelegate: string,
  toDelegate: string,
): DelegateChangedEvent {
  let mockEvent = newMockEvent();
  let newDelegateChangedEvent = new DelegateChangedEvent(
    Address.fromString(tokenAddress),
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
  );
  newDelegateChangedEvent.parameters = new Array();
  let delegateParam = new ethereum.EventParam(
    'delegate',
    ethereum.Value.fromAddress(Address.fromString(delegate)),
  );
  let fromDelegateParam = new ethereum.EventParam(
    'fromDelegate',
    ethereum.Value.fromAddress(Address.fromString(fromDelegate)),
  );
  let toDelegateParam = new ethereum.EventParam(
    'toDelegate',
    ethereum.Value.fromAddress(Address.fromString(toDelegate)),
  );
  newDelegateChangedEvent.parameters.push(delegateParam);
  newDelegateChangedEvent.parameters.push(fromDelegateParam);
  newDelegateChangedEvent.parameters.push(toDelegateParam);
  return newDelegateChangedEvent;
}
