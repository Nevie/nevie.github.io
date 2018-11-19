export class Error{
    static drawDataError(element){
        let html=`<div class="alert alert-danger" id="alertDanger">
                <strong>Fail.</strong>
                Sorry, no news available from this channel. Please, try to choose another channel
            </div>`;
        element.querySelector("#newsBlock").insertAdjacentHTML('beforeend', html);
    }
}