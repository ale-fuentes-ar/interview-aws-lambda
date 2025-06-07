```
(\ (\
( • •)  
━∪∪━━━━ 
ᵇʸ ᴬˡᵉᶠᵘᵉⁿᵗᵉˢ
```
# INTERVIEW | AWS Lambda
<img src="https://img.shields.io/badge/AWS-ff9900?style=for-the-badge" alt="spring" /> <img src="https://img.shields.io/badge/Lambda-ff9900?style=for-the-badge&logoColor=white" alt="spring security" /> <img src="https://img.shields.io/badge/☕︎_hands_on-CDCDCD?style=for-the-badge&logoColor=white&color=cdcdcd" title="ale fuentes cloud" />

## AWS Console and IAM 
The AWS console is a web interface for managing AWS services.
The IAM (*Identity and Access Management*) controls who can access your AWS resources and what actions they can perform.

> 🪶 This exercises use a AWS Free Tier account

### Step 1 | create a IAM user (best practice)
First, create a Free Tier AWS account.

* Goto to IAM in the console
* Create a new user
* Attach an existing policy like `ReadOnlyAccess` initially
* Download the access key ID and secret access key (🔒 keep them secure!)
* Log out of you root account and log back in using the IAM user credentials to see restricted access

Next create the IAM Role

* Create a simple role that `Lambda` can assume to access `DynamoDB` 
 > 🚨 important, never use root credentials for daily development. Always use IAM users/roles. Need use *principe of least privilege*.

### Step 2 | Serverless and AWS Services

1- initialize our project
```bash
# initialize our package.json
npm init -y
```

2- install dependencies necessary

```bash
npm install @aws-sdk/client-lambda @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```
> ☕︎ Serverless compute service can run code in response events. Focus on `handle` function, `event` object, `context` object, and basic return structure.

