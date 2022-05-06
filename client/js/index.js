
const twentyFourHoursVault = {};









twentyFourHoursVault.generateData = (e) => {

    e.preventDefault();
    console.log('Generating Data');

  



}

twentyFourHoursVault.init = () => {

    console.log('Initializing twentyFourHoursVault');

    const formNew = document.querySelector('#form-new');
    formNew.addEventListener('submit', twentyFourHoursVault.generateData);

}

twentyFourHoursVault.init();