/* ======= Model ======= */

var model = {
    currentCat: null,
    currentId:0,
    cats: [
        {	
        	id:0,
            clickCount : 0,
            name : 'Tabby',
            imgSrc : '1.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
        	id:1,
            clickCount : 0,
            name : 'Tiger',
            imgSrc : '2.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
        	id:2,
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : '3.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
        	id:3,
            clickCount : 0,
            name : 'Shadow',
            imgSrc : '4.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
        	id:4,
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : '5.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },
    modifyCat:function(id,cat){
    	model.cats[id].name = cat.name;
    	model.cats[id].clickCount = cat.clickCount;
    	model.cats[id].imgSrc = cat.imgSrc;
    	model.cats[id].imgAttribution = cat.imgAttribution;
    },
    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }


};


/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');
       	this.nameInput = document.getElementById('cat-name-input');
       	this.model = octopus.getCats();

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });
		this.adminBtnElem = document.getElementById('adminBtn');
        this.adminFormElem = document.getElementById('adminForm');
        
        //this.adminFormElem.hidden = true;
        this.adminFormElem.style.display = "none";
        this.adminBtnElem.addEventListener('click',function(){
        	currentCat = octopus.getCurrentCat();
        	$('#adminForm').css("display","block");
        	$("#cat-name-input").val(currentCat.name);
        	$("#url-input").val(currentCat.imgAttribution);
        	$("#click-count-input").val(currentCat.clickCount);
        });

        document.getElementById("cancelBtn").addEventListener("click",function(){
        	this.adminFormElem.style.display = "none";
        });
        document.getElementById("saveBtn").addEventListener("click",function(){
        	var modifiedCat={
        		id:currentCat.id,
        		clickCount : $("#click-count-input").val(),
            	name : $("#cat-name-input").val(),
            	imgSrc : currentCat.imgSrc,
            	imgAttribution : $("#url-input").val()
        	}
        	octopus.modifyCat(currentCat.id,modifiedCat);
        	octopus.setCurrentCat(modifiedCat);
        	this.model = octopus.getCats();
        });
        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
       	this.nameInput.value =currentCat.name;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
octopus.init();