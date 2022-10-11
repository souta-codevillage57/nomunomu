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
  
  const userId = body.userId;
  const medName = body.medName;
  const medNum = body.medNum;
  const medQuantity = body.medQuantity;
  const oncemedfirsttime = body.oncemedfirsttime;
  const oncemedlasttime = body.oncemedlasttime
  const twicemedfirsttime = body.twicemedfirsttime;
  const twicemedlasttime = body.twicemedlasttime;
  const thircemedfirsttime = body.thircemedfirsttime;
  const thircemedlasttime = body.thircemedlasttime;
  
  const param = {
    TableName,
    Item: {
      userId,
      medName,
      medNum,
      medQuantity,
      oncemedfirsttime,
      oncemedlasttime,
      twicemedfirsttime,
      twicemedlasttime,
      thircemedfirsttime,
      thircemedlasttime
    }
  };
  
  const checkDoubling = {
      TableName,
      Key:{
          userId,
          medName,
      }
  };
  
  const userMed = (await dynamo.get(checkDoubling).promise()).Item;
  if(userMed){
      response.statusCode = 409;
      response.body = JSON.stringify({
          message: "指定された薬はすでに登録されています。"
      });
      
      return response;
  }
  
  try{
    await dynamo.put(param).promise();
    response.statusCode = 201;
    response.body = JSON.stringify({
      userId,
      medName,
      medNum,
      medQuantity,
      oncemedfirsttime,
      oncemedlasttime,
      twicemedfirsttime,
      twicemedlasttime,
      thircemedfirsttime,
      thircemedlasttime,
    });
  }catch(e){
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString()
    });
  }
  
  return response;
};
