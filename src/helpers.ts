import { Account, AccountDelegate, Delegation } from "../generated/schema";
import { BigInt, Address, store } from "@graphprotocol/graph-ts";

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
    account.balance = 0;
    account.createdAt = createdAt;
  }
  account.save();
  return account;
}

// Helper function to get account by address
export function getAccountByAddress(accountAddress: Address): Account {
  let accountId = accountAddress.toHex();
  let account = Account.load(accountId);
  if (account == null) {
    account = new Account(accountId);
    account.address = accountAddress.toHex();
    account.balance = 0;
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
  let accountId = accountAddress.toHex();
  let account = Account.load(accountId);

  if (subtract) {
    account.balance -= value;
  } else {
    account.balance += value;
  }
  account.save();
  return;
}
