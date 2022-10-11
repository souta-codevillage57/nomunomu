const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = "team1-Medicine";

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };
  
  if(event.headers.authorization !== "mtiToken"){
    response.statusCode = 401;
    response.body = JSON.stringify({
      message: "認証されていません。HeaderにTokenを指定してください"
    });
    
    return response;
  }
  
  const param = event.queryStringParameters? event.queryStringParameters : null;

  if(!param){
    response.statusCode = 400;
    response.body = JSON.stringify({
      message: "無効なリクエストです。userIdがセットされていません。"
    });
    
    return response;
  }
  
  const userId = param.userId;
  const queryParam = {
      TableName,
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: {
          ":uid": userId
      },
  }
  
  //dynamo.get()でDBからデータを取得
  try{
    const userMeds = (await dynamo.query(queryParam).promise()).Items;
    if( userMeds.length == 0 ){
      throw new Error("登録された薬はありません");
    }
    response.body = JSON.stringify({userMeds});
  }catch(e){
    if (e.message == "登録された薬はありません") {
      response.statusCode = 404;
      response.body = JSON.stringify({
        message: e.message
      });
    }else{
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: "予期せぬエラーが発生しました。",
        errorDetail: e.toString()
      });
    }
  }
  
  return response;
};