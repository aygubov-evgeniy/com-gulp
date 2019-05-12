const count_odd_pentaFib = (num) => {
  const addMap = new Map();
  const numArr = [0, 1, 1, 2, 4];
  let count = 0;

  for(let i = 5; i <= num; i++) {
    for(let j = 5; j > 0; j--) {
      count += numArr[i - j];
    }

    if(count % 2) {
      count = 1;
    }else {
      count = 2;
    }

    numArr.push(count);
    count = 0;
  }

  numArr.forEach((item, index) => {
    if(item % 2) {
      addMap.set(index, item);
    }
  });

  console.log(addMap.size - 1);
}

count_odd_pentaFib(121);