const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log('Received event: ', JSON.stringify(event, null, 2));

    const path = event.path;
    const httpMethod = event.httpMethod;

    try{
        if(httpMethod === 'POST' && path === '/products') {
            const product = JSON.parse(event.body);

            const command = new PutCommand({
                TableName: 'ProductsJS',
                Item: product
            });

            await docClient.send(command);

            return {
                statusCode: 201,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: "Product added successfully", product})
            };

        } else if(httpMethod === 'GET' && path.startsWith('/products/')) {
            const productId = path.split('/').pop();

            const command = new GetCommand({
                TableName: 'ProductsJS',
                key: {
                    id: productId
                }
            });

            const { item } = await docClient.send(command);

            if(item){
                return {
                    statusCode: 200,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(item)
                };
            } else {
                return {
                    statusCode: 404,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: 'Product not found' })
                };
            }
        } else {
            return {
                statusCode: 400,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: 'Unsupported method or path' })
            };
        }
    } catch (error) {
        console.error('Error processing request: ', error);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: 'Internal server error', error: error.message })
        };
    }
};