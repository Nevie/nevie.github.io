export class Error{

    static getInstance() {
        if (!Error.instance) {
            Error.instance = new Error();
        }
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