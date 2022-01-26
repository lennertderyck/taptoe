const { useContext } = require("react");
const { splashContext } = require("../contexts/SplashContext");

const useSplash = () => useContext(splashContext)

export default useSplash;