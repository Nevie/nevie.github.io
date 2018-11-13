export class Error{

    static drawDataError(){
        document.getElementById("newsBlock").innerHTML = '';
        let errorBlock = document.createElement("div");
        errorBlock.setAttribute('class',"alert alert-danger");
        errorBlock.setAttribute('id',"alertDanger");

        let strong = document.createElement("strong");
        strong.innerText="Fail.";
        errorBlock.appendChild(strong);
        let descriptionText = document.createTextNode(" Sorry, no news available from this channel. Please, try to choose another channel");
        errorBlock.appendChild(descriptionText);
        document.getElementById("newsBlock").appendChild(errorBlock);

    }
}