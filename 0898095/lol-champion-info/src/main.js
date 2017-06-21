import _ from 'underscore';
import {Events} from 'backbone';
import Champions from './collections/Champions';
import Runes from './collections/Runes';
import ChampionListView from './views/ChampionListView';
import RuneListView from './views/RuneListView';
import ChampionDetails from './views/ChampionDetails';
import ChampionLinks from './views/ChampionLinks';
import HeaderLinks from './views/HeaderLinks';

(function ()
{
    let setGlobalVariables = function ()
    {
        window.App = {};
        App.events = _.clone(Events);
    };

    /**
     * Run after dom is ready
     */
    let init = function ()
    {
        setGlobalVariables();
        //Initialize the champion list view
        let ChampionCollection = new Champions();
        new ChampionListView({el: "#champions", collection: ChampionCollection});
        //Initialize the runes list view
        let RunesCollection = new Runes();
        new RuneListView({el: "#runes", collection: RunesCollection});
        //Initlialize the detail view for the champions.
        let championCollection = new Champions;
        new ChampionDetails({el: "#champion", collection: championCollection});
        //Initialize the routing for the links at the top nav bar.
        new HeaderLinks({el: "#header-links"});
        Backbone.history.start({pushState: true, root: "/0898095/lol-champion-info/"});
        //Trigger the initial load of champions on page load.
        App.events.trigger('loadChampions', { });       
    };
    window.addEventListener('load', init);

})();
