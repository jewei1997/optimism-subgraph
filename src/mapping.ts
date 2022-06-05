import { BigInt } from "@graphprotocol/graph-ts";
import { log } from "matchstick-as";
import {
  OP,
  Approval,
  DelegateChanged,
  DelegateVotesChanged,
  OwnershipTransferred,
  Transfer,
} from "../generated/OP/OP";
import { ApprovalEvent, DelegateChangedEvent, DelegateVotesChangedEvent, OwnershipTransferredEvent, TransferEvent } from "../generated/schema";
import {
  getAccount,
  modifyAccountTokens,
} from "./helpers";

const zeroAddress = "0x0000000000000000000000000000000000000000";

export function handleApproval(event: Approval): void {
  let approvalEvent = new ApprovalEvent(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  approvalEvent.owner = event.params.owner.toHex();
  approvalEvent.spender = event.params.spender.toHex();
  approvalEvent.value = event.params.value;
  approvalEvent.timestamp = event.block.timestamp;
  approvalEvent.save();
  // Entities can be loaded from the store using a string ID; this ID
  // // needs to be unique across all entities of the same type
  // let entity = ExampleEntity.load(event.transaction.from.toHex());
  // // Entities only exist after they have been saved to the store;
  // // `null` checks allow to create entities on demand
  // if (!entity) {
  //   entity = new ExampleEntity(event.transaction.from.toHex());
  //   // Entity fields can be set using simple assignments
  //   entity.count = BigInt.fromI32(0);
  // }
  // // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1);
  // // Entity fields can be set based on event parameters
  // entity.owner = event.params.owner;
  // entity.spender = event.params.spender;
  // // Entities can be written to the store with `.save()`
  // entity.save();
  // // Note: If a handler doesn't require existing field values, it is faster
  // // _not_ to load the entity from the store. Instead, create it fresh with
  // // `new Entity(...)`, set the fields that should be updated and save the
  // // entity back to the store. Fields that were not set or unset remain
  // // unchanged, allowing for partial updates to be applied.
  // // It is also possible to access smart contracts from mappings. For
  // // example, the contract that has emitted the event can be connected to
  // // with:
  // //
  // // let contract = Contract.bind(event.address)
  // //
  // // The following functions can then be called on this contract to access
  // // state variables and other data:
  // //
  // // - contract.DOMAIN_SEPARATOR(...)
  // // - contract.allowance(...)
  // // - contract.approve(...)
  // // - contract.balanceOf(...)
  // // - contract.checkpoints(...)
  // // - contract.decimals(...)
  // // - contract.decreaseAllowance(...)
  // // - contract.delegates(...)
  // // - contract.getPastTotalSupply(...)
  // // - contract.getPastVotes(...)
  // // - contract.getVotes(...)
  // // - contract.increaseAllowance(...)
  // // - contract.name(...)
  // // - contract.nonces(...)
  // // - contract.numCheckpoints(...)
  // // - contract.owner(...)
  // // - contract.symbol(...)
  // // - contract.totalSupply(...)
  // // - contract.transfer(...)
  // // - contract.transferFrom(...)
}

export function handleDelegateChanged(event: DelegateChanged): void {
  let contract = OP.bind(event.address);
  let delegator = event.params.delegator;
  let fromDelegate = event.params.fromDelegate;
  let toDelegate = event.params.toDelegate;
  // getAccount
  // let's say A (delegator) changes delegate from B (from) to C (to)
  // change who A delegated to
  // change A's votingPower to 0
  // change B's votingPower -= A's balance
  // change C's votingPower += A's balance

  let createdAt = event.block.timestamp;
  let delegatorAccount = getAccount(delegator, createdAt);

  // first save the delegate changed event
  let delegateChangedEvent = new DelegateChangedEvent(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  delegateChangedEvent.delegate = delegator.toHex()
  delegateChangedEvent.fromDelegate = fromDelegate.toHex()
  delegateChangedEvent.toDelegate = toDelegate.toHex()
  delegateChangedEvent.timestamp = event.block.timestamp
  delegateChangedEvent.save()

  // special cases:
  // delegate to yourself: delegateAccount == toAccount
  // delegate from yourself to someone else: delegateAccount == fromAccount
  // delegate from yourself to yourself: delegateAccount == fromAccount == toAccount
  if (((fromDelegate.toHex() == toDelegate.toHex()) && (fromDelegate.toHex() == delegator.toHex()) && toDelegate.toHex() == delegator.toHex())) {
    if (delegatorAccount.delegatedTo == delegator.toHex()) { // If I'm already delegating to myself, do nothing
      return
    }
    delegatorAccount.delegatedTo = delegator.toHex()
    delegatorAccount.votingPower = delegatorAccount.votingPower.plus(contract.balanceOf(delegator))
    delegatorAccount.save()
    return
  } else if (fromDelegate.toHex() == delegator.toHex()) {
    let toAccount = getAccount(toDelegate, createdAt)
    delegatorAccount.votingPower = BigInt.fromI32(0)
    toAccount.votingPower = toAccount.votingPower.plus(contract.balanceOf(delegator))
    delegatorAccount.delegatedTo = toDelegate.toHex();
    delegatorAccount.save()
    toAccount.save()
    return
  } else if (delegator.toHex() == toDelegate.toHex()) {
    let fromAccount = getAccount(fromDelegate, createdAt);
    delegatorAccount.votingPower = contract.balanceOf(delegator);
    fromAccount.votingPower = fromAccount.votingPower.minus(contract.balanceOf(delegator))
    delegatorAccount.delegatedTo = delegator.toHex()
    delegatorAccount.save();
    fromAccount.save();
    return
  }
  let fromAccount = getAccount(fromDelegate, createdAt)
  let toAccount = getAccount(toDelegate, createdAt)
  delegatorAccount.delegatedTo = toDelegate.toHex();
  delegatorAccount.save();
  
  delegatorAccount.votingPower = BigInt.fromI32(0);
  fromAccount.votingPower = fromAccount.votingPower.minus(contract.balanceOf(delegator))
  toAccount.votingPower = toAccount.votingPower.plus(contract.balanceOf(delegator))

  delegatorAccount.save();
  fromAccount.save();
  toAccount.save();
}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  // first save the basic event
  let delegateVotesChangedEvent = new DelegateVotesChangedEvent(event.transaction.hash.toHex() + "-"+ event.logIndex.toString())
  delegateVotesChangedEvent.delegate = event.params.delegate.toHex();
  delegateVotesChangedEvent.previousBalance = event.params.previousBalance;
  delegateVotesChangedEvent.newBalance = event.params.newBalance;
  delegateVotesChangedEvent.timestamp = event.block.timestamp
  delegateVotesChangedEvent.save()

  let delegate = event.params.delegate;
  let previousBalance = event.params.previousBalance;
  let newBalance = event.params.newBalance;
  let delegatorAccount = getAccount(delegate, event.block.timestamp)
  delegatorAccount.votingPower = newBalance;
  delegatorAccount.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let newOwner = event.params.newOwner;
  let previousOwner = event.params.previousOwner;

  let ownershipTransferredEvent = new OwnershipTransferredEvent(event.transaction.hash.toHex() + "-"+ event.logIndex.toString())
  ownershipTransferredEvent.previousOwner = previousOwner.toHex()
  ownershipTransferredEvent.nextOwner = newOwner.toHex()
  ownershipTransferredEvent.save()
}

export function handleTransfer(event: Transfer): void {
  let from = event.params.from;
  let to = event.params.to;
  let value = event.params.value;

  // first save the basic event
  let transfer = new TransferEvent(event.transaction.hash.toHex() + "-"+ event.logIndex.toString())
  transfer.from = from.toHex()
  transfer.to = to.toHex()
  transfer.amount = value
  transfer.timestamp = event.block.timestamp
  transfer.save()

  // Cases for transfers
  if (from.toHex() == zeroAddress && to.toHex() != zeroAddress) { // mint
    modifyAccountTokens(to, value, false);
  } else if (from.toHex() != zeroAddress && to.toHex() == zeroAddress) { // burn
    modifyAccountTokens(from, value, true);
  } else { // transfer
    modifyAccountTokens(from, value, true);
    modifyAccountTokens(to, value, false);
  }
}


