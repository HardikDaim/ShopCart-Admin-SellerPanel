import ProductReducer from "./reducers/ProductReducer";
import authReducer from "./reducers/authReducer";
import categoryReducer from "./reducers/categoryReducer";
import chatReducer from "./reducers/chatReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import orderReducer from "./reducers/orderReducer";
import sellerReducer from "./reducers/sellerReducer";
import themeReducer from "./reducers/themeReducer";


const rootReducers = {
    theme : themeReducer,
    auth : authReducer,
    category : categoryReducer,
    product : ProductReducer,
    seller : sellerReducer,
    chat : chatReducer,
    order : orderReducer,
    dashboard: dashboardReducer
}
export default rootReducers;