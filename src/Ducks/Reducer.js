const initialState = {
    quiz: {},
    nickname: '',
    selectedPin: 0,
    quizToEdit: {},
    connected:false,//TODO change to false
    // requestUrl:'http://localhost:3030'
    //requestUrl:'http://192.168.1.29:3030'
    requestUrl:`http://${window.location.hostname}:3030`
}

const SELECTED_QUIZ = 'SELECTED_QUIZ'
const NEW_NICKNAME = 'NICKNAME'
const SELECTED_PIN = 'SELECTED_PIN'
const QUIZ_TO_EDIT = 'QUIZ_TO_EDIT'
const CONNECTED = 'CONNECTED'

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SELECTED_QUIZ:
            return Object.assign({}, state, { quiz: action.payload })
        case NEW_NICKNAME:
            return Object.assign({}, state, { nickname: action.payload })
        case SELECTED_PIN:
            return Object.assign({}, state, { selectedPin: action.payload })
        case QUIZ_TO_EDIT:
            return Object.assign({}, state, { quizToEdit: action.payload })
        case CONNECTED:
            return Object.assign({}, state, {connected: action.payload})
        default:
            return state
            break;
    }
}


export function selectedQuiz(quiz) {
    return {
        type: SELECTED_QUIZ,
        payload: quiz
    }
}
export function handleNickname(nickname) {
    return {
        type: NEW_NICKNAME,
        payload: nickname
    }
}
export function selectedPin(pin) {
    return {
        type: SELECTED_PIN,
        payload: pin
    }
}
export function editingQuiz(quiz) {
    return {
        type: QUIZ_TO_EDIT,
        payload: quiz
    }
}

export function setConnected(isConnected){
    return{
        type:CONNECTED,
        payload:isConnected
    }
}

export function getApiRequestUrl(){
    return initialState.requestUrl
}