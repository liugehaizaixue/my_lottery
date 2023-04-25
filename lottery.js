// 设置奖金
const prizeList = [
  { count: [], prize: null },
  { count: [], prize: null },
  { count: [], prize: null },
  { count: [], prize: null },
  { count: [], prize: null },
  { count: [], prize: null },
  { count: [], prize: null },
  { count: [], prize: null },
  { count: [], prize: null },
  { count: [], prize: null },
];

const prizeArray = [5, 10, 20, 40, 60, 70, 80, 100, 200];

function initPrizeList() {
  for (let i = 0; i < prizeList.length; i++) {
    prizeList[i].prize =
      prizeArray[Math.floor(Math.random() * prizeArray.length)];
  }
}

initPrizeList();

// 设置我的号码，每组从10到1个数字
function initMyCode() {
  var my_code_arr = [];
  var num = 10;

  for (var i = 0; i < 10; i++) {
    var subArr = [];
    for (var j = 0; j < num; j++) {
      var randomNum = Math.floor(Math.random() * 100);
      subArr.push(randomNum < 10 ? "0" + randomNum : String(randomNum)); // 如果是一位数，则在前面加0，返回字符串类型
    }
    my_code_arr.push(subArr);
    num--;
  }
  return my_code_arr;
}

myCode = initMyCode();
myCode[0][0] = "10";
// 抽取中奖号码，并设置中奖概率
function generateWinningNumber(myCode, probability = 0.5) {
  probability = probability * 100;
  // 生成0-99的随机整数，如果小于概率数则从我的号码中随机选取中奖号码，否则随机选取不在我的号码中的号码
  const randomNum = Math.floor(Math.random() * 100);
  if (randomNum < probability) {
    const randomSubArr = myCode[Math.floor(Math.random() * myCode.length)];
    return randomSubArr[Math.floor(Math.random() * randomSubArr.length)];
  } else {
    let allNums = [];
    for (let i = 0; i < 100; i++) {
      allNums.push(i < 10 ? "0" + i : String(i));
    }
    let usedNums = myCode.flat();
    let unUsedNums = allNums.filter((num) => !usedNums.includes(num));
    return unUsedNums[Math.floor(Math.random() * unUsedNums.length)];
  }
}

winningNumber = generateWinningNumber(myCode, 0.5);

// 计算中奖金额
function calculatePrize(myCode, winningNumber, prizeList) {
  let totalPrize = 0;
  const prizeArr = []; // 用于记录中奖金额

  for (let i = 0; i < myCode.length; i++) {
    if (myCode[i].includes(winningNumber) || myCode[i].includes("10")) {
      // 如果中奖号码或10在该行中出现，则认为该行也中奖
      totalPrize += prizeList[i].prize;
      prizeArr.push(prizeList[i].prize); // 将中奖金额记录到 prizeArr 数组中
      if (prizeList[i].count.indexOf(winningNumber) === -1) {
        prizeList[i].count.push(winningNumber);
      }
    } else {
      prizeArr.push(0); // 没中奖的情况下，将中奖金额设置为 0，并记录到 prizeArr 数组中
    }
  }

  return { totalPrize, prizeArr }; // 返回中奖金额和中奖金额数组
}

let calculateRes = calculatePrize(myCode, winningNumber, prizeList);

// 合并数组

console.log("中奖号码：" + winningNumber);
console.log("我的号码：" + JSON.stringify(myCode));
console.log("中奖金额：" + calculateRes.totalPrize);
console.log("中奖情况：" + JSON.stringify(calculateRes.prizeArr));
