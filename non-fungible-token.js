require("dotenv").config();
const {
    AccountId,
    PrivateKey,
    Client,
    TokenSupplyType,
    TokenType,
    TokenCreateTransaction,
    TokenMintTransaction,

} = require("@hashgraph/sdk");

const aliceId = AccountId.fromString(process.env.ALICE_ACCOUNT_ID);
const aliceKey = PrivateKey.fromString(process.env.ALICE_PRIVATE_KEY);
const bobId = AccountId.fromString(process.env.BOB_ACCOUNT_ID);
const bobKey = PrivateKey.fromString(process.env.BOB_PRIVATE_KEY);

const client = Client.forTestnet().setOperator(aliceId, aliceKey);

async function createNonFungibleToken() {
    // Part 1 - Create token
    let nftCreate = await new TokenCreateTransaction()
        .setTokenName("Alice NFT")
        .setTokenSymbol("ANFT")
        .setTokenType(TokenType.NonFungibleUnique)
        .setDecimals(0)
        .setInitialSupply(0)
        .setTreasuryAccountId(aliceId)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(10)
        .setSupplyKey(aliceKey)
        .freezeWith(client);

    let nftCreateTxSign = await nftCreate.sign(aliceKey);
    let nftCreateSubmit = await nftCreateTxSign.execute(client);
    let nftCreateRx = await nftCreateSubmit.getReceipt(client);
    let tokenId = nftCreateRx.tokenId;
    console.log(`- Created NFT with Token ID: ${tokenId} \n`);

    // Part 2 - Mint token
    const CID = "ipfs://Qme5niYwb7b9dFimAgJwWYFUbxJ2rbM5MguV32Z4UuALmg/alice-nft-metadata.json";
    let mintTx = await new TokenMintTransaction()
        .setTokenId(tokenId)
        .setMetadata([Buffer.from(CID)])
        .freezeWith(client);

    let mintTxSign = await mintTx.sign(aliceKey);
    let mintTxSubmit = await mintTxSign.execute(client);
    let mintRx = await mintTxSubmit.getReceipt(client);
    console.log(`- Created NFT ${tokenId} with serial: ${mintRx.serials[0].low} \n`);

    // Part 3 - Associate token to user account


    // Part 4 - Transfer token


}

createNonFungibleToken();