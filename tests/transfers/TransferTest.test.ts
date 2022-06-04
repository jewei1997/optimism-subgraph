// import {
//   test,
//   newMockEvent,
//   assert,
//   clearStore,
// } from "matchstick-as/assembly/index";
// import { Address, ethereum, BigInt } from "@graphprotocol/graph-ts";
// import { Transfer as TransferEvent } from "../../generated/OP/OP";
// import { handleTransfer } from "../../src/mapping";

// // ERC20 Created
// //const ownerAddress = "0x57c7562c1ab7d8f12374aa72de4c284ea6d8976b";
// const tokenAddress = "0x71c7656ec7ab88b098defb751b7401b5f6d8976b";
// const feeDestinationAddress = "0x57c7562c1ab7d8f12374aa72de4c284ea6d8976b";
// const name = "Test20";
// const symbol = "TEST";
// let synERC20CreatedEvent = createERC20ClubCreated(tokenAddress, name, symbol);

// handleERC20ClubCreatedEvents([synERC20CreatedEvent]);
// let id =
//   synERC20CreatedEvent.transaction.hash.toHex() +
//   "-" +
//   synERC20CreatedEvent.logIndex.toString();
// assert.fieldEquals("DAOERC20", id, "id", id);
// assert.fieldEquals("DAOERC20", id, "tokenAddress", tokenAddress);

// // Addresses
// const zeroAddress = "0x0000000000000000000000000000000000000000";
// const usdcContractAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
// const memberOneAddress = "0x23c7453ec7ab89b098defb751c7301b5f6d8776a";
// const memberTwoAddress = "0x34b8362ed6ba98c132defb351c7902b4f5c2946b";
// const memberThreeAddress = "0x45b6453ec7ab89b098defb721c7301b4f6d8986b";

// test("ERC20Club Transfer - Member One mints 100 tokens", () => {
//   // Mint 100 tokens
//   const value = 100;

//   let memberOneMintEvent = createMemberMinted(
//     tokenAddress,
//     tokenAddress,
//     memberOneAddress,
//     value,
//     usdcContractAddress,
//     value,
//     0
//   );
//   handleMemberMintedEvents([memberOneMintEvent]);

//   // corresponding transfer
//   let memberOneMintTransferEvent = createTransfer(
//     tokenAddress,
//     zeroAddress,
//     memberOneAddress,
//     BigInt.fromI32(value)
//   );
//   handleTransferEvents([memberOneMintTransferEvent]);

//   assert.fieldEquals("Member", memberOneAddress, "id", memberOneAddress);
//   assert.fieldEquals(
//     "Member",
//     memberOneAddress,
//     "memberAddress",
//     memberOneAddress
//   );

//   // Membership depositAmount and ownershipShare
//   let membershipOneId = memberOneAddress + "-" + tokenAddress;
//   assert.fieldEquals("Membership", membershipOneId, "id", membershipOneId);
//   assert.fieldEquals("Membership", membershipOneId, "member", memberOneAddress);
//   assert.fieldEquals(
//     "Membership",
//     membershipOneId,
//     "syndicateDAO",
//     tokenAddress
//   );

//   // Token totalSupply is 100
//   assert.fieldEquals(
//     "SyndicateDAO",
//     tokenAddress,
//     "totalSupply",
//     value.toString()
//   );

//   // Token totalDeposits is 100
//   assert.fieldEquals(
//     "SyndicateDAO",
//     tokenAddress,
//     "totalDeposits",
//     value.toString()
//   );

//   // Membership tokens is 100
//   assert.fieldEquals("Membership", membershipOneId, "tokens", "100");

//   // Membership depositAmount is 100
//   assert.fieldEquals("Membership", membershipOneId, "depositAmount", "100");

//   // Membership ownershipShare is 1000000 (100%)
//   assert.fieldEquals(
//     "Membership",
//     membershipOneId,
//     "ownershipShare",
//     "1000000"
//   );

//   // MemberMinted for Member 1 minting 100 tokens
//   let memberMintedId =
//     memberOneMintEvent.transaction.hash.toHex() +
//     "-" +
//     memberOneMintEvent.logIndex.toString();
//   assert.fieldEquals("MemberMinted", memberMintedId, "id", memberMintedId);
//   assert.fieldEquals(
//     "MemberMinted",
//     memberMintedId,
//     "eventType",
//     "MEMBER_MINTED"
//   );
//   assert.fieldEquals(
//     "MemberMinted",
//     memberMintedId,
//     "transactionID",
//     memberOneMintEvent.transaction.hash.toHex()
//   );
//   assert.fieldEquals(
//     "MemberMinted",
//     memberMintedId,
//     "syndicateID",
//     tokenAddress
//   );
//   assert.fieldEquals(
//     "MemberMinted",
//     memberMintedId,
//     "memberAddress",
//     memberOneAddress
//   );
//   assert.fieldEquals(
//     "MemberMinted",
//     memberMintedId,
//     "depositAmount",
//     value.toString()
//   );
//   // clearStore(); commenting out for now
// });

// export function handleTransferEvents(events: TransferEvent[]): void {
//   events.forEach((event) => {
//     handleTransfer(event);
//   });
// }

// export function createTransfer(
//   tokenAddress: string,
//   from: string,
//   to: string,
//   value: BigInt
// ): TransferEvent {
//   let mockEvent = newMockEvent();
//   let newTransferEvent = new TransferEvent(
//     Address.fromString(tokenAddress),
//     mockEvent.logIndex,
//     mockEvent.transactionLogIndex,
//     mockEvent.logType,
//     mockEvent.block,
//     mockEvent.transaction,
//     mockEvent.parameters
//   );
//   newTransferEvent.parameters = new Array();
//   let fromParam = new ethereum.EventParam(
//     "from",
//     ethereum.Value.fromAddress(Address.fromString(from))
//   );
//   let toParam = new ethereum.EventParam(
//     "to",
//     ethereum.Value.fromAddress(Address.fromString(to))
//   );
//   let valueParam = new ethereum.EventParam(
//     "value",
//     ethereum.Value.fromSignedBigInt(value)
//   );
//   newTransferEvent.parameters.push(fromParam);
//   newTransferEvent.parameters.push(toParam);
//   newTransferEvent.parameters.push(valueParam);
//   return newTransferEvent;
// }
