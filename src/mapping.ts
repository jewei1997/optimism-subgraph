import { BigInt, log } from "@graphprotocol/graph-ts";
import {
  OP,
  Approval,
  DelegateChanged,
  DelegateVotesChanged,
  OwnershipTransferred,
  Transfer,
} from "../generated/OP/OP";
import { AccountDelegate } from "../generated/schema";
import {
  getAccount,
  getAccountByAddress,
  modifyAccountTokens,
} from "./helpers";

const zeroAddress = "0x0000000000000000000000000000000000000000";

export function handleApproval(event: Approval): void {
  // // Entities can be loaded from the store using a string ID; this ID
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
  // let contract = OP.bind(event.address);
  // let delegator = event.params.delegator;
  // let fromDelegate = event.params.fromDelegate;
  // let toDelegate = event.params.toDelegate;
  // let accountDelegate = AccountDelegate.load(
  //   event.params.fromDelegate.toHex() + "-" + event.params.toDelegate.toHex()
  // );
  // if (accountDelegate == null) {
  //   accountDelegate = new AccountDelegate(
  //     event.params.fromDelegate.toHex() + "-" + event.params.toDelegate.toHex()
  //   );
  // }
  // accountDelegate.from = fromDelegate.toHex();
  // accountDelegate.to = toDelegate.toHex();
  // accountDelegate.numVotesDelegated = contract.balanceOf(fromDelegate);
}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  // let delegate = event.params.delegate;
  // let previousBalance = event.params.previousBalance;
  // let newBalance = event.params.newBalance;
  // let accountDelegate = AccountDelegate.load(delegate.toHex());
  // if (accountDelegate == null) {
  //   accountDelegate = new AccountDelegate(delegate.toHex());
  // }
  // accountDelegate.numVotesDelegated = newBalance;
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let newOwner = event.params.newOwner;
  let previousOwner = event.params.previousOwner;
  //let account = getAccountByAddress(event.address);
}

export function handleTransfer(event: Transfer): void {
  let from = event.params.from;
  let to = event.params.to;
  let value = event.params.value;

  // Cases for transfers
  if (from.toHex() == zeroAddress && to.toHex() != zeroAddress) {
    modifyAccountTokens(to, value, false);
  } else if (from.toHex() != zeroAddress && to.toHex() == zeroAddress) {
    modifyAccountTokens(from, value, true);
  } else {
    modifyAccountTokens(from, value, true);
    modifyAccountTokens(to, value, false);
  }
}
