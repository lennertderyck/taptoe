// create react reducer

const reducer = (state, action) => {
    switch (action.type) {
        case "loading":
            return { loading: true, data: undefined, error: undefined };
        case "success":
            return { loading: false, data: action.payload, error: undefined };
        case "error":
            return { loading: false, data: undefined, error: action.payload };
        default:
            throw new Error("invalid action");
    }
}

export default reducer