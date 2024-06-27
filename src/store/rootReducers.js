import ProductReducer from "./reducers/ProductReducer";
import authReducer from "./reducers/authReducer";
import categoryReducer from "./reducers/categoryReducer";
import chatReducer from "./reducers/chatReducer";
import orderReducer from "./reducers/orderReducer";
import sellerReducer from "./reducers/sellerReducer";


const rootReducers = {
    auth : authReducer,
    category : categoryReducer,
    product : ProductReducer,
    seller : sellerReducer,
    chat : chatReducer,
    order : orderReducer,
}
export default rootReducers;