function set(redisClient, key, value) {
  return new Promise((resolve, reject) => {
    redisClient.set(key, value, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function setEx(redisClient, key, seconds, value) {
  return new Promise((resolve, reject) => {
    redisClient.setex(key, seconds, value, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function get(redisClient, key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function del(redisClient, key) {
  return new Promise((resolve, reject) => {
    redisClient.del(key, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  set,
  setEx,
  get,
  del
};