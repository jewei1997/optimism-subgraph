import { Account, AccountDelegate, Delegation } from "../generated/schema";
import { BigInt, Address, store, log } from "@graphprotocol/graph-ts";

// Helper function to get account
export function getAccount(
  accountAddress: Address,
  createdAt: BigInt
): Account {
  let accountId = accountAddress.toHex();
  let account = Account.load(accountId);
  if (account == null) {
    account = new Account(accountId);
    account.address = accountAddress.toHex();
    account.balance = new BigInt(0);
    account.createdAt = createdAt;
  }
  account.save();
  return account;
}

// Helper function to get account by address
export function getAccountByAddress(accountAddress: Address): Account {
  log.info("this is in getAccountByAddress()..", [accountAddress.toHex()]);
  let accountId = accountAddress.toHex();
  let account = Account.load(accountId);
  if (account == null) {
    account = new Account(accountId);
    account.address = accountAddress.toHex();
    account.balance = new BigInt(0);
  }
  account.save();
  return account;
}

// Helper function to modify account tokens
export function modifyAccountTokens(
  accountAddress: Address,
  value: BigInt,
  subtract: boolean
): void {
  let account = getAccountByAddress(accountAddress);
  if (subtract) {
    account.balance = account.balance.minus(value);
  } else {
    account.balance = account.balance.plus(value);
  }
  account.save();
  return;
}
