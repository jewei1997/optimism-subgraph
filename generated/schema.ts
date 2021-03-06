// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("address", Value.fromString(""));
    this.set("balance", Value.fromBigInt(BigInt.zero()));
    this.set("votingPower", Value.fromBigInt(BigInt.zero()));
    this.set("delegatedTo", Value.fromString(""));
    this.set("createdAt", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Account entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): string {
    let value = this.get("address");
    return value!.toString();
  }

  set address(value: string) {
    this.set("address", Value.fromString(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value!.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }

  get votingPower(): BigInt {
    let value = this.get("votingPower");
    return value!.toBigInt();
  }

  set votingPower(value: BigInt) {
    this.set("votingPower", Value.fromBigInt(value));
  }

  get delegatedTo(): string {
    let value = this.get("delegatedTo");
    return value!.toString();
  }

  set delegatedTo(value: string) {
    this.set("delegatedTo", Value.fromString(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }
}

export class TransferEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("from", Value.fromString(""));
    this.set("to", Value.fromString(""));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TransferEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save TransferEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("TransferEvent", id.toString(), this);
    }
  }

  static load(id: string): TransferEvent | null {
    return changetype<TransferEvent | null>(store.get("TransferEvent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get from(): string {
    let value = this.get("from");
    return value!.toString();
  }

  set from(value: string) {
    this.set("from", Value.fromString(value));
  }

  get to(): string {
    let value = this.get("to");
    return value!.toString();
  }

  set to(value: string) {
    this.set("to", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class ApprovalEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("owner", Value.fromString(""));
    this.set("spender", Value.fromString(""));
    this.set("value", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ApprovalEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ApprovalEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ApprovalEvent", id.toString(), this);
    }
  }

  static load(id: string): ApprovalEvent | null {
    return changetype<ApprovalEvent | null>(store.get("ApprovalEvent", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get spender(): string {
    let value = this.get("spender");
    return value!.toString();
  }

  set spender(value: string) {
    this.set("spender", Value.fromString(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class DelegateChangedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("delegate", Value.fromString(""));
    this.set("fromDelegate", Value.fromString(""));
    this.set("toDelegate", Value.fromString(""));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DelegateChangedEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save DelegateChangedEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("DelegateChangedEvent", id.toString(), this);
    }
  }

  static load(id: string): DelegateChangedEvent | null {
    return changetype<DelegateChangedEvent | null>(
      store.get("DelegateChangedEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegate(): string {
    let value = this.get("delegate");
    return value!.toString();
  }

  set delegate(value: string) {
    this.set("delegate", Value.fromString(value));
  }

  get fromDelegate(): string {
    let value = this.get("fromDelegate");
    return value!.toString();
  }

  set fromDelegate(value: string) {
    this.set("fromDelegate", Value.fromString(value));
  }

  get toDelegate(): string {
    let value = this.get("toDelegate");
    return value!.toString();
  }

  set toDelegate(value: string) {
    this.set("toDelegate", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class DelegateVotesChangedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("delegate", Value.fromString(""));
    this.set("previousBalance", Value.fromBigInt(BigInt.zero()));
    this.set("newBalance", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save DelegateVotesChangedEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save DelegateVotesChangedEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("DelegateVotesChangedEvent", id.toString(), this);
    }
  }

  static load(id: string): DelegateVotesChangedEvent | null {
    return changetype<DelegateVotesChangedEvent | null>(
      store.get("DelegateVotesChangedEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegate(): string {
    let value = this.get("delegate");
    return value!.toString();
  }

  set delegate(value: string) {
    this.set("delegate", Value.fromString(value));
  }

  get previousBalance(): BigInt {
    let value = this.get("previousBalance");
    return value!.toBigInt();
  }

  set previousBalance(value: BigInt) {
    this.set("previousBalance", Value.fromBigInt(value));
  }

  get newBalance(): BigInt {
    let value = this.get("newBalance");
    return value!.toBigInt();
  }

  set newBalance(value: BigInt) {
    this.set("newBalance", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class OwnershipTransferredEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("previousOwner", Value.fromString(""));
    this.set("nextOwner", Value.fromString(""));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save OwnershipTransferredEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save OwnershipTransferredEvent entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("OwnershipTransferredEvent", id.toString(), this);
    }
  }

  static load(id: string): OwnershipTransferredEvent | null {
    return changetype<OwnershipTransferredEvent | null>(
      store.get("OwnershipTransferredEvent", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get previousOwner(): string {
    let value = this.get("previousOwner");
    return value!.toString();
  }

  set previousOwner(value: string) {
    this.set("previousOwner", Value.fromString(value));
  }

  get nextOwner(): string {
    let value = this.get("nextOwner");
    return value!.toString();
  }

  set nextOwner(value: string) {
    this.set("nextOwner", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}
