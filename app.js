//PREDICTION CONTROLLER
var predictionController = (function() {
    
    var Prediction = function(id, outcome, description, date, probability, reasoning) {
        this.id = id;
        this.outcome = outcome;
        this.description = description;
        this.date = date;
        this.probability = probability;
        this.reasoning = reasoning;
        if (this.outcome === "2") {
            this.difference = Math.pow((this.probability - 100)/100,2)
        ;} else if (this.outcome === "3"){
          this.difference = Math.pow((this.probability - 0)/100,2)
        ;} else {
            this.difference = ""
        ;}
        
    };
    
    var data = {
        allItems: [],
        totalDiff: 0,
        bScore: 1
        
    };
    
    var calculateTotalDiff = function() {
        var sum = 0;
    };
    
return {
  addItem: function(outc, desc, date, prob, reas) {
      var newItem, ID;
      
      // Create new ID
      if (data.allItems.length > 0) {
        ID = data.allItems[ data.allItems.length - 1].id + 1; 
      } else {
          ID = 0
      }
      
      // Create new item
      newItem = new Prediction (ID, outc, desc, date, prob, reas);
      
      // Push into data structure
      data.allItems.push(newItem);
      
      // Return new element
      
      return newItem;
      
  },
    
    calculateBScore: function() { 

     
},
    
    testing: function() {console.log(data);
                }
    
    
};    
    
    
})();



//UI CONTROLLER
var UIController = (function() {
    
    var DOMstrings = {
        inputOutcome: '.add__outcome',
        inputDescription: '.add__description',
        inputDate: '.add__date',
        inputProb: '.add__probability',
        inputReason: '.add__reasoning',
        addBtn: '.add__btn',
        outcomeLabel: '.item__outcome',
        descriptionLabel: '.item__description',
        dateLabel: '.item__date',
        probLabel: '.item__probability',
        reasonLabel: '.item__reasoning',
        bScoreLabel: '.bscore__value',
        predictionContainer: '.predictions__list'
        
    };
    
    return {
        
        getInput: function(){
          
            return{
              outcome: document.querySelector(DOMstrings.inputOutcome).value,
              description: document.querySelector(DOMstrings.inputDescription).value,
              date: document.querySelector(DOMstrings.inputDate).value,
              probability: parseFloat(document.querySelector(DOMstrings.inputProb).value),
              reason: document.querySelector(DOMstrings.inputReason).value,
            };            
        },
        
        addListItem: function(obj) {
            var html, newHtml, element;
            
            // Create HTML string with placeholder text
            element = DOMstrings.predictionContainer;
            
            html =  '<div class="item clearfix" id="prediction-%id%"> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> <select class="item__outcome"> <option value= 1 >No outcome yet</option> <option value= 2 >Came true</option> <option value= 3 > Did not come true</option </select> <input type="text" class="item__description" placeholder="%description%"> <input type="date" class="item__date" value="%date%"> <input type="number" min="0" max="100" class="item__probability" placeholder="%probability%"><input type="text" class="item__reasoning" placeholder="%reasoning%"> </div>';
            
            // Replace placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%date%', obj.date);
            newHtml = newHtml.replace('%probability%', obj.probability);
            newHtml = newHtml.replace('%reasoning%', obj.reasoning);
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        
        clearFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputOutcome + ',' + DOMstrings.inputDescription + ',' + DOMstrings.inputDate + ',' + DOMstrings.inputProb + ',' + DOMstrings.inputReason)
            
            var fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });
            
            fieldsArr[1].focus();
               
        },
        
        displayBScore : function (obj) {
            
            document.querySelector(DOMstrings.bScoreLabel).textContent = obj.bScore;
            
        },
        
        getDOMstrings: function() {return DOMstrings;
                        } 
        };
    
    
})();



//APP CONTROLLER
var controller = (function(predCtrl, UICtrl){
    
    var setupEventListeners = function() {
        
    var DOM = UICtrl.getDOMstrings();
        
    document.querySelector(DOM.addBtn).addEventListener('click',ctrlAddItem);
        
    document.addEventListener('keypress', function(event) {
            
            if (event.keyCode === 13 || event.which === 13 ) {
                ctrlAddItem();
            }
            
        });
    };
    
    var updateBScore = function() {
        
        //1. Calculate bScore
        predCtrl.calculateBScore();
        
        
        //2. Return the bScore (MODIFY)
        var bScore = {
                bScore: 0.30
        };
        
        //3. Display the bScore on the UI
        UICtrl.displayBScore(bScore);
        
    };
    
    
    var ctrlAddItem = function() {
        
        //temporary
        console.log('Add buton activated');
        
        //Name variables
        var input, newItem;
        
        //1. Get field input data
        var input = UICtrl.getInput();
        
        if (input.description !== "" && !isNaN(input.probability) && input.probability >= 0 && input.probability <= 100) {
            
        //2. Add item to prediction controller
        var newItem = predCtrl.addItem(input.outcome, input.description, input.date, input.probability, input.reason);
            
        //3. Add item to UI
        UICtrl.addListItem(newItem);  
            
        //4. Clear the fields
        UICtrl.clearFields();
            
            
        //5. Calculate and update bScore
        updateBScore(); 
            
        }
    };
    
    return {
        init: function(){
        
        UICtrl.displayBScore({
            bScore: 1
        });    
        console.log('App initialised')
        setupEventListeners();

    }
    };
                  
})(predictionController, UIController);
controller.init();





/*


*/