const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = "team1-User";

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

  const userId = event.queryStringParameters?.userId;
  if(!userId){
    response.statusCode = 400;
    response.body = JSON.stringify({
      message: "無効なリクエストです。クエリストリングに必須パラメータがセットされていません。"
    });
    
    return response;
  }

  const param = {
    TableName,
    Key:{
      userId
    } 
  };
  
  try{
    const user = (await dynamo.get(param).promise()).Item;
    if(!user){
      throw new Error("指定されたuserIdを持つuserは見つかりません");
    }
    
    delete user.password;
    response.body = JSON.stringify(user)
  
  }catch(e){
    if (e.message == "指定されたuserIdを持つuserは見つかりません") {
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