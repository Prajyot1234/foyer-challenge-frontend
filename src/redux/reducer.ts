import { Reducer } from 'redux';

interface Action {
  type: string;
  payload?: any;
}

interface Message {
  date: string;
  message: string;
  id: string;
  owner: string;
  error: boolean
}

interface State {
  activate: boolean;
  messages: Message[];
}

const initialState: State  = {
  activate: false,
  messages: [],
};

const activateReducer: Reducer<State, Action>  = (state: State = initialState, action: Action) : State => {  
  switch (action.type) {
    case 'ACTIVATE':
      return {
        ...state,
        activate: !state.activate
      };

    case 'SEND_MESSAGE':
      return {
        ...state,
        messages : [...state.messages, action.payload].sort(function(a,b){
          return new Date(a?.date).getTime() - new Date(b?.date).getTime();
        })
      };

    default:
      return state;
  }
};

  
export const activateBtn = (): Action => ({
  type: 'ACTIVATE',
});

export const sendMessage = (message: Message): Action => ({
  type: 'SEND_MESSAGE',
  payload: message
});

export default activateReducer;