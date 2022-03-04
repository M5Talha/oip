import {combineReducers,compose,createStore,applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import currentUser from "./reducers/currentUser"
import isLogin from "./reducers/isLogin"
import dashboard from "./reducers/dashboard"
import registrationForm from "./reducers/registrationForm"
import myProjects from "./reducers/myProjects"
import payment from "./reducers/payment"
import clientInfo from "./reducers/clientInfo"
import paymentDetailData from "./reducers/paymentDetailData"
import projectDetails from "./reducers/projectDetails"
import resource from "./reducers/resource"
import kpi from './reducers/kpi';
import clients from "./reducers/clients";
import chatUsers from "./reducers/chatUsers"
import newLeads from "./reducers/newLeads"
import paidLeads from "./reducers/paidLeads"
import saleResource from "./reducers/saleResource"
import departmentAnswers from "./reducers/departure_answers"
import unReadCount from "./reducers/unReadCount"
import departments from "./reducers/departments"
import packages from "./reducers/packages"
import subPackages from "./reducers/subPackages";
import conversationList from "./reducers/conversationList";
import seeOnly from "./reducers/seeOnly"
import mobileToken from "./reducers/mobileToken"
import dashboardDepartment from "./reducers/dashboardDepartments"
import questionDynamic from "./reducers/questionDynamic"
import firebaseMessages from "./reducers/firebaseMessages"
import conversationUser from "./reducers/conversationUser"
const appReducer =combineReducers({
    currentUser,
    isLogin,
    dashboard,
    registrationForm,
    myProjects,
    payment,
    clientInfo,
    paymentDetailData,
    projectDetails,
    resource,
    kpi,
    clients,
    chatUsers,
    newLeads,
    paidLeads,
    saleResource,
    departmentAnswers,
    unReadCount,
    departments,
    packages,
    subPackages,
    conversationList,
    seeOnly,
    mobileToken,
    dashboardDepartment,
    questionDynamic,
    conversationUser,
    firebaseMessages
})


const reducers = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === 'USER_LOGGED_OUT') {
      state = undefined;
    }
  
    return appReducer(state, action);
  };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store =createStore(reducers,{},composeEnhancers(applyMiddleware(ReduxThunk)));


export default store