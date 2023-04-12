const { Client } = require("@hashgraph/sdk")

require("dotenv").config();

const createAccTransferHbar = async () => {
    const accountId = process.env.MY_PRIVATE_KEY ;
    const privateKey = process.env.MY_ACCOUNT_ID;

    if(accountId == null || privateKey == null){
        throw new Error("Account ID or PRIVATE key is missing");
    }
}

createAccTransferHbar();