require("dotenv").config();
const { AccountId, PrivateKey, Client, TokenCreateTransaction, TokenType, TokenSupplyType } = require("@hashgraph/sdk");

const aliceId = AccountId.fromString(process.env.ALICE_ACCOUNT_ID);
const aliceKey = PrivateKey.fromString(process.env.ALICE_PRIVATE_KEY);
const bobId = AccountId.fromString(process.env.BOB_ACCOUNT_ID);
const bobKey = PrivateKey.fromString(process.env.BOB_PRIVATE_KEY);

const client = Client.forTestnet().setOperator(aliceId, aliceKey);

async function createFungibleToken() {
    // Part 1 - Create token
    let tokenCreateTx = await new TokenCreateTransaction()
        .setTokenName("Alice Hours")
        .setTokenSymbol("AHOUR")
        .setTokenType(TokenType.FungibleCommon)
        .setDecimals(1)
        .setInitialSupply(1000)
        .setTreasuryAccountId(aliceId)
        .setSupplyType(TokenSupplyType.Infinite)
        .setSupplyKey(aliceKey)
        .freezeWith(client);

    let tokenCreateSign = await tokenCreateTx.sign(aliceKey);
    let tokenCreateSubmit = await tokenCreateSign.execute(client);
    let tokenCreateRx = await tokenCreateSubmit.getReceipt(client);
    let tokenId = tokenCreateRx.tokenId;
    console.log(`- Created token with ID: ${tokenId}`);

    // Part 2 - Associate token to user account


    // Part 3 - Check balance (before)


    // Part 4 - Transfer tokens


    // Part 5 - Check balance (after)


    client.close();
}

createFungibleToken();