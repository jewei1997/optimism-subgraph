import {
  test,
  newMockEvent,
  assert,
  clearStore,
} from "matchstick-as/assembly/index";
import { Address, ethereum, BigInt } from "@graphprotocol/graph-ts";
import { Transfer as TransferEvent } from "../../generated/OP/OP";
import { handleTransfer } from "../../src/mapping";
import { Account } from "../../generated/schema";

const tokenAddress = "0x4200000000000000000000000000000000000042";
// Addresses
const zeroAddress = "0x0000000000000000000000000000000000000000";
const memberOneAddress = "0x23c7453ec7ab89b098defb751c7301b5f6d8776a";
const memberTwoAddress = "0x34b8362ed6ba98c132defb351c7902b4f5c2946b";
const memberThreeAddress = "0x45b6453ec7ab89b098defb721c7301b4f6d8986b";

test("Transfer - Mint", () => {
  // Mint 100 tokens
  const value = 100;

  //assert.fieldEquals("Account", memberOneAddress, "balance", "0");

  // // corresponding transfer
  let transferEvent = createTransfer(
    tokenAddress,
    zeroAddress,
    memberOneAddress,
    BigInt.fromI32(value)
  );
  // handleTransferEvents([memberOneMintTransferEvent]);

  // assert.fieldEquals("Account", memberOneAddress, "balance", "100");
});

// export function handleTransferEvents(events: TransferEvent[]): void {
//   events.forEach((event) => {
//     handleTransfer(event);
//   });
// }

export function createTransfer(
  tokenAddress: string,
  from: string,
  to: string,
  value: BigInt
): TransferEvent {
  let mockEvent = newMockEvent();
  let newTransferEvent = new TransferEvent(
    Address.fromString(tokenAddress),
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters
  );
  newTransferEvent.parameters = new Array();
  let fromParam = new ethereum.EventParam(
    "from",
    ethereum.Value.fromAddress(Address.fromString(from))
  );
  let toParam = new ethereum.EventParam(
    "to",
    ethereum.Value.fromAddress(Address.fromString(to))
  );
  let valueParam = new ethereum.EventParam(
    "value",
    ethereum.Value.fromSignedBigInt(value)
  );
  newTransferEvent.parameters.push(fromParam);
  newTransferEvent.parameters.push(toParam);
  newTransferEvent.parameters.push(valueParam);
  return newTransferEvent;
}
