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
  
  const body = event.body? JSON.parse(event.body) : null;
  if(!body || !body.userId || !body.medName){
    response.statusCode = 400;
    response.body = JSON.stringify({
      message: "無効なリクエストです。request bodyにuserIdか、medNameのどちらかがセットされていません。"
    });
    
    return response;
  }
  
  const { userId, medName } = body;
  const param = {
      TableName,
      Key:{
          userId,
          medName,
      }
  };
  
  try{
    await dynamo.get(param).promise();
    response.statusCode = 204;
  }catch(e){
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString()
    });
  }
  
  return response;
};
