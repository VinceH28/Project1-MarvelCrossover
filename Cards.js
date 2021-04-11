//For loop for cards 
//Need to define and call variables for this to work in js then delete in html once linked.
for(i=0; i< 50; i++){
    $(".grid-container").append(`<div class="cell">
          <div class="card">
            <img src="https://via.placeholder.com/550x550">
            <div class="card-section">
            <h4>Iron-Man/Comic book series</h4>
              <p>This row of cards is embedded in an X-Y Block Grid.</p>
            </div>
          </div>
        </div>`)}