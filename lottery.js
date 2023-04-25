function initPrizeList() {
  // 设置奖金
  const probMap = {
    //奖金及概率
    5: 0.8,
    10: 0.75,
    20: 0.7,
    40: 0.5,
    60: 0.4,
    70: 0.3,
    80: 0.05,
    100: 0.04,
    200: 0.01,
  };
  const prizeArray = Object.keys(probMap).map(Number);
  const prizeList = Array.from({ length: 10 }, () => ({
    prob: 0,
    prize: null,
  }));
  for (let i = 0; i < prizeList.length; i++) {
    prizeList[i].prize =
      prizeArray[Math.floor(Math.random() * prizeArray.length)];
    prizeList[i].prob = probMap[prizeList[i].prize];
  }
  // console.log(prizeList);
  return prizeList;
}

// 设置我的号码，每组号码个数从10到1
function initMyCode() {
  var my_code_arr = [];
  var num = 10;

  for (var i = 0; i < 10; i++) {
    var subArr = [];
    for (var j = 0; j < num; j++) {
      // 判断生成的随机数是否是10，如果是，则继续生成随机数，直到不是10为止
      var randomNum = Math.floor(Math.random() * 100);
      while (randomNum === 10) {
        randomNum = Math.floor(Math.random() * 100);
      }
      subArr.push(randomNum < 10 ? "0" + randomNum : String(randomNum)); // 如果是一位数，则在前面加0，返回字符串类型
    }
    my_code_arr.push(subArr);
    num--;
  }
  return my_code_arr;
}

// 专门在mycode中设置添加“10”的情况，提高中奖概率
function changeValue(specialProb = 0.1, myCode) {
  const randomNum = Math.random(); // 生成0-1的随机数
  if (randomNum <= specialProb) {
    // 判断是否满足概率
    const rowIndex = Math.floor(Math.random() * myCode.length); // 随机获取行的索引
    const colIndex = Math.floor(Math.random() * myCode[rowIndex].length); // 随机获取列的索引
    myCode[rowIndex][colIndex] = "10"; // 修改对应位置的值
    console.log("修改了中奖", rowIndex, "组数", myCode[rowIndex]);
  }
  return myCode; // 返回修改后的数组
}

// 抽取中奖号码，并设置中奖概率
function generateWinningNumber(myCode, winningProb = 0.5) {
  console.log(winningProb);
  probability = winningProb * 100;
  // 生成0-99的随机整数，如果小于概率数则从我的号码中随机选取中奖号码，否则随机选取不在我的号码中的号码
  const randomNum = Math.floor(Math.random() * 100);
  if (randomNum < probability) {
    console.log("中奖，小于概率数则从我的号码中随机选取中奖号码");
    let winningSubArr;
    const prizeListSorted = prizeList.sort((a, b) => b.prize - a.prize); // 按奖金从大到小排序
    const randomPrizeProb = Math.random(); // 生成0-1的随机数
    console.log(prizeListSorted);
    console.log(randomPrizeProb); //用该值和prizeList中设置的prob相比，选择最大的
    for (let i = 0; i < prizeListSorted.length; i++) {
      if (randomPrizeProb <= prizeListSorted[i].prob) {
        // 按概率选取奖金
        winningSubArr = myCode[i];
        console.log("中奖子数组：", winningSubArr);
        break;
      } else {
        winningSubArr = myCode[myCode.length - 1 - 1];
      }
    }
    return winningSubArr[Math.floor(Math.random() * winningSubArr.length)];
  } else {
    console.log("未中奖,随机选取不在我的号码中的号码");
    let allNums = [];
    for (let i = 0; i < 100; i++) {
      allNums.push(i < 10 ? "0" + i : String(i));
    }
    let usedNums = myCode.flat();
    let unUsedNums = allNums.filter((num) => !usedNums.includes(num));
    return unUsedNums[Math.floor(Math.random() * unUsedNums.length)];
  }
}

// 计算中奖金额
function calculatePrize(myCode, winningNumber, prizeList) {
  let totalPrize = 0;
  const prizeArr = []; // 用于记录中奖金额

  for (let i = 0; i < myCode.length; i++) {
    if (myCode[i].includes(winningNumber) || myCode[i].includes("10")) {
      // 如果中奖号码或10在该行中出现，则认为该行也中奖
      totalPrize += prizeList[i].prize;
      prizeArr.push(prizeList[i].prize); // 将中奖金额记录到 prizeArr 数组中
    } else {
      prizeArr.push(0); // 没中奖的情况下，将中奖金额设置为 0，并记录到 prizeArr 数组中
    }
  }

  return { totalPrize, prizeArr }; // 返回中奖金额和中奖金额数组
}

// 合并数组
function mergeArray(myCode, prizeList, winningNumber) {
  const mergedArr = myCode.map((subArr, index) => {
    const prize = prizeList[index].prize;
    return subArr.concat("￥" + prize.toString());
  });

  mergedArr.push([winningNumber]);
  return mergedArr;
}

function lottery(specialProb = 0.01, winningProb = 0.3) {
  prizeList = initPrizeList();
  myCode = initMyCode();
  myCode = changeValue(specialProb, myCode);
  winningNumber = generateWinningNumber(myCode, winningProb, prizeList);
  let calculateRes = calculatePrize(myCode, winningNumber, prizeList);
  let mergedArr = mergeArray(myCode, prizeList, winningNumber);

  console.log(mergedArr);
  console.log("中奖号码：" + winningNumber);
  console.log("我的号码：" + JSON.stringify(myCode));
  console.log("中奖金额：" + calculateRes.totalPrize);
  console.log("中奖情况：" + JSON.stringify(calculateRes.prizeArr));

  return mergedArr;
}

lottery();
