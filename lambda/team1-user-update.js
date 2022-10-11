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

  const body = event.body? JSON.parse(event.body) : null;
  if(!body || !body.userId || !body.nickName || !body.password || !body.charType){
    response.statusCode = 400;
    response.body = JSON.stringify({
      message: "無効なリクエストです。request bodyに必須パラメータがセットされていません。"
    });
    
    return response;
  }

  const { userId, nickName, password, charType} = body;
  const param = {
    TableName,
    Item: {
      userId,
      nickName,
      password,
      charType,
    }
  };

  try{
    await dynamo.put(param).promise();
    response.statusCode = 201;
    response.body = JSON.stringify({userId, nickName, charType});
  }catch(e){
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString()
    });
  }
  
  return response;
};
