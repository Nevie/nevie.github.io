export class Error{
static instance;
   constructor(){
       if(Error.instance){
           return Error.instance;
       }
       Error.instance = this;
       return Error.instance;
   }

    drawDataError(){
        let html=`<div class="alert alert-danger" id="alertDanger">
                <strong>Fail.</strong>
                Sorry, no news available from this channel. Please, try to choose another channel
            </div>`;
        document.querySelector("#newsBlock").insertAdjacentHTML('beforeend', html);
    }
}