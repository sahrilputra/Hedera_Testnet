require("dotenv").config();
const {
    Client,
    TopicCreateTransaction,

} = require("@hashgraph/sdk");

async function createMessageQueue() {
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    if (myAccountId == null || myPrivateKey == null) {
        throw new Error("account ID or Private key are missing");
    }

    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    // Part 1 - Create topic
    const createTopicTransactionId  = await new TopicCreateTransaction().execute(client);
    const createTopicReceipt = await createTopicTransactionId.getReceipt(client);
    const newTopicId = createTopicReceipt.topicId;
    console.log("The new topic ID is : "+ newTopicId);
    // Part 2 - Subscribe to topic


    // Part 3 - Submit messages to topic


}

createMessageQueue();