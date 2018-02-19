
class Board extends React.Component{
    constructor(props){
        super(props);
        var cards = this.charectaraizeCards();
        this.state={
            cardsChoosen : [],
            selectedCardsArray : this.chooseCardsFromDeck(cards)
        }
        this.cardWasPressed = this.cardWasPressed.bind(this);
        this.creatingRows = this.creatingRows.bind(this);
        this.newGame = this.newGame.bind(this);
    }

    newGame(){
        let cards = this.charectaraizeCards();
        this.setState({
            cardsChoosen : [],
            selectedCardsArray : this.chooseCardsFromDeck(cards)
        })
    }


    cardWasPressed(cardIndex){
        let selectedCardsArray = this.state.selectedCardsArray;
        selectedCardsArray[cardIndex].selected = true;
        this.state.cardsChoosen.push(selectedCardsArray[cardIndex]);
        this.setState({
            cardsChoosen: this.state.cardsChoosen,
            selectedCardsArray
        })
        console.log(this.state.cardsChoosen)
        if (this.state.cardsChoosen.length == 3){
            console.log("send data to logic to check for set ")
            if (set.checkIfSet(this.state.cardsChoosen)) {
                console.log(set.checkIfSet(this.state.cardsChoosen))
                alert("Yay! a set");
            }
            else {
                alert("this is not a set");
            }

            let selectedCardsArray = this.state.selectedCardsArray;
            selectedCardsArray.forEach(card => {
                card.selected = false;
            })
            this.setState({
                selectedCardsArray,
                cardsChoosen: []
            })
        }
    }

    charectaraizeCards(){
        var cards =  [];
        var url = 'https://puzzles.setgame.com/images/setcards/small/';
        var passedNine = 1;
        var colors = ['red','purple','green'];
        var currColorIndex = 0;

        for (var i=1; i<=81; i++){
            var color, shape, shading,number;
            if (i>=1 && i<=27){
                shading = 'solid';
            }
            else if (i>=28 && i<=54){
                shading = 'striped';
            }
            else if (i>=55 && i<=81){
                shading = 'transparent';
            }

            if (i%9==0){
                passedNine +=1;
            }

            if (passedNine == 1 || passedNine == 4 || passedNine == 7){
                shape = 'squiggle';
            }
            else if (passedNine == 2 || passedNine == 5 || passedNine == 8){
                shape = 'diamond';
            }
            else if (passedNine == 3 || passedNine == 6 || passedNine == 9){
                shape = 'oval';
            }
            color = colors[currColorIndex];

            if (i%3==0){
                if (currColorIndex==2){
                    currColorIndex= 0;
                }
                else{
                    currColorIndex +=1;
                }
            }

            if(i%3==0){
                number = '3';
            }
            else if(i%3==1){
                number = '1';
            }
            else if(i%3==2){
                number = '2';
            }

            var num = i < 10 ? '0' + i : i;
            var img_url = url + num + '.gif';
            var card = {
                shape:shape,
                number:number,
                color:color,
                shading:shading,
                index: i,
                pic: img_url,
                selected: false
            }

            cards.push(card);
        }

        return cards
    }

    chooseCardsFromDeck(cards){
        var numOfCardsToRenderBoard = 12;
        var selectedCards = []
        //randomly choosing 12 cards
        for (var z=0; z<numOfCardsToRenderBoard; z++) {
            var indexToRemove = Math.floor(Math.random() * cards.length);
            var selectedCard = cards[indexToRemove];
            selectedCards.push(selectedCard);
            //remove choosen cards from the array
            if (indexToRemove !== -1) {
                cards.splice(indexToRemove, 1);
            }

        }
        console.log(selectedCards)
        return selectedCards
    }

    creatingRows(cardsArray) {
        let selectedCards = [];
        for (var z = 0; z<cardsArray.length; z+=4) {
            var end = z+4;
            var row = cardsArray.slice(z, end);
            selectedCards.push(row);
        }
        console.log("selectedCards",selectedCards)
          var fourInRow = c.map(x => <Row key={`row${z + 1}`} value={x}> </Row>);
        return c
    }

    createRow(start, count) {
        // console.log(start,  count);
        return this.state.selectedCardsArray.slice(start, start+count)
            .map(x => <Card key={this.state.selectedCardsArray.indexOf(x)} index={this.state.selectedCardsArray.indexOf(x)} pic={x.pic} color={x.color} number={x.number}
                            shape={x.shape} shading={x.shading} selected={x.selected} onClick={this.cardWasPressed}/>)

    }

    createRows() {
        const rows = this.state.selectedCardsArray.length / 4;
        const cardRows =[];
        for (var i= 0; i < rows; ++i) {
            cardRows.push(<Row key={i}>{this.createRow(i*4, 4)}</Row>);
        }
        return cardRows;
    }

    render() {
        return (
            <div className="board">
                <div className="header">The Set Game</div>
                <button className="newGameBtn" onClick={this.newGame}>New Game </button>
                {this.createRows()}
            </div>
        );
    }
}

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.attachProps=this.attachProps.bind(this);
    }

    attachProps(){
        this.props.onClick(this.props.index)
    }

    render(){
        var class_name = this.props.selected ? "card selected" : "card" ;
         return (
         <div className={class_name} onClick={this.attachProps}>
                <img src={this.props.pic}/>
          </div>
        );
    }
}

class Row extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
         return (
         <div className="row">
             {this.props.children}
         </div>
        );
    }
}

ReactDOM.render(
    <Board/>,
    document.getElementById('root')
);