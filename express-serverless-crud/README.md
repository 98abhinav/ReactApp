## Serverless CRUD API using AWS Lambda, DynamoDB, API Gateway and Node.JS

Here is my implementation plan:

1) Configure AWS – Create Lambda function with API Gateway and DynamoDB database table creation
2) Setup new Node.JS project using Serverless Express and implement basic routes
3) Automate the deploy process using AWS CLI
4) Implement local development capabilities using Docker Compose (for easier development and testing)

## Automate the deploy process using AWS CLI
Okay, now we can take the node_modules folder, index.js(the entry point of the lamba), app.js(the hearth of the application) and routes.js(well the routes :)), pack them to zip, go to the lambda page and upload them. Instead of doing this, we will use aws cli to do the job for us.

Go to the package.json and include the following three lines in scripts part:
"deploy": "npm run clean && npm run build && aws lambda update-function-code --function-name employees --zip-file fileb://build.zip --publish",
    "clean": "rm build.zip",
    "build": "zip -r build.zip node_modules index.js app.js routes.js"
    
If you have successfully configured the aws cli, executing the following command:
npm run deploy
