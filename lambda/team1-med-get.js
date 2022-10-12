const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = "team1-Medicine";

exports.handler = async (event, context) => {
  //レスポンスの雛形
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };
  
  // 今回は簡易的な実装だが、一般的にはAuthorizationHeaderの値は、Authorization: <type> <credentials>のような形式になります。
  // https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Authorization#%E6%A7%8B%E6%96%87
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
  
  //dynamo.get()でDBからデータを取得
  try{
    const userMed = (await dynamo.get(param).promise()).Item;
    if(!userMed){
      throw new Error("指定されたuserIdで指定された薬を持つデータは存在しません");
    }
    response.body = JSON.stringify(userMed)
    
  }catch(e){
    if (e.message == "指定されたuserIdで指定された薬を持つデータは存在しません") {
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