class Logger {
  public log(msg: string): void{
    if(!PRODUCTION){
      console.log("%cLog:","color: #427af4; font-weight: bold" , msg);
    }
  }

  public debug(msg: string): void{
    if(!PRODUCTION){
      console.log("%cDebug:","color: #5072b2; font-weight: bold" , msg);
    }
  }

  public info(msg: string): void{
    if(!PRODUCTION){
      console.log("%cInfo:","color: #c0c6d1; font-weight: bold" , msg);
    }
  }

  public error(msg: string): void{
    if(!PRODUCTION){
      console.log("%cError: %c" + msg,"color: #ef5159; font-weight: bold", "color: #ef5159;");
    }
  }

  public stateChange(state: any): void{
    if(!PRODUCTION){
      console.log("%cNewState:","color: #636654; font-weight: bold" , state);
    }
  }
}

export default new Logger();
