interface Action {
  type: string;
  payload?: any;
}
  
export const activateBtn = (): Action => ({
  type: 'ACTIVATE',
});

export const sendMessage = (message: string): Action => ({
  type: 'SEND_MESSAGE',
  payload: message
});

 
  