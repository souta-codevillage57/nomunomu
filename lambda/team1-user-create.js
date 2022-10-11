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
    // ↓プロパティ名と変数名が同一の場合は、値の指定を省略できる。 
    TableName,  // TableName: TableNameと同じ意味
    Item: {
      userId,   // userId: userIdと同じ意味
      nickName,      // age: ageと同じ意味
      password, // nickname: nicknameと同じ意味
      charType, // password: passwordと同じ意味
    }
  };
  
  try{
    await dynamo.put(param).promise();
    response.statusCode = 201;
    response.body = JSON.stringify({userId, nickName, charType, token: "mtiToken"});
  }catch(e){
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString()
    });
  }
  
  return response;
};
