const { applyMiddleware } = require('redux')
const redux = require('redux')
const reduxlogger = require('redux-logger')


const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applymiddleware = redux.applyMiddleware
const logger = reduxlogger.createLogger()

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

//action creator
function buyCake(){
    return  {
        type: BUY_CAKE,
        info: 'First redux action'
        //ACTION    
    }
    
}

function buyIceCream(){
    return{
        type:BUY_ICECREAM,
    }
}

//state
const initialCakeState = {
    numOfcakes: 10
    //default value
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

//reducer
const Cakereducer = (state = initialCakeState, action) => {
    switch(action.type){
        case BUY_CAKE: return{
            //returning new state of the application
            ...state,//making a copy of the object
            numOfcakes: state.numOfcakes-1
        }
        default: return state
    }
}

const IceCreamreducer = (state = initialIceCreamState, action) => {
    switch(action.type){
        case BUY_ICECREAM: return{
            //returning new state of the application
            ...state,//making a copy of the object
            numOfIceCreams: state.numOfIceCreams-1
        }
        default: return state
    }
}

//store is resposnsible for holding the state of the application
//allows access to state : getState()
//allows state to updated : dispatch(action)
//registers listeners : subscribe(listener)

const rootReducer = combineReducers({
    //key value paors
    cake: Cakereducer,
    iceCream: IceCreamreducer
})
// const store = createStore(reducer) SINGLE STORE
const store = createStore(rootReducer, applymiddleware(logger)) //USING COMBINED STORE

console.log('Initial State', store.getState())
const unsubscribe =  store.subscribe(()=>{})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
unsubscribe()
store.dispatch(buyCake())
