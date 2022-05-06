
const twentyFourHoursVault = {};

twentyFourHoursVault.clearRelease = (e) => {

    e.preventDefault();
    console.log('Deleting Data');
    fetch('/moments/clear')
    .then((response) => response.json()).then( (response) => {

        console.log('response', response);

    });

}

twentyFourHoursVault.generateData = (e) => {

    e.preventDefault();
    console.log('Generating Data');
    fetch('/moments/generate')
    .then((response) => response.json()).then( (response) => {

        console.log('response', response);

    });

}

twentyFourHoursVault.init = () => {

    console.log('Initializing twentyFourHoursVault');

    const btns = document.querySelectorAll('.btn-action');

    btns.forEach( (btn) => {
        
        switch (btn.dataset.action) {
            case 'create':
                    btn.addEventListener('click', twentyFourHoursVault.generateData);
                break;
                case 'clear':
                    btn.addEventListener('click', twentyFourHoursVault.clearRelease);
                break;
            default:
                break;
        }
        
      
    
    })
    

}

twentyFourHoursVault.init();