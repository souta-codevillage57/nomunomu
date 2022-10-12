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

  // { varName }のような形式を分割代入と呼び、右側のオブジェクトの中からvarNameプロパティを変数varNameとして切り出すことができる
  // (https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
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
    // ↓プロパティ名と変数名が同一の場合は、値の指定を省略できる。 
    TableName,  // TableName: TableNameと同じ意味
    Item: {   // userId: userIdと同じ意味
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

  try{
    await dynamo.put(param).promise();
    response.statusCode = 201;
    response.body = JSON.stringify({   // userId: userIdと同じ意味
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
