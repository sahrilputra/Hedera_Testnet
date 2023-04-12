const { Client } = require("@hashgraph/sdk")

require("dotenv").config();

const createAccTransferHbar = async () => {
    const accountId = process.env.MY_PRIVATE_KEY;
    const privateKey = process.env.MY_ACCOUNT_ID;

    if (accountId == null || privateKey == null) {
        throw new Error("Account ID or PRIVATE key is missing");
    }

    // Part 2 - Create connection to the Hedera network
    const client = Client.forTestnet();
    client.setOperator(accountId, privateKey);

    // Part 3 - Create new account
    const newAccountPrivateKey = privateKey.generateED25519();
    const newAccountPublicKey = newAccountPrivateKey.publicKey();
    const newAccount = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinyBars(1000))
        .execute(client);
    
    // Part 4 - Get the new account's ID

    // Part 5 - Verify the new account's starting balance

    // Part 6 - Transfer 100 TINYBARs from Hedera Testnet account to new account

    // Part 7 - Verify the new account's current balance
}

createAccTransferHbar();