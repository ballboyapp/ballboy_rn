const getMsg = ({
  isFinished,
  isCanceled,
  isFull,
}: {
  isFinished: boolean,
  isCanceled: boolean,
  isFull: boolean,
}): {
  msg: string,
  msgStatus: string,
} => {
  if (isFinished) {
    return {
      msg: 'gameDetails.finishMsg',
      msgStatus: 'error',
    };
  }
  if (isCanceled) {
    return {
      msg: 'gameDetails.cancelMsg',
      msgStatus: 'error',
    };
  }
  if (isFull) {
    return {
      msg: 'gameDetails.fullMsg',
      msgStatus: 'success',
    };
  }

  return {
    msg: null,
    msgStatus: null,
  };
};

export default getMsg;
