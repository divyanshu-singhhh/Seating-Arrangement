//selectors
const $numberOfRows = document.querySelector('#rows')
const $blockedSeats = document.querySelector('#blocked-seats')
const $result = document.querySelector('#result')




//submit button listener
document.querySelector('#input-form').addEventListener('submit', (e)=>{
    e.preventDefault()
    const numberOfRows = $numberOfRows.value
    const blockedSeats = $blockedSeats.value.split(',')
    const seatAplhabets = ['a','b','c','d','e','f','g','h','i','j']  //this will help to loop through row


    //Convert array to object so that we can easily search if seat is blocked or not later
    const blockedSeatObject = {}
    blockedSeats.forEach(seat => {
        blockedSeatObject[seat] = 1
    })

    //Number of family count
    let familyCount = 0


    //loops through each row
    for(let i = 1 ; i<=numberOfRows; i++){

        //seats available in a row
        let rowCount = 0

        //For Section S1
         for(let j = 0 ; j < 2 ; j++){           

            //check if current and next seat is not blocked
            if( !(blockedSeatObject[seatAplhabets[j] + i] || blockedSeatObject[seatAplhabets[j+1] + i]) ){
                rowCount += 2
                break
            }
         }

         //For Section S2
         for(let j = 3 ; j < 6 ; ){           
            if( !(blockedSeatObject[seatAplhabets[j] + i] || blockedSeatObject[seatAplhabets[j+1] + i]) ){
                rowCount += 2

                //increament by 2 as we have already booked first two seats 
                if(j==3){
                    j += 2
                    continue
                }

                //Stops looping through section S2 as there is only one seat left
                if(j==4){
                    break
                }
            }

            //increment by 1 in other cases
            j++
         }

         //For Section S3
         for(let j = 7 ; j < 9 ; j++ ){           
            if( !(blockedSeatObject[seatAplhabets[j] + i] || blockedSeatObject[seatAplhabets[j+1] + i]) ){
                rowCount += 2  
                break
            }
         }
         
         //Recalculate Number of families
         familyCount += Math.floor(rowCount/4)
         $result.innerHTML = 'The number of family that can be accomodated is ' + familyCount

    }

})