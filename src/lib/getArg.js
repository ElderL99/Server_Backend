function getArg(arg) {
    const argString = process.argv.find((item) => item.includes(arg));
    if (!argString) return null;
    const [_, value] = argString.split("=");
    return value;
  }
  
  module.exports = getArg;