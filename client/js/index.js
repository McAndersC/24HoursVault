
const twentyFourHoursVault = {};

twentyFourHoursVault.clearRelease = (e) => {

    e.preventDefault();
  
    fetch('/moments/clear').then((response) => response.json()).then( (response) => {

        console.log('response', response);

    });

}

twentyFourHoursVault.generateData = (e) => {

    e.preventDefault();

    fetch('/moments/generate').then((response) => response.json()).then( (response) => {

        console.log('response', response);

    });

}

twentyFourHoursVault.init = () => {

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