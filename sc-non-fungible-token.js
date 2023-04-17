const {
    AccountId,
    PrivateKey,
    Client,
    ContractCreateFlow,
    ContractExecuteTransaction,
    ContractFunctionParameters,
    TokenAssociateTransaction,
    TokenId
} = require("@hashgraph/sdk");
require("dotenv").config();

const operatorId = AccountId.fromString(process.env.OPERATOR_ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PRIVATE_KEY);
const receiverId = AccountId.fromString(process.env.RECEIVER_ACCOUNT_ID);
const receiverKey = PrivateKey.fromString(process.env.RECEIVER_PRIVATE_KEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function SCCreateNonFungibleToken() {
    // Part 1 - Store contract
    let NFTCreator = require("./NFTCreator.json");
    const bytecode = NFTCreator.data.bytecode.object;
    const createContract = new ContractCreateFlow()
        .setGas(250000) // Increase if revert
        .setBytecode(bytecode); // Contract bytecode

    const createContractTx = await createContract.execute(client);
    const createContractRx = await createContractTx.getReceipt(client);
    const contractId = createContractRx.contractId;
    console.log(`Contract created with ID: ${contractId} \n`);

    // Part 2 - Create NFT


    // Part 3 - Mint NFT


    // Part 4 - Associate NFT


    // Part 5 - Transfer NFT


}
SCCreateNonFungibleToken();