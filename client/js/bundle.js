
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
   'use strict';

   const timelineOffice = {};

   timelineOffice.timelineTmpl = (timeline, momentsForTimeLine) => `

    <div class="timeline" id="${timeline.id}">
        <h1 class="heading">${timeline.period.from} : ${timeline.period.to}</h1>
        <p class="p">Herunder er alle øjeblikke for tidrummet fra ${timeline.period.from} til ${timeline.period.to}</p>
        <div class="slots">
            ${timeline.slots.map( (slot, index) => `<div class="timeline-list-slot-item">${index + 1} - ${slot.time} - ${slot.text}</div>` )}
            ${timeline.slots.length > 0 ? '' : '<i>Der er ikke tilføjet øjeblikke til dette tidsrum</i>'}
        </div>
        <div class="timeline-edit">
            <div>
                <form id="timeline-form-${timeline.id}">
                    <select name="moments">
                        ${momentsForTimeLine.map((moments) => `<option>${moments.time} - ${moments.title}</option>`)}

                    </select>
                    <textarea name="slot"></textarea>
                    <button type="submit">Tilføj</button>
                </form>
            </div>
        </div>
        <div>
   
            <button class="add-moment" data-moment="${timeline.id}" ${momentsForTimeLine.length <= 0 ? 'disabled' : ''}>Tilføj Øjeblik Til Tidlinje</button>
        </div>
        <hr/>
    </div>

`;

   timelineOffice.slotEditTmpl = (isSelected, moment, slotJson) => `
    <label><input type="checkbox" ${isSelected}>${moment.time} : ${moment.title}</label>
    <div>
    <textarea id="moment">${JSON.stringify(slotJson, null, 2)}</textarea>
    
    </div>
`;

   timelineOffice.setup = async () => {

       console.log('Setup timeline');

       let timelineContainer = document.querySelector('.timeline-container');

       if(!timelineContainer)
       {
           return "no timeline present"
       }

       let momentsResult = await fetch('../../release/data/moments.json').then((response) => response.json()).then((response) => {
           return response;
       });

       momentsResult = momentsResult.sort(({ time: a }, {time: b }) => a > b ? 1 : a < b ? -1 : 0);

       console.log('Moments Loaded:', momentsResult);

       const timelines = [
           {
              "id" : "slot01",
               "period" : {
                   "from" : "01:00",
                   "to" : "02:00"
               },
               "title" : "NAT I VIBORG",
               "theme" : "light",
               "slots" : []
          },
          {
               "id" : "slot02",
               "period" : {
                   "from" : "02:00",
                   "to" : "03:00"
               },
               "title" : "Ikke NAT I VIBORG",
               "theme" : "light",
               "slots" : [{
                   "id" : "02-30-en-god-titel",
                   "url" : "moments/02-30-en-god-titel.html",
                   "size" : "height3",
                   "time" : "02:30",
                   "text" : "En god titel til forsiden"
               }]
          },
          {
           "id" : "slot03",
            "period" : {
                "from" : "03:00",
                "to" : "04:00"
            },
            "title" : "NAT I VIBORG",
            "theme" : "light",
            "slots" : []
           },
       ];
    
       console.log('Setup timeline');


       timelines.forEach( (timeline) => {

           let momentsForTimeLine = momentsResult.filter((moment) => moment.time <= timeline.period.to && moment.time >= timeline.period.from);
           
                     
           timelineContainer.insertAdjacentHTML('beforeend', timelineOffice.timelineTmpl(timeline, momentsForTimeLine));
           console.log(timeline, momentsForTimeLine);

           // momentsForTimeLine.forEach(moment => {

           //     let timelineSlotsContainer = document.querySelector('#' + timeline.id)
           //     //console.log(timeline.slots.find(slot => slot.id === moment.id))

           //     let slot = timeline.slots.find(slot => slot.id === moment.id);
           //     let isSelected = slot ? 'checked' : '';
               // let slotJson = isSelected ? slot :  {
               //     "id" : moment.id,
               //     "url" : moment.url,
               //     "size" : "height3",
               //     "time" : moment.time,
               //     "text" : moment.title
               // };


           //     timelineSlotsContainer.insertAdjacentHTML('beforeend', timelineOffice.slotEditTmpl(isSelected, moment, slotJson))

           // })
      
           

       });

       // 
       let timeLines = document.querySelectorAll('.add-moment');
       let timeLineForms = document.querySelectorAll('.timeline form');
       
       timeLines.forEach( (timeline) => {

           timeline.addEventListener('click', (e) => {
               e.preventDefault();
               console.log('Click', e.currentTarget.dataset.moment);

               let test = document.querySelector('#' +  e.currentTarget.dataset.moment + ' .timeline-edit');
               test.classList.toggle('active');



           });


       });
      




       timeLineForms.forEach( (form) => {

           let momentsSelect = form.elements.moments;
          
           form.addEventListener('change', (e) => {
               e.preventDefault();
               console.log(e.currentTarget.elements);
           });

           console.log(timeLineForms, momentsSelect);

       });
       return "Setup Done"

   };

   const twentyFourHoursVault = {};

   twentyFourHoursVault.clearRelease = (e) => {

       e.preventDefault();
     
       fetch('/moments/clear').then((response) => response.json()).then( (response) => {

           console.log('response', response);

       });

   };

   twentyFourHoursVault.generateData = (e) => {

       e.preventDefault();

       fetch('/moments/generate').then((response) => response.json()).then( (response) => {

           console.log('response', response);

       });

   };


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
           }
       });

       timelineOffice.setup().then(result => console.log(result));

   };

   twentyFourHoursVault.init();

})();
