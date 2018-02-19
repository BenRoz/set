window.set={}

set.checkIfSet = function (cards) {
        console.log(cards[0].shape)
        console.log(cards[1].shape)
        console.log(cards[2].shape)


        if (
                ( (cards[0].shape === cards[1].shape && cards[0].shape === cards[2].shape) || (cards[0].shape !== cards[1].shape && cards[0].shape !== cards[2].shape && cards[1].shape !== cards[2].shape) )&&
                ( (cards[0].color === cards[1].color && cards[0].color === cards[2].color) || (cards[0].color !== cards[1].color && cards[0].color  !== cards[2].color && cards[1].color  !== cards[2].color ) ) &&
                ( (cards[0].number === cards[1].number && cards[0].number === cards[2].number) || (cards[0].number !== cards[1].number && cards[0].number  !== cards[2].number && cards[1].number  !== cards[2].number ) ) &&
                ( (cards[0].shading === cards[1].shading && cards[0].shading === cards[2].shading) || (cards[0].shading !== cards[1].shading && cards[0].shading  !== cards[2].shading && cards[1].shading  !== cards[2].shading ) )
        ){
            return true;
        }else{
            return false; }
};

