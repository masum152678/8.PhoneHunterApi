const loadData = async (searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    displayData(phones, isShowAll)
}

const displayData = (phones, isShowAll) =>{
   const phoneContainer = document.getElementById('phone-container')
   phoneContainer.textContent = ''
   const showAllItemsBtn = document.getElementById('show-all-items')
   if(phones.length > 12 && !isShowAll){
        showAllItemsBtn.classList.remove('hidden')
   }
   else{
    showAllItemsBtn.classList.add('hidden')
   }
//    console.log('is showAll', isShowAll)
   if(!isShowAll){
    phones = phones.slice(0,12)
   }
   
   phones.forEach(phone=>{
        // console.log(phone)
        const myDiv = document.createElement('div')
        myDiv.classList = `card bg-base-100 w-80 shadow-xl p-4 border border-gray-400`
        myDiv.innerHTML = `
            <figure>
                <img
                src="${phone.image}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>${phone.slug}</p>
                <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}'),show_details_modal.showModal()" class="btn btn-primary ">Show Details</button>
                </div>
            </div>
        `
        phoneContainer.appendChild(myDiv)

   })
   toogleLoadingSpinner(false)
}

const handleSearch = (isShowAll)=>{
    toogleLoadingSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value 
    // console.log(searchText)
    loadData(searchText, isShowAll)

}

const toogleLoadingSpinner = (isLoading)=>{
    const loadingSpinner = document.getElementById('loading-spinner')
    
    if(isLoading == true){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

const handleSeeMore = () =>{
    const seeMore = document.getElementById('see-more')
    handleSearch(true)
}


const handleShowDetail = async(id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const details = data.data
    displayDetails(details)
    // console.log(details)
}

const displayDetails = (details)=>{
    console.log(details)
    const detailsContainer = document.getElementById('show-details-container')
    detailsContainer.innerHTML = `
        <img src="${details.image}" alt="">
        <h3 class="text-center font-bold mt-2">${details.name}</h3>
    `
    // const detailsDiv = document.createElement('div')
    // detailsDiv.classList = `modal-box`
    // detailsDiv.innerHTML = `
    //      <h3 class="text-lg font-bold">${details.name}</h3>
    //      <p class="py-4">Press ESC key or click the button below to close</p>
       
    // `
    // detailsModal.appendChild('detailsDiv')
}



