const { Client, FileCreateTransaction } = require("@hashgraph/sdk");
require("dotenv").config();

async function helloWorld() {
    // Part 1 - Create connection to the Hedera network
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;
    if (myAccountId == null || myPrivateKey == null) {
        throw new Error("Environment variables myAccountId and myPrivateKey must be present");
    }
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    // Part 2 - Store the smart contract’s bytecode on Hedera
    let helloHedera = require("./HelloHedera.json");
    const bytecode = helloHedera.data.bytecode.object;
    const fileCreateTx = new FileCreateTransaction().setContents(bytecode);
    const submitTx = await fileCreateTx.execute(client);
    const fileReceipt = await submitTx.getReceipt(client);
    const bytecodeFileId = fileReceipt.fileId;
    console.log("The smart contract byte code file ID is " + bytecodeFileId);

    // Part 3 - Deploy the smart contract


    // Part 4a - Interact with the smart contract - get_message()


    // Part 4b - Interact with the smart contract - set_message()

}
helloWorld();